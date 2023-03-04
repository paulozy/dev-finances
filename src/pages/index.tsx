import { getSession } from 'next-auth/react'

export default function Home(props: any) {
  console.log(props)

  return <></>
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context.req)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
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
