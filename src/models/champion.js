import mongoose from "mongoose";
const { Schema, model } = mongoose;

const championSchema = new Schema({
    name: String,
    description: String,
    sort_a: String,
    sort_z: String,
    sort_e: String,
    sort_r: String,
});

export default model("Champion", championSchema);