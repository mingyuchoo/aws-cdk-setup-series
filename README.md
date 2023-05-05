# aws-cdk-setup-series

## How to use AWS CDK in TypeScript

### Prerequisites

```bash
npm install --global typescript
npm update  --global typescript
```

### Create a project

```bash
mkdir <project-name>

cd <project-name>

cdk init app --language typescript

npm run build

cdk ls

# vim path/some-code.ts

cdk synth

cdk deploy

# vim path/some-code.ts

cdk diff

cdk deploy

cdk destroy
```



## References

- https://docs.aws.amazon.com/cdk/v2/guide/home.html
- https://github.com/awsdocs/aws-cdk-guide/tree/main/v2
