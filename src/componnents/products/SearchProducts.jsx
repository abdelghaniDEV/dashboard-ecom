import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Search({setFetchProducts}) {
  const [result, setResult] = useState([]);
  const [ShowResult , setShowResult] = useState(false);
  const [value, setvalue] = useState();

  const products = useSelector((state) => state.products);

  const handelSearch = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setvalue(value);
    setShowResult(true);
    const filterProducts = products.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category[0].toLowerCase().includes(value)
    );
    setResult(filterProducts);
    setFetchProducts(filterProducts)

    if (value == "") {
      setResult([]);
      console.log("resulte in null");
      setShowResult(false);
    }
  };
  return (
    <div>
      {/* search products */}

      <div className="pt-3 relative">
        <input
          type="text"
          onChange={handelSearch}
          className="w-full py-[6px] px-8 bg-[#EEEEEE] rounded-[8px] focus:outline-none text-[14px] focus:outline-2 focus:outline-[#F5CAAB]"
          placeholder="Search Products"
        />
        <i class="bx bx-search text-[20px] absolute left-0 top-[18px] pl-2 "></i>
      </div>
    </div>
  );
}

export default Search;
