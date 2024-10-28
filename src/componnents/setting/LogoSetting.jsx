import React, { useState } from 'react'
import { Card } from '../../components/ui/card'

function LogoSetting() {
    const [logo, setLogo] = useState("");
    const [icon, setIcon] = useState("");
  return (
    <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3 py-2">
      <i class="bx bxs-image-add text-[30px] text-[#F5CAAB]"></i>
      <h3 className="text-[20px] font-[600]">Logo and Favorite Icon</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
          <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
          <span className='text-[14px]'>Note: Size must be 450 x 100</span>
        </Card>
        <div className="relative w-full h-[200px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
          <img
            src={logo && URL.createObjectURL(logo)}
            className="max-w-[250px] max-h-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
          <i
            class="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
            onClick={() => setLogo()}
          ></i>
        </div>
        <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
          <input
            type="file"
            hidden
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <i className="bx bx-upload text-[25px]"></i>
          <div className="">Choose Logo</div>
        </label>
      </div>
      <div>
        <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
          <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
          <span className='text-[14px]'>Note: Size must be 32x32 or 16x16</span>
        </Card>
        <div className="relative w-full h-[200px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
          <img
            src={icon && URL.createObjectURL(icon)}
            className="max-w-[150px] max-h-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
          <i
            class="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
            onClick={() => setLogo()}
          ></i>
        </div>
        <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
          <input
            type="file"
            hidden
            onChange={(e) => setIcon(e.target.files[0])}
          />
          <i className="bx bx-upload text-[25px]"></i>
          <div className="">Choose Icon</div>
        </label>
      </div>
    </div>
  </div>
  )
}

export default LogoSetting