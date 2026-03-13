import type { SkeletonRows } from '../types/skeleton.types'

export function createSkeletonRows(count = 10): SkeletonRows {
  return Array.from({ length: count }, (_, i) => ({
    id: `skeleton-${i}`,
    __skeleton: true,
  }))
}
