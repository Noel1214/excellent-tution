import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resend } from "resend";

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
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const putObjectUrl = async (key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const deleteObjectInS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    });
    await s3Client.send(command);
    return { success: true };
  } catch (error) {
    console.log("error in deleteObjectInS3\n", error);
    return { success: false };
  }
};

const sendMail = async (email, otp) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Excellent Tution App <no-reply@email.devnoel.org>",
      to: email,
      subject: "OTP",
      html: `<strong>OTP :  ${otp}</strong>`,
    });

    if (error) {
      console.log("send mail error \n", error);
      throw new Error(`Failed to send email ${error.message}`);
    }

    return { success: true };
  } catch (error) {
    console.log(error.message);
    return { success: false };
  }
};

export { getObjectUrl, putObjectUrl, sendMail, deleteObjectInS3 };
