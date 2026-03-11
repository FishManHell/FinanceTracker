import { Resolver } from '../../types/resolver.js'
import { UserDocument } from "../../../models/User/user.types.js"
import { GraphQLError } from 'graphql'
import { ObjectId } from 'mongodb'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Account } from '../../../models/Account/account.type.js'
import { canManageUser } from '../../../utils/permissions/userPermissions.js'
import { requireUser } from '../../../utils/auth.js'
import { forbidden, internalServerError, notFound } from '../../../utils/errors/httpErrors.js'

export const deleteUser: Resolver<{params: {id: string}}, boolean> = async (
  _, { params: {id} }, context
) => {
  const currentUser = requireUser(context.user)
  const session = context.db.client.startSession();

  try {
    await session.withTransaction(async () => {
      const users = context.db.collection<UserDocument>('users');
      const transactions = context.db.collection<Transaction>('transactions');
      const budgets = context.db.collection<Budget>('budgets');
      const accounts = context.db.collection<Account>('accounts');

      const userObjectId = new ObjectId(id);
      const targetUser = await users.findOne(
        { _id: userObjectId },
        { session }
      )

      if (!targetUser) notFound("USER_NOT_FOUND");
      if (!canManageUser(currentUser, targetUser)) forbidden("FORBIDDEN_DELETE")

      const deletedUser = await users.deleteOne(
        {_id: userObjectId},
        { session }
      );

      if (deletedUser.deletedCount === 0) notFound("USER_NOT_FOUND");

      await Promise.all([
        transactions.deleteMany({ userId: userObjectId }, { session }),
        budgets.deleteMany({ userId: userObjectId }, { session }),
        accounts.deleteMany({ userId: userObjectId }, { session }),
      ])
    })

    return true

  } catch (error) {
    console.error('Error in deleteUser', error)
    if (error instanceof GraphQLError) throw error;
    internalServerError();
  } finally {
    await session.endSession()
  }
}