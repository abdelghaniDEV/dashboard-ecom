import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSetingAll = createAsyncThunk("settingAllSlice/fetchSetingAll", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Reject the thunk with error
      }
})

const settingAllSlice = createSlice({
    initialState : [],
    name : "settingAllSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchSetingAll.fulfilled , (state , action) => {
            return state = action.payload.data.settings
            
        })
    }
})

const {} = settingAllSlice.actions
export default settingAllSlice.reducer