import { AppContext } from '@/context'
import Image from 'next/image'
import { useContext } from 'react'
import Logo from '../../assets/logo.svg'

import { MoneyInfo } from '../MoneyInfo'

export function Header() {
  const { transactions } = useContext(AppContext)

  const incomes = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.value
    }

    return acc
  }, 0)

  const expenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      return acc - transaction.value
    }

    return acc
  }, 0)

  const total = incomes - expenses

  return (
    <header className="bg-primary w-full flex flex-col items-center p-6">
      <Image src={Logo} width={200} height={100} alt="" />
      <div className="grid grid-cols-3 gap-6 mt-10 mb-[-60px]">
        <MoneyInfo title="Entradas" value={incomes} icon="income" />
        <MoneyInfo title="Saídas" value={expenses} icon="expense" />
        <MoneyInfo title="Total" value={total} color="green" icon="total" />
      </div>
    </header>
  )
}
