const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const bucketName = process.env.S3_BUCKET_NAME;
const filePath = 'results.json';
const fileKey = path.basename(filePath);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

(async () => {
  try {
    const fileContent = fs.readFileSync(filePath);

    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileKey,
        Body: fileContent,
        ContentType: 'application/json',
      })
      .promise();

    console.log(`Uploaded ${fileKey} to S3 bucket ${bucketName}`);
  } catch (error) {
    console.error('Error uploading to S3:', error);
    process.exit(1);
  }
})();
