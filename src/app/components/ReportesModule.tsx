import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Calendar,
  AlertTriangle,
  BarChart3,
  Download,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ReportesModuleProps {
  isDarkMode?: boolean;
}

// Datos de ejemplo
const ingresosPorMes = [
  { mes: 'Ene', ingresos: 145000, gastos: 45000 },
  { mes: 'Feb', ingresos: 178000, gastos: 52000 },
  { mes: 'Mar', ingresos: 195000, gastos: 48000 },
  { mes: 'Abr', ingresos: 210000, gastos: 55000 },
  { mes: 'May', ingresos: 198000, gastos: 50000 },
  { mes: 'Jun', ingresos: 225000, gastos: 58000 }
];

const ingresosPorTipoRenta = [
  { mes: 'Ene', rentaDiaria: 85000, rentaMensual: 60000 },
  { mes: 'Feb', rentaDiaria: 105000, rentaMensual: 73000 },
  { mes: 'Mar', rentaDiaria: 120000, rentaMensual: 75000 },
  { mes: 'Abr', rentaDiaria: 135000, rentaMensual: 75000 },
  { mes: 'May', rentaDiaria: 118000, rentaMensual: 80000 },
  { mes: 'Jun', rentaDiaria: 145000, rentaMensual: 80000 }
];

const comparativaRentas = [
  { 
    tipo: 'Renta Diaria (Airbnb)', 
    total: 708000, 
    porcentaje: 61.5, 
    reservas: 142,
    promedioPorReserva: 4986,
    color: '#0B3C5D'
  },
  { 
    tipo: 'Renta Mensual (Contratos)', 
    total: 443000, 
    porcentaje: 38.5, 
    reservas: 18,
    promedioPorReserva: 24611,
    color: '#328CC1'
  }
];

const apartamentosPorTipoRenta = [
  { apartamento: 'Penthouse Vista Mar', tipo: 'Diaria', ingresos: 156000, reservas: 28 },
  { apartamento: 'Suite Ejecutiva 402', tipo: 'Mensual', ingresos: 145000, reservas: 6 },
  { apartamento: 'Loft Moderno 305', tipo: 'Diaria', ingresos: 132000, reservas: 24 },
  { apartamento: 'Apartamento Playa 201', tipo: 'Mensual', ingresos: 118000, reservas: 6 },
  { apartamento: 'Studio Premium 104', tipo: 'Diaria', ingresos: 95000, reservas: 18 },
  { apartamento: 'Suite Playa 102', tipo: 'Diaria', ingresos: 88000, reservas: 16 }
];

const ingresosPorApartamento = [
  { apartamento: 'Penthouse Vista Mar', ingresos: 156000, ocupacion: 92 },
  { apartamento: 'Suite Ejecutiva 402', ingresos: 145000, ocupacion: 88 },
  { apartamento: 'Loft Moderno 305', ingresos: 132000, ocupacion: 85 },
  { apartamento: 'Apartamento Playa 201', ingresos: 118000, ocupacion: 80 },
  { apartamento: 'Studio Premium 104', ingresos: 95000, ocupacion: 75 },
  { apartamento: 'Suite Playa 102', ingresos: 88000, ocupacion: 72 }
];

const ocupacionPorCondominio = [
  { name: 'Torre Diamante', value: 85, color: '#0B3C5D' },
  { name: 'Punta Cana Luxury', value: 78, color: '#328CC1' },
  { name: 'Marina Bay', value: 72, color: '#B0B7C3' },
  { name: 'Disponible', value: 15, color: '#E8EBF0' }
];

const morosidadData = [
  { condominio: 'Torre Diamante', pendiente: 15000, cobrado: 125000 },
  { condominio: 'Punta Cana Luxury', pendiente: 22000, cobrado: 145000 },
  { condominio: 'Marina Bay', pendiente: 8000, cobrado: 98000 }
];

const flujoCajaData = [
  { mes: 'Ene', entradas: 145000, salidas: 45000, neto: 100000 },
  { mes: 'Feb', entradas: 178000, salidas: 52000, neto: 126000 },
  { mes: 'Mar', entradas: 195000, salidas: 48000, neto: 147000 },
  { mes: 'Abr', entradas: 210000, salidas: 55000, neto: 155000 },
  { mes: 'May', entradas: 198000, salidas: 50000, neto: 148000 },
  { mes: 'Jun', entradas: 225000, salidas: 58000, neto: 167000 }
];

