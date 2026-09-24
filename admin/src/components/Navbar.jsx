import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between py-2 px-[4%] items-center">
      <img className="w-[max(10%,100px)]" src={assets.logo} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 rounded-full text-white px-5 py-2 sm:px-7 sm:py-2"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
