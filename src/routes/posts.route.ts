import { Request, Response, Router } from "express";
import { Posts } from "../models/posts.model";
import { Producer } from "kafka-node";
import { client } from "./../index";
const router = Router();

// create post
router.post("/:userid/create", async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.params.userid;
        const post = new Posts({
            title,
            description,
            userId,
        });
        const postDoc = await post.save();
        res.send(postDoc);
    } catch (error) {
        throw new Error(error);
    }
});

// delete post
router.delete("/delete", async (req: Request, res: Response) => {
    try {
        const postId = req.body.postId;
        const getPost = await Posts.findById(postId);
        if (getPost) {
            const producer = new Producer(client);
            const payloads = [
                {
                    topic: process.env.KAFKA_TOPIC, messages: JSON.stringify({
                        type: process.env.ACTION_TYPE,
                        postId: getPost._id,
                    }), partition: 0
                }
            ];

            producer.send(payloads, (err, data) => {
                if (err) {
                    throw new Error(`Kafka producer error ${err}`);
                } else {
                    console.log("Kafka producer success ", data);
                }
            });
            res.send("Post is marked for deletion");
        } else {
            res.send("Post not found");
        }
    } catch (error) {
        throw new Error(error);
    }
})

export const PostRouter = router;
