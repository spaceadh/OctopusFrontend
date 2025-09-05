import { create } from 'zustand'

type Product = 'PROPERTIES' | 'SACCO' | 'CHAMA' | 'LENDING'

interface SubscriptionState {
  subscriptions: Product[]
  setSubscriptions: (subscriptions: Product[]) => void
  clearSubscriptions: () => void
  hasSubscription: (product: Product) => boolean
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [],
  setSubscriptions: (subscriptions) => set({ subscriptions }),
  clearSubscriptions: () => set({ subscriptions: [] }),
  hasSubscription: (product) => get().subscriptions.includes(product),
}))
