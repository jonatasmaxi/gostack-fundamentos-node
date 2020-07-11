import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionInfo {
  title : string, 
  value: number, 
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const totalValues = this.transactions.reduce((accumulator,transaction) => {
      if(transaction.type === 'income') {
        accumulator.income += transaction.value 
      }
      else {
        accumulator.outcome += transaction.value
      }
      return accumulator
    }, {
      income: 0, 
      outcome: 0
    })
    return {
      income: totalValues.income,
      outcome: totalValues.outcome,
      total:  totalValues.income - totalValues.outcome
    }
  }

  public create({title, value, type}: TransactionInfo): Transaction {
    const transaction =  new Transaction({
      title,
      value, 
      type
    })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
