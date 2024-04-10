import "dotenv/config"
import mongoose from 'mongoose';
import { CreateApp } from "./app.js";

const PORT = process.env.PORT || 3001;
const MONGO_STRING = process.env.MONGO_STRING

const app = CreateApp();

mongoose.connect(MONGO_STRING).then(() => {
    console.log('Connected to the database!');
  
    app.listen(PORT, () =>{
        console.log(`Serveur is running on port ${PORT}`);
    })
});
