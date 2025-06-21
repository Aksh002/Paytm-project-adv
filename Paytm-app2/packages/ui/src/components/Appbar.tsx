import { Button } from "./Button";

interface AppbarProps{
    user?:{
        name?:string | null
    },

    // Find and replace the type of these
    onSignin:any,
    onSignout:any,
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps)=>{
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? `Logout ${user.name}` : "Login"}</Button>
        </div>
    </div>
}