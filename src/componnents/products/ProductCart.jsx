import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../../Redux/slices/products.slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductCart({ product, index }) {
  const [openDelet, setOpenDelet] = useState(false);
  const productDate = new Date(product.createdAt).toDateString();
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  const notify = (type , message) => {
    if (type === "success") {
        toast.success(message)
    }else {
        toast.error(message)
    }
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
      <TableCell className="hidden xl:table-cell">{product.stock}</TableCell>
      <TableCell className="max-w-[120px] hidden sm:table-cell">
        {productDate}
      </TableCell>
      <TableCell className="hidden md:block">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[13px]">
          <a
            href={`https://ecommerce-safwa-github.vercel.app//product/${product._id}`}
            className=""
          >
            <i className="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
            <span className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
              Views
            </span>
          </a>
          <Link to={`${product._id}`} className="hidden md:block">
            <i className="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
            <span className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
              Edit
            </span>
          </Link>
          <Dialog open={openDelet} onOpenChange={setOpenDelet}>
            <DialogTrigger className="">
              <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
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
                  This action cannot be undone. This will permanently delete
                  this product and remove data from our servers.
                </p>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose className="flex gap-4">
                  <span  className="px-4 py-2 text-sm font-[500] rounded-[8px] bg-secondary">
                    Close
                  </span>
                  <span
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-[#FDD8E0] px-4 py-2 text-sm font-[500] text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
                  >
                    Delete
                  </span>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
      <TableCell className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <i className="bx bx-dots-vertical-rounded text-[25px] p-[2px] bg-[#F6F6F6] rounded-[4px]"></i>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] mx-4">
            <DropdownMenuLabel className="text-ellipsis overflow-hidden whitespace-nowrap">
              {product.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem >
              <a href={`https://ecommerce-safwa-github.vercel.app//product/${product._id}`} className="flex items-center gap-2 font-[500]">
                <i className="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[5px] text-center"></i>
                <span>View Product</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                to={`${product._id}`}
                className="flex items-center gap-2 font-[500]"
              >
                <i className="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[5px] text-center"></i>
                <span>Edit Product</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 font-[500]"
              onClick={() => setOpenDelet(true)}
            >
              <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[5px] text-center"></i>
              <span>Delete Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default ProductCart;
