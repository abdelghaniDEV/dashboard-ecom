import React, { useEffect } from "react";
import logo from "../assets/SAFWA@4x.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SideBar({ setShowSidebar, showSidebar }) {
  const user = useSelector((state) => state.signleUser)
  useEffect(() => {
    const handleClick = () => {
      const sidebar = document.querySelector("#sidebar");
      if (showSidebar) {
        sidebar.classList.remove("hidden");
      } else {
        sidebar.classList.add("hidden");
      }
    };
    handleClick();
  }, [showSidebar]);

  return (
    <div
      id="sidebar"
      className="md:w-[250px] w-full bg-[#F9F9F9] md:h-[210vh] fixed md:relative z-[2000] md:z-[0] h-full hidden lg:block"
    >
      <div className="flex flex-col md:justify-center pt-4">
        {/* logo */}
        <div className="px-6 flex justify-between border-b-[1px] pb-2">
          <div className="flex md:justify-center">
            <img
              src={logo}
              className="w-[80px] h-[30px] md:w-[110px]"
              alt="Logo"
            />
            <i className="bx bxs-color text-[#F5CAAB] "></i>
          </div>
          <div>
            <i
              class="bx bx-x text-[30px] bg-[#F5CAAB] rounded-full md:hidden"
              onClick={() => setShowSidebar(false)}
            ></i>
          </div>
        </div>
        {/* pages */}
        <div className="pt-2">
          <span className="text-[10px] px-4 font-[500] text-[#CCD8D9]">
            GENERAL
          </span>
          <div className="mt-2 mx-6">
            <ul className="md:text-[15px] text-[18px] text-[#8AA1A3] flex flex-col md:gap-4">
              <Link
                to={"/dashboard"}
                className="flex items-center gap-2 rounded-[8px] p-2 "
                onClick={() => setShowSidebar(false)}
              >
                <i className="bx bxs-dashboard text-[20px]"></i>Dashboard
              </Link>
              <Link
                to={"/dashboard/orders"}
                className="flex items-center gap-2 rounded-[8px] p-2 "
                onClick={() => setShowSidebar(false)}
              >
                <i className="bx bx-basket text-[20px]"></i>Orders
              </Link>
              <Link
                to={"/dashboard/products"}
                className="flex items-center gap-2 rounded-[8px] p-2 "
                onClick={() => setShowSidebar(false)}
              >
                <i className="bx bx-cube text-[20px]"></i>Products
              </Link>
              <Link
                to={"/dashboard/categories"}
                className="flex items-center gap-2 rounded-[8px] p-2 "
                onClick={() => setShowSidebar(false)}
              >
                <i className="bx bx-category-alt text-[20px]"></i>Categories
              </Link>
              <Link
                to={"/dashboard/customers"}
                className="flex items-center gap-2 rounded-[8px] p-2 "
                onClick={() => setShowSidebar(false)}
              >
                <i className="bx bx-user-pin text-[20px]"></i>Customers
              </Link>
            </ul>
          </div>
        </div>
        {/* setting */}
        <div className="pt-2">
          <span className="text-[10px] px-4 font-[500] text-[#CCD8D9]">
            SETING
          </span>
          <div className="mt-2 mx-6">
            <ul className="md:text-[15px] text-[18px] text-[#8AA1A3] flex flex-col md:gap-4">
              <Link
                to={`/dashboard/profile/${user.firstName}-${user.lastName}`}
                className="flex items-center gap-2 rounded-[8px] p-2 " 
                onClick={() => setShowSidebar(false)} 
              >
               <i class="bx bx-user-circle text-[20px]"></i>Profile
              </Link>
              <Link
                to={`/dashboard/team`}
                className="flex items-center gap-2 rounded-[8px] p-2 " 
                onClick={() => setShowSidebar(false)} 
              >
               <i class='bx bx-user text-[20px]'></i>Our Team
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
