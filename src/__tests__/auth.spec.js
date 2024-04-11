import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
const MONGO_STRING = process.env.MONGO_STRING;
import { CreateApp } from "../mock.app.mjs";
import user from "../models/user.js";



describe("creation d'un utilisateur et login", () => {
let app;
let token;
let id;
  beforeAll(() => {
    mongoose
      .connect(MONGO_STRING)
      .then(() => console.log("Connecté à la database pour le test!"))
      .catch((err) => console.log(err));
    app = CreateApp();
  });

  it("Création d'un nouvel utilisateur", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "essai@gmail.com",
      password: "Te2t.1234",
      name: "test",
      phoneNumber: "123456789",
    });
    expect(response.statusCode).toBe(201);
  });

  it("connect l'utilisateur", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "essai@gmail.com",
      password: "Te2t.1234",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token
  });
  
  it("liste tous les champions", async () => {
    const response = await request(app)
      .get("/Champions")
      .set("Authorization", `Bearer ${token}`);
      
    expect(response.statusCode).toBe(201);
  });

  it("création d'un champion", async () => {
    const response = await request(app)
      .post("/Champions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Garen",
        description: "Un chevalier avec une grosse epee ",
        sort_a: "augmente la vitesse et augmente les dégats de la prochaine auto attaque ",
        sort_z: "renforce c'est defense et gagne un petit bouclier",
        sort_e: "tourne sur lui meme avec sa grosse epee",
        sort_r: "plante une epee dans le sol et la fait aparaitre du ciel une tres grosse epee sur l'ennemie"
      });
    id = response.body._id
    expect(response.statusCode).toBe(201);
    console.log(id)
  });

  it("liste un champion choisi", async () => {
    const response = await request(app)
    .get("/Champions/",id)
    .set("Authorization", `Bearer ${token}`)
    console.log("/Champions/",id)
    expect(response.statusCode).toBe(201);
  });

  it("modifie un champion choisi", async () => {
    const response = await request(app)
    .put(`/Champions/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Garen",
      description: "Un chevalier avec une grosse epee qui crie DEMACIA ",
      sort_a: "augmente la vitesse et augmente les dégats de la prochaine auto attaque ",
      sort_z: "renforce c'est defense et gagne un petit bouclier",
      sort_e: "tourne sur lui meme avec sa grosse epee",
      sort_r: "plante une epee dans le sol et la fait aparaitre du ciel une tres grosse epee sur l'ennemie"
    });
    console.log(response.body)
    expect(response.statusCode).toBe(201);
    console.log(response.body)
  })

  it("Supprime un champion choisi", async () => {
    const response = await request(app)
    .delete(`/Champions/${id}`)
    .set("Authorization", `Bearer ${token}`)
    console.log(`/Champions/${id}`)
    expect(response.statusCode).toBe(201);
  });

  afterAll(async () => {
    // delete the user created
    await user.deleteOne({ email: "essai@gmail.com" });
    await mongoose.connection.close();
  });
});