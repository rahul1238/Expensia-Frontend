import { useState } from "react";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import type { Transaction } from "../types/finance";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const recentTransactions: Transaction[] = [
        { id: 1, title: "Coffee Shop", amount: -4.50, date: "2025-07-18", category: "Food & Drink" },
        { id: 2, title: "Salary", amount: 3000, date: "2025-07-15", category: "Income" },
        { id: 3, title: "Grocery Store", amount: -65.75, date: "2025-07-14", category: "Groceries" },
        { id: 4, title: "Amazon", amount: -29.99, date: "2025-07-12", category: "Shopping" },
    ];

    return (
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <Heading level={1} className="text-2xl md:text-3xl font-bold dark:text-white">
                    Dashboard
                </Heading>
                <Button>Add Expense</Button>
            </div>

            {/* Dashboard Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-blue-50 dark:bg-blue-900">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Total Balance</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">$4,251.50</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Income</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">$5,240.00</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                        </div>
                    </div>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Expenses</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">$988.50</p>
                        </div>
                        <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "overview"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "transactions"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab("budget")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "budget"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                    >
                        Budget
                    </button>
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "reports"
                                ? "border-green-500 text-green-600 dark:text-green-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                    >
                        Reports
                    </button>
                </nav>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium dark:text-white">Recent Transactions</h2>
                    <Button variant="outline">View All</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Transaction
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {recentTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                                        {transaction.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {transaction.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {transaction.date}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
