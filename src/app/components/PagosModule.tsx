import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  CreditCard,
  ArrowDownUp,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Search,
  Eye,
  Edit,
  Calendar,
  User,
  Building2,
  FileText,
  AlertTriangle,
  Download,
  Banknote
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface PagosModuleProps {
  isDarkMode?: boolean;
}

interface Pago {
  id: string;
  reservaId: string;
  apartamento: string;
  condominio: string;
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
  };
  monto: number;
  metodoPago: 'Transferencia' | 'Tarjeta física' | 'Efectivo';
  estado: 'Pagado' | 'Pendiente';
  fechaReserva: string;
  fechaPago?: string;
  notas?: string;
  numeroReferencia?: string;
}

const PAGOS_EJEMPLO: Pago[] = [
  {
    id: 'PAG-001',
    reservaId: 'RES-001',
    apartamento: 'Penthouse Vista Mar',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Carlos Fernández',
      email: 'carlos.f@email.com',
      telefono: '809-555-0123'
    },
    monto: 24000,
    metodoPago: 'Transferencia',
    estado: 'Pendiente',
    fechaReserva: '2026-02-18',
    notas: 'Cliente solicitó confirmación de cuenta bancaria'
  },
  {
    id: 'PAG-002',
    reservaId: 'RES-002',
    apartamento: 'Suite Ejecutiva 402',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '809-555-0456'
    },
    monto: 30000,
    metodoPago: 'Tarjeta física',
    estado: 'Pagado',
    fechaReserva: '2026-02-10',
    fechaPago: '2026-02-11',
    numeroReferencia: 'TXN-2026-001234'
  },
  {
    id: 'PAG-003',
    reservaId: 'RES-003',
    apartamento: 'Apartamento Playa 201',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Roberto Martínez',
      email: 'r.martinez@email.com',
      telefono: '809-555-0789'
    },
    monto: 9000,
    metodoPago: 'Efectivo',
    estado: 'Pagado',
    fechaReserva: '2026-02-17',
    fechaPago: '2026-02-18',
    numeroReferencia: 'TXN-2026-001890',
    notas: 'Pago recibido en oficina principal'
  },
  {
    id: 'PAG-004',
    reservaId: 'RES-004',
    apartamento: 'Loft Moderno 305',
    condominio: 'Torre Diamante',
    cliente: {
      nombre: 'Ana Jiménez',
      email: 'ana.jimenez@email.com',
      telefono: '809-555-0321'
    },
    monto: 35000,
    metodoPago: 'Tarjeta física',
    estado: 'Pagado',
    fechaReserva: '2026-02-05',
    fechaPago: '2026-02-06',
    numeroReferencia: 'TXN-2026-001567'
  },
  {
    id: 'PAG-005',
    reservaId: 'RES-006',
    apartamento: 'Suite Playa 102',
    condominio: 'Punta Cana Luxury',
    cliente: {
      nombre: 'Patricia Sánchez',
      email: 'patricia.s@email.com',
      telefono: '809-555-0987'
    },
    monto: 22000,
    metodoPago: 'Efectivo',
    estado: 'Pendiente',
    fechaReserva: '2026-02-16',
    notas: 'Cliente confirmó pago en efectivo para mañana'
  },
  {
    id: 'PAG-006',
    reservaId: 'RES-007',
    apartamento: 'Apartamento Coral 203',
    condominio: 'Marina Bay',
    cliente: {
      nombre: 'Eduardo Ramírez',
      email: 'eduardo.r@email.com',
      telefono: '809-555-0147'
    },
    monto: 31500,
    metodoPago: 'Tarjeta física',
    estado: 'Pagado',
    fechaReserva: '2026-01-28',
    fechaPago: '2026-01-29',
    numeroReferencia: 'TXN-2026-000987'
  }
];

type TabType = 'todos' | 'pendientes' | 'pagados';

