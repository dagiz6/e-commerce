"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  imageUrl = "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={imageUrl}
          alt="Authentication"
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-110 left-40 right-8backdrop-filter: blur(var(--blur-3xl)) text-white">
          <h2 className="text-6xl font-bold mb-2 ">Welcome to our<p>E-commerce App</p></h2>
          <p className="text-3xl opacity-90">
            Join thousands of users who trust our shoping system
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
