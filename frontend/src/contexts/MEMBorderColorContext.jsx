import { createContext, useState } from "react";

export const MEMBorderColorContext = createContext({});

export const MEMBorderColorProvider = ({children})=>{
    const [borderChangers,setBorderChangers] = useState({})
    const addBorderChanger = (id, func) => {
      if(id==null) return;
        setBorderChangers(prevBorderChangers => ({
          ...prevBorderChangers,
          [id]: func
        }));
      };
    
      const removeBorderChanger = id => {
        setBorderChangers(prevBorderChangers => {
          const updatedBorderChangers = { ...prevBorderChangers };
          delete updatedBorderChangers[id];
          return updatedBorderChangers;
        });
      };

    const value = {
        borderChangers,
        setBorderChangers,
        addBorderChanger,
        removeBorderChanger
    }

    return <MEMBorderColorContext.Provider value={value}>{children}</MEMBorderColorContext.Provider>
}

