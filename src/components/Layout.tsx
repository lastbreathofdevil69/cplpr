import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, X, Code2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (location.pathname !== '/') {
      navigate(`/?q=${encodeURIComponent(val)}`);
    } else {
      const newParams = new URLSearchParams(searchParams);
      if (val) {
        newParams.set('q', val);
      } else {
        newParams.delete('q');
      }
      setSearchParams(newParams);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="flex flex-shrink-0 items-center gap-3 transition-colors">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold tracking-tight text-white leading-tight">BTCOL606</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-tight">Academic Archive</p>
              </div>
            </Link>

            <div className="flex-1 max-w-md ml-auto md:ml-0 md:mr-auto pl-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full rounded-lg bg-white/5 border border-white/10 py-2 pl-9 pr-3 text-white focus:outline-none focus:border-indigo-500 sm:text-sm placeholder:text-slate-500 transition-colors"
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-neutral-500 text-sm">
          <p>BTCOL606: Competitive Programming Lab Manual Archive.</p>
          <p className="mt-2 text-neutral-600">Built for academic reference.</p>
        </div>
      </footer>
    </div>
  );
}
