#!/bin/bash
# fetch_all_code.sh - Dumps all source code files from the repository

OUTPUT_FILE="repo_code_dump.txt"
EXCLUDE_DIRS=".git|node_modules|.next|out|dist|build|coverage|.cache|.vscode|.idea"
EXCLUDE_FILES="*.png|*.jpg|*.jpeg|*.gif|*.ico|*.svg|*.woff|*.woff2|*.ttf|*.eot|*.mp4|*.webm|*.mp3|*.wav|*.zip|*.tar|*.gz|*.lock"

echo "Generating code dump into $OUTPUT_FILE ..."

# Clear or create the output file
> "$OUTPUT_FILE"

# Find all files, excluding unwanted directories and binary file extensions
find . -type f \
  -not -path "*/.git/*" \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/out/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" \
  -not -path "*/coverage/*" \
  -not -name "*.png" -not -name "*.jpg" -not -name "*.jpeg" -not -name "*.gif" \
  -not -name "*.ico" -not -name "*.svg" -not -name "*.woff" -not -name "*.woff2" \
  -not -name "*.ttf" -not -name "*.eot" -not -name "*.mp4" -not -name "*.webm" \
  -not -name "*.mp3" -not -name "*.wav" -not -name "*.zip" -not -name "*.tar" \
  -not -name "*.gz" -not -name "*.lock" -not -name "*.log" \
  -print0 | while IFS= read -r -d '' file; do

    # Skip empty files and non‑regular files (sockets, pipes, etc.)
    if [ ! -f "$file" ] || [ ! -s "$file" ]; then
      continue
    fi

    # Optional: skip binary files using the `file` command (slower but safer)
    if file "$file" | grep -qE 'executable|binary|image|audio|video|archive'; then
      echo "Skipping binary file: $file" >&2
      continue
    fi

    echo "====================================================" >> "$OUTPUT_FILE"
    echo "FILE: $file" >> "$OUTPUT_FILE"
    echo "====================================================" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Done. All code saved to $OUTPUT_FILE"