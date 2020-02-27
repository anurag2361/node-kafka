import { Consumer, KafkaClient } from "kafka-node";
import { config } from "dotenv";
import mongoose from "mongoose";
import { DAOManager } from "../DAO/dao";
config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw new Error(`mongodb error ${err}`);
    } else {
        console.log("Consumer Mongodb connected");
    }
});

const topic = [{
    topic: process.env.KAFKA_TOPIC,
    partition: 0,
}];

console.log("Kafka consumer is starting");
const client = new KafkaClient();
const consumer = new Consumer(client, topic, {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    fromOffset: false
});

consumer.on('message', async (message) => {
    try {
        if (message.topic === process.env.KAFKA_TOPIC) {
            const deleteUser = await DAOManager.prototype.deletePosts(message.value);
            console.log("deleted Post", deleteUser);
        }
    } catch (error) {
        throw new Error(`Error inside consumer: ${error}`);
    }
});

consumer.on('error', (err) => {
    throw new Error(`Kafka consumer error: $${err}`);
});

process.on('SIGINT', () => {
    consumer.close(true, () => {
        process.exit();
    });
});