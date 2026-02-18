import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Home, X, User, DollarSign, Clock, FileText, Sparkles, CheckCircle } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface CalendarioModuleProps {
  isDarkMode?: boolean;
}

// Interfaces
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

interface Apartment {
  id: number;
  name: string;
  location: string;
  price: number;
  status: string;
  condominio: string;
  floor: string;
  rentalType: 'daily' | 'monthly';
}

interface Contrato {
  id: number;
  tenant: string;
  apartment: string;
  apartmentId: number;
  condominio: string;
  startDate: string;
  endDate: string;
  monthlyAmount: number;
  status: string;
}

interface Limpieza {
  id: number;
  apartamento: string;
  apartamentoId: number;
  condominio: string;
  encargado: string;
  pago: number;
  fecha: string;
  estado: 'pendiente' | 'en-proceso' | 'finalizado';
  notas?: string;
  fechaCreacion: string;
}

// Mock de datos (en producción vendrían del contexto)
const apartamentosDisponibles: Apartment[] = [
  {
    id: 1,
    name: 'Penthouse Vista al Mar',
    location: 'Malecón',
    price: 8500,
    status: 'Disponible',
    condominio: 'Vista Mar Complex',
    floor: 'PH-01',
    rentalType: 'monthly'
  },
  {
    id: 2,
    name: 'Suite Ejecutiva 402',
    location: 'Piantini',
    price: 150,
    status: 'Ocupado',
    condominio: 'Torre Premium',
    floor: '4-02',
    rentalType: 'daily'
  },
  {
    id: 3,
    name: 'Loft de Lujo',
    location: 'Naco',
    price: 5200,
    status: 'Disponible',
    condominio: 'Residencial Elegance',
    floor: 'B-501',
    rentalType: 'monthly'
  },
  {
    id: 4,
    name: 'Estudio Moderno',
    location: 'Bella Vista',
    price: 120,
    status: 'Disponible',
    condominio: 'Urban Life',
    floor: '3-10',
    rentalType: 'daily'
  },
  {
    id: 5,
    name: 'Duplex Premium',
    location: 'Gazcue',
    price: 180,
    status: 'Disponible',
    condominio: 'Vista Mar Complex',
    floor: 'D-1501/1502',
    rentalType: 'daily'
  }
];

const RESERVAS_EJEMPLO: Reserva[] = [
  {
    id: 'RES-001',
    apartamento: 'Suite Ejecutiva 402',
    condominio: 'Torre Premium',
    cliente: {
      nombre: 'Carlos Fernández',
      email: 'carlos.f@email.com',
      telefono: '809-555-0123'
    },
    fechaInicio: '2026-02-20',
    fechaFin: '2026-02-25',
    noches: 5,
    precioTotal: 750,
    estado: 'confirmada',
    fechaReserva: '2026-02-18',
    metodoPago: 'Transferencia',
    observaciones: 'Cliente requiere early check-in'
  },
  {
    id: 'RES-002',
    apartamento: 'Estudio Moderno',
    condominio: 'Urban Life',
    cliente: {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '809-555-0456'
    },
    fechaInicio: '2026-02-18',
    fechaFin: '2026-02-22',
    noches: 4,
    precioTotal: 480,
    estado: 'confirmada',
    fechaReserva: '2026-02-15',
    metodoPago: 'Tarjeta de Crédito'
  },
  {
    id: 'RES-003',
    apartamento: 'Duplex Premium',
    condominio: 'Vista Mar Complex',
    cliente: {
      nombre: 'Juan Rodríguez',
      email: 'juan.r@email.com',
      telefono: '809-555-0789'
    },
    fechaInicio: '2026-03-01',
    fechaFin: '2026-03-05',
    noches: 4,
    precioTotal: 720,
    estado: 'pendiente',
    fechaReserva: '2026-02-18',
    metodoPago: 'Transferencia'
  },
  {
    id: 'RES-004',
    apartamento: 'Suite Ejecutiva 402',
    condominio: 'Torre Premium',
    cliente: {
      nombre: 'Ana Martínez',
      email: 'ana.m@email.com',
      telefono: '809-555-0321'
    },
    fechaInicio: '2026-02-28',
    fechaFin: '2026-03-03',
    noches: 3,
    precioTotal: 450,
    estado: 'pendiente',
    fechaReserva: '2026-02-17',
    metodoPago: 'Efectivo'
  }
];

