# How to 

 - Install [Kafka](https://kafka.apache.org/quickstart) and [MongoDB](https://docs.mongodb.com/guides/server/install/)
 - Install [NodeJS](https://nodejs.org/en/download/)
 - Clone this project.
 - Inside the root directory of this project, create an env file (`.env )` in which you should initialise following variables `KAFKA_TOPIC` , `KAFKA_SERVER` , `PORT` , `MONGO_URL` , `ACTION_TYPE` with appropriate values. Kafka topic , Port and Action type is your choice, Kafka server will be your kafka server url, most probably `"localhost:9092"` , Mongo url will be your MongoDB db url.
 - Run `npm install`
 - Run `npm start`