import React from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  DollarSign,
  Sparkles,
  Globe,
  Bell,
  Mail,
  Calendar,
  Clock,
  Palette,
  Shield,
  Database,
  FileText,
  ToggleLeft,
  ToggleRight,
  Save,
  RefreshCw,
  Info,
  CheckCircle,
  AlertCircle,
  Building2,
  User,
  Home,
  CreditCard
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ConfiguracionProps {
  isDarkMode?: boolean;
}

interface Configuracion {
  // Moneda
  tasaCambio: number;
  monedaPrincipal: 'DOP' | 'USD';
  
  // Limpieza
  limpiezaGlobalActiva: boolean;
  diasAnticipacionLimpieza: number;
  horaLimpiezaDefault: string;
  
  // Notificaciones
  notificacionesEmail: boolean;
  notificacionesReserva: boolean;
  notificacionesPago: boolean;
  notificacionesMorosidad: boolean;
  emailNotificaciones: string;
  
  // Reservas
  anticipacionMinimaReserva: number;
  horaCheckIn: string;
  horaCheckOut: string;
  depositoSeguridad: number;
  
  // Pagos
  metodoPagoDefault: 'Efectivo' | 'Transferencia' | 'Tarjeta';
  permitirPagosParciales: boolean;
  porcentajeDeposito: number;
  
  // Sistema
  nombreEmpresa: string;
  emailEmpresa: string;
  telefonoEmpresa: string;
  direccionEmpresa: string;
  
  // Otros
  idiomaDefault: 'es' | 'en';
  zonaHoraria: string;
  formatoFecha: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
}

const CONFIGURACION_INICIAL: Configuracion = {
  // Moneda
  tasaCambio: 58.50,
  monedaPrincipal: 'DOP',
  
  // Limpieza
  limpiezaGlobalActiva: true,
  diasAnticipacionLimpieza: 1,
  horaLimpiezaDefault: '10:00',
  
  // Notificaciones
  notificacionesEmail: true,
  notificacionesReserva: true,
  notificacionesPago: true,
  notificacionesMorosidad: true,
  emailNotificaciones: 'admin@habitacondo.com',
  
  // Reservas
  anticipacionMinimaReserva: 24,
  horaCheckIn: '15:00',
  horaCheckOut: '11:00',
  depositoSeguridad: 5000,
  
  // Pagos
  metodoPagoDefault: 'Transferencia',
  permitirPagosParciales: true,
  porcentajeDeposito: 30,
  
  // Sistema
  nombreEmpresa: 'Habita-condo RD',
  emailEmpresa: 'info@habitacondo.com',
  telefonoEmpresa: '809-123-4567',
  direccionEmpresa: 'Punta Cana, República Dominicana',
  
  // Otros
  idiomaDefault: 'es',
  zonaHoraria: 'America/Santo_Domingo',
  formatoFecha: 'DD/MM/YYYY'
};

