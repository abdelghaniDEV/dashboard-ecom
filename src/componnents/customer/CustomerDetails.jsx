import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/ui/card";
import ListOrder from "../dashboard/ListOrder";
import { useSelector } from "react-redux";
import ListOrders from "../order/ListOrders";

function CustomerDetails() {
  const prams = useParams();
  const customers = useSelector((state) => state.customers);
  const [customer , setCustomer] = useState ()
  console.log(prams)

  console.log(customers)

  useEffect (() => {
    const customerSingle = customers?.find((customer) => customer._id === prams.customerID)
    if (customerSingle) {
      setCustomer(customerSingle) 
    }
  },[customers])
  const dataCustomer = new Date(customer?.createdAt).toDateString();

  const handleCustomerStut = () => {
    let status = "";
    if (customer?.orders?.length > 0 && customer?.orders?.length <= 3) {
      status = "New Customer";
    }

    return status;
  };
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link to={"/dashboard/customers"} className="border p-2 md:p-3  ">
            <i className="bx bx-arrow-back"></i>
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            {/* <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i> */}
            <span className="text-[12px] ">Back To Customers list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Custemer Details
            </h1>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-1 grid ms:grid-cols-2  md:grid-cols-3 gap-4 mb-3 text-[15px] items-center font-medium">
          <Card className=" relative overflow-hidden px-5 py-6 md:bg-[#76a963] bg-box-total-products text-white">
            <i className="bx bx-user absolute text-[150px] top-0 right-[-20px] text-[#76a963]"></i>
            <h1>Name : {customer?.name}</h1>
            <h1>
              @{customer?.name}_{customer?.totalAmount.toFixed(2)}
            </h1>
            <h1>Registered : {dataCustomer}</h1>
          </Card>
          <Card className="relative  overflow-hidden  px-5 py-6 bg-[#f2b78d]m bg-box-total-revenue">
            <i className="bx bx-home-alt absolute text-[110px] top-10 right-[-20px] text-[#a98563]"></i>
            <h1>email : {customer?.email}</h1>
            <h1>Adress : {customer?.address}</h1>
            <h1>ZipCode : {customer?.zipCode}</h1>
          </Card>
          <Card className="relative overflow-hidden  px-5 py-6 bg-[#a98563]m bg-box-total-orders ">
            <span className="absolute text-[150px] top-[-40px] right-[-10px] text-[#f2b78d]">
              $
            </span>
            <h1>Oreders : {customer?.orders?.length} order</h1>
            <h1>totalAmount : ${customer?.totalAmount.toFixed(2)}</h1>
            <h1>status : {handleCustomerStut()}</h1>
          </Card>
        </div>
        <div className="">
          <h1 className="text-[30px] font-semibold pb-2">List Orders :</h1>
          <ListOrders orders={customer?.orders} />
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
