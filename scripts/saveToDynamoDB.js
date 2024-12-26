const AWS = require('aws-sdk');
const fs = require('fs');

(async () => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
    });

    const githubEvent = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    const branch = githubEvent.pull_request.head.ref;
    const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'unknown-branch';
    const commitHash = process.env.GITHUB_SHA;

    const rawResult = fs.readFileSync('result.json', 'utf8');
    if (!rawResult.trim()) {
      throw new Error('result.json is empty.');
    }
    const result = JSON.parse(rawResult);

    const params = {
      TableName: 'Benchmarks',
      Item: {
        branch: branchName,
        timestamp: result.timestamp,
        executionTime: result.executionTime || 0000,
        commitHash: commitHash, 
      },
    };

    console.log('Saving data to DynamoDB:', params.Item);
    await dynamoDb.put(params).promise();
    console.log('Data saved successfully to DynamoDB.');
  } catch (error) {
    console.error('Error saving data to DynamoDB:', error);
    process.exit(1);
  }
})();
