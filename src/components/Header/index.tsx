import Image from 'next/image'
import Logo from '../../assets/logo.svg'

import { MoneyInfo } from '../MoneyInfo'

export function Header() {
  return (
    <header className="bg-primary w-full flex flex-col items-center p-6">
      <Image src={Logo} width={200} height={100} alt="" />
      <div className="grid grid-cols-3 gap-6 mt-10 mb-[-60px]">
        <MoneyInfo title="Entradas" value={17400} icon="income" />
        <MoneyInfo title="Saídas" value={1259} icon="expense" />
        <MoneyInfo title="Total" value={17400} color="green" icon="total" />
      </div>
    </header>
  )
}
