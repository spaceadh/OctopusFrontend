import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { sleep, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const forgotPasswordSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
})

export function ForgotPasswordForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true);
    console.log(data);

    toast.promise(sleep(2000), {
      loading: 'Sending email...',
      success: () => {
        setIsLoading(false);
        form.reset();
        navigate('/otp', { state: { email: data.email } });
        return `Email sent to ${data.email}`;
      },
      error: 'Error sending email.',
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${className}`} {...props}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-base-content font-medium">
          Email *
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="input input-bordered h-12 rounded-xl border-2 border-base-300 focus:border-[rgb(212,175,55)] focus:ring-[rgb(212,175,55)]/40 hover:border-base-400 w-full"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="btn w-full h-12 bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl font-medium transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Sending...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            <span>Continue</span>
          </div>
        )}
      </button>
    </form>
  );
}