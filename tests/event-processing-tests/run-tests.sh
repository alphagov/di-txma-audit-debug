#!/usr/bin/env bash

set -eu

gradle -v

cd /

echo "Environment: $TEST_ENVIRONMENT"

echo "Current Working Directory: $PWD"

gradle -q test --debug

echo "Successfully generated report"

exit 0