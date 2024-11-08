import React, { useEffect, useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSelector } from 'react-redux';

function SliderDesighn({data , setData}) {
  const dataTemplateSlider = useSelector((state) => state.template.slider)
  const [templateSlider , setTemplateSlider] = useState ({
    title: '',
    subtitle: '',
    // Add more fields as needed
  })
  useEffect(() => {
    if(dataTemplateSlider) {
      setTemplateSlider((prev) => ({
        title: dataTemplateSlider.title || "",
        subtitle: dataTemplateSlider.subtitle || "",
        imgHero: "",
      }));
    }
    
  },[dataTemplateSlider])

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      slider : templateSlider
    }))
  },[templateSlider])
  return (
    <div>
        <div>
      <div className=" flex flex-col gap-3 bg-[#F9F9F9] p-2 md:p-5 rounded-[10px] ">
        <h2 className="text-[20px] font-[600]">Slider Products</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label className="text-[15px] font-[500] text-[#474B4F]">
              Title
            </Label>
            <Input
              type="text"
              value={templateSlider.title}
              onChange={(e) => setTemplateSlider((prev) => ({
                 ...prev,
                  title: e.target.value,
              }))}
              placeholder="Title"
              className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[15px] font-[500] text-[#474B4F]">
              SubTitle
            </Label>
            <Input
              type="text"
              value={templateSlider.subtitle}
              onChange={(e) => setTemplateSlider((prev) => ({
                 ...prev,
                  subtitle: e.target.value,
              }))}
              placeholder="SubTitle"
              className=" border h-10 text-[15px] bg-[#EEEEEE] rounded-[5px] outline-none pl-[16px] "
            />
          </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default SliderDesighn