"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react";

type IconWithActiveProp = React.ReactElement<{ active?: boolean }>;

export const SidebarItem = ({
    children,
    href,
    icon
}: {
    children: React.ReactNode;
    href: string;
    icon: React.ReactElement<any>;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;
    // Only pass 'active' if the icon component supports it, otherwise just use the icon as is.
    const iconWithActive = React.cloneElement(icon as IconWithActiveProp, { active: selected });
    return <div>
        <div className={`flex group ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`}
            onClick={() => {
                router.push(href)
            }}>
            <div className="pr-2">
                {iconWithActive}
            </div>
            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {children}
            </div>
        </div>
    </div>
}