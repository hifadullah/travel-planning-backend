import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.js";
import tourRoute from "./router/tours.js";
import userRoute from "./router/users.js";
import reviewRoute from "./router/review.js";
import bookingRoute from "./router/bookings.js";
import searchRoute from "./router/Search.js";
import contactRoute from "./router/contact.js";
import blogRoute from "./router/blog.js";
import commentRoute from "./router/comment.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
const connect = async () => {
   try {
       await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser:true,
         useUnifiedTopology:true
       });

       console.log("MongoDB database connected");
     } catch (err) {
       console.log("MongoDB database connection failed");
       
     }
  };
  


const corsOptions = {
  origin: 'http://localhost:4000', // Your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/tours', tourRoute);


app.listen(port, () => {
  connect();
  console.log("Server is listening on port", port);
});
