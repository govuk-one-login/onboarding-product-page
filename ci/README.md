# GithubActions OIDC Provider

In order to use the GitHub OIDC provider to get credentials, you'll need an `AWS::IAM::OIDCProvider` set up.  The [template](github-actions-aws-oidc-provider-template.yml) contains the code provided by AWS to do so.  You only need one OIDC provider per account.

You can run the command:

```bash
gds aws di-onboarding-<account> -- sam deploy --stack-name github-actions-oidc-provider --template-file github-actions-aws-oidc-provider-template.yml --capabilities CAPABILITY_IAM --parameter-overrides "GitHubOrg=alphagov RepositoryName=di-onboarding-product-page"
```

Sam CLI should prompt you for values for `GitHubOrg` and `RepositoryName` if they're not provided.  You can leave `OIDCProviderArn` blank (enter with no value) to create a new one or specify the ARN of an existing one (or maybe this only creates one per account?  We will find out when we try to add another repo).

SAM will print the ARN of the Role once it has run.  This is the role you use for GitHub actions.  Store it as a secret in GitHub actions rather than leaving it in code.

```yaml
      - name: Assume temporary AWS role
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          role-session-name: ${{ secrets.AWS_ROLE_SESSION }}
          aws-region: ${{ env.AWS_REGION }}
```

See [smoke-tests.yml](../.github/workflows/smoke-tests.yml) for an example.

In order to deploy anything using SAM you will need an S3 bucket for SAM to save artifacts to.  Create a bucket using:

```bash
gds aws di-onboarding-<account> -- sam deploy --stack-name sam-deployment-artifacts-bucket-stack --template-file sam-deployment-artifacts-bucket-template.yml --capabilities CAPABILITY_IAM
```

Use the output for the GitHub Actions secret `AWS_DEPLOYMENT_BUCKET`.  Again, see [smoke-tests.yml](../.github/workflows/smoke-tests.yml) for an example of the secret being used.
