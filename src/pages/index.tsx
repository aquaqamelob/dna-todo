import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Todos from "~/components/Todos";

export default function Home() {
  return (
    <>
      <Head>
        <title>DNA Todo App</title>
        <meta name="description" content="Created by aqua." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0290bb] to-[#202369]">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(200,100%,70%)]">DNA</span> Todo
          </h1>

          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>

          <Todos />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData ? () => void signOut() : () => void signIn()
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
