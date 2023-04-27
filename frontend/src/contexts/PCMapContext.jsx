import { createContext,useState } from "react";

export const PCMapContext = createContext({});



export const PCMapContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    const [showAddWorkStation,setShowAddWorkStation] = useState(false);
    const [lastWorkstationGridElementPosition,setLastWorkstationGridElementPosition] = useState([]);
    const [workstations,setWorkstations] = useState([
        {
            x:2,
            y:2,
            number:10,
        },
        {
            x:1,
            y:5,
            number:6
        },
        {
            x:5,
            y:5,
            number:1
        }
    ]);

    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    const value ={
        currentSelectionInternalOption,
        onOptionClicked,
        showAddWorkStation,
        setShowAddWorkStation,
        lastWorkstationGridElementPosition,
        setLastWorkstationGridElementPosition,
        workstations,
        setWorkstations
    }

    return (
        <PCMapContext.Provider value={value}>{children}</PCMapContext.Provider>
    )
}