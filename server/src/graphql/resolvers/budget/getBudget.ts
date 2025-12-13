import { GraphQLContext } from '../../types/context.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '../../../utils/errors.js'
import { ObjectId } from 'mongodb'
import { Transaction } from '../../../models/Transaction/transaction.type.js'
import { Budget } from '../../../models/Budget/budget.type.js'

interface BudgetParams {
  year: number;
  month: number;
}

export const getBudget = async (
  _: undefined,
  { year, month }: BudgetParams,
  context: GraphQLContext
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
    const transactions = context.db.collection<Transaction>("transactions");
    const userId = new ObjectId(context.user?.id);
    const budget = await budgets.findOne({ userId, year, month });

    if (!budget) {
      throwError({
        message: "Budget not found",
        status: HttpStatus.NOT_FOUND,
        code: GraphQLErrorCode.NOT_FOUND
      })
    }

    const expenses = await transactions.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`)
          }
        }
      },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" }
        }
      }
    ]).toArray();

    const spentTotal = expenses.reduce((acc, e) => {
      return acc + Math.abs(e.spent)
    }, 0);

    return {
      year,
      month,
      budget: budget.totalBudget,
      spent: spentTotal,
      remaining: budget.totalBudget - spentTotal,
    }
  } catch (error) {
    console.error("Error budget:", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}