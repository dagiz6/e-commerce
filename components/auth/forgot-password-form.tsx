"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Mail, Send, CheckCircle } from "lucide-react";
import { authApi, ForgotPasswordData } from "@/lib/api";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      forgotPasswordMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Check your email
          </h3>
          <p className="text-gray-600">
            We've sent a password reset link to{" "}
            <strong>{formData.email}</strong>
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
          >
            Back to Sign In
          </Link>
          <button
            onClick={() => setIsSuccess(false)}
            className="block w-full text-blue-600 hover:text-blue-500 py-2 transition-colors"
          >
            Try different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {forgotPasswordMutation.isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Reset Link</span>
          </>
        )}
      </button>

      {/* Back to Sign In Link */}
      <div className="text-center">
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}
