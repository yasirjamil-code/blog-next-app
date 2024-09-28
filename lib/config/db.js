import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://yasirjamil:12qwaszx@cluster0.sa7js.mongodb.net/blog-own"
  );

  console.log("DB Connected");
};

