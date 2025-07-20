import { Button } from "./Button";

interface AppbarProps{
    user?:{
        name?:string | null
    },

    // Find and replace the type of these
    onSignin: ()=>void,
    onSignout:()=>void,                                         // TODO:- find any Next type for this, ther mut be for signin/signout fxn from next-auth/react
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