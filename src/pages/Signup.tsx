import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../feature/auth/authSlice";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Heading from "../components/ui/Heading";
import type { AuthResponse } from "../types/auth";
import type { SignupDTO } from "../types/dto/dtos";
import { userService } from "../services/userService";
import { useTranslation } from "../hooks/useTranslation";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState<number | undefined>(undefined);
    const [occupation, setOccupation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (password !== confirmPassword) {
            setError(t('auth.passwordsMismatch'));
            return;
        }

        setLoading(true);
        try {
            const signupData: SignupDTO = {
                username,
                email,
                password,
                firstName,
                lastName,
                phoneNumber: phoneNumber || undefined,
                age: age || undefined,
                occupation: occupation || undefined
            }

            const response: AuthResponse = await userService.signup(signupData);

            if (!response || !response.user) {
                setError(t('errors.serverError'));
                setLoading(false);
                return;
            }

            dispatch(logIn({
                user: response.user,
                token: "auth-cookie-present"
            }));

            navigate('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : t('errors.unexpected'));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-500 peer";

    const labelClass = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 left-0 origin-top-left rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600 peer-focus:dark:text-green-500";

    const getLabel = (label: string, isRequired: boolean) => {
        return isRequired ? (<>{label} <span className="text-red-400">*</span></>) : label;
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-24">
            <Card className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Heading level={1} className="text-2xl font-bold dark:text-white">
                        {t('auth.createAccount')}
                    </Heading>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('auth.joinExpensia')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                    <div className="relative z-0 w-full group">
                        <input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="firstName" className={labelClass}>
                            {getLabel(t('auth.firstName'), true)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="lastName" className={labelClass}>
                            {getLabel(t('auth.lastName'), true)}
                        </label>
                    </div>

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
                            {getLabel(t('auth.email'), true)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="username" className={labelClass}>
                            {getLabel(t('auth.username'), true)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                            minLength={10}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="phoneNumber" className={labelClass}>
                            {getLabel(t('auth.phoneNumber'), true)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="age"
                            type="number"
                            value={age ?? ""}
                            onChange={(e) =>
                                setAge(e.target.value ? parseInt(e.target.value) : undefined)
                            }
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="age" className={labelClass}>
                            {getLabel(t('auth.age'), false)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="occupation" className={labelClass}>
                            {getLabel(t('auth.occupation'), false)}
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
                            {getLabel(t('auth.password'), true)}
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={inputClass}
                            placeholder=" "
                        />
                        <label htmlFor="confirmPassword" className={labelClass}>
                            {getLabel(t('auth.confirmPassword'), true)}
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
                                {t('auth.rememberMe')}
                            </label>
                        </div>
                    </div>
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                        {loading ? t('auth.creatingAccount') : t('auth.createAccount')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('auth.hasAccount')}{" "}
                        <Link to="/login" className="text-green-600 hover:text-green-500 dark:text-green-400">
                            {t('auth.signIn')}
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
