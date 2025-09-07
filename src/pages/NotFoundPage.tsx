import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5 seconds countdown

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 5000); // Redirect after 5 seconds

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => prevCount - 1);
    }, 1000);

    // Cleanup timers when component unmounts
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[rgb(212,175,55)]/20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">404 - Not Found</h1>
        <p className="text-lg sm:text-xl text-base-content/70 mb-6">The page you are looking for does not exist.</p>
        <p className="text-base text-base-content/70 mb-6">
          Redirecting to login page in {countdown} seconds...
        </p>
        <Link
          to="/"
          className="btn bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl px-6 py-2 transition-colors mr-4"
        >
          Go to Homepage
        </Link>
        <Link
          to="/login"
          className="btn bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl px-6 py-2 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}