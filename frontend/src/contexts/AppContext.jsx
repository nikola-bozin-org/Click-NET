import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext({});

export const AppContextProvider = ({children})=>{
    const [currentSidebarSelection,setCurrentSidebarSelection] = useState(4);
    const [isAuthorized,setIsAuthorized]=useState(false);
    const [shouldShowCreateUser, setShouldShowCreateUser] = useState(false);
    const [shouldShowCloseCashRegister,setShouldShowCloseCashRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [sessions,setSessions] = useState([]);
    const [currentCashRegisterSession,setCurrentCashRegisterSession] = useState(null);
    const [fetchLimit,setFetchLimit] = useState(2);
    const [fetchPage,setFetchPage] = useState(0);

    const updateUsers = (user) =>{
        setUsers([user,...users])
    }
    const deleteUser = (username) =>{
        setUsers(users.filter((user)=>user.username!==username))
    }

    const value = {
        fetchLimit,
        setFetchLimit,
        fetchPage,
        setFetchPage,
        currentSidebarSelection,
        setCurrentSidebarSelection,
        isAuthorized,
        setIsAuthorized,
        shouldShowCreateUser,
        setShouldShowCreateUser, 
        shouldShowCloseCashRegister,
        setShouldShowCloseCashRegister,
        isLoading,
        setIsLoading,
        users,
        setUsers,
        deleteUser,
        updateUsers,
        sessions,
        setSessions,
        currentCashRegisterSession,
        setCurrentCashRegisterSession,
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}