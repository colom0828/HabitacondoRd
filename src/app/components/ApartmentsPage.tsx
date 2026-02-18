import React from 'react';
import { Search, MapPin, Star, Users, Bed, Bath, Maximize, Wifi, Car, Waves, Dog, Utensils, Tv, Wind, Dumbbell } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { motion } from 'motion/react';

interface ApartmentsPageProps {
  onNavigateToDetail: () => void;
}

const allApartments = [
  {
    id: 1,
    name: 'Penthouse Vista al Mar',
    location: 'Piantini, Santo Domingo',
    city: 'Piantini',
    image: 'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzg5MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 12500,
    rating: 4.9,
    reviews: 128,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: 250,
    hasPool: true,
    hasParking: true,
    hasOceanView: true,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Vista al Mar', 'Gimnasio', 'AC']
  },
  {
    id: 2,
    name: 'Apartamento Moderno Torre Premium',
    location: 'Naco, Santo Domingo',
    city: 'Naco',
    image: 'https://images.unsplash.com/photo-1625579002297-aeebbf69de89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDA1OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 8500,
    rating: 4.8,
    reviews: 96,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 180,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Gimnasio', 'Parqueo', 'AC']
  },
  {
    id: 3,
    name: 'Suite Ejecutiva Centro',
    location: 'La Esperilla, Santo Domingo',
    city: 'La Esperilla',
    image: 'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYXBhcnRtZW50JTIwa2l0Y2hlbiUyMG1vZGVybnxlbnwxfHx8fDE3NzE0MzQ5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 6500,
    rating: 4.7,
    reviews: 73,
    maxGuests: 3,
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    hasGym: false,
    hasAC: true,
    amenities: ['Wifi', 'Parqueo', 'Seguridad 24/7', 'AC']
  },
  {
    id: 4,
    name: 'Loft de Lujo Zona Colonial',
    location: 'Zona Colonial, Santo Domingo',
    city: 'Zona Colonial',
    image: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwbWFyYmxlfGVufDF8fHx8MTc3MTM1OTIyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 9500,
    rating: 4.9,
    reviews: 112,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 160,
    hasPool: true,
    hasParking: false,
    hasOceanView: false,
    petFriendly: true,
    hasGym: false,
    hasAC: true,
    amenities: ['Wifi', 'Pet Friendly', 'Histórico', 'AC', 'Piscina']
  },
  {
    id: 5,
    name: 'Apartamento Familiar Bella Vista',
    location: 'Bella Vista, Santo Domingo',
    city: 'Bella Vista',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBiYWxjb255fGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 7500,
    rating: 4.6,
    reviews: 85,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: true,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Pet Friendly', 'Gimnasio', 'AC']
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
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Gimnasio', 'AC']
  },
  {
    id: 7,
    name: 'Residencia Ejecutiva Los Cacicazgos',
    location: 'Los Cacicazgos, Santo Domingo',
    city: 'Los Cacicazgos',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 10500,
    rating: 4.8,
    reviews: 94,
    maxGuests: 5,
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Gimnasio', 'AC', 'Seguridad']
  },
  {
    id: 8,
    name: 'Torre Premium Seralles',
    location: 'Seralles, Santo Domingo',
    city: 'Seralles',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 11000,
    rating: 4.9,
    reviews: 105,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: 230,
    hasPool: true,
    hasParking: true,
    hasOceanView: true,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Vista al Mar', 'Gimnasio', 'AC']
  },
  {
    id: 9,
    name: 'Apartamento Boutique Evaristo Morales',
    location: 'Evaristo Morales, Santo Domingo',
    city: 'Evaristo Morales',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGluaW5nfGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 7800,
    rating: 4.7,
    reviews: 78,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: true,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Parqueo', 'Pet Friendly', 'Gimnasio', 'AC']
  },
  {
    id: 10,
    name: 'Suite de Lujo Paraíso',
    location: 'Paraíso, Santo Domingo',
    city: 'Paraíso',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwYmVkfGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 9200,
    rating: 4.8,
    reviews: 89,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: 175,
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Gimnasio', 'AC', 'Cocina Premium']
  },
  {
    id: 11,
    name: 'Residencia Familiar Arroyo Hondo',
    location: 'Arroyo Hondo, Santo Domingo',
    city: 'Arroyo Hondo',
    image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTQzNjA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 13500,
    rating: 4.9,
    reviews: 142,
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: true,
    hasGym: true,
    hasAC: true,
    amenities: ['Wifi', 'Piscina', 'Parqueo', 'Pet Friendly', 'Gimnasio', 'AC', 'Jardín']
  },
  {
    id: 12,
    name: 'Loft Minimalista Julieta',
    location: 'Julieta, Santo Domingo',
    city: 'Julieta',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzE0MzYwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pricePerNight: 6800,
    rating: 4.6,
    reviews: 71,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: 95,
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false,
    hasGym: false,
    hasAC: true,
    amenities: ['Wifi', 'Parqueo', 'AC', 'Diseño Moderno']
  }
];

