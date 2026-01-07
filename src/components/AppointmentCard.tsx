import svgPaths from "../imports/svg-2m7cmkaw8t";
import { Star } from 'lucide-react';
import { useState } from 'react';
import { RatingModal } from './RatingModal';

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    salonName: string;
    salonAddress: string;
    serviceType: string;
    duration: string;
    price: number;
    image: string;
  };
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);

  return (
    <>
    <div className="bg-[#f9f8f8] box-border content-stretch flex flex-col md:flex-row gap-3 md:gap-[20px] items-start p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 border border-[#dfdada] hover:shadow-lg transition-shadow">
      {/* Content */}
      <div className="content-stretch flex flex-col md:flex-row gap-3 md:gap-[30px] items-start relative shrink-0 flex-1 w-full">
        {/* Image */}
        <div className="h-[150px] md:h-[185px] relative rounded-[20px] md:rounded-[30px] shrink-0 w-full md:w-[250px] overflow-hidden">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-[20px] md:rounded-[30px] size-full"
            src={appointment.image}
          />
        </div>

        {/* Details */}
        <div className="content-stretch flex flex-col leading-[normal] not-italic relative shrink-0 text-black gap-3 md:gap-4 flex-1 w-full">
          <p className="relative shrink-0 text-lg md:text-[22px] truncate">
            {appointment.date} {appointment.time}
          </p>
          <div className="content-stretch flex flex-col gap-1 md:gap-[5px] items-start relative shrink-0">
            <p className="relative shrink-0 text-sm md:text-[16px] truncate max-w-full">
              {appointment.salonName}
            </p>
            <p className="relative shrink-0 text-xs md:text-[14px] opacity-70 line-clamp-2">
              {appointment.salonAddress}
            </p>
            <p className="relative shrink-0 text-xs md:text-[14px] opacity-70">
              {appointment.serviceType}
            </p>
            <p className="relative shrink-0 text-xs md:text-[14px] opacity-70">
              Durée: {appointment.duration}
            </p>
          </div>
          <p className="relative shrink-0 text-xs md:text-[14px]">
            Prix : {appointment.price}€
          </p>
        </div>
      </div>

      {/* Rating Button */}
      <div
        onClick={() => setShowRatingModal(true)}
        className="bg-white box-border content-stretch flex gap-2 md:gap-[10px] items-center justify-center p-2 md:p-[10px] relative rounded-[20px] md:rounded-[30px] shrink-0 border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors cursor-pointer group w-full md:w-auto"
      >
        <div className="relative rounded-[20px] md:rounded-[30px] shrink-0 w-8 h-8 md:size-[40px]">
          <Star className="w-full h-full text-[#191919] group-hover:text-white group-hover:fill-white transition-colors" strokeWidth={1.5} />
        </div>
        <span className="md:hidden text-sm">Laisser un avis</span>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          appointmentId={appointment.id}
          salonId="1" // This should come from the appointment data
          salonName={appointment.salonName}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
    </>
  );
}
