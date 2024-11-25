import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../../components/ui/table";
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
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { fetchCustomer } from "../../Redux/slices/customers.slice";
import CustomerDetails from "./CustomerDetails";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function ListCustomers({ customers }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(0);



  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentOrders = customers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(customers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
    // toast notification
    const notify = (type, message) => {
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };
  const handleDeleteCustomer = async (customerId) => {
    try {
      // delete the order from the database
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/customers/${customerId}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
      );
      console.log("customer deleted successfully:", response.data);
      notify("success", "Customer adeleted successfully");
      dispatch(fetchCustomer());
    } catch (err) {
      console.error("Error deleting customer:", err);
      notify("error", "Error deleting customer");
    }
  };
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <Table className="border">
        <TableHeader className="bg-[#F9F9F9]">
          <TableRow className="md:text-[16px] text-center text-[13px]">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="hidden sm:table-cell">Amount</TableHead>
            <TableHead className="hidden  sm:table-cell">Registered</TableHead>
            <TableHead className="hidden">Adress</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[15px]">
          {/* Add your customers data here */}
          {currentOrders.map((customer, index) => {
            const dateCustomer = new Date(customer.createdAt).toDateString();
            return (
              <TableRow className="xl:text-[15px] text-[15px]" key={customer._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="">{customer.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{customer.email}</TableCell>
                <TableCell>{customer.orders.length} order</TableCell>
                <TableCell className="hidden sm:table-cell">${customer.totalAmount.toFixed(2)}</TableCell>
                <TableCell className="hidden sm:table-cell">{dateCustomer}</TableCell>
                <TableCell className="hidden">{customer.address}</TableCell>
                <TableCell className="flex  gap-2 justify-start text-[13px]">
                  <Link
                    to={`${customer._id}`}
                    
                  >
                    <i className="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
                    <span className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
                      Views
                    </span>
                  </Link>
                  <Dialog>
                    <DialogTrigger >
                    <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
                        <span className=" bg-[#FDD8E0] hidden md:block text-[#F4164F] md:rounded-[8px]  p-2 text-center">
                          
                          Delete
                        </span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                      </DialogHeader>
                      <div>
                        <p>
                          This action cannot be undone. This will permanently
                          delete this Custemer and remove data from our servers.
                        </p>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose className="flex gap-4">
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                          <Button
                            onClick={() => handleDeleteCustomer(customer._id)}
                            className="bg-[#FDD8E0] text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
          {/* Add more customers here */}
        </TableBody>
      </Table>
      {pageCount > 1 && <div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex justify-center md:justify-end items-center mt-4 space-x-2 "
          }
          pageClassName={
            "px-3 py-1 border rounded hover:bg-[#b58df2] hover:text-white"
          }
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
          breakClassName={"px-3 py-1"}
          activeClassName={"bg-[#b58df2] text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>} 
    </div>
  );
}

export default ListCustomers;
