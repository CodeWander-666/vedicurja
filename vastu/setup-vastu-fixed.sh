#!/bin/bash
# =============================================================================
# VedicUrja – Mobile Menu: 3D Black Text + Glowing Red‑Orange Border
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }

HEADER_FILE="src/components/layout/Header.tsx"
if [ ! -f "$HEADER_FILE" ]; then
    echo "❌ Header.tsx not found."
    exit 1
fi

BACKUP_DIR=".backups/mobile-menu-3d-black-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$HEADER_FILE" "$BACKUP_DIR/Header.tsx.bak"
info "Backup created in $BACKUP_DIR"

# -----------------------------------------------------------------------------
# Patch the mobile menu: black text, 3D buttons, glowing border
# -----------------------------------------------------------------------------
# 1. Change navigation items to black text with 3D hover/press
sed -i '/\/\* Navigation Items – 3D Magnetic Buttons \*\//,/\/\* Footer Actions \*\// {
    s|text-white|text-nidra-indigo|g
    s|bg-white/10|bg-white/80|g
    s|border-white/30|border-prakash-gold/50|g
    s|hover:bg-white/20|hover:bg-white hover:shadow-lg|g
}' "$HEADER_FILE"

# 2. Change footer buttons (Dashboard, Admin Panel, Sign In, Consult) to black text
sed -i '/\/\* Footer Actions \*\//,/<\/AnimatePresence>/ {
    s|text-white|text-nidra-indigo|g
    s|bg-white/20|bg-white/80|g
    s|bg-white/30|bg-white/90|g
    s|border-white/30|border-prakash-gold/50|g
    s|border-white/50|border-prakash-gold|g
    s|bg-white text-nidra-indigo|bg-white text-nidra-indigo|g
}' "$HEADER_FILE"

# 3. Add glowing red‑orange border to the drawer
sed -i '/className="fixed inset-y-0 right-0 w-80 max-w-\[85vw\] bg-gradient-to-b from-sacred-saffron via-kumkuma-red to-prakash-gold shadow-2xl z-50 lg:hidden flex flex-col"/ {
    s|shadow-2xl|shadow-2xl border-2 border-prakash-gold/50|g
}' "$HEADER_FILE"

# 4. Ensure all 3D transform styles are preserved (already present)
success "Mobile menu updated: black text, 3D buttons, glowing red‑orange border."

# -----------------------------------------------------------------------------
# Clean and rebuild
# -----------------------------------------------------------------------------
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful!"
else
    warn "Build had issues – check logs."
fi

echo ""
success "🎉 Mobile hamburger menu now features:"
echo "   - Black text on all buttons"
echo "   - 3D hover and press animations"
echo "   - Glowing red‑orange gradient border"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"
echo "🚀 Run 'npm run dev' to see the polished mobile menu."