import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import StoreSetting from "./StoreSetting";
import LogoSetting from "./LogoSetting";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaSetting from "./MediaSetting";

function DetailsSeting() {
  return (
    <>
      <div className="bg-[#F9F9F9] p-2 md:p-5 flex flex-col gap-3  rounded-[10px] ">
        <StoreSetting />
        <LogoSetting />
        <MediaSetting />
      </div>
      <div className="bg-[#F9F9F9] p-5 mt-4 grid md:grid-cols-3 gap-5 rounded-[10px]   items-center">
        <div className="flex flex-col gap-1">
          <Label className="text-[17px] font-[500] text-[#474B4F]">
            Store Language
          </Label>
          <Select>
            <SelectTrigger className="w-full h-9 bg-[#EEEEEE] text-[15px]">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="france">Frence</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] text-[#474B4F]">
            Maximum payment amount
          </Label>
          <Input
            type="text"
            placeholder="Email of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-[15px] font-[500] text-[#474B4F]">
            Maximum amount for payment
          </Label>
          <Input
            type="number"
            placeholder="Number of store"
            className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
          />
        </div>
      </div>
      <Button className="py-5 px-10 text-[15px] my-5 bg-[#b58df2]  ">
        Save Change
      </Button>
    </>
  );
}

export default DetailsSeting;
