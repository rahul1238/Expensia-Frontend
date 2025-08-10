import { useState } from 'react';
import Button from './ui/Button';
import { useTranslation } from '../hooks/useTranslation';
import { userService } from '../services/userService';

/**
 * Uses backend redirect-style OAuth2 (authorization code) instead of client-side GIS.
 * Flow:
 * 1. GET /auth/google -> { authUrl: string }
 * 2. window.location.href = authUrl (relative or absolute) which begins Google OAuth redirect.
 * 3. Backend handles callback, sets cookies, then redirects back to frontend (e.g., /dashboard).
 */
export default function GoogleOAuthRedirectButton({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    try {
      setLoading(true);
      setError(null);
      const authUrl = await userService.getGoogleAuthUrl();
      if (!authUrl) {
        setError('No auth URL received');
        return;
      }
      // If backend returned relative path (e.g., /oauth2/authorization/google) just navigate.
      if (authUrl.startsWith('/')) {
        window.location.href = authUrl;
      } else {
        // Absolute URL
        window.location.href = authUrl;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start Google login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <Button
        type="button"
        disabled={loading}
        onClick={start}
        className={className + ' w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}
      >
        {loading ? t('auth.signingIn') : t('auth.continueWithGoogle')}
      </Button>
      {error && <div className="text-xs text-red-600">{error}</div>}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        {/* Direct link alternative */}
        <a href={import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/auth/google/redirect` : '/api/auth/google/redirect'} className="underline">
          {t('auth.continueWithGoogle')} ↗
        </a>
      </div>
    </div>
  );
}
