import { Header } from '@/components/Header'
import { LogoutButton } from '@/components/LogoutButton'
import { NewTransactionModal } from '@/components/NewTransactionModal'
import { TransactionsTable } from '@/components/TransactionsTable'
import { trpc } from '@/shared/utils/trpc'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const { data: session } = useSession()
  const getTransactionsTrpc = trpc.getTransactions.useMutation()

  const owner = session?.user!.email

  async function getTransactions() {
    const data = await getTransactionsTrpc.mutateAsync({
      owner: owner as string,
    })

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

      <div className="flex flex-col items-center justify-center overflow-x-auto w-[800px] mt-[70px] overflow-hidden xs:w-[340px] xsm:w-[350px] md:w-[800px]">
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
