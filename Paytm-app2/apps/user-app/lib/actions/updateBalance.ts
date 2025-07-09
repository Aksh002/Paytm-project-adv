"use server"
export enum TransactionType {
    PostOnRamp,
    PostOffRamp,
    PostP2PTransfer
}
export enum Direction{
    Inc,
    Dec
}
//export type transactionTy = transactionType 

export async function updateBalance(type: TransactionType , direction : Direction, amount : number) {
    if (type === TransactionType.PostOnRamp){
        
    }
} 