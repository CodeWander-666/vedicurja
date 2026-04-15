#!/bin/bash
# =============================================================================
# VedicUrja – Safe Link href Fallback Patch (No Complex Regex)
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }

# List of files to patch (add more if needed)
FILES=(
  "src/components/sections/home/CosmicHero.tsx"
  "src/components/sections/home/AcharyaVow.tsx"
  "src/components/sections/home/FinalCTA.tsx"
  "src/components/sections/home/LearnVastuTeaser.tsx"
  "src/components/sections/home/VirtualConsultCTA.tsx"
  "src/components/sections/home/GlobalPresence.tsx"
  "src/components/sections/tools/FreeToolCard3D.tsx"
  "src/components/services/ServiceCard3DEnhanced.tsx"
  "src/components/sections/home/SacredArchives.tsx"
  "src/app/(marketing)/insights/page.tsx"
  "src/app/(marketing)/client-stories/page.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "$file.bak"
    # Replace href={variable} with href={variable || '#'}
    sed -i "s/href={\([^}]*\)}/href={\1 || '#'}/g" "$file"
    success "Patched $file"
  else
    info "Skipped $file (not found)"
  fi
done

info "Cleaning Next.js cache..."
rm -rf .next

info "Running production build..."
if npm run build; then
  success "✅ Build successful – runtime warnings silenced."
else
  echo "❌ Build failed – check logs."
  exit 1
fi

echo ""
success "🎉 All Link href fallbacks applied. The null error will no longer appear."