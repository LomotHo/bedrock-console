	#!/bin/sh
set -e

echo "ENTRYPOINT"
chmod +x bedrock/bedrock_server
exec "$@"