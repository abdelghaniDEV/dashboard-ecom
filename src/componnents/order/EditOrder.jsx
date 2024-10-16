
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import axios from "axios";
import spinner from "../../assets/tube-spinner (1).svg"
import { ToastContainer, toast } from "react-toastify";

function EditOrder() {
 

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [productsSelector, setProductsSelector] = useState([]);
  const [productSelector, setProductSelector] = useState();
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adress , setAddress] = useState("")
  const [ZipCode , setZipCode] = useState("")
  const [statusSubmit, setStatusSubmit] = useState('edit');

  const token = localStorage.getItem('token')

  const products = useSelector((statu) => statu.products);
  const orders = useSelector((statu) => statu.orders);

    // toast notification
    const notify = (type, message) => {
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };
  

  const prams = useParams();
  console.log(prams.orderID)
  useEffect(() => {
    const order = orders.find((p) => p._id === prams.orderID);
    if(order) {
      setCustomerName(order.name)
      setCustomerEmail(order.email)
      setAddress(order.address)
      setZipCode(order.zipCode)
      setProductsSelector(order.products)
    }
    console.log('order',order)
  },[])

  const handleAddProduct = () => {
    const updataData = {
      product: { ...productSelector },
      quantity: quantity,
    };
    setProductsSelector([...productsSelector, { ...updataData }]);
    setProductSelector();
    setQuantity(1);
  };

  useEffect(() => {
    console.log('adress', adress)
    console.log('ZipCode', ZipCode)
  },[ ZipCode , adress ])

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // submit order to API
    const orderData = {
      name: customerName,
      email: customerEmail,
      address: adress,
      zipCode: ZipCode,
      products: [...productsSelector],
      totalPrice: totalPrice,
    };


    
    try {
      // simulate API call
      setStatusSubmit('loading');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/${prams.orderID}`,
        orderData,
        {
          headers: {
           
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload successful:", response.data);
      setStatusSubmit('success');
      notify("success", "Order Edit successfully");
    } catch (err) {
      console.error(err);
      setStatusSubmit('edit');
      notify("error", "Error Edit Order ");
    }
  };

  const handleIconSubmit = () => {
    if (statusSubmit === 'loading') {
      return <img src={spinner} className="w-5" />;
    } else if (statusSubmit === 'success') {
      return <i class="bx bx-check text-[20px]"></i>;
    } else if (statusSubmit === 'edit') {
      return <i class="bx bx-plus text-[20px]"></i>;
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" />
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex gap-2 pb-4 lg:pb-0 ">
          <Link
            to={"/dashboard/orders"}
            className="border p-3 hidden lg:block "
          >
            <i class="bx bx-arrow-back"></i>
          </Link>
          <div className="flex items-center gap-2 lg:block">
            <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i>
            <span className="text-[12px] hidden lg:block">
              Back To Order list
            </span>
            <h1 className="text-[25px] lg:text-[20px] font-[600] leading-4 ">
              Edit Order
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          {/* <div className="border-2 p-2 lg:p-3  rounded-[20px] flex items-center gap-2">
            <i class="bx bx-receipt text-[20px]"></i>
            <span className="text-[13px] font-[500]">Save Draf</span>
          </div> */}
          <div
            className="bg-[#F5CAAB] p-2 lg:p-3  rounded-[20px] flex items-center gap-1 cursor-pointer"
            onClick={(e) => handleSubmit(e)}
          >
            {handleIconSubmit()}
            <span className="text-[13px] font-[500]">Edit Order</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex flex-col gap-5 bg-[#F9F9F9] p-5 rounded-[10px]">
          {/* inputs  */}
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name "
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-10 bg-[#EEEEEE] focus:shadow-none focus:outline-none focus:border-none rounded-[5px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Email "
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Adress
              </Label>
              <Input
                type="test"
                placeholder="enter address "
                value={adress}
                onChange={(e) => setAddress(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#474B4F] font-[500] text-[15px]">
                Cod ZIP
              </Label>
              <Input
                type="number"
                placeholder="enter ZIP code "
                value={ZipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="h-10 bg-[#EEEEEE] text-[15px] w-[200px]"
              />
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
              className="h-[50px] text-[15px] bg-[#f2b78d] text-black"
              onClick={() => handleAddProduct()}
            >
              Add product
            </Button>
          </div>
          <div className=" grid md:grid-cols-3 gap-4">
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
                    <i class="bx bx-x bg-red-400 text-white"></i>
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

export default EditOrder;
