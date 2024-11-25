import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem("token")
console.log(import.meta.env.VITE_API_KEY)

export const fetchOrders = createAsyncThunk("ordersSlice/fetchOrders", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error; // Reject the thunk with error
      }
})

const ordersSlice = createSlice({
    initialState : [],
    name : "ordersSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchOrders.fulfilled , (state , action) => {
            return state = action.payload.data.orders
            
        })
    }
})

const {} = ordersSlice.actions
export default ordersSlice.reducer