const express = require('express');
const app = express();
const port = process.env.PORT||5000;
const env = require('dotenv');
const connectDb = require('./db/db');
const errorHandler = require('./middlewares/errorHandler');

//Body parser
app.use(express.json());

//configure env path
env.config({path: "./config/config.env"});

//connectDb function call
connectDb();

//routes
app.use("/api/v1/",require('./routes/product'));

app.use(errorHandler);

app.listen(port,()=>{
    console.log("Server listening on port "+port);
})