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


import axios from "axios";
import { fetchOrders } from "../../Redux/slices/orders.slice";
import { Link } from "react-router-dom";
import { data } from "autoprefixer";
import ViewsOrder from "./ViewsOrder";
import ReactPaginate from "react-paginate";

import OrderCart from "./OrderCart";

function ListOrders({ orders }) {
  const [currentPage, setCurrentPage] = useState(0);



  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentOrders = orders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  return (
    <div className="mt-3">
      
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
            return <OrderCart order={order} />
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
          containerClassName={"flex justify-center md:justify-end items-center mt-4 space-x-2 "}
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
