import { createContext, useState } from "react";

export const RemoteControllerContext = createContext({});

export const RemoteControllerContextProvider = ({children})=>{
    const [currentSelectedRemoteControl,setCurrentSelectedRemoteControl]=useState(-1);

    const value = {
        currentSelectedRemoteControl,
        setCurrentSelectedRemoteControl
    }

    return <RemoteControllerContext.Provider value={value}>{children}</RemoteControllerContext.Provider>
}