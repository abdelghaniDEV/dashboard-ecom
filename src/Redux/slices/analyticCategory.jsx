import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchAnalyticOrders = createAsyncThunk("AnalyticOrdersSlice/fetchAnalyticOrders", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/orders`, {
        //   headers: {
        //     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        //   },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching AnalyticByMonth:", error);
        throw error; // Reject the thunk with error
      }
})

const AnalyticOrdersSlice = createSlice({
    initialState : [],
    name : "AnalyticOrdersSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAnalyticOrders.fulfilled , (state , action) => {
            return state = action.payload.data
            
        })
    }
})

const {} = AnalyticOrdersSlice.actions
export default AnalyticOrdersSlice.reducer