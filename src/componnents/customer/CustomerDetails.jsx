import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/ui/card";
import ListOrder from "../dashboard/ListOrder";
import { useSelector } from "react-redux";
import ListOrders from "../order/ListOrders";

function CustomerDetails() {
  const prams = useParams();
  const customers = useSelector((statu) => statu.customers);

  const customer = customers.find(
    (customer) => customer._id === prams.customerID
  );
 const dataCustomer = new Date(customer.createdAt).toDateString()

 const handleCustomerStut = () => {
    let status = ''
    if (customer.orders.length > 0 && customer.orders.length <= 3 ) {
         status = "New Customer" ;
    }

    return status
 }
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex gap-2 pb-4 lg:pb-0 ">
          <Link
            to={"/dashboard/Customers"}
            className="border p-3 hidden lg:block "
          >
            <i class="bx bx-arrow-back"></i>
          </Link>
          <div className="flex items-center gap-2 lg:block">
            <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i>
            <span className="text-[12px] hidden lg:block">
              Back To Custemer list
            </span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Custemer Details
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <div className="bg-[#F5CAAB] p-2 lg:p-3  rounded-[20px] flex items-center gap-1 cursor-pointer">
            <i class="bx bx-check text-[20px]"></i>
            <span className="text-[13px] font-[500]">Save Product</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-4 grid ms:grid-cols-2  md:grid-cols-3 gap-4 mb-3 text-[17px] items-center font-medium">
          <Card className="p-5 bg-[#76a963] text-white">
             <h1>Name : {customer.name}</h1>
             <h1>@{customer.name}_{customer.totalAmount.toFixed(2)}</h1>
             <h1>Registered : {dataCustomer}</h1>
          </Card>
          <Card className="p-5 bg-[#f2b78d]">
             <h1>email : {customer.email}</h1>
             <h1>Adress : {customer.address}</h1>
             <h1>ZipCode : {customer.zipCode}</h1>
          </Card>
          <Card className="p-5 bg-[#a98563] ">
             <h1>Oreders : {customer.orders.length} order</h1>
             <h1>totalAmount : ${customer.totalAmount.toFixed(2)}</h1>
             <h1>status : {handleCustomerStut()}</h1>
          </Card>
        </div>
        <div className="">
          <h1 className="text-[30px] font-semibold pb-2">List Orders :</h1>
          <ListOrders orders={customer.orders} />
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
