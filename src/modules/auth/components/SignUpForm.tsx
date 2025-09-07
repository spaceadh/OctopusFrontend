import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
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
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaDiscord } from 'react-icons/fa'

const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === '' ? 'Please enter your email' : undefined,
    }),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const AVAILABLE_INTEGRATIONS = [
    { name: 'google', label: 'Google', icon: FcGoogle },
    { name: 'discord', label: 'Discord', icon: FaDiscord },
  ];

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
      <div className="space-y-2 relative">
        <label htmlFor="password" className="text-base-content font-medium">
          Password *
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            className="input input-bordered h-12 rounded-xl border-2 border-base-300 focus:border-[rgb(212,175,55)] focus:ring-[rgb(212,175,55)]/40 hover:border-base-400 w-full pr-12"
            {...form.register('password')}
          />
          <button
            type="button"
            className="btn btn-ghost btn-sm absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-base-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="h-4 w-4 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.263 0 2.463.242 3.555.682M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 4.418-3.582 8-8 8M9 9l6 6m0-6l-6 6" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2 relative">
        <label htmlFor="confirmPassword" className="text-base-content font-medium">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="********"
            className="input input-bordered h-12 rounded-xl border-2 border-base-300 focus:border-[rgb(212,175,55)] focus:ring-[rgb(212,175,55)]/40 hover:border-base-400 w-full pr-12"
            {...form.register('confirmPassword')}
          />
          <button
            type="button"
            className="btn btn-ghost btn-sm absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-base-200"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <svg className="h-4 w-4 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.263 0 2.463.242 3.555.682M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 4.418-3.582 8-8 8M9 9l6 6m0-6l-6 6" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
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
            <span>Creating Account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>
      <div className="divider text-sm text-base-content/50">OR</div>
      <div className="flex flex-row gap-3 justify-center">
        {[
          { name: 'google', label: 'Google', icon: FcGoogle },
          { name: 'discord', label: 'Discord', icon: FaDiscord },
        ].map(({ name, label, icon: Icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log(`Initiating signup with ${label}`)}
            className="btn btn-square bg-base-200 hover:bg-base-300 rounded-lg p-2"
            disabled={isLoading}
            aria-label={`Sign up with ${label}`}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Icon className="w-8 h-8" />
            )}
          </motion.button>
        ))}
      </div>
    </form>
  );
}