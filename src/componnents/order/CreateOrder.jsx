import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchOrders } from "../../Redux/slices/orders.slice";
import spinner from "../../assets/tube-spinner (1).svg";

function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [productsSelector, setProductsSelector] = useState([]);
  const [productSelector, setProductSelector] = useState();
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [statusSubmit, setStatusSubmit] = useState("added");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    products: "",
    address: "",
    zipCode: "",
  });

  const products = useSelector((statu) => statu.products);
  const token = localStorage.getItem("token");

  // toast notification
  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  //dispatch
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (productSelector) {
      const updataData = {
        product: { ...productSelector },
        quantity: quantity,
      };
      setProductsSelector([...productsSelector, { ...updataData }]);
      setProductSelector();
      setQuantity(1);
    }
  };

  const handleDeleteProduct = (productID) => {
    const updatedProducts = productsSelector.filter(
      (product) => product.product._id !== productID
    );
    setProductsSelector(updatedProducts);
  };

  useEffect(() => {
    handleCalculateTotalPrice();
  }, [productsSelector]);

  const handleCalculateTotalPrice = () => {
    let total = 0;
    productsSelector.forEach((product) => {
      total += product.product.price * product.quantity;
    });
    setTotalPrice(total.toFixed(2));
  };
  const validateInputs = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      products: "",
      address: "",
      zipCode: "",
    };

    // validate name
    if (!customerName.trim()) {
      newErrors.name = "Name is Required";
      valid = false;
    }

    //validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim()) {
      newErrors.email = "Email is Required";
      valid = false;
    } else if (!emailRegex.test(customerEmail)) {
      newErrors.email = "Email is not a valid";
      valid = false;
    }

    //validate selected products
    if (productsSelector.length === 0) {
      newErrors.products = "At least one product must be selected.";
      valid = false;
    }

    //validate addrss
    if (!address.trim()) {
      newErrors.address = "Address is Required";
      valid = false;
    }

    //validate zip code
    const zipCodeRegex = /^\d{5}$/;
    if (!ZipCode.trim()) {
      newErrors.zipCode = "Zip Code is Required";
      valid = false;
    } else if (!zipCodeRegex.test(ZipCode)) {
      newErrors.zipCode = "Zip code must be 5 numbers";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate inputs before submitting the product
    if (validateInputs()) {
      // submit order to API
      const orderData = {
        name: customerName,
        email: customerEmail,
        address: address,
        zipCode: ZipCode,
        products: [...productsSelector],
        totalPrice: totalPrice,
      };


      try {
        // simulate API call
        setStatusSubmit("loading");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/orders`,
          orderData,
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Upload successful:", response.data);
        notify("success", "Order added successfully");
        
        setCustomerName('')
        setCustomerEmail('')
        setAddress('')
        setProductsSelector([])
        setProductSelector('')
        setTotalPrice('')
        setZipCode('')

        dispatch(fetchOrders());
        setStatusSubmit("success");
      } catch (err) {
        console.error(err);
        notify("error", err.response.data.message);
        setStatusSubmit("added");
      }
    }
  };
  const handleIconSubmit = () => {
    if (statusSubmit === "loading") {
      return <img src={spinner} className="w-5" />;
    } else if (statusSubmit === "success") {
      return <i className="bx bx-check text-[20px]"></i>;
    } else if (statusSubmit === "added") {
      return <i className="bx bx-plus text-[20px]"></i>;
    }
  };
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex gap-2 pb-4 lg:pb-0 ">
          <Link
            to={"/dashboard/orders"}
            className="border p-2 lg:p-3 "
          >
            <i className="bx bx-arrow-back"></i>
          </Link>
          <div className="items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px]">
              Back To Order list
            </span>
            <h1 className="text-[25px] lg:text-[20px] font-[600] leading-4 ">
              Add New Order
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <div
            className="bg-[#F5CAAB] p-2 lg:p-3  rounded-[20px] flex items-center gap-1 cursor-pointer"
            onClick={(e) => handleSubmit(e)}
          >
            {handleIconSubmit()}
            <span className="text-[13px] font-[500]">Add Order</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex flex-col gap-5 bg-[#F9F9F9] p-5 rounded-[10px]">
          {/* inputs  */}
          <div className="grid md:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Name "
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-10 bg-[#EEEEEE] focus:shadow-none focus:outline-none focus:border-none rounded-[5px]"
              />
              <p className="text-red-500 text-[13px] mt-[-4px]">
                {errors.name}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Email "
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px]"
              />
              <p className="text-red-500 text-[13px] mt-[-4px]">
                {errors.email}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Adress
              </Label>
              <Input
                type="test"
                placeholder="enter address "
                onChange={(e) => setAddress(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px]"
              />
              <p className="text-red-500 text-[13px] mt-[-4px]">
                {errors.address}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Cod ZIP
              </Label>
              <Input
                type="number"
                placeholder="enter ZIP code "
                onChange={(e) => setZipCode(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px] w-[200px]"
              />
              <p className="text-red-500 text-[13px] mt-[-4px]">
                {errors.zipCode}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-[20px] rounded-[5px] ">
            <Select onValueChange={(e) => setProductSelector(e)}>
              <SelectTrigger className="w-[300px] h-[50px]">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => {
                  return (
                    <SelectItem value={product} key={product._id}>
                      <div className="flex gap-3 items-center">
                        <img
                          src={product.image[0]}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4>{product.name}</h4>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Label>Quantity</Label>
            <Input
              type="number"
              placeholder="Enter qunta "
              value={quantity}
              className="h-[50px] w-[200px] bg-[#EEEEEE] text-[20px]"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button
              className="h-[50px] text-[15px] bg-[#f2b78d] text-black "
              onClick={() => handleAddProduct()}
            >
              Add product
            </Button>
          </div>
          <p className="text-red-500 text-[13px] mt-[-20px]">
            {errors.products}
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
            {productsSelector.map((product) => {
              return (
                <div
                  key={product.product._id}
                  className="flex gap-[10px] items-center border p-2  relative bg-white"
                >
                  <img src={product.product.image[0]} className="w-10 h-12 " />
                  <div>
                    <h4 className="leading-[10px] text-[16px]">
                      {product.product.name}
                    </h4>
                    <span className="text-[12px]">
                      Quantity: {product.quantity}
                    </span>
                  </div>
                  <div
                    className="absolute right-0 top-[-4px] cursor-pointer"
                    onClick={() => handleDeleteProduct(product.product._id)}
                  >
                    <i className="bx bx-x bg-red-400 text-white"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
