import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId } from 'mongodb'
import { Resolver } from '../../types/resolver.js'
import { GetBudgetsResponse } from '../../../models/Budget/budget.output.js'

export const getBudgets: Resolver<{}, GetBudgetsResponse[]> = async (
  _,
  __,
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
    const userId = new ObjectId(context.user?.id);
    const userBudgets = await budgets.find({ userId }).toArray();
    return userBudgets.map(({_id, userId, createdAt, ...rest}) => {
      return { id: _id.toString(), ...rest }
    });
  } catch (error) {
    console.error("Error get budgets:", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}