export function ConfiguracionModule({ isDarkMode }: ConfiguracionProps) {
  const [configuracion, setConfiguracion] = React.useState<Configuracion>(CONFIGURACION_INICIAL);
  const [cambiosGuardados, setCambiosGuardados] = React.useState(false);
  const [seccionActiva, setSeccionActiva] = React.useState<'moneda' | 'limpieza' | 'notificaciones' | 'reservas' | 'pagos' | 'sistema' | 'general'>('moneda');

  const dm = getDarkModeClasses(isDarkMode || false);

  const actualizarConfiguracion = (campo: keyof Configuracion, valor: any) => {
    setConfiguracion({ ...configuracion, [campo]: valor });
    setCambiosGuardados(false);
  };

  const guardarConfiguracion = () => {
    // Aquí se guardarían los cambios en la base de datos
    console.log('Guardando configuración:', configuracion);
    setCambiosGuardados(true);
    setTimeout(() => setCambiosGuardados(false), 3000);
  };

  const resetearConfiguracion = () => {
    if (confirm('¿Está seguro de resetear toda la configuración a valores por defecto?')) {
      setConfiguracion(CONFIGURACION_INICIAL);
      setCambiosGuardados(false);
    }
  };

  const convertirMoneda = (monto: number, de: 'DOP' | 'USD', a: 'DOP' | 'USD') => {
    if (de === a) return monto;
    if (de === 'DOP' && a === 'USD') return monto / configuracion.tasaCambio;
    return monto * configuracion.tasaCambio;
  };

  const secciones = [
    { id: 'moneda', label: 'Moneda y Cambio', icon: DollarSign },
    { id: 'limpieza', label: 'Limpieza', icon: Sparkles },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'pagos', label: 'Pagos', icon: CreditCard },
    { id: 'sistema', label: 'Información', icon: Building2 },
    { id: 'general', label: 'General', icon: Settings }
  ];

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className={dm.textHeading} size={32} />
          <h1 className={`text-3xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Configuración del Sistema
          </h1>
        </div>
        <p className={dm.textSecondary}>Ajustes generales de la plataforma Habita-condo RD</p>
      </div>

      {/* Alerta de cambios guardados */}
      {cambiosGuardados && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mb-6 p-4 ${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg flex items-center gap-3`}
        >
          <CheckCircle className="text-green-600" size={24} />
          <div>
            <h3 className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>Configuración guardada exitosamente</h3>
            <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Los cambios se han aplicado correctamente</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de navegación */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className={`text-sm font-semibold mb-4 px-2 ${dm.textSecondary}`}>Secciones</h3>
            <nav className="space-y-2">
              {secciones.map((seccion) => {
                const Icon = seccion.icon;
                const isActive = seccionActiva === seccion.id;
                return (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActiva(seccion.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#0B3C5D] text-white'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{seccion.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className={`mt-6 pt-6 border-t space-y-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Button variant="primary" onClick={guardarConfiguracion} className="w-full">
                <Save size={16} className="mr-2" />
                Guardar Cambios
              </Button>
              <Button variant="outline" onClick={resetearConfiguracion} className="w-full">
                <RefreshCw size={16} className="mr-2" />
                Resetear
              </Button>
            </div>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-3">
          {/* Moneda y Cambio */}
          {seccionActiva === 'moneda' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className={`text-xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
                      Moneda y Tasa de Cambio
                    </h2>
                    <p className={`text-sm ${dm.textSecondary}`}>Configuración de monedas y conversión</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                      Tasa de Cambio DOP → USD
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="number"
                          step="0.01"
                          value={configuracion.tasaCambio}
                          onChange={(e) => actualizarConfiguracion('tasaCambio', parseFloat(e.target.value))}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent text-lg font-semibold ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>
                      <div className={dm.textSecondary}>
                        <p className="text-sm">DOP 1 = USD</p>
                        <p className={`text-lg font-bold ${dm.textHeading}`}>
                          ${(1 / configuracion.tasaCambio).toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <p className={`text-xs mt-2 ${dm.textSecondary}`}>
                      💡 Esta tasa se utiliza para convertir precios entre DOP y USD en todo el sistema
                    </p>
                  </div>

                  <div className={`p-4 border rounded-lg ${isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                    <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                      <Info size={16} />
                      Ejemplos de Conversión
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className={`flex items-center justify-between p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-white border-blue-100'}`}>
                        <span className={dm.text}>DOP $5,000</span>
                        <span className={dm.textSecondary}>→</span>
                        <span className={`font-semibold ${dm.textHeading}`}>
                          USD ${convertirMoneda(5000, 'DOP', 'USD').toFixed(2)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-white border-blue-100'}`}>
                        <span className={dm.text}>DOP $30,000</span>
                        <span className={dm.textSecondary}>→</span>
                        <span className={`font-semibold ${dm.textHeading}`}>
                          USD ${convertirMoneda(30000, 'DOP', 'USD').toFixed(2)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-white border-blue-100'}`}>
                        <span className={dm.text}>USD $100</span>
                        <span className={dm.textSecondary}>→</span>
                        <span className={`font-semibold ${dm.textHeading}`}>
                          DOP ${convertirMoneda(100, 'USD', 'DOP').toFixed(2)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-blue-800' : 'bg-white border-blue-100'}`}>
                        <span className={dm.text}>USD $500</span>
                        <span className={dm.textSecondary}>→</span>
                        <span className={`font-semibold ${dm.textHeading}`}>
                          DOP ${convertirMoneda(500, 'USD', 'DOP').toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                      Moneda Principal del Sistema
                    </label>
                    <select
                      value={configuracion.monedaPrincipal}
                      onChange={(e) => actualizarConfiguracion('monedaPrincipal', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="DOP">🇩🇴 Peso Dominicano (DOP)</option>
                      <option value="USD">🇺🇸 Dólar Estadounidense (USD)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Limpieza */}
          {seccionActiva === 'limpieza' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h2 className={`text-xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
                      Configuración de Limpieza
                    </h2>
                    <p className={`text-sm ${dm.textSecondary}`}>Gestión automática de servicios de limpieza</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-gradient-to-r from-purple-50 to-white border-purple-200'}`}>
                    <div className="flex items-center gap-3">
                      {configuracion.limpiezaGlobalActiva ? (
                        <ToggleRight className="text-green-600" size={32} />
                      ) : (
                        <ToggleLeft className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={32} />
                      )}
                      <div>
                        <h3 className={`font-semibold ${dm.text}`}>Limpieza Automática Global</h3>
                        <p className={`text-sm ${dm.textSecondary}`}>
                          {configuracion.limpiezaGlobalActiva 
                            ? 'Sistema activado - Programación automática habilitada'
                            : 'Sistema desactivado - Programación manual requerida'
                          }
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => actualizarConfiguracion('limpiezaGlobalActiva', !configuracion.limpiezaGlobalActiva)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        configuracion.limpiezaGlobalActiva
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      {configuracion.limpiezaGlobalActiva ? 'ACTIVADO' : 'DESACTIVADO'}
                    </button>
                  </div>

                  {configuracion.limpiezaGlobalActiva && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div className={`p-4 border rounded-lg ${isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                          ✓ Con limpieza automática activada, el sistema programará automáticamente las limpiezas después de cada check-out
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                            Días de Anticipación
                          </label>
                          <select
                            value={configuracion.diasAnticipacionLimpieza}
                            onChange={(e) => actualizarConfiguracion('diasAnticipacionLimpieza', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          >
                            <option value="0">Mismo día del check-out</option>
                            <option value="1">1 día después del check-out</option>
                            <option value="2">2 días después del check-out</option>
                            <option value="3">3 días después del check-out</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                            Hora por Defecto
                          </label>
                          <input
                            type="time"
                            value={configuracion.horaLimpiezaDefault}
                            onChange={(e) => actualizarConfiguracion('horaLimpiezaDefault', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Notificaciones */}
          {seccionActiva === 'notificaciones' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                    <Bell className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className={`text-xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
                      Notificaciones
                    </h2>
                    <p className={`text-sm ${dm.textSecondary}`}>Configurar alertas y notificaciones por email</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                      <Mail size={16} className="inline mr-1" />
                      Email para Notificaciones
                    </label>
                    <input
                      type="email"
                      value={configuracion.emailNotificaciones}
                      onChange={(e) => actualizarConfiguracion('emailNotificaciones', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                      }`}
                      placeholder="admin@habitacondo.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className={`font-semibold mb-3 ${dm.text}`}>Tipos de Notificaciones</h3>
                    
                    {[
                      { key: 'notificacionesEmail', label: 'Habilitar notificaciones por Email', icon: Mail },
                      { key: 'notificacionesReserva', label: 'Nuevas reservas y aprobaciones', icon: Calendar },
                      { key: 'notificacionesPago', label: 'Pagos recibidos', icon: DollarSign },
                      { key: 'notificacionesMorosidad', label: 'Alertas de morosidad', icon: AlertCircle }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className={`flex items-center justify-between p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                          <Icon size={20} className={dm.textSecondary} />
                          <span className={`text-sm ${dm.text}`}>{label}</span>
                        </div>
                        <button
                          onClick={() => actualizarConfiguracion(key as keyof Configuracion, !configuracion[key as keyof Configuracion])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            configuracion[key as keyof Configuracion] ? 'bg-green-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              configuracion[key as keyof Configuracion] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Reservas */}
          {seccionActiva === 'reservas' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h2 className={`text-xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
                      Configuración de Reservas
                    </h2>
                    <p className={`text-sm ${dm.textSecondary}`}>Horarios y políticas de reservación</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                        <Clock size={16} className="inline mr-1" />
                        Hora de Check-In
                      </label>
                      <input
                        type="time"
                        value={configuracion.horaCheckIn}
                        onChange={(e) => actualizarConfiguracion('horaCheckIn', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                        <Clock size={16} className="inline mr-1" />
                        Hora de Check-Out
                      </label>
                      <input
                        type="time"
                        value={configuracion.horaCheckOut}
                        onChange={(e) => actualizarConfiguracion('horaCheckOut', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                      Anticipación Mínima para Reservas (horas)
                    </label>
                    <select
                      value={configuracion.anticipacionMinimaReserva}
                      onChange={(e) => actualizarConfiguracion('anticipacionMinimaReserva', parseInt(e.target.value))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="0">Sin anticipación</option>
                      <option value="12">12 horas</option>
                      <option value="24">24 horas (1 día)</option>
                      <option value="48">48 horas (2 días)</option>
                      <option value="72">72 horas (3 días)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${dm.textSecondary}`}>
                      Depósito de Seguridad (DOP)
                    </label>
                    <input
                      type="number"
                      value={configuracion.depositoSeguridad}
                      onChange={(e) => actualizarConfiguracion('depositoSeguridad', parseFloat(e.target.value))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                      }`}
                    />
                    <p className={`text-xs mt-2 ${dm.textSecondary}`}>
                      Monto solicitado como depósito de seguridad para reservas
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Pagos */}
          {seccionActiva === 'pagos' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CreditCard className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Configuración de Pagos
                    </h2>
                    <p className="text-sm text-gray-600">Métodos de pago y políticas</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Pago por Defecto
                    </label>
                    <select
                      value={configuracion.metodoPagoDefault}
                      onChange={(e) => actualizarConfiguracion('metodoPagoDefault', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                    >
                      <option value="Efectivo">💵 Efectivo</option>
                      <option value="Transferencia">🏦 Transferencia Bancaria</option>
                      <option value="Tarjeta">💳 Tarjeta de Crédito/Débito</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-800">Permitir Pagos Parciales</h3>
                      <p className="text-sm text-gray-600">Aceptar pagos en cuotas o parciales</p>
                    </div>
                    <button
                      onClick={() => actualizarConfiguracion('permitirPagosParciales', !configuracion.permitirPagosParciales)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        configuracion.permitirPagosParciales ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          configuracion.permitirPagosParciales ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Porcentaje de Depósito Inicial (%)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={configuracion.porcentajeDeposito}
                        onChange={(e) => actualizarConfiguracion('porcentajeDeposito', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <div className="w-20 px-4 py-2 border border-gray-200 rounded-lg text-center font-semibold text-[#0B3C5D]">
                        {configuracion.porcentajeDeposito}%
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Porcentaje del monto total requerido como depósito inicial
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Sistema */}
          {seccionActiva === 'sistema' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Building2 className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Información de la Empresa
                    </h2>
                    <p className="text-sm text-gray-600">Datos de contacto y empresa</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa
                    </label>
                    <input
                      type="text"
                      value={configuracion.nombreEmpresa}
                      onChange={(e) => actualizarConfiguracion('nombreEmpresa', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Email Corporativo
                      </label>
                      <input
                        type="email"
                        value={configuracion.emailEmpresa}
                        onChange={(e) => actualizarConfiguracion('emailEmpresa', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={configuracion.telefonoEmpresa}
                        onChange={(e) => actualizarConfiguracion('telefonoEmpresa', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <textarea
                      value={configuracion.direccionEmpresa}
                      onChange={(e) => actualizarConfiguracion('direccionEmpresa', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* General */}
          {seccionActiva === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Settings className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Ajustes Generales
                    </h2>
                    <p className="text-sm text-gray-600">Idioma, formato y zona horaria</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe size={16} className="inline mr-1" />
                        Idioma del Sistema
                      </label>
                      <select
                        value={configuracion.idiomaDefault}
                        onChange={(e) => actualizarConfiguracion('idiomaDefault', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      >
                        <option value="es">🇪🇸 Español</option>
                        <option value="en">🇺🇸 English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock size={16} className="inline mr-1" />
                        Zona Horaria
                      </label>
                      <select
                        value={configuracion.zonaHoraria}
                        onChange={(e) => actualizarConfiguracion('zonaHoraria', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      >
                        <option value="America/Santo_Domingo">América/Santo Domingo (GMT-4)</option>
                        <option value="America/New_York">América/Nueva York (GMT-5)</option>
                        <option value="America/Los_Angeles">América/Los Ángeles (GMT-8)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Formato de Fecha
                    </label>
                    <select
                      value={configuracion.formatoFecha}
                      onChange={(e) => actualizarConfiguracion('formatoFecha', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (18/02/2026)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (02/18/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2026-02-18)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}