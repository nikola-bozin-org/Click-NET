import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    onlineWorkstations:0,
    currentSelectedWorkstation:{},
    workstationCurrentRoles: {},
    currentSelectedWorkstationNumber:-1
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
        selectWorkstation:(state,action)=>{
            if(state.currentSelectedWorkstation.number!==action.payload.workstation.number){
                state.currentSelectedWorkstation=action.payload.workstation;
                state.currentSelectedWorkstationNumber=action.payload.workstation.number;
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
            state.workstationCurrentRoles[action.payload.number] = {role:action.payload.role,username:action.payload.username};
        },
        removeWorkstationRole: (state, action) => {
            delete state.workstationCurrentRoles[action.payload.number];
        },
    }
})

export const {addWorkstationRole,removeWorkstationRole,selectWorkstation,setNumberOfOnlineWorkstations,clearSelectedWorkstation,onWorkstationOffline,onWorkstationOnline,setWorkstationData,updateWorkstationData} = workstationsSlice.actions;
export default workstationsSlice.reducer;