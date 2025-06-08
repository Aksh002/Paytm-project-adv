"use client"

import { RecoilRoot } from "recoil"
import { ReactNode } from "react"

export const Providers = ({children}:{children: ReactNode}) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}