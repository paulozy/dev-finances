import { Header } from '@/components/Header'
import { LogoutButton } from '@/components/LogoutButton'
import { NewTransactionModal } from '@/components/NewTransactionModal'
import { TransactionsTable } from '@/components/TransactionsTable'
import { supabase } from '@/shared/server/database/supabase'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const { data: session } = useSession()
  const { push } = useRouter()

  const owner = session?.user!.email

  async function getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('owner', owner)

    if (error) {
      throw new Error(error.message)
    }

    setTransactions(data as ITransaction[])
  }

  useEffect(() => {
    if (owner) {
      getTransactions()
    }
  }, [owner])

  return (
    <div className="w-[100vw] h-[100vh] bg-dash flex flex-col items-center">
      <Header transactions={transactions} />

      <div className="flex flex-col items-center overflow-x-auto w-[800px] mt-[70px] overflow-hidden md:w-[540px] xsm:w-[300px]">
        <NewTransactionModal setTransactions={setTransactions} />
        <TransactionsTable
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>

      <LogoutButton />
    </div>
  )
}
