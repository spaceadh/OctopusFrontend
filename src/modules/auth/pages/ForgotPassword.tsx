import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../layout/AuthLayout'
import { ForgotPasswordForm } from '../components/ForgotPassword'

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-200 p-6">
        <div className="card-body">
          <h2 className="card-title text-lg font-serif text-base-content">Forgot Password</h2>
          <p className="text-base-content/70 mb-4">
            Enter your registered email and we will send you a link to reset your password.
          </p>
          <ForgotPasswordForm />
          <div className="mt-4 text-center text-sm text-base-content/70">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 underline underline-offset-4"
            >
              Sign up
            </Link>
            .
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}