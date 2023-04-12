import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext({});

export const AppContextProvider = ({children})=>{
    const [currentSidebarSelection,setCurrentSidebarSelection] = useState(0);
    const [isAuthorized,setIsAuthorized]=useState(false);
    const value = {
        currentSidebarSelection,
        setCurrentSidebarSelection,
        isAuthorized,
        setIsAuthorized
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}