"use client";

import { useEffect, useRef } from "react";
import { GoogleAuth, GoogleUser } from "@/lib/google-auth";

interface GoogleSignInButtonProps {
  onSuccess: (user: GoogleUser) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
  disabled,
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (disabled || isInitializedRef.current) return;

    const initializeGoogleAuth = async () => {
      try {
        const googleAuth = GoogleAuth.getInstance();

        // Set the callback for credential response
        googleAuth.onCredentialResponseCallback = onSuccess;

        // Initialize Google Auth
        await googleAuth.initialize();

        // Render the button
        if (buttonRef.current) {
          googleAuth.renderButton("google-signin-button", {
            theme: "outline",
            size: "large",
            width: buttonRef.current.offsetWidth,
            text: "continue_with",
          });
        }

        isInitializedRef.current = true;
      } catch (error) {
        onError(
          error instanceof Error
            ? error.message
            : "Failed to initialize Google Sign-In"
        );
      }
    };

    initializeGoogleAuth();
  }, [onSuccess, onError, disabled]);

  return (
    <div className="w-full">
      <div
        ref={buttonRef}
        id="google-signin-button"
        className={`w-full ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        style={{ minHeight: "44px" }}
      />
    </div>
  );
}
