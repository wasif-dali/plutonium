const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String, 
    tags: ["Novel","poem","adventure"],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String
    },

    year :{
        type :Number,
        default : 2021
    },
   totalpages : Number,
   stockAvailable:Boolean
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover