import { signOut } from 'next-auth/react'
import { AiOutlineLogout } from 'react-icons/ai'

export function LogoutButton() {
  return (
    <button
      className="absolute right-8 bottom-8 w-[60px] h-[60px] bg-green-700 rounded-[50%] flex items-center justify-center transition-transform hover:scale-90 sm:hidden"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: '/login',
        })
      }
    >
      <AiOutlineLogout size={32} color="white" />
    </button>
  )
}
