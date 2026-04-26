const mongoose = require('mongoose')
const ConnectDB = async ()=>{
   try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log("MongoDB Atlas Connected 🌍✅");
   }catch(error){
    console.log(error)
    process.exit(1)
   }
}

module.exports = ConnectDB;