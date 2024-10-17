import React from 'react'
import ListCategories from '../componnents/categories/ListCategories'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Categories({setOpacityBody}) {
    const categories = useSelector((state) => state.categories)
  return (
    <div>
        <div className=" lg:flex justify-between items-center mb-4  ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[30px] lg:text-[35px] font-[600] leading-4 ">
            Categories
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">{categories.length} category</span>
        </div>
        <div className="flex justify-end gap-3">
          <div className="bg-[#F5CAAB] p-2 lg:py-[6px]  rounded-[20px] flex items-center gap-1">
            <i class="bx bx-plus md:text-[20px]"></i>
            <Link to={'create-category'} className="text-[13px] font-[500]"> Category</Link>
          </div>
        </div>
      </div>

      <ListCategories setOpacityBody={setOpacityBody}/>
    </div>
  )
}

export default Categories