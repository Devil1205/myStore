const mongoose = require('mongoose');

const connectDb = ()=>{
    const URI = process.env.URI;
    mongoose.connect(URI).then(()=>{console.log("mongo connected successfully")}).catch(err=>{console.log(err)});
}

module.exports = connectDb;