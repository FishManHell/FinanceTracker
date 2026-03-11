import { ObjectId } from 'mongodb'
import { Budget } from '../../../models/Budget/budget.db.js'
import { Resolver } from '../../types/resolver.js'
import { DeleteBudgetParams } from '../../../models/Budget/budget.input.js'
import { requireUser } from '../../../utils/auth.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const deleteBudget: Resolver<DeleteBudgetParams, boolean> = async (
  _,
  { params: { id } },
  context
) => {
  const currentUser = requireUser(context.user)
  try {
    const budgets = context.db.collection<Budget>("budgets");
    await budgets.deleteOne({
      userId: new ObjectId(currentUser.id),
      _id: new ObjectId(id),
    });

    return true
  } catch (error) {
    console.error("Error in delete budget", error);
    internalServerError()
  }
}