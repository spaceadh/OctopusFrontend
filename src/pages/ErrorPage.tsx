import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error && typeof error === 'object' && 
    ('statusText' in error || 'message' in error) ? 
    (error as any).statusText || (error as any).message : 'Unknown error';

  return (
    <div className="min-h-screen bg-[rgb(212,175,55)]/20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">Oops!</h1>
        <p className="text-lg sm:text-xl text-base-content/70 mb-6">Sorry, an unexpected error has occurred.</p>
        <p className="text-sm sm:text-base text-base-content/50 italic mb-6">
          <span aria-live="polite">{errorMessage}</span>
        </p>
        <Link
          to="/"
          className="btn bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl px-6 py-2 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}