"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "../../components/ui/chart";
import { useSelector } from "react-redux";



export const description = "A donut chart with text";

const FackData = [
  { month: "January", Women: 123, Men: 355, Shoes: 120 , Accessories: 100 },
  { month: "February", Women: 456, Men: 234, Shoes: 229 , Accessories: 90 },
  { month: "March", Women: 434, Men: 288, Shoes: 312 , Accessories: 85},
  { month: "April", Women: 412, Men: 345, Shoes: 460 , Accessories: 30 },
  { month: "May", Women: 222, Men: 345, Shoes: 885 , Accessories: 75 },
  { month: "June", Women: 123, Men: 456, Shoes: 560 , Accessories: 100 },
  { month: "July", Women: 556, Men: 456, Shoes: 570, Accessories: 300},
  { month: "August", Women: 100, Men: 445, Shoes: 685 , Accessories: 450 },
  { month: "September", Women: 548, Men: 456, Shoes: 570 , Accessories: 324 },
  { month: "October", Women: 180, Men: 274, Shoes: 562 , Accessories: 543},
  { month: "November", Women: 335, Men: 544, Shoes: 670 , Accessories: 123 },
  { month: "December", Women: 436, Men: 455, Shoes: 610 , Accessories: 180},
];
const chartConfig = {
  sales: {
    label: "sales",
  },
  Women: {
    label: "Women",
    color: "#76a963",
  },
  Men: {
    label: "Men",
    color: "#f2b78d",
  },
  Shoes: {
    label: "Shoes",
    color: "#a98563",
  },
  Accessories: {
    label: "accessories",
    color: "#a9f28d",
  },
};

export function CategoryChart() {
  const monthlyData = useSelector((statu) => statu.analyticOrders);
  const [chartData, setChartData] = React.useState([]);
  const [selectedData , setSelectedData] = React.useState('October');
  const [isChecked, setIsChecked] = React.useState(false);
  const [data, setData] = React.useState(FackData);
  const [statuData , SetStatuData] = React.useState(true)

 

  React.useEffect(() => {
    if (isChecked) {
      setData(chartData)
    }else {
      setData(FackData)
    }
  },[isChecked])



  const handleSwitchChange = (checked) => {

    console.log('Switch is now:', checked ? 'On' : 'Off');
  };

  React.useEffect(() => {
    const newChartData = [
      {
        category: "Women",
        sales: FackData.reduce((acc, curr) => acc + curr.Women, 0),
        fill: "var(--color-Women)",
      },
      { category: "Men", sales: FackData.reduce((acc, curr) => acc + curr.Men, 0), fill: "var(--color-Men)" },
      {
        category: "Shoes",
        sales: FackData.reduce((acc, curr) => acc + curr.Shoes, 0),
        fill: "var(--color-Shoes)",
      },
      {
        category: "Accessories",
        sales: FackData.reduce((acc, curr) => acc + curr.Accessories, 0),
        fill: "var(--color-Accessories)",
      },
    ];
    setChartData(newChartData)

  },[monthlyData])



  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, [chartData]);

  const handleMonthClick = (selectedMonth) => {
    console.log("selected",selectedMonth)
    const monthData = FackData.find((data) => data.month === selectedMonth);

    if (monthData) {
      const newChartData = [
        {
          category: "Women",
          sales: monthData.Women,
          fill: "var(--color-Women)",
        },
        { category: "Men", sales: monthData.Men, fill: "var(--color-Men)" },
        {
          category: "Shoes",
          sales: monthData.Shoes,
          fill: "var(--color-Shoes)",
        },
        {
          category: "Accessories",
          sales: monthData.Accessories,
          fill: "var(--color-Accessories)",
        },
      ];
      console.log("new Chat",newChartData)
      setChartData(newChartData);
      if(newChartData[0].sales === 0) {
        console.log("data is null")
        SetStatuData(false)
      }
    }
  };
  return (
    <Card className="flex flex-col px-0 ">
    
      <CardHeader className="items-center pb-4 border-b-2 mx-5 ">
        <CardTitle className="font-[600] text-[20px]">Top Categories</CardTitle>
        <Select  onValueChange={(e) => handleMonthClick(e)}>
          <SelectTrigger className="w-[150px] text-[13px] font-[600]">
            <SelectValue placeholder="Select a Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {monthlyData.map((month) => {
                return (
                  <SelectItem value={month.month} key={month.month}>
                    <span>{month.month}</span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="sales"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Sales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
       
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-center border-b-2 pb-4">
          <h2 className="pb-1">Best Selling Categories</h2>
          <button className="border-2 py-1 px-8 text-black font-[500] rounded-[8px]">
            Get All Categories
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 items-center text-center pt-4">
          {chartData.map((category) => {
            return (
              <div className="flex gap-1 items-center">
                <div
                  className="h-4 w-4"
                  style={{
                    backgroundColor: `${chartConfig[category?.category].color}`,
                  }}
                ></div>
                <h3>{category.category}</h3>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
