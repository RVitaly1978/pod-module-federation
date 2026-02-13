#!/usr/bin/env bash

REMOTES=("ui-lib" "nav-panel" "app-vue2" "app-vue3" "app-react")

trap "kill 0" EXIT

echo "[1/3] Building all remotes..."
for service in "${REMOTES[@]}"; do
  pnpm --filter $service run build
done

echo "[2/3] Starting preview servers for remotes..."
for service in "${REMOTES[@]}"; do
  pnpm --filter $service run preview & 
done

sleep 2

echo "[3/3] Building and starting Host preview..."
pnpm --filter host run build && pnpm --filter host run preview
