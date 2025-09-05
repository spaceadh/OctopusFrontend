import { ReactNode } from 'react'

// This will be used to wrap the app and provide authentication context.
// For now, it's a simple placeholder.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}
