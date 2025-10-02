# GitHub Secrets Setup Guide

## Required Secrets for GitHub Actions

Go to your GitHub repository: `https://github.com/rahul1238/Expensia-Frontend`

### Steps:
1. Navigate to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add each of the following secrets:

### Secret 1: VITE_API_URL
```
Name: VITE_API_URL
Value: https://expensia-backend-979056550483.us-central1.run.app/api
```

### Secret 2: VITE_GOOGLE_CLIENT_ID  
```
Name: VITE_GOOGLE_CLIENT_ID
Value: 354840571894-8ccrt1ahq70utr229itros8e94o9cqv2.apps.googleusercontent.com
```

### Secret 3: FIREBASE_SERVICE_ACCOUNT
```
Name: FIREBASE_SERVICE_ACCOUNT
Value: [Firebase Service Account JSON - see instructions below]
```

## How to Get Firebase Service Account JSON:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `expensia-frontend`
3. Go to **Project Settings** → **Service accounts**
4. Click **"Generate new private key"**
5. Download the JSON file
6. Copy the entire JSON content and paste as secret value

## Verify Setup:
After adding secrets, push any change to `main` or `deployment_config` branch and the workflow will automatically deploy your app.

## Manual Deploy (Alternative):
If you prefer manual deployment:
```bash
npm run deploy
```