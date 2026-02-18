import React from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  User,
  Home,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { DatePicker } from './DatePicker';
import { motion, AnimatePresence } from 'motion/react';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface LimpiezaModuleProps {
  isDarkMode?: boolean;
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

// Mock de apartamentos (en producción vendría del contexto)
const apartamentosDisponibles: Apartment[] = [
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
  }
];

type EstadoType = 'todos' | 'pendiente' | 'en-proceso' | 'finalizado';

export function LimpiezaModule({ isDarkMode }: LimpiezaModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [limpiezas, setLimpiezas] = React.useState<Limpieza[]>(LIMPIEZAS_EJEMPLO);
  const [showModal, setShowModal] = React.useState(false);
  const [editingLimpieza, setEditingLimpieza] = React.useState<Limpieza | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [estadoFilter, setEstadoFilter] = React.useState<EstadoType>('todos');
  const [fechaDate, setFechaDate] = React.useState<Date | undefined>();
  
  // Form state
  const [formData, setFormData] = React.useState({
    apartamentoId: 0,
    encargado: '',
    pago: '',
    fecha: '',
    notas: ''
  });

  // Filtrar solo apartamentos Airbnb
  const apartamentosAirbnb = apartamentosDisponibles.filter(apt => apt.rentalType === 'daily');

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      apartamentoId: 0,
      encargado: '',
      pago: '',
      fecha: '',
      notas: ''
    });
    setFechaDate(undefined);
    setEditingLimpieza(null);
  };

  // Abrir modal para crear
  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = (limpieza: Limpieza) => {
    setEditingLimpieza(limpieza);
    setFormData({
      apartamentoId: limpieza.apartamentoId,
      encargado: limpieza.encargado,
      pago: limpieza.pago.toString(),
      fecha: limpieza.fecha,
      notas: limpieza.notas || ''
    });
    setFechaDate(new Date(limpieza.fecha));
    setShowModal(true);
  };

  // Guardar limpieza
  const handleSave = () => {
    if (!formData.apartamentoId || !formData.encargado || !formData.pago || !formData.fecha) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const apartamento = apartamentosAirbnb.find(apt => apt.id === formData.apartamentoId);
    if (!apartamento) return;

    if (editingLimpieza) {
      // Editar
      setLimpiezas(limpiezas.map(l => 
        l.id === editingLimpieza.id
          ? {
              ...l,
              apartamento: apartamento.name,
              apartamentoId: formData.apartamentoId,
              condominio: apartamento.condominio,
              encargado: formData.encargado,
              pago: parseFloat(formData.pago),
              fecha: formData.fecha,
              notas: formData.notas
            }
          : l
      ));
    } else {
      // Crear
      const nuevaLimpieza: Limpieza = {
        id: Math.max(...limpiezas.map(l => l.id), 0) + 1,
        apartamento: apartamento.name,
        apartamentoId: formData.apartamentoId,
        condominio: apartamento.condominio,
        encargado: formData.encargado,
        pago: parseFloat(formData.pago),
        fecha: formData.fecha,
        estado: 'pendiente',
        notas: formData.notas,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setLimpiezas([nuevaLimpieza, ...limpiezas]);
    }

    setShowModal(false);
    resetForm();
  };

  // Cambiar estado
  const handleChangeEstado = (id: number, nuevoEstado: 'pendiente' | 'en-proceso' | 'finalizado') => {
    setLimpiezas(limpiezas.map(l => 
      l.id === id ? { ...l, estado: nuevoEstado } : l
    ));
  };

  // Eliminar
  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta tarea de limpieza?')) {
      setLimpiezas(limpiezas.filter(l => l.id !== id));
    }
  };

  // Filtrar limpiezas
  const limpiezasFiltradas = limpiezas.filter(limpieza => {
    const matchSearch = 
      limpieza.apartamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      limpieza.encargado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      limpieza.condominio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchEstado = estadoFilter === 'todos' || limpieza.estado === estadoFilter;
    
    return matchSearch && matchEstado;
  });

  // Contar por estado
  const pendientes = limpiezas.filter(l => l.estado === 'pendiente').length;
  const enProceso = limpiezas.filter(l => l.estado === 'en-proceso').length;
  const finalizados = limpiezas.filter(l => l.estado === 'finalizado').length;

  // Obtener color de estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'en-proceso': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'finalizado': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente': return <AlertCircle size={16} />;
      case 'en-proceso': return <Clock size={16} />;
      case 'finalizado': return <CheckCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Gestión de Limpieza
          </h1>
          <p className={dm.textSecondary}>Control de limpiezas para apartamentos Airbnb</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus size={20} className="mr-2" />
          Nueva Limpieza
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pendientes</p>
              <h3 className="text-3xl text-yellow-600" style={{ fontFamily: 'var(--font-heading)' }}>
                {pendientes}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">En Proceso</p>
              <h3 className="text-3xl text-blue-600" style={{ fontFamily: 'var(--font-heading)' }}>
                {enProceso}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Finalizados</p>
              <h3 className="text-3xl text-green-600" style={{ fontFamily: 'var(--font-heading)' }}>
                {finalizados}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            icon={<Search size={20} />}
            placeholder="Buscar por apartamento, encargado o condominio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#0B3C5D]" />
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value as EstadoType)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-proceso">En Proceso</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Lista de Limpiezas */}
      <div className="grid grid-cols-1 gap-4">
        {limpiezasFiltradas.length === 0 ? (
          <Card className="p-12 text-center">
            <Sparkles className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl text-gray-600 mb-2">No hay limpiezas registradas</h3>
            <p className="text-gray-500">Crea una nueva tarea de limpieza para comenzar</p>
          </Card>
        ) : (
          limpiezasFiltradas.map(limpieza => (
            <motion.div
              key={limpieza.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {limpieza.apartamento}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm border-2 flex items-center gap-2 ${getEstadoColor(limpieza.estado)}`}>
                        {getEstadoIcon(limpieza.estado)}
                        {limpieza.estado === 'pendiente' && 'Pendiente'}
                        {limpieza.estado === 'en-proceso' && 'En Proceso'}
                        {limpieza.estado === 'finalizado' && 'Finalizado'}
                      </span>
                    </div>
                    <p className="text-gray-600">{limpieza.condominio}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenEdit(limpieza)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(limpieza.id)}>
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={18} className="text-[#0B3C5D]" />
                    <div>
                      <p className="text-xs text-gray-500">Encargado</p>
                      <p className="font-medium">{limpieza.encargado}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign size={18} className="text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Pago</p>
                      <p className="font-medium">DOP ${limpieza.pago.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={18} className="text-[#0B3C5D]" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha Programada</p>
                      <p className="font-medium">{new Date(limpieza.fecha).toLocaleDateString('es-DO')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Creado</p>
                      <p className="font-medium">{new Date(limpieza.fechaCreacion).toLocaleDateString('es-DO')}</p>
                    </div>
                  </div>
                </div>

                {limpieza.notas && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <FileText size={16} className="text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Notas Internas</p>
                        <p className="text-sm text-gray-700">{limpieza.notas}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cambiar Estado */}
                {limpieza.estado !== 'finalizado' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                    {limpieza.estado === 'pendiente' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChangeEstado(limpieza.id, 'en-proceso')}
                      >
                        <Clock size={16} className="mr-2" />
                        Marcar En Proceso
                      </Button>
                    )}
                    {limpieza.estado === 'en-proceso' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleChangeEstado(limpieza.id, 'finalizado')}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Marcar Finalizado
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
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
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Sparkles className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {editingLimpieza ? 'Editar Limpieza' : 'Nueva Limpieza'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {editingLimpieza ? 'Actualizar información de limpieza' : 'Programar nueva tarea de limpieza'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Seleccionar Apartamento */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B3C5D] mb-2">
                      Apartamento Airbnb *
                    </label>
                    <div className="flex items-center gap-2">
                      <Home size={20} className="text-[#0B3C5D]" />
                      <select
                        value={formData.apartamentoId}
                        onChange={(e) => setFormData({ ...formData, apartamentoId: parseInt(e.target.value) })}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                        required
                      >
                        <option value={0}>Seleccionar apartamento...</option>
                        {apartamentosAirbnb.map(apt => (
                          <option key={apt.id} value={apt.id}>
                            {apt.name} - {apt.condominio}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Encargado y Pago */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Encargado de Limpieza *"
                      placeholder="Nombre completo"
                      icon={<User size={20} />}
                      value={formData.encargado}
                      onChange={(e) => setFormData({ ...formData, encargado: e.target.value })}
                      required
                    />

                    <Input
                      label="Pago (DOP) *"
                      type="number"
                      placeholder="1500"
                      icon={<DollarSign size={20} />}
                      value={formData.pago}
                      onChange={(e) => setFormData({ ...formData, pago: e.target.value })}
                      required
                    />
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B3C5D] mb-2">
                      Fecha Programada *
                    </label>
                    <DatePicker
                      selected={fechaDate}
                      onSelect={(date) => {
                        setFechaDate(date);
                        if (date) {
                          setFormData({ ...formData, fecha: date.toISOString().split('T')[0] });
                        }
                      }}
                      placeholder="Seleccionar fecha"
                    />
                  </div>

                  {/* Notas */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B3C5D] mb-2">
                      Notas Internas
                    </label>
                    <textarea
                      value={formData.notas}
                      onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                      placeholder="Instrucciones especiales, áreas a enfocar, etc."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>
                    {editingLimpieza ? 'Actualizar' : 'Crear'} Limpieza
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}