#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "❌ فشل عند السطر $LINENO: $BASH_COMMAND"' ERR

# منع أي حوارات/تليمتري
export CI=1
export NEXT_TELEMETRY_DISABLED=1

# اختيار مدير الحزم
if [[ -f pnpm-lock.yaml ]]; then PKG=pnpm
elif [[ -f yarn.lock ]]; then PKG=yarn
else PKG=npm
fi

has_script() { node -e "try{const s=require('./package.json').scripts||{};process.exit(s['$1']?0:1)}catch(e){process.exit(1)}"; }

# 1) ملخص الإصدارات وبيئة العمل
{
  echo "=== Node & pkg mgr ==="
  node -v
  $PKG -v || true
  echo
  echo "=== Next version ==="
  node -e "try{console.log(require('next/package.json').version)}catch(e){console.log('next not installed')}"
  echo
  echo "=== Scripts (package.json) ==="
  node -e "try{const p=require('./package.json');console.log(Object.keys(p.scripts||{}).join(', '))}catch(e){console.log('Cannot read package.json')}"
  echo
  echo "=== Lint ==="
} > status-next.txt

# 2) Lint (اختياري وغير تفاعلي)
if has_script lint; then
  $PKG run -s lint >> status-next.txt 2>&1 || echo "lint failed" >> status-next.txt
else
  echo "No lint script" >> status-next.txt
fi

# 3) Type-check (إن وجد)
echo -e "\n=== TypeCheck ===" >> status-next.txt
if has_script type-check; then
  $PKG run -s type-check >> status-next.txt 2>&1 || echo "type-check failed" >> status-next.txt
else
  echo "No type-check script or TS not used" >> status-next.txt
fi

# 4) Build إنتاجي + لوج مع حفظ كود الخروج
echo -e "\n=== Build START ===" >> status-next.txt
date >> status-next.txt
set +e
$PKG run -s build 2>&1 | tee build.log
build_rc=${PIPESTATUS[0]}
set -e
echo -e "\n=== Build END ===" >> status-next.txt
date >> status-next.txt
echo -e "\n=== Build status: $build_rc ===" >> status-next.txt

# 5) تلخيص التحذيرات
echo -e "\n=== Top warnings from build.log ===" >> status-next.txt
grep -iE "warn|warning" build.log | head -n 60 >> status-next.txt || true

echo -e "\nFiles generated: status-next.txt , build.log"
