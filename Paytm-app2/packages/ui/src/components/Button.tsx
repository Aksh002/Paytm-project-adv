"use client"

import { ReactNode } from "react";

interface ButtonProps{
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}

export const Button = ({onClick, disabled, children}:ButtonProps) =>{
    return <div>
        <button onClick={onClick} type="button" disabled={disabled} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:cursor-pointer">
            {children}
        </button>
    </div>
}