const AWS = require('aws-sdk');
const fs = require('fs');

(async () => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
    });

    const rawResult = fs.readFileSync('result.json', 'utf8');
    if (!rawResult.trim()) {
      throw new Error('result.json is empty.');
    }
    const result = JSON.parse(rawResult);

    const params = {
      TableName: 'Benchmarks',
      Item: { ...result },
    };

    console.log('Saving data to DynamoDB:', params.Item);
    await dynamoDb.put(params).promise();
    console.log('Data saved successfully to DynamoDB.');
  } catch (error) {
    console.error('Error saving data to DynamoDB:', error);
    process.exit(1);
  }
})();
