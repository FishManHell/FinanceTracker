type SeverityType = 'balance' | 'income' | 'expense'

export function getSeverity(type: SeverityType, value: number) {
  switch (type) {
    case 'balance':
      if (value > 0) return 'success'
      if (value < 0) return 'warn'
      return 'secondary'

    case 'income':
      return value > 0 ? 'success' : 'secondary'

    case 'expense':
      return value > 0 ? 'danger' : 'secondary'
  }
}
