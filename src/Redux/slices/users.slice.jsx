import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk("usersSlice/fetchUsers", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Reject the thunk with error
      }
})

const usersSlice = createSlice({
    initialState : [],
    name : "usersSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchUsers.fulfilled , (state , action) => {
            return state = action.payload.data.users
            
        })
    }
})

const {} = usersSlice.actions
export default usersSlice.reducer