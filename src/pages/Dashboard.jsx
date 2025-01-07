import React, { useEffect, useState } from "react";
import desighn from "../assets/undraw_true_love_cy8x@4x.png";
import { useDispatch, useSelector } from "react-redux";
import StaticDashbord from "../componnents/dashboard/StaticDashbord";
import { CategoryChart } from "../componnents/dashboard/CategoryChart";
import ListTopProducts from "../componnents/dashboard/ListTopProducts";
import ListOrder from "../componnents/dashboard/ListOrder";
import desShop from "../assets/undraw_Small_town_re_7mcn@4x.png";
import desapp from "../assets/65_objects@4x.png";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import DatePickerDemo from "../componnents/DatePickerDemo";
import BoxDashboard from "../componnents/dashboard/BoxDashboard";
import Orders from "./Orders";
import { Card } from "../components/ui/card";
import ListOrders from "../componnents/order/ListOrders";
import ListCustomer from "../componnents/customer/ListCustomers";

function Dashboard() {
  const products = useSelector((state) => state.products);
  const [rangeDate, setRangeDate] = useState();
  const orders = useSelector((state) => state.orders);
  const customers = useSelector((state) => state.customers);
  const [revenue, setRevenue] = useState(0);
  const [ordersFilter, setOrdersFilter] = useState(orders.length);
  const [customersFilter, setCustomersFilter] = useState(customers.length);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (rangeDate) {
      filterOrdersByDate(rangeDate.from, rangeDate.to);
      filterCustomersByDate(rangeDate.from, rangeDate.to);
    } else {
      setOrdersFilter(orders.length);
      setCustomersFilter(customers.length);
      setRevenue(orders.reduce((total, order) => total + order.totalPrice, 0));
    }
  }, [rangeDate, orders]);

  const filterOrdersByDate = (startDate, endDate) => {
    const start = new Date(startDate); // date from start
    const end = new Date(endDate); // date from end
    const orderaFilter = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });
    setOrdersFilter(orderaFilter.length);
    const calculatedRevenue = orderaFilter.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    setRevenue(calculatedRevenue);
    console.log("orderfilter", orderaFilter);
  };

  const filterCustomersByDate = (startDate, endDate) => {
    const start = new Date(startDate); // date from start
    const end = new Date(endDate); // date from end
    const customersFilter = customers.filter((customer) => {
      const customerDate = new Date(customer.createdAt);
      return customerDate >= start && customerDate <= end;
    });
    setCustomersFilter(customersFilter.length);
  };

  const sortCustomersByOrderCount = () => {
    return [...customers].sort((a, b) => a.totalAmount + b.totalAmount);
  };

  const sortedCustomers = sortCustomersByOrderCount();

  return (
    <div>
      <div>
        <div className="flex justify-between pb-4 items-center">
          <h2 className="text-[25px] font-[500] lg:text-[30px] md:font-[600] leading-[25px] md:leading-4 ">
            Overview Perfomance
          </h2>
          <DatePickerDemo setRangeDate={setRangeDate} />
        </div>
        <div className="custom-gradient grid grid-cols-1 lg:grid-cols-4 gap-3  pb-5">
          <BoxDashboard
            data={products.length}
            icon={"bx bx-category-alt"}
            iconColor={"text-[#5BAE3D]"}
            title={"Total Products"}
            bgColor={"bg-box-total-products"}
            textColor={"text-white"}
          />
          <BoxDashboard
            data={revenue.toFixed(2)}
            title={"Revenue"}
            icon={"bx bx-dollar"}
            iconColor={"text-[#A98563]"}
            bgColor={"bg-box-total-revenue"}
            textColor={"text-white"}
          />
          <BoxDashboard
            data={customersFilter}
            icon={"bx bxs-user"}
            iconColor={"text-[#c9abf5]"}
            title={"Total Customer"}
            bgColor={"bg-box-total-customer"}
            textColor={"text-black"}
          />
          <BoxDashboard
            data={ordersFilter}
            title={"Total Orders"}
            icon={"bx bx-shopping-bag"}
            iconColor={"text-[#F2B78D]"}
            bgColor={"bg-box-total-orders"}
            textColor={"text-black"}
          />
        </div>
      </div>
      <div className="flex flex-col gap- ">
        <div className="">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-[28px]">
            <i className='bx bxs-shopping-bag text-[#f2b78d]'></i>
              <h1 className="text-[18px] md:text-[28px] font-[500] md:font-[600]">New Order</h1>
            </div>

            <Button className="flex items-center gap-3  bg-box-total-orders text-black">
              Get All Orders
              <i className="bx bxs-right-arrow text-[17px]"></i>
            </Button>
          </div>
          <ListOrders orders={orders.filter((order, index) => index < 5)} />
        </div>
        <div>
          <div className="flex justify-between py-4">
          <div className="flex gap-2 items-center text-[28px]">
              <i className="bx bxs-user text-[#c9abf5]"></i>
              <h1 className="text-[18px] md:text-[28px] font-[500] md:font-[600]">Best Customers</h1>
            </div>
            
            <Button className="flex items-center gap-3  bg-box-total-customer text-black">
              Get All Customers
              <i className="bx bxs-right-arrow text-[17px]"></i>
            </Button>
          </div>
          <ListCustomer
            customers={sortedCustomers.filter((customer, index) => index < 5)}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
