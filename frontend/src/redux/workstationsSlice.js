import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    onlineWorkstations:0,
    workstationsData:[],
    currentSelectedWorkstation:{},
    workstationCurrentRole: {},
}

const workstationsSlice = createSlice({
    name:'workstations',
    initialState,
    reducers:{
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
                return;
            }
        },
        clearSelectedWorkstation:(state)=>{
            state.currentSelectedWorkstation={};
        },
        setNumberOfOnlineWorkstations:(state,action)=>{
            state.onlineWorkstations=action.payload.numberOfOnlineWorkstations;
        },
        addWorkstationRole: (state, action) => {
            state.workstationCurrentRole[action.payload.number] = action.payload.role;
        },
        removeWorkstationRole: (state, action) => {
            delete state.workstationCurrentRole[action.payload.number];
        },
    }
})

export const {addWorkstationRole,removeWorkstationRole,selectWorkstation,setNumberOfOnlineWorkstations,clearSelectedWorkstation,onWorkstationOffline,onWorkstationOnline,setWorkstationData,updateWorkstationData} = workstationsSlice.actions;
export default workstationsSlice.reducer;