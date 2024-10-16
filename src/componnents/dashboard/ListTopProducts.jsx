import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useSelector } from "react-redux";

function ListTopProducts() {
  const products  = useSelector((statu) => statu.products)
  return (
    <div className="mt-6">
     <h1 className="font-[600] text-[20px]">Toop Selling Products</h1>
      <Table>
       
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className=" text-[#a98563]">Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            if(product.price > 80 && product.price < 100) {
              return (
              <TableRow key={product.id}>
                <TableCell className="flex gap-2 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                  <span className="text-[12px] font-[500] leading-3">{product.name}</span>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell className="   text-[#a98563]">${product.price * 30}</TableCell>
              </TableRow>
            );
            }
           
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ListTopProducts;
