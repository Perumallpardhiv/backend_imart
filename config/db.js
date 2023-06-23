const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://imart:y8ChACjDpndJF5JB@cluster0.7o4islm.mongodb.net/?retryWrites=true&w=majority').on('open',()=>{
    console.log("MongoDb Connected");
}).on('error',()=>{
    console.log("MongoDb Connection error");
});

// const connection = mongoose.connect("mongodb+srv://imart:y8ChACjDpndJF5JB@cluster0.7o4islm.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser : true,
//     useUnifiedTopology : true
//   })
//   .then(console.log("Connected to MongoDB"))
//   .catch(err => console.log(err))

module.exports = connection;
