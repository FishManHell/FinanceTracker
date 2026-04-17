import { ObjectId } from 'mongodb'
import { Resolver } from '#graphql/types/resolver.js'
import { Transaction } from '#models/Transaction/transaction.db.js'
import { requireUser } from '#utils/auth.js'
import { internalServerError, notFound } from '#utils/errors/httpErrors.js'
import { rethrowGraphQLError } from '#utils/errors/rethrowGraphQLError.js'

export const deleteTransaction: Resolver<{ id: string }, boolean> = async (
  _,
  { id },
  context,
) => {
  const currentUser = requireUser(context.user)

  try {
    const transactions = context.db.collection<Transaction>('transactions')

    const userId = new ObjectId(currentUser.id)
    const transactionId = new ObjectId(id)

    const result = await transactions.deleteOne({
      _id: transactionId,
      userId,
    })

    if (result.deletedCount === 0) notFound("Transaction not found")

    return true

  } catch (error) {
    console.error("Error deleting transaction:", error)
    rethrowGraphQLError(error)
    internalServerError()
  }
}