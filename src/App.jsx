import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./componnents/SideBar";
import Header from "./componnents/Header";
import { fetchProducts } from "./Redux/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
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
import Profile from "./componnents/profile/Profile";
import Team from "./pages/Team";
import ProfileUser from "./componnents/team/ProfileUser";
import { fetchUsers } from "./Redux/slices/users.slice";
import CreateUser from "./componnents/team/CreateUser";
import OrderDetails from "./componnents/order/OrderDetails";
import Setting from "./pages/Setting";
import Store from "./pages/Store";
import { fetchSetingAll } from "./Redux/slices/settingAll.slice";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fetchTemplate } from "./Redux/slices/tamplate.slice";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const user = useSelector((state) => state.signleUser);
  const [opacityBody, setOpacityBody] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to top on pathname change
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    // Fetch data if user is authenticated

    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
    dispatch(fetchCustomer());
    dispatch(fetchAnalyticByMonth());
    dispatch(fetchAnalyticOrders());
    dispatch(fetchUsers());
    dispatch(fetchSetingAll())
    dispatch(fetchTemplate())
  }, []);

  const settingAll = useSelector((state) => state.settingAll)

  return (
    <HelmetProvider>
    <div className="app-container">
     <Helmet>
        <title>{`Dashboard ${settingAll.storeName}`}</title>
        <meta name="description" content={settingAll.storeDescription}/>
      </Helmet>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <div className="flex h-full">
                <SideBar
                  setShowSidebar={setShowSidebar}
                  showSidebar={showSidebar}
                />
                <div className="w-[100%]">
                  <Header
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                  />
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
                        element={<OrderDetails />}
                      />
                      <Route path="customers" element={<Customers />} />
                      <Route
                        path="customers/:customerID"
                        element={<CustomerDetails />}
                      />
                      <Route path="profile/:userName" element={<Profile />} />
                      <Route path="team" element={<Team />} />
                      <Route path="team/create-user" element={<CreateUser />} />
                      <Route path="team/:userID" element={<ProfileUser />} />
                      <Route path="setting" element={<Setting />}/>
                      <Route path="store" element={<Store />}/>
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
    </HelmetProvider>
  );
};

export default App;
