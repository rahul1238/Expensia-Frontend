#!/bin/bash

# Script to update all translation files to match en.json structure
# Run this from the project root directory

# Set script to exit on error
set -e

# Print header
echo "============================================="
echo "Updating translation files for Expensia-Frontend"
echo "============================================="

# Check if node is available
if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
fi

# Create backup directory
mkdir -p src/i18n/locales/backup

# Get all language files (excluding template files like *_updated, *_fixed)
echo "Creating backups of existing files..."
find src/i18n/locales -name "*.json" ! -name "*_updated.json" ! -name "*_fixed.json" ! -name "*_old.json" ! -name "*_complete.json" | while read file; do
    filename=$(basename "$file")
    cp "$file" "src/i18n/locales/backup/${filename%.json}_backup.json"
    echo "✓ Backed up $filename"
done

echo ""
echo "Files backed up to src/i18n/locales/backup/"
echo ""

# Run the update_locale_files.js script
echo "Running update_locale_files.js to synchronize translation keys..."
node update_locale_files.js

echo "============================================="
echo "Translation files update complete!"
echo "============================================="

echo "Note: While the script has added all missing keys to each locale file,"
echo "you may need to manually translate the English values to the appropriate language."
echo "Search for English text in non-English locale files to find untranslated content."

echo ""
echo "Key sections that were updated:"
echo "- navigation: addTransaction, manageTransactions, viewAllTransactions, etc."
echo "- home: heroTitle, heroSubtitle, keyFeatures, etc."
echo "- common: companyDescription, company, aboutUs, etc."
echo "- auth: signInToContinue, joinExpensia, etc."
echo "- dashboard: recentTransactions, viewAll, thisMonth, etc."
echo "- transactions: addYourFirstTransaction, loadingTransactions, etc."
echo "- profile: editProfile, saveChanges, accountSettings"
echo "- errors: All error keys (required, invalidEmail, unexpected, etc.)"
