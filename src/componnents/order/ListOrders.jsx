import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
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
import axios from "axios";
import { fetchOrders } from "../../Redux/slices/orders.slice";
import { Link } from "react-router-dom";
import { data } from "autoprefixer";
import ViewsOrder from "./ViewsOrder";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";

function ListOrders({ orders }) {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentOrders = orders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
    <div className="mt-3">
      <ToastContainer position="bottom-left" />
      <Table className="border">
        <TableHeader className="bg-[#F9F9F9]">
          <TableRow className="md:text-[16px] text-center text-[13px]">
            <TableHead>Order</TableHead>
            {/* <TableHead>Product</TableHead> */}
            <TableHead>Custemer</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden xl:table-cell">Total</TableHead>
            <TableHead className="hidden xl:table-cell ">Items</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className=" ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentOrders.map((order) => {
            const dataOrder = new Date(order.createdAt).toDateString();
            {
              /* console.log(dataOrder.toDateString()) */
            }
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
                <TableCell className="hidden sm:table-cell">
                  {order.email}
                </TableCell>
                <TableCell className="hidden xl:table-cell">${order.totalPrice}</TableCell>
                <TableCell className="hidden xl:table-cell  ">
                  {item} item
                </TableCell>
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
                            This action cannot be undone. This will permanently
                            delete this order and remove data from our servers.
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
          })}
        </TableBody>
      </Table>
      <div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center items-center mt-4 space-x-2 "}
          pageClassName={
            "px-3 py-1 border rounded hover:bg-[#b58df2] hover:text-white"
          }
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
          breakClassName={"px-3 py-1"}
          activeClassName={"bg-[#b58df2] text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </div>
  );
}

export default ListOrders;