export function PagosModule({ isDarkMode }: PagosModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [activeTab, setActiveTab] = React.useState<TabType>('todos');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [metodoPagoFilter, setMetodoPagoFilter] = React.useState('todos');
  const [pagos, setPagos] = React.useState<Pago[]>(PAGOS_EJEMPLO);
  const [selectedPago, setSelectedPago] = React.useState<Pago | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingPago, setEditingPago] = React.useState<Pago | null>(null);

  // Filtrar pagos según tab
  const filteredPagos = pagos.filter(pago => {
    // Filtro por tab
    if (activeTab === 'pendientes' && pago.estado !== 'Pendiente') return false;
    if (activeTab === 'pagados' && pago.estado !== 'Pagado') return false;

    // Filtro por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !pago.cliente.nombre.toLowerCase().includes(searchLower) &&
        !pago.apartamento.toLowerCase().includes(searchLower) &&
        !pago.id.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Filtro por método de pago
    if (metodoPagoFilter !== 'todos' && pago.metodoPago !== metodoPagoFilter) {
      return false;
    }

    return true;
  });

  // Estadísticas
  const totalPagos = pagos.reduce((sum, p) => sum + p.monto, 0);
  const totalPagados = pagos.filter(p => p.estado === 'Pagado').reduce((sum, p) => sum + p.monto, 0);
  const totalPendientes = pagos.filter(p => p.estado === 'Pendiente').reduce((sum, p) => sum + p.monto, 0);
  const cantidadPendientes = pagos.filter(p => p.estado === 'Pendiente').length;

  // Marcar pago como pagado
  const handleMarcarPagado = (pagoId: string) => {
    setPagos(pagos.map(p => 
      p.id === pagoId 
        ? { 
            ...p, 
            estado: 'Pagado' as const, 
            fechaPago: new Date().toISOString().split('T')[0],
            numeroReferencia: `TXN-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`
          } 
        : p
    ));
  };

  // Abrir modal de edición
  const handleEdit = (pago: Pago) => {
    setEditingPago(pago);
    setShowEditModal(true);
  };

  // Guardar edición
  const handleSaveEdit = () => {
    if (!editingPago) return;
    
    setPagos(pagos.map(p => p.id === editingPago.id ? editingPago : p));
    setShowEditModal(false);
    setEditingPago(null);
  };

  const tabs = [
    { id: 'todos' as TabType, label: 'Todos', count: pagos.length },
    { id: 'pendientes' as TabType, label: 'Pendientes', count: pagos.filter(p => p.estado === 'Pendiente').length },
    { id: 'pagados' as TabType, label: 'Pagados', count: pagos.filter(p => p.estado === 'Pagado').length }
  ];

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
          Gestión de Pagos
        </h1>
        <p className={dm.textSecondary}>Registro y validación de pagos de reservas</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              DOP ${totalPagos.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total en Pagos</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              DOP ${totalPagados.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Pagos Recibidos</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              DOP ${totalPendientes.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Pagos Pendientes</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {cantidadPendientes}
            </h3>
            <p className="text-sm text-gray-600">Por Validar</p>
          </Card>
        </motion.div>
      </div>

      {/* Tabs y Filtros */}
      <Card className="p-6 mb-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#0B3C5D]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-[#0B3C5D] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B3C5D]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Buscar por cliente, apartamento o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={metodoPagoFilter}
            onChange={(e) => setMetodoPagoFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
          >
            <option value="todos">Todos los métodos de pago</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta física">Tarjeta física</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>
      </Card>

      {/* Lista de Pagos */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPagos.length === 0 ? (
          <Card className="p-12 text-center">
            <DollarSign className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl text-gray-600 mb-2">No se encontraron pagos</h3>
            <p className="text-gray-500">No hay pagos que coincidan con los filtros seleccionados.</p>
          </Card>
        ) : (
          filteredPagos.map((pago, index) => (
            <motion.div
              key={pago.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  {/* Info Principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        pago.estado === 'Pagado' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {pago.estado === 'Pagado' ? (
                          <CheckCircle className="text-green-600" size={24} />
                        ) : (
                          <Clock className="text-yellow-600" size={24} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {pago.id}
                        </h3>
                        <p className="text-sm text-gray-600">Reserva: {pago.reservaId}</p>
                      </div>
                    </div>

                    {/* Detalles en Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User size={16} className="text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Cliente</p>
                          <p className="font-medium">{pago.cliente.nombre}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Building2 size={16} className="text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Apartamento</p>
                          <p className="font-medium">{pago.apartamento}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <DollarSign size={16} className="text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Monto</p>
                          <p className="font-medium text-green-600">DOP ${pago.monto.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        {pago.metodoPago === 'Transferencia' ? (
                          <ArrowDownUp size={16} className="text-blue-600" />
                        ) : pago.metodoPago === 'Tarjeta física' ? (
                          <CreditCard size={16} className="text-purple-600" />
                        ) : (
                          <Banknote size={16} className="text-green-600" />
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Método de Pago</p>
                          <div className="flex items-center gap-1">
                            {pago.metodoPago === 'Efectivo' && (
                              <span className="text-sm">💵</span>
                            )}
                            <p className="font-medium">{pago.metodoPago}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Fecha Reserva</p>
                          <p className="font-medium">{new Date(pago.fechaReserva).toLocaleDateString('es-DO')}</p>
                        </div>
                      </div>

                      {pago.fechaPago && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle size={16} className="text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500">Fecha Pago</p>
                            <p className="font-medium text-green-600">{new Date(pago.fechaPago).toLocaleDateString('es-DO')}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Estado y Referencia */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        pago.estado === 'Pagado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pago.estado}
                      </span>
                      
                      {pago.numeroReferencia && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-mono">
                          {pago.numeroReferencia}
                        </span>
                      )}

                      {pago.notas && (
                        <span className="text-xs text-gray-600 italic">
                          📝 {pago.notas}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(pago)}
                    >
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Button>

                    {pago.estado === 'Pendiente' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMarcarPagado(pago.id)}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Marcar Pagado
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPago(pago)}
                    >
                      <Eye size={16} className="mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de Edición */}
      <AnimatePresence>
        {showEditModal && editingPago && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowEditModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-2xl text-[#0B3C5D] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    Editar Pago - {editingPago.id}
                  </h2>

                  <div className="space-y-4">
                    {/* Método de Pago */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Método de Pago *
                      </label>
                      <select
                        value={editingPago.metodoPago}
                        onChange={(e) => setEditingPago({
                          ...editingPago,
                          metodoPago: e.target.value as 'Transferencia' | 'Tarjeta física' | 'Efectivo'
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      >
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta física">Tarjeta física</option>
                        <option value="Efectivo">Efectivo</option>
                      </select>
                    </div>

                    {/* Estado */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado *
                      </label>
                      <select
                        value={editingPago.estado}
                        onChange={(e) => setEditingPago({
                          ...editingPago,
                          estado: e.target.value as 'Pagado' | 'Pendiente',
                          fechaPago: e.target.value === 'Pagado' && !editingPago.fechaPago 
                            ? new Date().toISOString().split('T')[0]
                            : editingPago.fechaPago,
                          numeroReferencia: e.target.value === 'Pagado' && !editingPago.numeroReferencia
                            ? `TXN-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`
                            : editingPago.numeroReferencia
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                      </select>
                    </div>

                    {/* Número de Referencia */}
                    {editingPago.estado === 'Pagado' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Número de Referencia
                        </label>
                        <Input
                          type="text"
                          value={editingPago.numeroReferencia || ''}
                          onChange={(e) => setEditingPago({
                            ...editingPago,
                            numeroReferencia: e.target.value
                          })}
                          placeholder="TXN-2026-000000"
                        />
                      </div>
                    )}

                    {/* Notas */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Notas Internas
                      </label>
                      <textarea
                        value={editingPago.notas || ''}
                        onChange={(e) => setEditingPago({
                          ...editingPago,
                          notas: e.target.value
                        })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                        placeholder="Notas sobre el pago..."
                      />
                    </div>

                    {/* Info de Reserva (Read-only) */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Información de Reserva</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Cliente</p>
                          <p className="font-medium">{editingPago.cliente.nombre}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Apartamento</p>
                          <p className="font-medium">{editingPago.apartamento}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Monto</p>
                          <p className="font-medium text-green-600">DOP ${editingPago.monto.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Fecha Reserva</p>
                          <p className="font-medium">{new Date(editingPago.fechaReserva).toLocaleDateString('es-DO')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setShowEditModal(false)}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                      Guardar Cambios
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedPago && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedPago(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header Sticky */}
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Detalles del Pago
                    </h2>
                    <button
                      onClick={() => setSelectedPago(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>
                </div>

                {/* Content Scrollable */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  {/* Header con estado */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedPago.estado === 'Pagado' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {selectedPago.estado === 'Pagado' ? (
                        <CheckCircle className="text-green-600" size={32} />
                      ) : (
                        <Clock className="text-yellow-600" size={32} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl text-[#0B3C5D]">{selectedPago.id}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                        selectedPago.estado === 'Pagado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedPago.estado}
                      </span>
                    </div>
                  </div>

                  {/* Información del Pago */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Monto Total</p>
                      <p className="text-2xl text-green-600 font-bold">DOP ${selectedPago.monto.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Método de Pago</p>
                      <div className="flex items-center gap-2">
                        {selectedPago.metodoPago === 'Transferencia' ? (
                          <ArrowDownUp size={20} className="text-blue-600" />
                        ) : selectedPago.metodoPago === 'Tarjeta física' ? (
                          <CreditCard size={20} className="text-purple-600" />
                        ) : (
                          <Banknote size={20} className="text-green-600" />
                        )}
                        <p className="text-lg font-semibold text-[#0B3C5D]">{selectedPago.metodoPago}</p>
                      </div>
                    </div>
                  </div>

                  {/* Información del Cliente */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Información del Cliente</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-gray-700">{selectedPago.cliente.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        <span className="text-gray-700">{selectedPago.cliente.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        <span className="text-gray-700">{selectedPago.cliente.telefono}</span>
                      </div>
                    </div>
                  </div>

                  {/* Información de Apartamento */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Apartamento</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-gray-500" />
                        <span className="text-gray-700">{selectedPago.apartamento}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-gray-500" />
                        <span className="text-gray-700">{selectedPago.condominio}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fecha de Reserva</p>
                      <p className="font-medium">{new Date(selectedPago.fechaReserva).toLocaleDateString('es-DO')}</p>
                    </div>
                    {selectedPago.fechaPago && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Fecha de Pago</p>
                        <p className="font-medium text-green-600">{new Date(selectedPago.fechaPago).toLocaleDateString('es-DO')}</p>
                      </div>
                    )}
                  </div>

                  {/* Referencia */}
                  {selectedPago.numeroReferencia && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Número de Referencia</p>
                      <p className="font-mono font-semibold text-blue-700">{selectedPago.numeroReferencia}</p>
                    </div>
                  )}

                  {/* Notas */}
                  {selectedPago.notas && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Notas</p>
                      <p className="text-gray-700">{selectedPago.notas}</p>
                    </div>
                  )}
                </div>

                {/* Footer Sticky */}
                <div className="p-6 border-t border-gray-200 flex gap-3 flex-shrink-0">
                  <Button variant="outline" onClick={() => setSelectedPago(null)}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={() => {
                    handleEdit(selectedPago);
                    setSelectedPago(null);
                  }}>
                    <Edit size={16} className="mr-2" />
                    Editar Pago
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