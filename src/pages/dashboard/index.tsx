import { Header } from '@/components/Header'
import { NewTransactionModal } from '@/components/NewTransactionModal'
import { TransactionsTable } from '@/components/TransactionsTable'

export default function Dashboard() {
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
