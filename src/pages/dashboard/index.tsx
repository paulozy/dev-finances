import { Header } from '@/components/Header'
import { LogoutButton } from '@/components/LogoutButton'
import { NewTransactionModal } from '@/components/NewTransactionModal'
import { TransactionsTable } from '@/components/TransactionsTable'
import { appRouter } from '@/shared/server/routers/_app'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import superjson from 'superjson'

interface User {
  email?: string
  name?: string
  image?: string
}

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const { transactionsData } = props

  async function getTransactions() {
    setTransactions(transactionsData as ITransaction[])
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] bg-dash flex flex-col items-center">
      <Header transactions={transactions} />

      <div className="flex flex-col items-center justify-center overflow-x-auto w-[800px] mt-[70px] xs:w-[340px] xs:h-full xsm:w-[350px] md:w-[800px]">
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

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: ctx,
    transformer: superjson,
  })

  const data = await getSession(ctx)

  const user: User = data?.user as User

  const sla = await ssg.getTransactionss.fetch({
    owner: user?.email as string,
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      transactionsData: sla,
    },
  }
}
