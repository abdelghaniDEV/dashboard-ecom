import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem("token")

export const fetchTemplate = createAsyncThunk("templateSlice/fetchTemplate", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/template`, {
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

const templateSlice = createSlice({
    initialState : [],
    name : "templateSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchTemplate.fulfilled , (state , action) => {
            return state = action.payload.data
            
        })
    }
})

const {} = templateSlice.actions
export default templateSlice.reducer