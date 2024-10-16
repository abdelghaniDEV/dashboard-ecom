import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function FilterProducts({setCategory , setPriceRange ,setStock}) {


  return (
    <div>
         {/* filters */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* category */}
          <div>
            <h6 className=" text-[15px] mb-2">category</h6>
            <select
              className="w-full border h-8 text-[13px] bg-[#EEEEEE] rounded-[20px] outline-none px-[16px] focus:outline-2 focus:outline-[#F5CAAB]"
              id="input-category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Collection</option>
              <option value="Men" className="">
                Men
              </option>
              <option value="Women">Women</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          {/* price */}
          <div>
            <h6 className=" text-[15px] mb-2">Price</h6>
            <select
              className="w-full border h-8 text-[13px] bg-[#EEEEEE] rounded-[20px] outline-none px-[16px] focus:outline-2 focus:outline-[#F5CAAB]"
              id="input-category"
              onChange={(e) => setPriceRange(e.target.value)}
            >
             <option value="All">All Collection</option>
              <option value="Under$50" className="">
              Under $50
              </option>
              <option value="$50-$100">$50 - $100</option>
              <option value="$100-$200">$100 - $200</option>
              <option value="Over$200">Over $200</option>
            </select>
          </div>
          {/* Stock */}
          <div>
            <h6 className=" text-[15px] mb-2">Stock</h6>
            <select
              className="w-full border h-8 text-[13px] bg-[#EEEEEE] rounded-[20px] outline-none px-[16px] focus:outline-2 focus:outline-[#F5CAAB]"
              id="input-category"
              onChange={(e) => setStock(e.target.value)}
            >
              <option value="All">All Collection</option>
              <option value="inStock" className="">
                In Stock
              </option>
              <option value="OutStock">Out Stock</option>
            </select>
          </div>
          {/* status */}
          <div>
            <h6 className=" text-[15px] mb-2">More Filter</h6>
            <select
              className="w-full border h-8 text-[13px] bg-[#EEEEEE] rounded-[20px] outline-none px-[16px]  focus:outline-2 focus:outline-[#F5CAAB]"
              id="input-category"
            >
              <option value="All" className="">
                All Collection
              </option>
              <option value="Fashion">Fashion</option>
              <option value="BestSales">Best Sales</option>
            </select>
          </div>
        </div>
    </div>
  )
}

export default FilterProducts