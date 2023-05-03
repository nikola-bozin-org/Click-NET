import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    maxWorkstations:0,
    onlineWorkstations:0,
    workstationsData:[],
    currentSelectedWorkstation:{},
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
        },
        selectWorkstation:(state,action)=>{
            if(state.currentSelectedWorkstation.number!==action.payload.workstation.number){
                state.currentSelectedWorkstation=action.payload.workstation;
                return
            }
        },
        clearSelectedWorkstation:(state)=>{
            state.currentSelectedWorkstation={};
        }
    }
})

export const {selectWorkstation,clearSelectedWorkstation, setMaxWorkstations,onWorkstationOffline,onWorkstationOnline,setWorkstationData,updateWorkstationData} = workstationsSlice.actions;
export default workstationsSlice.reducer;