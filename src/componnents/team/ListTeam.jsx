import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../../components/ui/table";
import UserCart from "./UserCart";



export default function ListTeam() {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Table className="border">
        <TableHeader className="bg-[#F9F9F9]">
          <TableRow className="md:text-[14px] text-center text-[13px]">
            <TableHead>ID</TableHead>
            <TableHead>User name</TableHead>
            <TableHead className="hidden sm:table-cell">Access</TableHead>
            <TableHead className="hidden sm:table-cell">Date added</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[15px]">
          {/* Add your users data here */}
          {users.map((user , index) => {
            return  <UserCart user={user} index={index}/>
          })}
        </TableBody>
      </Table>
    </div>
  );
}
