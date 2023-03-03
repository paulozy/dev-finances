import { Header } from '@/components/Header'
import { NewTransactionModal } from '@/components/NewTransactionModal'
import { TransactionsTable } from '@/components/TransactionsTable'
import { AppContext } from '@/context'
import { useContext } from 'react'

export default function Dashboard() {
  const { setTransactions } = useContext(AppContext)

  // const createTransaction = async (newTransection: ITransaction) => {
  //   console.log('tratou a transaction')

  //   // inserir no banco
  //   // const response = await createTransaction(newTransection)

  //   try {
  //     const savedTransaction = await createTransactionDB(newTransection)

  //     setTransactions((prev) => [savedTransaction, ...prev])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="w-[100vw] h-[100vh] bg-dash flex flex-col items-center ">
      <Header />

      <div className="flex flex-col items-center overflow-x-auto w-[1120px] mt-[70px]">
        <NewTransactionModal />
        <TransactionsTable />
      </div>
    </div>
  )
}
