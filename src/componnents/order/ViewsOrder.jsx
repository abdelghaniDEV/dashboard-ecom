import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function ViewsOrder({ order }) {
  return (
    <div className="text-black flex flex-col gap-4 md:mt-4 mt-2">
      <div className="flex flex-col md:gap-4 ">
        {/* fetch products order */}
        <div className="">
          <h1 className="md:text-[20px] text-[17px] font-semibold md:pb-2 ">Products : </h1>
          <ScrollArea className="flex flex-col gap-2 max-h-[200px] px-2 ">
            {order.products.map((product) => {
              
              return (
                <div key={product._id} className="flex justify-between gap-[40px] items-center border-b-[1px] py-[3px]  ">
                  <div className="flex items-center  gap-2">
                    <div>
                      <img
                        src={product.product?.image[0]}
                        className="w-[40px] rounded-[8px]"
                      />
                    </div>
                    <div className="">
                      <h3 className="md:text-[15px] text-[12px] text-[#a98563]">
                       <span className=" font-medium text-[#aba9a9] ">category: </span>
                          {product.product?.category[0]}
                      </h3>
                      <h1 className="md:text-[17px] font-semibold md:pt-1">
                        {product.product?.name}
                      </h1>
                      {product.sizeSelector && <h1>Size : <span className="font-[600]">{product.sizeSelector.toUpperCase()}</span></h1>}
                    </div>
                  </div>
                  <div>
                    <p>Quantity: {product?.quantity}</p>
                    <p>Price: ${product.product?.price}</p>
                    <p>
                      Total: $
                      {(product?.quantity * product.product?.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>
        {/* order Summary */}
        <div className="">
          <h1 className="md:text-[20px] text-[17px] font-semibold pb-2 ">Order Summary : </h1>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center font-medium md:text-[16px] text-[#aba9a9]">
              <h4 className="">SubTotal</h4>
              <div className="flex item-center gap-2">
                <p>items {order.products.length}</p>
                <p>${order.totalPrice}</p>
              </div>
            </div>
            <div className="flex justify-between items-center font-medium md:text-[16px] text-[#aba9a9]">
              <h4 className=" f">Shipping</h4>
              <div className="flex item-center gap-2">
                <p>Free Shipping</p>
              </div>
            </div>
            <div className="flex justify-between items-center font-medium md:text-[18px] text-[16px]">
              <h4 className=" f">Total</h4>
              <div className="flex item-center gap-2">
                <p>${order.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="border p-2 rounded-[10px]">
          <h2 className="md:text-[18px] font-semibold text-[15px] pb-1">Custemer :</h2>
          <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
            <i className="bx bx-user text-[#a98563]"></i>
            <span>{order.name}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
            <i className="bx bx-shopping-bag text-[#a98563]"></i>
            <span>1 Order</span>
          </div>
          <div className="flex items-center gap-2 text-[13px]  md:text-[16px]">
            <i className="bx bx-envelope text-[#a98563]"></i>
            <span>{order.email}</span>
          </div>
        </div>
        <div className="border p-2 rounded-[10px]">
          <h2 className="md:text-[18px] text-[15px] font-semibold pb-1">Shipping Address :</h2>
          <div className="flex items-center gap-2  text-[13px] md:text-[16px]">
            <i className="bx bx-current-location text-[#a98563]"></i>
            <span>{order.address}</span>
          </div>
          <div className="flex items-center gap-2  text-[13px] md:text-[16px]">
            <i className="bx bxs-edit-location text-[#a98563]"></i>
            <span>{order.zipCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewsOrder;
