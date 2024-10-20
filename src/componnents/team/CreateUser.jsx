import React, { useState } from "react";
import userAvatar from "../../assets/FB_IMG_1705437194399.jpg";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../../assets/tube-spinner (1).svg";
import { useDispatch } from "react-redux";

import { fetchUsers } from "../../Redux/slices/users.slice";

function CreateUser() {
  const [image, setimage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [statusSubmit, setStatusSubmit] = useState("added");
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    role: "",
  });

  const token = localStorage.getItem("token");

  const dispatch = useDispatch()

      // toast notification
      const notify = (type, message) => {
        if (type === "success") {
          toast.success(message);
        } else {
          toast.error(message);
        }
      };

  const validateInputs = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      products: "",
      address: "",
      zipCode: "",
    };

    // validate Firs name
    if (!firstName.trim()) {
      newErrors.name = "Firstname is Required";
      valid = false;
    }

    // validate Last name
    if (!lastName.trim()) {
      newErrors.name = "LastName is Required";
      valid = false;
    }

    //validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is Required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not a valid";
      valid = false;
    }

    //validate password
    const minLength = 8;
    if (!password.trim()) {
      newErrors.password = "Password is Required";
      valid = false;
    } else if (password.length < minLength) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    // validate role
    if (!role) {
      newErrors.role = "Role is Required";
      valid = false;
    }
    // update errors state
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create new user
    if (validateInputs()) {
        const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("image" , image)

      try {
        setStatusSubmit("loading");
        // Make the POST request to upload the data using axios
        const response = await axios.post(
         `http://localhost:4000/api/users/register`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User created successfully:", response.data);
        notify("success", "user added successfully");
        dispatch(fetchUsers())
        setStatusSubmit("success");
      } catch (error) {
        console.error("Error creating user:", error);
        notify("error", error.response.data.message);
        setStatusSubmit("added");
        // Handle the error, such as displaying an error message to the user
      }
    }
  };
  const handleIconSubmit = () => {
    if (statusSubmit === "loading") {
      return <img src={spinner} className="w-6" />;
    } else if (statusSubmit === "success") {
      return <i class="bx bx-check text-[25px]"></i>;
    } else if (statusSubmit === "added") {
      return <i class="bx bx-plus text-[25px]"></i>;
    }
  };
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link to={"/dashboard/team"} className="border p-2 md:p-3  ">
            <i class="bx bx-arrow-back"></i>
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            {/* <i class="bx bx-edit text-[30px] lg:hidden text-[#bc6c33]"></i> */}
            <span className="text-[12px] ">Back To team list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Create user
            </h1>
          </div>
        </div>
     
      </div>
      {/* image */}
      <div className="flex  items-center gap-5 bg-[#F9F9F9] rounded-[8px] p-3">
        <div>
          <img
            src={image ? URL.createObjectURL(image) : userAvatar}
            className="w-[60px] h-[60px] rounded-full"
          />
        </div>
        <div>
          {/* <button className="bg-[#76a963] px-5 py-[5px] rounded-[8px]  flex items-center gap-2 text-[15px] text-white">
          <i class="bx bx-upload"></i>
          <span>upload</span>
        </button> */}
          <div class="flex items-center justify-center">
            <label>
              <input
                type="file"
                hidden
                onChange={(e) => setimage(e.target.files[0])}
              />
              <div class="flex w-28 h-9 px-2 flex-col bg-[#76a963] rounded-[8px] shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                Choose File
              </div>
            </label>
          </div>
        </div>
        <div>
          <button className="text-[#76a963] border-[2px] border-[#76a963] px-5 py-1 rounded-[8px] hover flex items-center gap-2 text-[15px] bg-white">
            <i class="bx bx-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/* form */}
      <div className="my-5 p-7 bg-[#F9F9F9] rounded-[8px]">
        <div className="grid md:grid-cols-2 items-start gap-5 ">
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                First Name
              </Label>
              <Input
                type="text"
                placeholder="First Name"
                readonly
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className="text-red-500 text-[13px] mt-[-4px]">
                {errors.firstName}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Last Name
              </Label>
              <Input
                type="text"
                placeholder="Last Name"
                readonly
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="text-red-500 text-[13px] mt-[-4px]">
                {errors.lastName}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Email Address
              </Label>
              <Input
                type="text"
                placeholder="Email Address"
                readonly
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-red-500 text-[13px] mt-[-4px]">
                {errors.email}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Password
              </Label>
              <Input
                type="Password"
                placeholder="Password"
                className="h-[40px] bg-[#EEEEEE] text-[15px]"
                readonly
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-red-500 text-[13px] mt-[-4px]">
                {errors.password}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[15px] font-[500] text-[#474B4F]">
                Access
              </Label>
              <Select onValueChange={(e) => setRole(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-red-500 text-[13px] mt-[-4px]">
                {errors.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 pt-5">
          <Button
            onClick={(e) => handleSubmit(e)}
            className=" text-[15px] py-5 hover:bg-[#76a963] font-[400] bg-[#76a963] text-white"
          >
            {handleIconSubmit()}
            Create User
          </Button>
          <Button className=" text-[15px] py-5 font-[400] hover:bg-white bg-[white] text-black">
            Cencel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
