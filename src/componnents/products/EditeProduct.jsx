import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/products.slice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditProduct = () => {
  const prams = useParams();
  const products = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const product = products.find((p) => p._id === prams.productID);
    if (product) {
      setProduct(product);
      setProductName(product.name);
      setProductDescription(product.description);
      setSelectedCategories(product.category);
      setProductPrice(product.price);
      setProductStock(product.stock);
      setProductSizes(product.size);
      setProductColors(product.colors);
      setSelectedFiles(product.image);
      setPreviewUrls(product.image);
      setBetter(product.better);
      setProductDetails(product.details);
      setPriceDiscount(product.PriceDiscount);
      setShortDescription(product.ShortDescription);
    }
  }, [products, prams.productID]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // Category selection
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("100");
  const [priceDiscount, setPriceDiscount] = useState();
  const [productDetails, setProductDetails] = useState("");
  const [better , setBetter] = useState('')
  const [ShortDescription, setShortDescription] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [newSize, setNewSize] = useState(""); // New size
  const [newColor, setNewColor] = useState("#000000"); // color value
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]); // preview url

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

    // create preview file list from previous images
    const newPreviewUrls = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const succesNotif = () => toast.success("Product Edit successfully");

  // Reusable validation function
  const validateField = (inputId, errMsgId, value, errorMessage) => {
    const inputElement = document.getElementById(inputId);
    const errMsgElement = document.getElementById(errMsgId);

    if (value === "" || value.length === 0) {
      inputElement.classList.add("border-red-400");
      errMsgElement.textContent = errorMessage;
      return false;
    } else {
      inputElement.classList.remove("border-red-400");
      errMsgElement.textContent = "";
      return true;
    }
  };

  // handleUpload function
  const handleUpload = async (e) => {
    e.preventDefault();

    // Perform validation for each field
    const isValidName = validateField(
      "input-name",
      "err-name",
      productName,
      "Name is required"
    );
    const isValidPrice = validateField(
      "input-price",
      "err-price",
      productPrice,
      "Price is required"
    );
    const isValidCategory = validateField(
      "input-category",
      "err-category",
      selectedCategories,
      "Please select a category"
    );
    const isValidImage = validateField(
      "input-image",
      "err-image",
      selectedFiles,
      "Please select an image"
    );

    // Proceed only if all validations pass
    if (isValidName && isValidPrice && isValidCategory) {
      const formData = new FormData();
      
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("stock", productStock);
      formData.append("PriceDiscount", priceDiscount);
      formData.append("ShortDescription", ShortDescription);
      formData.append("details", productDetails);
      formData.append("better", better);

      //   If categories have changed, add them
      if (
        JSON.stringify(selectedCategories) !== JSON.stringify(product.category)
      ) {
        selectedCategories.forEach((category) =>
          formData.append("category", category)
        );
      }

      // If sizes have changed, add them
      if (JSON.stringify(productSizes) !== JSON.stringify(product.size)) {
        productSizes.forEach((size) => formData.append("size", size));
      }

      // Add only new images if they have changed
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => formData.append("image", file));
      }

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/products/${prams.productID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Update successful:", response.data);
        succesNotif();

        // Reset form fields after successful update
        setSelectedFiles([]);
        setPreviewUrls([]);
        setProductName("");
        setProductDescription("");
        setSelectedCategories([]);
        setProductPrice("");
        setProductSizes([]);
        dispatch(fetchProducts());
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleAddSize = () => {
    if (newSize && !productSizes.includes(newSize)) {
      setProductSizes([...productSizes, newSize]);
    }
    setNewSize(""); // إعادة تعيين حقل المقاس الجديد
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
  };

  const handleRemoveSize = (size) => {
    setProductSizes(productSizes.filter((s) => s !== size));
  };

  const handleRemoveColor = (color) => {
    setProductColors(productColors.filter((s) => s !== color));
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (!selectedCategories.includes(selectedValue)) {
      setSelectedCategories([...selectedCategories, selectedValue]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const handleAddColor = () => {
    if (newColor) {
      setProductColors([...productColors, newColor]);
      setNewColor("#000000"); // Clear the input after adding
    }
  };

  return (
    <div className=" lg:w-full md:pt-4 ">
      <ToastContainer position="bottom-left" />
      <div className=" lg:flex lg:justify-between lg:items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link
            to={"/dashboard/products"}
            className="border p-2 md:p-3  "
          >
            <i className="bx bx-arrow-back"></i>
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            {/* <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i> */}
            <span className="text-[12px] ">
              Back To product list
            </span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Edit Product
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <div
            className="bg-[#F5CAAB] p-2 lg:p-3  rounded-[20px] flex items-center gap-1 cursor-pointer"
            onClick={handleUpload}
          >
            <i className="bx bx-check text-[20px]"></i>
            <span className="text-[13px] font-[500]">Save Product</span>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:justify-between gap-8  ">
        <div className="lg:w-[620px] mb-6">
          {/* name , description , size , colors */}
          <div className="bg-[#F9F9F9]  p-5 flex flex-col gap-3  rounded-[10px]">
            <h1 className=" text-[20px] font-[600] ">General Information</h1>
            {/* name of product */}
            <div className="flex flex-col gap-1">
              <label className="text-[15px] font-[500] text-[#474B4F]">
                Name Product
              </label>
              <input
                type="text"
                value={productName || ""}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
                placeholder="Name of product"
                id="input-name"
              />
              <span className="text-[14px] text-red-500" id="err-name"></span>
            </div>
            {/* description of product */}
            <div className="flex flex-col gap-1">
              <label className="text-[15px] font-[500] text-[#474B4F]">
                Description Product
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="border h-[200px] text-[15px]  bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] pt-[10px]"
                placeholder="Description of product"
              />
            </div>
             {/* Details of product */}
             <div className="flex flex-col gap-1">
              <label className="text-[15px] font-[500] text-[#474B4F]">
                Details Product
              </label>
              <textarea
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                className="border h-[200px] text-[15px]  bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] pt-[10px]"
                placeholder="Details of product"
              />
            </div>
            <div className="lg:flex gap-5">
              {/* size of product */}
              <div className="flex flex-col w-[300px]">
                <label className="text-[15px] font-[500] text-[#474B4F]">
                  Size
                </label>
                <span className="text-[12px] text-[#CCCBCB]">
                  Add Available Size
                </span>
                <div className="my-2 flex gap-2 flex-wrap">
                  {productSizes.map((size, index) => (
                    <div className="bg-[#F5CAAB] w-10 h-10 relative text-center uppercase rounded-[5px]">
                      <span
                        key={index}
                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[13px] cursor-pointer"
                        onClick={() => handleRemoveSize(size)}
                      >
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newSize || ""}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="border bg-[#EEEEEE] text-[15px] rounded-[5px] outline-none pl-[16px] "
                    placeholder="Add size"
                  />
                  <button
                    onClick={handleAddSize}
                    className="bg-[#F5CAAB] py-2 px-4 rounded ml-2"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* colors of product */}
              <div className="flex flex-col ">
                <label className="text-[15px] font-[500] text-[#474B4F]">
                  Color
                </label>
                <span className="text-[12px] text-[#CCCBCB]">
                  Add Available Colors
                </span>
                <div className=" flex flex-col ">
                  <div className="">
                    <ul className="flex my-2 gap-2 flex-wrap ">
                      {productColors.map((color, index) => (
                        <li
                          key={index}
                          style={{
                            backgroundColor: color,

                            color: "#fff",
                          }}
                          className="  w-10 h-10 rounded-[5px]"
                          onClick={() => handleRemoveColor(color)}
                        ></li>
                      ))}
                    </ul>
                  </div>
                  <div className=" flex items-center gap-4">
                    <input
                      type="color"
                      value={newColor || ""}
                      onChange={(e) => setNewColor(e.target.value)} // تحديث اللون المختار
                      className="w-10 h-10 border-none rounded-[8px]"
                    />
                    <button
                      onClick={handleAddColor}
                      className="bg-[#F5CAAB] font-[500] py-2 px-4 rounded"
                    >
                      Add Color
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* pricing and stock */}
          <div className="bg-[#F9F9F9] mt-5 p-5 pb-2 flex flex-col gap-  rounded-[8px]">
            <h1 className=" text-[20px] font-[600] ">Pricing and Stock</h1>
            <div className="grid grid-cols-2 gap-5 items-center mt-1">
              {/* pricing */}
              <div className="flex flex-col gap-1">
                <label className="text-[15px] font-[500]  text-[#474B4F]">
                  Pricing
                </label>
                <input
                  type="number"
                  value={productPrice || 0}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px]"
                  placeholder="price"
                  id="input-price"
                />
              </div>
              {/* stock */}
              <div className="flex flex-col gap-1">
                <label className="text-[15px] font-[500]  text-[#474B4F]">
                  Stock
                </label>
                <input
                  type="number"
                  value={productStock || ""}
                  onChange={(e) => setProductStock(e.target.value)}
                  className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
                  placeholder="stock"
                />
              </div>
              {/* pricing descount */}
              <div className="flex flex-col gap-1">
                <label className="text-[15px] font-[500]  text-[#474B4F]">
                  Discount
                </label>
                <input
                  type="number"
                  value={priceDiscount || 0}
                  onChange={(e) => setPriceDiscount(e.target.value)}
                  className="w-full border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px]"
                  placeholder="price"
                  id="input-price"
                />
              </div>
              <span
                className="text-[14px] text-red-500 mt-[-15px]"
                id="err-price"
              ></span>
            </div>
          </div>
        </div>
        {/* images and categories */}
        <div className="lg:w-[320px]">
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
                onChange={handleFileChange}
              />
            </label>
            <span className="text-[14px] text-red-500" id="err-image"></span>
            {previewUrls.length > 0 && (
              <div className=" flex gap-2 flex-wrap items-center my-5">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative border-2 border-[#F5CAAB] rounded-[10px] p-1"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-12 h-14 "
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* select categoey */}
          <div className="bg-[#F9F9F9] p-5 rounded-[10px] mt-5">
            <div className="">
              <h1 className=" text-[20px] font-[600] mb-3">category</h1>
              <select
                onChange={handleCategoryChange}
                className="w-full border h-10 text-[13px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px]"
                id="input-category"
              >
                <option value="Men" className="">
                  Men
                </option>
                <option value="Women">Women</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
              <span
                className="text-[14px] text-red-500"
                id="err-category"
              ></span>
              {/* display categories */}
              <div className="mt-3">
                {selectedCategories.map((category, index) => (
                  <span
                    key={index}
                    onClick={() => handleRemoveCategory(category)}
                    className="inline-block bg-[#F5CAAB] text-gray-700  px-5 py-2 rounded-[8px] text-sm font-semibold mr-2 mb-2"
                  >
                    {category}
                  </span>
                ))}
              </div>
              {/*short description of product */}
              <div className="bg-[#F9F9F9] p-5 rounded-[10px] mt-5">
                <div className="flex flex-col gap-1 ">
                  <label className="text-[15px] font-[500] text-[#474B4F]">
                    Short Description
                  </label>
                  <textarea
                    value={ShortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="border h-[100px] text-[15px]  bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] pt-[10px]"
                    placeholder="Description of product"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <h2 className="text-[15px] font-[500] text-[#474B4F]">
                    Show in home
                  </h2>
                  <Select onValueChange={(e) => setBetter(e)}>
                    <SelectTrigger className="w-[full] bg-[#EEEEEE]">
                      <SelectValue placeholder="Better" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={false}>false</SelectItem>
                      <SelectItem value={true}>true</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
