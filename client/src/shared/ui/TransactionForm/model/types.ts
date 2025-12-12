interface AccountDescription {
  description: string;
  type: string;
}

interface AccountGroup {
  type: string;
  descriptions: AccountDescription[];
}

type Accounts = AccountGroup[];

export interface TransactionFormData {
  date: Date;
  amount: number;
  category: string;
  account: Accounts;
  type: string;
  currency: string;
  description: string;
}

export interface DialogData {
  onSubmit: (payload: TransactionFormData) => void;
  initialData?: TransactionFormData;
  mode?: 'add' | 'edit';
}

export interface InjectedProps {
  value: {
    data: DialogData
  };
  close: () => void
}
