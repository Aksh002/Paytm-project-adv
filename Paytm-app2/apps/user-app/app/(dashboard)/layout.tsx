import { SidebarItem } from "@repo/ui/components/SideBarItem"
import { Homeicon } from "@repo/ui/icons/homeicon"
import { TransferIcon } from "@repo/ui/icons/TransferIcon"
import { TransactionIcon } from "@repo/ui/icons/TransactionIcon"


export default function Layout({children}:{children:React.ReactNode}){
    return <div className="">
        <div className="flex">
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem href="/dashboard" icon={<Homeicon active={false} />}>Dashboard</SidebarItem>
                    <SidebarItem href="/transfer" icon={<TransferIcon/>}>Transfer</SidebarItem>
                    <SidebarItem href="/transactions" icon={<TransactionIcon active={false} />}>Transactions</SidebarItem>
                </div>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    </div>
}