import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getObjectUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

const putObjectUrl = async (filename, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `teachers/${filename}.avif`,
        ContentType: contentType
    })
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export { getObjectUrl, putObjectUrl };
