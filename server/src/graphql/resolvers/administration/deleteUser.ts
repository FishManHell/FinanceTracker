import { Resolver } from '../../types/resolver.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { UserDocument } from "../../../models/User/user.types.js"
import { GraphQLError } from 'graphql'
import { ObjectId } from 'mongodb'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Account } from '../../../models/Account/account.type.js'

export const deleteUser: Resolver<{params: {id: string}}, boolean> = async (
  _, { params: {id} }, context
) => {
  if (!context.user?.id) {
    throwError({
      message: "UNAUTHORIZED",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  const session = context.db.client.startSession();

  try {
    await session.withTransaction(async () => {
      const users = context.db.collection<UserDocument>('users');
      const transactions = context.db.collection<Transaction>('transactions');
      const budgets = context.db.collection<Budget>('budgets');
      const accounts = context.db.collection<Account>('accounts');

      const userObjectId = new ObjectId(id);
      const deletedUser = await users.deleteOne({_id: userObjectId});

      if (deletedUser.deletedCount === 0) {
        throwError({
          message: "USER_NOT_FOUND",
          status: HttpStatus.NOT_FOUND,
          code: GraphQLErrorCode.NOT_FOUND
        });
      }

      await Promise.all([
        transactions.deleteMany({ userId: userObjectId }),
        budgets.deleteMany({ userId: userObjectId }),
        accounts.deleteMany({ userId: userObjectId })
      ]);
    })

    return true

  } catch (error) {
    console.error("Error in deleteUser", error);
    if (error instanceof GraphQLError) throw error;
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  } finally {
    await session.endSession()
  }
}