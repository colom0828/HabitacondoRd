import React from 'react';
import { Home, DollarSign, Users, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'motion/react';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface DashboardProps {
  isDarkMode?: boolean;
}

const statsData = [
  {
    title: 'Ingresos del Mes',
    value: 'DOP $485,250',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Reservas Activas',
    value: '24',
    change: '+8',
    isPositive: true,
    icon: Calendar,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Ocupación',
    value: '78%',
    change: '+5.2%',
    isPositive: true,
    icon: Home,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Pagos Pendientes',
    value: 'DOP $125,000',
    change: '-3',
    isPositive: false,
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-600'
  }
];

const monthlyData = [
  { month: 'Ene', ingresos: 380000, ocupacion: 65 },
  { month: 'Feb', ingresos: 485250, ocupacion: 78 },
  { month: 'Mar', ingresos: 420000, ocupacion: 72 },
  { month: 'Abr', ingresos: 510000, ocupacion: 82 },
  { month: 'May', ingresos: 465000, ocupacion: 75 },
  { month: 'Jun', ingresos: 520000, ocupacion: 85 }
];

const recentReservations = [
  { id: 1, guest: 'María González', apartment: 'Penthouse Vista al Mar', checkIn: '2026-02-20', status: 'Confirmada' },
  { id: 2, guest: 'Carlos Ramírez', apartment: 'Suite Ejecutiva Centro', checkIn: '2026-02-22', status: 'Pendiente' },
  { id: 3, guest: 'Ana Martínez', apartment: 'Loft de Lujo', checkIn: '2026-02-25', status: 'Confirmada' },
  { id: 4, guest: 'Roberto Díaz', apartment: 'Apartamento Moderno', checkIn: '2026-02-28', status: 'Confirmada' }
];

export function Dashboard({ isDarkMode }: DashboardProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  
  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      <div className="mb-8">
        <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
          Dashboard
        </h1>
        <p className={dm.textSecondary}>Resumen general de tu negocio</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl text-[#0B3C5D]">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl text-[#0B3C5D] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ingresos Mensuales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#0B3C5D" 
                strokeWidth={3}
                dot={{ fill: '#0B3C5D', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl text-[#0B3C5D] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ocupación (%)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="ocupacion" 
                fill="#B0B7C3" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Recent Reservations */}
      <Card className="p-6">
        <h2 className="text-xl text-[#0B3C5D] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Reservas Recientes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Huésped</th>
                <th className="text-left py-3 px-4 text-gray-600">Apartamento</th>
                <th className="text-left py-3 px-4 text-gray-600">Check-in</th>
                <th className="text-left py-3 px-4 text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((reservation) => (
                <motion.tr
                  key={reservation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-[#F5F6F8] transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center">
                        {reservation.guest.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[#0B3C5D]">{reservation.guest}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{reservation.apartment}</td>
                  <td className="py-4 px-4 text-gray-700">{reservation.checkIn}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      reservation.status === 'Confirmada' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}