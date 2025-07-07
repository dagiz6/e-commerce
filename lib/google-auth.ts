declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export class GoogleAuth {
  private static instance: GoogleAuth;
  private isInitialized = false;
  public onCredentialResponseCallback: ((user: GoogleUser) => void) | null =
    null;

  static getInstance(): GoogleAuth {
    if (!GoogleAuth.instance) {
      GoogleAuth.instance = new GoogleAuth();
    }
    return GoogleAuth.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: this.handleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          this.isInitialized = true;
          resolve();
        } else {
          reject(new Error("Google Identity Services failed to load"));
        }
      };

      script.onerror = () => {
        reject(new Error("Failed to load Google Identity Services script"));
      };

      document.head.appendChild(script);
    });
  }

  private handleCredentialResponse(response: any) {
    try {
      // Decode the JWT token to get user info
      const payload = this.parseJwt(response.credential);
      const user: GoogleUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      if (this.onCredentialResponseCallback) {
        this.onCredentialResponseCallback(user);
      }
    } catch (error) {
      console.error("Error handling Google credential response:", error);
    }
  }

  private parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  renderButton(elementId: string, options?: any) {
    if (!this.isInitialized || !window.google) return;

    window.google.accounts.id.renderButton(document.getElementById(elementId), {
      theme: "outline",
      size: "large",
      width: "100%",
      ...options,
    });
  }
}
