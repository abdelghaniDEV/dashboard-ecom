import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import logo from "../assets/SAFWA@4x.png";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "../Redux/slices/userSingle.slice";
import { fetchProducts } from "../Redux/slices/products.slice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchData = () => {
      
    // Fetch data if user is authenticated
    // dispatch(fetchProducts());
    // dispatch(fetchCategories());
    // dispatch(fetchOrders());
    // dispatch(fetchCustomer());
    // dispatch(fetchAnalyticByMonth());
    // dispatch(fetchAnalyticOrders());
    // dispatch(fetchSingleUser());
    console.log('ppp')
  }

  const handleLogin = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },{
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const token = response.data.data.token;
      
      // save token in local storage
       localStorage.setItem("token", token);
      // 
       
      navigate("/dashboard/");
     
    } catch (err) {
      setError("Log in failed. Verify that the data is correct.");
    }
  };

  return (
    <div className="bg-[#F6F2EB] w-[100%] h-[100vh]">
      <Card className="login-container  shadow-sm rounded-[20px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 ">
        <div className="flex flex-col items-center">
          {/* <img src={logo} className="w-[200px] text-center" /> */}
          <h1 className="text-[40px] font-[600]">
            Welcome <span className="text-[]">Back</span>
          </h1>
          <p className="text-[20px]">Hay, Entre your details to get sign in </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-[300px] mt-6 flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="email" className="text-[#aba9a9]">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:outline-[#f2b78d] focus:border-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="Password" className="text-[#aba9a9]">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:outline-[#f2b78d] focus:border-none"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#FEC887] text-black text-[15px] font-normal  hover:bg-[]"
          >Sign in</Button>
        </form>
        {error && <p className="text-[red] text-[15px] pt-2">{error}</p>}
      </Card>
    </div>
  );
};

export default Login;
