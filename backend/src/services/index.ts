import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
console.log(process.env.Secret_access_key, process.env.Access_key);

const s3client = new S3Client({
  credentials: {
    secretAccessKey: process.env.Secret_access_key as string,
    accessKeyId: process.env.Access_key as string,
  },
  region: "us-east-1",
});

export const gethefile = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });

    let url = await getSignedUrl(s3client, command);

    return url;
  } catch (error) {
    console.log(error);
  }
};

export const putthefile = async (ContentType: string, key: string) => {
  console.log({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: ContentType,
  });
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: ContentType,
    });

    const url = await getSignedUrl(s3client, command);
    return url;
  } catch (error) {
    console.log(error);
  }
};
