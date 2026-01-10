import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Créer le client Supabase pour l'authentification côté client
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Helper pour obtenir l'utilisateur actuel
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper pour se déconnecter
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  localStorage.removeItem('afroplan_user');
  localStorage.removeItem('afroplan_access_token');
};
