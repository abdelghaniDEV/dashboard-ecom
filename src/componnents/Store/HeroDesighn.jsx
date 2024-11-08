import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import { useSelector } from "react-redux";

function HeroDesighn({data , setData}) {
  const dataTemplateHero = useSelector((state) => state.template.hero)
  
  const [templateHero, setTemplateHero] = useState({
    title: "",
    subtitle: "",
    imgHero: "",
  });

  const [prevUrl , setPrevUrl] = useState()
  useEffect(() => {
    if(dataTemplateHero) {
      setTemplateHero((prev) => ({
        title: dataTemplateHero.title || "",
        subtitle: dataTemplateHero.subtitle || "",
        imgHero: "",
      }));
      setPrevUrl(dataTemplateHero.imgHero)
    }
    
  },[dataTemplateHero])


  

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      hero:templateHero
    }));
  }, [templateHero]);
  return (
    <div>
      <div className=" flex flex-col gap-3  bg-[#F9F9F9] p-2 md:p-5 rounded-[10px] ">
        <h2 className="text-[20px] font-[600]">Hero</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col  gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                subTitle
              </Label>
              <Input
                type="text"
                value={templateHero.subtitle || ""}
                onChange={(e) =>
                  setTemplateHero((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                placeholder="SubTitle"
                className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Title
              </Label>
              <Input
                type="text"
                value={templateHero.title || ""}
                onChange={(e) =>
                  setTemplateHero((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Title"
                className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Address
              </Label>
              <textarea type="text" placeholder="adress" className="h-[200px] text-[15px] outline-none bg-[#EEEEEE] rounded-[5px] py-3 pl-[16px]" />
            </div>
          </div>
          <div>
            {/* <Card className="p-2 flex items-center gap-2 border-[1px] border-blue-400">
              <i className="bx bxs-info-circle text-blue-400 text-[24px]"></i>
              <span className="text-[14px]">
                Note: Size must be 32x32 or 16x16
              </span>
            </Card> */}
            <div className="relative w-full h-[300px] bg-[white] border-[1px] overflow-hidden rounded-[10px] my-3">
              <img
                src={templateHero.imgHero ? URL.createObjectURL(templateHero.imgHero) : prevUrl}
                className="w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
              />
              <i
                className="bx bx-trash-alt absolute m-2 border-[2px] p-2 rounded-full right-0 cursor-pointer"
                onClick={() =>
                  setTemplateHero((prev) => ({
                    ...prev,
                    imgHero: "",
                  }))
                }
              ></i>
            </div>
            <label className="flex w-full h-10 px-2 gap-3 bg-[#F5CAAB] rounded-[8px] shadow  text-[16px] font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setTemplateHero((prev) => ({
                    ...prev,
                    imgHero: e.target.files[0],
                  }))
                }
              />
              <i className="bx bx-upload text-[25px]"></i>
              <div className="">Choose Banner</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDesighn;
