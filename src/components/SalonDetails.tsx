import { useState, useEffect } from 'react';
import { X, MapPin, Star, Clock, Euro, Calendar, Phone, Mail } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Service {
  name: string;
  duration: string;
  price: number;
}

interface SalonDetailsProps {
  salonId: string;
  onClose: () => void;
  onBook: (service: Service, date: string, time: string) => void;
}

export function SalonDetails({ salonId, onClose, onBook }: SalonDetailsProps) {
  const [salon, setSalon] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalonDetails();
  }, [salonId]);

  const loadSalonDetails = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0130ebd3/salons/${salonId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSalon(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails du salon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      onBook(selectedService, selectedDate, selectedTime);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[30px] p-8">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!salon) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-[30px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-[30px] border-b border-gray-100 p-6 flex items-center justify-between z-10">
          <h2 className="text-[28px] text-[#191919]">{salon.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Image */}
          <div className="w-full h-[400px] rounded-[30px] overflow-hidden">
            <img 
              src={salon.image} 
              alt={salon.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#191919]">
                <MapPin size={20} />
                <span>{salon.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-[#191919]">
                <Star size={20} className="fill-[#191919]" />
                <span>{salon.rating} ({salon.reviewCount} avis)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {salon.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="bg-[#f9f8f8] px-4 py-2 rounded-[30px] border border-[#191919] text-[14px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          {salon.description && (
            <div>
              <h3 className="text-[22px] text-[#191919] mb-4">À propos</h3>
              <p className="text-[#191919] opacity-70">{salon.description}</p>
            </div>
          )}

          {/* Services */}
          <div>
            <h3 className="text-[22px] text-[#191919] mb-4">Services</h3>
            <div className="space-y-3">
              {salon.services?.map((service: Service, index: number) => (
                <div 
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className={`bg-[#f9f8f8] p-4 rounded-[30px] cursor-pointer transition-all border-2 ${
                    selectedService?.name === service.name 
                      ? 'border-[#191919]' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#191919]">{service.name}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm opacity-70">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {service.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Euro size={14} />
                          {service.price}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          {selectedService && (
            <div className="bg-[#f9f8f8] p-6 rounded-[30px] space-y-4">
              <h3 className="text-[22px] text-[#191919]">Réserver {selectedService.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#191919] mb-2">Date</label>
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-[20px] border border-[#191919] bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-[#191919] mb-2">Heure</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 rounded-[20px] border border-[#191919] bg-white"
                  >
                    <option value="">Sélectionner une heure</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-[#191919] text-white p-4 rounded-[30px] hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmer la réservation
              </button>
            </div>
          )}

          {/* Schedule */}
          {salon.schedule && (
            <div>
              <h3 className="text-[22px] text-[#191919] mb-4">Horaires</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(salon.schedule).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between bg-[#f9f8f8] p-3 rounded-[20px]">
                    <span className="capitalize text-[#191919]">{day}</span>
                    <span className="text-[#191919] opacity-70">{hours as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
