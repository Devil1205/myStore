const mongoose = require('mongoose');
const Product = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter product name"],
        trim: true
    },
    desciption:{
        type: String,
        required: [true,"Please enter product description"]    
    },
    price:{
        type: Number,
        required: [true,"Please enter product price"]    
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],
    category:{
        type: String,
        required: [true,"Please enter product category"]
    },
    stock:{
        type: Number,
        required: [true,"Please enter product stock"],
        default: 1
    },
    numberOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[{
        name:{
            type: String,
            required: true
        },
        rating:{
            type: Number,
            required: true
        },
        comment:{
            type: String,
            required: true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product",Product);