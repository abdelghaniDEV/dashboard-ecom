import React, { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ViewsOrder from "./ViewsOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../Redux/slices/orders.slice";
import axios from "axios";

function OrderCart({ order }) {
  const [openDelet, setOpenDelet] = useState(false);
  const [openView, setOpenView] = useState(false);
  const dataOrder = new Date(order.createdAt).toDateString();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  let item = 0;
  order.products.map((product) => {
    return (item += product.quantity);
    
  });

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleDeleteOrder = async (orderID) => {
    try {
      // delete the order from the database
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/orders/${orderID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order deleted successfully:", response.data);
      notify("success", "Order deleted successfully");
      dispatch(fetchOrders());
    } catch (err) {
      console.error("Error deleting order:", err);
      notify("error", err.response.data.message);
    }
  };

  return (
      <>
      {/* <ToastContainer position="bottom-left" /> */}
      <TableRow className="xl:text-[15px] text-[15px]">
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
        <TableCell className="hidden md:block">
          <div className="grid text-center sm:grid-cols-3 grid-cols-3 gap-1 md:grid-cols-3 md:gap-2 items-center text-[13px]">
            <Dialog className="w-[800px]" open={openView} onOpenChange={setOpenView} >
              <DialogTrigger className="">
                <i className="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
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
              <i className="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
              <span className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
                Edit
              </span>
            </Link>
            <Dialog open={openDelet} onOpenChange={setOpenDelet}>
              <DialogTrigger className=" ">
                <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
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
        <TableCell className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus:outline-none">
              <i className="bx bx-dots-vertical-rounded text-[25px] p-[2px] bg-[#F6F6F6] rounded-[4px]"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] mx-4">
              <DropdownMenuLabel className="text-ellipsis overflow-hidden whitespace-nowrap">
                {order.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenView(true)} >
                <div  className="flex items-center gap-2 font-[500]">
                  <i className="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[5px] text-center"></i>
                  <span>View Order</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                <Link
                to={`${order._id}`}
                  className="flex items-center gap-2 font-[500]"
                >
                  <i className="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[5px] text-center"></i>
                  <span>Edit Order</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 font-[500]"
                onClick={() => setOpenDelet(true)}
              >
                <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[5px] text-center"></i>
                <span>Delete Order</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      
      </>
  );
}

export default OrderCart;
