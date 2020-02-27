import { Document, Model, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    createdAt: Date,
    updatedAt: Date,
}

const userschema = new Schema({
    name: { type: String, required: true },
}, {
    timestamps: true,
});

export const User: Model<IUser> = model<IUser>("User", userschema);
