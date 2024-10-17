import React, { useEffect, useState } from "react";
import { Area, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";

const FackData = [
  { month: "January", Orders: 123, Revenue: 355.77, Products: 120 },
  { month: "February", Orders: 456, Revenue: 234.89, Products: 229 },
  { month: "March", Orders: 434, Revenue: 288.66, Products: 312 },
  { month: "April", Orders: 412, Revenue: 345.99, Products: 460 },
  { month: "May", Orders: 222, Revenue: 345.09, Products: 885 },
  { month: "June", Orders: 123, Revenue: 456.98, Products: 560 },
  { month: "July", Orders: 556, Revenue: 456.99, Products: 570 },
  { month: "August", Orders: 100, Revenue: 445.98, Products: 685 },
  { month: "September", Orders: 548, Revenue: 456.09, Products: 570 },
  { month: "October", Orders: 180, Revenue: 274.42, Products: 562 },
  { month: "November", Orders: 335, Revenue: 544.78, Products: 670 },
  { month: "December", Orders: 436, Revenue: 455.99, Products: 610 },
];

function Barchart() {
  const chartData = useSelector((statu) => statu.analyticByMonth);
  const [selectMonth, setSelectMonth] = useState("Year");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(FackData);

  useEffect(() => {
    if (isChecked) {
      setData(chartData);
    } else {
      setData(FackData);
    }
  }, [isChecked]);

  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
    console.log("Switch is now:", checked ? "On" : "Off");
  };
  const ChartConfig = {
    Orders: {
      label: "Orders",
      color: "#f2b78d",
    },
    Revenue: {
      label: "Revenue",
      color: "#a98563",
    },
    Products: {
      label: "Products",
      color: "#76a963",
    },
  };

  // useEffect(() => {
  //   setTotalProducts(chartData.reduce((acc, curr) => acc + curr.Products, 0));
  //   setTotalRevenue(chartData.reduce((acc, curr) => acc + curr.Revenue, 0));
  //   setTotalOrders(chartData.reduce((acc, curr) => acc + curr.Orders, 0));
  // }, [chartData]);

  // fack data
  useEffect(() => {
    setTotalProducts(data.reduce((acc, curr) => acc + curr.Products, 0));
    setTotalRevenue(data.reduce((acc, curr) => acc + curr.Revenue, 0));
    setTotalOrders(data.reduce((acc, curr) => acc + curr.Orders, 0));
  }, [data]);

  useEffect(() => {
    console.log(selectMonth);
    // calculate total sales and revenue based on selected month
    if (selectMonth === "Year" || selectMonth === undefined) {
      // all anlytics data for a year
      setTotalProducts(data.reduce((acc, curr) => acc + curr.Products, 0));
      setTotalRevenue(data.reduce((acc, curr) => acc + curr.Revenue, 0));
      setTotalOrders(data.reduce((acc, curr) => acc + curr.Orders, 0));
    } else {
      const selectedMonthData = data.filter(
        (data) => data.month === selectMonth
      );
      setTotalProducts(
        selectedMonthData.reduce((acc, curr) => acc + curr.Products, 0)
      );
      setTotalRevenue(
        selectedMonthData.reduce((acc, curr) => acc + curr.Revenue, 0)
      );
      setTotalOrders(
        selectedMonthData.reduce((acc, curr) => acc + curr.Orders, 0)
      );
    }

    console.log(selectMonth);
  }, [selectMonth]);

  return (
    <div className="">
      <div className="">
        <CardHeader className='p-1'>
          <CardTitle className="flex justify-between pb-3">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isChecked}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="Real-data" c>
                Real Data
              </Label>
            </div>
            <Select onValueChange={(e) => setSelectMonth(e)} >
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Select a Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="border-none outline-none">
                  <SelectLabel>month</SelectLabel>
                  <SelectItem value="Year">Year</SelectItem>
                  {chartData.map((month) => {
                    return (
                      <SelectItem value={month.month} key={month.month}>
                        <span>{month.month}</span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardTitle>
          <div className="custom-gradient grid grid-cols-1 lg:grid-cols-3 gap-3  ">
            <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] p-4  shadow-md bg-box-total-products  text-white">
              <h3 className="text-[14px]">Total Products</h3>
              <div className="flex gap-[7px]">
                <i class="bx bx-category-alt text-[20px]"></i>
                <i class="bx bx-category-alt text-[150px] absolute top-3 right-[-40px] text-[#5BAE3D] lg:hidden"></i>
                <h1 className="text-[30px] font-[600]">{totalProducts}</h1>
              </div>
              <div className="flex items-center">
                <i class="bx bxs-chevrons-up text-[#8BE78B]"></i>
                <h3 className="text-[14px]">
                  <span className="text-[#8BE78B] font-[600]">+35 %</span> from
                  last month
                </h3>
              </div>
            </div>
            <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] p-4  shadow-md bg-box-total-revenue">
              <h3 className="text-[14px]">Revenue</h3>
              <div className="flex gap-[7px]">
                <span className="text-[20px]">$</span>
                <span className="text-[180px] absolute top-[-40px] right-0 text-[#A98563] lg:hidden">$</span>
                <h1 className="text-[30px] font-[600]">{totalRevenue}</h1>
              </div>
              <div className="flex items-center">
                <i class="bx bxs-chevrons-up text-[#8BE78B]"></i>
                <h3 className="text-[14px]">
                  <span className="text-[#8BE78B] font-[600]">+35 %</span> from
                  last month
                </h3>
              </div>
            </div>
            <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] p-4 shadow-md md:bg-[#f2b78d] bg-box-total-orders">
              <h3 className="text-[14px]">Total Orders</h3>
              <div className="flex gap-[7px]">
                <i class="bx bx-shopping-bag text-[20px]"></i>
                <i class="bx bx-shopping-bag text-[150px] absolute top-3 right-[-40px] text-[#F2B78D] lg:hidden"></i>
                <h1 className="text-[30px] font-[600]">{totalOrders}</h1>
              </div>
              <div className="flex items-center">
                <i class="bx bxs-chevrons-down text-[#821f1f]"></i>
                <h3 className="text-[14px]">
                  <span className="text-[#821f1f] font-[600]">+35 %</span> from
                  last month
                </h3>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='overflow-scroll md:overscroll-none'>
          <ChartContainer config={ChartConfig} className="h-[200px] w-[150%]  md:w-full ">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="Orders" fill="var(--color-Orders)" radius={4} />
              <Bar dataKey="Revenue" fill="var(--color-Revenue)" radius={4} />
              <Bar dataKey="Products" fill="var(--color-Products)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </div>
    </div>
  );
}

export default Barchart;
