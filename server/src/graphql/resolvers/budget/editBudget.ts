import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'
import { Resolver } from '../../types/resolver.js'
import { EditBudgetParams } from '../../../models/Budget/budget.input.js'
import { EditBudgetResponse } from '../../../models/Budget/budget.output.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError, notFound } from '../../../utils/errors/httpErrors.js'

export const editBudget: Resolver<EditBudgetParams, EditBudgetResponse> = async (
  _,
  { params: {id, update: budget} },
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const budgets = context.db.collection<Budget>("budgets");
    const existing = await budgets.findOne({
      userId: new ObjectId(currentUser?.id),
      _id: new ObjectId(id)
    });

    if (!existing) notFound("Budget not found")

    await budgets.updateOne(
      { _id: existing._id },
      { $set: budget }
    );

    const response: EditBudgetResponse = {
      id: existing._id.toString(),
      ...budget,
    }

    return response

  } catch (error) {
    console.error("Error edit budget:", error);
    if (error instanceof GraphQLError) throw error;
    internalServerError()
  }
}