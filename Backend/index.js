const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']) // Forces fallback to Google's public DNS
dns.setDefaultResultOrder('ipv4first');
const express = require("express");
const dotenv = require('dotenv').config();
const mainRoute = require('./app/routers/indexRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const dbConnect = require("./app/config/db");


dbConnect();
const app = express();

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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