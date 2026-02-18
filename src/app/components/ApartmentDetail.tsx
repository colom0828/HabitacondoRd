import React from 'react';
import { MapPin, Star, Wifi, Car, Waves, Users, BedDouble, Bath, Ruler, ChevronLeft, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { DatePicker } from './DatePicker';
import { motion, AnimatePresence } from 'motion/react';

interface ApartmentDetailProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onNavigateToLogin: () => void;
}

const images = [
  'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzg5MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1625579002297-aeebbf69de89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcxNDA1OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYXBhcnRtZW50JTIwa2l0Y2hlbiUyMG1vZGVybnxlbnwxfHx8fDE3NzE0MzQ5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwbWFyYmxlfGVufDF8fHx8MTc3MTM1OTIyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1702830499141-a0634d87d6af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHZpZXclMjBhcGFydG1lbnQlMjBiYWxjb255fGVufDF8fHx8MTc3MTQzNDkyNHww&ixlib=rb-4.1.0&q=80&w=1080'
];

const amenities = [
  { icon: Wifi, label: 'WiFi de Alta Velocidad' },
  { icon: Car, label: 'Parqueo Privado' },
  { icon: Waves, label: 'Piscina' },
  { icon: BedDouble, label: '3 Habitaciones' },
  { icon: Bath, label: '2.5 Baños' },
  { icon: Ruler, label: '180 m²' },
  { icon: Users, label: 'Hasta 6 personas' },
];

const reviews = [
  {
    name: 'María González',
    rating: 5,
    date: 'Febrero 2026',
    comment: 'Excelente apartamento, superó nuestras expectativas. La vista es espectacular y las amenidades de primera clase.',
    avatar: 'MG'
  },
  {
    name: 'Carlos Ramírez',
    rating: 5,
    date: 'Enero 2026',
    comment: 'Perfecta ubicación y muy bien equipado. El host fue muy atento y respondió todas nuestras preguntas rápidamente.',
    avatar: 'CR'
  },
  {
    name: 'Ana Martínez',
    rating: 4,
    date: 'Diciembre 2025',
    comment: 'Muy bonito y cómodo. Solo un pequeño detalle con el aire acondicionado que se solucionó rápido.',
    avatar: 'AM'
  }
];

export function ApartmentDetail({ onBack, isLoggedIn, onNavigateToLogin }: ApartmentDetailProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(undefined);
  const [guests, setGuests] = React.useState(2);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  
  const pricePerNight = 12500;
  const usdRate = 60;
  
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * pricePerNight : 0;
  };
  
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleReserva = () => {
    if (isLoggedIn) {
      setShowConfirmation(true);
    } else {
      onNavigateToLogin();
    }
  };
  
  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0B3C5D] hover:text-[#164E7F] mb-6"
        >
          <ChevronLeft size={20} />
          Volver a resultados
        </button>
        
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4">
            <img
              src={images[currentImage]}
              alt="Apartment"
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg"
            >
              <ChevronLeft className="text-[#0B3C5D]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all shadow-lg"
            >
              <ChevronRight className="text-[#0B3C5D]" />
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`h-24 rounded-xl overflow-hidden transition-all ${
                  idx === currentImage ? 'ring-4 ring-[#0B3C5D]' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl mb-3 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Penthouse Vista al Mar
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-semibold">4.9</span>
                  <span>(128 reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>Piantini, Santo Domingo</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <Card className="p-6 mb-6">
              <h2 className="text-2xl mb-4 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Espectacular penthouse en el corazón de Piantini con vistas panorámicas al mar Caribe. 
                Este lujoso apartamento cuenta con acabados de primera, amplios espacios y las mejores 
                amenidades que puedas imaginar.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ubicado en una de las zonas más exclusivas de Santo Domingo, tendrás acceso a restaurantes 
                de clase mundial, centros comerciales premium y toda la vida cultural de la ciudad. Perfecto 
                para ejecutivos, familias o inversores que buscan lo mejor.
              </p>
            </Card>
            
            {/* Amenities */}
            <Card className="p-6 mb-6">
              <h2 className="text-2xl mb-6 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Amenidades
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F6F8] rounded-xl">
                      <Icon className="text-[#0B3C5D]" size={24} />
                      <span className="text-gray-700">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            {/* Reviews */}
            <Card className="p-6">
              <h2 className="text-2xl mb-6 text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Reseñas
              </h2>
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="pb-6 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[#0B3C5D]">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Booking Card */}
          <div>
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-3xl text-[#0B3C5D] mb-1">
                  DOP ${pricePerNight.toLocaleString()}
                </div>
                <div className="text-gray-500">
                  USD ${Math.round(pricePerNight / usdRate)} / noche
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <DatePicker
                  label="Check-in"
                  selected={checkIn}
                  onSelect={setCheckIn}
                />
                <DatePicker
                  label="Check-out"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  minDate={checkIn}
                />
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Huéspedes</label>
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    max={6}
                  />
                </div>
              </div>
              
              {calculateTotal() > 0 && (
                <div className="mb-6 p-4 bg-[#F5F6F8] rounded-xl">
                  <div className="flex justify-between mb-2 text-gray-700">
                    <span>DOP ${pricePerNight.toLocaleString()} × {calculateNights()} noches</span>
                    <span>DOP ${calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Total en USD</span>
                    <span>USD ${Math.round(calculateTotal() / usdRate)}</span>
                  </div>
                </div>
              )}
              
              {!isLoggedIn && (
                <div className="mb-4 p-4 bg-[#FFF4E6] border border-[#FFB84D] rounded-xl flex items-start gap-3">
                  <Lock className="text-[#FF9500] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm text-[#8B5A00] font-semibold mb-1">
                      Inicia sesión para reservar
                    </p>
                    <p className="text-xs text-[#8B5A00]">
                      Necesitas una cuenta para solicitar una reserva
                    </p>
                  </div>
                </div>
              )}
              
              <Button className="w-full mb-4" onClick={handleReserva}>
                {isLoggedIn ? 'Solicitar Reserva' : 'Iniciar Sesión para Reservar'}
              </Button>
              
              <p className="text-sm text-center text-gray-500">
                * Pago en línea no disponible. Coordinar con el propietario.
              </p>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmation(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <Card className="p-8 mx-4 bg-white shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#164E7F] flex items-center justify-center">
                    <CheckCircle2 className="text-white" size={40} />
                  </div>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl text-center mb-4 text-[#0B3C5D]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Reserva en espera de confirmación
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-gray-600 mb-6 leading-relaxed"
                >
                  Un administrador se pondrá en contacto con usted a la mayor brevedad posible.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-[#0B3C5D] font-semibold text-lg mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  ¡Gracias por elegirnos!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    className="w-full"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Entendido
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}