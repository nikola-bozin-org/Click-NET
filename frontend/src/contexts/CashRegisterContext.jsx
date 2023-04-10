import { useState } from "react";
import { createContext } from "react";

export const CashRegisterContext = createContext({})

export const CashRegisterContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    const value = {
        currentSelectionInternalOption,
        onOptionClicked
    }

    return (
        <CashRegisterContext.Provider value={value}>{children}</CashRegisterContext.Provider>
    )
}