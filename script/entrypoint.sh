#!/usr/bin/env bash

set -e

echo "chmod +x bedrock_server"
chmod +x bedrock/bedrock_server

exec "$@"
