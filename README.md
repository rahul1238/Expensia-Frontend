# Expensia Frontend

A modern financial management application built with React, TypeScript, and Vite.

## Features

- 💰 Expense tracking and management
- 📊 Financial analytics and reporting  
- 🌐 Multi-language support (12 languages)
- 🎨 Light/Dark theme switching
- 🔒 Secure Google OAuth authentication
- � Gmail transaction import
- 🤖 AI-powered transaction categorization
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **UI Components**: Headless UI, Heroicons
- **Charts**: Chart.js, React Chart.js 2
- **Internationalization**: React i18next

## Internationalization

The application supports 12 languages:
- English, Hindi, Spanish, French, German, Italian
- Portuguese, Chinese, Japanese, Korean, Arabic, Russian

Language switching is available in the user interface, with automatic detection of browser locale as default.

## Prerequisites

- Node.js 18+
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahul1238/Expensia-Frontend.git
   cd Expensia-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Configure the required environment variables in `.env`

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## Deployment

### Firebase Hosting

The application is configured for deployment on Firebase Hosting with custom domain support.

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `VITE_FIREBASE_CONFIG` - Firebase configuration object

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
