const express = require('express');
const app = express();
const port = process.env.PORT||5000;
const env = require('dotenv');
const connectDb = require('./db/db');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

//Body parser
app.use(express.json());
//cookie parser
app.use(cookieParser());

//configure env path
env.config({path: "./config/config.env"});

//connectDb function call
connectDb();

//routes
app.use("/api/v1/",require('./routes/product'));
app.use("/api/v1/",require('./routes/user'));

app.use(errorHandler);

app.listen(port,()=>{
    console.log("Server listening on port "+port);
})