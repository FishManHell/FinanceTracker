import { type SkeletonRow } from '../types/skeleton.types'
import { createSkeletonRows } from "./createSkeletonRows"

export function resolveRowsWithSkeleton<T>(
  data: T[] | undefined,
  isSkeleton: boolean,
  count = 5,
): (T | SkeletonRow)[] {
  if (isSkeleton && (!data || data.length === 0)) {
    return createSkeletonRows(count)
  }

  return data ?? []
}
