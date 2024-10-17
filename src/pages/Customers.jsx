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
          <h1 className="text-[30px] lg:text-[35px] font-[600] leading-4 ">
            Customers
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">
             {customers.length} customer
          </span>
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
