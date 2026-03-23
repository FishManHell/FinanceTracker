import type { AccountDTO, TransactionBaseDTO } from '@/entities/transaction'

type BaseTransactionFormValues = Omit<TransactionBaseDTO, 'account'>

export interface TransactionFormValues extends BaseTransactionFormValues {
  account: AccountDTO | null
}


export interface DialogData {
  initialData?: TransactionFormValues
  mode?: 'add' | 'edit'
}

export interface InjectedProps {
  data: DialogData
  close: () => void
}
