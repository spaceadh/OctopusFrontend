import { useSubscriptionStore } from '@/context/subscriptionStore'
import { ReactNode } from 'react'

type Product = 'PROPERTIES' | 'SACCO' | 'CHAMA' | 'LENDING'

interface SubscriptionGuardProps {
  product: Product
  children: ReactNode
}

export const SubscriptionGuard = ({
  product,
  children,
}: SubscriptionGuardProps) => {
  const { hasSubscription } = useSubscriptionStore()

  // In a real app, you might want to fetch subscriptions if they are not present.
  // For this scaffold, we assume they are already loaded.

  if (!hasSubscription(product)) {
    // You could redirect to an unauthorized page here
    // return <Navigate to="/unauthorized" />
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-destructive">Not Authorized</h1>
        <p>You do not have a subscription for the {product.toLowerCase()} product.</p>
      </div>
    )
  }

  return <>{children}</>
}