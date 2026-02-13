#!/usr/bin/env bash

REMOTES=("ui-lib" "nav-panel" "app-vue2" "app-vue3" "app-react")

trap "kill 0" EXIT

echo "[1/3] Starting build --watch for remotes..."
for service in "${REMOTES[@]}"; do
  pnpm --filter $service run build --watch &
done

sleep 10

echo "[2/3] Starting preview servers..."
for service in "${REMOTES[@]}"; do
  pnpm --filter $service run preview &
done

echo "[3/3] Starting Host in dev mode..."
pnpm --filter host run dev
