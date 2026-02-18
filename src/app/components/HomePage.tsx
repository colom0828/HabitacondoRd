import React from 'react';
import { Search, MapPin, Calendar, Users, Star, Wifi, Car, Waves, Dog } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { DatePicker } from './DatePicker';
import { LocationMapPicker } from './LocationMapPicker';
import { motion } from 'motion/react';
import logoSinFondo from "figma:asset/53cba963ea396b5515da13160fbe00e16138950a.png";

interface HomePageProps {
  onNavigateToDetail: () => void;
}

const apartments = [
  {
    id: 1,
    name: 'Penthouse Vista al Mar',
    location: 'Piantini, Santo Domingo',
    city: 'Piantini',
    image: 'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzg5MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 12500,
    rentalType: 'monthly' as 'monthly' | 'daily',
    rating: 4.9,
    reviews: 128,
    maxGuests: 6,
    hasPool: true,
    hasParking: true,
    hasOceanView: true,
    petFriendly: false,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Vista al Mar']
  },
  {
    id: 2,
    name: 'Apartamento Moderno Torre Premium',
    location: 'Naco, Santo Domingo',
    city: 'Naco',
    image: 'https://images.unsplash.com/photo-1625579002297-aeebbf69de89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDA1OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 8500,
    rentalType: 'monthly' as 'monthly' | 'daily',
    rating: 4.8,
    reviews: 96,
    maxGuests: 4,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    amenities: ['Wifi', 'Gimnasio', 'Parqueo']
  },
  {
    id: 3,
    name: 'Suite Ejecutiva Centro',
    location: 'La Esperilla, Santo Domingo',
    city: 'La Esperilla',
    image: 'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYXBhcnRtZW50JTIwa2l0Y2hlbiUyMG1vZGVybnxlbnwxfHx8fDE3NzE0MzQ5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 150,
    rentalType: 'daily' as 'monthly' | 'daily',
    rating: 4.7,
    reviews: 73,
    maxGuests: 3,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    amenities: ['Wifi', 'Parqueo', 'Seguridad 24/7']
  },
  {
    id: 4,
    name: 'Loft de Lujo Zona Colonial',
    location: 'Zona Colonial, Santo Domingo',
    city: 'Zona Colonial',
    image: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwbWFyYmxlfGVufDF8fHx8MTc3MTM1OTIyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 9500,
    rentalType: 'monthly' as 'monthly' | 'daily',
    rating: 4.9,
    reviews: 112,
    maxGuests: 4,
    hasPool: true,
    hasParking: false,
    hasOceanView: false,
    petFriendly: true,
    amenities: ['Wifi', 'Pet Friendly', 'Histórico']
  },
  {
    id: 5,
    name: 'Apartamento Familiar Bella Vista',
    location: 'Bella Vista, Santo Domingo',
    city: 'Bella Vista',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBiYWxjb255fGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 120,
    rentalType: 'daily' as 'monthly' | 'daily',
    rating: 4.6,
    reviews: 85,
    maxGuests: 8,
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Pet Friendly']
  },
  {
    id: 6,
    name: 'Studio Moderno Gazcue',
    location: 'Gazcue, Santo Domingo',
    city: 'Gazcue',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzcxNDM2MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 5000,
    rating: 4.5,
    reviews: 62,
    maxGuests: 2,
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false,
    amenities: ['Wifi', 'Gimnasio']
  }
];

