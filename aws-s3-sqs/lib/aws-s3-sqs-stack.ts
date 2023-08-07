import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsS3SqsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // S3
    const bucket = new s3.Bucket(this, 'MyCdkAppBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    // SQS
    const queue = new sqs.Queue(this, 'MyCdkAppQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
  }
}
