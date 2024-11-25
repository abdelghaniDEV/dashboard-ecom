import React from "react";

import Logo from "../Logo";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Invoice({ order }) {
  const settings = useSelector((state) => state.settingAll);
  console.log(order);
  const dataOrder = new Date(order?.createdAt).toDateString();
  return (
    <div className="text-black px-10">
      <div className="flex justify-between  items-center border-b-2 py-5">
        <div>
          <h2 className="font-[600] pb-3">BILL FROM</h2>
          <ul className="font-[500] text-[18px] text-slate-600">
            <li> {settings?.storeName}</li>
            <li> {settings?.storeEmail}</li>
            <li> {settings?.storePhone}</li>
          </ul>
        </div>
        <Logo />
      </div>
      <div className="flex justify-between py-5">
        <div>
          <h2 className="font-[600] pb-2">BILL TO </h2>
          <ul className="font-[500] text-[18px] flex flex-col gap-[6px] text-slate-600">
            <li>{order?.name}</li>
            <li>{order?.address}</li>
            <li>{order?.number}</li>
            <li>{order?.email}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2  text-[18px] font-[500]">
          <div className="flex justify-between gap-[100px] ">
            <h3>Invoice # </h3>
            <span>{order?.invoiceNumber}</span>
          </div>
          <div className="flex justify-between gap-[100px] ">
            <h3>Data Order </h3>
            <span>{dataOrder}</span>
          </div>
          <div className="flex justify-between gap-[100px] bg-slate-300 py-1 px-2">
            <h3>Total Amount </h3>
            <span>${order?.totalPrice}</span>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-slate-300 text-black font-[500]">
          <TableRow >
            <TableHead className="">Product</TableHead>
           
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Unit Cost </TableHead>
            <TableHead className="text-right">Lin Total </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.products.map((prod) => {
            return (
              <TableRow key={prod._id}>
                <TableCell className="w-[450px]">{prod.product.name}</TableCell>
                
                <TableCell>{prod.quantity}</TableCell>
                <TableCell className="text-right">${prod.product.price}</TableCell>
                <TableCell className="text-right">${prod.product.price * prod.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Invoice;
