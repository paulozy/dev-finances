import Image from "next/image";
import Logo from "../../assets/logo.svg";

import { MoneyInfo } from "../MoneyInfo";

interface HeaderProps {
  transactions: ITransaction[];
}

export function Header({ transactions }: HeaderProps) {
  const incomes = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.value;
    }

    return acc;
  }, 0);

  const expenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      return acc - transaction.value;
    }

    return acc;
  }, 0);

  const total = incomes - expenses;

  return (
    <header className="bg-primary w-full flex flex-col items-center p-6">
      <Image src={Logo} width={200} height={100} alt="" />
      <div className="grid grid-cols-3 gap-6 mt-10 mb-[-60px] xs:grid-cols-1 xs:gap-3 xs:w-full sm:grid-cols-1 sm:gap-3 sm:w-full">
        <MoneyInfo title="Entradas" value={incomes} icon="income" />
        <MoneyInfo title="Saídas" value={expenses} icon="expense" />
        <MoneyInfo title="Total" value={total} color="green" icon="total" />
      </div>
    </header>
  );
}
