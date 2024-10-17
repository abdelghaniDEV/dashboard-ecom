import React from "react";
import User from "./User";
import { useSelector } from "react-redux";


function Header({setShowSidebar}) {
  const user = useSelector((statu) => statu.signleUser)
  return (
    <div className="flex items-center justify-between mx-2 md:mx-4 mt-2 mb-5 ">
      {/* search */}
      <div className="flex gap-5 items-center ">
        <div className="flex gap-3 items-center">
          <i className="bx bx-menu-alt-left text-[35px] md:hidden" onClick={() => setShowSidebar(true)}></i>
          <div className="hidden lg:block">
            <span className="text-[#aba9a9]">Welcome</span>
            <h1 className="text-[30px] font-semibold leading-[20px]"> Mr <span className="bg-[#] text-[#e4823c]  rounded-[30px]">{user.firstName} {user.lastName}</span></h1>
          </div>
         
        </div>
      </div>
      {/* admin and icons */}
      <div className="flex items-center gap-2 lg:gap-5">
        <div className="bg-[#F5CAAB] w-9 h-9 lg:w-10 lg:h-10 relative  rounded-full">
          <i className="bx bx-bell text-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></i>
          <span className="absolute h-2 w-2  lg:w-4 lg:h-4 bg-black rounded-full"></span>
        </div>
        
        <User/>
      </div>
    </div>
  );
}

export default Header;
