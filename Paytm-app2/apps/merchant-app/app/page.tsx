"use client"

import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import { useBalance } from "@repo/store/useBalance"
import { Appbar } from "@repo/ui/components/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession()
  const balance = useBalance()
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} ></Appbar>
      <div>
        {balance}
      </div>
    </div>
  );
}
