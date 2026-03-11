import { ObjectId } from "mongodb";
import { Account } from '../../../models/Account/account.type.js'
import { Resolver } from '../../types/resolver.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const getAccounts: Resolver<undefined, Account[]> = async (
  _,
  __,
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const accounts = context.db.collection<Account>("accounts");
    const userId = new ObjectId(currentUser.id);

    return await accounts.find({ userId }).toArray();
  } catch (error) {
    console.error("Error in getAccounts", error);
    internalServerError()
  }
}