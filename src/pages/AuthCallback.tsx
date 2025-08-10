import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logIn } from '../feature/auth/authSlice';
import { userService } from '../services/userService';
import Heading from '../components/ui/Heading';

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const error = params.get('error');
    (async () => {
      try {
        if (success === 'true') {
          const user = await userService.getCurrentUser();
          if (user) {
            dispatch(logIn({ user, token: 'auth-cookie-present' }));
            navigate('/dashboard', { replace: true });
            return;
          }
        }
        if (error) {
          navigate(`/login?oauthError=${error}`, { replace: true });
          return;
        }
        navigate('/login', { replace: true });
      } catch {
        navigate('/login?oauthError=callback_failed', { replace: true });
      }
    })();
  }, [location.search, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Heading level={2}>Finishing sign in…</Heading>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto" />
      </div>
    </div>
  );
}
