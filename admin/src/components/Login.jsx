import React, { useState } from "react";
import axios from "axios"
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {email, password})
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white shadow-md max-w-md rounded-lg px-8 py-6">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm mb-2 font-medium text-gray-700">Email</p>
            <input
              className="rounded-md w-full border outline-none px-3 py-2 border-gray-300"
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm mb-2 font-medium text-gray-700">Password</p>
            <input
              className="rounded-md w-full border outline-none px-3 py-2 border-gray-300"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            className="w-full rounded-md px-4 py-2 bg-black text-white mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
