import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, ChevronRight } from 'lucide-react';
import { BUSINESS_NAME } from '../../config/env';

const NAV_LINKS = [
  { label: 'Inicio',    href: '/',           id: '' },
  { label: 'Servicios', href: '/#servicios', id: 'servicios' },
  { label: 'Nosotros',  href: '/#nosotros',  id: 'nosotros' },
  { label: 'Ubicación', href: '/#ubicacion', id: 'ubicacion' },
];

export function Navbar() {
  const [open, setOpen]                 = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Darken navbar on scroll and calculate active section
  useEffect(() => {
    const onScroll = () => {
      // 1. Navbar background styling
      setScrolled(window.scrollY > 20);

      // 2. Active section spy (only makes sense on home page)
      if (location.pathname === '/') {
        let current = '';
        const sections = ['servicios', 'nosotros', 'ubicacion'];
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If section is reasonably within the viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
              current = section;
            }
          }
        }
        
        // If we are at the very top, 'Inicio' is active
        if (window.scrollY < 150) {
          current = '';
        }

        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Trigger once on mount/location change
    onScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function handleNavClick(href: string) {
    setOpen(false);
    
    if (href === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        // Small delay to allow DOM to render before scrolling
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* ── Main bar ─────────────────────────────────────────────────────── */}
      <div
        className={[
          'w-full transition-all duration-300',
          // Glass white-leaning effect
          scrolled
            ? 'bg-white/[0.10] backdrop-blur-2xl border-b border-white/[0.12] shadow-lg shadow-black/10'
            : 'bg-white/[0.06] backdrop-blur-xl border-b border-white/[0.08]',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">

          {/* Brand */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15 ring-1 ring-cyan-400/40">
              <Zap size={17} className="text-cyan-400" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                {BUSINESS_NAME}
              </span>
              <span className="hidden text-[10px] text-gray-500 lg:block leading-none mt-0.5 tracking-wide">
                Servicio técnico profesional
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              // Determine if this link is currently active
              const isActive = location.pathname === '/' && activeSection === link.id;

              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/8',
                  ].join(' ')}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/presupuesto"
              className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-gray-950 shadow-md shadow-cyan-400/20 transition-all duration-200 hover:bg-cyan-300 active:scale-95"
            >
              Presupuestar
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* Mobile: presupuestar shortcut + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/presupuesto"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 rounded-lg bg-cyan-400 px-3.5 py-2 text-xs font-bold text-gray-950"
            >
              Presupuestar
              <ChevronRight size={13} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
      {open && (
        <div
          className="lg:hidden bg-white/[0.09] backdrop-blur-2xl border-b border-white/10"
          style={{ animation: 'slideDown 0.2s ease-out' }}
        >
          <nav className="mx-auto max-w-7xl flex flex-col gap-0.5 px-5 py-3">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    'w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/8',
                  ].join(' ')}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
