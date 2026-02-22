import express from 'express'
import cors from 'cors';
import connectDB from './db/index.js';



const app = express()
const port = 8000

app.use(cors())
app.use(express.json())



 import healthRoute from "./routes/healthRoute.js"

 app.use("/api/v1/healthCheck",healthRoute)



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
