#!/bin/bash
# =============================================================================
# VedicUrja – Fix Duplicate Footer & Apply Luxury Gradient
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }

BACKUP_DIR=".backups/footer-cleanup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
info "Backups saved to $BACKUP_DIR"

backup_file() { [ -f "$1" ] && cp "$1" "$BACKUP_DIR/"; }

# -----------------------------------------------------------------------------
# 1. Remove Footer import and usage from all page files
# -----------------------------------------------------------------------------
info "Removing duplicate Footer imports from page files..."

# Find all TypeScript/TSX files that import Footer
find src -name "*.tsx" -type f -exec grep -l "import { Footer }" {} \; | while read -r file; do
    # Skip the root layout and the Footer component itself
    if [[ "$file" == *"src/app/layout.tsx" ]] || [[ "$file" == *"src/components/layout/Footer.tsx" ]]; then
        continue
    fi
    backup_file "$file"
    # Remove the import line
    sed -i "/import { Footer }/d" "$file"
    # Remove the <Footer /> usage (including self-closing and full tags)
    sed -i '/<Footer \/>/d' "$file"
    sed -i '/<Footer>/d' "$file"
    sed -i '/<\/Footer>/d' "$file"
    info "Cleaned: $file"
done

# Also handle default imports
find src -name "*.tsx" -type f -exec grep -l "import Footer from" {} \; | while read -r file; do
    if [[ "$file" == *"src/app/layout.tsx" ]] || [[ "$file" == *"src/components/layout/Footer.tsx" ]]; then
        continue
    fi
    backup_file "$file"
    sed -i "/import Footer from/d" "$file"
    sed -i '/<Footer \/>/d' "$file"
    sed -i '/<Footer>/d' "$file"
    sed -i '/<\/Footer>/d' "$file"
    info "Cleaned default import: $file"
done

success "Footer imports removed from all page files."

# -----------------------------------------------------------------------------
# 2. Update Footer component with luxury gradient background
# -----------------------------------------------------------------------------
FOOTER_FILE="src/components/layout/Footer.tsx"
backup_file "$FOOTER_FILE"

# Replace the background class with a gradient
sed -i 's/className="bg-nidra-indigo border-t border-prakash-gold\/30 pt-16 pb-8"/className="bg-gradient-to-br from-nidra-indigo via-nidra-indigo\/95 to-nidra-indigo\/90 border-t border-prakash-gold\/30 pt-16 pb-8"/' "$FOOTER_FILE"

# Also add a subtle gold overlay for extra luxury
sed -i '/<footer /a \      <div className="absolute inset-0 bg-gradient-to-t from-prakash-gold\/5 to-transparent pointer-events-none" />' "$FOOTER_FILE"
sed -i 's/<footer /<footer className="relative" /' "$FOOTER_FILE"

success "Footer updated with luxury gradient background."

# -----------------------------------------------------------------------------
# 3. Clean and rebuild
# -----------------------------------------------------------------------------
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful! Single luxury footer on all pages."
else
    error "Build failed – check logs."
    exit 1
fi

echo ""
success "🎉 Footer is now perfect:"
echo "   - Single instance across all pages"
echo "   - Luxury gradient background"
echo "   - Real‑time editable via Admin"
echo ""
echo "📦 Backups saved in $BACKUP_DIR"