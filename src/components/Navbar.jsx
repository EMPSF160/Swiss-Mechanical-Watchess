import React, { useState, useEffect } from 'react';
import { useWatch, CURRENCY_RATES } from '../context/WatchContext';
import { 
  ShieldCheck, 
  Heart, 
  Scale, 
  Volume2, 
  VolumeX, 
  User, 
  Search, 
  Menu, 
  X, 
  Clock, 
  Compass, 
  Sparkles, 
  ChevronDown, 
  Globe, 
  Calendar,
  Lock,
  Layers,
  Sun,
  Moon,
  Palette
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentPage, 
    navigateTo, 
    wishlist, 
    compareList, 
    currency, 
    setCurrency, 
    themeMode,
    toggleThemeMode,
    colorScheme,
    changeColorScheme,
    isAudioActive, 
    handleToggleSound, 
    user, 
    setIsAuthModalOpen,
    setIsCompareDrawerOpen,
    watches
  } = useWatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [paletteDropdown, setPaletteDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : watches.filter(w => 
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.movementType.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const palettes = [
    { id: 'gold', name: 'Geneva Gold', color: '#D4AF37' },
    { id: 'rosegold', name: '4N Rose Gold', color: '#E0A899' },
    { id: 'platinum', name: 'Ice Platinum', color: '#38BDF8' },
    { id: 'emerald', name: 'Imperial Emerald', color: '#34D399' },
    { id: 'sapphire', name: 'Midnight Sapphire', color: '#60A5FA' }
  ];

  return (
    <>
      {/* Top Swiss Announcement Bar */}
      <div className="bg-[var(--announcement-bg)] border-b border-[var(--border-subtle)] text-[11px] uppercase tracking-[0.22em] text-[var(--announcement-text)] py-1.5 px-4 hidden md:block transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] inline-block mr-2 animate-pulse shadow-sm"></span>
              <span className="text-[var(--color-primary)] font-semibold">GENEVA ATELIER OPEN</span> • 10:00 – 18:30 CET
            </span>
            <span className="opacity-30">|</span>
            <span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer" onClick={() => navigateTo('heritage')}>
              GENEVA SEAL GUARANTEE • ISO 3159 CHRONOMETRIC RIGOR
            </span>
          </div>

          <div className="flex items-center space-x-5">
            {/* Color Palette Switcher */}
            <div className="relative">
              <button
                onClick={() => setPaletteDropdown(!paletteDropdown)}
                className="flex items-center space-x-1.5 text-[var(--announcement-text)] hover:text-[var(--color-primary)] transition-colors"
                title="Change Luxury Palette"
              >
                <Palette className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Palette</span>
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block ml-0.5 shadow border border-black/10"
                  style={{ backgroundColor: palettes.find(p => p.id === colorScheme)?.color || '#D4AF37' }}
                />
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
              </button>

              {paletteDropdown && (
                <div className="absolute right-0 mt-1.5 w-48 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl shadow-2xl py-1.5 z-50 text-left">
                  <div className="px-3 py-1 text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-cinzel border-b border-[var(--border-subtle)]">
                    Prestige Horology Palettes
                  </div>
                  {palettes.map(pal => (
                    <button
                      key={pal.id}
                      onClick={() => {
                        changeColorScheme(pal.id);
                        setPaletteDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[var(--bg-card-hover)] transition-colors ${
                        colorScheme === pal.id ? 'text-[var(--color-primary)] font-semibold bg-[var(--bg-card-subtle)]' : 'text-[var(--text-title)]'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: pal.color }}
                        />
                        <span>{pal.name}</span>
                      </span>
                      {colorScheme === pal.id && <span className="text-[var(--color-primary)] text-[10px] font-bold">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="opacity-30">|</span>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleThemeMode}
              className="flex items-center space-x-1.5 text-[var(--announcement-text)] hover:text-[var(--color-primary)] transition-colors"
              title={themeMode === 'dark' ? "Switch to Geneva Salon Light Mode" : "Switch to Obsidian Vault Dark Mode"}
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="text-[10px] uppercase tracking-wider">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span className="text-[10px] uppercase tracking-wider">Dark Mode</span>
                </>
              )}
            </button>

            <span className="opacity-30">|</span>

            {/* Escapement Audio Sound Toggle */}
            <button 
              onClick={handleToggleSound}
              className={`flex items-center space-x-1.5 transition-all text-xs ${
                isAudioActive ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--announcement-text)] hover:text-[var(--color-primary)]'
              }`}
              title="Toggle Swiss Calibre Escapement Sound"
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5 animate-pulse text-[var(--color-primary)]" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
              <span>{isAudioActive ? '4Hz ON' : 'MUTED'}</span>
            </button>

            <span className="opacity-30">|</span>

            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="flex items-center space-x-1 text-[var(--announcement-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Globe className="w-3 h-3 text-[var(--color-primary)]" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
              </button>
              {currencyDropdown && (
                <div className="absolute right-0 mt-1.5 w-24 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl shadow-2xl py-1 z-50 text-left">
                  {Object.keys(CURRENCY_RATES).map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[var(--bg-card-hover)] transition-colors ${
                        currency === curr ? 'text-[var(--color-primary)] font-semibold bg-[var(--bg-card-subtle)]' : 'text-[var(--text-title)]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-subtle)] ${
        isScrolled ? 'shadow-xl py-3' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-[var(--text-title)] hover:text-[var(--color-primary)] p-2"
            aria-label="Open Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Navigation Links Left */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] uppercase tracking-[0.2em] font-medium text-[var(--text-title)]">
            <button 
              onClick={() => navigateTo('home')}
              className={`hover:text-[var(--color-primary)] transition-colors py-1 relative ${
                currentPage === 'home' ? 'text-[var(--color-primary)] font-semibold' : ''
              }`}
            >
              Maison
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>

            <button 
              onClick={() => navigateTo('collection')}
              className={`hover:text-[var(--color-primary)] transition-colors py-1 relative ${
                currentPage === 'collection' ? 'text-[var(--color-primary)] font-semibold' : ''
              }`}
            >
              Timepieces
              {currentPage === 'collection' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>

            <button 
              onClick={() => navigateTo('heritage')}
              className={`hover:text-[var(--color-primary)] transition-colors py-1 relative ${
                currentPage === 'heritage' ? 'text-[var(--color-primary)] font-semibold' : ''
              }`}
            >
              Our Craft & Heritage
              {currentPage === 'heritage' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>
          </nav>

          {/* Central Haute Horlogerie Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer text-center group flex flex-col items-center select-none"
          >
            <div className="flex items-center justify-center space-x-2">
              {/* Calatrava Cross Emblem */}
              <div className="w-6 h-6 relative flex items-center justify-center">
                <div className="absolute w-5 h-5 border border-[var(--color-primary)] opacity-40 rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                <div className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full shadow-sm"></div>
              </div>
              <span className="font-cinzel text-xl sm:text-2xl tracking-[0.35em] font-bold text-transparent bg-clip-text text-gold-gradient uppercase drop-shadow">
                CHRONOVA
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-[var(--text-muted)] font-light -mt-0.5 group-hover:text-[var(--color-primary)] transition-colors">
              GENÈVE • 1839
            </span>
          </div>

          {/* Navigation Links Right */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Appointments CTA (Desktop) */}
            <button 
              onClick={() => navigateTo('contact')}
              className={`hidden xl:flex items-center space-x-1.5 text-[12px] uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-lg border transition-all ${
                currentPage === 'contact'
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--bg-card-subtle)] font-semibold'
                  : 'border-[var(--border-card)] text-[var(--text-title)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-[var(--bg-card)]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>Book Salon</span>
            </button>

            {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleThemeMode}
              className="lg:hidden p-2 text-[var(--text-title)] hover:text-[var(--color-primary)] transition-colors"
              title="Toggle Light/Dark Theme"
            >
              {themeMode === 'dark' ? <Sun className="w-5 h-5 text-[var(--color-primary)]" /> : <Moon className="w-5 h-5 text-[var(--color-primary)]" />}
            </button>

            {/* Live Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[var(--text-title)] hover:text-[var(--color-primary)] transition-colors relative"
              title="Search Timepieces & Calibres"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Drawer Trigger */}
            <button 
              onClick={() => setIsCompareDrawerOpen(true)}
              className="p-2 text-[var(--text-title)] hover:text-[var(--color-primary)] transition-colors relative"
              title="Compare Calibres"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Trigger */}
            <button 
              onClick={() => navigateTo('dashboard')}
              className="p-2 text-[var(--text-title)] hover:text-[var(--color-primary)] transition-colors relative"
              title="Collector's Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[var(--color-primary)] fill-current' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* VIP Profile / Auth */}
            <button 
              onClick={() => {
                if (user) {
                  navigateTo(user.role === 'admin' ? 'admin' : 'dashboard');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] hover:border-[var(--color-primary)] transition-all text-xs text-[var(--text-title)] group shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-[11px] shadow-sm">
                {user ? user.name.charAt(0) : <Lock className="w-3 h-3 text-white" />}
              </div>
              <span className="hidden md:inline text-[11px] uppercase tracking-wider text-[var(--text-title)] group-hover:text-[var(--color-primary)]">
                {user ? (user.role === 'admin' ? 'Maison Admin' : 'VIP Vault') : 'Sign In'}
              </span>
            </button>
          </div>
        </div>

        {/* Live Search Drawer dropdown */}
        {searchOpen && (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] py-4 px-4 shadow-2xl transition-all">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[var(--color-primary)] absolute left-4" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by reference, complication (e.g. Tourbillon, Minute Repeater), or calibre..."
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-card)] rounded-xl pl-12 pr-10 py-3 text-sm text-[var(--text-title)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-[var(--text-muted)] hover:text-[var(--text-title)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Live Search Suggestions */}
              {searchQuery && (
                <div className="mt-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl max-h-80 overflow-y-auto p-2 shadow-xl">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-6 text-[var(--text-muted)] text-sm">
                      No timepieces matching "{searchQuery}" found in Geneva archives.
                    </div>
                  ) : (
                    searchResults.map(watch => (
                      <div 
                        key={watch.id}
                        onClick={() => {
                          navigateTo('details', watch.id);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center space-x-4 p-2.5 rounded-lg hover:bg-[var(--bg-card-hover)] cursor-pointer transition-colors border-b border-[var(--border-subtle)] last:border-0"
                      >
                        <img 
                          src={watch.images[0]} 
                          alt={watch.name} 
                          className="w-12 h-12 object-contain bg-black/5 dark:bg-black/40 rounded p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-serif font-medium text-[var(--text-title)] truncate">{watch.name}</h4>
                            <span className="text-xs font-mono text-[var(--color-primary)] font-bold">{watch.priceFormatted}</span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)]">{watch.ref} • {watch.collection} • {watch.movementType}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[var(--bg-card)] border-r border-[var(--border-subtle)] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div className="text-left">
                  <div className="font-cinzel text-xl font-bold text-[var(--color-primary)]">CHRONOVA</div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Swiss Haute Horlogerie</div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-title)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Palette Switcher */}
              <div className="py-4 border-b border-[var(--border-subtle)]">
                <div className="text-[10px] uppercase font-cinzel tracking-wider text-[var(--text-muted)] mb-2">
                  Prestige Palette:
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {palettes.map(pal => (
                    <button
                      key={pal.id}
                      onClick={() => changeColorScheme(pal.id)}
                      className={`h-8 rounded-lg flex items-center justify-center border transition-all ${
                        colorScheme === pal.id ? 'border-[var(--color-primary)] scale-105 shadow-md' : 'border-[var(--border-subtle)]'
                      }`}
                      style={{ backgroundColor: pal.color }}
                      title={pal.name}
                    />
                  ))}
                </div>
              </div>

              <div className="py-4 space-y-2">
                <button 
                  onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'home' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-title)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  01. Maison & Collections
                </button>

                <button 
                  onClick={() => { navigateTo('collection'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'collection' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-title)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  02. Watch Collection
                </button>

                <button 
                  onClick={() => { navigateTo('heritage'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'heritage' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-title)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  03. Our Craft & Heritage
                </button>

                <button 
                  onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'contact' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-title)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  04. Book Boutique Appointment
                </button>

                <button 
                  onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'dashboard' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-title)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  05. Collector's Vault & Wishlist
                </button>

                <button 
                  onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-widest ${
                    currentPage === 'admin' ? 'bg-[var(--bg-card-subtle)] text-[var(--color-primary)] font-semibold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  06. Maison Admin Suite
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
              <button
                onClick={toggleThemeMode}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-card-subtle)] text-xs text-[var(--color-primary)] border border-[var(--border-card)]"
              >
                <span className="flex items-center">
                  {themeMode === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  Theme Atmosphere
                </span>
                <span>{themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>

              <button 
                onClick={handleToggleSound}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-card-subtle)] text-xs text-[var(--color-primary)] border border-[var(--border-card)]"
              >
                <span className="flex items-center">
                  {isAudioActive ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                  Escapement Sound
                </span>
                <span>{isAudioActive ? '4Hz ON' : 'OFF'}</span>
              </button>
              
              <div className="text-[10px] text-[var(--text-muted)] text-center tracking-widest uppercase pt-2">
                Geneva • Zurich • London • New York • Tokyo
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
