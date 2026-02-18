import React from 'react';
import { Building2, Search, Filter, Plus, CheckCircle, XCircle, Clock, MapPin, X, Trash2 } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface CondominioModuleProps {
  isDarkMode?: boolean;
}

// Importar tipos de contratos
interface Contrato {
  id: number;
  tenant: string;
  cedula: string;
  telefono: string;
  apartment: string;
  apartmentId: number;
  condominio: string;
  startDate: string;
  endDate: string;
  monthlyAmount: number;
  dueDay: number;
  status: string;
  payments: {
    month: string;
    amount: number;
    status: string;
    date: string | null;
    metodoPago?: 'efectivo' | 'tarjeta' | 'transferencia' | null;
  }[];
}

interface Condominio {
  id: number;
  name: string;
  location: string;
  units: string[]; // Números de unidades
}

interface Unidad {
  unit: string;
  owner: string;
  cuota: number;
  status: string;
  date: string | null;
  condominioId: number;
}

// Mock de contratos (en producción vendría del contexto compartido)
const contratosData: Contrato[] = [
  {
    id: 1,
    tenant: 'María González',
    cedula: '001-1234567-8',
    telefono: '809-555-0123',
    apartment: 'Penthouse A-301',
    apartmentId: 1,
    condominio: 'Vista Mar Complex',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    monthlyAmount: 35000,
    dueDay: 5,
    status: 'Activo',
    payments: [
      { month: 'Enero', amount: 35000, status: 'Pagado', date: '2026-01-05', metodoPago: 'transferencia' },
      { month: 'Febrero', amount: 35000, status: 'Pagado', date: '2026-02-05', metodoPago: 'efectivo' },
      { month: 'Marzo', amount: 35000, status: 'Pendiente', date: null, metodoPago: null }
    ]
  },
  {
    id: 2,
    tenant: 'Carlos Ramírez',
    cedula: '001-9876543-2',
    telefono: '809-555-0456',
    apartment: 'Suite B-205',
    apartmentId: 2,
    condominio: 'Torre Premium',
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    monthlyAmount: 28000,
    dueDay: 10,
    status: 'Activo',
    payments: [
      { month: 'Enero', amount: 28000, status: 'Pagado', date: '2026-01-10', metodoPago: 'tarjeta' },
      { month: 'Febrero', amount: 28000, status: 'Pagado', date: '2026-02-10', metodoPago: 'transferencia' },
      { month: 'Marzo', amount: 28000, status: 'Pendiente', date: null, metodoPago: null }
    ]
  }
];

const condominiosIniciales: Condominio[] = [
  {
    id: 1,
    name: 'Torre Premium',
    location: 'Piantini',
    units: ['A-101', 'A-102', 'A-103', 'A-104', 'B-205', 'B-206']
  },
  {
    id: 2,
    name: 'Residencial Elegance',
    location: 'Naco',
    units: ['101', '102', '103', '201', '202', '203']
  },
  {
    id: 3,
    name: 'Vista Mar Complex',
    location: 'Malecón',
    units: ['A-301', 'A-302', 'PH-01', 'PH-02']
  }
];

