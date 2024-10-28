import React from "react";
import DetailsSeting from "../componnents/setting/DetailsSeting";
import { Card } from "../components/ui/card";

function Setting() {
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-5  ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[30px] lg:text-[35px] font-[600] leading-4 ">
            Setting
          </h1>
        </div>
      </div>
      <div className="py-1">
        <DetailsSeting />
      </div>
    </div>
  );
}

export default Setting;
