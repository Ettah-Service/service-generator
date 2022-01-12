import {
  or,
  equals
} from '@meltwater/phi'
export const createIsProd = ({ env }) => or(equals(env, 'production'), equals(env, 'prod'))
export const createIsDev = ({ env }) => or(equals(env, 'development'), equals(env, 'dev'))
export const createCurrentEnv = ({ env }) => env
