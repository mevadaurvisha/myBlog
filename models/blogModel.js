const mongoose = require('mongoose');

const blogSchema  = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    crestedAt : {
        type : Date,
        default : Date.now
    }
})

const blogModel = mongoose.model('blog' , blogSchema);

module.exports = blogModel;