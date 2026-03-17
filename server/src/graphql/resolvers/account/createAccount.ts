import { Resolver } from '../../types/resolver.js'
import { Account } from '../../../models/Account/account.type.js'
import { requireUser } from '../../../utils/auth.js'
import { conflict, internalServerError } from '../../../utils/errors/httpErrors.js'
import { ObjectId } from 'mongodb'
import { isMongoDuplicateError } from '../../../utils/errors/isMongoDuplicateError.js'

export interface CreateAccountInput {
  params: {
    type: string;
    description: string;
    currency: string;
    amount: number;
  }
}

export const createAccount: Resolver<CreateAccountInput, Account> = async (
  _,
  {params},
  context
) => {
  const currentUser = requireUser(context.user);
  const type = params.type?.trim()
  const description = params.description?.trim()
  const currency = params.currency?.trim() || 'USD'
  const amount = params.amount ?? 0

  if (!type) conflict('Account type is required')
  if (!description) conflict('Account description is required')

  try {
    const accounts = context.db.collection<Account>("accounts");
    const newAccount: Account = {
      _id: new ObjectId(),
      userId: new ObjectId(currentUser.id),
      type,
      description,
      currency,
      amount,
    }

    await accounts.insertOne(newAccount)

    return newAccount
  } catch (error) {
    if (isMongoDuplicateError(error)) conflict("Account already exists")
    console.error("Error in getAccounts", error);
    internalServerError()
  }
}