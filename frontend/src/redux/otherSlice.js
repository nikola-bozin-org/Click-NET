import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    centerName:'Click Esports',
}

const otherSlice = createSlice({
    name:'other',
    initialState,
    reducers:{
        setCenterName:(state,action)=>{
            state.centerName=action.payload.centerName;
        }
    }
})


export const {setCurrency}=otherSlice.reducer;
export default otherSlice.reducer;