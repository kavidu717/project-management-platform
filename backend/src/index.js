import express from 'express'
import cors from 'cors';
import connectDB from './db/index.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

console.log(process.env.USERNAME);



const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(cookieParser())



 import healthRoute from "./routes/healthRoute.js"
import authRoute from "./routes/authRoute.js"

 app.use("/api/v1/healthCheck",healthRoute)
 app.use("/api/v1/auth",authRoute)



app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

 // this is a old method
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })

// now shift to the new method 
  connectDB()
  .then(
    ()=>{
       app.listen(port, () => {
   console.log(`Example app listening on port http://localhost:${port}`)
  })
    }
  )
  .catch(
    (err)=>{
     consile.error("mongodb connection is not")
    }
  )
