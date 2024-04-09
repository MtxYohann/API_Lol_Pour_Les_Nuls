import "dotenv/config"
import express, { response } from "express";
import ChampionsRoutes from "./routes/champions.js";
import mongoose from 'mongoose';

const app = express();

console.log("env: ", process.env.MONGO_STRING);

const PORT = process.env.PORT || 3001;
const MONGO_STRING = process.env.MONGO_STRING

/* Middlewares
 Middlewares qui se charge de regiriger les req
 qui concernents les voitures vers les router des voitures
 GET http://localhost:3001/Champions => retourne la liste des voitures
 GET http://localhost:3001/Champions/:id => retourne la voiture avec l'id :id
  */
app.use(express.json());

app.use("/Champions", ChampionsRoutes);

// Routes
app.get("/", (request, response) => {
    response.json({ message: "Hello World"})
})

mongoose.connect(MONGO_STRING).then(() => {
    console.log('Connected to the database!');
  
    app.listen(PORT, () =>{
        console.log(`Serveur is running on port ${PORT}`);
    })
});
