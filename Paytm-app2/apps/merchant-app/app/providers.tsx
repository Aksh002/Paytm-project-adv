"use client"

import { RecoilRoot } from "recoil"
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

export const Providers = ({children}:{children: ReactNode}) => {
    return (
        <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    )
}