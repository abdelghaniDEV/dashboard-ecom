import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categories.slice";
import productsSlice from "./slices/products.slice";
import ordersSlice from "./slices/orders.slice"
import customersSlice from "./slices/customers.slice";
import analyticByMonthSlice from "./slices/anlytic.slice"
import AnalyticOrdersSlice from "./slices/analyticCategory.jsx"
import userSingleSlice from "./slices/userSingle.slice.jsx"
export const store = configureStore({
    reducer : {
        products : productsSlice,
        categories : categoriesSlice,
        orders : ordersSlice,
        customers: customersSlice,
        analyticByMonth : analyticByMonthSlice,
        analyticOrders : AnalyticOrdersSlice,
        signleUser : userSingleSlice,

    }
})