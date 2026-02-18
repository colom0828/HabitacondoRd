import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  FileText, 
  DollarSign, 
  BarChart3,
  Settings,
  Home,
  Sparkles,
  ClipboardList,
  Star,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import logoSinFondo from "figma:asset/53cba963ea396b5515da13160fbe00e16138950a.png";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isDarkMode?: boolean;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'apartments', icon: Home, label: 'Apartamentos' },
  { id: 'reservas', icon: Calendar, label: 'Reservas' },
  { id: 'calendario', icon: Calendar, label: 'Calendario' },
  { id: 'contratos', icon: FileText, label: 'Contratos' },
  { id: 'condominios', icon: Building2, label: 'Condominios' },
  { id: 'limpieza', icon: Sparkles, label: 'Limpieza' },
  { id: 'pagos', icon: DollarSign, label: 'Pagos' },
  { id: 'reportes', icon: BarChart3, label: 'Reportes' },
  { id: 'reseñas', icon: Star, label: 'Reseñas' },
  { id: 'seguridad', icon: Shield, label: 'Seguridad' },
  { id: 'configuracion', icon: Settings, label: 'Configuración' },
];

export function Sidebar({ activeSection, onNavigate, isDarkMode }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#0B3C5D] text-white shadow-xl z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex flex-col items-center flex-shrink-0">
        <img src={logoSinFondo} alt="Habita-condo RD" className="h-16 w-auto mb-2" />
        <p className="text-sm text-[#B0B7C3] text-center">Panel Administrativo</p>
      </div>
      
      {/* Menu Items */}
      <nav className="p-4 space-y-2 overflow-y-auto flex-1 pb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-[#B0B7C3] hover:bg-white/5 hover:text-white'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}