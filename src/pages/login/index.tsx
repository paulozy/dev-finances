import { getSession, signIn } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Logo from '../../assets/logo.svg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="h-[100vh] w-[100vw] bg-primary flex flex-col items-center justify-center">
      <Image src={Logo} width={400} height={300} alt="" />

      <h1 className="mt-4 text-3xl text-white font-semi-bold">
        Seja bem vindo!
      </h1>
      <p className="mt-1 text-zinc-100">
        Por favor faça login com uma das opções abaixo
      </p>

      <div className="flex items-center justify-around gap-4">
        <button onClick={() => signIn('github')} className="mt-4">
          <FaGithub size={32} color="white" />
        </button>

        <button onClick={() => signIn('google')} className="mt-4">
          <FaGoogle size={32} color="white" />
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
