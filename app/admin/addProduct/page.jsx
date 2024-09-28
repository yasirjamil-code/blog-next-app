"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Josh Kofman",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Josh Kofman",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 mb-14"
      >
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image" className="">
          <Image
            className="mt-4"
            width={140}
            height={70}
            alt=""
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          className="hidden"
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type Here"
          required
          name="title"
          onChange={onChangeHandler}
          value={data.title}
        />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Write Content Here"
          rows={6}
          required
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default AddProduct;
