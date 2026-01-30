import { Resolver } from '../../types/resolver.js'
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { ObjectId } from 'mongodb'


interface GetBudgetYearlyByMonthResponse {
  month: number;
  budget: number;
  budgetCurrency: string | null;
  expenseCurrency: string | null;
  expense: number;
}

export const getBudgetYearlyByMonth: Resolver<{ year: number }, GetBudgetYearlyByMonthResponse[]> = async (
  _,
  { year },
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
    const userId = new ObjectId(context.user?.id);
    const budgets = context.db.collection<Budget>("budgets");
    const transactions = context.db.collection<Transaction>("transactions");
    const budgetsByMonth = await budgets.find({ userId, year }).toArray();
    const expensesByMonth = await transactions.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          date: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: "$amount" },
          currency: { $first: "$currency" }
        }
      }
    ]).toArray()

    const result: GetBudgetYearlyByMonthResponse[] = Array.from({ length: 12 }).map((_, i) => {
      const budget = budgetsByMonth.find(b => b.month === i + 1)
      const expense = expensesByMonth.find(e => e._id.month === i + 1)

      return {
        month: i + 1,
        budget: budget?.total ?? 0,
        budgetCurrency: budget?.currency ?? null,
        expense: expense?.total ?? 0,
        expenseCurrency: expense?.currency ?? null
      }
    })

    return result

  } catch (error) {
    console.error("Error budget year by month:", error);
    throwError({
      message: "INTERNAL_SERVER_ERROR",
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: GraphQLErrorCode.INTERNAL_SERVER_ERROR
    })
  }
}