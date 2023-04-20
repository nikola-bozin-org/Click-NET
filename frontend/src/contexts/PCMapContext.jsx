import { createContext,useState } from "react";

export const PCMapContext = createContext({});



export const PCMapContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    
    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    const value ={
        currentSelectionInternalOption,
        onOptionClicked
    }

    return (
        <PCMapContext.Provider value={value}>{children}</PCMapContext.Provider>
    )
}