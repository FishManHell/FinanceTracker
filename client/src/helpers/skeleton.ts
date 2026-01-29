export function createSkeletonBudgets(count = 10) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i.toString(),
    __skeleton: true,
  }))
}
