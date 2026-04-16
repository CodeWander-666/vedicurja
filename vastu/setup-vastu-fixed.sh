#!/bin/bash
# =============================================================================
# VedicUrja – Final Fix: Mobile Menu Transparency + Duplicate Google Button
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }

BACKUP_DIR=".backups/mobile-google-fix-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
info "Backups saved to $BACKUP_DIR"

# -----------------------------------------------------------------------------
# 1. Remove duplicate Google button from SignIn and SignUp
# -----------------------------------------------------------------------------
info "Removing duplicate Google buttons..."
for page in "src/app/(marketing)/signin/page.tsx" "src/app/(marketing)/signup/page.tsx"; do
    if [ -f "$page" ]; then
        cp "$page" "$BACKUP_DIR/$(basename $page).bak"
        # Use awk to keep only the first Google button
        awk '
        BEGIN { count = 0; skip = 0 }
        /<button onClick={handleGoogleSign/ {
            count++
            if (count == 1) { print; next }
            else { skip = 1; next }
        }
        skip && /<\/button>/ { skip = 0; next }
        !skip { print }
        ' "$page" > "$page.tmp" && mv "$page.tmp" "$page"
        success "Cleaned $page"
    fi
done

# -----------------------------------------------------------------------------
# 2. Force Mobile Menu Background to Solid Red-Orange Gradient
# -----------------------------------------------------------------------------
HEADER_FILE="src/components/layout/Header.tsx"
if [ -f "$HEADER_FILE" ]; then
    cp "$HEADER_FILE" "$BACKUP_DIR/Header.tsx.bak"
    # Directly replace the mobile drawer className with the gradient
    sed -i 's|className="fixed inset-y-0 right-0 w-80 max-w-\[85vw\] bg-white/95 backdrop-blur-xl shadow-2xl z-40 lg:hidden"|className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gradient-to-b from-sacred-saffron via-kumkuma-red to-prakash-gold shadow-2xl z-40 lg:hidden"|g' "$HEADER_FILE"
    # Ensure text is white
    sed -i 's|text-nidra-indigo|text-white|g' "$HEADER_FILE"
    sed -i 's|text-nidra-indigo/80|text-white/90|g' "$HEADER_FILE"
    sed -i 's|text-nidra-indigo/60|text-white/80|g' "$HEADER_FILE"
    success "Mobile menu background forced to red-orange gradient."
fi

# -----------------------------------------------------------------------------
# 3. Clean cache and rebuild
# -----------------------------------------------------------------------------
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful!"
else
    echo "❌ Build failed – check logs."
    exit 1
fi

echo ""
success "🎉 Issues resolved:"
echo "   - Duplicate Google button removed from SignIn/SignUp"
echo "   - Mobile hamburger menu now has solid red-orange background"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"
echo "🚀 Run 'npm run dev' and hard refresh your browser (Ctrl+Shift+R)."