import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ViewsOrder from "./ViewsOrder";

function OrderCart({ order }) {

  const dataOrder = new Date(order.createdAt).toDateString();
  let item = 0;
  order.products.map((product) => {
    return (item += product.quantity);
    
  });
  return (
    <TableRow className="xl:text-[15px] text-[14px]">
      <TableCell className="">#{order.invoiceNumber}</TableCell>
      <TableCell>
        <Link to={`${order._id}`}>{order.name}</Link>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{order.email}</TableCell>
      <TableCell className="hidden xl:table-cell">
        ${order.totalPrice}
      </TableCell>
      <TableCell className="hidden xl:table-cell  ">{item} item</TableCell>
      <TableCell className="md:max-w-[120px] hidden sm:table-cell">
        {dataOrder}
      </TableCell>
      <TableCell className="">
        <div className="grid text-center sm:grid-cols-3 grid-cols-3 gap-1 md:grid-cols-3 md:gap-2 items-center text-[13px]">
          <Dialog className="w-[800px]">
            <DialogTrigger className="">
              <i class="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
              <span className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
                Views
              </span>
            </DialogTrigger>
            <DialogContent className="md:p-3 p-1">
              <DialogHeader>
                <DialogTitle className="text-start">
                  <h1 className="md:text-[25px] text-[18px] mb-1 md:mb-2 ">
                    Order ID: {order.invoiceNumber}
                  </h1>
                  <span className="md:text-[14px] text-[10px] bg-[#a9f28d] py-1 px-2  rounded-[20px] font-medium">
                    {dataOrder}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-start">
                  <ViewsOrder order={order} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Link to={`${order._id}`} className=" sm:block">
            <i class="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
            <span className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
              Edit
            </span>
          </Link>
          <Dialog>
            <DialogTrigger className=" ">
              <i class="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
              <span className=" bg-[#FDD8E0] hidden md:block text-[#F4164F] md:rounded-[8px]  p-2 text-center">
                Delete
              </span>
            </DialogTrigger>
            <DialogContent className="text-center">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <div>
                <p>
                  This action cannot be undone. This will permanently delete
                  this order and remove data from our servers.
                </p>
              </div>
              <DialogFooter className="sm:justify-start  ">
                <DialogClose className="flex gap-4 justify-center">
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                  <Button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-[#FDD8E0] text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default OrderCart;
