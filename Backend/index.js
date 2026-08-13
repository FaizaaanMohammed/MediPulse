const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']) // Forces fallback to Google's public DNS
dns.setDefaultResultOrder('ipv4first');
const express = require("express");
const dotenv = require('dotenv').config();
const mainRoute = require('./app/routers/indexRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const dbConnect = require("./app/config/db");
const cors = require("cors")


dbConnect();
const app = express();

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// List of allowed URLs
const allowedOrigins = [
  "https://e-commerce-lemon-nine-65.vercel.app", 
  "https://e-commerce-djzo.vercel.app",    
  "http://localhost:5173",                       
  "http://localhost:3000"  ,
  "https://medi-pulse-eta.vercel.app/"                     
];



app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, mobile apps, or server-to-server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// route

app.use('/api/v1',mainRoute)


app.get('/',(req,res)=>{
   res.send("Hospital-Managment-system");
})


const PORT = 5000

app.listen(PORT , ()=>{
    console.log(`Localhost running on PORT ${PORT}`)
})