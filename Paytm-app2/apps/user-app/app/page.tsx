"use client"
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import { Test } from "@repo/ui/components/Test";
import { PrismaClient } from "@repo/db/client"
import { Button } from "@repo/ui/components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/components/Appbar";

export default function Page() {
  const session = useSession();
  return (
    <div className="">
    </div>
  );
}
