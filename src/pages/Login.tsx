import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../feature/auth/authSlice";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Heading from "../components/ui/Heading";
import { userService } from "../services/userService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the redirect path from location state (if coming from ProtectedRoute)
    const from = (location.state as { from?: string })?.from || "/dashboard";
    
    // Check for expired session in URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('expired') === 'true') {
            setError('Your session has expired. Please log in again.');
            
            // Clean up the URL to prevent showing the error on refresh
            navigate('/login', { replace: true });
        }
    }, [location.search, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Email and password are required.");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        try {
            const rememberMeEl = document.getElementById('remember-me') as HTMLInputElement;
            const rememberMe = rememberMeEl?.checked || false;

            const data = await userService.login(email, password, rememberMe);

            if (!data || !data.user) {
                setError("Invalid response from server.");
                setLoading(false);
                return;
            }
            dispatch(logIn({
                user: data.user,
                token: "auth-cookie-present"
            }));

            await userService.checkCookieStatus();
            
            console.log("Login successful, navigating to:", from);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-500 peer";

    const labelClass = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 left-0 origin-top-left rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600 peer-focus:dark:text-green-500";

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-24">
            <Card className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Heading level={1} className="text-2xl font-bold dark:text-white">
                        Welcome Back
                    </Heading>
                    <p className="text-gray-600 dark:text-gray-300">
                        Sign in to continue to Expensia
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative z-0 w-full group">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="email" className={labelClass}>
                            Email
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="password" className={labelClass}>
                            Password
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 border-gray-300 rounded-bl focus:ring-green-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500 dark:text-green-400">
                            Forgot your password?
                        </Link>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </form>
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-green-600 hover:text-green-500 dark:text-green-400">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
