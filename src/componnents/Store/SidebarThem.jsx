import React from "react";
import { Card } from "../../components/ui/card";

function SidebarThem({setShowPage}) {
  return (
    <div className="">
      <div>
        <div className="p-3">
          <ul className="flex  text-[#a8a8a8] gap-5 justify-center">
          <li className="flex gap-2 items-center text-[#e4823c]" onClick={() => setShowPage("HomePage")}>
              <i class="bx bx-home text-[25px]"></i>
              <span className="text-[16px]">Home page</span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-cog text-[25px]"></i>
              <span className="text-[16px]">Template Settings</span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-objects-horizontal-center text-[25px]"></i>
              <span className="text-[16px]">Header / Footer </span>
            </li>
            <li className="flex gap-2 items-center">
              <i class="bx bx-purchase-tag text-[25px]"></i>
              <span className="text-[16px]">Product page</span>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarThem;
