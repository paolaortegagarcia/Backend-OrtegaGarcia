import { Schema, model } from "mongoose";

export const userCollection = "users";

export const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    isGithub: {
        type: Boolean,
        default: false,
    },
});

export const UserModel = model(userCollection, userSchema);