export function CondominioModule({ isDarkMode }: CondominioModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [condominios, setCondominios] = React.useState<Condominio[]>(condominiosIniciales);
  const [selectedCondominio, setSelectedCondominio] = React.useState<number | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showNewCondominio, setShowNewCondominio] = React.useState(false);
  const [newCondominio, setNewCondominio] = React.useState({
    name: '',
    location: '',
    units: [''] as string[]
  });
  
  // Función para obtener información de una unidad desde contratos
  const getUnidadInfo = (condominioName: string, unitNumber: string) => {
    // Buscar si hay un contrato para esta unidad
    const contrato = contratosData.find(
      c => c.condominio === condominioName && c.apartment.includes(unitNumber)
    );
    
    if (contrato) {
      // Obtener el último pago para determinar estado
      const lastPayment = contrato.payments[contrato.payments.length - 1];
      const now = new Date();
      const dueDate = new Date(now.getFullYear(), now.getMonth(), contrato.dueDay);
      
      // Determinar estado basado en pagos
      let status = 'Sin Inquilino';
      if (lastPayment.status === 'Pagado') {
        status = 'Pagado';
      } else if (lastPayment.status === 'Pendiente') {
        // Si ya pasó la fecha de vencimiento, es moroso
        if (now > dueDate) {
          status = 'Moroso';
        } else {
          status = 'Pendiente';
        }
      }
      
      return {
        owner: contrato.tenant,
        cuota: contrato.monthlyAmount,
        status: status,
        date: lastPayment.date || `Vence: ${contrato.dueDay} de cada mes`
      };
    }
    
    // Si no hay contrato, la unidad está disponible
    return {
      owner: 'Sin Inquilino',
      cuota: 0,
      status: 'Disponible',
      date: null
    };
  };
  
  // Calcular estadísticas de un condominio
  const getCondominioStats = (condominioId: number) => {
    const condo = condominios.find(c => c.id === condominioId);
    if (!condo) return { units: 0, totalCuota: 0, pagados: 0, pendientes: 0, morosos: 0 };
    
    let pagados = 0;
    let pendientes = 0;
    let morosos = 0;
    let totalCuota = 0;
    
    condo.units.forEach(unit => {
      const info = getUnidadInfo(condo.name, unit);
      totalCuota += info.cuota;
      
      if (info.status === 'Pagado') pagados++;
      else if (info.status === 'Pendiente') pendientes++;
      else if (info.status === 'Moroso') morosos++;
    });
    
    return {
      units: condo.units.length,
      totalCuota,
      pagados,
      pendientes,
      morosos
    };
  };
  
  // Agregar nueva unidad al formulario
  const handleAddUnit = () => {
    setNewCondominio({
      ...newCondominio,
      units: [...newCondominio.units, '']
    });
  };
  
  // Remover unidad del formulario
  const handleRemoveUnit = (index: number) => {
    const updatedUnits = newCondominio.units.filter((_, i) => i !== index);
    setNewCondominio({
      ...newCondominio,
      units: updatedUnits.length > 0 ? updatedUnits : ['']
    });
  };
  
  // Actualizar número de unidad
  const handleUpdateUnit = (index: number, value: string) => {
    const updatedUnits = [...newCondominio.units];
    updatedUnits[index] = value;
    setNewCondominio({
      ...newCondominio,
      units: updatedUnits
    });
  };
  
  // Crear nuevo condominio
  const handleCreateCondominio = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar
    if (!newCondominio.name || !newCondominio.location) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Validar que haya al menos una unidad con número
    const validUnits = newCondominio.units.filter(u => u.trim() !== '');
    if (validUnits.length === 0) {
      toast.error('Debes agregar al menos una unidad');
      return;
    }
    
    // Generar nuevo ID
    const newId = condominios.length > 0 ? Math.max(...condominios.map(c => c.id)) + 1 : 1;
    
    // Crear el condominio
    const condominioCreado: Condominio = {
      id: newId,
      name: newCondominio.name,
      location: newCondominio.location,
      units: validUnits
    };
    
    // Agregar al estado
    setCondominios([...condominios, condominioCreado]);
    
    // Limpiar y cerrar
    setShowNewCondominio(false);
    setNewCondominio({
      name: '',
      location: '',
      units: ['']
    });
    
    toast.success('Condominio creado exitosamente', {
      icon: <Building2 size={20} />
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'Pendiente':
        return <Clock className="text-yellow-600" size={20} />;
      case 'Moroso':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pagado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Moroso':
        return 'bg-red-100 text-red-700';
      case 'Disponible':
        return 'bg-blue-100 text-blue-700';
      case 'Sin Inquilino':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Gestión de Condominios
          </h1>
          <p className={dm.textSecondary}>Administra condominios, torres y cuotas mensuales</p>
        </div>
        <Button onClick={() => setShowNewCondominio(true)}>
          <Plus className="mr-2" size={20} />
          Nuevo Condominio
        </Button>
      </div>
      
      {/* Formulario Nuevo Condominio */}
      <AnimatePresence>
        {showNewCondominio && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Crear Nuevo Condominio
                </h2>
                <button
                  onClick={() => setShowNewCondominio(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreateCondominio} className="space-y-6">
                {/* Información Básica */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    Información Básica
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre del Condominio"
                      placeholder="Ej: Torre Premium"
                      icon={<Building2 size={20} />}
                      value={newCondominio.name}
                      onChange={(e) => setNewCondominio({ ...newCondominio, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Ubicación"
                      placeholder="Ej: Piantini"
                      icon={<MapPin size={20} />}
                      value={newCondominio.location}
                      onChange={(e) => setNewCondominio({ ...newCondominio, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                {/* Unidades */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#0B3C5D] flex items-center gap-2">
                      <Building2 size={20} />
                      Unidades del Condominio
                    </h3>
                    <Button type="button" size="sm" onClick={handleAddUnit}>
                      <Plus size={16} className="mr-1" />
                      Agregar Unidad
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {newCondominio.units.map((unit, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <Input
                            label={`Unidad ${index + 1}`}
                            placeholder="Ej: A-101, 201, PH-01"
                            value={unit}
                            onChange={(e) => handleUpdateUnit(index, e.target.value)}
                          />
                        </div>
                        {newCondominio.units.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveUnit(index)}
                            className="mb-0"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    💡 Los datos de propietario, cuota y estado se tomarán automáticamente del módulo de contratos cuando se asigne un inquilino.
                  </p>
                </div>
                
                {/* Botones */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={() => setShowNewCondominio(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Building2 className="mr-2" size={18} />
                    Crear Condominio
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Condominios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {condominios.map((condo, index) => {
          const stats = getCondominioStats(condo.id);
          
          return (
            <motion.div
              key={condo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                hover 
                onClick={() => setSelectedCondominio(condo.id)}
                className={`p-6 cursor-pointer transition-all ${
                  selectedCondominio === condo.id ? 'ring-4 ring-[#0B3C5D]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <span className="text-sm text-gray-500">{stats.units} unidades</span>
                </div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {condo.name}
                </h3>
                <p className="text-gray-600 mb-4 flex items-center gap-1">
                  <MapPin size={14} />
                  {condo.location}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuota Total:</span>
                    <span className="text-[#0B3C5D] font-semibold">DOP ${stats.totalCuota.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} /> Pagados
                      </span>
                      <span className="font-semibold">{stats.pagados}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-yellow-600 flex items-center gap-1">
                        <Clock size={16} /> Pendientes
                      </span>
                      <span className="font-semibold">{stats.pendientes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 flex items-center gap-1">
                        <XCircle size={16} /> Morosos
                      </span>
                      <span className="font-semibold">{stats.morosos}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Unidades Table */}
      {selectedCondominio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                Unidades - {condominios.find(c => c.id === selectedCondominio)?.name}
              </h2>
              <div className="flex gap-3">
                <Input
                  placeholder="Buscar unidad o propietario..."
                  icon={<Search size={20} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
                <Button variant="outline">
                  <Filter size={20} className="mr-2" />
                  Filtrar
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#0B3C5D]">
                    <th className="text-left py-4 px-4 text-[#0B3C5D]">Unidad</th>
                    <th className="text-left py-4 px-4 text-[#0B3C5D]">Propietario/Inquilino</th>
                    <th className="text-left py-4 px-4 text-[#0B3C5D]">Cuota Mensual</th>
                    <th className="text-left py-4 px-4 text-[#0B3C5D]">Estado</th>
                    <th className="text-left py-4 px-4 text-[#0B3C5D]">Fecha de Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const condo = condominios.find(c => c.id === selectedCondominio);
                    if (!condo) return null;
                    
                    return condo.units
                      .map(unit => {
                        const info = getUnidadInfo(condo.name, unit);
                        return { unit, ...info };
                      })
                      .filter(u => 
                        u.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.owner.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((unidad, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-[#F5F6F8] transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="font-semibold text-[#0B3C5D]">{unidad.unit}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{unidad.owner}</td>
                          <td className="py-4 px-4 text-gray-700">
                            {unidad.cuota > 0 ? `DOP $${unidad.cuota.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(unidad.status)}
                              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(unidad.status)}`}>
                                {unidad.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            {unidad.date || '-'}
                          </td>
                        </motion.tr>
                      ));
                  })()}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}