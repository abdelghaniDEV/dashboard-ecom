import React from "react";
import { Card } from "../../components/ui/card";

function TempletSetting() {
  return (
    <div className="w-full ">
      <h2 className="text-[20px] font-[600]">Template Colors</h2>
      <Card className="p-5 my-4">
        <div className="">
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between bg-[#F9F9F9] py-2 px-4 rounded-[10px]">
              <label className="text-[15px] font-[500]">Primary Color</label>
              <div className="flex items-center gap-2 ">
                <span className="font-[500]">#F5CAAB</span>
                <input
                  type="color"
                  
                  name="primaryColor"
                  className="w-[60px] h-[40px] rounded-[10px] border-[0px]"
                />
              </div>
            </li>
            <li className="flex items-center justify-between bg-[#F9F9F9] py-2 px-4 rounded-[10px]">
              <label className="text-[15px] font-[500]">Text Color</label>
              <div className="flex items-center gap-2 ">
                <span className="font-[500]">#F5CAAB</span>
                <input
                  type="color"
                 
                  name="primaryColor"
                  className="w-[60px] h-[40px] rounded-[10px] border-[0px]"
                />
              </div>
            </li>
            <li className="flex items-center justify-between bg-[#F9F9F9] py-2 px-4 rounded-[10px]">
              <label className="text-[15px] font-[500]">Secondary color</label>
              <div className="flex items-center gap-2 ">
                <span className="font-[500]">#F5CAAB</span>
                <input
                  type="color"
                  
                  name="primaryColor"
                  className="w-[60px] h-[40px] rounded-[10px] border-[0px]"
                />
              </div>
            </li>
            <li className="flex items-center justify-between bg-[#F9F9F9] py-2 px-4 rounded-[10px]">
              <label className="text-[15px] font-[500]">Notification Color</label>
              <div className="flex items-center gap-2 ">
                <span className="font-[500]">#F5CAAB</span>
                <input
                  type="color"
                  
                  name="primaryColor"
                  className="w-[60px] h-[40px] rounded-[10px] border-[0px]"
                />
              </div>
            </li>
            <li className="flex items-center justify-between bg-[#F9F9F9] py-2 px-4 rounded-[10px]">
              <label className="text-[15px] font-[500]">Primary Color</label>
              <div className="flex items-center gap-2 ">
                <span className="font-[500]">#F5CAAB</span>
                <input
                  type="color"
                  name="primaryColor"
                  className="w-[60px] h-[40px] rounded-[10px] border-[0px]"
                />
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default TempletSetting;
