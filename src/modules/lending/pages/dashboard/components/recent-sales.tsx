import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth, useAuthStore } from '@/context/authStore'

export function RecentSales() {
  const { user } = useAuthStore();

  // Function to generate random amount between min and max
  const getRandomAmount = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Mock sales data
  const salesData = [
    {
      name: user?.name || 'Olivia Martin',
      email: user?.email || 'email@example.com',
      avatar: user?.profileImageUrl || '/avatars/01.png',
      initials: user?.name ? user.name.charAt(0) + user.name.split(' ')[1]?.charAt(0) || 'OM' : 'OM',
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/avatars/02.png',
      initials: 'JL',
    },
    {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/avatars/03.png',
      initials: 'IN',
    },
    {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: '/avatars/04.png',
      initials: 'WK',
    },
    {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: '/avatars/05.png',
      initials: 'SD',
    },
  ];

  return (
    <div className="space-y-8">
      {salesData.map((sale, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full border border-base-300">
              <img src={sale.avatar} alt={sale.name} />
            </div>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-base-content">{sale.name}</p>
              <p className="text-sm text-base-content/70">{sale.email}</p>
            </div>
            <div className="font-medium text-base-content">
              KES {getRandomAmount(1000, 5000).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}