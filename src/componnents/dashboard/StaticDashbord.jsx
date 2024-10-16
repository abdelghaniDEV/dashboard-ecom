import React from "react";
import DatePickerDemo from "../DatePickerDemo";
import BarChart from "./BarChart";
import ListTopProducts from "./ListTopProducts";
import ProductsChart from "./ProductsChart";
// import {BarChart} from "./BarChart";

function StaticDashbord() {
  return (
    <div className="">
      <div className="flex justify-end p-3">
        {/* <DatePickerDemo /> */}
      </div>
      <div className=" ">
        <div >
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default StaticDashbord;
