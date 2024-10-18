
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SideBar from "./componnents/SideBar";
import Header from "./componnents/Header";
// import { Route, Routes } from "react-router";
import { fetchProducts } from "./Redux/slices/products.slice";
import { useDispatch } from "react-redux";
import Products from "./pages/Products";
import CreateProduct from "./componnents/products/CreateProduct";
import EditProduct from "./componnents/products/EditeProduct";
import Categories from "./pages/Categories";
import { fetchCategories } from "./Redux/slices/categories.slice";
import CreateCate from "./componnents/categories/CreateCate";
import EditCategory from "./componnents/categories/EditCategory";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { fetchOrders } from "./Redux/slices/orders.slice";
import Orders from "./pages/Orders";
// import CreateOrder from "./componnents/order/createOrder";
import EditOrder from "./componnents/order/EditOrder";
import ViewsOrder from "./componnents/order/ViewsOrder";
import Customers from "./pages/Customers";
import { fetchCustomer } from "./Redux/slices/customers.slice";
import CustomerDetails from "./componnents/customer/CustomerDetails";
import { differenceInDays } from "date-fns";
import { fetchAnalyticByMonth } from "./Redux/slices/anlytic.slice";
import { fetchAnalyticOrders } from "./Redux/slices/analyticCategory";
import { fetchSingleUser } from "./Redux/slices/userSingle.slice";
import CreateOrder from "./componnents/order/CreateOrder";

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [opacityBody, setOpacityBody] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    
      // Fetch data if user is authenticated
      console.log('fetch data by app js')
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchOrders());
      dispatch(fetchCustomer());
      dispatch(fetchAnalyticByMonth());
      dispatch(fetchAnalyticOrders());
  
  }, []);



  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
       
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                <div className="w-[100%]">
                  <Header setShowSidebar={setShowSidebar} />
                  <div className="mt-2 mx-2 md:mx-4 lg:mx-8">
                    <Routes>
                      <Route path="" element={<Dashboard />} />
                      <Route
                        path="products"
                        element={<Products setOpacityBody={setOpacityBody} />}
                      />
                      <Route
                        path="products/create-product"
                        element={<CreateProduct />}
                      />
                      <Route
                        path="products/:productID"
                        element={<EditProduct />}
                      />
                      <Route
                        path="categories"
                        element={<Categories setOpacityBody={setOpacityBody} />}
                      />
                      <Route
                        path="categories/create-category"
                        element={<CreateCate />}
                      />
                      <Route
                        path="categories/:categoryId"
                        element={<EditCategory />}
                      />
                      <Route path="orders" element={<Orders />} />
                      <Route
                        path="orders/create-order"
                        element={<CreateOrder />}
                      />
                      <Route path="orders/:orderID" element={<EditOrder />} />
                      <Route
                        path="orders/views/:orderID"
                        element={<ViewsOrder />}
                      />
                      <Route path="customers" element={<Customers />} />
                      <Route
                        path="customers/:customerID"
                        element={<CustomerDetails />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
              </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};


export default App;
