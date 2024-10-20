import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListProducts from "../componnents/products/ListProducts";
import FilterProducts from "../componnents/products/FilterProducts";
import Search from "../componnents/products/SearchProducts";
import DatePickerDemo from "../componnents/DatePickerDemo";

function Products({setOpacityBody}) {

  const products = useSelector((state) => state.products);

  const [fetchProducts , setFetchProducts] = useState(products)
  const [rangeDate , setRangeDate] = useState()
  const [category , setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [stock , setStock] = useState("All")

  useEffect(() => {
    setFetchProducts(products)
  }, [products])  
   
  // filter products by date 

  useEffect(() => {
   if(rangeDate) {
    filterProductsByDate(rangeDate.from , rangeDate.to)
   }else {
    setFetchProducts(products)
   }
  },[rangeDate])

  const filterProductsByDate = (startDate, endDate) => {
    const start = new Date(startDate); // date from start
    const end = new Date(endDate); // date from end
    const productsFilter = products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= start && productDate <= end;
    });
    setFetchProducts(productsFilter)
  };

  // filter products by category and set price range and set stock
  const filterProducts = () => {
      let filteredProducts = products;
  
      // Filter by category
      if (category !== "All") {
          filteredProducts = filteredProducts.filter(product => product.category.includes(category));
      }
  
      // Filter by stock
      if (stock !== "All") {
          if (stock === "inStock") {
              filteredProducts = filteredProducts.filter(product => product.stock > 0);
          } else {
              filteredProducts = filteredProducts.filter(product => product.stock === 0);
          }
      }

      // filter by price Range
      if (priceRange!== "All") {
          switch (priceRange) {
              case "Under$50":
                  filteredProducts = filteredProducts.filter(product => product.price < 50);
                  break;
              case "$50-$100":
                  filteredProducts = filteredProducts.filter(product => product.price >= 50 && product.price < 100);
                  break;
              case "$100-$200":
                  filteredProducts = filteredProducts.filter(product => product.price >= 100 && product.price < 200);
                  break;
              case "Over$200":
                  filteredProducts = filteredProducts.filter(product => product.price >= 200);
                  break;
              default:
                  break;
          }
      }
  
      // Update the filtered products state
      setFetchProducts(filteredProducts);
  };


  return (
    <div className="">
      <div className=" lg:flex justify-between items-center mb-4  ">
        <div className="flex gap-2 pb-4 lg:pb-0  ">
          <h1 className="text-[30px] sm:text-[35px] font-[600] leading-4 ">
            Products
          </h1>
          <span className="bg-[#f5caab5c] text-[#e4823c] p-1 rounded-[20px] text-[10px]">{products.length} Product</span>
        </div>
        <div className="flex justify-end gap-1 md:gap-3">
          {/* <DatePickerDemo setRangeDate={setRangeDate} /> */}
          <div onClick={filterProducts} className=" cursor-pointer border-2 border-[#F5CAAB] p-1 md:p-2 lg:py-[6px] rounded-[20px] flex items-center bg-[#f5caab6c] gap-2 text-[#c97d47]">
          <i className='bx bx-filter-alt md:text-[20px]'></i>
            <span className="text-[13px] font-[500]">Filter</span>
          </div>
          <div className="bg-[#F5CAAB] px-1 md:p-2 lg:py-1  rounded-[20px] flex items-center gap-1">
            <i className="bx bx-plus md:text-[20px]"></i>
            <Link to={'create-product'} className="text-[13px] font-[500]">Create Product</Link>
          </div>
        </div>
      </div>
      <div className="  bg-[#F9F9F9] rounded-[8px] p-3">
        <FilterProducts  setFetchProducts={setFetchProducts} setCategory={setCategory} setPriceRange={setPriceRange} setStock={setStock}/>
       <Search setFetchProducts={setFetchProducts}  />
      </div>
     <ListProducts setOpacityBody={setOpacityBody} products={fetchProducts} />
    </div>
  );
}

export default Products;
