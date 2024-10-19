import React from "react";
import userAvatar from "../../assets/FB_IMG_1705437194399.jpg";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.signleUser);
  return (
    <div>
      <div className="flex gap-3 my-6">
        <h1 className="text-[30px] sm:text-[32px] font-[600] leading-4 ">
          Profile Details
        </h1>
        <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">
          {user.firstName} {user.lastName}
        </span>
      </div>
      {/* image */}
      <div className="flex  items-center gap-5 bg-[#F9F9F9] rounded-[8px] p-3">
        <div>
          <img src={userAvatar} className="w-[60px] h-[60px] rounded-full" />
        </div>
        <div>
          <button className="bg-[#76a963] px-5 py-[5px] rounded-[8px]  flex items-center gap-2 text-[15px] text-white">
            <i class="bx bx-upload"></i>
            <span>upload</span>
          </button>
        </div>
        <div>
          <button className="text-[#76a963] border-[2px] border-[#76a963] px-5 py-1 rounded-[8px] hover flex items-center gap-2 text-[15px] bg-white">
            <i class="bx bx-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/* form */}
      <div className="my-5 p-7 bg-[#F9F9F9] rounded-[8px]">
        <div className="grid md:grid-cols-2 gap-5 ">
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                First Name
              </Label>
              <Input
                type="text"
                placeholder="First Name"
                value={user.firstName}
                readonly
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Last Name
              </Label>
              <Input
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                readonly
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Email Address
              </Label>
              <Input
                type="text"
                placeholder="Email Address"
                value={user.email}
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
                readonly
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Access
              </Label>
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
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 pt-5">
          <Button className=" text-[15px] py-5 hover:bg-[#76a963] font-[400] bg-[#76a963] text-white">
            Save Change
          </Button>
          <Button className=" text-[15px] py-5 font-[400] hover:bg-white bg-[white] text-black">
            Cencel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
