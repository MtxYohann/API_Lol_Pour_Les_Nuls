import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
const MONGO_STRING = process.env.MONGO_STRING;
import { CreateApp } from "../mock.app.mjs";
import user from "../models/user.js";

describe("creation d'un utilisateur et login", () => {
  let app;
  let token = reponse.body;

  beforeAll(() => {
    mongoose
      .connect(MONGO_STRING)
      .then(() => console.log("Connected to the database for Testing!"))
      .catch((err) => console.log(err));
    app = CreateApp();
  });

  it("Should create a new user", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "essai@gmail.com",
      password: "Te2t.1234",
      name: "test",
      phoneNumber: "123456789",
    });
    expect(response.statusCode).toBe(201);
  });

  it("Should login a user", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "essai@gmail.com",
      password: "Te2t.1234",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    console.log(response.body)
  });


  it("Get champion", async () => {
    const response = (await request(app).get("/Champions")).send({
      token
    });
    expect(response.statusCode).toBe(201);
  });


  afterAll(async () => {
    // delete the user created
    await user.deleteOne({ email: "essai@gmail.com" });
    await mongoose.connection.close();
  });
});