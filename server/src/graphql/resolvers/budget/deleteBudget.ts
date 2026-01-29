import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from 'mongodb'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Resolver } from '../../types/resolver.js'
import { DeleteBudgetParams } from '../../../models/Budget/budget.input.js'

export const deleteBudget: Resolver<DeleteBudgetParams, boolean> = async (
  _,
  { params: { id } },
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
    await budgets.deleteOne({
      userId: new ObjectId(context.user?.id),
      _id: new ObjectId(id),
    });

    return true
  } catch (error) {
    console.error("Error in delete budget", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}