import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext({});

export const AppContextProvider = ({children})=>{
    const [currentSidebarSelection,setCurrentSidebarSelection] = useState(0);
    const [isAuthorized,setIsAuthorized]=useState(false);
    const [shouldShowCreateUser, setShouldShowCreateUser] = useState(false);
    const [shouldShowCloseCashRegister,setShouldShowCloseCashRegister] = useState(false);
    const [isCashRegisterOpen,setIsCashRegisterOpen] = useState(false);


    const value = {
        currentSidebarSelection,
        setCurrentSidebarSelection,
        isAuthorized,
        setIsAuthorized,
        shouldShowCreateUser,
        setShouldShowCreateUser, 
        shouldShowCloseCashRegister,
        setShouldShowCloseCashRegister,
        isCashRegisterOpen,
        setIsCashRegisterOpen
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}