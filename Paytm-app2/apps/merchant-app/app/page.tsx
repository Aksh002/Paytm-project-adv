"use client"

import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import { useBalance } from "@repo/store/useBalance"

export default function Page() {
  //const session = useSession()
  const balance = useBalance()
  return (
    <div>
      <div>
        {balance}
      </div>
    </div>
  );
}
