const mongoose=require("mongoose")

const connectMongo=(url)=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("MongoDb connected Successfully") 
    })
    .catch((error)=>{
        console.log("Error while connecting to mongodb")
    })
}

module.exports=connectMongo