import Express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { KafkaClient } from "kafka-node";
import { UserRouter } from "./routes/user.route";
import { PostRouter } from "./routes/posts.route";
config();
const app = Express();
export const client = new KafkaClient();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw new Error(`mongodb error ${err}`);
    } else {
        console.log("Mongodb connected");
    }
});

const topics = [
    { topic: process.env.KAFKA_TOPIC, partitions: 1, replicationFactor: 1 },
];

client.createTopics(topics, (err, result) => {
    if (err) {
        throw new Error(err);
    } else {
        console.log("Kafka Topic was created");
    }
});

app.use(Express.json({ limit: "1mb" }));
app.use(Express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/posts", PostRouter);

const server = app.listen(process.env.PORT);
server.on("listening", () => {
    console.log(`Server is listening on port localhost://${process.env.PORT}`);
});
