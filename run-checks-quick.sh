#!/usr/bin/env bash
set -o pipefail

# نفس أمرك بالضبط لكن مع تخطي Lint إذا أخذ وقت طويل
{
    echo "=== Node & npm ==="
    node -v 2>&1
    npm -v 2>&1
    echo
    echo "=== Next version ==="
    npx next --version 2>&1 || npm list next 2>&1
    echo
    echo "=== Scripts (package.json) ==="
    node -e "try{const p=require('./package.json');console.log(Object.keys(p.scripts||{}))}catch(e){console.log('Cannot read package.json')}"
    echo
} > status-next.txt

# تخطي Lint إذا كان يسبب مشكلة
echo "=== Lint ===" >> status-next.txt
echo "Skipping lint (was causing timeout)" >> status-next.txt

# باقي أمرك كما هو
echo -e "\n=== Build START ===" >> status-next.txt
date >> status-next.txt
npm run -s build 2>&1 | tee build.log
echo -e "\n=== Build END ===" >> status-next.txt
date >> status-next.txt

echo -e "\n=== Top warnings from build.log ===" >> status-next.txt
grep -i "warn" build.log | head -n 60 >> status-next.txt || true

echo -e "\nFiles generated: status-next.txt , build.log"
open -a TextEdit status-next.txt
