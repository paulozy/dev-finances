import { BiDollar } from 'react-icons/bi'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'

interface MoneyInfoProps {
  title: string
  value: number
  icon: string
  color?: string
}

export function getIconFromName(name: string) {
  switch (name) {
    case 'income':
      return <BsArrowUpCircle size={24} color="green" />
    case 'expense':
      return <BsArrowDownCircle size={24} color="red" />
    case 'total':
      return <BiDollar size={24} color="white" />
  }
}

export function MoneyInfo({
  color = 'zinc',
  icon,
  title,
  value,
}: MoneyInfoProps) {
  const Icon = getIconFromName(icon)
  const valueFormatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })

  const colorText = color !== 'green' ? 'text-zinc-800' : 'text-zinc-50'

  const totalCard = color === 'green'

  return (
    <>
      {totalCard ? (
        <div
          className={`w-[250px] h-[130px] bg-green-700 rounded-lg p-5 shadow-md fle flex-col xs:w-full sm:w-full`}
        >
          <header className="flex items-center justify-between">
            <span className={`${colorText} font-semibold`}>{title}</span>
            {Icon}
          </header>

          <p className={`text-3xl ${colorText} mt-6 font-normal`}>
            R$ {valueFormatted}
          </p>
        </div>
      ) : (
        <div
          className={`w-[250px] h-[130px] bg-zinc-50  rounded-lg p-5 shadow-md fle flex-col xs:w-full sm:w-full`}
        >
          <header className="flex items-center justify-between">
            <span className={`${colorText} font-semibold`}>{title}</span>
            {Icon}
          </header>

          <p className={`text-3xl ${colorText} mt-6 font-normal`}>
            R$ {valueFormatted}
          </p>
        </div>
      )}
    </>
  )
}
