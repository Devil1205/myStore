const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const env = require('dotenv');
const connectDb = require('./db/db');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

app.use(cors({
    origin: ["https://mystore-devil1205.vercel.app/"],
    credentials: true
}));

//Body parser
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true, limit: "5mb" }))

//cookie parser
app.use(cookieParser());
app.use(fileUpload());

//configure env path
env.config({ path: "./config/config.env" });

//connectDb function call
connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//routes
app.use("/api/v1/", require('./routes/product'));
app.use("/api/v1/", require('./routes/user'));
app.use("/api/v1/", require('./routes/order'));
app.use("/api/v1/", require('./routes/payment'));

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server listening on port " + port);
})