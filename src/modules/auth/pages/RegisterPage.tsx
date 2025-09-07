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
import { SignUpForm } from '../components/SignUpForm'

export default function SignUp() {
  return (
    <AuthLayout>
      <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-200 p-6">
        <div className="card-body">
          <h2 className="card-title text-lg font-serif text-base-content">Create an account</h2>
          <p className="text-base-content/70 mb-4">
            Enter your email and password to create an account.{' '}
            <Link
              to="/login"
              className="text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
          <SignUpForm />
          <div className="mt-4 text-center text-sm text-base-content/70">
            By creating an account, you agree to our{' '}
            <Link
              to="/terms"
              className="text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 underline underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}