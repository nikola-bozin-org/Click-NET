import { useState } from "react";
import { createContext } from "react";

export const DndControllerContext = createContext({});

export const DndControllerContextProvider = ({children})=>{
    const [isDragging,setIsDragging] = useState(false);
    const [currentComponent,setCurrentComponent] = useState();

    const value = {
        isDragging,
        setIsDragging,
        currentComponent,
        setCurrentComponent,
    }

    return (
        <DndControllerContext.Provider value={value}>{children}</DndControllerContext.Provider>
    )
}