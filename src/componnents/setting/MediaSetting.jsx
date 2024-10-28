import React from "react";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import xLogo from "../../assets/X-Logo.png"

function MediaSetting() {
  return (
    <div className="flex flex-col gap-3 py-1 ">
      <div className="flex gap-1 items-center">
        <i className="bx bx-link text-[30px] text-[#F5CAAB]"></i>
        <h3 className="text-[20px] font-[600]">Media Settings</h3>
      </div>
      <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
        <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
        <span className="text-[14px]">Enter links to your store's social media accounts.</span>
      </Card>
      <div className="grid md:grid-cols-4 gap-5 items-center">
        <div className="flex flex-col gap-1">
          <Label className="text-[17px] font-[500] flex items-center gap-1 text-[#474B4F]">
            <i className="bx bxl-facebook text-blue-500 bg-[white] rounded-full p-1"></i>
            <span>Facebook</span>
          </Label>
          <Input
            type="text"
            placeholder="facebook of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] flex items-center gap-1 text-[#474B4F]">
            <i className="bx bxl-instagram text-red-500 bg-[white] rounded-full p-1"></i>
            <span>Instagram</span>
          </Label>
          <Input
            type="text"
            placeholder="instagram of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] flex items-center gap-1 text-[#474B4F]">
          <i className='bx bxl-tiktok bg-[white] rounded-full p-1'></i>
             <span>Tik Tok</span>
          </Label>
          <Input
            type="number"
            placeholder="tik tok of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] flex items-center gap-1 text-[#474B4F]">
          {/* <i className='bx bxl-tiktok bg-[white] rounded-full p-1'></i> */}
             <img src={xLogo} className="w-6 bg-white rounded-full p-1" />
             <span>X (Twitter)</span>
          </Label>
          <Input
            type="text"
            placeholder="x (twitter) of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
      </div>
    </div>
  );
}

export default MediaSetting;
