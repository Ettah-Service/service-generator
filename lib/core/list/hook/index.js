import { composeWith, identity, then } from '@meltwater/phi'

/* istanbul ignore next */
const sampleHook = async context => identity(context)
export default () => composeWith(then, [sampleHook])
