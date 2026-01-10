import { useState, useEffect } from 'react';
import imgLogo from "@/assets/logo.png";
import { Menu, X, User, Calendar, Heart, LogOut } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { signOut, supabase } from '../utils/supabase/client';

interface HeaderProps {
  onAuthChange?: () => void;
}

export function Header({ onAuthChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Charger l'utilisateur depuis Supabase au chargement
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('afroplan_user', JSON.stringify(session.user));
        localStorage.setItem('afroplan_access_token', session.access_token);
      } else {
        // Fallback sur localStorage si pas de session
        const storedUser = localStorage.getItem('afroplan_user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Erreur lors du chargement de l\'utilisateur:', error);
            localStorage.removeItem('afroplan_user');
            localStorage.removeItem('afroplan_access_token');
          }
        }
      }
    };

    loadUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('afroplan_user', JSON.stringify(session.user));
        localStorage.setItem('afroplan_access_token', session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem('afroplan_user');
        localStorage.removeItem('afroplan_access_token');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Se déconnecter de Supabase
      await signOut();
      setUser(null);
      setIsMenuOpen(false);
      if (onAuthChange) {
        onAuthChange();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    if (onAuthChange) {
      onAuthChange();
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-6 max-w-[1400px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={imgLogo} 
                alt="AfroPlan Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {user ? (
              <>
                {/* Desktop Navigation - Logged In */}
                <nav className="hidden md:flex items-center gap-8">
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2">
                    <Calendar size={20} />
                    <span>Mes rendez-vous</span>
                  </a>
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2">
                    <Heart size={20} />
                    <span>Favoris</span>
                  </a>
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2">
                    <User size={20} />
                    <span>Mon compte</span>
                  </a>
                </nav>

                {/* User Info & Logout */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-[20px]">
                    <div className="w-8 h-8 bg-[#191919] rounded-full flex items-center justify-center text-white">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-[14px] text-[#191919]">
                      {user.user_metadata?.name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Desktop Navigation - Logged Out */}
                <nav className="hidden md:flex items-center gap-8">
                  <a href="#services" className="text-[#191919] hover:opacity-70 transition-opacity">
                    Services
                  </a>
                  <a href="#comment-ca-marche" className="text-[#191919] hover:opacity-70 transition-opacity">
                    Comment ça marche
                  </a>
                  <a href="#temoignages" className="text-[#191919] hover:opacity-70 transition-opacity">
                    Témoignages
                  </a>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-4">
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors"
                  >
                    Inscription
                  </button>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="bg-[#191919] px-6 py-3 rounded-[30px] text-white border border-[#191919] hover:bg-transparent hover:text-[#191919] transition-colors"
                  >
                    Connexion
                  </button>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pb-4 border-t border-gray-100 pt-4">
              {user ? (
                <nav className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-[20px]">
                    <div className="w-10 h-10 bg-[#191919] rounded-full flex items-center justify-center text-white">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#191919]">
                        {user.user_metadata?.name || 'Utilisateur'}
                      </span>
                      <span className="text-[12px] text-[#191919] opacity-60">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2 py-2">
                    <Calendar size={20} />
                    <span>Mes rendez-vous</span>
                  </a>
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2 py-2">
                    <Heart size={20} />
                    <span>Favoris</span>
                  </a>
                  <a href="#" className="text-[#191919] hover:opacity-70 transition-opacity flex items-center gap-2 py-2">
                    <User size={20} />
                    <span>Mon compte</span>
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] w-full flex items-center justify-center gap-2 mt-2"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </nav>
              ) : (
                <nav className="flex flex-col gap-4">
                  <a href="#services" className="text-[#191919] hover:opacity-70 transition-opacity py-2">
                    Services
                  </a>
                  <a href="#comment-ca-marche" className="text-[#191919] hover:opacity-70 transition-opacity py-2">
                    Comment ça marche
                  </a>
                  <a href="#temoignages" className="text-[#191919] hover:opacity-70 transition-opacity py-2">
                    Témoignages
                  </a>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] w-full mt-4"
                  >
                    Inscription
                  </button>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="bg-[#191919] px-6 py-3 rounded-[30px] text-white border border-[#191919] w-full"
                  >
                    Connexion
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
