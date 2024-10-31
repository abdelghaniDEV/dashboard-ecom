import React, { useState } from "react";
import HeroDesighn from "./HeroDesighn";
import ListProductsDesighn from "./ListProductsDesighn";
import BannerDesighn from "./BannerDesighn";
import SliderDesighn from "./SliderDesighn";


export default function HomePageDesighn() {
  
  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <HeroDesighn />
        <ListProductsDesighn />
        <BannerDesighn />
        <SliderDesighn />
      </div>
    </div>
  );
}
