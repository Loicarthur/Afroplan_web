import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Routes

// POST /make-server-0130ebd3/signup - Créer un nouvel utilisateur
app.post('/make-server-0130ebd3/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis' }, 400);
    }

    // Créer le client Supabase avec la clé de service
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    // Créer l'utilisateur via l'API Admin
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      // Confirmer automatiquement l'email car aucun serveur d'email n'est configuré
      email_confirm: true
    });

    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      user: data.user,
      message: 'Compte créé avec succès'
    }, 201);
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return c.json({ error: 'Erreur lors de l\'inscription' }, 500);
  }
});

// POST /make-server-0130ebd3/login - Connecter un utilisateur
app.post('/make-server-0130ebd3/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Email et mot de passe requis' }, 400);
    }

    // Créer le client Supabase avec la clé publique pour l'authentification
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    // Connecter l'utilisateur
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erreur lors de la connexion:', error);
      return c.json({ error: 'Email ou mot de passe incorrect' }, 401);
    }

    return c.json({ 
      user: data.user,
      access_token: data.session?.access_token,
      message: 'Connexion réussie'
    }, 200);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return c.json({ error: 'Erreur lors de la connexion' }, 500);
  }
});

// GET /make-server-0130ebd3/salons - Récupérer tous les salons
app.get('/make-server-0130ebd3/salons', async (c) => {
  try {
    const salons = await kv.getByPrefix('salon:');
    const appointments = await kv.getByPrefix('appointment:');
    
    return c.json({
      salons: salons.length > 0 ? salons : getDefaultSalons(),
      appointments: appointments.length > 0 ? appointments : []
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des salons:', error);
    return c.json({ 
      error: 'Erreur lors de la récupération des données',
      salons: getDefaultSalons(),
      appointments: []
    }, 500);
  }
});

// GET /make-server-0130ebd3/salons/:id - Récupérer un salon spécifique
app.get('/make-server-0130ebd3/salons/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const salon = await kv.get(`salon:${id}`);
    
    if (!salon) {
      return c.json({ error: 'Salon non trouvé' }, 404);
    }
    
    return c.json(salon);
  } catch (error) {
    console.error('Erreur lors de la récupération du salon:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

// POST /make-server-0130ebd3/salons - Créer un nouveau salon
app.post('/make-server-0130ebd3/salons', async (c) => {
  try {
    const body = await c.req.json();
    const id = `salon:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const salon = {
      id: id.replace('salon:', ''),
      name: body.name,
      location: body.location,
      rating: body.rating || 0,
      reviewCount: body.reviewCount || 0,
      image: body.image,
      tags: body.tags || [],
      priceFrom: body.priceFrom,
      description: body.description || '',
      services: body.services || [],
      schedule: body.schedule || {},
      createdAt: new Date().toISOString()
    };
    
    await kv.set(id, salon);
    
    return c.json(salon, 201);
  } catch (error) {
    console.error('Erreur lors de la création du salon:', error);
    return c.json({ error: 'Erreur lors de la création du salon' }, 500);
  }
});

// POST /make-server-0130ebd3/appointments - Créer un rendez-vous
app.post('/make-server-0130ebd3/appointments', async (c) => {
  try {
    const body = await c.req.json();
    const id = `appointment:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const appointment = {
      id: id.replace('appointment:', ''),
      userId: body.userId,
      salonId: body.salonId,
      date: body.date,
      time: body.time,
      salonName: body.salonName,
      salonAddress: body.salonAddress,
      serviceType: body.serviceType,
      duration: body.duration,
      price: body.price,
      image: body.image,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(id, appointment);
    
    return c.json(appointment, 201);
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous:', error);
    return c.json({ error: 'Erreur lors de la création du rendez-vous' }, 500);
  }
});

// GET /make-server-0130ebd3/appointments/:userId - Récupérer les rendez-vous d'un utilisateur
app.get('/make-server-0130ebd3/appointments/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const allAppointments = await kv.getByPrefix('appointment:');
    
    const userAppointments = allAppointments.filter(apt => apt.userId === userId);
    
    return c.json(userAppointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

// POST /make-server-0130ebd3/search - Rechercher des salons
app.post('/make-server-0130ebd3/search', async (c) => {
  try {
    const body = await c.req.json();
    const { query, location, serviceType } = body;
    
    let salons = await kv.getByPrefix('salon:');
    
    if (salons.length === 0) {
      salons = getDefaultSalons();
    }
    
    // Filtrer par recherche
    if (query) {
      salons = salons.filter(salon => 
        salon.name.toLowerCase().includes(query.toLowerCase()) ||
        salon.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Filtrer par localisation
    if (location) {
      salons = salons.filter(salon => 
        salon.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    return c.json(salons);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return c.json({ error: 'Erreur lors de la recherche' }, 500);
  }
});

// POST /make-server-0130ebd3/reviews - Ajouter un avis
app.post('/make-server-0130ebd3/reviews', async (c) => {
  try {
    const body = await c.req.json();
    const id = `review:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const review = {
      id: id.replace('review:', ''),
      salonId: body.salonId,
      userId: body.userId,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(id, review);
    
    // Mettre à jour la note du salon
    const salon = await kv.get(`salon:${body.salonId}`);
    if (salon) {
      const reviews = await kv.getByPrefix(`review:`);
      const salonReviews = reviews.filter(r => r.salonId === body.salonId);
      const totalRating = salonReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = totalRating / salonReviews.length;
      
      salon.rating = Math.round(avgRating * 10) / 10;
      salon.reviewCount = salonReviews.length;
      
      await kv.set(`salon:${body.salonId}`, salon);
    }
    
    return c.json(review, 201);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'avis:', error);
    return c.json({ error: 'Erreur lors de l\'ajout de l\'avis' }, 500);
  }
});

// Helper function pour obtenir les salons par défaut
function getDefaultSalons() {
  return [
    {
      id: '1',
      name: 'Miya',
      location: 'Paris 11e arrondissement',
      rating: 4.8,
      reviewCount: 32,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      tags: ['Femme', 'Tresse', 'Tissage'],
      priceFrom: 30,
      description: 'Salon spécialisé dans les coiffures afro et les tresses',
      services: [
        { name: 'Tresses africaines', duration: '3h', price: 65 },
        { name: 'Tissage', duration: '2h30', price: 80 },
        { name: 'Défrisage', duration: '2h', price: 50 }
      ],
      schedule: {
        lundi: '09:00-19:00',
        mardi: '09:00-19:00',
        mercredi: '09:00-19:00',
        jeudi: '09:00-19:00',
        vendredi: '09:00-20:00',
        samedi: '10:00-18:00',
        dimanche: 'Fermé'
      }
    },
    {
      id: '2',
      name: 'Afro Style',
      location: 'Paris 18e arrondissement',
      rating: 4.9,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=800',
      tags: ['Femme', 'Tresse', 'Locks'],
      priceFrom: 35,
      description: 'Expert en locks et coiffures naturelles',
      services: [
        { name: 'Locks création', duration: '4h', price: 150 },
        { name: 'Locks entretien', duration: '2h', price: 50 },
        { name: 'Vanilles', duration: '2h30', price: 45 }
      ],
      schedule: {
        lundi: '10:00-19:00',
        mardi: '10:00-19:00',
        mercredi: '10:00-19:00',
        jeudi: '10:00-19:00',
        vendredi: '10:00-20:00',
        samedi: '09:00-19:00',
        dimanche: 'Fermé'
      }
    },
    {
      id: '3',
      name: 'Natural Beauty',
      location: 'Paris 20e arrondissement',
      rating: 4.7,
      reviewCount: 28,
      image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800',
      tags: ['Femme', 'Homme', 'Kids'],
      priceFrom: 25,
      description: 'Salon familial accueillant toute la famille',
      services: [
        { name: 'Coupe homme', duration: '45min', price: 25 },
        { name: 'Coupe femme', duration: '1h', price: 35 },
        { name: 'Coupe enfant', duration: '30min', price: 20 },
        { name: 'Soin cheveux', duration: '1h30', price: 40 }
      ],
      schedule: {
        lundi: 'Fermé',
        mardi: '09:00-18:00',
        mercredi: '09:00-18:00',
        jeudi: '09:00-18:00',
        vendredi: '09:00-20:00',
        samedi: '09:00-19:00',
        dimanche: '10:00-16:00'
      }
    }
  ];
}

// Démarrer le serveur
Deno.serve(app.fetch);
