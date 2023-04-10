import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext({});

export const AppContextProvider = ({children})=>{
    const [currentSidebarSelection,setCurrentSidebarSelection] = useState(0);

    const value = {
        currentSidebarSelection,
        setCurrentSidebarSelection
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}