#!/bin/bash

# Script to update all translation files to match en.json structure
# Run this from the project root directory

echo "Updating translation files to match en.json structure..."

# List of language codes (excluding 'en' and already updated 'hi', 'es', 'fr')
LANGUAGES=("de" "it" "pt" "zh" "ja" "ko" "ar" "ru")

# Create backup directory
mkdir -p src/i18n/locales/backup

echo "Creating backups of existing files..."
for lang in "${LANGUAGES[@]}"; do
    if [ -f "src/i18n/locales/${lang}.json" ]; then
        cp "src/i18n/locales/${lang}.json" "src/i18n/locales/backup/${lang}_backup.json"
        echo "✓ Backed up ${lang}.json"
    fi
done

echo ""
echo "Files backed up to src/i18n/locales/backup/"
echo ""
echo "Next steps:"
echo "1. Update each language file manually using the en.json structure as reference"
echo "2. Or use translation services to translate the missing keys from en.json"
echo "3. Ensure all language files have the same key structure"
echo ""
echo "Missing keys should be added to these sections in each language file:"
echo "- navigation: home, transactions, budget, reports, features, about, team, contact, signIn, login, signup, logout, darkMode"
echo "- home: All keys from the home section (heroTitle, heroSubtitle, keyFeatures, etc.)"
echo "- common: All additional keys (companyDescription, company, aboutUs, etc.)"
echo "- auth: All additional keys (welcomeBack, createAccount, signInToContinue, etc.)"
echo "- dashboard: recentTransactions, viewAll, thisMonth, lastMonth, overview"
echo "- transactions: income, expense, all, today, thisWeek, thisMonth, filterBy"
echo "- profile: editProfile, saveChanges, accountSettings"
echo "- errors: All error keys (required, invalidEmail, passwordTooShort, etc.)"
