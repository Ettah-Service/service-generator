import { identity } from '@meltwater/phi'
import { success } from 'awaiting'
import { name as senderId } from '../../package.json'

export default ({
  isProd,
  eventServiceClient
}) => type => async ({ entityId, ...metadata }) => {
  const jacket = isProd ? success : identity
  const params = { entityId, senderId, type, metadata }
  const sendEvent = () => eventServiceClient.post('/', params)
  await jacket(sendEvent())
  return true
}
