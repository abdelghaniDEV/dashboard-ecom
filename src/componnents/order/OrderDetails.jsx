import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card } from "../../components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Invoice from "./Invoice";

function OrderDetails() {
  const params = useParams();
  const orders = useSelector((state) => state?.orders);
  const [order, setOrder] = useState();
  const [openImprim, setOpenImprim] = useState(true);

  useEffect(() => {
    if (orders) {
      const orderTarget = orders.find((order) => order._id === params.orderID);
      if (orderTarget) {
        setOrder(orderTarget);
      }
    }
  }, [orders, params.orderID]);
  // Define componentRef and ensure it's assigned to the element we want to print

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h1 className="text-[35px] font-[600]">
            Order ID: {order?.invoiceNumber}{" "}
          </h1>
          <span className="md:text-[14px] text-[10px] bg-[#a9f28d] py-1 px-2  rounded-[20px] font-medium">
            {order?.createdAt}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            className="bg-white text-black border-[1px] border-black"
            onClick={""}
          >
            <i className="bx bx-printer text-[18px] "></i>
          </Button>
          <Button className="flex  items-center gap-2 text-[#76a963] hover:text-white hover:bg-[#76a963] bg-white border-[1px] text-[16px] border-[#76a963] ">
            <i className="bx bx-edit-alt  "></i>
            <span className=" ">Edit</span>
          </Button>
          <Button className="flex items-center gap-2 text-[#F4164F] hover:text-white hover:bg-[#F4164F] bg-white border-[1px] text-[16px] border-[#F4164F]">
            <i className="bx bx-trash-alt  "></i>
            <span className="  ">Delete</span>
          </Button>
        </div>
      </div>
      <div className="text-black flex gap-4 md:mt-4 mt-2  ">
        <div className="flex flex-col md:gap-4 w-[70%]">
          {/* fetch products order */}
          <Card className="p-4">
            <h1 className="md:text-[20px] text-[17px] font-semibold md:pb-2 ">
              Products :{" "}
            </h1>
            <div className="flex flex-col gap-2 px-2 ">
              {order?.products?.map((product) => {
                return (
                  <div
                    key={product?._id}
                    className="flex justify-between gap-[40px] items-center border-b-[1px] py-[3px]  "
                  >
                    <div className="flex items-center  gap-2">
                      <div>
                        <img
                          src={product.product?.image[0]}
                          className="w-[70px] rounded-[8px]"
                        />
                      </div>
                      <div className="">
                        <h3 className="md:text-[15px] text-[12px] text-[#a98563]">
                          <span className=" font-medium text-[#aba9a9] ">
                            category:{" "}
                          </span>
                          {product.product?.category[0]}
                        </h3>
                        <h1 className="md:text-[17px] font-semibold md:pt-1">
                          {product.product?.name}
                        </h1>
                        {product.sizeSelector && (
                          <h1>
                            Size :{" "}
                            <span className="font-[600]">
                              {product?.sizeSelector.toUpperCase()}
                            </span>
                          </h1>
                        )}
                        {product.colorSelector && (
                          <div className="flex items-center gap-1 text-[500]">
                            color :{" "}
                            <div
                              className="w-[20px] h-[20px] rounded-full  cursor-pointer"
                              style={{ backgroundColor: product.colorSelector }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p>Quantity: {product?.quantity}</p>
                      <p>Price: ${product.product?.price}</p>
                      <p>
                        Total: $
                        {(product?.quantity * product.product?.price).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          {/* order Summary */}
          <Card className="p-4">
            <h1 className="md:text-[20px] text-[17px] font-semibold pb-2 ">
              Order Summary :{" "}
            </h1>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center font-medium md:text-[16px] text-[#aba9a9]">
                <h4 className="">SubTotal</h4>
                <div className="flex item-center gap-2">
                  <span>items {order?.products?.length}</span>
                  <span>${order?.totalPrice}</span>
                </div>
              </div>
              <div className="flex justify-between items-center font-medium md:text-[16px] text-[#aba9a9]">
                <h4 className=" f">Shipping</h4>
                <div className="flex item-center gap-2">
                  <span>{order?.shipping}</span>
                </div>
              </div>
              <div className="flex justify-between items-center font-medium md:text-[18px] text-[16px]">
                <h4 className=" f">Total</h4>
                <div className="flex item-center gap-2">
                  <p>${order?.totalPrice}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[30%] flex flex-col gap-4">
          <Card className=" p-4 ">
            <h2 className="md:text-[18px] font-semibold text-[15px] pb-1">
              Custemer :
            </h2>
            <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
              <i className="bx bx-user text-[#a98563]"></i>
              <span>{order?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
              <i className="bx bx-shopping-bag text-[#a98563]"></i>
              <span>{order?.products.length} product</span>
            </div>
            <div className="flex items-center gap-2 text-[13px]  md:text-[16px]">
              <i className="bx bx-envelope text-[#a98563]"></i>
              <span>{order?.email}</span>
            </div>
          </Card>
          <Card className="p-4">
            <h2 className="md:text-[18px] text-[15px] font-semibold pb-1">
              Shipping Address :
            </h2>
            <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
              <i className="bx bx-user text-[#a98563]"></i>
              <span>{order?.name}</span>
            </div>
            <div className="flex items-center gap-2  text-[13px] md:text-[16px]">
              <i className="bx bx-current-location text-[#a98563]"></i>
              <span>{order?.address}</span>
            </div>
            <div className="flex items-center gap-2  text-[13px] md:text-[16px]">
              <i className="bx bxs-phone text-[#a98563]"></i>
              <span>{order?.number}</span>
            </div>
            <div className="flex items-center gap-2  text-[13px] md:text-[16px]">
              <i className="bx bxs-edit-location text-[#a98563]"></i>
              <span>{order?.zipCode}</span>
            </div>
          </Card>
        </div>
      </div>
      <Dialog open={openImprim} onOpenChange={setOpenImprim} >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {/* <Invoice order={order} /> */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderDetails;
