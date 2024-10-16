import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
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

const productsSlice = createSlice({
    initialState : [],
    name : "productsSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.fulfilled , (state , action) => {
           
            return state = action.payload.data.products
            
        })
    }
})

const {} = productsSlice.actions
export default productsSlice.reducer