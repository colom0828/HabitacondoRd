import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Download,
  Eye,
  Check,
  X
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { DatePicker } from './DatePicker';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ReservasModuleProps {
  isDarkMode?: boolean;
}

interface Reserva {
  id: string;
  apartamento: string;
  condominio: string;
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
  };
  fechaInicio: string;
  fechaFin: string;
  noches: number;
  precioTotal: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  fechaReserva: string;
  metodoPago: string;
  observaciones?: string;
}

const RESERVAS_EJEMPLO: Reserva[] = [
  {
    id: 'RES-001',
    apartamento: 'Penthouse Vista Mar',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Carlos Fernández',
      email: 'carlos.f@email.com',
      telefono: '809-555-0123'
    },
    fechaInicio: '2026-03-01',
    fechaFin: '2026-03-05',
    noches: 4,
    precioTotal: 24000,
    estado: 'pendiente',
    fechaReserva: '2026-02-18',
    metodoPago: 'Transferencia',
    observaciones: 'Cliente requiere early check-in'
  },
  {
    id: 'RES-002',
    apartamento: 'Suite Ejecutiva 402',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '809-555-0456'
    },
    fechaInicio: '2026-02-25',
    fechaFin: '2026-03-03',
    noches: 6,
    precioTotal: 30000,
    estado: 'confirmada',
    fechaReserva: '2026-02-10',
    metodoPago: 'Tarjeta de Crédito'
  },
  {
    id: 'RES-003',
    apartamento: 'Apartamento Playa 201',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Roberto Martínez',
      email: 'r.martinez@email.com',
      telefono: '809-555-0789'
    },
    fechaInicio: '2026-02-28',
    fechaFin: '2026-03-02',
    noches: 2,
    precioTotal: 9000,
    estado: 'pendiente',
    fechaReserva: '2026-02-17',
    metodoPago: 'PayPal'
  },
  {
    id: 'RES-004',
    apartamento: 'Loft Moderno 305',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Ana Jiménez',
      email: 'ana.jimenez@email.com',
      telefono: '809-555-0321'
    },
    fechaInicio: '2026-03-10',
    fechaFin: '2026-03-17',
    noches: 7,
    precioTotal: 35000,
    estado: 'confirmada',
    fechaReserva: '2026-02-05',
    metodoPago: 'Transferencia'
  },
  {
    id: 'RES-005',
    apartamento: 'Penthouse Vista Mar',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Luis Pérez',
      email: 'luis.perez@email.com',
      telefono: '809-555-0654'
    },
    fechaInicio: '2026-02-20',
    fechaFin: '2026-02-23',
    noches: 3,
    precioTotal: 18000,
    estado: 'cancelada',
    fechaReserva: '2026-02-08',
    metodoPago: 'Tarjeta de Crédito',
    observaciones: 'Cancelada por el cliente'
  },
  {
    id: 'RES-006',
    apartamento: 'Suite Playa 102',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'Patricia Sánchez',
      email: 'patricia.s@email.com',
      telefono: '809-555-0987'
    },
    fechaInicio: '2026-02-22',
    fechaFin: '2026-02-26',
    noches: 4,
    precioTotal: 22000,
    estado: 'pendiente',
    fechaReserva: '2026-02-16',
    metodoPago: 'Transferencia'
  },
  {
    id: 'RES-007',
    apartamento: 'Apartamento Coral 203',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Eduardo Ramírez',
      email: 'eduardo.r@email.com',
      telefono: '809-555-0147'
    },
    fechaInicio: '2026-03-05',
    fechaFin: '2026-03-12',
    noches: 7,
    precioTotal: 31500,
    estado: 'confirmada',
    fechaReserva: '2026-01-28',
    metodoPago: 'PayPal'
  },
  {
    id: 'RES-008',
    apartamento: 'Studio Premium 104',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Sofía Castillo',
      email: 'sofia.c@email.com',
      telefono: '809-555-0258'
    },
    fechaInicio: '2026-02-15',
    fechaFin: '2026-02-18',
    noches: 3,
    precioTotal: 13500,
    estado: 'cancelada',
    fechaReserva: '2026-02-01',
    metodoPago: 'Tarjeta de Crédito',
    observaciones: 'Cancelada por no disponibilidad'
  }
];

