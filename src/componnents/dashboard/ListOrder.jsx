import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Card, CardContent } from "../../components/ui/card";
import DatePickerDemo from "../DatePickerDemo";
import { Button } from "react-day-picker";
import { Link } from "react-router-dom";

function ListOrder() {
  const products = useSelector((statu) => statu.products);
  const orders = useSelector((statu) => statu.orders);

  return (
    <div className="mb-4 ">
      <div className="flex justify-between items-center py-2 px-3">
        <h1 className="font-[600] text-[22px] md:text-[30px] ">
          New Orders
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] font-[400] ml-1 text-[10px]">
            {orders.length} order
          </span>
        </h1>
        <Link to={'/dashboard/orders'} className=" border-[#f2b78d] border-b-[2px] cursor-pointr text-[13px]  md:text-[16px] font-[500]  flex gap-1 items-center">
           <span>All Order</span>
           <i class='bx bx-right-top-arrow-circle text-[20px] text-[#f2b78d]'></i>
        </Link>
      </div>
      <div className="">
        <Card className=" rounded-none max-h-[334px] overflow-hidden">
          <CardContent className="p-0">
            <Table className="">
              <TableHeader className="bg-[#]">
                <TableRow className="text-white">
                  <TableHead>Order</TableHead>
                  <TableHead>products</TableHead>
                  <TableHead className="">Custmer</TableHead>
                  <TableHead>Date </TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {orders.map((order) => {
                  const orderDate = new Date(order.createdAt).toDateString();
                  return (
                    <TableRow key={order._id} className="">
                      <TableCell>#{order.invoiceNumber}</TableCell>
                      <TableCell className="flex gap-[6px] items-center">
                         {order.products.map((product) => {
                            return <img src={product.product?.image[0]} className="w-10 h-10 rounded-full"
                             />
                         })}
                      </TableCell>
                      <TableCell className="">{order.name}</TableCell>
                      <TableCell className="">{orderDate}</TableCell>
                      <TableCell className="text-[#6390a9] ">
                        {order.products.length} item
                      </TableCell>
                      <TableCell className="text-[#b58df2]">
                        ${order.totalPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ListOrder;
