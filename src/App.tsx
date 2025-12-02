import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-2m7cmkaw8t";
import imgBabyFace from "figma:asset/f7a12a6ef6fe87cdd8df59763dd3efb753254314.png";
import imgRectangle84 from "figma:asset/eea0af014779f5a16e87b8d8de906cd72bd27ddb.png";
import imgImage152 from "figma:asset/44b12d8bd81727bfefa67b72868657437cd6927d.png";
import imgImage153 from "figma:asset/134e08765b3660be9fee39d0b1be879cb0273610.png";
import imgLogo from "figma:asset/e65661fb57ddd5e9a1e3272e08c1c43817734871.png";
import imgImage1 from "figma:asset/6ba6dd96fdc12c07840cc9812c55bcee668bcb7d.png";
import imgImage151 from "figma:asset/80f264d0ddc5b721f4c9c2481fa786f9ead78ed6.png";
import { SearchBar } from './components/SearchBar';
import { SalonCard } from './components/SalonCard';
import { AppointmentCard } from './components/AppointmentCard';
import { Header } from './components/Header';
import { SalonDetails } from './components/SalonDetails';
import { Footer } from './components/Footer';
import { HeroAnimation, SlideUp, FadeIn, ScaleIn } from './components/HeroAnimation';
import { LoadingState } from './components/LoadingState';
import { StatsSection } from './components/StatsSection';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import * as kv from './supabase/functions/server/kv_store';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { toast, Toaster } from 'sonner@2.0.3';

interface Salon {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  priceFrom: number;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  salonName: string;
  salonAddress: string;
  serviceType: string;
  duration: string;
  price: number;
  image: string;
}

