#!/bin/bash

set -eu
set -o pipefail

cat << 'EOF'
This script runs internal integration tests for the Product Pages application.

Requirements:
  - All stack outputs available in environment variables named: $CFN_<OutputKey>
  - The reports directory available in environment variable:    $TEST_REPORT_DIR
  - The test report dir is located at the root of the container
EOF

export ENVIRONMENT=${TEST_ENVIRONMENT:-}
export ENDPOINT=$CFN_ProductToolURL

cd /app

echo "Running heartbeat check..."
declare status_code

# shellcheck disable=SC2154
status_code="$(curl --silent --output /dev/null --write-out '%{http_code}' "$ENDPOINT")"
if [[ $status_code != "200" ]]; then
  exit 1
fi

echo "Running e2e tests..."
declare error_code=0

#if [[ $TEST_ENVIRONMENT =~ development ]]; then
  export HOST="$CFN_ProductToolURL"
  npm run acceptance-tests
#  error_code=$?
#
#  cp -rf results $TEST_REPORT_ABSOLUTE_DIR
#fi

exit $error_code
