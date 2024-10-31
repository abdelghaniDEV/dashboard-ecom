import React, { useState } from "react";
import SidebarThem from "../componnents/Store/SidebarThem";
import TempletSetting from "../componnents/Store/TempletSetting";
import HomePageDesighn from "../componnents/Store/HomePageDesighn";

function Store() {
  const [showPage , setShowPage] = useState('');
  
  const handlePageChange = () => {
    if(showPage === "HomePage") {
      return <HomePageDesighn />
    }
  }
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-5 cursor-pointer  ">
        <div className="flex gap-10 pb-4 lg:pb-0 items-center  ">
          <h1 className="text-[30px] lg:text-[35px] font-[600] leading-4 ">
            Store template
          </h1>
          <SidebarThem setShowPage={setShowPage} />
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
