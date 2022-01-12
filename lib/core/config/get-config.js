import config from '../../../config'
export default () => () => Promise.resolve({ data: config })
