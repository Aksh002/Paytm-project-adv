import { SidebarItem } from "@repo/ui/components/SideBarItem"
import { Homeicon } from "@repo/ui/icons/homeicon"
import { TransferIcon } from "@repo/ui/icons/TransferIcon"
import { TransactionIcon } from "@repo/ui/icons/TransactionIcon"
import { P2PtransferIcon } from "@repo/ui/icons/P2Ptransfer"


export default function Layout({children}:{children:React.ReactNode}){
    return <div className="">
        <div className="flex">
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem href="/dashboard" icon={<Homeicon active={false} />}>Dashboard</SidebarItem>
                    <SidebarItem href="/transfer" icon={<TransferIcon/>}>Transfer</SidebarItem>
                    <SidebarItem href="/transactions" icon={<TransactionIcon active={false} />}>Transactions</SidebarItem>
                    <SidebarItem href="/p2pTransfer" icon={<P2PtransferIcon active={false} />}>P2P Transfer</SidebarItem>
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    </div>
}