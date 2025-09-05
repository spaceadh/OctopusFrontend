import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  showBranding?: boolean
}

export function AuthLayout({ children, title, subtitle, showBranding = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-octopus-gradient relative overflow-hidden">
        <div className="flex flex-col justify-center px-12 py-16 text-white relative z-10">
          <div className="max-w-md">
            {showBranding && (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Octopus</h1>
                    <p className="text-white/80 text-sm">Multi-legged SaaS Platform</p>
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-6 text-balance">Unify Your Business Operations</h2>

                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Property management, lending, sacco operations, and chama management - all in one powerful platform
                  designed for modern businesses.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Modular architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90">Real-time analytics</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}