const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog',
        required : true
    },
    user : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
})

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;