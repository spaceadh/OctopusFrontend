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
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-base tracking-tight'>
            Two-factor Authentication
          </CardTitle>
          <CardDescription>
            Please enter the authentication code. <br /> We have sent the
            authentication code to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Do you want to login into your account {' '}
            <Link
              to='/login'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign In
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}