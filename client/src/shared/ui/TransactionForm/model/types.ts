import type { Account, TransactionWithoutType } from '@/entities/transaction'

interface AccountGroup {
  type: string;
  descriptions: Account[];
}

type Accounts = AccountGroup[];

type BaseTransactionFormData = Omit<TransactionWithoutType, 'account'>

export interface TransactionFormData extends BaseTransactionFormData {
  account: Accounts
}

export interface DialogData {
  onSubmit: (payload: TransactionFormData) => void;
  initialData?: TransactionFormData;
  mode?: 'add' | 'edit';
}

export interface InjectedProps {
  data: DialogData
  close: () => void
}
