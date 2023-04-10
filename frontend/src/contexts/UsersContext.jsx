import { useState } from "react";
import { createContext } from "react";


export const UsersContext = createContext({});

export const UsersContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    
    const [shouldShowCreateUser, setShouldShowCreateUser] = useState(false);


    const value = {
        currentSelectionInternalOption,
        shouldShowCreateUser,
        onOptionClicked,
        setShouldShowCreateUser, 
    }


    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    )
}