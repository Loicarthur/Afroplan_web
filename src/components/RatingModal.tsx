import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RatingModalProps {
  appointmentId: string;
  salonId: string;
  salonName: string;
  onClose: () => void;
}

export function RatingModal({ appointmentId, salonId, salonName, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Veuillez sélectionner une note');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0130ebd3/reviews`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            salonId,
            userId: 'user-demo',
            rating,
            comment
          })
        }
      );

      if (response.ok) {
        toast.success('Merci pour votre avis !');
        onClose();
      } else {
        toast.error('Erreur lors de l\'envoi de votre avis');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error);
      toast.error('Erreur lors de l\'envoi de votre avis');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[30px] max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] text-[#191919]">Noter votre expérience</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <p className="text-[#191919] mb-2">Comment était votre visite chez {salonName} ?</p>
          </div>

          {/* Star Rating */}
          <div className="flex gap-2 justify-center py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={40}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'fill-[#191919] text-[#191919]'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-center text-[#191919] opacity-70">
              {rating === 1 && 'Décevant'}
              {rating === 2 && 'Moyen'}
              {rating === 3 && 'Bien'}
              {rating === 4 && 'Très bien'}
              {rating === 5 && 'Excellent'}
            </p>
          )}

          {/* Comment */}
          <div>
            <label className="block text-[#191919] mb-2">
              Votre avis (optionnel)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience..."
              rows={4}
              className="w-full p-4 rounded-[20px] border border-[#191919] bg-white resize-none outline-none focus:ring-2 focus:ring-[#191919]/20"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || rating === 0}
            className="w-full bg-[#191919] text-white p-4 rounded-[30px] hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
          </button>
        </div>
      </div>
    </div>
  );
}
