import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userAvatar from "../../assets/FB_IMG_1705437194399.jpg";
import { TableCell, TableRow } from "../../components/ui/table";
import axios from "axios";
import { fetchUsers } from "../../Redux/slices/users.slice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";

function UserCart({ user, index }) {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const dispatch = useDispatch();

  const dateUser = new Date(user.created_at).toDateString();

    // toast notification
    const notify = (type, message) => {
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };

  const token = localStorage.getItem('token');
  const handelDeleteUser = async (userID) => {
    try {
     const response =  await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User deleted successfully:", response.data);
      dispatch(fetchUsers())
      notify("success", "user deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      notify("error", err.response.data.message);
    }
  }
  return (
    <>
    <ChangePassword userID={user._id} openChangePassword={openChangePassword} setOpenChangePassword={setOpenChangePassword}/>
    <TableRow className="xl:text-[15px] text-[14px]">
      <TableCell>{index + 1}</TableCell>
      <TableCell className="md:w-[400px]">
        <div className="flex items-center gap-2">
          <div>
            <img src={user.image ? user.image : userAvatar} className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex flex-col ">
            <span className="font-[500] leading-3 ">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-[14px] text-[#474B4F] hidden">{user.email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center hidden md:table-cell">
        {user.role == "admin" ? (
          <div className="flex gap-2">
            <span className="bg-[#E8F8EE] font-[500] text-[#329167] text-[13px] py-[2px] px-[6px] border-[1.5px] rounded-[12px] border-[#329167]">
              Admin
            </span>
            <span className="bg-[#F4F2FD] font-[500] text-[#5D2CE0] text-[13px] py-[2px] px-[6px] border-[1.5px] rounded-[12px] border-[#5D2CE0]">
              Data Import
            </span>
            <span className="bg-[#EEF8FF] font-[500] text-[#0047C4] text-[13px] py-[2px] px-[6px] border-[1.5px] rounded-[12px] border-[#0047C4]">
              Read Data
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <span className="bg-[#FFEFF5] font-[500] text-[#F43D6B] text-[13px] py-[2px] px-[6px] border-[1.5px] rounded-[12px] border-[#F43D6B]">
              User
            </span>
            <span className="bg-[#EEF8FF] font-[500] text-[#0047C4] text-[13px] py-[2px] px-[6px] border-[1.5px] rounded-[12px] border-[#0047C4]">
              Read Data
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">{dateUser}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <i class="bx bx-dots-vertical-rounded text-[25px] p-[2px] bg-[#F6F6F6] rounded-[4px]"></i>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] mx-4">
            <DropdownMenuLabel>{user.firstName} {user.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="">
              <Link to={`${user._id}`} className="flex items-center gap-2 font-[500]">
              <i class="bx bx-user text-[20px]"></i>
              <span>View Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 font-[500]">
              <i class="bx bx-edit-alt text-[20px]"></i>
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 font-[500]" onClick={() => setOpenChangePassword(true)}>
              <i class="bx bxs-key text-[20px]"></i>
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 font-[500]" onClick={() => handelDeleteUser(user._id)}>
              <i class="bx bx-trash text-[20px]"></i>
              <span>Delete User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
    
    <ToastContainer position="bottom-left" />
    
    </>
  );
}

export default UserCart;
