const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
});

const db = new AWS.DynamoDB.DocumentClient();

const Table = "demo";

module.exports = { db, Table };
