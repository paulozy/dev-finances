import { Header } from "@/components/Header";
import { LogoutButton } from "@/components/LogoutButton";
import { NewTransactionModal } from "@/components/NewTransactionModal";
import { TransactionsTable } from "@/components/TransactionsTable";
import { trpc } from "@/shared/utils/trpc";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/shared/server/routers/_app";
import superjson from "superjson";

interface User {
  email?: string;
  name?: string;
  image?: string;
}

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  // const { data: session } = useSession();
  // const getTransactionsTrpc = trpc.getTransactions.useMutation();

  // const owner = session?.user!.email;

  const { userEmail } = props;

  const getTransactionsQuery = trpc.getTransactionss.useQuery({
    owner: userEmail as string,
  });

  async function getTransactions() {
    const { data } = getTransactionsQuery;

    console.log(data);

    setTransactions(data as ITransaction[]);
  }

  useEffect(() => {
    if (transactions) getTransactions();
  }, [transactions]);

  return (
    <div className="w-[100vw] h-[100%] bg-dash flex flex-col items-center">
      <Header transactions={transactions} />

      <div className="flex flex-col items-center justify-center overflow-x-auto w-[800px] mt-[70px] xs:w-[340px] xsm:w-[350px] md:w-[800px]">
        <NewTransactionModal setTransactions={setTransactions} />
        <TransactionsTable
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>

      <LogoutButton />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: ctx,
    transformer: superjson,
  });

  const data = await getSession(ctx);

  const user: User = data?.user as User;

  console.log("aaaaaaaaaaa", user.email);

  await ssg.getTransactionss.prefetch({
    owner: user?.email as string,
  });

  return {
    props: {
      userEmail: user.email,
      trpcState: ssg.dehydrate(),
    },
  };
};
