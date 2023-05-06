import {
  aws_cognito as cognito,
  Stack,
  StackProps,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";

// https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const userPool = new cognito.UserPool(this, "dev-user-pool", {
      signInAliases: {
        email: true,
        username: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: false,
        requireLowercase: false,
        requireSymbols: false,
        requireUppercase: false,
      },
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: "Verify your email for our dev app!",
        emailBody:
          "Hello {username}, Thanks for signing up to our dev app! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage:
          "Hello {username}, Thanks for signing up to our dev app! Your verification code is {####}",
      },
    });

    const client = userPool.addClient("dev-app-client");

    new CfnOutput(this, "userPoolId", {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, "userPoolClientId", {
      value: client.userPoolClientId,
    });
  }
}
