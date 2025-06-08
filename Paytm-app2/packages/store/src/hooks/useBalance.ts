import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useBalance = () =>{
    const val = useRecoilValue(balanceAtom)
    return val;
}