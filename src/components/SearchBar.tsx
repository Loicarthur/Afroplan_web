import { useState } from 'react';
import svgPaths from "../imports/svg-2m7cmkaw8t";
import imgBabyFace from "figma:asset/f7a12a6ef6fe87cdd8df59763dd3efb753254314.png";
import { Search, MapPin, ChevronDown, Home } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string, location: string, serviceType: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('Au salon');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, location, serviceType);
    }
  };

  return (
    <div className="bg-[#191919] box-border content-stretch flex flex-col gap-[20px] items-start justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0">
      {/* Main Search Bar */}
      <div className="bg-[#f9f8f8] box-border content-stretch flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-[20px] items-stretch md:items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 w-full">
        {/* Search Input */}
        <div className="bg-[#f9f8f8] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 flex-1 w-full md:min-w-[250px]">
          <div className="relative shrink-0 w-6 h-6 md:size-[40px]">
            <Search className="w-full h-full text-[#191919]" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Recherche par type de coiffure, coiffeur"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-sm md:text-[18px] bg-transparent outline-none flex-1 min-w-0"
          />
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden md:flex h-[57px] items-center justify-center relative shrink-0 w-0">
          <div className="flex-none rotate-[90deg]">
            <div className="h-0 relative w-[57px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 1">
                  <line stroke="#191919" x2="57" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Location Input */}
        <div className="bg-[#f9f8f8] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 flex-1 w-full md:min-w-[200px]">
          <div className="relative shrink-0 w-6 h-6 md:size-[40px]">
            <MapPin className="w-full h-full text-[#191919]" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Ville, quartier..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-sm md:text-[18px] bg-transparent outline-none flex-1 min-w-0"
          />
        </div>

        {/* Service Type Dropdown */}
        <div className="bg-[#f9f8f8] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 cursor-pointer hover:bg-gray-100 transition-colors w-full md:w-auto">
          <span className="leading-[normal] not-italic relative shrink-0 text-[#191919] text-sm md:text-[18px]">
            {serviceType}
          </span>
          <div className="relative shrink-0 w-6 h-6 md:size-[40px]">
            <ChevronDown className="w-full h-full text-[#191919]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden md:flex h-[57px] items-center justify-center relative shrink-0 w-0">
          <div className="flex-none rotate-[90deg]">
            <div className="h-0 relative w-[57px]">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 1">
                  <line stroke="#191919" x2="57" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-[#f9f8f8] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors w-full md:w-auto"
        >
          <span className="leading-[normal] not-italic relative shrink-0 text-sm md:text-[18px]">
            Rechercher
          </span>
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="content-stretch flex gap-3 md:gap-[30px] items-center relative shrink-0 flex-wrap w-full md:w-auto">
        <button className="bg-[#191919] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 border border-[#f9f8f8] hover:bg-[#f9f8f8] hover:text-[#191919] transition-colors flex-1 md:flex-none">
          <div className="relative shrink-0 w-6 h-6 md:size-[40px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <g>
                <g>
                  <path d={svgPaths.p7b41e00} stroke="#F9F8F8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                </g>
                <g>
                  <path d={svgPaths.pc9f3780} stroke="#F9F8F8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                  <path d={svgPaths.p25ee6e00} stroke="#F9F8F8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                </g>
              </g>
            </svg>
          </div>
          <span className="leading-[normal] not-italic relative shrink-0 text-[#f9f8f8] text-sm md:text-[18px]">
            Filtres
          </span>
        </button>

        <button className="bg-[#191919] box-border content-stretch flex gap-3 md:gap-[20px] items-center justify-center p-3 md:p-[20px] relative rounded-[20px] md:rounded-[30px] shrink-0 border border-[#f9f8f8] hover:bg-[#f9f8f8] hover:text-[#191919] transition-colors flex-1 md:flex-none">
          <div className="relative shrink-0 w-6 h-6 md:size-[40px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgBabyFace} />
          </div>
          <span className="leading-[normal] not-italic relative shrink-0 text-[#f9f8f8] text-sm md:text-[18px]">
            Kids Friendly
          </span>
        </button>
      </div>
    </div>
  );
}