export function ReportesModule({ isDarkMode }: ReportesModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('6m');

  // Calcular métricas
  const totalIngresos = ingresosPorMes.reduce((sum, item) => sum + item.ingresos, 0);
  const totalGastos = ingresosPorMes.reduce((sum, item) => sum + item.gastos, 0);
  const utilidadNeta = totalIngresos - totalGastos;
  const margenUtilidad = ((utilidadNeta / totalIngresos) * 100).toFixed(1);

  const ocupacionPromedio = 
    ingresosPorApartamento.reduce((sum, item) => sum + item.ocupacion, 0) / 
    ingresosPorApartamento.length;

  const totalContratosActivos = 18;
  const totalMorosidad = morosidadData.reduce((sum, item) => sum + item.pendiente, 0);
  const totalCobrado = morosidadData.reduce((sum, item) => sum + item.cobrado, 0);
  const tasaMorosidad = ((totalMorosidad / (totalMorosidad + totalCobrado)) * 100).toFixed(1);

  const flujoNetoPromedio = flujoCajaData.reduce((sum, item) => sum + item.neto, 0) / flujoCajaData.length;

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Reportes y Análisis
          </h1>
          <p className={dm.textSecondary}>Dashboard completo de métricas financieras y operativas</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
          >
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
          </select>
          <Button variant="primary">
            <Download size={16} className="mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              DOP ${totalIngresos.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Ingresos Totales (6 meses)</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 font-semibold">+{margenUtilidad}%</span>
              <span className="text-xs text-gray-500">Margen de utilidad</span>
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
                <Home className="text-blue-600" size={24} />
              </div>
              <Activity className="text-blue-600" size={20} />
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {ocupacionPromedio.toFixed(1)}%
            </h3>
            <p className="text-sm text-gray-600 mb-2">Ocupación Promedio</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600 font-semibold">+5.2%</span>
              <span className="text-xs text-gray-500">vs mes anterior</span>
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
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
              <Calendar className="text-purple-600" size={20} />
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {totalContratosActivos}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Contratos Activos</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-600 font-semibold">+3</span>
              <span className="text-xs text-gray-500">nuevos este mes</span>
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
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
              <TrendingDown className="text-orange-600" size={20} />
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {tasaMorosidad}%
            </h3>
            <p className="text-sm text-gray-600 mb-2">Tasa de Morosidad</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-600 font-semibold">DOP ${totalMorosidad.toLocaleString()}</span>
              <span className="text-xs text-gray-500">pendiente</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Análisis por Tipo de Renta: Diaria vs Mensual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl text-[#0B3C5D] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Ingresos por Tipo de Renta
              </h3>
              <p className="text-sm text-gray-600">Comparativa: Renta Diaria (Airbnb) vs Renta Mensual (Contratos)</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Calendar className="text-[#0B3C5D]" size={20} />
              <span className="text-sm font-semibold text-[#0B3C5D]">Últimos 6 meses</span>
            </div>
          </div>

          {/* KPIs de Comparativa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {comparativaRentas.map((tipo, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2" style={{ borderColor: tipo.color }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">{tipo.tipo}</h4>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tipo.color}20` }}>
                    <DollarSign style={{ color: tipo.color }} size={24} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
                    <p className="text-3xl font-bold" style={{ color: tipo.color }}>
                      DOP ${tipo.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{tipo.porcentaje}% del total</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total Reservas</p>
                      <p className="text-xl font-semibold text-gray-700">{tipo.reservas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Promedio/Reserva</p>
                      <p className="text-xl font-semibold text-gray-700">DOP ${tipo.promedioPorReserva.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ 
                        width: `${tipo.porcentaje}%`,
                        backgroundColor: tipo.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica de Tendencia Mensual */}
          <div className="mb-6">
            <h4 className="text-lg text-[#0B3C5D] mb-4 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              Tendencia Mensual por Tipo de Renta
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={ingresosPorTipoRenta}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF0" />
                <XAxis dataKey="mes" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E8EBF0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="rentaDiaria" fill="#0B3C5D" name="Renta Diaria (Airbnb)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="rentaMensual" fill="#328CC1" name="Renta Mensual (Contratos)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Listado de Apartamentos por Tipo */}
          <div>
            <h4 className="text-lg text-[#0B3C5D] mb-4 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              Apartamentos por Tipo de Renta
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apartamentosPorTipoRenta.map((apt, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.tipo === 'Diaria' 
                          ? 'bg-[#0B3C5D] text-white' 
                          : 'bg-[#328CC1] text-white'
                      }`}>
                        {apt.tipo === 'Diaria' ? '📅 Diaria' : '📄 Mensual'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{apt.apartamento}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Ingresos</p>
                      <p className="text-lg font-bold text-[#0B3C5D]">
                        DOP ${apt.ingresos.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Reservas</p>
                      <p className="text-lg font-bold text-gray-700">{apt.reservas}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Gráficas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Ingresos por Mes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Ingresos y Gastos Mensuales
                </h3>
                <p className="text-sm text-gray-600">Comparativo de flujo mensual</p>
              </div>
              <BarChart3 className="text-[#0B3C5D]" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ingresosPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF0" />
                <XAxis dataKey="mes" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E8EBF0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="ingresos" fill="#0B3C5D" name="Ingresos" radius={[8, 8, 0, 0]} />
                <Bar dataKey="gastos" fill="#B0B7C3" name="Gastos" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Ocupación por Condominio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Distribución de Ocupación
                </h3>
                <p className="text-sm text-gray-600">Por condominio</p>
              </div>
              <PieChart className="text-[#0B3C5D]" size={24} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-full md:w-1/2 flex justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <RechartsPieChart>
                    <Pie
                      data={ocupacionPorCondominio}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ocupacionPorCondominio.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                {ocupacionPorCondominio.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#0B3C5D]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Ingresos por Apartamento y Flujo de Caja */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Ingresos por Apartamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Top Apartamentos por Ingresos
                </h3>
                <p className="text-sm text-gray-600">Rendimiento individual (6 meses)</p>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="space-y-4">
              {ingresosPorApartamento.map((apt, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">{apt.apartamento}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{apt.ocupacion}% ocupación</span>
                      <span className="text-green-600 font-semibold">
                        DOP ${apt.ingresos.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#0B3C5D] to-[#328CC1] h-2 rounded-full transition-all"
                      style={{ width: `${apt.ocupacion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Flujo de Caja */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Flujo de Caja Neto
                </h3>
                <p className="text-sm text-gray-600">Tendencia mensual</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Promedio Mensual</p>
                <p className="text-lg font-semibold text-green-600">
                  DOP ${flujoNetoPromedio.toLocaleString()}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={flujoCajaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF0" />
                <XAxis dataKey="mes" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E8EBF0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="entradas" 
                  stroke="#0B3C5D" 
                  strokeWidth={3}
                  name="Entradas"
                  dot={{ fill: '#0B3C5D', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="salidas" 
                  stroke="#B0B7C3" 
                  strokeWidth={3}
                  name="Salidas"
                  dot={{ fill: '#B0B7C3', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="neto" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Neto"
                  dot={{ fill: '#10B981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Morosidad Mensual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Análisis de Morosidad por Condominio
              </h3>
              <p className="text-sm text-gray-600">Cobros pendientes vs cobrados</p>
            </div>
            <AlertTriangle className="text-orange-600" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {morosidadData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{item.condominio}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Pendiente</span>
                    <span className="text-sm font-semibold text-orange-600">
                      DOP ${item.pendiente.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Cobrado</span>
                    <span className="text-sm font-semibold text-green-600">
                      DOP ${item.cobrado.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(item.cobrado / (item.cobrado + item.pendiente)) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Tasa de cobro</span>
                    <span className="text-xs font-semibold text-[#0B3C5D]">
                      {((item.cobrado / (item.cobrado + item.pendiente)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={morosidadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EBF0" />
              <XAxis dataKey="condominio" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E8EBF0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="cobrado" fill="#10B981" name="Cobrado" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pendiente" fill="#F59E0B" name="Pendiente" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}