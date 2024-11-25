import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import logo from "../assets/SAFWA@4x.png";
import { useDispatch } from "react-redux";
import spinner from "../assets/tube-spinner (1).svg";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [statusSubmit, setStatusSubmit] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setStatusSubmit("loading");
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
      setStatusSubmit("success");
    } catch (err) {
      setError("Log in failed. Verify that the data is correct.");
      setStatusSubmit("error");
    }
  };

  const handleIconSubmit = () => {
    if (statusSubmit === "loading") {
      return <img src={spinner} className="w-7" />;
    } else if (statusSubmit === "success") {
      return <i class="bx bx-check text-[30px]"></i>;
    }else if(statusSubmit === 'error') {
      return <i class="bx bx-x text-[30px]"></i>;
    }
  };

  return (
    <div className="bg-[#F6F2EB] w-[100%] h-[100vh]">
      <Card className="login-container  shadow-sm rounded-[20px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 ">
        <div className="flex flex-col items-center">
          
          <h1 className="text-[40px] font-[600]">
            Welcome <span className="text-[]">Back</span>
          </h1>
          <p className="md:text-[20px]">Hay, Entre your details to get sign in </p>
          <div className="flex flex-col text-[15px] font-[600]">
             <span>Email : public@gmail.com</span>
             <span>Password : 12345678</span>
          </div>
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
              className="focus:outline-[#f2b78d] "
            />
          </div>
          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="Password" className="text-[#aba9a9]">
              Password
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:outline-[#f2b78d] "
            />
            <i class='bx bx-show absolute right-2 text-[20px] top-[35px] cursor-pointer' onClick={() => setShowPassword(!showPassword)}></i>
          </div>

          <Button
            type="submit"
            className="bg-[#FEC887] text-black text-[15px] font-semibold  hover:bg-[] flex items-center gap-1 "
          >Sign in {handleIconSubmit()}</Button>
        </form>
        {error && <p className="text-[red] text-[15px] pt-2">{error}</p>}
      </Card>
    </div>
  );
};

export default Login;
