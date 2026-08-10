const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']) // Forces fallback to Google's public DNS
dns.setDefaultResultOrder('ipv4first');
const express = require("express");
const dotenv = require('dotenv');
const dbConnect = require("./app/config/db");

dotenv.config();
dbConnect();
const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
   res.send("Hospital-Managment-system");
})


const PORT = 5000

app.listen(PORT , ()=>{
    console.log(`Localhost running on PORT ${PORT}`)
})