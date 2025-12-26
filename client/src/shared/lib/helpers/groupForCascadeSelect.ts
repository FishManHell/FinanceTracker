import { capitalize } from './capitalize'

interface GroupedResult<T> {
  type: string
  items: T[]
}

interface FlatItem {
  type: string
  description: string
}

export function groupForCascadeSelect(array: FlatItem[]): GroupedResult<FlatItem>[] {
  const map = new Map<string, GroupedResult<FlatItem>>();

  for (const item of array) {
    const groupLabel = capitalize(item.type)

    if (!map.has(groupLabel)) {
      map.set(groupLabel, {
        type: groupLabel,
        items: [],
      })
    }
    map.get(groupLabel)!.items.push(item)
  }

  return Array.from(map.values())
}
