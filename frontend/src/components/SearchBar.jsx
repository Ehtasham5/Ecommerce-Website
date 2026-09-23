import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false)

  const location = useLocation()

  useEffect(()=> {
    if (location.pathname.includes("collection")) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  },[location])

  return showSearch && visible ? (
    <div className="border-t border-b text-center bg-gray-50">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 mx-2 rounded-full w-3/5 sm:w-1/2">
        <input
          className="outline-none flex-1 bg-inherit text-sm"
          type="text"
          placeholder="Search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className="w-3 inline cursor-pointer" src={assets.cross_icon} alt="" />
    </div>
  ) : null;
};

export default SearchBar;
