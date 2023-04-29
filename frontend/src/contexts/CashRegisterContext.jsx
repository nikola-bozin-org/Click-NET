import { useState } from "react";
import { createContext } from "react";

export const CashRegisterContext = createContext({})

export const CashRegisterContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(1);
    const [currentCashRegisterSessionPayments, setCurrentCashRegisterSessionPayments] = useState([]);
    const [totalRevenue,setTotalRevenue]=useState(0);
    const [cashierBalance,setCashierBalance]=useState(0);


    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    const value = {
        currentSelectionInternalOption,
        onOptionClicked,
        currentCashRegisterSessionPayments,
        setCurrentCashRegisterSessionPayments,
        totalRevenue,
        setTotalRevenue,
        cashierBalance,
        setCashierBalance
    }

    return (
        <CashRegisterContext.Provider value={value}>{children}</CashRegisterContext.Provider>
    )
}