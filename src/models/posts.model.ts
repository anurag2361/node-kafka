import { Document, Model, model, Schema, Types } from "mongoose";

export interface IPosts extends Document {
    title: string;
    description: string;
    userId: Types.ObjectId;
    createdAt: Date,
    updatedAt: Date,
}

const postschema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: Types.ObjectId, required: true },
}, {
    timestamps: true,
});

export const Posts: Model<IPosts> = model<IPosts>("Posts", postschema);
