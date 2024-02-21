import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from "aws-cdk-lib/aws-ssm";

export interface OPAEnvironmentParams {
  readonly awsAccount: string;
  readonly awsRegion: string;
  readonly envName: string;
  readonly prefix: string;
}

export interface S3ConstructProps extends cdk.StackProps {
  readonly opaEnv: OPAEnvironmentParams;
  readonly kmsKey: cdk.aws_kms.IKey;
}

const defaultProps: Partial<S3ConstructProps> = {};

/**
 * Deploys the S3 construct
 */

export class S3Construct extends Construct {
  public readonly bucket: s3.IBucket;

  constructor(parent: Construct, name: string, props: S3ConstructProps) {
    super(parent, name);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    props = { ...defaultProps, ...props };

    // Account
    const accountId = cdk.Stack.of(this).account;
    const region = cdk.Stack.of(this).region;

    // Environment
    const envIdentifier = `${props.opaEnv.prefix.toLowerCase()}${props.opaEnv.envName}`;
    const envPathIdentifier = `/${props.opaEnv.prefix.toLowerCase()}/${props.opaEnv.envName.toLowerCase()}`;

    // S3 Bucket for TechDocs
    this.bucket = new s3.Bucket(this, `opa-platform-backstage-techdocs-${region}-${accountId}`, {
      bucketName: `opa-platform-backstage-techdocs-${region}-${accountId}`,
      serverAccessLogsPrefix: 'access-logs',
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false, // 변경됨
      blockPublicAccess: {
        blockPublicAcls: true,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: true,
      }
    });
    const bucketPolicy = new iam.PolicyStatement({
      sid: 'TechDocsWithMigration',
      effect: iam.Effect.ALLOW,
      actions: [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObjectVersion",
        "s3:ListBucket",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      resources: [
        this.bucket.bucketArn,
        `${this.bucket.bucketArn}/*`
      ],
      principals: [new iam.AnyPrincipal()]
    });
    this.bucket.addToResourcePolicy(bucketPolicy);


    //  now save Bucket name in SSM Param
    const bucketParam = new ssm.StringParameter(this, `${envIdentifier}-techdocs-bucket-param`, {
      allowedPattern: ".*",
      description: `The S3 Bucket for TechDocs: ${props.opaEnv.envName} Environment`,
      parameterName: `${envPathIdentifier}/techdocs-bucket`,
      stringValue: `${props.opaEnv.prefix.toLowerCase()}-${props.opaEnv.envName.toLowerCase()}-backstage-techdocs-${region}-${accountId}`,
    });

    // Post params to output
    new cdk.CfnOutput(this, "S3 Bucket for TechDocs Param", {
      value: bucketParam.parameterName,
    });
  }
}