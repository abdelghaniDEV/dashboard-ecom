import React, { useEffect } from "react";
import userAvatar from "../assets/FB_IMG_1705437194399.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUser } from "../Redux/slices/userSingle.slice";

function User() {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      dispatch(fetchSingleUser(token))
    }
  },[])


  const user = useSelector((statu) => statu.signleUser)

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }



  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="borde-none outline-none">
          <div className="flex gap-2 items-center lg:border-l-2 lg:px-3 py-1 ">
            <img
              src={userAvatar}
              alt="User"
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full"
            />
            <div className="md:flex flex-col justify-start hidden md:block ">
              <h3 className="text-[12px] font-[500] leading-[8px] ">
                {user?.firstName} {user?.lastName}
              </h3>
              <h5 className="text-[13px] text-start font-[500] text-[#]">Super {user.role}</h5>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}><Link to={'/login'}>react-router-dom</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default User;
