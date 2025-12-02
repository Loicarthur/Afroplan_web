import { useState } from 'react';
import imgLogo from "figma:asset/e65661fb57ddd5e9a1e3272e08c1c43817734871.png";
import { Menu, X, User, Calendar, Heart, Settings } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-8 py-6 max-w-[1400px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={imgLogo} 
              alt="AfroPlan Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors">
              Connexion
            </button>
            <button className="bg-[#191919] px-6 py-3 rounded-[30px] text-white border border-[#191919] hover:bg-transparent hover:text-[#191919] transition-colors">
              S'inscrire
            </button>
          </div>

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
            <nav className="flex flex-col gap-4">
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
              <div className="flex flex-col gap-2 mt-4">
                <button className="bg-[#f9f8f8] px-6 py-3 rounded-[30px] text-[#191919] border border-[#191919] w-full">
                  Connexion
                </button>
                <button className="bg-[#191919] px-6 py-3 rounded-[30px] text-white border border-[#191919] w-full">
                  S'inscrire
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
