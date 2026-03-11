import { Budget } from '../../../models/Budget/budget.db.js'
import { ObjectId } from 'mongodb'
import { Resolver } from '../../types/resolver.js'
import { GetBudgetsResponse } from '../../../models/Budget/budget.output.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const getBudgets: Resolver<{}, GetBudgetsResponse> = async (
  _,
  __,
  context
) => {
  const currentUser = requireUser(context.user)

  try {
    const budgets = context.db.collection<Budget>("budgets");
    const userId = new ObjectId(currentUser.id);
    const userBudgets = await budgets
      .find({ userId })
      .sort({ year: -1, month: -1 })
      .toArray();
    return userBudgets.map(({_id, userId, createdAt, ...rest}) => {
      return { id: _id.toString(), ...rest }
    });
  } catch (error) {
    console.error("Error get budgets:", error);
    internalServerError()
  }
}