export default function App() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les données depuis Supabase
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0130ebd3/salons`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSalons(data.salons || getSampleSalons());
        setPastAppointments(data.appointments || getSampleAppointments());
      } else {
        // Utiliser des données d'exemple si le serveur n'est pas encore configuré
        setSalons(getSampleSalons());
        setPastAppointments(getSampleAppointments());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Utiliser des données d'exemple en cas d'erreur
      setSalons(getSampleSalons());
      setPastAppointments(getSampleAppointments());
    } finally {
      setLoading(false);
    }
  };

  const getSampleSalons = (): Salon[] => [
    {
      id: '1',
      name: 'Miya',
      location: 'Paris 11e arrondissement',
      rating: 4.8,
      reviewCount: 32,
      image: imgImage152,
      tags: ['Femme', 'Tresse', 'Tissage'],
      priceFrom: 30
    },
    {
      id: '2',
      name: 'Afro Style',
      location: 'Paris 18e arrondissement',
      rating: 4.9,
      reviewCount: 45,
      image: imgImage153,
      tags: ['Femme', 'Tresse', 'Locks'],
      priceFrom: 35
    },
    {
      id: '3',
      name: 'Natural Beauty',
      location: 'Paris 20e arrondissement',
      rating: 4.7,
      reviewCount: 28,
      image: imgRectangle84,
      tags: ['Femme', 'Homme', 'Kids'],
      priceFrom: 25
    }
  ];

  const getSampleAppointments = (): Appointment[] => [
    {
      id: '1',
      date: 'lundi 17 nov.',
      time: '18h00',
      salonName: 'Miya Coiffure',
      salonAddress: '12 rue de la République, 75011 Paris',
      serviceType: 'Tresses africaines',
      duration: '3h00',
      price: 65,
      image: imgRectangle84
    },
    {
      id: '2',
      date: 'samedi 12 nov.',
      time: '14h30',
      salonName: 'Afro Style',
      salonAddress: '45 boulevard Barbès, 75018 Paris',
      serviceType: 'Locks entretien',
      duration: '2h00',
      price: 50,
      image: imgImage151
    },
    {
      id: '3',
      date: 'mercredi 2 nov.',
      time: '10h00',
      salonName: 'Natural Beauty',
      salonAddress: '8 rue des Pyrénées, 75020 Paris',
      serviceType: 'Coupe + Soin',
      duration: '1h30',
      price: 40,
      image: imgImage1
    }
  ];

  const handleSearch = async (query: string, location: string, serviceType: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0130ebd3/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query, location, serviceType })
        }
      );
      
      if (response.ok) {
        const results = await response.json();
        setSalons(results);
        toast.success(`${results.length} salon(s) trouvé(s)`);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast.error('Erreur lors de la recherche');
    }
  };

  const handleBooking = async (service: any, date: string, time: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0130ebd3/appointments`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: 'user-demo',
            salonId: selectedSalonId,
            date,
            time,
            salonName: salons.find(s => s.id === selectedSalonId)?.name,
            salonAddress: salons.find(s => s.id === selectedSalonId)?.location,
            serviceType: service.name,
            duration: service.duration,
            price: service.price,
            image: salons.find(s => s.id === selectedSalonId)?.image
          })
        }
      );
      
      if (response.ok) {
        toast.success('Réservation confirmée !', {
          description: `Votre rendez-vous pour ${service.name} le ${date} à ${time} a été confirmé.`
        });
        setSelectedSalonId(null);
        loadData(); // Recharger les données pour inclure le nouveau rendez-vous
      } else {
        toast.error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast.error('Erreur lors de la réservation');
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <Header />
      
      <main className="container mx-auto px-8 py-12 max-w-[1400px]">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="content-stretch flex flex-col gap-[30px] items-center mb-12 text-center">
            <HeroAnimation delay={0.1}>
              <h1 className="relative shrink-0 text-[36px] text-[#191919] max-w-4xl leading-tight">
                Trouvez vos coiffeurs spécialiste cheveux afro ou bouclé
              </h1>
            </HeroAnimation>
            <HeroAnimation delay={0.2}>
              <p className="relative shrink-0 text-[24px] text-[#191919] opacity-80">
                Réservez en ligne avec les meilleurs professionnels près de chez vous
              </p>
            </HeroAnimation>
          </div>
          
          <SlideUp delay={0.3}>
            <SearchBar onSearch={handleSearch} />
          </SlideUp>
        </section>

        {/* Past Appointments Section */}
        {pastAppointments.length > 0 && (
          <section className="mb-24">
            <FadeIn delay={0.4}>
              <h2 className="text-[28px] text-black mb-12">
                Mes rendez-vous passés
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {pastAppointments.map((appointment, index) => (
                <ScaleIn key={appointment.id} delay={0.5 + index * 0.1}>
                  <AppointmentCard appointment={appointment} />
                </ScaleIn>
              ))}
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <HowItWorks />

        {/* Stats Section */}
        <StatsSection />

        {/* Recommended Salons Section */}
        <section>
          <FadeIn delay={0.5}>
            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
              <div className="flex flex-col gap-[15px]">
                <h2 className="text-[24px] text-[#191919]">
                  Coiffeurs recommandés
                </h2>
                <p className="text-[22px] text-[#191919] opacity-80">
                  Les meilleurs professionnels sélectionnés pour vous
                </p>
              </div>
              
              <button className="bg-[#f9f8f8] box-border content-stretch flex gap-[20px] items-center justify-center p-[20px] relative rounded-[30px] shrink-0 border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors">
                <span className="text-[18px]">Voir tous les coiffeurs</span>
              </button>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {salons.map((salon, index) => (
              <ScaleIn key={salon.id} delay={0.6 + index * 0.1}>
                <SalonCard 
                  salon={salon} 
                  onClick={() => setSelectedSalonId(salon.id)}
                />
              </ScaleIn>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Salon Details Modal */}
      {selectedSalonId && (
        <SalonDetails 
          salonId={selectedSalonId}
          onClose={() => setSelectedSalonId(null)}
          onBook={handleBooking}
        />
      )}

      <Footer />
    </div>
  );
}
