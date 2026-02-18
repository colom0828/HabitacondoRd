import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  EyeOff,
  MessageSquare,
  Calendar,
  User,
  Home,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ReseñasModuleProps {
  isDarkMode?: boolean;
}

interface Reseña {
  id: string;
  apartamento: string;
  condominio: string;
  cliente: {
    nombre: string;
    email: string;
    foto?: string;
  };
  rating: number;
  titulo: string;
  comentario: string;
  fecha: string;
  estado: 'Pendiente' | 'Aprobada' | 'Oculta';
  reservaId: string;
  respuesta?: string;
}

const RESEÑAS_EJEMPLO: Reseña[] = [
  {
    id: 'RES-001',
    apartamento: 'Penthouse Vista Mar',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Carlos Fernández',
      email: 'carlos.f@email.com'
    },
    rating: 5,
    titulo: '¡Experiencia inolvidable!',
    comentario: 'La vista al mar es espectacular, el apartamento está impecable y muy bien equipado. La atención del personal fue excelente. Definitivamente volveremos.',
    fecha: '2026-02-15',
    estado: 'Aprobada',
    reservaId: 'RES-001'
  },
  {
    id: 'RES-002',
    apartamento: 'Suite Ejecutiva 402',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com'
    },
    rating: 4,
    titulo: 'Muy buena estadía',
    comentario: 'Apartamento cómodo y limpio. La ubicación es perfecta. Solo le faltó un poco más de iluminación en la sala, pero en general todo estuvo muy bien.',
    fecha: '2026-02-14',
    estado: 'Aprobada',
    reservaId: 'RES-002',
    respuesta: 'Gracias por tu comentario María. Tomaremos en cuenta tu sugerencia sobre la iluminación. ¡Esperamos verte pronto!'
  },
  {
    id: 'RES-003',
    apartamento: 'Loft Moderno 305',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Roberto Martínez',
      email: 'r.martinez@email.com'
    },
    rating: 5,
    titulo: 'Perfecto para vacaciones',
    comentario: 'Todo estuvo perfecto. El loft es moderno, espacioso y muy bien decorado. Las amenidades del condominio son de primera clase.',
    fecha: '2026-02-18',
    estado: 'Pendiente',
    reservaId: 'RES-003'
  },
  {
    id: 'RES-004',
    apartamento: 'Apartamento Playa 201',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Ana Jiménez',
      email: 'ana.jimenez@email.com'
    },
    rating: 3,
    titulo: 'Bueno pero mejorable',
    comentario: 'La ubicación es excelente y el apartamento está bien. Sin embargo, el aire acondicionado no enfriaba suficiente y tuvimos algunos problemas con el agua caliente.',
    fecha: '2026-02-16',
    estado: 'Pendiente',
    reservaId: 'RES-004'
  },
  {
    id: 'RES-005',
    apartamento: 'Suite Playa 102',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'Patricia Sánchez',
      email: 'patricia.s@email.com'
    },
    rating: 5,
    titulo: 'Excepcional en todo sentido',
    comentario: 'Desde el check-in hasta el check-out, todo fue excepcional. El apartamento superó nuestras expectativas. Totalmente recomendado.',
    fecha: '2026-02-12',
    estado: 'Aprobada',
    reservaId: 'RES-005'
  },
  {
    id: 'RES-006',
    apartamento: 'Penthouse Vista Mar',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Eduardo Ramírez',
      email: 'eduardo.r@email.com'
    },
    rating: 2,
    titulo: 'Decepcionante',
    comentario: 'No correspondió con las fotos. Había varios detalles de mantenimiento pendientes y el servicio de limpieza no fue el esperado.',
    fecha: '2026-02-17',
    estado: 'Oculta',
    reservaId: 'RES-006'
  },
  {
    id: 'RES-007',
    apartamento: 'Studio Premium 104',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Luis Hernández',
      email: 'luis.h@email.com'
    },
    rating: 4,
    titulo: 'Buena relación calidad-precio',
    comentario: 'Para el precio, el apartamento está muy bien. Limpio, funcional y en buena ubicación. Ideal para estancias cortas.',
    fecha: '2026-02-11',
    estado: 'Aprobada',
    reservaId: 'RES-007'
  },
  {
    id: 'RES-008',
    apartamento: 'Loft Moderno 305',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Carmen Díaz',
      email: 'carmen.diaz@email.com'
    },
    rating: 5,
    titulo: 'Increíble diseño interior',
    comentario: 'El diseño del loft es espectacular. Muy moderno y con todas las comodidades. La terraza es hermosa. ¡Volveremos sin duda!',
    fecha: '2026-02-10',
    estado: 'Aprobada',
    reservaId: 'RES-008'
  }
];

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

