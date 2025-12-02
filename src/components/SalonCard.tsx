import svgPaths from "../imports/svg-2m7cmkaw8t";
import { Star, MapPin } from 'lucide-react';

interface SalonCardProps {
  salon: {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    image: string;
    tags: string[];
    priceFrom: number;
  };
  onClick?: () => void;
}

export function SalonCard({ salon, onClick }: SalonCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-[#f9f8f8] content-stretch flex gap-[10px] items-center relative rounded-[30px] shrink-0 overflow-hidden border border-[#dfdada] hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      <div className="box-border content-stretch flex flex-col gap-[20px] h-full items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full">
        {/* Image */}
        <div className="basis-0 grow min-h-[300px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full overflow-hidden">
          <img 
            alt={salon.name} 
            className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full group-hover:scale-105 transition-transform duration-300" 
            src={salon.image} 
          />
        </div>

        {/* Content */}
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[10px] px-4 relative w-full">
              {/* Name and Location */}
              <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full">
                <h3 className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-[22px] text-nowrap whitespace-pre">
                  {salon.name}
                </h3>
                <div className="content-stretch flex flex-col leading-[normal] not-italic relative shrink-0 text-[#191919] text-[14px] text-nowrap w-full whitespace-pre gap-1">
                  <div className="flex items-center gap-1 opacity-70">
                    <MapPin size={14} />
                    <span>{salon.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-[#191919]" />
                    <span>{salon.rating} ({salon.reviewCount} avis)</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 flex-wrap">
                {salon.tags.map((tag, index) => (
                  <div 
                    key={index}
                    className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] px-4 relative rounded-[30px] shrink-0 border border-[#191919]"
                  >
                    <span className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-[14px] text-nowrap whitespace-pre">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <p className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-[14px] text-nowrap whitespace-pre opacity-70">
                Prix à partir de : {salon.priceFrom}€
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
