import React from "react";
import { useSelector } from "react-redux";

function Logo() {
    const settings = useSelector((state) => state.settingAll)
    console.log(settings)
  return (
    <div className="flex md:justify-center">
      <img
        src={settings.storeLogo}
        className="w-[80px] h-[30px] md:w-[110px] md:h-[40px]"
        alt="Logo"
      />
      <i className="bx bxs-color text-[#F5CAAB] "></i>
    </div>
  );
}

export default Logo;
