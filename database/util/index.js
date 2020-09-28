const mongoose = require('mongoose');
require('dotenv').config();
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;
const db_user = process.env.DB_USER;

module.exports.connection = async () => {
   try{
       await mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.efs1q.mongodb.net/${db_name}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log("DB Connection successfully");
    }
   catch(error){
       console.error(error);
       throw error;
   }
}