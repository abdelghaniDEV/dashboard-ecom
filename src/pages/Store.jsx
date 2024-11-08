import React, { useState } from "react";
import SidebarThem from "../componnents/Store/SidebarThem";
import TempletSetting from "../componnents/Store/TempletSetting";
import HomePageDesighn from "../componnents/Store/HomePageDesighn";
import HeaderFotterDesighn from "../componnents/Store/HeaderFotterDesighn";

function Store() {
  const [showPage , setShowPage] = useState('HomePage');
  
  const handlePageChange = () => {
    if(showPage === "HomePage") {
      return <HomePageDesighn />
    }if (showPage === "Header/Fotter") {
      return <HeaderFotterDesighn />
    }
  }
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-5 cursor-pointer  ">
        <div className="lg:flex gap-10 pb-4 lg:pb-0 items-center  ">
          <h1 className="text-[30px] lg:text-[35px] font-[600] leading-[32px] ">
            Store template
          </h1>
          {/* <SidebarThem setShowPage={setShowPage} /> */}
        </div>
      </div>
      <div className=" ">
        {/* <TempletSetting /> */}
        {/* <HomePageDesighn /> */}
        {handlePageChange()}
      </div>
    </div>
  );
}

export default Store;
