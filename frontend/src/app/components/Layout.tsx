import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Flame, Search, Grid3x3, BookmarkCheck, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/', label: 'Trending', icon: Flame },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/platforms', label: 'Platforms', icon: Grid3x3 },
  { path: '/watchlist', label: 'Watchlist', icon: BookmarkCheck },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-2xl">🎬</span>
              </div>
              <div>
                <h1 className="text-xl tracking-tight">Where To Watch</h1>
                <p className="text-xs text-muted-foreground">All your streams, one place</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <nav className="flex gap-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-accent rounded-lg -z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm hidden md:inline">{user?.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/50 backdrop-blur-xl bg-background/60">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Where To Watch &copy; 2026 • Your universal OTT aggregator</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
