#!/usr/bin/env bash
set -eu

account=${1:-di-onboarding-integration}
template="$(dirname "${BASH_SOURCE[0]}")/github-actions-aws-oidc-provider-template.yml"

echo "Using account $account..."
eval "$(gds aws "$account" -e)"

sam deploy \
  --stack-name github-actions-oidc-provider \
  --template-file "$template" \
  --confirm-changeset \
  --disable-rollback \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides GitHubOrg=alphagov RepositoryName=di-onboarding-product-page
