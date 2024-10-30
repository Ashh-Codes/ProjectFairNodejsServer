const mongoose = require('mongoose')

const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("Mongo db atlas server connected with pf server");

}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})