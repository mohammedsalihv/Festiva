import React from "react";
import { Mail, Lock } from "lucide-react";

const AdminLogin: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl flex-col-reverse items-center gap-10  p-8  md:flex-row md:justify-between">
        {/* Left side: Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="mb-2 text-2xl font-semibold">Welcome to Dashboard</h2>
          <p className="mb-6 text-sm text-gray-500">
            Unauthorized access is strictly prohibited. Only authorized personnel should proceed.
          </p>
          <form className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 py-3 pl-10 pr-3 text-sm focus:border-black focus:outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 py-3 pl-10 pr-3 text-sm focus:border-black focus:outline-none"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right side: Illustration */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/admin-login-illustration.png"
            alt="Login Illustration"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
