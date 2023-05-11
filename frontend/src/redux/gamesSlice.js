import { createSlice } from "@reduxjs/toolkit"
import { allGames } from "../config";

const initialState = {
    allGames:[]
}

const gamesSlice = createSlice({
    name:'games',
    initialState,
    reducers:{
        addNewGame:(state,action)=>{
            state.allGames=[...state.allGames,action.payload.game];
        },
        setGames:(state,action)=>{
            state.allGames=action.payload.games;
        }
    }
})

export const {addNewGame,setGames} = gamesSlice.actions;
export default gamesSlice.reducer;