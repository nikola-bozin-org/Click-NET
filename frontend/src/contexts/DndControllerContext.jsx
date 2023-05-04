import { useState } from "react";
import { createContext } from "react";

export const DndControllerContext = createContext({});

export const DndControllerContextProvider = ({children})=>{
    const [isDragging,setIsDragging] = useState(false);

    const value = {
        isDragging,
        setIsDragging
    }

    return (
        <DndControllerContext.Provider value={value}>{children}</DndControllerContext.Provider>
    )
}