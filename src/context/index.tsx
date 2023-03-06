import { supabase } from '@/shared/server/database/supabase'
import { getSession } from 'next-auth/react'
import React, { PropsWithChildren, useEffect, useState } from 'react'

interface AppContext {
  transactions: ITransaction[]
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
}

export const AppContext = React.createContext<AppContext>({} as AppContext)

export function AppProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [session, setSession] = useState<any>(null)

  async function sla() {
    const data = await getSession()

    setSession(data)
  }

  async function getTransactions(owner: string) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('owner', owner)

      if (error) {
        throw new Error(error.message)
      }

      setTransactions(data as ITransaction[])
    } catch (error) {
      setTransactions([])
    }
  }

  useEffect(() => {
    if (!session) {
      sla()
      return
    }

    if (session) {
      getTransactions(session?.user?.email)
    }
  })

  // const owner = session?.user!.email

  // async function getTransactions() {
  //   try {
  //     const { data, error } = await supabase
  //       .from('transactions')
  //       .select('*')
  //       .eq('owner', owner)

  //     if (error) {
  //       throw new Error(error.message)
  //     }

  //     setTransactions(data as ITransaction[])
  //   } catch (error) {
  //     setTransactions([])
  //   }
  // }

  // useEffect(() => {
  //   console.log(owner)

  //   if (owner) {
  //     getTransactions()
  //   }
  // }, [owner])

  return (
    <AppContext.Provider value={{ transactions, setTransactions }}>
      {props.children}
    </AppContext.Provider>
  )
}
