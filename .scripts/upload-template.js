import { inspect } from 'util'
import { tap, compose, toString,  length, split, filter, includes, last } from '@meltwater/phi'
import flattenDir from 'flatten-dir'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import createS3Client from '../lib/util/client/s3'
import config from '../config'
import { map as mapAwait } from 'awaiting'


const generateKey = compose(last, split('fixtures/'))
const createGetFileContent = () => fileName => ({ fileName, file: toString(readFileSync(fileName)) })
const createUploadTemplates = () => ({ fileName, file }) => {
  const { s3: { auth, s3ForcePathStyle, bucket: bucketName } } = config
  const clientConfig = { ...auth, s3ForcePathStyle }
  const s3Client = createS3Client(clientConfig)
  const key = generateKey(fileName)
  const params = { Key: key, Body: file, Bucket: dumbServiceData }
  return s3Client.putObject(params).promise()
}
const runner = async () => {
  const { s3: { bucket: bucketName } } = config
  const dirName = resolve(process.cwd(), 'fixtures')
  const allFiles = await flattenDir(dirName)
  const files = filter(includes('/template/'), allFiles)
  const uploadResult = await mapAwait(
    files,
    length(files),
    compose(createUploadTemplates(), createGetFileContent(dirName)))
  return ({
  service: 'Upload:Template',
  task: 'This will upload the templates into the specified s3 bucket',
  meta: {
    bucketName,
    files,
    uploadResult
  }
})
}
Promise.resolve()
  .then(() => console.time('Uploading templates'))
  .then(runner)
  .then(tap(val => console.log(inspect(val, false, null, true))))
  .then(() => console.timeEnd('Uploading templates'))
  .catch((error) => {
    console.error(error)
  })

