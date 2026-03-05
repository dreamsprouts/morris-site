import { Outlet, Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: '首頁' },
  { to: '/manifesto', label: '宣言' },
  { to: '/about', label: '關於' },
  { to: '/projects', label: '專案' },
  { to: '/blog', label: '文章' },
  { to: '/contact', label: '聯絡' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-kinari">
      <header className="border-b border-rikyucha/20 bg-kinari/95 backdrop-blur supports-[backdrop-filter]:bg-kinari/80 sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            className="font-serif font-semibold text-sumi text-lg tracking-wide hover:text-aisumicha transition-colors"
          >
            Morris
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3 overflow-x-auto flex-nowrap py-1 -mx-2 sm:mx-0 scrollbar-none" aria-label="主要導覽">
            {navItems.map(({ to, label }) => {
              const isHome = to === '/'
              const active = isHome ? location.pathname === '/' : location.pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-2 py-1.5 text-sm rounded transition-colors ${
                    active
                      ? 'text-aisumicha font-medium bg-aisumicha/10'
                      : 'text-sumi/80 hover:text-sumi hover:bg-rikyucha/10'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-kinari">
        <Outlet />
      </main>
      <footer className="border-t border-rikyucha/20 py-6 mt-auto bg-kinari">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center text-sm text-sumi/60">
          <p>© {new Date().getFullYear()} Morris. 全面人本。</p>
        </div>
      </footer>
    </div>
  )
}
