const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface GoogleAuthData {
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
    role: "vendor" | "admin" | "client";
  };
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response.json();
  },

  googleAuth: async (data: GoogleAuthData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Google authentication failed");
    }

    return response.json();
  },

  forgotPassword: async (
    data: ForgotPasswordData
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Password reset failed");
    }

    return response.json();
  },

  verifyToken: async (token: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    return response.json();
  },
};
