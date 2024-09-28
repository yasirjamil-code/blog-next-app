import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");


const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// Api endpoint for getting blogs

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// Api endpoint for uploading Blog

export async function POST(request) {
  const formData = await request.formData();
  const timeStamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);

  const imgUrl = `/${timeStamp}_${image.name}`;

  console.log(imgUrl);

  const blogData = {
    title: formData.get("title") || "",
    description: formData.get("description") || "",
    category: formData.get("category") || "",
    author: formData.get("author") || "",
    image: `${imgUrl}`, // Updated this line
    authorImg: formData.get("authorImg") || "",
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

// creating API end point for Delte  Point

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}
