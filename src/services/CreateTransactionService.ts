import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionInfo {
  title : string, 
  value: number, 
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: TransactionInfo): Transaction {

    if(type == "outcome") {
      const balance = this.transactionsRepository.getBalance()
      if (balance.total < value){
        throw new Error('Outcome value cannot be greater than income value')
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService;
