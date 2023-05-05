import { createContext,useState } from "react";

export const CenterContext = createContext({});



export const CenterContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(1);
    const [showAddWorkStation,setShowAddWorkStation] = useState(false);
    const [lastWorkstationGridElementPosition,setLastWorkstationGridElementPosition] = useState([]);
    const [workstationLimit,setWorkstationLimit] = useState(0);
    const [currency,setCurrency] = useState('');
    const [lastWorkstationClickedPositionInGrid,setLastWorkstationClickedPositionInGrid] = useState({x:0,y:0});
    const [workstations,setWorkstations] = useState([]);
    const [workstationDeselector,setWorkstationDeselector] = useState(() => () => {});
    const [workstationLoadingIndicators,setWorkstationLoadingIndicators] = useState(()=>()=>{})


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
        setWorkstations,
        workstationLimit,
        setWorkstationLimit,
        currency,
        setCurrency,
        workstationDeselector,
        setWorkstationDeselector,
        workstationLoaders: workstationLoadingIndicators,
        setWorkstationLoaders: setWorkstationLoadingIndicators,
        lastWorkstationClickedPositionInGrid,
        setLastWorkstationClickedPositionInGrid
    }

    return (
        <CenterContext.Provider value={value}>{children}</CenterContext.Provider>
    )
}