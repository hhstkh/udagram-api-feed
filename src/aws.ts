import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
AWS.config.credentials = credentials;


export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: config.access_key_id,
  secretAccessKey: config.secret_access_key,
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  console.log( 'getGetSignedUrl'  + key);
  console.log( 'aws access key id:'  + config.access_key_id);
  console.log( 'aws secret_access_key:'  + config.secret_access_key);

  s3.config.update({
    accessKeyId: config.access_key_id,
    secretAccessKey: config.secret_access_key
  })

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  console.log( 'getPutSignedUrl'  + key);
  console.log( 'aws access key id:'  + config.access_key_id);
  console.log( 'aws secret_access_key:'  + config.secret_access_key);

  s3.config.update({
    accessKeyId: config.access_key_id,
    secretAccessKey: config.secret_access_key
  })

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