export function ReseñasModule({ isDarkMode }: ReseñasModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [reseñas, setReseñas] = React.useState<Reseña[]>(RESEÑAS_EJEMPLO);
  const [filtroEstado, setFiltroEstado] = React.useState<string>('Todas');
  const [filtroApartamento, setFiltroApartamento] = React.useState<string>('Todos');
  const [busqueda, setBusqueda] = React.useState('');
  const [reseñaSeleccionada, setReseñaSeleccionada] = React.useState<Reseña | null>(null);

  // Calcular ratings promedio por apartamento
  const apartamentosUnicos = Array.from(new Set(reseñas.map(r => r.apartamento)));
  const ratingsPorApartamento = apartamentosUnicos.map(apt => {
    const reseñasApt = reseñas.filter(r => r.apartamento === apt && r.estado === 'Aprobada');
    const promedio = reseñasApt.length > 0
      ? reseñasApt.reduce((sum, r) => sum + r.rating, 0) / reseñasApt.length
      : 0;
    return {
      apartamento: apt,
      rating: promedio,
      totalReseñas: reseñasApt.length
    };
  }).sort((a, b) => b.rating - a.rating);

  // Estadísticas generales
  const totalReseñas = reseñas.length;
  const pendientes = reseñas.filter(r => r.estado === 'Pendiente').length;
  const aprobadas = reseñas.filter(r => r.estado === 'Aprobada').length;
  const ocultas = reseñas.filter(r => r.estado === 'Oculta').length;
  const ratingPromedio = reseñas.filter(r => r.estado === 'Aprobada').length > 0
    ? (reseñas.filter(r => r.estado === 'Aprobada').reduce((sum, r) => sum + r.rating, 0) / 
       reseñas.filter(r => r.estado === 'Aprobada').length).toFixed(1)
    : '0.0';

  // Filtrar reseñas
  const reseñasFiltradas = reseñas.filter(reseña => {
    const matchEstado = filtroEstado === 'Todas' || reseña.estado === filtroEstado;
    const matchApartamento = filtroApartamento === 'Todos' || reseña.apartamento === filtroApartamento;
    const matchBusqueda = busqueda === '' || 
      reseña.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      reseña.comentario.toLowerCase().includes(busqueda.toLowerCase()) ||
      reseña.apartamento.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchApartamento && matchBusqueda;
  });

  const aprobarReseña = (id: string) => {
    setReseñas(reseñas.map(r => r.id === id ? { ...r, estado: 'Aprobada' as const } : r));
  };

  const ocultarReseña = (id: string) => {
    setReseñas(reseñas.map(r => r.id === id ? { ...r, estado: 'Oculta' as const } : r));
  };

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
          Reseñas y Valoraciones
        </h1>
        <p className={dm.textSecondary}>Gestión de reseñas de clientes y rating de apartamentos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
              <TrendingUp className="text-yellow-600" size={20} />
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {ratingPromedio} ⭐
            </h3>
            <p className="text-sm text-gray-600 mb-2">Rating Promedio</p>
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(parseFloat(ratingPromedio))} size={14} />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {totalReseñas}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Total Reseñas</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 font-semibold">{aprobadas} aprobadas</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {pendientes}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Pendientes de Aprobación</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-600 font-semibold">Requieren acción</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <EyeOff className="text-gray-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {ocultas}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Reseñas Ocultas</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">No visibles públicamente</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Rating Promedio por Apartamento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Rating Promedio por Apartamento
              </h3>
              <p className="text-sm text-gray-600">Valoración de clientes por unidad</p>
            </div>
            <Home className="text-[#0B3C5D]" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ratingsPorApartamento.map((apt, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">{apt.apartamento}</h4>
                    <p className="text-xs text-gray-500">{apt.totalReseñas} reseñas</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={18} />
                      <span className="text-lg font-bold text-[#0B3C5D]">
                        {apt.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <StarRating rating={Math.round(apt.rating)} size={16} />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${(apt.rating / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Filtros y Búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar reseñas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent appearance-none"
              >
                <option>Todas</option>
                <option>Pendiente</option>
                <option>Aprobada</option>
                <option>Oculta</option>
              </select>
            </div>

            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroApartamento}
                onChange={(e) => setFiltroApartamento(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent appearance-none"
              >
                <option>Todos</option>
                {apartamentosUnicos.map((apt, index) => (
                  <option key={index}>{apt}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {reseñasFiltradas.length} {reseñasFiltradas.length === 1 ? 'reseña' : 'reseñas'}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Lista de Reseñas */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {reseñasFiltradas.map((reseña, index) => (
            <motion.div
              key={reseña.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Columna Izquierda: Info del Cliente y Apartamento */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#328CC1] flex items-center justify-center text-white font-semibold">
                          {reseña.cliente.nombre.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{reseña.cliente.nombre}</h3>
                          <p className="text-sm text-gray-500">{reseña.cliente.email}</p>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reseña.estado === 'Aprobada' 
                          ? 'bg-green-100 text-green-700'
                          : reseña.estado === 'Pendiente'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {reseña.estado === 'Aprobada' ? '✓ Aprobada' : 
                         reseña.estado === 'Pendiente' ? '⏳ Pendiente' : '🔒 Oculta'}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Home size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">{reseña.apartamento}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{reseña.condominio}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {new Date(reseña.fecha).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <StarRating rating={reseña.rating} size={20} />
                        <span className="text-lg font-bold text-[#0B3C5D]">{reseña.rating}.0</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{reseña.titulo}</h4>
                      <p className="text-gray-600 leading-relaxed">{reseña.comentario}</p>
                    </div>

                    {reseña.respuesta && (
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-[#0B3C5D] rounded">
                        <p className="text-sm font-semibold text-[#0B3C5D] mb-1">Respuesta del equipo:</p>
                        <p className="text-sm text-gray-700">{reseña.respuesta}</p>
                      </div>
                    )}
                  </div>

                  {/* Columna Derecha: Acciones */}
                  <div className="flex flex-col gap-2 md:w-48">
                    <Button
                      variant="outline"
                      onClick={() => setReseñaSeleccionada(reseña)}
                      className="w-full"
                    >
                      <Eye size={16} className="mr-2" />
                      Ver Detalles
                    </Button>

                    {reseña.estado === 'Pendiente' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => aprobarReseña(reseña.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Aprobar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => ocultarReseña(reseña.id)}
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={16} className="mr-2" />
                          Ocultar
                        </Button>
                      </>
                    )}

                    {reseña.estado === 'Aprobada' && (
                      <Button
                        variant="outline"
                        onClick={() => ocultarReseña(reseña.id)}
                        className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                      >
                        <EyeOff size={16} className="mr-2" />
                        Ocultar
                      </Button>
                    )}

                    {reseña.estado === 'Oculta' && (
                      <Button
                        variant="outline"
                        onClick={() => aprobarReseña(reseña.id)}
                        className="w-full border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <Eye size={16} className="mr-2" />
                        Aprobar
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {reseñasFiltradas.length === 0 && (
        <Card className="p-12 text-center">
          <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-xl text-gray-600 mb-2">No se encontraron reseñas</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </Card>
      )}

      {/* Modal de Detalles */}
      <AnimatePresence>
        {reseñaSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setReseñaSeleccionada(null)}
              className="w-full max-w-2xl"
            >
              <Card className="p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Detalles de la Reseña
                  </h2>
                  <button
                    onClick={() => setReseñaSeleccionada(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Cliente</p>
                      <p className="font-semibold text-gray-800">{reseñaSeleccionada.cliente.nombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="font-semibold text-gray-800">{reseñaSeleccionada.cliente.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Apartamento</p>
                      <p className="font-semibold text-gray-800">{reseñaSeleccionada.apartamento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Condominio</p>
                      <p className="font-semibold text-gray-800">{reseñaSeleccionada.condominio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fecha</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(reseñaSeleccionada.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estado</p>
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        reseñaSeleccionada.estado === 'Aprobada' 
                          ? 'bg-green-100 text-green-700'
                          : reseñaSeleccionada.estado === 'Pendiente'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {reseñaSeleccionada.estado}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Valoración</p>
                    <div className="flex items-center gap-3">
                      <StarRating rating={reseñaSeleccionada.rating} size={24} />
                      <span className="text-2xl font-bold text-[#0B3C5D]">
                        {reseñaSeleccionada.rating}.0
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Título</p>
                    <p className="text-lg font-semibold text-gray-800">{reseñaSeleccionada.titulo}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Comentario</p>
                    <p className="text-gray-700 leading-relaxed">{reseñaSeleccionada.comentario}</p>
                  </div>

                  {reseñaSeleccionada.respuesta && (
                    <div className="p-4 bg-blue-50 border-l-4 border-[#0B3C5D] rounded">
                      <p className="text-sm font-semibold text-[#0B3C5D] mb-1">Respuesta del equipo:</p>
                      <p className="text-sm text-gray-700">{reseñaSeleccionada.respuesta}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setReseñaSeleccionada(null)} className="flex-1">
                      Cerrar
                    </Button>
                    {reseñaSeleccionada.estado === 'Pendiente' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => {
                            aprobarReseña(reseñaSeleccionada.id);
                            setReseñaSeleccionada(null);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Aprobar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            ocultarReseña(reseñaSeleccionada.id);
                            setReseñaSeleccionada(null);
                          }}
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={16} className="mr-2" />
                          Ocultar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}