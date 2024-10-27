import React from "react";
import { Card } from "../components/ui/card";
import accessImg from "../assets/access-control.png";

function Access() {
  return (
    <div className="relative  ">
      <div className="flex flex-col gap-4 justify-center items-center py-[10px] ">
        <div className="border-[2px] border-[#e4823c] p-8 rounded-full">
          <img src={accessImg} className="w-[100px] md:w-[150px]" />
        </div>
        <div className="text-center">
          <h1 className="text-[25px] leading-[30px] px-[30px] md:px-[130px] md:text-[50px] font-[600] md:leading-[50px]">
            <span className="text-[#e4823c]">Sorry !</span>You do not have
            permission to access this page{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Access;
