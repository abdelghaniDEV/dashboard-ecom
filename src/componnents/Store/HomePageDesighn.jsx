import React, { useEffect, useState } from "react";
import HeroDesighn from "./HeroDesighn";
import ListProductsDesighn from "./ListProductsDesighn";
import BannerDesighn from "./BannerDesighn";
import SliderDesighn from "./SliderDesighn";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplate } from "../../Redux/slices/tamplate.slice";
import { ToastContainer, toast } from "react-toastify";
import spinner from "../../assets/tube-spinner (1).svg";

export default function HomePageDesighn() {
  const dataTemplate = useSelector((state) => state.template);
  const [statusSubmit, setStatusSubmit] = useState("added");
  const [data, setData] = useState({
    hero: {},
    listProducts: {},
    banner: {},
    slider: {},
    bannerShop: {},
  });

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  // toast notification
  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handelSaveChanges = async () => {
    const formData = new FormData();

    formData.append("hero[title]", data.hero.title);
    formData.append("hero[subtitle]", data.hero.subtitle);
    formData.append("hero[imgHero]", dataTemplate.hero.imgHero);
    formData.append("listProducts[title]", data.listProducts.title);
    formData.append("listProducts[subtitle]", data.listProducts.subtitle);
    formData.append("banner[title]", data.banner.title);
    formData.append("banner[description]", data.banner.description);
    formData.append("banner[imgBanner]", dataTemplate.banner.imgBanner);
    formData.append("slider[title]", data.slider.title);
    formData.append("slider[subtitle]", data.slider.subtitle);
    formData.append("bannerShop[imgShop]", dataTemplate.bannerShop.imgShop);

    if (data.hero.imgHero && data.hero.imgHero !== "") {
      formData.append("imgHero", data.hero.imgHero);
    }

    if (data.banner.imgBanner && data.banner.imgBanner !== "") {
      formData.append("imgBanner", data.banner.imgBanner);
    }

    if (data.bannerShop.imgShop && data.bannerShop.imgShop !== "") {
      formData.append("imgShop", data.bannerShop.imgShop);
    }

    // Send to server
    try {
      setStatusSubmit("loading");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/template`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("success", response.data);
      dispatch(fetchTemplate());
      notify("success", "save Setting successfully");
      setStatusSubmit("success");
    } catch (error) {
      console.error("Error uploading setting", error);
      notify("error", error.response.data.message);
      setStatusSubmit("added");
    }
  };

  const handleIconSubmit = () => {
    if (statusSubmit === "loading") {
      return <img src={spinner} className="w-5" />;
    } else if (statusSubmit === "success") {
      return <i className="bx bx-check text-[20px]"></i>;
    } else if (statusSubmit === "added") {
      return <i className="bx bx-plus text-[20px]"></i>;
    }
  };

  return (
    <div className="">
      <ToastContainer position="bottom-left" />
      <div className="flex flex-col gap-8">
        <HeroDesighn data={data} setData={setData} />
        <ListProductsDesighn data={data} setData={setData} />
        <BannerDesighn data={data} setData={setData} />
        <SliderDesighn data={data} setData={setData} />
        {/* <BannerShop data={data} setData={setData} /> */}
      </div>
      <Button
        className="py-5 px-10 text-[15px] my-5 flex gap-2 bg-[#b58df2] hover:bg-[#b58df2]"
        onClick={handelSaveChanges}
      >
        {handleIconSubmit()}
        Save Change
      </Button>
    </div>
  );
}
