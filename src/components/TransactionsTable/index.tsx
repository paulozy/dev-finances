import { Transaction } from '../Transaction'

interface TransactionsTableProps {
  transactions: ITransaction[]
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export function TransactionsTable({
  transactions,
  setTransactions,
}: TransactionsTableProps) {
  return (
    <div className="w-full overflow-y-auto ">
      <header className="flex items-center justify-between bg-white px-8 py-4 rounded-t-md mt-8 text-zinc-500 sticky xsm:w-[450px]">
        <div>Descrição</div>
        <div>Valor</div>
        <div>Data</div>
        <div></div>
      </header>

      <section className="w-full">
        {transactions.map((transaction: any) => (
          <Transaction
            id={transaction.id}
            key={transaction.id}
            type={transaction.type}
            description={transaction.description}
            value={transaction.value}
            date={transaction.date}
            setTransactions={setTransactions}
          />
        ))}
      </section>
    </div>
  )
}
