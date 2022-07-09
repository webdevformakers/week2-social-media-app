import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    body: {type: String, required: true},
}, {
    timestamps: true,
});

export const PostModel = mongoose.models.post || mongoose.model("post", PostSchema);