#!/usr/bin/env bash
echo "🔍 فحص مشروع Next.js - DVN Log"
echo "================================"
echo "📍 المسار: $(pwd)"
echo "================================"
echo ""
echo "📦 البيئة:"
node -v
npm -v
npx next --version 2>/dev/null || echo "Next.js غير مثبت"
echo ""
echo "📁 الملفات الموجودة:"
ls -la | grep -E "package|next|tsx|jsx" | head -10
echo ""
echo "🔨 جاري البناء..."
npm run build 2>&1 | tee build-log.txt | tail -20
echo ""
echo "✅ الفحص اكتمل!"
echo "📄 السجل محفوظ في: build-log.txt"
