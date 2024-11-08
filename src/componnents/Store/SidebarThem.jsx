import React from "react";
import { Card } from "../../components/ui/card";

function SidebarThem({setShowPage}) {
  return (
    <div className="">
      <div>
        <div className=" px-4 pt-5 md:p-3">
          <ul className="grid grid-cols-2 md:grid-cols-4   text-[#a8a8a8] gap-3  justify-center">
          <li className="flex gap-2 items-center text-[#6d5df2]" onClick={() => setShowPage("HomePage")}>
              <i class="bx bx-home text-[20px] md:text-[25px]"></i>
              <span className=" md:text-[16px] font-[500]">Home page</span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-cog text-[20px] md:text-[25px]"></i>
              <span className=" md:text-[16px]">Template Settings</span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-objects-horizontal-center text-[20px] md:text-[25px]"></i>
              <span className=" md:text-[16px]">Header / Footer </span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-purchase-tag text-[20px] md:text-[25px]"></i>
              <span className=" md:text-[16px]">Product page</span>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarThem;
