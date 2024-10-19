import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeletProduct from "./DeletProduct";
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
import { fetchProducts } from "../../Redux/slices/products.slice";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCart from "./ProductCart";

function ListProducts({ products, setOpacityBody }) {
  const [showDeletProduct, setShowDeletProduct] = useState(false);
  const [itemDelet, setItemDelet] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const notify = (type , message) => {
    if (type === "success") {
        toast.success(message)
    }else {
        toast.error(message)
    }
  };

  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentProducts = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${productId}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
      );
      console.log("product deleted successfully", response.data);
      dispatch(fetchProducts());
      notify('success' , 'product deleted successfully')
    } catch (err) {
      console.error("Error deleting product:", err);
      notify('error' , 'Error deleting product')
    }
  };

  if (showDeletProduct === true) {
    setOpacityBody(true);
  } else {
    setOpacityBody(false);
  }

  return (
    <div>
       <ToastContainer position="bottom-left" />
      {showDeletProduct && (
        <DeletProduct
          productId={itemDelet}
          setShowDeletProduct={setShowDeletProduct}
        />
      )}
      {/* list products */}
      <div className="mt-4">
        <Table className="border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[15px] ">
              <TableHead>Rank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden xl:table-cell">Stock</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product, index) => {
             
              return <ProductCart product={product} index={index} />
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-end items-center mt-4 space-x-2 "}
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

export default ListProducts;
