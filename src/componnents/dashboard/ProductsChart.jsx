import React from 'react'
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"

const chartData = [
  { browser: "Lunch", product: 275, fill: "var(--color-Lunch)" },
  { browser: "sold", product: 200, fill: "var(--color-sold)" },
  { browser: "ongoing", product: 173, fill: "var(--color-ongoing)" },
]



const chartConfig = {
 Lunch: {
    label: "Lunch",
    color: "",
  },
  sold: {
    label: "sold",
    color: "hsl(var(--chart-2))",
  },
  ongoing: {
    label: "ongoing",
    color: "hsl(var(--chart-3))",
  },  
}

function ProductsChart() {
  return (
    <div>
      <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
        <CardDescription className="text-[30px] text-black font-[600] leading-[35px]" >120 Product</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            // margin={{
            //   left: 0,
            // }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="product" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              
            />
            <Bar dataKey="product" layout="vertical" radius={5}  />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm pt-6">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      
    </Card>
    </div>
  )
}

export default ProductsChart