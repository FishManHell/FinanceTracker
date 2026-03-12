export interface SkeletonRow {
  id: string;
  __skeleton: true;
}

type SkeletonRows = SkeletonRow[];

export function createSkeletonRows(count = 10): SkeletonRows {
  return Array.from({ length: count }, (_, i) => ({
    id: `skeleton-${i}`,
    __skeleton: true,
  }))
}

export function filterSkeletonRows<T>(rows: (T | SkeletonRow)[]): T[] {
  return rows.filter((row): row is T => !isSkeletonRow(row))
}

function isSkeletonRow(row: unknown): row is SkeletonRow {
  return typeof row === 'object' && row !== null && '__skeleton' in row
}
