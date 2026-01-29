import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId, OptionalId } from 'mongodb'
import { SetBudgetParams } from '../../../models/Budget/budget.input.js'
import { Resolver } from '../../types/resolver.js'
import { SetBudgetResponse } from '../../../models/Budget/budget.output.js'
import { GraphQLError } from 'graphql/index.js'

export const setBudget: Resolver<SetBudgetParams, SetBudgetResponse> = async (
  _,
  { params: budget },
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
    const {year, month} = budget
    const budgets = context.db.collection<OptionalId<Budget>>("budgets");
    const userId = new ObjectId(context.user?.id);
    const existing = await budgets.findOne({userId, year, month});
    if (existing) {
      throwError({
        message: "Budget is already exists",
        status: HttpStatus.CONFLICT,
        code: GraphQLErrorCode.CONFLICT
      })
    }
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