import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/slices/products.slice";

function DeletProduct({productId , setShowDeletProduct}) {

  const token = localStorage.getItem('token')
  console.log("token",token)

  const dispatch = useDispatch()

  // function to handle deletion of product
    const handleDelete = async() => {

        // make API call to delete product
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`, 
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            //refresh the product list
            dispatch((fetchProducts()))
            setShowDeletProduct(false)  
        }catch (err) {
            console.error("Error deleting product:", err)
        }
    }
  return (
    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] z-[20000] p-5 rounded-[8px] bg-white">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl text-center">
          Are you sure you want to delete this product?
        </h1>
        
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={() => setShowDeletProduct(false)} className="px-4 py-2 text">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeletProduct;
