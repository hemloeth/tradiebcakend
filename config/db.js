const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb =async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDb;

