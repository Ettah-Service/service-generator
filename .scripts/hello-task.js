import { tap } from '@meltwater/phi'
import { inspect } from 'util'

const runner = async () => ({ service: 'HelloWorld', task: 'Say hello world' })
Promise.resolve()
  .then(() => console.time('Saying Hello'))
  .then(runner)
  .then(tap(val => console.log(inspect(val, false, null, true))))
  .then(() => console.timeEnd('Saying Hello'))
  .catch((error) => {
    console.error(error)
  })
