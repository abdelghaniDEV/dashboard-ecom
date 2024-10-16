import React from "react";
import { Link } from "react-router-dom";
import ListCustomers from "../componnents/customer/ListCustomers";
import { useSelector } from "react-redux";

function Customers() {
    const customers = useSelector((statu) => statu.customers)
    
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4  ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[25px] lg:text-[35px] font-[600] leading-4 ">
            Customers
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">
             {customers.length} customer
          </span>
        </div>
        <div className="flex justify-end items-center gap-3">
          {/* <DatePickerDemo setRangeDate={setRangeDate} /> */}
          <div className="bg-[#F5CAAB] p-2 lg:py-[6px]  rounded-[20px] flex items-center gap-1">
            <i class="bx bx-plus text-[20px]"></i>
            <Link to={"create-order"} className="text-[13px] font-[500]">
              Create Order
            </Link>
          </div>
        </div>
      </div>
      {/* list customers */}
      <div>
          <ListCustomers customers={customers} />
      </div>
    </div>
  );
}

export default Customers;
