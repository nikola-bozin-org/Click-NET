import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    maxWorkstations:0,
    onlineWorkstations:0,
    workstationsData:[],
}

const workstationsSlice = createSlice({
    name:'workstations',
    initialState,
    reducers:{
        setMaxWorkstations:(state,action)=>{
            state.maxWorkstations=action.payload.maxWorkstations;
        },
        onWorkstationOnline:(state,action)=>{
            state.onlineWorkstations++;
        },
        onWorkstationOffline:(state,action)=>{
            state.onlineWorkstations--;
        },
        setWorkstationData:(state,action)=>{
            state.workstationsData=action.payload.workstationData;
        },
        updateWorkstationData:(state,action)=>{
            state.workstationsData=[...state.workstationsData,action.payload.newWorkstation]
        }
    }
})

export const {setMaxWorkstations,onWorkstationOffline,onWorkstationOnline,setWorkstationData,updateWorkstationData} = workstationsSlice.actions;
export default workstationsSlice.reducer;