type TabType = 'pendientes' | 'confirmadas' | 'canceladas' | 'historial';

export function ReservasModule({ isDarkMode }: ReservasModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [activeTab, setActiveTab] = React.useState<TabType>('pendientes');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [condominioFilter, setCondominioFilter] = React.useState('todos');
  const [fechaInicioDate, setFechaInicioDate] = React.useState<Date | undefined>();
  const [fechaFinDate, setFechaFinDate] = React.useState<Date | undefined>();
  const [reservas, setReservas] = React.useState<Reserva[]>(RESERVAS_EJEMPLO);
  const [selectedReserva, setSelectedReserva] = React.useState<Reserva | null>(null);

  // Obtener condominios únicos
  const condominios = Array.from(new Set(reservas.map(r => r.condominio)));

  // Filtrar reservas según el tab activo
  const getReservasByTab = () => {
    let filtered = reservas;

    // Filtro por estado según tab
    if (activeTab === 'pendientes') {
      filtered = filtered.filter(r => r.estado === 'pendiente');
    } else if (activeTab === 'confirmadas') {
      filtered = filtered.filter(r => r.estado === 'confirmada');
    } else if (activeTab === 'canceladas') {
      filtered = filtered.filter(r => r.estado === 'cancelada');
    }
    // historial muestra todas

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.apartamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por condominio
    if (condominioFilter !== 'todos') {
      filtered = filtered.filter(r => r.condominio === condominioFilter);
    }

    // Filtro por fechas
    if (fechaInicioDate) {
      filtered = filtered.filter(r => new Date(r.fechaInicio) >= fechaInicioDate);
    }
    if (fechaFinDate) {
      filtered = filtered.filter(r => new Date(r.fechaFin) <= fechaFinDate);
    }

    return filtered;
  };

  const handleAprobar = (id: string) => {
    setReservas(prev => prev.map(r => 
      r.id === id ? { ...r, estado: 'confirmada' as const } : r
    ));
    setSelectedReserva(null);
  };

  const handleRechazar = (id: string) => {
    setReservas(prev => prev.map(r => 
      r.id === id ? { ...r, estado: 'cancelada' as const } : r
    ));
    setSelectedReserva(null);
  };

  const filteredReservas = getReservasByTab();

  const tabs = [
    { 
      id: 'pendientes' as TabType, 
      label: 'Pendientes', 
      icon: AlertCircle,
      count: reservas.filter(r => r.estado === 'pendiente').length,
      color: 'text-orange-500'
    },
    { 
      id: 'confirmadas' as TabType, 
      label: 'Confirmadas', 
      icon: CheckCircle,
      count: reservas.filter(r => r.estado === 'confirmada').length,
      color: 'text-green-500'
    },
    { 
      id: 'canceladas' as TabType, 
      label: 'Canceladas', 
      icon: XCircle,
      count: reservas.filter(r => r.estado === 'cancelada').length,
      color: 'text-red-500'
    },
    { 
      id: 'historial' as TabType, 
      label: 'Historial', 
      icon: Calendar,
      count: reservas.length,
      color: 'text-[#0B3C5D]'
    }
  ];

  const estadoBadgeColor = (estado: Reserva['estado']) => {
    switch (estado) {
      case 'pendiente': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'confirmada': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelada': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const estadoIcon = (estado: Reserva['estado']) => {
    switch (estado) {
      case 'pendiente': return <AlertCircle size={16} />;
      case 'confirmada': return <CheckCircle size={16} />;
      case 'cancelada': return <XCircle size={16} />;
    }
  };

  return (
    <div className={`min-h-screen pt-20 px-6 pb-12 ${dm.bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 
            className={`text-4xl mb-2 ${dm.textHeading}`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Gestión de Reservas
          </h1>
          <p className={dm.textSecondary}>
            Administra y monitorea todas las reservas del sistema
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/50 flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#0B3C5D] text-white shadow-lg'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon size={18} className={activeTab !== tab.id ? tab.color : ''} />
                  <span className="font-medium">{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-[#0B3C5D]" />
              <h3 className="text-lg font-semibold text-[#0B3C5D]">Filtros</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Búsqueda */}
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ID, apartamento, cliente..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Condominio */}
              <div className="relative z-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condominio
                </label>
                <select
                  value={condominioFilter}
                  onChange={(e) => setCondominioFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                >
                  <option value="todos">Todos los condominios</option>
                  {condominios.map(condo => (
                    <option key={condo} value={condo}>{condo}</option>
                  ))}
                </select>
              </div>

              {/* Fecha Inicio */}
              <div className="relative z-20">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desde
                </label>
                <DatePicker
                  selected={fechaInicioDate}
                  onSelect={(date) => setFechaInicioDate(date)}
                  placeholder="Seleccionar fecha"
                  usePortal={true}
                />
              </div>

              {/* Fecha Fin */}
              <div className="relative z-20">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hasta
                </label>
                <DatePicker
                  selected={fechaFinDate}
                  onSelect={(date) => setFechaFinDate(date)}
                  placeholder="Seleccionar fecha"
                  usePortal={true}
                />
              </div>
            </div>

            {/* Botones de acción rápida */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCondominioFilter('todos');
                  setFechaInicioDate(undefined);
                  setFechaFinDate(undefined);
                }}
                className="text-sm text-gray-600 hover:text-[#0B3C5D] transition-colors"
              >
                Limpiar filtros
              </button>
              <button className="ml-auto flex items-center gap-2 text-sm text-[#0B3C5D] hover:text-[#164E7F] transition-colors">
                <Download size={16} />
                Exportar resultados
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Reservas List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredReservas.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No hay reservas
              </h3>
              <p className="text-gray-500">
                No se encontraron reservas con los filtros seleccionados
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredReservas.map((reserva, index) => (
                  <motion.div
                    key={reserva.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Estado Badge */}
                          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${estadoBadgeColor(reserva.estado)}`}>
                            {estadoIcon(reserva.estado)}
                            <span className="text-sm font-semibold capitalize">
                              {reserva.estado}
                            </span>
                          </div>

                          {/* Info principal */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-[#0B3C5D]">
                                {reserva.id}
                              </h3>
                              <span className="text-sm text-gray-500">
                                Reservado el {new Date(reserva.fechaReserva).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Building2 size={16} className="text-[#0B3C5D]" />
                                <div>
                                  <p className="font-medium text-[#0B3C5D]">{reserva.apartamento}</p>
                                  <p className="text-xs text-gray-500">{reserva.condominio}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 text-gray-600">
                                <User size={16} className="text-[#0B3C5D]" />
                                <div>
                                  <p className="font-medium">{reserva.cliente.nombre}</p>
                                  <p className="text-xs text-gray-500">{reserva.cliente.telefono}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={16} className="text-[#0B3C5D]" />
                                <div>
                                  <p className="font-medium">
                                    {new Date(reserva.fechaInicio).toLocaleDateString('es-ES')} - {new Date(reserva.fechaFin).toLocaleDateString('es-ES')}
                                  </p>
                                  <p className="text-xs text-gray-500">{reserva.noches} noches</p>
                                </div>
                              </div>
                            </div>

                            {reserva.observaciones && (
                              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-sm text-blue-700">
                                  <span className="font-semibold">Observaciones:</span> {reserva.observaciones}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Precio y acciones */}
                        <div className="text-right flex flex-col items-end gap-3">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Total</p>
                            <p className="text-2xl font-bold text-[#0B3C5D]">
                              ${reserva.precioTotal.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">{reserva.metodoPago}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReserva(reserva)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Ver detalles"
                            >
                              <Eye size={18} className="text-gray-600" />
                            </button>

                            {reserva.estado === 'pendiente' && (
                              <>
                                <button
                                  onClick={() => handleAprobar(reserva.id)}
                                  className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                                  title="Aprobar"
                                >
                                  <Check size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                  onClick={() => handleRechazar(reserva.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                  title="Rechazar"
                                >
                                  <X size={18} className="text-red-600 group-hover:scale-110 transition-transform" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Modal de detalles */}
        <AnimatePresence>
          {selectedReserva && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedReserva(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header del modal */}
                <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 
                      className="text-2xl text-[#0B3C5D]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Detalles de Reserva
                    </h2>
                    <button
                      onClick={() => setSelectedReserva(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${estadoBadgeColor(selectedReserva.estado)}`}>
                    {estadoIcon(selectedReserva.estado)}
                    <span className="font-semibold capitalize">{selectedReserva.estado}</span>
                  </div>
                </div>

                {/* Contenido del modal */}
                <div className="p-6 space-y-6">
                  {/* ID y Fecha de reserva */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">ID de Reserva</p>
                      <p className="text-lg font-semibold text-[#0B3C5D]">{selectedReserva.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fecha de Reserva</p>
                      <p className="text-lg font-semibold text-[#0B3C5D]">
                        {new Date(selectedReserva.fechaReserva).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>

                  {/* Apartamento */}
                  <div className="p-4 bg-gradient-to-br from-[#0B3C5D]/5 to-[#B0B7C3]/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Building2 size={24} className="text-[#0B3C5D] mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Apartamento</p>
                        <p className="text-xl font-semibold text-[#0B3C5D] mb-1">
                          {selectedReserva.apartamento}
                        </p>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          {selectedReserva.condominio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cliente */}
                  <div className="p-4 bg-gradient-to-br from-[#0B3C5D]/5 to-[#B0B7C3]/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <User size={24} className="text-[#0B3C5D] mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Cliente</p>
                        <p className="text-xl font-semibold text-[#0B3C5D] mb-3">
                          {selectedReserva.cliente.nombre}
                        </p>
                        <div className="space-y-2">
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail size={16} className="text-[#0B3C5D]" />
                            {selectedReserva.cliente.email}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone size={16} className="text-[#0B3C5D]" />
                            {selectedReserva.cliente.telefono}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#0B3C5D]/5 to-[#B0B7C3]/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-[#0B3C5D]" />
                        <p className="text-sm text-gray-500">Check-in</p>
                      </div>
                      <p className="text-lg font-semibold text-[#0B3C5D]">
                        {new Date(selectedReserva.fechaInicio).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#0B3C5D]/5 to-[#B0B7C3]/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-[#0B3C5D]" />
                        <p className="text-sm text-gray-500">Check-out</p>
                      </div>
                      <p className="text-lg font-semibold text-[#0B3C5D]">
                        {new Date(selectedReserva.fechaFin).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Duración y precio */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#0B3C5D]/5 to-[#B0B7C3]/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-[#0B3C5D]" />
                        <p className="text-sm text-gray-500">Duración</p>
                      </div>
                      <p className="text-2xl font-bold text-[#0B3C5D]">
                        {selectedReserva.noches} noches
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={18} className="text-green-600" />
                        <p className="text-sm text-gray-500">Total</p>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedReserva.precioTotal.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{selectedReserva.metodoPago}</p>
                    </div>
                  </div>

                  {/* Observaciones */}
                  {selectedReserva.observaciones && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Observaciones</p>
                      <p className="text-blue-700">{selectedReserva.observaciones}</p>
                    </div>
                  )}

                  {/* Acciones */}
                  {selectedReserva.estado === 'pendiente' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <Button
                        variant="primary"
                        onClick={() => handleAprobar(selectedReserva.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check size={18} />
                        Aprobar Reserva
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleRechazar(selectedReserva.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <X size={18} />
                        Rechazar Reserva
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}