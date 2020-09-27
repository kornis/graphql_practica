const mongoose = require('mongoose');

module.exports.connection = async () => {
   try{
       await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log("DB Connection successfully");
    }
   catch(error){
       console.error(error);
       throw error;
   }
}