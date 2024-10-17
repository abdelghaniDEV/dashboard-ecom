import React, { useEffect } from 'react'
import desighn from "../assets/undraw_true_love_cy8x@4x.png";
import { useDispatch, useSelector } from "react-redux";
import StaticDashbord from "../componnents/dashboard/StaticDashbord";
import {CategoryChart} from '../componnents/dashboard/CategoryChart';
import ListTopProducts from '../componnents/dashboard/ListTopProducts';
import ListOrder from '../componnents/dashboard/ListOrder';
import desShop from '../assets/undraw_heavy_box_agqi@4x.png'
import { Button } from '../components/ui/button';
import logoColor from "../assets/SAFWA@4xcolor.png"
import { fetchProducts } from '../Redux/slices/products.slice';
import { fetchCategories } from '../Redux/slices/categories.slice';
import { fetchOrders } from '../Redux/slices/orders.slice';
import { fetchCustomer } from '../Redux/slices/customers.slice';
import { fetchAnalyticByMonth } from '../Redux/slices/anlytic.slice';
import { fetchAnalyticOrders } from '../Redux/slices/analyticCategory';
import { fetchSingleUser } from '../Redux/slices/userSingle.slice';


function Dashboard() {
  const products = useSelector((state) => state.products);
  const token = localStorage.getItem('token')
  console.log(token)

  return (
    <div className="lg:flex gap-3">
      <div className="lg:w-[80%] ">
        <div className="bg-custom-gradient flex  rounded-[20px] justify-between p-5">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-[25px] md:text-[30px] font-[500] leading-[35px]">
                Here happening in your
                <br />
                sales last weeks
              </h1>
            </div>
            <div>
              <div className="flex gap-[10px] items-center">
                <h5 className="text-[30px] font-[600] text-[#e97e32]">
                  $8.577.00
                </h5>
                <span className="font-[500] text-[20px]">Sales</span>
              </div>
              <p className="text-[#e97e32] text-[13px]">
                {products.length} product are sellings{" "}
                <span className="text-black">
                  and its increasing rom last weeks.
                </span>{" "}
              </p>
            </div>
            <div className="">
              <button className="text-[#e97e32] bg-white px-5 py-2  font-[600] text-[13px] rounded-[10px]">
                View Orders{" "}
              </button>
            </div>
          </div>
          <div className='hidden lg:block'>
            <img src={desighn} className="w-[300px]" />
          </div>
        </div>
        <StaticDashbord />
        <ListOrder />
      </div>
      <div className="lg:w-[30%]">
        <CategoryChart />
        <ListTopProducts/>
        <div className='w-full h-[240px] relative rounded-[20px] bg-[#aaf28d5d] mt-4 p-4 flex flex-col items-center gap-5'>
           <div className='flex flex-col items-center '>
             <img src={desShop} className='w-[128.82px] h-[82.23px]' />
             <h2 className='text-[20px] text-center font-[500] leading-[22px]'>Take your <span className='text-[#76a963]'>business</span> to the next <span className='text-[#76a963]'>Level</span></h2>
           </div>
              {/* <div className='absolute bg-[#b58df2] h-10 w-10 rounded-full top-10 right-5' ></div>
              <div className='absolute bg-[#a98563] h-10 w-10 rounded-full left-6 ' ></div>
              <div className='absolute bg-[#f2b78d] h-10 w-10 rounded-full bottom-[60px] left-3' ></div> */}
          <div className='pb-5'> <Button className="bg-[#76A963] text-[18px]"><a href='https://abdelghanidev.github.io/ecommerce-demo'>Visit Your Shop</a></Button></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard