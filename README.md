# README

## How to use AWS CDK in TypeScript

### Prerequisites

```bash
$ npm --version

$ npm install --global pnpm

$ pnpm --version

$ pnpm setup

$ source $HOME/.zshrc
```

## How to create a CDK app

```bash
$ pnpm install --global aws-cdk

$ cdk --verson

$ mkdir <app-name>

$ cd <app-name>

$ cdk init app --language=typescript
# or `cdk init lib --language=typescript`
# or `cdk sample-app --language=typescript`

$ pnpm run clean      # clean target

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


## References

- https://docs.aws.amazon.com/cdk/v2/guide/home.html
- https://github.com/awsdocs/aws-cdk-guide/tree/main/v2
