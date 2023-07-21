import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/lib/api";
import "~/styles/globals.css";
import { CommandMenu } from "~/components/CommandMenu";
import { Toaster } from "~/components/ui/Toaster";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <CommandMenu />
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
