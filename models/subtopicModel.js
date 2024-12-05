const mongoose = require('mongoose');

const subtopicSchema = mongoose.Schema({

    subTopic : {
        type : String,
        required : true
    },
    topic : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'topic' , 
        required :  true
    }
})

const subTopicModel = mongoose.model('subTopic' , subtopicSchema);

module.exports = subTopicModel;