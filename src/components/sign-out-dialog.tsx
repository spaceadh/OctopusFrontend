import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/context/authStore'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, reset } = useAuthStore()

  const handleSignOut = () => {
    reset()
    // Preserve current location for redirect after sign-in
    const currentPath = location.pathname + location.search + location.hash
    navigate('/sign-in', {
      // search: `redirect=${encodeURIComponent(currentPath)}`,
      replace: true,
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
