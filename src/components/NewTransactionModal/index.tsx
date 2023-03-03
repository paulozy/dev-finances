import { AppContext } from '@/context'
import { trpc } from '@/shared/utils/trpc'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'

export function NewTransactionModal() {
  const { data: session } = useSession()
  const mutation = trpc.createTransaction.useMutation()
  const { setTransactions } = useContext(AppContext)

  function createTransaction(event: any) {
    event.preventDefault()

    const id = uuid()
    const value = Number(event.target.value.value)
    const description = event.target.description.value
    const date = event.target.date.value
    const type = value < 0 ? 'expense' : 'income'
    const owner = session?.user?.email

    const transaction = {
      id,
      type,
      value,
      description,
      date,
      owner: owner as string,
    }

    try {
      mutation.mutate(transaction)
      setTransactions((prev) => [...prev, transaction])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="self-start text-green-500 bg-transparent">
          + Nova Transação
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="p-[2.4rem] rounded-lg data-[state=open]:animate-contentSho w fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-dash">
          <Dialog.Title className="text-2xl">Nova Transação</Dialog.Title>
          <form
            className="w-max-[500px]"
            onSubmit={(e) => createTransaction(e)}
          >
            <div className="mt-3">
              <label
                htmlFor="description"
                className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap"
              >
                Descrição
              </label>
              <input
                type="text"
                placeholder="Descrição"
                id="description"
                className="border-none rounded-[0.2rem] p-3 w-full"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="value"
                className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap"
              >
                Valor
              </label>
              <input
                step={0.01}
                type="number"
                placeholder="0,00"
                id="value"
                className="border-none rounded-[0.2rem] p-3 w-full"
              />
              <small className="opacity-40">
                Use o sinal - (negativo) para despesas e , (vírgula) para casas
                decimais
              </small>
            </div>
            <div className="mt-3">
              <label
                htmlFor="date"
                className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap"
              >
                Data
              </label>
              <input
                type="date"
                placeholder="dd/mm/aaaa"
                id="date"
                className="border-none rounded-[0.2rem] p-3 w-full"
              />
            </div>

            <div className="flex gap-5 items-center justify-between mt-5">
              <Dialog.Close asChild>
                <button className="w-[48%] text-red-400 border-solid border-2 border-red-300 rounded-sm h-[50px] flex items-center justify-center cursor-pointer">
                  Cancelar
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="w-[48%] border-none bg-green-600 text-zinc-50 p-0 h-[50px] rounded-sm cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
