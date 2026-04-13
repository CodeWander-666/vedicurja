#!/bin/bash
# push-to-origin.sh - Stage, commit, and push changes to origin

set -e

echo "🚀 Preparing to push changes to origin..."

# Check if we are in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ Not inside a git repository. Aborting."
    exit 1
fi

# Get current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
    echo "✅ No changes to commit. Working tree clean."
    echo "👉 Nothing to push."
    exit 0
fi

# Show status
echo "📋 Current changes:"
git status --short

# Prompt for commit message
read -p "💬 Enter commit message (or press Enter for default): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update: $(date +'%Y-%m-%d %H:%M:%S')"
    echo "ℹ️  Using default message: '$COMMIT_MSG'"
fi

# Stage all changes
echo "➕ Staging all changes..."
git add -A

# Commit
echo "💾 Committing..."
git commit -m "$COMMIT_MSG"

# Push
echo "📤 Pushing to origin/$BRANCH..."
git push origin "$BRANCH"

echo "✅ Successfully pushed to origin/$BRANCH"