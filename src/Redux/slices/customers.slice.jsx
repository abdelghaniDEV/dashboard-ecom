import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem("token")

export const fetchCustomer = createAsyncThunk("customersSlice/fetchCustomer", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
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

const customersSlice = createSlice({
    initialState : [],
    name : "customersSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCustomer.fulfilled , (state , action) => {
            return state = action.payload.data.customers
            
        })
    }
})

const {} = customersSlice.actions
export default customersSlice.reducer