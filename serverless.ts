import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'stbdx',
  useDotenv: true,
  unresolvedVariablesNotificationMode: 'error',
  configValidationMode: 'error',
  provider: {
    name: 'aws',
    region: 'eu-central-1',
    runtime: 'nodejs12.x',
    stackName: 'stbdx-${self:provider.stage}',
    apiName: 'stbdx-${self:provider.stage}',
    endpointType: 'regional',
    logRetentionInDays: 90,
    stage: '${opt:stage, "local"}',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      shouldStartNameWithService: true,
      minimumCompressionSize: 1024,
      binaryMediaTypes: ['*/*'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  plugins: [
    'serverless-plugin-typescript',
    'serverless-plugin-optimize',
    'serverless-offline',
  ],
  package: {
    individually: true,
  },
  functions: {
    'proxy': {
      handler: 'src/lambda.handler',
      memorySize: 256,
      timeout: 30,
      provisionedConcurrency: 1,
      events: [
        {
          http: {
            path: 'users',
            method: 'get',
            private: false,
          },
        },
        {
          http: {
            path: 'users/{id}',
            method: 'get',
            private: false,
          },
        },
        {
          http: {
            path: 'posts',
            method: 'get',
            private: false,
            request: {
              template: {
                "application/json": '{ userId : "$input.params(userId)" }'
              }
            }
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
