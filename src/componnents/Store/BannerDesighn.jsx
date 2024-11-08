import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import { useSelector } from "react-redux";
import BannerShop from "./BannerShop";

function BannerDesighn({ data, setData }) {
  const dataTemplateBanner = useSelector((state) => state.template.banner);
  const [templateBanner, setTemplateBanner] = useState({
    title: "",
    description: "",
    imgBanner: "",
  });
  const [prevUrl, setPrevUrl] = useState();

  useEffect(() => {
    if (dataTemplateBanner) {
      setTemplateBanner((prev) => ({
        title: dataTemplateBanner.title || "",
        description: dataTemplateBanner.description || "",
        imgBanner: "",
      }));
      setPrevUrl(dataTemplateBanner.imgBanner);
    }
  }, [dataTemplateBanner]);
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      banner: templateBanner,
    }));
  }, [templateBanner]);
  return (
    <div>
      <div className=" flex flex-col gap-3  bg-[#F9F9F9] p-2 md:p-5 rounded-[10px] ">
        <h2 className="text-[20px] font-[600]"> Banner</h2>
        <div className="grid grid-cols- gap-5">
          <div className="flex flex-col  gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Title
              </Label>
              <Input
                type="text"
                value={templateBanner.title}
                onChange={(e) =>
                  setTemplateBanner((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="title"
                className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                description
              </Label>
              <Input
                type="text"
                value={templateBanner.description}
                onChange={(e) =>
                  setTemplateBanner((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="description"
                className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5 items-start">
            <div>
              {/* <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
                <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
                <span className="text-[14px]">
                  Note: Size must be 32x32 or 16x16
                </span>
              </Card> */}
              <h2 className="text-[18px] font-[500]">Banner Home</h2>
              <div className="relative  h-[300px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
                <img
                  src={
                    templateBanner.imgBanner
                      ? URL.createObjectURL(templateBanner.imgBanner)
                      : prevUrl
                  }
                  className="w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
                />
                <i
                  className="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
                  onClick={() =>
                    setTemplateBanner((prev) => ({
                      ...prev,
                      imgBanner: "",
                    }))
                  }
                ></i>
              </div>
              <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                <input
                  type="file"
                  hidden
                  
                  onChange={(e) =>
                    setTemplateBanner((prev) => ({
                      ...prev,
                      imgBanner: e.target.files[0],
                    }))
                  }
                />
                <i className="bx bx-upload text-[25px]"></i>
                <div className="">Choose Banner</div>
              </label>
            </div>
            <BannerShop data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerDesighn;
