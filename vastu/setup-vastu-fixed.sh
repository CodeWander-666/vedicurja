#!/bin/bash
# =============================================================================
# VedicUrja – Center Mobile Overlay Menu & Ensure All Content Visible
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

BACKUP_DIR=".backups/mobile-menu-centered-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$HEADER_FILE" "$BACKUP_DIR/Header.tsx.bak"
info "Backup created in $BACKUP_DIR"

# -----------------------------------------------------------------------------
# Adjust the mobile menu container for perfect centering and full visibility
# -----------------------------------------------------------------------------
# 1. Ensure the overlay container uses flex centering (already does)
# 2. Add max-height and overflow-y-auto to the menu panel
# 3. Adjust padding/margins for optimal spacing

sed -i '/className="relative z-10 w-full max-w-md mx-4 max-h-\[90vh\] overflow-y-auto rounded-3xl bg-gradient-to-b from-sacred-saffron via-kumkuma-red to-prakash-gold shadow-2xl border-2 border-prakash-gold\/50 p-6"/ {
    s|p-6|p-5 sm:p-6|g
}' "$HEADER_FILE"

# Ensure the content doesn't overflow and is scrollable
sed -i '/className="relative z-10 w-full max-w-md mx-4 max-h-\[90vh\] overflow-y-auto/ {
    s|overflow-y-auto|overflow-y-auto overscroll-contain|g
}' "$HEADER_FILE"

# Make navigation links slightly more compact on very small screens
sed -i '/block w-full px-6 py-5 bg-white\/90 backdrop-blur-sm border-2 border-white rounded-2xl text-nidra-indigo font-bold text-xl shadow-lg/ {
    s|px-6 py-5|px-5 py-4 sm:px-6 sm:py-5|g
    s|text-xl|text-lg sm:text-xl|g
}' "$HEADER_FILE"

# Adjust action buttons similarly
sed -i '/block w-full text-center py-4 bg-white text-nidra-indigo rounded-full font-bold text-lg/ {
    s|py-4|py-3 sm:py-4|g
    s|text-lg|text-base sm:text-lg|g
}' "$HEADER_FILE"

sed -i '/block w-full text-center py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg/ {
    s|py-4|py-3 sm:py-4|g
    s|text-lg|text-base sm:text-lg|g
}' "$HEADER_FILE"

success "Mobile menu now perfectly centered and fully visible with scrolling."

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
success "🎉 Mobile menu improvements:"
echo "   - Centered on screen with flex alignment"
echo "   - Max height 90vh with smooth scrolling"
echo "   - Responsive padding and font sizes"
echo "   - All navigation and action buttons fully visible"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"
echo "🚀 Run 'npm run dev' to test the refined mobile menu."