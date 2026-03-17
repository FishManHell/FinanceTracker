import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId, OptionalId } from 'mongodb'
import { SetBudgetParams } from '../../../models/Budget/budget.input.js'
import { Resolver } from '../../types/resolver.js'
import { SetBudgetResponse } from '../../../models/Budget/budget.output.js'
import { GraphQLError } from 'graphql/index.js'
import { requireUser } from '../../../utils/auth.js'
import { conflict, internalServerError } from '../../../utils/errors/httpErrors.js'
import { isMongoDuplicateError } from '../../../utils/errors/isMongoDuplicateError.js'


export const setBudget: Resolver<SetBudgetParams, SetBudgetResponse> = async (
  _,
  { params: budget },
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const budgets = context.db.collection<OptionalId<Budget>>("budgets");
    const userId = new ObjectId(currentUser.id);
    const insertNewBudget = await budgets.insertOne({
      userId,
      ...budget,
      createdAt: new Date()
    })

    const response: SetBudgetResponse = {
      id: insertNewBudget.insertedId.toString(),
      ...budget,
    }

    return response

  } catch (error) {
    console.error("Error inserting budget", error);

    if (isMongoDuplicateError(error)) conflict("Budget already exists")

    if (error instanceof GraphQLError) throw error;
    internalServerError()
  }
}