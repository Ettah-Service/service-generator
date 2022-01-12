[![Codeship Status for alfa/mkn-service](https://app.codeship.com/projects/xxxxx/status?branch=main)](https://app.codeship.com/projects/xxxxxxx)

# MKN Service
Generate a new service for Alfa

## Description

Start a service in minutes

## Installation
Before you can use this repo, please install the following services

### Git LFS
This is used to manage large ndjson files on the repo, installation information here https://git-lfs.github.com/

### Docker compose
This will help spin up resources like s3, dynamodb etc, installation information here https://docs.docker.com/compose/install/

Clone the repo using

```
$ git clone https://github.com/simpledealer/mkn-service ./
```

## Documentation

To generate the api documentation run ```yarn run generate:docs``` the html document will be placed in the docs folder

## Usage

First run
```
docker-compose up -d
yarn run setup # this will create the dependencies for the service
# since this a serverless app, just invoke the functions locally, eg
sls invoke local -f jotform -p fixtures/events/jotform.json
```


## Development Quickstart

Since this is lambda service refer to [Serverless](https://www.serverless.com/framework/docs/providers/aws/cli-reference/) for how to use run lambda.

### main Branch
Merge in to this branch and the CI/CD will deploy to production

### v* Branch
Push to this branch and the CI/CD will deploy to a custom environment

### Config
Config variables are read from env.local for local develeopment and from ssm for prod mode. This is a sample .env.local

```
DEBUG="*, -puppeteer:*, -babel, -babel:*"
ENV="development"
ENDPOINT="http://localhost:3000/offline"
API_KEY="123"

DOMAIN="localhost:9000"
DYNAMODB_AUTH_ENDPOINT="http://localhost:9119"
DYNAMODB_AUTH_ACCESS_KEY_ID=""
DYNAMODB_AUTH_SECRET_ACCESS_KEY=""
DYNAMODB_AUTH_REGION="us-east-1"
DYNAMODB_TABLE_CREDIT_FORM="mkn-service-MODEL-NAME"
DYNAMODB_SEEDING_ENABLED="true"

S3_AUTH_ENDPOINT="http://localhost:9020"
S3_AUTH_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
S3_AUTH_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
S3_AUTH_REGION="us-east-1"
S3_BUCKET_NAME="mkn-service-data"
S3_FORCE_PATH_STYLE=true
API_SELF_ENDPOINT=""

```

## Running the pipeline locally
The pipeline can be run locally in development mode

### Get environment variables
Get the env variables above and put them into `.env.local`

### Setting up third party dependencies
To initialize the s3 and dynamodb instances so the app ca connect to locally, run
  ```
  docker-compose up -d
  ```

### Create database

To create the database and add sample data to it, run
  ```
  yarn run setup:dynamodb
  ```
