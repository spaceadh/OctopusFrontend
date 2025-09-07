import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/authStore'
import { QueryProvider } from './providers/QueryProvider'
import { Toaster, } from 'react-hot-toast'
import { router } from './routes'
import { DirectionProvider } from '@/context/direction-provider'
import { ThemeProvider, useTheme } from '@/context/theme-provider'
import { FontProvider } from '@/context/FontProvider'
// import { useEffect } from 'react'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <FontProvider>
            <DirectionProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "white",
                    color: "#374151",
                    border: "1px solid rgb(212, 175, 55, 0.2)",
                    borderRadius: "12px",
                    padding: "16px",
                  },
                  success: {
                    iconTheme: {
                      primary: "rgb(212, 175, 55)",
                      secondary: "white",
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: "#dc2626",
                      secondary: "white",
                    },
                  },
                  loading: {
                    iconTheme: {
                      primary: "#3b82f6",
                      secondary: "#3b82f6",
                    },
                  },
                }}
              />
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
