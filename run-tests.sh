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

export TEST_REPORT_PATH=/$TEST_REPORT_DIR

java -version
env | grep CFN_
env | grep TEST_REPORT_

# cd to the working directory in the Docker container - all of our stuff is here...
cd "$WORKDIR"

# Run tests...
npm run test
