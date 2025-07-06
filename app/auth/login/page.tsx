import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      imageUrl="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <LoginForm />
    </AuthLayout>
  );
}
