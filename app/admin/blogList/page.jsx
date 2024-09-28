"use client";

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlog = async () => {
    const reponse = await axios.get("/api/blog");
    setBlogs(reponse.data.blogs);
    console.log(reponse.data.blogs);
  };

  const deleteBlogs = async (mongoid) => {
    const reponse = await axios.delete("/api/blog", {
      params: {
        id: mongoid,
      },
    });
    toast.success(reponse.data.msg);
    fetchBlog();
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className=" flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className=" relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className=" w-full text-sm text-gray-500">
          <thead className=" text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className=" hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="  px-6 py-3">
                Blog Title{" "}
              </th>
              <th scope="col" className="  px-6 py-3">
                Date
              </th>
              <th scope="col" className="  px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <BlogTableItem
                  key={index}
                  author={item.author}
                  authorImage={item.authorImage}
                  title={item.title}
                  mongoid={item._id}
                  date={item.date}
                  deleteBlogs={deleteBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
