import React from "react";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

function StoreSetting() {
  return (
    <div className="flex flex-col gap-3 py-1 ">
      <div className="flex gap-1 items-center">
        <i className="bx bxs-store text-[30px] text-[#F5CAAB]"></i>
        <h3 className="text-[20px] font-[600]">Store Settings</h3>
      </div>
      <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
        <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
        <span className="text-[14px]">Your customers will use this information to contact you.</span>
      </Card>
      <div className="grid md:grid-cols-3 gap-5 items-center">
        <div className="flex flex-col gap-1">
          <Label className="text-[17px] font-[500] text-[#474B4F]">
            Store Name
          </Label>
          <Input
            type="text"
            placeholder="Name of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] text-[#474B4F]">
            Store mail
          </Label>
          <Input
            type="text"
            placeholder="Email of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] text-[#474B4F]">
            Store Number
          </Label>
          <Input
            type="number"
            placeholder="Number of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-[15px] font-[500] text-[#474B4F]">
          Store Description
        </Label>
        <textarea
          className="border h-[150px] text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] pt-[10px]"
          placeholder="Description of store"
        />
      </div>
    </div>
  );
}

export default StoreSetting;