const contratosData: Contrato[] = [
  {
    id: 1,
    tenant: 'María González',
    apartment: 'Penthouse A-301',
    apartmentId: 1,
    condominio: 'Vista Mar Complex',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    monthlyAmount: 35000,
    status: 'Activo'
  }
];

const LIMPIEZAS_EJEMPLO: Limpieza[] = [
  {
    id: 1,
    apartamento: 'Suite Ejecutiva 402',
    apartamentoId: 2,
    condominio: 'Torre Premium',
    encargado: 'Ana Rodríguez',
    pago: 1500,
    fecha: '2026-02-20',
    estado: 'pendiente',
    notas: 'Limpieza profunda después del check-out',
    fechaCreacion: '2026-02-18'
  },
  {
    id: 2,
    apartamento: 'Estudio Moderno',
    apartamentoId: 4,
    condominio: 'Urban Life',
    encargado: 'María González',
    pago: 1200,
    fecha: '2026-02-19',
    estado: 'en-proceso',
    notas: 'Cambio de sábanas y toallas',
    fechaCreacion: '2026-02-18'
  },
  {
    id: 3,
    apartamento: 'Duplex Premium',
    apartamentoId: 5,
    condominio: 'Vista Mar Complex',
    encargado: 'Carmen Pérez',
    pago: 2000,
    fecha: '2026-02-18',
    estado: 'finalizado',
    notas: 'Limpieza completa con desinfección',
    fechaCreacion: '2026-02-17'
  },
  {
    id: 4,
    apartamento: 'Suite Ejecutiva 402',
    apartamentoId: 2,
    condominio: 'Torre Premium',
    encargado: 'Ana Rodríguez',
    pago: 1500,
    fecha: '2026-03-01',
    estado: 'pendiente',
    notas: 'Limpieza de mantenimiento',
    fechaCreacion: '2026-02-25'
  }
];

