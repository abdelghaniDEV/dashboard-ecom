import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BannerShop({data , setData}) {
  const dataTemplateBannerShop = useSelector((state) => state.template.bannerShop)
  const [templateShop, setTemplateShop] = useState({
    imgShop: "",
  });
  const [prevUrl , setPrevUrl] = useState()
  useEffect(() => {
    if(dataTemplateBannerShop) {
      setPrevUrl(dataTemplateBannerShop.imgShop)
    }
    
  },[dataTemplateBannerShop])
  useEffect(() => {
    setData((prev) => ({
        ...prev,
        bannerShop : templateShop 
    }))
  },[templateShop])
  return (
    <div className="">
      <div className=" flex flex-col bg-[#F9F9F9]  rounded-[10px]">
      <h2 className="text-[18px] font-[500]">Banner Shop</h2>
        <div className="relative w-full h-[300px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
          <img
            src={
              templateShop.imgShop ? URL.createObjectURL(templateShop.imgShop) : prevUrl
            }
           className="w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
          <i
            className="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
            onClick={() => {
              setTemplateShop((prev) => ({
                ...prev,
                imgShop: "",
              }))
              setPrevUrl("")
            }
            }
          ></i>
        </div>
        <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
          <input
            type="file"
            hidden
            onChange={(e) =>
              setTemplateShop((prev) => ({
                ...prev,
                imgShop: e.target.files[0],
              }))
            }
          />
          <i className="bx bx-upload text-[25px]"></i>
          <div className="">Choose Banner</div>
        </label>
      </div>
    </div>
  );
}

export default BannerShop;
