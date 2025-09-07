import { Logo } from '@/assets/logo'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <Logo className='me-2' />
          <h1 className='text-xl font-medium'>Octopus</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

// export function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[rgb(212,175,55)]/20">
//       <div className="mx-auto w-full max-w-md p-6 sm:p-8 space-y-2">
//         <div className="mb-4 flex items-center justify-center">
//           <Logo className="w-10 h-10 mr-2" />
//           <h1 className="text-xl font-medium text-base-content">Octopus</h1>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }