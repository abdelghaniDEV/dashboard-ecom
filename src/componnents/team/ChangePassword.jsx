import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import spinner from "../../assets/tube-spinner (1).svg";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ChangePassword({ userID, openChangePassword, setOpenChangePassword }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const[errorChangePassword, setErrorChangePassword] = useState("");
  const [valid, setValid] = useState(true);
  const [statusSubmit, setStatusSubmit] = useState("added");

  const token = localStorage.getItem("token");


  const handleChangePassword = async (e) => {
   
    e.preventDefault();
    const minLength = 8;

    // Reset validation state
    setErrorMessage("");
    setErrorConfirm("");
    setValid(true);

    // Validate password
    if (!password.trim()) {
      setErrorMessage("Password is required");
      setValid(false);
      return; // Exit the function if there's an error
    } else if (password.length < minLength) {
      setErrorMessage(
        `Password should be at least ${minLength} characters long`
      );
      setValid(false);
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setErrorConfirm("Passwords do not match");
      setValid(false);
      return;
    }

    console.log("Password changed:", password);

    // If validation passes, proceed with the API call
    if (valid) {
      try {
        setStatusSubmit("loading");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${userID}`,
          { password }, // Send password as an object
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Password updated successfully:", response.data);
        setOpenChangePassword(false);
        setStatusSubmit("success");
      } catch (err) {
        console.error("Error updating password:", err);
        setStatusSubmit("error");
        setErrorChangePassword(err.response.data.message);
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
      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Your Password</DialogTitle>
            <div className="py-3 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label>New Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-[13px] text-red-500">{errorMessage}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="text-[13px] text-red-500">{errorConfirm}</p>
              </div>
            </div>
            <Button onClick={(e) => handleChangePassword(e)} className="flex gap-2">
              {handleIconSubmit()}
              Save Change
            </Button>
            <p className="text-[13px] text-red-500">{errorChangePassword}</p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePassword;
