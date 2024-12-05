const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topic : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
})

const topicModel = mongoose.model('topic' , topicSchema);

module.exports = topicModel;