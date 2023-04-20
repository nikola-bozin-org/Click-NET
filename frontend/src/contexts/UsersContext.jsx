import { useState } from "react";
import { createContext } from "react";


export const UsersContext = createContext({});

export const UsersContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    const [showUserData,setShowUserData] = useState(false);
   
   
    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    
    const value = {
        currentSelectionInternalOption,
        onOptionClicked,
        showUserData,
        setShowUserData,
    }


    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    )
}