import mongoose from "mongoose";

const connectDB=async()=>{
  try{
       
    await mongoose.connect("mongodb+srv://kavidu:kavi123@cluster0.ugpprvh.mongodb.net/")
    console.log("datacse is connected");
  }catch(error){
    console.error(error)
  }
}
export default connectDB