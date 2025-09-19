# Firebase Deployment Guide

## Prerequisites
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Create a Firebase project at https://console.firebase.google.com

## Setup
1. Update `.firebaserc` with your Firebase project ID
2. Build the project: `npm run build`
3. Deploy: `npm run deploy`

## Environment Variables
Make sure to set your environment variables:
- `VITE_API_URL`: Your backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## Deployment Commands
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to Firebase
- `firebase serve` - Test locally with Firebase hosting
- `firebase deploy --only hosting` - Deploy only hosting

## Domain Configuration
After deployment, you can:
1. Set up a custom domain in Firebase Console
2. Configure SSL certificates (automatically provided)
3. Set up redirects if needed

## Notes
- The app uses client-side routing, so all routes are redirected to `index.html`
- Static assets are cached for 1 year for optimal performance
- Service worker files are not cached to ensure updates