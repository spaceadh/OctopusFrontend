import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/authStore'
import { QueryProvider } from './providers/QueryProvider'
import { router } from './routes'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
