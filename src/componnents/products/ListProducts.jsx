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
import { fetchProducts } from "../../Redux/slices/products.slice";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              const productDate = new Date(product.createdAt).toDateString();
              return (
                <TableRow className="xl:text-[15px] text-[14px]">
                  <TableCell className="">#{index + 1}</TableCell>
                  <TableCell className="xl:w-[300px]">
                    <Link to={`${product._id}`} className="flex gap-2 items-center">
                      <img
                        src={product.image[0]}
                        className="w-[40px] h-[40px] md:h-[50px] object-cover rounded-full md:rounded-[10px]"
                      />
                      <h3 className="xl:text-[15px] text-[13px] sm:text-[14px]  font-[500]  sm:block">
                        {product.name}
                      </h3>
                    </Link>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="hidden sm:table-cell  xl:w-[100px]">
                    {product.category[0]}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="max-w-[120px] hidden sm:table-cell">
                    {productDate}
                  </TableCell>
                  <TableCell className="">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[13px]">
                      <a href={`https://ecommerce-beta-ivory.vercel.app/product/${product._id}`} className="">
                        <i class="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
                        <span className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
                          Views
                        </span>
                      </a>
                      <Link to={`${product._id}`} className="hidden md:block">
                        <i class="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
                        <span className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
                          Edit
                        </span>
                      </Link>
                      <Dialog>
                        <DialogTrigger className="">
                          <i class="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
                          <span className=" bg-[#FDD8E0] hidden md:block text-[#F4164F] md:rounded-[8px]  p-2 text-center">
                            {" "}
                            Delete
                          </span>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                          </DialogHeader>
                          <div>
                            <p>
                              This action cannot be undone. This will
                              permanently delete this product and remove data
                              from our servers.
                            </p>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose className="flex gap-4">
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                              <Button
                                onClick={() => handleDeleteProduct(product._id)}
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
