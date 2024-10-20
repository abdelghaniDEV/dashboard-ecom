import React, { useEffect } from 'react'
import desighn from "../assets/undraw_true_love_cy8x@4x.png";
import { useDispatch, useSelector } from "react-redux";
import StaticDashbord from "../componnents/dashboard/StaticDashbord";
import {CategoryChart} from '../componnents/dashboard/CategoryChart';
import ListTopProducts from '../componnents/dashboard/ListTopProducts';
import ListOrder from '../componnents/dashboard/ListOrder';
import desShop from '../assets/undraw_Small_town_re_7mcn@4x.png'
import desapp from '../assets/65_objects@4x.png'
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';


function Dashboard() {
  const products = useSelector((state) => state.products);
  const token = localStorage.getItem('token')

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
              <Link to={'orders'} className="text-[#e97e32] bg-white px-5 py-2  font-[600] text-[13px] rounded-[10px]">
                View Orders{" "}
              </Link>
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
        {/* <ListTopProducts/> */}
        <div className='w-full  relative rounded-[20px] bg-[#F2F9F6] mt-4 p-4 flex flex-col items-center gap-5'>
           <div className='flex flex-col items-center '>
             <img src={desShop} className='w-' />
             <h2 className='text-[20px] text-center font-[500] leading-[22px]'>Take your <span className='text-[#F2B78D]'>business</span> to the next <span className='text-[#F2B78D]'>Level</span></h2>
           </div>
              <div className='text-center'><img src={desapp} className='w-[150px]' /></div>
          <div className='pb-5'> <Button className="bg-[#A98563] hover:bg-[#a98563c6] text-[18px]"><a href='https://ecommerce-beta-ivory.vercel.app/'>Visit Your Shop</a></Button></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard