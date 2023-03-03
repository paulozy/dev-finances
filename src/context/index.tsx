import React, { PropsWithChildren, useEffect, useState } from 'react'

interface AppContext {
  transactions: ITransaction[]
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
  getTransactions: () => void
}

export const AppContext = React.createContext<AppContext>({} as AppContext)

export function AppProvider(props: PropsWithChildren) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  function getTransactions() {
    setTransactions([])
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <AppContext.Provider
      value={{ transactions, setTransactions, getTransactions }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
