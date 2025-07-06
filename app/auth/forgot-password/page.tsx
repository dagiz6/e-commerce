import AuthLayout from "@/components/auth/auth-layout";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="We'll help you get back into your account"
      imageUrl="https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
