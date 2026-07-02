import { useNavigate, useLocation } from 'react-router-dom';
const LINKS = [
  { path: '/',        label: 'Home'       },
  { path: '/browse',  label: 'Problems'   },
  { path: '/contact', label: 'Contribute' },
];

export default function Navbar({ user }) {
  const navigate          = useNavigate();
  const { pathname }      = useLocation();
  /* HashRouter gives us '/#/browse' — location.pathname sees '/browse' */

  return (
    <nav className="bg-coral top-0 z-50 h-14 flex items-center justify-between px-6 shadow-lg shadow-coral/20 font-['Poppins']">

      {/* Logo */}
      <div onClick={() => navigate('/')}
        className="flex items-center gap-2.5 cursor-pointer select-none">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center
                        text-white font-black text-base">
          A
        </div>
        <span className="text-white font-black text-lg tracking-tight">
          Anime<span className="opacity-60">Code</span>
        </span>
      </div>

      {/* User greeting — hidden on small screens */}
      {user?.name && (
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-white/60">👋 Hey,</span>
          <span className="text-white font-bold">{user.name}</span>
          {user.occupation && (
            <span className="text-white/40 text-xs">
              · {user.occupation}
            </span>
          )}
        </div>
      )}

      {/* Nav links */}
      <div className="flex gap-1">
        {LINKS.map(({ path, label }) => (
          <button key={path} onClick={() => navigate(path)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-white text-xs sm:text-sm font-semibold
                        transition-all duration-200
                        ${pathname === path ? 'bg-white/25' : 'hover:bg-black/10'}`}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
