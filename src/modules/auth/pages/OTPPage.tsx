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
import { OtpForm } from '../components/OtpForm'

export default function OTPPage() {
  return (
    <AuthLayout>
      <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-200 p-6">
        <div className="card-body">
          <h2 className="card-title text-base font-serif text-base-content">Two-factor Authentication</h2>
          <p className="text-base-content/70 mb-4">
            Please enter the authentication code. We have sent the authentication code to your email.
          </p>
          <OtpForm />
          <div className="mt-4 text-center text-sm text-base-content/70">
            Do you want to login into your account?{' '}
            <Link
              to="/login"
              className="text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 underline underline-offset-4"
            >
              Sign In
            </Link>
            .
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}