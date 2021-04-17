const AWS = require('aws-sdk');

const region = process.env.AWS_REGION;
let options = {region };
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);


module.exports = {
  Query: params => {
    return documentClient.query(params).promise();
  },
  Get: params => {
    return documentClient.get(params).promise();
  },
  BatchWrite: params => {
    return documentClient.batchWrite(params).promise();
  },
  Update: params => {
    return documentClient.update(params).promise();
  },
  TransactWriteItems: params => {
    return documentClient.transactWrite(params).promise();
  },
  Put: params => {
    return documentClient.put(params).promise();
  },
  Delete: params => {
    return documentClient.delete(params).promise();
  },
  BatchGet: params => {
    return documentClient.batchGet(params).promise();
  }
};