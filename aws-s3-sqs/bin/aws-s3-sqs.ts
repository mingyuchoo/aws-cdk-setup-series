#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsS3SqsStack } from '../lib/aws-s3-sqs-stack';

const app = new cdk.App();
new AwsS3SqsStack(app, 'AwsS3SqsStack', {
  stackName: 'AwsS3SqsStack',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});
