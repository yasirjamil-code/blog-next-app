"use client";

import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data.blog); // Access the 'blog' field directly
    console.log(response.data.blog); // Log the correct object for verification
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className=" bg-gray-200 px-5 py-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="" />
          </button>
        </div>
        <div className=" text-center my-24">
          <h1 className=" text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg.replace("authot", "author")}
            alt="12"
            width={60}
            height={60}
            className=" mx-auto mt-6 border border-white rounded-full"
          />
          <p className=" mt-10 pb-2 text-lg max-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className=" mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className=" border-4 border-white"
          src={data.image}
          alt="we"
          width={1280}
          height={720}
        />
        <div
          className=" blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <div className=" my-24">
          <p className=" text-black font-semibold">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <h1 className="text-9xl font-bold text-center mt-32">Loading...</h1>
  );
};

export default page;
