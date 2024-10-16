import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchSingleUser = createAsyncThunk("userSingleSlice/fetchSingleUser", async (token) => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error; // Reject the thunk with error
      }
})

const userSingleSlice = createSlice({
    initialState : [],
    name : "userSingleSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchSingleUser.fulfilled , (state , action) => {
          
            return state = action.payload.data.user
            
        })
    }
})

const {} = userSingleSlice.actions
export default userSingleSlice.reducer