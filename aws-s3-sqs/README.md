# README

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## How to create a CDK app

```bash
$ npm --version

$ npm install --global pnpm

$ pnpm --version

$ pnpm setup

$ source $HOME/.zshrc

$ pnpm install --global aws-cdk

$ cdk --verson

$ mkdir <app-name>

$ cd <app-name>

$ cdk init app --language=typescript
# or `cdk init lib --language=typescript`
# or `cdk sample-app --language=typescript`

$ pnpm run build      # compile typescript to js
# or `pnpm run watch` # watch for changes and compile

$ pnpm run test       # perform the jest unit tests

$ cdk ls              # list the stacks in the app

$ cdk diff            # compare deployed stack with current state

$ cdk synth           # emits the synthesized CloudFormation template

$ cdk bootstrap       # process of provisioning resources for the AWS CDK

$ cdk deploy          # deploy this stack to your default AWS account/region

$ cdk destroy         # detroy the app's resources
```
