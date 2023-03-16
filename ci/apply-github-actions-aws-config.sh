#!/usr/bin/env bash
set -eu

template="$(dirname "${BASH_SOURCE[0]}")/github-actions-aws-config.yml"

sam validate --template "$template"
sam validate --template "$template" --lint

sam deploy "$@" \
  --stack-name product-page-github-actions-config \
  --template "$template" \
  --confirm-changeset \
  --disable-rollback \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_IAM \
  --tags sse:stack-type=config sse:stack-role=deployment sse:deployment-source=manual sse:application=product-page
