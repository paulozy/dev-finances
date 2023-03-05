import { trpc } from "@/shared/utils/trpc";
import * as Dialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import * as Toast from "@radix-ui/react-toast";
import { useRef, useState } from "react";

interface NewTransactionModalProps {
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
}

function oneWeekAway(date?: any) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

export function NewTransactionModal({
  setTransactions,
}: NewTransactionModalProps) {
  const [lastCreatedTransaction, setLastCreatedTransaction] =
    useState<ITransaction>();
  const { data: session } = useSession();
  const createTransactionMutation = trpc.createTransaction.useMutation();
  const deleteTransactionMutation = trpc.deleteTransaction.useMutation();

  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  function createTransaction(event: any) {
    event.preventDefault();

    const id = uuid();
    const value = Number(event.target.value.value);
    const description = event.target.description.value;
    const date = event.target.date.value;
    const type = value < 0 ? "expense" : "income";
    const owner = session?.user?.email;

    if (!date) return alert("Insira uma data valida");

    if (description.length > 35 || description.length < 3)
      return alert("A descrição deve ter entre 3 e 35 caracteres");

    if (!value || value === 0) return alert("Insira um valor valido");

    const transaction = {
      id,
      type,
      value,
      description,
      date,
      owner: owner as string,
    };

    createTransactionMutation.mutate(transaction);
    setTransactions((prev) => [...prev, transaction]);
    setLastCreatedTransaction(transaction);

    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      eventDateRef.current = oneWeekAway();
      setOpen(true);
    }, 100);
  }

  function undoCreation() {
    deleteTransactionMutation.mutate({
      id: lastCreatedTransaction?.id as string,
    });

    setTransactions((prev) => {
      const newTransactions = prev.filter(
        (transaction) => transaction.id !== lastCreatedTransaction?.id
      );

      return newTransactions;
    });
  }

  return (
    <Toast.Provider>
      <Toast.Root
        className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          Transação criada
        </Toast.Title>
        <Toast.Description asChild>
          <time
            className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
            dateTime={eventDateRef.current.toISOString()}
          ></time>
        </Toast.Description>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        >
          <button
            className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
            onClick={undoCreation}
          >
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="self-start text-green-500 bg-transparent">
            + Nova Transação
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-40 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="p-[2.4rem] xs:p-4 rounded-lg data-[state=open]:animate-contentSho w fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-dash">
            <Dialog.Title className="text-2xl">Nova Transação</Dialog.Title>
            <form
              className="w-max-[500px] xs:w-[300px]"
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
                  Use o sinal - (negativo) para despesas e , (vírgula) para
                  casas decimais
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
    </Toast.Provider>
  );
}
