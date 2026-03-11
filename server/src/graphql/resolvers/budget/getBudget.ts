import { ObjectId } from 'mongodb'
import { Transaction } from '../../../models/Transaction/transaction.db.js'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Resolver } from '../../types/resolver.js'
import { GetBudgetResponse } from '../../../models/Budget/budget.output.js'
import { ExpenseGroup } from '../../types/aggregations/expenseGroup.types.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const getBudget: Resolver<{year: number, month: number}, GetBudgetResponse> = async (
  _,
  { year, month },
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const budgets = context.db.collection<Budget>("budgets");
    const transactions = context.db.collection<Transaction>("transactions");
    const userId = new ObjectId(currentUser.id);
    const budget = await budgets.findOne({ userId, year, month });

    if (!budget) {
      return {
        year,
        month,
        total: 0,
        remaining: 0,
        spent: 0,
        currency: "USD"
      } as GetBudgetResponse
    }

    const expenses = await transactions.aggregate<ExpenseGroup>([
      {
        $match: {
          userId,
          type: "expense",
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

    const response: GetBudgetResponse = {
      year,
      month,
      total: budget.total,
      remaining: budget.total - spentTotal,
      spent: spentTotal,
      currency: budget.currency,
    }

    return response
  } catch (error) {
    console.error("Error budget:", error);
    internalServerError()
  }
}