import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
const BlogList = ({ title, description }) => {
  const [blogs, setBlogs] = useState([]);
  const [menu, setMenu] = useState("All");
  const options = ["All", "Technology", "Startup", "Lifestyle"];

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      console.log(response); // Inspect the entire response
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className=" flex justify-center gap-6 my-10">
        {options.map((button, index) => {
          return (
            <button
              onClick={() => setMenu(button)}
              key={index}
              className={
                menu === button
                  ? "bg-black text-white py-1 px-4 rounded-sm"
                  : ""
              }
            >
              {button}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={item.index}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
                id={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
