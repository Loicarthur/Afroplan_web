import imgLogo from "figma:asset/e65661fb57ddd5e9a1e3272e08c1c43817734871.png";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#191919] text-white mt-12 md:mt-24">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={imgLogo} 
                alt="AfroPlan Logo" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <span className="text-2xl">AfroPlan</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La plateforme de référence pour trouver et réserver vos coiffeurs spécialisés cheveux afro et bouclés.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Navigation</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trouver un salon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mes rendez-vous
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Devenir partenaire
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tresses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Locks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tissage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Soins capillaires
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <a href="mailto:contact@afroplan.com" className="hover:text-white transition-colors">
                  contact@afroplan.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  01 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-400 text-xs md:text-sm">
            © 2024 AfroPlan. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
