import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from "aws-cdk-lib/aws-kms";
import { S3Construct } from './s3-construct';

export interface OPAEnvironmentParams {
  readonly awsAccount: string;
  readonly awsRegion: string;
  readonly envName: string;
  readonly prefix: string;
}

export class AwsS3SqsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creating environment params
    const opaParams: OPAEnvironmentParams = {
      envName: "platform",
      awsRegion:  "ap-southeast-1",
      awsAccount: "813990269506",
      prefix:  "aaaaa",
    };

    // Create encryption key for all data at rest encryption
    const key = new kms.Key(this, `${opaParams.prefix}-key`, {
      alias: `${opaParams.prefix}-key`,
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pendingWindow: cdk.Duration.days(8),
    });

    // Create S3 for backstage platform
    const s3Construct = new S3Construct(this, "s3-construct", {
      opaEnv: opaParams,
      kmsKey: key,
    });
  }
}
