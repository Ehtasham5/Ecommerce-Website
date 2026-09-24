import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")

      console.log(response.data)
  
      if (response.data.success) {
        setList(response.data.products)
      } else {
      toast.error(response.data.message)
        
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    
  }

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove/" + productId,
        {},
        { headers: { token } },
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchList()
  },[])

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2">All Products List</p>
      <div className="hidden grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border bg-gray-100 px-3 py-2 text-sm md:grid">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {list.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-3 py-2 text-sm md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
        >
          <img
            className="h-16 w-16 object-cover"
            src={product.image[0]}
            alt={product.name}
          />
          <p>{product.name}</p>
          <p className="hidden md:block">{product.category}</p>
          <p className="hidden md:block">${product.price}</p>
          <button
            type="button"
            onClick={() => removeProduct(product._id)}
            className="text-left text-red-500 md:text-center"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
