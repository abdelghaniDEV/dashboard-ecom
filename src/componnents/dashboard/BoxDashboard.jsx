import React from "react";
import { Card } from "../../components/ui/card";

function BoxDashboard({data , bgColor , textColor , title , icon , iconColor }) {
  return (
    <Card className={`relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] p-4 py-8 ${textColor}  ${bgColor}`}>
      <h3 className="text-[18px] md:text-[14px] font-[500]">{title}</h3>
      <div className="flex gap-[7px]">
        <i className={`${icon} text-[30px] md:text-[20px]`}></i>
        <i className={`${icon} text-[200px] md:text-[150px] absolute top-3 right-[-60px] md:right-[-40px] ${iconColor}`}></i>
        <h1 className="text-[40px] md:text-[30px] font-[600]">{data}</h1>
      </div>
    </Card>
  );
}

export default BoxDashboard;