export function CalendarioModule({ isDarkMode }: CalendarioModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedApartment, setSelectedApartment] = React.useState<number | null>(null);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  // Filtrar solo apartamentos tipo Airbnb (daily)
  const apartamentosAirbnb = apartamentosDisponibles.filter(apt => apt.rentalType === 'daily');

  // Funciones de navegación de calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtener días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior para completar la primera semana
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Días del próximo mes para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  // Verificar si hay reserva en una fecha para un apartamento
  const getReservaForDate = (date: Date, apartmentName: string) => {
    const dateStr = date.toISOString().split('T')[0];
    
    return RESERVAS_EJEMPLO.find(reserva => {
      if (reserva.apartamento !== apartmentName) return false;
      
      const inicio = new Date(reserva.fechaInicio);
      const fin = new Date(reserva.fechaFin);
      const current = new Date(dateStr);
      
      return current >= inicio && current <= fin;
    });
  };

  // Verificar si hay contrato mensual en una fecha para un apartamento
  const getContratoForDate = (date: Date, apartmentId: number) => {
    const dateStr = date.toISOString().split('T')[0];
    
    return contratosData.find(contrato => {
      if (contrato.apartmentId !== apartmentId) return false;
      
      const inicio = new Date(contrato.startDate);
      const fin = new Date(contrato.endDate);
      const current = new Date(dateStr);
      
      return current >= inicio && current <= fin;
    });
  };

  // Verificar si hay limpieza programada en una fecha para un apartamento
  const getLimpiezaForDate = (date: Date, apartmentName: string) => {
    const dateStr = date.toISOString().split('T')[0];
    
    return LIMPIEZAS_EJEMPLO.find(limpieza => {
      if (limpieza.apartamento !== apartmentName) return false;
      return limpieza.fecha === dateStr;
    });
  };

  // Obtener color de la celda según el estado
  const getCellColor = (date: Date, apartment: Apartment) => {
    const reserva = getReservaForDate(date, apartment.name);
    const contrato = getContratoForDate(date, apartment.id);
    const limpieza = getLimpiezaForDate(date, apartment.name);

    if (contrato) {
      return 'bg-blue-100 border-blue-300'; // Azul = Contrato mensual
    }

    if (reserva) {
      if (reserva.estado === 'confirmada') {
        return 'bg-green-100 border-green-300'; // Verde = Confirmado
      } else if (reserva.estado === 'pendiente') {
        return 'bg-yellow-100 border-yellow-300'; // Amarillo = Pendiente
      } else if (reserva.estado === 'cancelada') {
        return 'bg-red-100 border-red-300'; // Rojo = Cancelada
      }
    }

    if (limpieza) {
      if (limpieza.estado === 'pendiente') {
        return 'bg-gray-100 border-gray-300'; // Gris = Limpieza pendiente
      } else if (limpieza.estado === 'en-proceso') {
        return 'bg-gray-200 border-gray-400'; // Gris claro = Limpieza en proceso
      } else if (limpieza.estado === 'finalizado') {
        return 'bg-gray-300 border-gray-500'; // Gris oscuro = Limpieza finalizada
      }
    }

    return 'bg-white border-gray-200 hover:bg-gray-50'; // Default
  };

  // Obtener tooltip con información
  const getTooltip = (date: Date, apartment: Apartment) => {
    const reserva = getReservaForDate(date, apartment.name);
    const contrato = getContratoForDate(date, apartment.id);
    const limpieza = getLimpiezaForDate(date, apartment.name);

    if (contrato) {
      return `Contrato: ${contrato.tenant}`;
    }

    if (reserva) {
      return `${reserva.cliente.nombre} - ${reserva.estado}`;
    }

    if (limpieza) {
      return `🧹 Limpieza: ${limpieza.apartamento}\nEncargado: ${limpieza.encargado}\nEstado: ${limpieza.estado}`;
    }

    return '';
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const days = getDaysInMonth(currentDate);

  // Filtrar apartamentos si hay uno seleccionado
  const filteredApartments = selectedApartment 
    ? apartamentosAirbnb.filter(apt => apt.id === selectedApartment)
    : apartamentosAirbnb;

  // Función para abrir modal con detalles de la fecha
  const handleDateClick = (date: Date) => {
    if (!date) return;
    setSelectedDate(date);
    setShowModal(true);
  };

  // Obtener todos los eventos de una fecha específica
  const getEventosForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const eventos: {
      reservas: Reserva[];
      limpiezas: Limpieza[];
      contratos: Contrato[];
    } = {
      reservas: [],
      limpiezas: [],
      contratos: []
    };

    // Buscar reservas
    RESERVAS_EJEMPLO.forEach(reserva => {
      const inicio = new Date(reserva.fechaInicio);
      const fin = new Date(reserva.fechaFin);
      const current = new Date(dateStr);
      if (current >= inicio && current <= fin) {
        eventos.reservas.push(reserva);
      }
    });

    // Buscar limpiezas
    LIMPIEZAS_EJEMPLO.forEach(limpieza => {
      if (limpieza.fecha === dateStr) {
        eventos.limpiezas.push(limpieza);
      }
    });

    // Buscar contratos
    contratosData.forEach(contrato => {
      const inicio = new Date(contrato.startDate);
      const fin = new Date(contrato.endDate);
      const current = new Date(dateStr);
      if (current >= inicio && current <= fin) {
        eventos.contratos.push(contrato);
      }
    });

    return eventos;
  };

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Calendario de Reservas
          </h1>
          <p className={dm.textSecondary}>Vista mensual de ocupación - Apartamentos tipo Airbnb</p>
        </div>
        
        {/* Controles */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={goToToday}>
            Hoy
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Leyenda */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          <h3 className="font-semibold text-[#0B3C5D]">Estatus:</h3>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300"></div>
            <span className="text-sm text-gray-700">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-100 border-2 border-yellow-300"></div>
            <span className="text-sm text-gray-700">Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-100 border-2 border-red-300"></div>
            <span className="text-sm text-gray-700">Cancelada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-100 border-2 border-blue-300"></div>
            <span className="text-sm text-gray-700">Contrato Mensual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-100 border-2 border-gray-300"></div>
            <span className="text-sm text-gray-700">Limpieza Pendiente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-200 border-2 border-gray-400"></div>
            <span className="text-sm text-gray-700">Limpieza en Proceso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-300 border-2 border-gray-500"></div>
            <span className="text-sm text-gray-700">Limpieza Finalizada</span>
          </div>
        </div>
      </Card>

      {/* Filtros */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Home size={20} className="text-[#0B3C5D]" />
              <select
                value={selectedApartment || ''}
                onChange={(e) => setSelectedApartment(e.target.value ? parseInt(e.target.value) : null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
              >
                <option value="">Todos los apartamentos Airbnb</option>
                {apartamentosAirbnb.map(apt => (
                  <option key={apt.id} value={apt.id}>
                    {apt.name} - {apt.condominio}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Navegación del Calendario */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={goToPreviousMonth}>
            <ChevronLeft size={20} />
          </Button>
          
          <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button variant="outline" onClick={goToNextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Grid de días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center font-semibold text-[#0B3C5D] py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Grid de días del mes */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
              className={`min-h-[100px] p-2 border-2 rounded-lg transition-all cursor-pointer ${
                day.isCurrentMonth 
                  ? 'bg-white border-gray-200 hover:border-[#0B3C5D] hover:shadow-md' 
                  : 'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <div className={`text-sm font-semibold mb-2 ${
                day.isCurrentMonth ? 'text-[#0B3C5D]' : 'text-gray-400'
              }`}>
                {day.date.getDate()}
              </div>
              
              {/* Mostrar indicadores de reservas para cada apartamento filtrado */}
              {day.isCurrentMonth && filteredApartments.map(apartment => {
                const reserva = getReservaForDate(day.date, apartment.name);
                const contrato = getContratoForDate(day.date, apartment.id);
                const limpieza = getLimpiezaForDate(day.date, apartment.name);
                
                if (!reserva && !contrato && !limpieza) return null;

                let color = 'bg-gray-200';
                let label = '';

                if (contrato) {
                  color = 'bg-blue-500';
                  label = apartment.name.substring(0, 15);
                } else if (reserva) {
                  if (reserva.estado === 'confirmada') {
                    color = 'bg-green-500';
                  } else if (reserva.estado === 'pendiente') {
                    color = 'bg-yellow-500';
                  } else {
                    color = 'bg-red-500';
                  }
                  label = apartment.name.substring(0, 15);
                } else if (limpieza) {
                  if (limpieza.estado === 'pendiente') {
                    color = 'bg-gray-500';
                  } else if (limpieza.estado === 'en-proceso') {
                    color = 'bg-gray-600';
                  } else if (limpieza.estado === 'finalizado') {
                    color = 'bg-gray-700';
                  }
                  label = `🧹 ${limpieza.encargado}`;
                }

                return (
                  <div
                    key={apartment.id}
                    className={`${color} text-white text-[10px] px-1 py-0.5 rounded mb-1 truncate`}
                    title={getTooltip(day.date, apartment)}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {/* Vista de Apartamentos */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApartments.map(apartment => (
          <Card key={apartment.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {apartment.name}
                </h3>
                <p className="text-gray-600">{apartment.condominio} - {apartment.floor}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                Airbnb - DOP ${apartment.price}/noche
              </span>
            </div>

            {/* Mini calendario para este apartamento */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day.isCurrentMonth) return <div key={index} className="h-8"></div>;

                const reserva = getReservaForDate(day.date, apartment.name);
                const contrato = getContratoForDate(day.date, apartment.id);
                const limpieza = getLimpiezaForDate(day.date, apartment.name);
                
                let bgColor = 'bg-gray-50';
                let tooltip = '';

                if (contrato) {
                  bgColor = 'bg-blue-500';
                  tooltip = `Contrato: ${contrato.tenant}`;
                } else if (reserva) {
                  if (reserva.estado === 'confirmada') {
                    bgColor = 'bg-green-500';
                  } else if (reserva.estado === 'pendiente') {
                    bgColor = 'bg-yellow-500';
                  } else {
                    bgColor = 'bg-red-500';
                  }
                  tooltip = `${reserva.cliente.nombre} - ${reserva.estado}`;
                } else if (limpieza) {
                  if (limpieza.estado === 'pendiente') {
                    bgColor = 'bg-gray-500';
                  } else if (limpieza.estado === 'en-proceso') {
                    bgColor = 'bg-gray-600';
                  } else if (limpieza.estado === 'finalizado') {
                    bgColor = 'bg-gray-700';
                  }
                  tooltip = `Limpieza: ${limpieza.encargado} - ${limpieza.estado}`;
                }

                return (
                  <div
                    key={index}
                    className={`h-8 rounded flex items-center justify-center text-xs ${bgColor} ${
                      bgColor === 'bg-gray-50' ? 'text-gray-600' : 'text-white font-semibold'
                    } transition-all hover:scale-110 cursor-pointer`}
                    title={tooltip || `${day.date.getDate()} - Disponible`}
                    onClick={() => handleDateClick(day.date)}
                  >
                    {day.date.getDate()}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de detalles de la fecha */}
      <AnimatePresence>
        {showModal && selectedDate && (() => {
          const eventos = getEventosForDate(selectedDate);
          const hasEventos = eventos.reservas.length > 0 || eventos.limpiezas.length > 0 || eventos.contratos.length > 0;
          
          return (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowModal(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Calendar className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {selectedDate.toLocaleDateString('es-DO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {hasEventos ? `${eventos.reservas.length + eventos.limpiezas.length + eventos.contratos.length} evento(s) programado(s)` : 'Sin eventos'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {!hasEventos ? (
                      <div className="text-center py-12">
                        <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
                        <h3 className="text-xl text-gray-600 mb-2">No hay eventos para esta fecha</h3>
                        <p className="text-gray-500">Esta fecha no tiene reservas, limpiezas ni contratos programados.</p>
                      </div>
                    ) : (
                      <>
                        {/* Reservas */}
                        {eventos.reservas.length > 0 && (
                          <div>
                            <h3 className="text-lg text-[#0B3C5D] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                              <Home size={20} />
                              Reservas ({eventos.reservas.length})
                            </h3>
                            <div className="space-y-3">
                              {eventos.reservas.map(reserva => (
                                <motion.div
                                  key={reserva.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`p-4 rounded-lg border-l-4 ${
                                    reserva.estado === 'confirmada' ? 'bg-green-50 border-green-500' :
                                    reserva.estado === 'pendiente' ? 'bg-yellow-50 border-yellow-500' :
                                    'bg-red-50 border-red-500'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">{reserva.apartamento}</h4>
                                      <p className="text-sm text-gray-600">{reserva.condominio}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      reserva.estado === 'confirmada' ? 'bg-green-100 text-green-700' :
                                      reserva.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {reserva.estado.toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <User size={16} className="text-gray-500" />
                                      <div>
                                        <p className="text-xs text-gray-500">Cliente</p>
                                        <p className="font-medium">{reserva.cliente.nombre}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <DollarSign size={16} className="text-green-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Total</p>
                                        <p className="font-medium">DOP ${reserva.precioTotal.toLocaleString()}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <Clock size={16} className="text-blue-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Check-in / Check-out</p>
                                        <p className="font-medium">{new Date(reserva.fechaInicio).toLocaleDateString('es-DO')} - {new Date(reserva.fechaFin).toLocaleDateString('es-DO')}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <FileText size={16} className="text-gray-500" />
                                      <div>
                                        <p className="text-xs text-gray-500">Noches</p>
                                        <p className="font-medium">{reserva.noches} noches</p>
                                      </div>
                                    </div>
                                  </div>
                                  {reserva.observaciones && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                      <p className="text-xs text-gray-500 mb-1">Observaciones:</p>
                                      <p className="text-sm text-gray-700">{reserva.observaciones}</p>
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Limpiezas */}
                        {eventos.limpiezas.length > 0 && (
                          <div>
                            <h3 className="text-lg text-[#0B3C5D] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                              <Sparkles size={20} />
                              Limpiezas ({eventos.limpiezas.length})
                            </h3>
                            <div className="space-y-3">
                              {eventos.limpiezas.map(limpieza => (
                                <motion.div
                                  key={limpieza.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`p-4 rounded-lg border-l-4 ${
                                    limpieza.estado === 'finalizado' ? 'bg-gray-300 border-gray-700' :
                                    limpieza.estado === 'en-proceso' ? 'bg-gray-200 border-gray-600' :
                                    'bg-gray-100 border-gray-500'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">🧹 {limpieza.apartamento}</h4>
                                      <p className="text-sm text-gray-600">{limpieza.condominio}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                      limpieza.estado === 'finalizado' ? 'bg-gray-700 text-white' :
                                      limpieza.estado === 'en-proceso' ? 'bg-gray-600 text-white' :
                                      'bg-gray-500 text-white'
                                    }`}>
                                      {limpieza.estado === 'finalizado' && <CheckCircle size={12} />}
                                      {limpieza.estado === 'en-proceso' && <Clock size={12} />}
                                      {limpieza.estado.replace('-', ' ').toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <User size={16} className="text-gray-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Encargado</p>
                                        <p className="font-medium">{limpieza.encargado}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <DollarSign size={16} className="text-green-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Pago</p>
                                        <p className="font-medium">DOP ${limpieza.pago.toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {limpieza.notas && (
                                    <div className="mt-3 pt-3 border-t border-gray-300">
                                      <p className="text-xs text-gray-500 mb-1">Notas Internas:</p>
                                      <p className="text-sm text-gray-700">{limpieza.notas}</p>
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contratos */}
                        {eventos.contratos.length > 0 && (
                          <div>
                            <h3 className="text-lg text-[#0B3C5D] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                              <FileText size={20} />
                              Contratos Mensuales ({eventos.contratos.length})
                            </h3>
                            <div className="space-y-3">
                              {eventos.contratos.map(contrato => (
                                <motion.div
                                  key={contrato.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">{contrato.apartment}</h4>
                                      <p className="text-sm text-gray-600">{contrato.condominio}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                      {contrato.status.toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <User size={16} className="text-blue-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Inquilino</p>
                                        <p className="font-medium">{contrato.tenant}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <DollarSign size={16} className="text-green-600" />
                                      <div>
                                        <p className="text-xs text-gray-500">Renta Mensual</p>
                                        <p className="font-medium">DOP ${contrato.monthlyAmount.toLocaleString()}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <Clock size={16} className="text-gray-500" />
                                      <div>
                                        <p className="text-xs text-gray-500">Vigencia</p>
                                        <p className="font-medium">{new Date(contrato.startDate).toLocaleDateString('es-DO')} - {new Date(contrato.endDate).toLocaleDateString('es-DO')}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
                    <Button onClick={() => setShowModal(false)}>
                      Cerrar
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}