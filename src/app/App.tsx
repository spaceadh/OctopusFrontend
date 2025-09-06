import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/authStore'
import { QueryProvider } from './providers/QueryProvider'
import { router } from './routes'
import { DirectionProvider } from '@/context/direction-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { FontProvider } from '@/context/FontProvider'


function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <RouterProvider router={router} />
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
