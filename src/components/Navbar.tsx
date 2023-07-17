import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <img
      src={sessionData?.user.image!}
      className="fixed right-8 top-4 h-12 w-12 rounded-full"
    />
  );
}
