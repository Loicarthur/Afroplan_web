# Configuration Supabase pour AfroPlan

## Configuration de l'authentification

Votre application utilise maintenant Supabase pour gérer l'authentification des utilisateurs. Voici comment configurer votre projet Supabase :

### 1. Accéder au Dashboard Supabase

Rendez-vous sur : https://supabase.com/dashboard/project/ssteqnntdojuagndjjvs

### 2. Activer l'authentification par Email/Mot de passe

1. Dans le menu latéral, allez dans **Authentication** > **Providers**
2. Cherchez **Email** dans la liste des providers
3. Assurez-vous que l'option **Enable Email provider** est activée
4. Pour un développement plus rapide, vous pouvez :
   - **Désactiver** l'option "Confirm email" (sinon les utilisateurs devront confirmer leur email avant de pouvoir se connecter)
   - Ou configurer un service d'envoi d'emails si vous voulez garder la confirmation d'email

### 3. Configuration recommandée pour le développement

Pour faciliter le développement, voici les paramètres recommandés :

**Authentication > Settings :**
- **Site URL** : `http://localhost:5173` (ou votre URL locale)
- **Redirect URLs** : Ajoutez `http://localhost:5173/**` pour permettre les redirections locales

**Authentication > Email Templates :**
- Vous pouvez personnaliser les templates d'emails si vous activez la confirmation d'email

### 4. Configuration en production

Quand vous déployez en production :

1. Mettez à jour le **Site URL** avec votre domaine de production
2. Ajoutez votre domaine de production dans les **Redirect URLs**
3. **Activez** la confirmation d'email pour plus de sécurité
4. Configurez un service d'envoi d'emails (SMTP ou service tiers)

## Fonctionnalités implémentées

✅ **Inscription** : Les utilisateurs peuvent créer un compte avec email/mot de passe
✅ **Connexion** : Les utilisateurs peuvent se connecter avec leurs identifiants
✅ **Déconnexion** : Les utilisateurs peuvent se déconnecter proprement
✅ **Persistance de session** : La session est maintenue même après rechargement de la page
✅ **Gestion d'état** : L'interface s'adapte selon l'état de connexion de l'utilisateur

## Architecture technique

### Client Supabase (`src/utils/supabase/client.ts`)
- Initialise le client Supabase avec autoRefreshToken et persistSession
- Fournit des helpers pour getCurrentUser() et signOut()

### Composant AuthModal (`src/components/AuthModal.tsx`)
- Gère l'inscription avec `supabase.auth.signUp()`
- Gère la connexion avec `supabase.auth.signInWithPassword()`
- Stocke les informations utilisateur dans localStorage

### Composant Header (`src/components/Header.tsx`)
- Charge la session Supabase au démarrage
- Écoute les changements d'authentification avec `onAuthStateChange`
- Affiche l'interface appropriée selon l'état de connexion

## Dépannage

### L'inscription ne fonctionne pas
- Vérifiez que l'authentification par email est activée dans le dashboard Supabase
- Si la confirmation d'email est activée, l'utilisateur devra confirmer son email avant de pouvoir se connecter
- Vérifiez la console du navigateur pour voir les erreurs éventuelles

### La session n'est pas maintenue
- Vérifiez que les clés Supabase dans `src/utils/supabase/info.tsx` sont correctes
- Assurez-vous que localStorage n'est pas bloqué par les paramètres du navigateur

### Erreur CORS
- Vérifiez que votre URL locale est bien ajoutée dans les Redirect URLs du dashboard Supabase

## Support

Pour plus d'informations sur l'authentification Supabase :
- Documentation : https://supabase.com/docs/guides/auth
- Dashboard du projet : https://supabase.com/dashboard/project/ssteqnntdojuagndjjvs
