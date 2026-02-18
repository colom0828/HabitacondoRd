import React from 'react';
import { FileText, Plus, Calendar, DollarSign, User, Building, Phone, CreditCard, ChevronDown, CheckCircle, Banknote, X } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ContratosModuleProps {
  isDarkMode?: boolean;
}

// Importar datos de apartamentos disponibles
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

// Mock de apartamentos disponibles (en producción vendría del contexto o API)
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
    id: 5,
    name: 'Duplex Premium',
    location: 'Gazcue',
    price: 150,
    status: 'Disponible',
    condominio: 'Vista Mar Complex',
    floor: 'D-1501/1502',
    rentalType: 'daily'
  }
];

const contratosIniciales: Contrato[] = [
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

export function ContratosModule({ isDarkMode }: ContratosModuleProps) {
  const [contratos, setContratos] = React.useState<Contrato[]>(contratosIniciales);
  const [showNewContract, setShowNewContract] = React.useState(false);
  const [selectedContract, setSelectedContract] = React.useState<number | null>(null);
  const [showApartmentDropdown, setShowApartmentDropdown] = React.useState(false);
  const [editingPayment, setEditingPayment] = React.useState<{ contratoId: number; paymentIndex: number } | null>(null);
  const [paymentForm, setPaymentForm] = React.useState({
    fecha: new Date().toISOString().split('T')[0],
    metodoPago: '' as 'efectivo' | 'tarjeta' | 'transferencia' | ''
  });
  const [newContract, setNewContract] = React.useState({
    tenant: '',
    cedula: '',
    telefono: '',
    apartmentId: null as number | null,
    apartment: '',
    condominio: '',
    startDate: '',
    endDate: '',
    monthlyAmount: '',
    dueDay: ''
  });
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Cerrar dropdown al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowApartmentDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Filtrar solo apartamentos disponibles y de tipo mensual
  const apartamentosParaContrato = apartamentosDisponibles.filter(
    apt => apt.status === 'Disponible' && apt.rentalType === 'monthly'
  );
  
  const handleSelectApartment = (apartment: Apartment) => {
    setNewContract({
      ...newContract,
      apartmentId: apartment.id,
      apartment: `${apartment.name} - ${apartment.floor}`,
      condominio: apartment.condominio,
      monthlyAmount: apartment.price.toString()
    });
    setShowApartmentDropdown(false);
  };
  
  // Función para generar los meses de pago
  const generateMonthsPayments = (startDate: string, endDate: string, amount: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const payments = [];
    
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const current = new Date(start);
    while (current <= end) {
      payments.push({
        month: monthNames[current.getMonth()],
        amount: amount,
        status: 'Pendiente',
        date: null,
        metodoPago: null
      });
      current.setMonth(current.getMonth() + 1);
    }
    
    return payments;
  };
  
  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContract.apartmentId) {
      alert('Por favor selecciona un apartamento');
      return;
    }
    
    // Generar nuevo ID
    const newId = contratos.length > 0 ? Math.max(...contratos.map(c => c.id)) + 1 : 1;
    
    // Crear el nuevo contrato
    const contratoCreado: Contrato = {
      id: newId,
      tenant: newContract.tenant,
      cedula: newContract.cedula,
      telefono: newContract.telefono,
      apartment: newContract.apartment,
      apartmentId: newContract.apartmentId,
      condominio: newContract.condominio,
      startDate: newContract.startDate,
      endDate: newContract.endDate,
      monthlyAmount: parseFloat(newContract.monthlyAmount),
      dueDay: parseInt(newContract.dueDay),
      status: 'Activo',
      payments: generateMonthsPayments(
        newContract.startDate, 
        newContract.endDate, 
        parseFloat(newContract.monthlyAmount)
      )
    };
    
    // Agregar el nuevo contrato al estado
    setContratos([contratoCreado, ...contratos]);
    
    // Limpiar formulario y cerrar
    setShowNewContract(false);
    setNewContract({
      tenant: '',
      cedula: '',
      telefono: '',
      apartmentId: null,
      apartment: '',
      condominio: '',
      startDate: '',
      endDate: '',
      monthlyAmount: '',
      dueDay: ''
    });
    
    // Mostrar mensaje de éxito
    toast.success('Contrato creado exitosamente', {
      icon: <CheckCircle size={20} />
    });
  };
  
  // Abrir formulario de registro de pago
  const handleOpenPaymentForm = (contratoId: number, paymentIndex: number) => {
    setEditingPayment({ contratoId, paymentIndex });
    setPaymentForm({
      fecha: new Date().toISOString().split('T')[0],
      metodoPago: ''
    });
  };
  
  // Guardar el pago registrado
  const handleSavePayment = () => {
    if (!editingPayment) return;
    
    if (!paymentForm.fecha || !paymentForm.metodoPago) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    setContratos(contratos.map(contrato => {
      if (contrato.id === editingPayment.contratoId) {
        const updatedPayments = [...contrato.payments];
        updatedPayments[editingPayment.paymentIndex] = {
          ...updatedPayments[editingPayment.paymentIndex],
          status: 'Pagado',
          date: paymentForm.fecha,
          metodoPago: paymentForm.metodoPago
        };
        
        return {
          ...contrato,
          payments: updatedPayments
        };
      }
      return contrato;
    }));
    
    setEditingPayment(null);
    setPaymentForm({
      fecha: new Date().toISOString().split('T')[0],
      metodoPago: ''
    });
    
    toast.success('Pago registrado exitosamente', {
      icon: <CheckCircle size={20} />
    });
  };
  
  // Obtener etiqueta del método de pago
  const getMetodoPagoLabel = (metodo: string | null | undefined) => {
    if (!metodo) return '';
    switch (metodo) {
      case 'efectivo': return '💵 Efectivo';
      case 'tarjeta': return '💳 Tarjeta';
      case 'transferencia': return '🏦 Transferencia';
      default: return '';
    }
  };
  
  const dm = getDarkModeClasses(isDarkMode || false);
  
  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Contratos Mensuales
          </h1>
          <p className={dm.textSecondary}>Gestiona contratos de arrendamiento a largo plazo</p>
        </div>
        <Button onClick={() => setShowNewContract(true)}>
          <Plus className="mr-2" size={20} />
          Nuevo Contrato
        </Button>
      </div>
      
      {/* New Contract Form */}
      {showNewContract && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl text-[#0B3C5D] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Crear Nuevo Contrato
            </h2>
            <form onSubmit={handleCreateContract} className="space-y-6">
              {/* Sección: Información del Arrendatario */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
                  <User size={20} />
                  Información del Arrendatario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre Completo"
                    placeholder="Ej: Juan Pérez González"
                    icon={<User size={20} />}
                    value={newContract.tenant}
                    onChange={(e) => setNewContract({ ...newContract, tenant: e.target.value })}
                    required
                  />
                  <Input
                    label="Cédula de Identidad"
                    placeholder="001-1234567-8"
                    icon={<CreditCard size={20} />}
                    value={newContract.cedula}
                    onChange={(e) => setNewContract({ ...newContract, cedula: e.target.value })}
                    required
                  />
                  <Input
                    label="Número de Teléfono"
                    placeholder="809-555-0123"
                    icon={<Phone size={20} />}
                    value={newContract.telefono}
                    onChange={(e) => setNewContract({ ...newContract, telefono: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Sección: Apartamento */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
                  <Building size={20} />
                  Selección de Apartamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dropdown personalizado para apartamentos */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartamento Disponible *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowApartmentDropdown(!showApartmentDropdown)}
                      className={`w-full px-4 py-3 pl-10 rounded-xl border-2 transition-all duration-300 bg-white/95 backdrop-blur-sm text-left flex items-center justify-between ${
                        newContract.apartment 
                          ? 'border-[#0B3C5D]/40 hover:border-[#0B3C5D]' 
                          : 'border-red-300 hover:border-red-400'
                      }`}
                    >
                      <span className={newContract.apartment ? 'text-[#0B3C5D]' : 'text-gray-400'}>
                        {newContract.apartment || 'Seleccionar apartamento...'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform ${showApartmentDropdown ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <div className="absolute left-3 top-[42px] text-[#0B3C5D] pointer-events-none">
                      <Building size={20} />
                    </div>
                    
                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {showApartmentDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-[#0B3C5D]/20 z-50 max-h-80 overflow-y-auto"
                        >
                          {apartamentosParaContrato.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                              <Building size={32} className="mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">No hay apartamentos disponibles para contrato mensual</p>
                            </div>
                          ) : (
                            <div className="p-2">
                              {apartamentosParaContrato.map((apt) => (
                                <button
                                  key={apt.id}
                                  type="button"
                                  onClick={() => handleSelectApartment(apt)}
                                  className={`w-full p-4 rounded-lg text-left hover:bg-[#0B3C5D]/5 transition-colors ${
                                    newContract.apartmentId === apt.id ? 'bg-[#0B3C5D]/10' : ''
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <p className="font-semibold text-[#0B3C5D] mb-1">
                                        {apt.name}
                                      </p>
                                      <p className="text-sm text-gray-600 mb-1">
                                        {apt.condominio} - {apt.floor}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {apt.location}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-lg font-bold text-[#0B3C5D]">
                                        ${apt.price.toLocaleString()}
                                      </p>
                                      <p className="text-xs text-gray-500">/ mes</p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Condominio (auto-filled) */}
                  <Input
                    label="Condominio"
                    placeholder="Se llenará automáticamente"
                    icon={<Building size={20} />}
                    value={newContract.condominio}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {/* Sección: Detalles del Contrato */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Detalles del Contrato
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Fecha de Inicio"
                    type="date"
                    icon={<Calendar size={20} />}
                    value={newContract.startDate}
                    onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                    required
                  />
                  <Input
                    label="Fecha de Fin"
                    type="date"
                    icon={<Calendar size={20} />}
                    value={newContract.endDate}
                    onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                    required
                    min={newContract.startDate}
                  />
                  <Input
                    label="Monto Mensual (DOP)"
                    type="number"
                    placeholder="35000"
                    icon={<DollarSign size={20} />}
                    value={newContract.monthlyAmount}
                    onChange={(e) => setNewContract({ ...newContract, monthlyAmount: e.target.value })}
                    required
                  />
                  <Input
                    label="Día de Vencimiento"
                    type="number"
                    placeholder="5"
                    min="1"
                    max="31"
                    icon={<Calendar size={20} />}
                    value={newContract.dueDay}
                    onChange={(e) => setNewContract({ ...newContract, dueDay: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => {
                  setShowNewContract(false);
                  setNewContract({
                    tenant: '',
                    cedula: '',
                    telefono: '',
                    apartmentId: null,
                    apartment: '',
                    condominio: '',
                    startDate: '',
                    endDate: '',
                    monthlyAmount: '',
                    dueDay: ''
                  });
                }}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <FileText className="mr-2" size={18} />
                  Crear Contrato
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
      
      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {contratos.map((contrato, index) => (
          <motion.div
            key={contrato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              hover 
              onClick={() => setSelectedContract(contrato.id === selectedContract ? null : contrato.id)}
              className={`p-6 cursor-pointer transition-all ${
                selectedContract === contrato.id ? 'ring-4 ring-[#0B3C5D]' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  contrato.status === 'Activo' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {contrato.status}
                </span>
              </div>
              
              <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {contrato.tenant}
              </h3>
              <p className="text-gray-600 mb-2">{contrato.apartment}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <CreditCard size={14} />
                <span>{contrato.cedula}</span>
                <span className="mx-1">•</span>
                <Phone size={14} />
                <span>{contrato.telefono}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Período:</span>
                  <span className="text-[#0B3C5D]">{contrato.startDate} - {contrato.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Renta Mensual:</span>
                  <span className="text-[#0B3C5D] font-semibold">
                    DOP ${contrato.monthlyAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Día de Pago:</span>
                  <span className="text-[#0B3C5D]">Día {contrato.dueDay}</span>
                </div>
              </div>
              
              {selectedContract === contrato.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <h4 className="font-semibold text-[#0B3C5D] mb-3">Historial de Pagos</h4>
                  <div className="space-y-2">
                    {contrato.payments.map((payment, idx) => (
                      <div 
                        key={idx}
                        className="bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-3">
                          <div className="flex-1">
                            <p className="font-medium text-gray-700">{payment.month} 2026</p>
                            {payment.date && (
                              <p className="text-xs text-gray-500">
                                Pagado: {payment.date} {payment.metodoPago && `• ${getMetodoPagoLabel(payment.metodoPago)}`}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-semibold text-[#0B3C5D]">
                                DOP ${payment.amount.toLocaleString()}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full inline-block ${
                                payment.status === 'Pagado'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {payment.status}
                              </span>
                            </div>
                            {payment.status === 'Pendiente' && (
                              <Button
                                type="button"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenPaymentForm(contrato.id, idx);
                                }}
                                className="whitespace-nowrap"
                              >
                                <Banknote size={16} className="mr-1" />
                                Registrar
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {/* Formulario de registro de pago */}
                        <AnimatePresence>
                          {editingPayment?.contratoId === contrato.id && editingPayment?.paymentIndex === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-gray-200 bg-white p-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-[#0B3C5D] flex items-center gap-2">
                                  <Banknote size={18} />
                                  Registrar Pago - {payment.month}
                                </h5>
                                <button
                                  onClick={() => setEditingPayment(null)}
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                {/* Fecha de Pago */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de Pago
                                  </label>
                                  <input
                                    type="date"
                                    value={paymentForm.fecha}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, fecha: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                                    required
                                  />
                                </div>
                                
                                {/* Método de Pago */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Método de Pago
                                  </label>
                                  <select
                                    value={paymentForm.metodoPago}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, metodoPago: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                                    required
                                  >
                                    <option value="">Seleccionar método...</option>
                                    <option value="efectivo">💵 Efectivo</option>
                                    <option value="tarjeta">💳 Tarjeta</option>
                                    <option value="transferencia">🏦 Transferencia</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 justify-end">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingPayment(null)}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleSavePayment}
                                >
                                  <CheckCircle size={16} className="mr-1" />
                                  Guardar Pago
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}