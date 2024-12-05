const mongoose = require('mongoose');

const db =  mongoose.connect('mongodb://127.0.0.1:27017/myblog')
.then(() => { console.log('Database Connected')})
.catch((err) => {
    console.log('DB Err', err);
})

module.exports = db;