import * as cdk from "aws-cdk-lib";
import * as Cognito from "../lib/cognito-stack";

test("Empty Stack", () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new Cognito.CognitoStack(app, "MyTestStack");
  // WHEN
  const actual = app.synth().getStackArtifact(stack.artifactId).template;
  // THEN
  expect(actual.Resources ?? {}).toEqual({});
});
