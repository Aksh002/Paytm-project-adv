import { useState } from "react";
import { p2pTransfers } from "../actions/p2pTransfers";
export const useP2Ptransaction = () => {
    const [loading,setLoading] = useState(false);

    const transaction = async (to:string, amount:number) =>{
        setLoading(true);
        try{
            const result = await p2pTransfers({to,amount});
            return result
        }catch(e){
            console.error("Error creating P2Ptransaction:", e);
            return { message: "Error creating P2Ptransaction" };
        } finally {
            setLoading(false);
        }
    }
    return {loading,transaction}
}