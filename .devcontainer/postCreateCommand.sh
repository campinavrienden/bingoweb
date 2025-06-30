#!/bin/bash
set -e

if [ ! -f "/app/package.json" ]; then
  cd /app
  npm install -g pnpm
  pnpm create vite@latest . -- --template react-ts
  pnpm install
fi