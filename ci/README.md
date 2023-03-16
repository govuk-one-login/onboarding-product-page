# GithubActions OIDC Provider

In order to use the GitHub OIDC provider to get credentials, you'll need an `AWS::IAM::OIDCProvider` set up. The [template](github-actions-aws-config.yml) contains the code provided by AWS to do so. You only need one OIDC provider per account.

You can run the command:

```bash
gds aws di-onboarding-<account> -- ci/apply-github-actions-aws-config.sh
```

SAM will print the AWS role ARN and bucket name once it has run. This is the role you use for GitHub actions. Store it as a secret in GitHub actions rather than leaving it in code.

```yaml
- name: Assume temporary AWS role
  uses: aws-actions/configure-aws-credentials@v1
  with:
      role-to-assume: ${{ secrets.GHA_AWS_ROLE_ARN }}
      role-session-name: ${{ secrets.AWS_ROLE_SESSION }}
      aws-region: ${{ env.AWS_REGION }}
```

See [smoke-tests.yml](../.github/workflows/deploy-smoke-tests.yml) for an example.

In order to deploy anything using SAM you will need an S3 bucket for SAM to save artifacts to.

Store the bucket name in a GitHub Actions secret. See [smoke-tests.yml](../.github/workflows/deploy-smoke-tests.yml) for an example of the secret being used.
