import { Link, useNavigate } from 'react-router-dom'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/modules/lending/lending-components/sign-out-dialog'
import { useAuthStore } from '@/context/authStore'
import { useState } from 'react'

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, reset } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <div className="dropdown dropdown-end">
        <button className="btn btn-ghost btn-circle h-8 w-8">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={user?.profileImageUrl || '/avatars/01.png'} alt={user?.name || 'User'} />
            </div>
          </div>
        </button>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56">
          <li className="mb-2">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-base-content">{user?.name || 'User'}</span>
              <span className="text-base-content/70 text-xs">{user?.email || 'user@example.com'}</span>
            </div>
          </li>
          <li>
            <Link to="/settings" className="text-base-content hover:bg-base-200">
              Profile
              {/* <span className="ml-auto text-xs text-base-content/50">⇧⌘P</span> */}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-base-content hover:bg-base-200">
              Billing
              {/* <span className="ml-auto text-xs text-base-content/50">⌘B</span> */}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-base-content hover:bg-base-200">
              Settings
              {/* <span className="ml-auto text-xs text-base-content/50">⌘S</span> */}
            </Link>
          </li>
          <li>
            <a className="text-base-content hover:bg-base-200">New Team</a>
          </li>
          <li className="mt-2 pt-2 border-t border-base-300">
            <button
              onClick={() => setOpen(true)}
              className="text-base-content hover:bg-base-200"
            >
              Sign out
              {/* <span className="ml-auto text-xs text-base-content/50">⇧⌘Q</span> */}
            </button>
          </li>
        </ul>
      </div>
      <dialog open={open} className="modal">
        <div className="modal-box bg-base-200 rounded-2xl">
          <h3 className="font-bold text-lg text-base-content">Sign Out</h3>
          <p className="py-4 text-base-content/70">Are you sure you want to sign out?</p>
          <div className="modal-action">
            <button
              className="btn btn-ghost h-10 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn h-10 bg-[rgb(212,175,55)] hover:bg-[rgb(212,175,55)]/90 text-white rounded-xl"
              onClick={() => {
                reset();
                navigate('/login');
                setOpen(false);
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}