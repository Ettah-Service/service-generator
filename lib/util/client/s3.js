import { S3 } from 'aws-sdk'

export default ({
  config: {
    s3: {
      auth: {
        endpoint,
        accessKeyId,
        secretAccessKey
      },
      s3ForcePathStyle,
      ...options
    }
  }
}) => new S3({
  endpoint,
  accessKeyId,
  secretAccessKey,
  s3ForcePathStyle,
  ...options
})
