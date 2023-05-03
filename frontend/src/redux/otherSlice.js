import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currency:''
}

const otherSlice = createSlice({
    name:'other',
    initialState,
    reducers:{
        setCurrency:(state,action)=>{
            state.currency=action.payload.currency;
        }
    }
})


export const {setCurrency}=otherSlice.reducer;
export default otherSlice.reducer;