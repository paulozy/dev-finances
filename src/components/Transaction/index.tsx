import { AiOutlineMinusCircle } from 'react-icons/ai'

interface TransactionProps {
  type: 'income' | 'expense'
  description: string
  value: number
  date: string
}

export function Transaction({
  description,
  value,
  date,
  type,
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

  return (
    <div className="flex items-center justify-between px-8 py-4 font-medium text-zinc-700 bg-white mt-2">
      <div>{description}</div>
      <div className={`${expense}`}>
        R$ {type === 'expense' ? `-${valueFormatted}` : valueFormatted}
      </div>
      <div>{formattedDate}</div>
      <AiOutlineMinusCircle
        size={32}
        color="red"
        className="transition-transform cursor-pointer hover:scale-75"
      />
    </div>
  )
}
