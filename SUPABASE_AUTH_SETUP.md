# Configuration de l'authentification Supabase

## Étapes de configuration

### 1. Désactiver la confirmation d'email (pour développement)

Pour permettre aux utilisateurs de se connecter immédiatement après l'inscription sans confirmer leur email :

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet **Afroplan_web** (ID: `ssteqnntdojuagndjjvs`)
3. Dans le menu de gauche, cliquez sur **Authentication** > **Providers**
4. Cliquez sur **Email** dans la liste des providers
5. Faites défiler jusqu'à **Email Settings**
6. Désactivez l'option **"Enable email confirmations"**
7. Cliquez sur **Save**

### 2. Configuration des URLs de redirection (optionnel)

Si vous voulez ajouter des URLs de redirection personnalisées :

1. Allez dans **Authentication** > **URL Configuration**
2. Ajoutez vos URLs autorisées dans **Redirect URLs**:
   - `http://localhost:5173` (développement)
   - Votre URL de production

### 3. Tester l'authentification

Une fois configuré, vous pouvez tester :

#### Inscription
- Email : `test@example.com`
- Mot de passe : `motdepasse123` (minimum 6 caractères)
- Nom : `Test User`

#### Connexion
Utilisez les mêmes identifiants pour vous connecter.

## Architecture mise en place

### Fichiers créés

- **`src/utils/supabase/client.ts`** : Client Supabase pour le frontend
- **`src/contexts/AuthContext.tsx`** : Contexte React pour gérer l'état d'authentification

### Fichiers modifiés

- **`src/components/AuthModal.tsx`** : Utilise maintenant le contexte Auth
- **`src/components/Header.tsx`** : Utilise le contexte Auth au lieu de localStorage manuel
- **`src/main.tsx`** : Enveloppe l'application avec AuthProvider

## Fonctionnalités

✅ Inscription avec email, mot de passe et nom
✅ Connexion avec email et mot de passe
✅ Déconnexion
✅ Gestion automatique des sessions
✅ Persistance de la session (rechargement de page)
✅ Notifications toast pour les succès/erreurs

## Pour activer la confirmation d'email en production

Pour la production, vous voudrez probablement activer la confirmation d'email :

1. Activez **"Enable email confirmations"** dans Supabase Dashboard
2. Configurez un template d'email personnalisé dans **Authentication** > **Email Templates**
3. Configurez l'URL de confirmation dans votre application

## Notes importantes

- Les sessions sont gérées automatiquement par Supabase
- Le token d'accès est stocké de manière sécurisée
- L'état de l'utilisateur est synchronisé dans toute l'application via le contexte React
