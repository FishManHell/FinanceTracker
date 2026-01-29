import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'
import { Resolver } from '../../types/resolver.js'
import { EditBudgetParams } from '../../../models/Budget/budget.input.js'
import { EditBudgetResponse } from '../../../models/Budget/budget.output.js'

export const editBudget: Resolver<EditBudgetParams, EditBudgetResponse> = async (
  _,
  { params: {id, update: budget} },
  context
) => {
  if (!context.user?.id) {
    throwError({
      message: "Unauthorized",
      status: HttpStatus.UNAUTHORIZED,
      code: GraphQLErrorCode.UNAUTHORIZED
    });
  }

  try {
    const budgets = context.db.collection<Budget>("budgets");
    const existing = await budgets.findOne({
      userId: new ObjectId(context.user?.id),
      _id: new ObjectId(id)
    });

    if (!existing) {
      throwError({
        message: "AddBudgetForm not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

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
    if (error instanceof GraphQLError) {
      throw error;
    }
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}