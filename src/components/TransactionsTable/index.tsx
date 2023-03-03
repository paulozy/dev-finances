import { AppContext } from '@/context'
import { useContext } from 'react'
import { Transaction } from '../Transaction'

export function TransactionsTable() {
  const { transactions } = useContext(AppContext)

  return (
    <div className="w-full">
      <header className="flex items-center justify-between bg-white px-8 py-4 rounded-t-md mt-8 text-zinc-500">
        <div>Descrição</div>
        <div>Valor</div>
        <div>Data</div>
        <div></div>
      </header>

      {transactions && (
        <section className="w-full">
          {transactions.map((transaction: any) => (
            <Transaction
              id={transaction.id}
              key={transaction.id}
              type={transaction.type}
              description={transaction.description}
              value={transaction.value}
              date={transaction.date}
            />
          ))}
        </section>
      )}
    </div>
  )
}
