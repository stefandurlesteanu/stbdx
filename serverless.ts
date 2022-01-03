import type { AWS } from '@serverless/typescript';
// import { apiKeys } from './src/config/api-keys.conf';

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
      // apiKeys: apiKeys,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  plugins: [
    'serverless-api-gateway-caching',
    'serverless-offline-ssm',
    'serverless-plugin-typescript',
    'serverless-plugin-optimize',
    'serverless-offline',
  ],
  custom: {
    'serverless-offline-ssm': {
      stages: ['local'],
    },
    cacheStageEnabled: {
      sandbox: false,
      production: true,
    },
    optimize: {
      external: ['mongoose'],
    },
    apiGatewayCaching: {
      enabled:
        '${self:custom.cacheStageEnabled.${opt:stage, self:provider.stage}}',
    },
  },
  package: {
    individually: true,
  },
  functions: {
    'api-proxy': {
      handler: 'src/lambda.handler',
      role: '${ssm:/api-proxy/PCMS_API_PRXY_LAMBDA_ROLE}',
      environment: {
        STAGE: '${self:provider.stage}',
        LOGGER_LEVEL: '${ssm:/api-proxy/LOGGER_LEVEL}',
        SSM_PREFIX: '${ssm:/api-proxy/SSM_PREFIX}',
        SSM_API_TOKEN_PARAM_NAME: '${ssm:/api-proxy/SSM_API_TOKEN_PARAM_NAME}',
        ACCESS_KEY: '${ssm:/api-proxy/ACCESS_KEY~true}',
        SECRET_ACCESS_KEY: '${ssm:/api-proxy/SECRET_ACCESS_KEY~true}',
        REGION: '${ssm:/api-proxy/REGION}',
        MONGO_PREFIX: '${ssm:/api-proxy/MONGO_PREFIX}',
        MONGO_HOST: '${ssm:/api-proxy/MONGO_HOST}',
        MONGO_USER: '${ssm:/api-proxy/MONGO_USER}',
        MONGO_PASSWORD: '${ssm:/api-proxy/MONGO_PASSWORD~true}',
        MONGO_DATABASE: '${ssm:/api-proxy/MONGO_DATABASE}',
        API_HOST: '${ssm:/api-proxy/API_HOST}',
        API_USERNAME: '${ssm:/api-proxy/API_USERNAME~true}',
        API_PASSWORD: '${ssm:/api-proxy/API_PASSWORD~true}',
        API_DEBUG: '${ssm:/api-proxy/API_DEBUG}',
        IMAGES_CDN: '${ssm:/api-proxy/IMAGES_CDN}',
        IMAGE_LARGE: '${ssm:/api-proxy/IMAGE_LARGE}',
        IMAGE_SMALL: '${ssm:/api-proxy/IMAGE_SMALL}',
        IMAGE_EXT: '${ssm:/api-proxy/IMAGE_EXT}',
        CACHED_PRODUCT_LIST_BUCKET:
          '${ssm:/api-proxy/PRODUCT_LIST_BUCKET_NAME}',
      },
      memorySize: 256,
      timeout: 30,
      provisionedConcurrency: 1,
      events: [
        {
          http: {
            path: 'api/countries',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'api/products',
            method: 'post',
            private: true,
          },
        },
        {
          http: {
            path: 'api/products/{productId}',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'api/v2/products/{productId}',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'api/products/{productId}/offer',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'api/cached-products',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'api/destination/{destination}',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'internal/dp-menu',
            method: 'get',
            private: true,
          },
        },
        {
          http: {
            path: 'internal/site-menu',
            method: 'get',
            private: true,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            caching: {
              enabled: true,
              ttlInSeconds: 3600,
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
