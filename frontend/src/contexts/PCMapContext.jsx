import { createContext,useState } from "react";

export const PCMapContext = createContext({});



export const PCMapContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(1);
    const [showAddWorkStation,setShowAddWorkStation] = useState(false);

    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    const value ={
        currentSelectionInternalOption,
        onOptionClicked,
        showAddWorkStation,
        setShowAddWorkStation
    }

    return (
        <PCMapContext.Provider value={value}>{children}</PCMapContext.Provider>
    )
}