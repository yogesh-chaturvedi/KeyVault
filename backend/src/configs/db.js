const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI)
    .then((res) => {
        console.log("Connected successfully")
    })
    .catch((error) => {
        console.log("Connection failed")
        console.error('Mongodb connection fail error', error)
    })