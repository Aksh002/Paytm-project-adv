import { useState } from "react";
import { createOnRampTransaction } from "../actions/createOnRampTransaction";

export const useCreateOnRampTransaction = () => {
    const [loading, setLoading] = useState(false);

    const create = async (provider: string, amount: number) => {
        setLoading(true);
        try {
            const result = await createOnRampTransaction(provider, amount);
            return result;
        } catch (error) {
            console.error("Error creating transaction:", error);
            return { message: "Error creating transaction" };
        } finally {
            setLoading(false);
        }
    };

    return { create, loading };
};