export function ApartmentsPage({ onNavigateToDetail }: ApartmentsPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState({
    minPrice: '',
    maxPrice: '',
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false,
    hasGym: false
  });
  
  const usdRate = 60; // DOP to USD conversion rate
  
  // Función de filtrado
  const filteredApartments = React.useMemo(() => {
    let result = [...allApartments];
    
    // Filtrar por búsqueda de texto
    if (searchTerm) {
      result = result.filter(apt => 
        apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
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
    
    if (filters.hasGym) {
      result = result.filter(apt => apt.hasGym);
    }
    
    return result;
  }, [searchTerm, filters]);
  
  // Determinar si hay filtros activos
  const hasActiveFilters = 
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.hasPool ||
    filters.hasParking ||
    filters.hasOceanView ||
    filters.petFriendly ||
    filters.hasGym;
  
  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false,
      hasGym: false
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl mb-6 text-center"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Todos los Apartamentos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-center text-white/90 mb-8"
          >
            Explora nuestra colección completa de propiedades premium en República Dominicana
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B3C5D]" size={20} />
              <Input
                type="text"
                placeholder="Buscar por nombre, ubicación o zona..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Filtros
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#B0B7C3] hover:text-[#0B3C5D] transition-colors"
                >
                  Limpiar
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Price Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Precio por noche (DOP)
                  </label>
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
                
                {/* Amenities Filter */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Amenidades
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'hasPool', label: 'Piscina', icon: Waves },
                      { key: 'hasParking', label: 'Parqueo', icon: Car },
                      { key: 'hasOceanView', label: 'Vista al Mar', icon: Waves },
                      { key: 'petFriendly', label: 'Pet Friendly', icon: Dog },
                      { key: 'hasGym', label: 'Gimnasio', icon: Dumbbell }
                    ].map(({ key, label, icon: Icon }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters[key as keyof typeof filters] as boolean}
                          onChange={(e) => setFilters({ ...filters, [key]: e.target.checked })}
                          className="w-5 h-5 rounded border-[#B0B7C3] text-[#0B3C5D] focus:ring-[#0B3C5D]"
                        />
                        <Icon size={18} className="text-[#B0B7C3] group-hover:text-[#0B3C5D] transition-colors" />
                        <span className="text-gray-700 group-hover:text-[#0B3C5D] transition-colors text-sm">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Apartments Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-[#0B3C5D]">{filteredApartments.length}</span> {filteredApartments.length === 1 ? 'apartamento encontrado' : 'apartamentos encontrados'}
              </p>
            </div>
            
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
                  <p className="text-gray-600">
                    No hay apartamentos que coincidan con tus criterios. Intenta ajustar los filtros.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApartments.map((apartment, index) => (
                  <motion.div
                    key={apartment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card hover onClick={onNavigateToDetail}>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={apartment.image}
                          alt={apartment.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={14} />
                            <span className="text-sm font-semibold text-[#0B3C5D]">{apartment.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg mb-2 text-[#0B3C5D] line-clamp-1" style={{ fontFamily: 'var(--font-heading)' }}>
                          {apartment.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                          <MapPin size={14} />
                          {apartment.city}
                        </p>
                        
                        {/* Property Info */}
                        <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {apartment.maxGuests}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed size={14} />
                            {apartment.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath size={14} />
                            {apartment.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize size={14} />
                            {apartment.area}m²
                          </span>
                        </div>
                        
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {apartment.amenities.slice(0, 3).map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2 py-0.5 bg-[#F5F6F8] text-[#0B3C5D] rounded-full text-xs"
                            >
                              {amenity}
                            </span>
                          ))}
                          {apartment.amenities.length > 3 && (
                            <span className="px-2 py-0.5 bg-[#F5F6F8] text-[#0B3C5D] rounded-full text-xs">
                              +{apartment.amenities.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                          <div>
                            <div className="text-xl text-[#0B3C5D]">
                              DOP ${apartment.pricePerNight.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
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
    </div>
  );
}