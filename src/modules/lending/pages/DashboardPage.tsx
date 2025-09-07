import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/context/authStore';
import { useLendingBoundStore } from '@/modules/lending/context/lending-store';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { RecentSales } from '@/modules/lending/pages/dashboard/components/recent-sales';
import { Overview } from '@/modules/lending/pages/dashboard/components/overview';

export function Dashboard() {
  const { user } = useAuthStore();
  const { lendingStatsData, isLoading, error } = useLendingBoundStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgb(212,175,55)]/20 p-4 sm:p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
            <Skeleton className="h-10 w-32 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
          </div>
          <div className="tabs tabs-boxed bg-base-200 rounded-xl p-1">
            <Skeleton className="tab h-8 w-24 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
            <Skeleton className="tab h-8 w-24 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
            <Skeleton className="tab h-8 w-24 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
            <Skeleton className="tab h-8 w-24 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
                <div className="card-body space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24 bg-[rgb(212,175,55)]/30 animate-pulse" />
                    <Skeleton className="h-4 w-4 bg-[rgb(212,175,55)]/30 animate-pulse" />
                  </div>
                  <Skeleton className="h-8 w-32 bg-[rgb(212,175,55)]/30 animate-pulse" />
                  <Skeleton className="h-3 w-48 bg-[rgb(212,175,55)]/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 col-span-1 lg:col-span-4">
              <div className="card-body">
                <Skeleton className="h-6 w-32 bg-[rgb(212,175,55)]/30 animate-pulse" />
                <Skeleton className="h-64 w-full bg-[rgb(212,175,55)]/30 animate-pulse" />
              </div>
            </div>
            <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 col-span-1 lg:col-span-3">
              <div className="card-body space-y-2">
                <Skeleton className="h-6 w-32 bg-[rgb(212,175,55)]/30 animate-pulse" />
                <Skeleton className="h-4 w-48 bg-[rgb(212,175,55)]/30 animate-pulse" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-9 w-9 rounded-full bg-[rgb(212,175,55)]/30 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24 bg-[rgb(212,175,55)]/30 animate-pulse" />
                      <Skeleton className="h-3 w-36 bg-[rgb(212,175,55)]/30 animate-pulse" />
                    </div>
                    <Skeleton className="h-4 w-20 bg-[rgb(212,175,55)]/30 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgb(212,175,55)]/20 flex items-center justify-center p-4">
        <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 p-6">
          <h3 className="text-lg font-medium text-base-content">Error</h3>
          <p className="text-base-content/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(212,175,55)]/20 p-4 sm:p-6 md:p-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content font-serif">Dashboard</h1>
          <button className="btn h-10 bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl">
            Download
          </button>
        </div>
        <div className="tabs tabs-boxed bg-base-200 rounded-xl p-1">
          <button
            className={`tab tab-lifted ${activeTab === 'overview' ? 'tab-active bg-[rgb(212,175,55)] text-white' : 'text-base-content'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button className="tab tab-lifted text-base-content/50 cursor-not-allowed" disabled>
            Analytics
          </button>
          <button className="tab tab-lifted text-base-content/50 cursor-not-allowed" disabled>
            Reports
          </button>
          <button className="tab tab-lifted text-base-content/50 cursor-not-allowed" disabled>
            Notifications
          </button>
        </div>
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-base-content">Total Revenue</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-base-content/50"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-base-content">$45,231.89</div>
                  <p className="text-xs text-base-content/70">+20.1% from last month</p>
                </div>
              </div>
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-base-content">Subscriptions</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-base-content/50"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-base-content">+2350</div>
                  <p className="text-xs text-base-content/70">+180.1% from last month</p>
                </div>
              </div>
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-base-content">Sales</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-base-content/50"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-base-content">+12,234</div>
                  <p className="text-xs text-base-content/70">+19% from last month</p>
                </div>
              </div>
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-base-content">Active Now</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-base-content/50"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-base-content">+573</div>
                  <p className="text-xs text-base-content/70">+201 since last hour</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 col-span-1 lg:col-span-4">
                <div className="card-body">
                  <h2 className="card-title text-lg font-medium text-base-content">Overview</h2>
                  <div className="ps-2">
                    <Overview />
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 col-span-1 lg:col-span-3">
                <div className="card-body">
                  <h2 className="card-title text-lg font-medium text-base-content">Recent Sales</h2>
                  <p className="text-base-content/70 text-sm">You made 265 sales this month.</p>
                  <RecentSales />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}