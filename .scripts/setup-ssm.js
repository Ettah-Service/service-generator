#!/usr/bin/env node
import chalk from 'chalk';
import { SSM } from 'aws-sdk';
import { flatten } from 'flat';
import { map as awaitMap } from 'awaiting';
import { promisify } from 'util';
import prompt from 'prompt';
import {
  path,
  compose,
  keys,
  map,
  curry,
  __,
  concat,
  filter,
  reduce,
  assoc,
  last,
  isNotNilOrEmpty,
  replace,
  length,
  trim,
  entries
} from '@meltwater/phi';
import config from '../config';
import createLogger from '../lib/util/logger'

const log = createLogger('setup-ssm')
const getKeyDescription = compose(trim, replace(/[\/\-]/g, ' '));
const createUpdateSecret = ({ client }) => async ([keyName, keyValue]) =>
  client
    .putParameter({
      Name: keyName,
      Description: getKeyDescription(keyName, keyValue),
      Value: keyValue,
      Type: 'SecureString',
      DataType: 'text',
      Overwrite: true,
    })
    .promise();

const getPropertyDescription = keyName =>
  chalk.blue(`Provide a value for ${chalk.green(keyName)} or hit 'enter' to skip`);

const getPropertiesForPrompt = (acc, keyName) =>
  assoc(keyName, { description: getPropertyDescription(keyName) }, acc);

const runner = async () => {
  const stage = 'production';
  const {
    ssm: {
      auth: {
        accessKeyId,
        secretAccessKey,
        region
      },
      prefix
    }
  } = config

  const client = new SSM({ accessKeyId, secretAccessKey, region });
  const flat = curry(flatten)(__, { delimiter: '/' });
  const addStub = concat(`${prefix}/${stage}/`);
  const getKeys = compose(map(addStub), keys, flat);
  const ssmKeys = getKeys(config);
  prompt.message = chalk.yellow('');
  prompt.delimiter = chalk.cyan('\n');
  prompt.start();
  const pPrompt = promisify(prompt.get);
  const allSchemas = { properties: reduce(getPropertiesForPrompt, {}, ssmKeys) }
  const getEntries = compose(filter(compose(isNotNilOrEmpty, last)), entries)
  const input = await pPrompt(allSchemas)
  const values = getEntries(input)
  log('About to update these params', values);
  return awaitMap(values, length(values), createUpdateSecret({ client }))
};

Promise.resolve()
  .then(() => console.time('Setting up ssm params'))
  .then(runner)
  .then(() => console.timeEnd('Setting up ssm params'))
  .catch((error) => {
    console.error(error);
  });
