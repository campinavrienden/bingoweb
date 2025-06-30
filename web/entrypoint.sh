#!/bin/sh
set -e

echo "Node version:"
node -v

which node

# Path to runtime-env.js
export RUNTIME_ENV_PATH="/app/public/runtime-env.js"

which node
node -v

# Run shared JS logic to build window.RUNTIME_ENV
node /app/scripts/inject-env.cjs

# Execute final container command
exec "$@"
