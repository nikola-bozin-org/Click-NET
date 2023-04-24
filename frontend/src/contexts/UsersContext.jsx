import { useState } from "react";
import { createContext } from "react";


export const UsersContext = createContext({});

export const UsersContextProvider = ({children})=>{
    const [currentSelectionInternalOption,setCurrentSelectionInternalOption] = useState(0);
    const [showUserData,setShowUserData] = useState(false);
    const [userData,setUserData] = useState({});
    const [showDeleteUser,setShowDeleteUser] = useState(false);
    const [shouldAnimateDelete,setShouldAnimateDelete] = useState(false);
   
    const onOptionClicked = (optionId)=>{
        setCurrentSelectionInternalOption(optionId)
    }
    
    const value = {
        shouldAnimateDelete,
        setShouldAnimateDelete,
        currentSelectionInternalOption,
        onOptionClicked,
        showUserData,
        setShowUserData,
        userData,
        setUserData,
        showDeleteUser,
        setShowDeleteUser
    }


    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    )
}