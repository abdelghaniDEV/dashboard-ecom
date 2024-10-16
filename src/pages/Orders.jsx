import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePickerDemo from "../componnents/DatePickerDemo";
import ListOrders from "../componnents/order/ListOrders";
import { Link } from "react-router-dom";

function Orders() {
  const orders = useSelector((statu) => statu.orders);
  const [rangeDate, setRangeDate] = useState();
  const [status, setStatus] = useState("");
  const [orderFetch, setOrderFetch] = useState([]);
  // filter orders by status and range date

  useEffect(() => {
    setOrderFetch(orders);
  }, [orders]);

  useEffect(() => {
    if (rangeDate) {
      filterOrdersByDate(rangeDate.from, rangeDate.to);
    } else {
      setOrderFetch(orders);
    }

    
  }, [rangeDate]);

  // filter orders by date range
  const filterOrdersByDate = (startDate, endDate) => {
    const start = new Date(startDate); // date from start
    const end = new Date(endDate); // date from end
    const orderaFilter = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });
    setOrderFetch(orderaFilter);
    console.log("orderfilter", orderaFilter);
  };

  // }
  return (
    <div>
      {/* <h1>{rangeDate.from}</h1> */}
      <div className=" lg:flex justify-between items-center mb-4   ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[25px] lg:text-[35px] font-[600] leading-4 ">
            Orders
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">
            {orders.length} order
          </span>
        </div>
        <div className="flex justify-end items-center gap-3">
          <DatePickerDemo setRangeDate={setRangeDate} />
          <div className="bg-[#F5CAAB] p-2 lg:py-[6px]  rounded-[20px] flex items-center gap-1">
            <i class="bx bx-plus text-[20px]"></i>
            <Link to={"create-order"} className="text-[13px] font-[500]">
              Create Order
            </Link>
          </div>
        </div>
      </div>
      <div className="custom-gradient grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 ">
        <div className="flex flex-col gap-1 border-[2px] rounded-[20px] p-4  shadow-md bg-[#76a963] text-white">
          <h3 className="text-[14px]">Total Items</h3>
          <div className="flex gap-[7px]">
            <i class="bx bx-category-alt text-[20px]"></i>
            <h1 className="text-[25px] md:text-[30px] font-[600]">9.856</h1>
          </div>
          <div className="flex items-center">
            <i class="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="md:text-[14px] text-[12px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-1 border-[2px] rounded-[20px] p-4  shadow-md bg-[#a98563]">
          <h3 className="text-[14px]">Revenue</h3>
          <div className="flex gap-[7px]">
            <span className="text-[20px]">$</span>
            <h1 className="md:text-[30px] text-[25px] font-[600]">13,456.</h1>
          </div>
          <div className="flex items-center">
            <i class="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="md:text-[14px] text-[12px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-1 border-[2px] rounded-[20px] p-4 shadow-md bg-[#f2b78d]">
          <h3 className="text-[14px]">Total Orders</h3>
          <div className="flex gap-[7px]">
            <i class="bx bx-shopping-bag text-[20px]"></i>
            <h1 className="md:text-[30px] text-[25px] font-[600]">{orders.length}</h1>
          </div>
          <div className="flex items-center">
            <i class="bx bxs-chevrons-down text-[#821f1f]"></i>
            <h3 className="md:text-[14px]  text-[12px]">
              <span className="text-[#821f1f] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
      </div>
      <ListOrders orders={orderFetch} />
    </div>
  );
}

export default Orders;
