import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeletCategory from "./DeletCategory";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../components/ui/button";
import { fetchCategories } from "../../Redux/slices/categories.slice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListCategories({ setOpacityBody }) {
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const [showDelet, setShowDelet] = useState(false);
  const [categoryId, setCategoryId] = useState();

  const token = localStorage.getItem('token');

  const notify = (type , message) => {
    if (type === "success") {
         toast.success(message)
         console.log(message)
    }else {
        toast.error(message)
    }
  };


  const dispatch = useDispatch();
  if (showDelet === true) {
    setOpacityBody(true);
  } else {
    setOpacityBody(false);
  }

  const handleDeleteCategory = async (categoryId) => {
    // Call your API to delete the category
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the category list
      notify('success', 'successfully deleting category')
      dispatch(fetchCategories());
    } catch (err) {
      console.error("Error deleting category:", err);
      notify('error', 'Error deleting category')
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" />
      <Table className="border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-[#F9F9F9]">
          <TableRow className="md:text-[16px] text-center text-[13px]">
            <TableHead>Rank</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="">Products</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => {
            return (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-[16px]">{category.name}</TableCell>
                <TableCell className=" md:w-[420px] flex gap-1 items-center">
                  <div className="sm:flex sm:block gap-1 items-center hidden ">
                    {products
                      .filter(
                        (product) => product.category[0] === category.name
                      )
                      .map((item) => {
                        return (
                          <img
                            src={item.image[0]}
                            className="w-10 h-10 rounded-full"
                          />
                        );
                      })}
                  </div>
                  <div className="w-10 h-10 bg-[#f5caab5c] rounded-full relative">
                    <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#e4823c]">
                      {
                        products.filter(
                          (product) => product.category[0] === category.name
                        ).length
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="text-center grid grid-cols-3 sm:gap-2 text-[13px]">
                    <Link className="">
                      <i class="bx bx-show bg-[#b58df2] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
                      <span className="hidden md:block bg-[#b58df2] text-white rounded-[8px] p-2 text-center ">
                        Views
                      </span>
                    </Link>
                    <Link to={`${category._id}`}>
                      <i class="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
                      <span className="hidden md:block bg-[#76a963] text-white rounded-[8px] p-2 text-center">
                        Edit
                      </span>
                    </Link>
                    <Dialog>
                      <DialogTrigger className="">
                        <i class="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
                        <span className=" bg-[#FDD8E0] hidden md:block text-[#F4164F]  rounded-[8px]  p-2 text-center">

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
                            delete this Category and remove data from our
                            servers.
                          </p>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose className="flex gap-4">
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                            <Button
                              onClick={() => handleDeleteCategory(category._id)}
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
  );
}

export default ListCategories;
