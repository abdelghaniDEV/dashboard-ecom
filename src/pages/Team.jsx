import React from "react";
import ListTeam from "../componnents/team/ListTeam";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Team() {
    const users = useSelector((state) => state.users)
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4  ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[30px] sm:text-[35px] font-[600] leading-4 ">
            Team Management
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">
          {users.length} 
          {" "}
            user
          </span>
        </div>
        <div className="flex justify-end gap-1 md:gap-3">
          {/* <DatePickerDemo setRangeDate={setRangeDate} /> */}
          <div className="bg-[#F5CAAB] px-2 md:p-2 py-2  rounded-[20px] flex items-center gap-1">
            <i class="bx bx-plus md:text-[20px]"></i>
            <Link to={"create-user"} className="text-[13px] font-[500]">
              Create user
            </Link>
          </div>
        </div>
      </div>
      <div>
          <ListTeam />
      </div>
    </div>
  );
}

export default Team;
