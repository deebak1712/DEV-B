import { createContext, useContext, useState, useEffect } from "react"

const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev])
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionContext)