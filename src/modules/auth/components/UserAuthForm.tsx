import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/context/authStore';
import { sleep } from '@/lib/utils';

// Define validation schema with Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string;
}

// Available integrations with react-icons
const AVAILABLE_INTEGRATIONS = [
  { name: 'google', label: 'Google', icon: FcGoogle },
  { name: 'discord', label: 'Discord', icon: FaDiscord },
];

export function UserAuthForm({ className, redirectTo, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setAccessToken, setRefreshToken } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Mock successful authentication
    const mockUser = {
      email: data.email,
      name: 'John Doe',
      id: '12345',
      _id: '12345',
      language: 'en',
      theme: 'light',
      profileImageUrl: 'https://cdn-icons-png.flaticon.com/128/4333/4333609.png',
      role: 'user',
      subscriptions: ['lending', 'properties', 'sacco', 'chama'],
    };

    toast.promise(sleep(2000), {
      loading: 'Signing in...',
      success: () => {
        setIsLoading(false);
        setUser(mockUser);
        setAccessToken('mock-access-token');
        const targetPath = redirectTo || '/';
        navigate(targetPath, { replace: true });
        return `Welcome back, ${data.email}!`;
      },
      error: 'Error signing in. Please check your credentials.',
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
        <Link
          to="/forgot-password"
          className="text-sm text-[rgb(212,175,55)] hover:text-[rgb(212,175,55)]/90 absolute right-0 top-0"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="btn w-full h-12 bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl font-medium transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            <span>Sign in</span>
          </div>
        )}
      </button>
      <div className="divider text-sm text-base-content/50">OR</div>
      <div className="flex flex-row gap-3 justify-center">
        {AVAILABLE_INTEGRATIONS.map(({ name, label, icon: Icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success(`Initiating login with ${label}`)}
            className="btn btn-square bg-base-200 hover:bg-base-300 rounded-lg p-2"
            disabled={isLoading}
            aria-label={`Login with ${label}`}
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