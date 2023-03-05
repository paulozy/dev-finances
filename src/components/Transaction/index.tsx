import { trpc } from '@/shared/utils/trpc'
import { AiOutlineMinusCircle } from 'react-icons/ai'

interface TransactionProps {
  type: 'income' | 'expense'
  description: string
  value: number
  date: string
  id: string
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export function Transaction({
  description,
  value,
  date,
  type,
  id,
  setTransactions,
}: TransactionProps) {
  const expense = type === 'expense' ? 'text-red-500' : 'text-green-500'

  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const valueFormatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })

  const mutation = trpc.deleteTransaction.useMutation()

  function handleDeleteTransaction() {
    try {
      mutation.mutate({ id })

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-between px-8 py-4 font-medium text-zinc-700 bg-white mt-2 ">
      <div>{description}</div>
      <div className={`${expense}`}>R$ {valueFormatted}</div>
      <div>{formattedDate}</div>
      <AiOutlineMinusCircle
        size={32}
        color="red"
        className="transition-transform cursor-pointer hover:scale-75"
        onClick={handleDeleteTransaction}
      />
    </div>
  )
}
