import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";

function LogoSetting({
  storeLogo,
  setStoreLogo,
  storeIcon,
  setStoreIcon,
  errorMessage,
  prevLogo,
  prevIcon
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 py-2">
        <i className="bx bxs-image-add text-[30px] text-[#F5CAAB]"></i>
        <h3 className="text-[20px] font-[600]">Logo and Favorite Icon</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="">
          {errorMessage.storeLogo ? (
            <Card className="p-2 flex items-center gap-2 border-[1px] border-red-400">
              <i className="bx bx-error text-red-400 text-[24px]"></i>
              <span className="text-[14px] text-red-500">
                {errorMessage.storeLogo}
              </span>
            </Card>
          ) : (
            <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
              <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
              <span className="text-[14px]">Note: Size must be 450 x 100</span>
            </Card>
          )}
          <div className="relative w-full h-[200px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
            <img
              src={storeLogo ? URL.createObjectURL(storeLogo) : prevLogo}
              className="max-w-[250px] max-h-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
            />
            <i
              className="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
              onClick={() => setStoreLogo()}
            ></i>
          </div>
          <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
            <input
              type="file"
              hidden
              onChange={(e) => setStoreLogo(e.target.files[0])}
            />
            <i className="bx bx-upload text-[25px]"></i>
            <div className="">Choose Logo</div>
          </label>
        </div>
        <div>
        {errorMessage.storeIcon ? (
            <Card className="p-2 flex items-center gap-2 border-[1px] border-red-400">
              <i className="bx bx-error text-red-400 text-[24px]"></i>
              <span className="text-[14px] text-red-500">
                {errorMessage.storeIcon}
              </span>
            </Card>
          ) : (
            <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
              <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
              <span className="text-[14px]">Note: Size must be 32 x 32</span>
            </Card>
          )}
          <div className="relative w-full h-[200px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
            <img
              src={storeIcon ? URL.createObjectURL(storeIcon) : prevIcon}
              className="max-w-[150px] max-h-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
            />
            <i
              className="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
              onClick={() => setStoreIcon()}
            ></i>
          </div>
          <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
            <input
              type="file"
              hidden
              onChange={(e) => setStoreIcon(e.target.files[0])}
            />
            <i className="bx bx-upload text-[25px]"></i>
            <div className="">Choose Icon</div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default LogoSetting;