export function HomePage({ onNavigateToDetail }: HomePageProps) {
  const [filters, setFilters] = React.useState({
    minPrice: '',
    maxPrice: '',
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false
  });
  
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(undefined);
  const [location, setLocation] = React.useState<string>('');
  const [guests, setGuests] = React.useState<string>('');
  
  // Estado para búsqueda activa
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchCriteria, setSearchCriteria] = React.useState({
    location: '',
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: ''
  });
  
  const usdRate = 60; // DOP to USD conversion rate
  
  // Función para manejar la búsqueda
  const handleSearch = () => {
    setSearchCriteria({
      location,
      checkIn,
      checkOut,
      guests
    });
    setSearchActive(true);
  };
  
  // Función de filtrado completo
  const filteredApartments = React.useMemo(() => {
    let result = [...apartments];
    
    // Determinar si hay algún filtro activo
    const hasActiveFilters = 
      searchActive ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.hasPool ||
      filters.hasParking ||
      filters.hasOceanView ||
      filters.petFriendly;
    
    // Filtros de búsqueda principal
    if (searchActive) {
      // Filtrar por ubicación
      if (searchCriteria.location) {
        result = result.filter(apt => 
          apt.city.toLowerCase().includes(searchCriteria.location.toLowerCase()) ||
          apt.location.toLowerCase().includes(searchCriteria.location.toLowerCase())
        );
      }
      
      // Filtrar por número de huéspedes
      if (searchCriteria.guests) {
        const guestCount = parseInt(searchCriteria.guests);
        result = result.filter(apt => apt.maxGuests >= guestCount);
      }
      
      // Nota: checkIn y checkOut podrían usarse para verificar disponibilidad
      // En un sistema real, esto consultaría una base de datos de reservas
    }
    
    // Filtros laterales (funcionan independientemente)
    // Filtrar por precio
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      result = result.filter(apt => apt.pricePerNight >= minPrice);
    }
    
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      result = result.filter(apt => apt.pricePerNight <= maxPrice);
    }
    
    // Filtrar por amenidades
    if (filters.hasPool) {
      result = result.filter(apt => apt.hasPool);
    }
    
    if (filters.hasParking) {
      result = result.filter(apt => apt.hasParking);
    }
    
    if (filters.hasOceanView) {
      result = result.filter(apt => apt.hasOceanView);
    }
    
    if (filters.petFriendly) {
      result = result.filter(apt => apt.petFriendly);
    }
    
    return result;
  }, [searchActive, searchCriteria, filters]);
  
  // Determinar si hay filtros activos (para mostrar botones de limpiar)
  const hasActiveFilters = 
    searchActive ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.hasPool ||
    filters.hasParking ||
    filters.hasOceanView ||
    filters.petFriendly;
  
  // Determinar si hay filtros laterales activos
  const hasSideFilters = 
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.hasPool ||
    filters.hasParking ||
    filters.hasOceanView ||
    filters.petFriendly;
  
  // Función para limpiar búsqueda
  const clearSearch = () => {
    setLocation('');
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests('');
    setSearchActive(false);
    setSearchCriteria({
      location: '',
      checkIn: undefined,
      checkOut: undefined,
      guests: ''
    });
    setFilters({
      minPrice: '',
      maxPrice: '',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    });
  };
  
  // Función para limpiar solo filtros laterales
  const clearSideFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1760129744601-80b99947b0b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3NzE0MzYwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C5D]/70 via-[#0B3C5D]/50 to-[#0B3C5D]/70" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Encuentra tu espacio ideal en RD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 text-white/90"
          >
            Apartamentos premium para vivir o invertir en las mejores zonas
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <LocationMapPicker
                placeholder="Ubicación"
                onLocationSelect={setLocation}
              />
              <DatePicker
                placeholder="Check-in"
                selected={checkIn}
                onSelect={setCheckIn}
              />
              <DatePicker
                placeholder="Check-out"
                selected={checkOut}
                onSelect={setCheckOut}
                minDate={checkIn}
              />
              <Input
                type="number"
                placeholder="Huéspedes"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                icon={<Users size={20} />}
                min="1"
                max="10"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button size="lg" className="px-12" onClick={handleSearch}>
                <Search className="inline mr-2" size={20} />
                Buscar
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Apartments */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl mb-6 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Filtros
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Precio por noche (DOP)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {[
                    { key: 'hasPool', label: 'Piscina', icon: Waves },
                    { key: 'hasParking', label: 'Parqueo', icon: Car },
                    { key: 'hasOceanView', label: 'Vista al Mar', icon: Waves },
                    { key: 'petFriendly', label: 'Pet Friendly', icon: Dog }
                  ].map(({ key, label, icon: Icon }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters[key as keyof typeof filters] as boolean}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.checked })}
                        className="w-5 h-5 rounded border-[#B0B7C3] text-[#0B3C5D] focus:ring-[#0B3C5D]"
                      />
                      <Icon size={18} className="text-[#B0B7C3] group-hover:text-[#0B3C5D] transition-colors" />
                      <span className="text-gray-700 group-hover:text-[#0B3C5D] transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {hasSideFilters && (
                <div className="mt-6">
                  <Button size="sm" variant="secondary" onClick={clearSideFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Apartments Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                {searchActive ? 'Resultados de búsqueda' : 'Apartamentos Destacados'}
              </h2>
              {searchActive && (
                <Button variant="secondary" size="sm" onClick={clearSearch}>
                  Limpiar búsqueda
                </Button>
              )}
            </div>
            
            {searchActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-[#0B3C5D]/5 border border-[#0B3C5D]/20 rounded-xl"
              >
                <p className="text-sm text-[#0B3C5D]">
                  <span className="font-semibold">{filteredApartments.length}</span> {filteredApartments.length === 1 ? 'apartamento encontrado' : 'apartamentos encontrados'}
                  {searchCriteria.location && ` en ${searchCriteria.location}`}
                  {searchCriteria.guests && ` para ${searchCriteria.guests} ${parseInt(searchCriteria.guests) === 1 ? 'huésped' : 'huéspedes'}`}
                </p>
              </motion.div>
            )}
            
            {filteredApartments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="bg-[#F5F6F8] rounded-2xl p-12 max-w-md mx-auto">
                  <Search size={64} className="text-[#B0B7C3] mx-auto mb-4" />
                  <h3 className="text-2xl mb-3 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                    No se encontraron apartamentos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    No hay apartamentos que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.
                  </p>
                  <Button onClick={clearSearch}>
                    Ver todos los apartamentos
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredApartments.map((apartment, index) => (
                  <motion.div
                    key={apartment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card hover onClick={onNavigateToDetail}>
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={apartment.image}
                          alt={apartment.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={16} />
                            <span className="font-semibold text-[#0B3C5D]">{apartment.rating}</span>
                            <span className="text-xs text-gray-500">({apartment.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl mb-2 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {apartment.name}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2 mb-4">
                          <MapPin size={16} />
                          {apartment.location}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {apartment.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="px-3 py-1 bg-[#F5F6F8] text-[#0B3C5D] rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                          <div>
                            <div className="text-2xl text-[#0B3C5D]">
                              DOP ${apartment.pricePerNight.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              USD ${Math.round(apartment.pricePerNight / usdRate)} / noche
                            </div>
                          </div>
                          <Button size="sm" variant="secondary">
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0B3C5D] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <img src={logoSinFondo} alt="Habita-condo RD" className="h-16 w-auto mb-3" />
              <p className="text-[#B0B7C3] text-sm">
                Administración premium de apartamentos y condominios
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#B0B7C3] text-sm">
                © 2026 Habita-condo RD. Todos los derechos reservados.
              </p>
              <p className="text-[#B0B7C3] text-xs mt-2">
                Santo Domingo, República Dominicana
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}