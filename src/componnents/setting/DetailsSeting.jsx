import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import StoreSetting from "./StoreSetting";
import LogoSetting from "./LogoSetting";
import MediaSetting from "./MediaSetting";
import { formatDate } from "date-fns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetingAll } from "../../Redux/slices/settingAll.slice";
import spinner from "../../assets/tube-spinner (1).svg"
import { ToastContainer, toast } from "react-toastify";

function DetailsSeting() {
  const settingAll = useSelector((state) => state.settingAll)
  const dispatch = useDispatch()
  useEffect(() => {
    if(settingAll){
      setStoreName(settingAll.storeName)
      setStoreEmail(settingAll.storeEmail)
      setStorePhone(settingAll.storePhone)
      setStoreDescription(settingAll.storeDescription)
      setPrevLogo(settingAll.storeLogo)
      setPrevIcon(settingAll.storeIcon)
      setFacebookLink(settingAll.facebookLink)
      setTwitterLink(settingAll.twitterLink)
      setInstagramLink(settingAll.instagramLink)
      setTiktokLink(settingAll.tiktokLink)

    }
  },[settingAll])
  
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState();
  const [storeDescription, setStoreDescription] = useState("");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeIcon, setStoreIcon] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [prevLogo, setPrevLogo] = useState("");
  const [prevIcon, setPrevIcon] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [statusSubmit, setStatusSubmit] = useState("added");
  const [errorMessages, setErrorMessages] = useState({
    storeName: "",
    storeEmail: "",
    storeLogo: "",
    storeIcon: "",
    storePhone : "",
  });
  
  const token = localStorage.getItem("token");

  
    // toast notification
    const notify = (type, message) => {
      if (type === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };


  // validate logo and icon attributes
  const validateImage = (
    file,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    errorKey
  ) => {
    return new Promise((resolve) => {
      if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (
            img.width < minWidth ||
            img.height < minHeight ||
            img.width > maxWidth ||
            img.height > maxHeight
          ) {
            setErrorMessages((prev) => ({
              ...prev,
              [errorKey]: `Image size should be between ${minWidth}x${minHeight}px and ${maxWidth}x${maxHeight}px`,
            }));
            resolve(false);
          } else {
            setErrorMessages((prev) => ({
              ...prev,
              [errorKey]: "",
            }));
            resolve(true);
          }
        };
      } else {
        // No file provided, resolve as invalid
        resolve(false);
      }
    });
  };
  
  // validate email address
  const validateEmail = (email, errorKey) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
      if (!emailRegex.test(email)) {
        setErrorMessages((prev) => ({
          ...prev,
          [errorKey]: "Please enter a valid email address",
        }));
        return false;
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          [errorKey]: "",
        }));
        return true;
      }
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [errorKey]: "Email is required",
      }));
      return false;
    }
  };

  //validate name 
  const validateName = (name, errorKey) => {
    if (name) {
      if (name.length < 3) {
        setErrorMessages((prev) => ({
         ...prev,
          [errorKey]: "Name should be at least 3 characters long",
        }));
        return false;
      } else {
        setErrorMessages((prev) => ({
         ...prev,
          [errorKey]: "",
        }));
        return true;
      }
    } else {
      setErrorMessages((prev) => ({
       ...prev,
        [errorKey]: "Name is required",
      }));
      return false;
    }
  };
  // validate Phone number
  const validatePhone = (phone, errorKey) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phone) {
      if (!phoneRegex.test(phone)) {
        setErrorMessages((prev) => ({
         ...prev,
          [errorKey]: "Please enter a valid phone number",
        }));
        return false;
      } else {
        setErrorMessages((prev) => ({
         ...prev,
          [errorKey]: "",
        }));
        return true;
      }
    }else {
      return true
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check logo and icon
    const isLogoValid = await validateImage(storeLogo,100,100,1550,550, "storeLogo");
    const isIconValid = await validateImage(storeIcon,16,16,48,48, "storeIcon");
    // check email
    const isEmailValid = validateEmail(storeEmail, "storeEmail");
    // check name
    const isNameValid = validateName(storeName, "storeName");
    // check phone number
    const isPhoneValid = validatePhone(storePhone, "storePhone");

    if (isLogoValid && isIconValid && isEmailValid , isNameValid , isPhoneValid) {
      const formData = new FormData(); 
      formData.append("storeName", storeName)
      formData.append("storePhone", storePhone)
      formData.append("storeEmail", storeEmail)
      formData.append("storeDescription" , storeDescription)
      formData.append("storeLogo" , storeLogo)
      formData.append("storeIcon", storeIcon)
      formData.append("facebookLink", facebookLink)
      formData.append("twitterLink", twitterLink)
      formData.append("instagramLink", instagramLink)
      formData.append("tiktokLink", tiktokLink)
      console.log(formData)
      console.log(storeLogo)
      // call server
      try {
        setStatusSubmit("loading");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/settings`, formData , {
          headers : {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log("success", response.data)
        dispatch(fetchSetingAll())
        setStatusSubmit("success");
        notify("success", "Save Settings Successfully");
      }catch (error) {
        console.error("Error uploading setting", error);
        notify("error", error.response.data.message);
        setStatusSubmit("added");
      }
    }
   
  };

  const handleIconSubmit = () => {
    if (statusSubmit === "loading") {
      return <img src={spinner} className="w-5" />;
    } else if (statusSubmit === "success") {
      return <i className="bx bx-check text-[24px]"></i>;
    } else if (statusSubmit === "added") {
      return <i className="bx bx-plus text-[24px]"></i>;
    }
  };
  return (
    <>
      <ToastContainer position="bottom-left" />
      <div className="bg-[#F9F9F9] p-2 md:p-5 flex flex-col gap-3  rounded-[10px] ">
        <StoreSetting
          storeName={storeName}
          setStoreName={setStoreName}
          storeEmail={storeEmail}
          setStoreEmail={setStoreEmail}
          storePhone={storePhone}
          setStorePhone={setStorePhone}
          storeDescription={storeDescription}
          setStoreDescription={setStoreDescription}
          errorMessages={errorMessages}
        />
        <LogoSetting
          storeLogo={storeLogo}
          setStoreLogo={setStoreLogo}
          storeIcon={storeIcon}
          setStoreIcon={setStoreIcon}
          errorMessage={errorMessages}
          prevLogo={prevLogo}
          prevIcon={prevIcon}
        />
        <MediaSetting
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
          twitterLink={twitterLink}
          setTwitterLink={setTwitterLink}
          instagramLink={instagramLink}
          setInstagramLink={setInstagramLink}
          tiktokLink={tiktokLink}
          setTiktokLink={setTiktokLink}
        />
      </div>
      <Button
        className="py-5 px-10 text-[15px] my-5 flex gap-2 bg-[#b58df2] hover:bg-[#b58df2]"
        onClick={(e) => handleSubmit(e)}
      >
        {handleIconSubmit()}
        Save Change
      </Button>
    </>
  );
}

export default DetailsSeting;
