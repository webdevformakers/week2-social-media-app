import {NextApiRequest, NextApiResponse} from "next";
import mongoose from "mongoose";
import { PostModel } from "../../models/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            if (!req.body.body) return res.status(400).send("Missing post body");

            await mongoose.connect(process.env.MONGODB_URL as string);
            await PostModel.create({body: req.body.body});

            return res.status(200).send("Success");
        } else if (req.method === "GET") {
            await mongoose.connect(process.env.MONGODB_URL as string);
            const posts = await PostModel.find();

            return res.status(200).json({posts: posts});
        } else if (req.method === "DELETE") {
            if (!req.body.id) return res.status(400).send("Missing post ID");

            await mongoose.connect(process.env.MONGODB_URL as string);
            await PostModel.deleteOne({_id: req.body.id});

            return res.status(200).send("Success");
        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e});
    }
}