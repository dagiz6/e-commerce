import AuthLayout from "@/components/auth/auth-layout";
import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Join us and start your journey today"
      imageUrl="https://images.pexels.com/photos/27035625/pexels-photo-27035625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <SignupForm />
    </AuthLayout>
  );
}
