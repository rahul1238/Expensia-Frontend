# Expensia Frontend

A modern financial management application built with React, TypeScript, and Vite.

## Features

- 💰 Expense tracking and management
- 📊 Financial analytics and reporting
- 🌐 Multi-language support (12 languages)
- 🎨 Light/Dark theme switching
- 🔒 Secure authentication
- 📱 Responsive design

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Internationalization (i18n)

This project supports 12 languages:
- English, Hindi, Spanish, French, German, Italian
- Portuguese, Chinese, Japanese, Korean, Arabic, Russian

For detailed information on working with translations, see [I18N_GUIDE.md](./I18N_GUIDE.md).

### Maintaining Translations

We've implemented an automated system to ensure translation key consistency across all language files:

```bash
# Run this to update all locale files with any missing keys
./update_translations.sh
```

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/rahul1238/Expensia-Frontend.git
cd Expensia-Frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint the code
- `npm run preview` - Preview the production build
- `./update_translations.sh` - Update translation files
