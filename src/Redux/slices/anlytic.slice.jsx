import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchAnalyticByMonth = createAsyncThunk("AnalyticByMonthSlice/fetchAnalyticByMonth", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/monthly`, {
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

const AnalyticByMonthSlice = createSlice({
    initialState : [],
    name : "AnalyticByMonthSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchAnalyticByMonth.fulfilled , (state , action) => {
            return state = action.payload.data
            
        })
    }
})

const {} = AnalyticByMonthSlice.actions
export default AnalyticByMonthSlice.reducer