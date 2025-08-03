import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userService } from '../services/userService';
import { transactionService } from '../services/transactionService';
import { updateUser } from '../feature/auth/authSlice';
import type { RootState } from '../app/store';

interface PasswordChangeForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface UserUpdateForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number | undefined;
}

interface AccountStatistics {
    totalTransactions: number;
    totalIncome: number;
    totalExpenses: number;
    isLoading: boolean;
}

const Profile: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [profileForm, setProfileForm] = useState<UserUpdateForm>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        age: user?.age,
    });

    const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [profileError, setProfileError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

    const [statistics, setStatistics] = useState<AccountStatistics>({
        totalTransactions: 0,
        totalIncome: 0,
        totalExpenses: 0,
        isLoading: true,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setStatistics(prev => ({ ...prev, isLoading: true }));
                const response = await transactionService.getAllTransactions();
                const transactions = response.transactions || [];

                const stats = transactions.reduce(
                    (acc, transaction) => {
                        acc.totalTransactions += 1;
                        const amount = Number(transaction.amount) || 0;

                        if (transaction.type === 'credit') {
                            acc.totalIncome += amount;
                        } else if (transaction.type === 'debit') {
                            acc.totalExpenses += amount;
                        }

                        return acc;
                    },
                    { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 }
                );

                setStatistics({
                    ...stats,
                    isLoading: false,
                });
            } catch (error) {
                console.error('Failed to fetch transaction statistics:', error);
                setStatistics(prev => ({ ...prev, isLoading: false }));
            }
        };

        fetchStatistics();
    }, []);

    const refreshStatistics = async () => {
        try {
            setStatistics(prev => ({ ...prev, isLoading: true }));
            const response = await transactionService.getAllTransactions();
            const transactions = response.transactions || [];

            const stats = transactions.reduce(
                (acc, transaction) => {
                    acc.totalTransactions += 1;
                    const amount = Number(transaction.amount) || 0;

                    if (transaction.type === 'credit') {
                        acc.totalIncome += amount;
                    } else if (transaction.type === 'debit') {
                        acc.totalExpenses += amount;
                    }

                    return acc;
                },
                { totalTransactions: 0, totalIncome: 0, totalExpenses: 0 }
            );

            setStatistics({
                ...stats,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to refresh transaction statistics:', error);
            setStatistics(prev => ({ ...prev, isLoading: false }));
        }
    };

    const getUserInitials = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        }
        if (user?.firstName) {
            return user.firstName.charAt(0).toUpperCase();
        }
        return 'U';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({
            ...prev,
            [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value
        }));
        setProfileError(null);
        setProfileSuccess(null);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
        setPasswordError(null);
        setPasswordSuccess(null);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsUpdatingProfile(true);
            setProfileError(null);

            if (!profileForm.firstName.trim()) {
                setProfileError('First name is required');
                return;
            }

            if (!profileForm.email.trim()) {
                setProfileError('Email is required');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(profileForm.email)) {
                setProfileError('Please enter a valid email address');
                return;
            }

            const updatedUser = await userService.updateProfile(profileForm);
            dispatch(updateUser(updatedUser));
            setProfileSuccess('Profile updated successfully!');
            setIsEditingProfile(false);

        } catch (error) {
            setProfileError(error instanceof Error ? error.message : 'Failed to update profile');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsUpdatingPassword(true);
            setPasswordError(null);

            if (!passwordForm.currentPassword) {
                setPasswordError('Current password is required');
                return;
            }

            if (!passwordForm.newPassword) {
                setPasswordError('New password is required');
                return;
            }

            if (passwordForm.newPassword.length < 6) {
                setPasswordError('New password must be at least 6 characters long');
                return;
            }

            if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                setPasswordError('New passwords do not match');
                return;
            }

            await userService.changePassword(
                passwordForm.currentPassword,
                passwordForm.newPassword
            );

            setPasswordSuccess('Password changed successfully!');
            setIsChangingPassword(false);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

        } catch (error) {
            setPasswordError(error instanceof Error ? error.message : 'Failed to change password');
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        setProfileForm({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            age: user?.age,
        });
        setProfileError(null);
        setProfileSuccess(null);
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        setPasswordError(null);
        setPasswordSuccess(null);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    {/* Profile Header */}
                    <div className="relative px-6 pb-6">
                        {/* Avatar */}
                        <div className="absolute -top-16 left-6">
                            <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                    {getUserInitials()}
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="pt-20 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6v12a2 2 0 01-2 2H10a2 2 0 01-2-2V7z" />
                                    </svg>
                                    Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 sm:mt-0 flex space-x-3">
                                {!isEditingProfile && (
                                    <button
                                        onClick={() => setIsEditingProfile(true)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Profile
                                    </button>
                                )}
                                {!isChangingPassword && (
                                    <button
                                        onClick={() => setIsChangingPassword(true)}
                                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Change Password
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                            </h2>
                        </div>

                        {isEditingProfile ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                {profileError && (
                                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                                        {profileError}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={profileForm.firstName}
                                            onChange={handleProfileChange}
                                            placeholder="Enter your first name"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={profileForm.lastName}
                                            onChange={handleProfileChange}
                                            placeholder="Enter your last name"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileForm.email}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your email address"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={profileForm.phoneNumber}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your phone number"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={profileForm.age || ''}
                                        onChange={handleProfileChange}
                                        placeholder="Enter your age"
                                        min="1"
                                        max="120"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isUpdatingProfile}
                                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {isUpdatingProfile ? 'Updating...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                {profileSuccess && (
                                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                        {profileSuccess}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">First Name</label>
                                        <p className="mt-1 text-gray-900 dark:text-white">{user.firstName}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</label>
                                        <p className="mt-1 text-gray-900 dark:text-white">{user.lastName || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{user.phoneNumber || 'Not provided'}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                                    <p className="mt-1 text-gray-900 dark:text-white">{user.age || 'Not provided'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Security Settings
                            </h2>
                        </div>

                        {isChangingPassword ? (
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                {passwordError && (
                                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                                        {passwordError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Current Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordForm.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your current password"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        New Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your new password"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Confirm New Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm your new password"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isUpdatingPassword}
                                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {isUpdatingPassword ? 'Changing...' : 'Change Password'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelPasswordChange}
                                        className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                {passwordSuccess && (
                                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                        {passwordSuccess}
                                    </div>
                                )}

                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Password is secure</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Last changed: Never (or date if available)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-medium text-gray-900 dark:text-white">Password Security Tips:</h3>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>• Use at least 8 characters</li>
                                        <li>• Include uppercase and lowercase letters</li>
                                        <li>• Add numbers and special characters</li>
                                        <li>• Don't reuse passwords from other sites</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Account Overview
                        </h2>
                        <button
                            onClick={refreshStatistics}
                            disabled={statistics.isLoading}
                            className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors disabled:opacity-50"
                            title="Refresh statistics"
                        >
                            <svg
                                className={`w-4 h-4 mr-1 ${statistics.isLoading ? 'animate-spin' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            {statistics.isLoading ? (
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    <div className="animate-pulse">---</div>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {statistics.totalTransactions.toLocaleString()}
                                </div>
                            )}
                            <div className="text-sm text-gray-600 dark:text-gray-300">Total Transactions</div>
                        </div>

                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            {statistics.isLoading ? (
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    <div className="animate-pulse">---</div>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(statistics.totalIncome)}
                                </div>
                            )}
                            <div className="text-sm text-gray-600 dark:text-gray-300">Total Income</div>
                        </div>

                        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            {statistics.isLoading ? (
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    <div className="animate-pulse">---</div>
                                </div>
                            ) : (
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {formatCurrency(statistics.totalExpenses)}
                                </div>
                            )}
                            <div className="text-sm text-gray-600 dark:text-gray-300">Total Expenses</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
