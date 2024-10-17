import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../../assets/tube-spinner (1).svg";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../Redux/slices/categories.slice";

function CreateCate() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [uploadingAdd, setUploadingAdd] = useState();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // validate field
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

      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      try {
        setUploadingAdd(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Upload successful:", response.data);
        notify("success", "success add category");
        setUploadingAdd(false);
        dispatch(fetchCategories());
      } catch (e) {
        console.log("Error uploading", e);
        notify("error", "error add category");
        setUploadingAdd(false);
      }
    }
  };

  const handleIconSubmit = () => {
    if (uploadingAdd === true) {
      return <img src={spinner} className="w-5" />;
    } else if (uploadingAdd === false) {
      return <i class="bx bx-check text-[20px]"></i>;
    } else {
      return <i class="bx bx-plus text-[20px]"></i>;
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" />
      {/* header  */}
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link to={"/dashboard/categories"} className="border p-2 md:p-3  ">
            <i class="bx bx-arrow-back"></i>
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
            {handleIconSubmit()}
            <span className="text-[13px] font-[500]">Add category </span>
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
              for="dropzone-file"
              id="input-image"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EEEEEE]  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-[#F5CAAB] dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                class="hidden"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </label>
            <span className="text-[14px] text-red-500" id="err-image"></span>
            {image && (
              <div className=" border-2 border-[#F5CAAB] rounded-[10px] p-1 mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  className="h-[180px] w-full cursor-pointer"
                  onClick={() => setimage()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCate;
