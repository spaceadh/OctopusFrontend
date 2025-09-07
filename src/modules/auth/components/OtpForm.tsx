import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

const otpSchema = z.object({
  otp: z.string().min(6, 'Please enter a 6-digit OTP').max(6, 'OTP must be 6 digits'),
});

type OtpFormProps = React.HTMLAttributes<HTMLFormElement>

export function OtpForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const otp = form.watch('otp');

  function onSubmit(data: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login'); // Redirect to the login page
    }, 1000);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${className}`} {...props}>
      <div className="space-y-2">
        <label htmlFor="otp" className="text-base-content font-medium sr-only">
          One-Time Password
        </label>
        <div className="flex justify-between gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              placeholder="-"
              className="input input-bordered h-12 w-12 rounded-xl border-2 border-base-300 focus:border-[rgb(212,175,55)] focus:ring-[rgb(212,175,55)]/40 hover:border-base-400 text-center text-lg"
              onChange={(e) => {
                const newOtp = otp.slice(0, index) + e.target.value + otp.slice(index + 1);
                form.setValue('otp', newOtp);
                if (e.target.value && index < 5) {
                  const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
                  nextInput?.focus();
                }
              }}
              value={otp[index] || ''}
              name={`otp-${index}`}
            />
          ))}
        </div>
        {form.formState.errors.otp && (
          <p className="text-sm text-red-600">{form.formState.errors.otp.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="btn w-full h-12 bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl font-medium transition-all duration-200"
        disabled={otp.length < 6 || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Verifying...</span>
          </div>
        ) : (
          'Verify'
        )}
      </button>
    </form>
  );
}