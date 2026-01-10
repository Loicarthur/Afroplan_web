import { useState, useEffect } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode: initialMode }: AuthModalProps) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Synchroniser le mode avec la prop
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, name);

        if (error) {
          toast.error(error.message || 'Erreur lors de l\'inscription');
        } else {
          toast.success('Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.');
          onClose();
          // Réinitialiser les champs
          setEmail('');
          setPassword('');
          setName('');
        }
      } else {
        const { error } = await signIn(email, password);

        if (error) {
          toast.error(error.message || 'Email ou mot de passe incorrect');
        } else {
          toast.success('Connexion réussie !');
          onClose();
          // Réinitialiser les champs
          setEmail('');
          setPassword('');
        }
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[30px] max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[28px] text-[#191919] mb-2">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <p className="text-[18px] text-[#191919] opacity-60">
            {mode === 'login' 
              ? 'Connectez-vous à votre compte AfroPlan' 
              : 'Créez votre compte AfroPlan'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[16px] text-[#191919] mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#191919] focus:border-transparent"
                  placeholder="Entrez votre nom"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[16px] text-[#191919] mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#191919] focus:border-transparent"
                placeholder="exemple@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[16px] text-[#191919] mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#191919] focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[14px] text-[#191919] opacity-60 hover:opacity-100 transition-opacity"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#191919] text-white py-3 rounded-[30px] hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading 
              ? 'Chargement...' 
              : mode === 'login' 
                ? 'Se connecter' 
                : 'Créer un compte'}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center">
          <p className="text-[14px] text-[#191919] opacity-60">
            {mode === 'login' 
              ? 'Vous n\'avez pas de compte ? ' 
              : 'Vous avez déjà un compte ? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#191919] opacity-100 hover:underline"
            >
              {mode === 'login' ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
