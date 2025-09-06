import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../feature/auth/authSlice';
import { userService } from '../services/userService';
import Button from './ui/Button';
import { useTranslation } from '../hooks/useTranslation';

interface GoogleWindow extends Window { google?: any }

const SCRIPT_ID = 'google-identity-services';
const SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

export default function GoogleSignInButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(true);
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  const initializeGoogle = useCallback(() => {
    const w = window as GoogleWindow;
    if (!w.google || !clientId) return;
    try {
      w.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        ux_mode: 'popup'
      });
      if (divRef.current) {
        w.google.accounts.id.renderButton(divRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
          shape: 'rectangular'
        });
        setShowFallback(false);
      }
    } catch (err) {
      setError('Google init failed');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return;
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.id = SCRIPT_ID;
      script.onload = initializeGoogle;
  script.onerror = () => setError('Failed to load Google script');
      document.head.appendChild(script);
    } else {
      initializeGoogle();
    }
  }, [clientId, initializeGoogle]);

  const handleCredentialResponse = useCallback(async (response: any) => {
    if (!response?.credential || loading) return;
    setLoading(true);
    setError(null);
    try {
      const auth = await userService.loginWithGoogle(response.credential);
      if (auth?.user) {
        dispatch(logIn({ user: auth.user, token: 'auth-cookie-present' }));
        navigate('/dashboard');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, loading]);

  if (!clientId) return null;

  return (
    <div className="space-y-2 mt-4">
      <div ref={divRef} className="flex justify-center" />
  {loading && <div className="text-sm text-gray-500 dark:text-gray-400">{t('auth.signingIn')}</div>}
  {error && <div className="text-xs text-red-600" role="alert">{error}</div>}
      {showFallback && (
        <Button
          type="button"
          onClick={() => {
            const w = window as GoogleWindow;
            if (w.google && clientId) {
              w.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed()) {
                  setError('Google prompt not displayed');
                }
              });
            }
          }}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {t('auth.continueWithGoogle')}
        </Button>
      )}
    </div>
  );
}
