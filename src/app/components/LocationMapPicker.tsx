import React from 'react';
import { MapPin, X, Star, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocationMapPickerProps {
  onLocationSelect?: (location: string) => void;
  placeholder?: string;
  className?: string;
}

interface Apartment {
  id: number;
  name: string;
  location: string;
  position: { x: number; y: number }; // Position on the map (percentage)
  price: number;
  rating: number;
}

const apartmentLocations: Apartment[] = [
  {
    id: 1,
    name: 'Penthouse Vista al Mar',
    location: 'Piantini, Santo Domingo',
    position: { x: 55, y: 45 },
    price: 12500,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Apartamento Moderno Torre Premium',
    location: 'Naco, Santo Domingo',
    position: { x: 60, y: 40 },
    price: 8500,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Suite Ejecutiva Centro',
    location: 'La Esperilla, Santo Domingo',
    position: { x: 50, y: 50 },
    price: 6500,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Loft de Lujo Zona Colonial',
    location: 'Zona Colonial, Santo Domingo',
    position: { x: 45, y: 55 },
    price: 9500,
    rating: 4.9
  }
];

export function LocationMapPicker({ 
  onLocationSelect,
  placeholder = 'Ubicación',
  className = ''
}: LocationMapPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [hoveredApt, setHoveredApt] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setIsOpen(false);
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation('');
    if (onLocationSelect) {
      onLocationSelect('');
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[#0B3C5D]/40
            hover:border-[#0B3C5D] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 
            focus:ring-[#0B3C5D]/20 transition-all duration-300 bg-white/95 backdrop-blur-sm text-left
            flex items-center justify-between"
        >
          <span className={selectedLocation ? 'text-[#0B3C5D]' : 'text-gray-500'}>
            {selectedLocation || placeholder}
          </span>
        </button>
        
        {/* Icon positioned absolutely */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B3C5D] pointer-events-none">
          <MapPin size={20} />
        </div>
        
        {selectedLocation && (
          <div
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
          >
            <X size={16} className="text-gray-500" />
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(11, 60, 93, 0.2)',
              width: '400px',
              maxWidth: '90vw'
            }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0B3C5D]/5 border-b border-[#0B3C5D]/10">
              <h3 className="text-lg font-semibold text-[#0B3C5D]">
                Ubicaciones Disponibles
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#0B3C5D]/10 rounded-full transition-colors"
              >
                <X size={18} className="text-[#0B3C5D]" />
              </button>
            </div>
            
            <div className="p-4">
              {/* Location List */}
              <div className="space-y-2">
                {apartmentLocations.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => handleLocationClick(apt.location)}
                    onMouseEnter={() => setHoveredApt(apt.id)}
                    onMouseLeave={() => setHoveredApt(null)}
                    className="w-full p-4 rounded-xl hover:bg-[#F5F6F8] transition-all text-left
                      border-2 border-transparent hover:border-[#0B3C5D]/20 hover:shadow-md
                      transform hover:scale-[1.02] duration-200"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-[#0B3C5D]" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="font-semibold text-[#0B3C5D] mb-1">
                          {apt.location}
                        </div>
                        <div className="text-sm text-gray-600">
                          {apt.name}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-semibold text-[#0B3C5D]">
                            DOP ${apt.price.toLocaleString()}/noche
                          </span>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{apt.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}