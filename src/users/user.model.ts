import * as mongoose from "mongoose";
import User from "./user.interface";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // tslint:disable-next-line: object-literal-sort-keys
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
