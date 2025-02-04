import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategories } from "../../Redux/slices/categories.slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [previewUrl, setPreviewUrl] = useState();
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState(null);

  const prams = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const category = categories.find((c) => c._id === prams.categoryId);
    if (category) {
      setCategory(category);
      setname(category.name);
      setdescription(category.description);
      setPreviewUrl(category.image);
    }
  }, [categories, prams.categoryId]);

  const dispatch = useDispatch();

  const handleChangeImage = (e) => {
    setimage(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };
  // vaslidate field
  const validateField = (inputId, errMsgId, value, errorMessage) => {
    const inputElement = document.getElementById(inputId);
    const errMsgElement = document.getElementById(errMsgId);

    if (value === "" || value === undefined) {
      inputElement.classList.add("border-red-400");
      errMsgElement.textContent = errorMessage;
      return false;
    } else {
      inputElement.classList.remove("border-red-400");
      errMsgElement.textContent = "";
      return true;
    }
  };

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    // Perform validation for each field
    const isValidName = validateField(
      "input-name",
      "err-name",
      name,
      "Name is required"
    );
    if (isValidName) {
      const formData = new FormData();

      if (name !== category.name) formData.append("name", name);
      if (description !== category.description)
        formData.append("description", description);
      if (image !== category.image) formData.append("image", image);

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/categories/${prams.categoryId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Upload successful:", response.data);
        dispatch(fetchCategories());
        notify("success", "Category updated successfully");
      } catch (e) {
        console.log("Error uploading", e);
        notify("error", "Error updating category");
      }
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" />
      {/* header  */}
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link to={"/dashboard/categories"} className="border p-2 md:p-3  ">
            <i className="bx bx-arrow-back"></i>
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            {/* <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i> */}
            <span className="text-[12px] ">Back To Categories list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Edit Category
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <div
            className="bg-[#F5CAAB] p-2 lg:p-3  rounded-[20px] flex items-center gap-1 cursor-pointer"
            onClick={(e) => handleSubmitCategory(e)}
          >
            <i className="bx bx-plus sm:text-[20px]"></i>
            <span className="text-[13px] font-[500]">Edit category </span>
          </div>
        </div>
      </div>
      {/* form */}
      <div className="lg:flex lg:justify-between gap-8 ">
        <div className="lg:w-[620px] mb-6">
          <div className="bg-[#F9F9F9]  p-5 flex flex-col gap-3  rounded-[10px]">
            {/* name of product */}
            <div className="flex flex-col gap-1">
              <label className="text-[15px] font-[500] text-[#474B4F]">
                Name Category
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
                placeholder="Name of category"
                id="input-name"
              />
              <span className="text-[14px] text-red-500" id="err-name"></span>
            </div>
            {/* description of product */}
            <div className="flex flex-col gap-1">
              <label className="text-[15px] font-[500] text-[#474B4F]">
                Description Category
              </label>
              <textarea
                value={description}
                onChange={(e) => setdescription(e.target)}
                className="border h-[200px] text-[15px]  bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] pt-[10px]"
                placeholder="Description of category"
              />
            </div>
          </div>
        </div>
        <div className="lg:w-[320px]">
          {/* upload images */}
          <div className="bg-[#F9F9F9] p-5 rounded-[10px]">
            <h1 className=" text-[20px] font-[600] mb-3">upload images</h1>
            <label
              htmlFor="dropzone-file"
              id="input-image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE] dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <i className='bx bx-cloud-upload text-[#F5CAAB] text-[40px]'></i>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleChangeImage(e)}
              />
            </label>
            <span className="text-[14px] text-red-500" id="err-image"></span>
            {previewUrl && (
              <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1 mt-4">
                <img
                  src={previewUrl}
                  className="h-[180px] w-full cursor-pointer"
                  onClick={() => setPreviewUrl()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
