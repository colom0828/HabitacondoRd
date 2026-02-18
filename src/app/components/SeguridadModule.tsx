import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  User,
  Users,
  Lock,
  Unlock,
  Activity,
  Clock,
  FileEdit,
  DollarSign,
  CheckCircle,
  Home,
  Eye,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Calendar,
  UserPlus,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface SeguridadModuleProps {
  isDarkMode?: boolean;
}

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: 'Admin' | 'Manager' | 'Staff';
  estado: 'Activo' | 'Inactivo';
  ultimoAcceso: string;
}

interface ActividadLog {
  id: string;
  tipo: 'reserva_aprobada' | 'precio_modificado' | 'contrato_editado' | 'pago_registrado' | 'apartamento_creado' | 'usuario_creado';
  descripcion: string;
  usuario: {
    nombre: string;
    email: string;
    rol: string;
  };
  fecha: string;
  hora: string;
  detalles: {
    apartamento?: string;
    valorAnterior?: string;
    valorNuevo?: string;
    reservaId?: string;
    contratoId?: string;
  };
}

const USUARIOS_EJEMPLO: Usuario[] = [
  {
    id: 'USR-001',
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '809-123-4567',
    email: 'juan.perez@habitacondo.com',
    rol: 'Admin',
    estado: 'Activo',
    ultimoAcceso: '2026-02-18 14:30'
  },
  {
    id: 'USR-002',
    nombre: 'María',
    apellido: 'Rodríguez',
    telefono: '809-987-6543',
    email: 'maria.rodriguez@habitacondo.com',
    rol: 'Manager',
    estado: 'Activo',
    ultimoAcceso: '2026-02-18 13:15'
  },
  {
    id: 'USR-003',
    nombre: 'Carlos',
    apellido: 'López',
    telefono: '809-555-1234',
    email: 'carlos.lopez@habitacondo.com',
    rol: 'Staff',
    estado: 'Activo',
    ultimoAcceso: '2026-02-18 09:45'
  },
  {
    id: 'USR-004',
    nombre: 'Ana',
    apellido: 'Martínez',
    telefono: '809-444-5678',
    email: 'ana.martinez@habitacondo.com',
    rol: 'Staff',
    estado: 'Inactivo',
    ultimoAcceso: '2026-02-15 16:20'
  }
];

const ACTIVIDADES_LOG: ActividadLog[] = [
  {
    id: 'LOG-001',
    tipo: 'reserva_aprobada',
    descripcion: 'Reserva aprobada para Penthouse Vista Mar',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-18',
    hora: '14:25',
    detalles: {
      apartamento: 'Penthouse Vista Mar',
      reservaId: 'RES-089'
    }
  },
  {
    id: 'LOG-002',
    tipo: 'precio_modificado',
    descripcion: 'Precio de renta diaria modificado',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-18',
    hora: '13:50',
    detalles: {
      apartamento: 'Suite Ejecutiva 402',
      valorAnterior: 'DOP $3,500/día',
      valorNuevo: 'DOP $4,000/día'
    }
  },
  {
    id: 'LOG-003',
    tipo: 'contrato_editado',
    descripcion: 'Contrato mensual editado - extensión de fecha',
    usuario: {
      nombre: 'María Rodríguez',
      email: 'maria.rodriguez@habitacondo.com',
      rol: 'Manager'
    },
    fecha: '2026-02-18',
    hora: '12:30',
    detalles: {
      apartamento: 'Loft Moderno 305',
      contratoId: 'CTR-045',
      valorAnterior: 'Fin: 2026-03-31',
      valorNuevo: 'Fin: 2026-04-30'
    }
  },
  {
    id: 'LOG-004',
    tipo: 'pago_registrado',
    descripcion: 'Pago en efectivo registrado',
    usuario: {
      nombre: 'Carlos López',
      email: 'carlos.lopez@habitacondo.com',
      rol: 'Staff'
    },
    fecha: '2026-02-18',
    hora: '11:15',
    detalles: {
      apartamento: 'Apartamento Playa 201',
      reservaId: 'RES-087',
      valorNuevo: 'DOP $9,000'
    }
  },
  {
    id: 'LOG-005',
    tipo: 'precio_modificado',
    descripcion: 'Precio de renta mensual actualizado',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-18',
    hora: '10:45',
    detalles: {
      apartamento: 'Penthouse Vista Mar',
      valorAnterior: 'DOP $28,000/mes',
      valorNuevo: 'DOP $30,000/mes'
    }
  },
  {
    id: 'LOG-006',
    tipo: 'apartamento_creado',
    descripcion: 'Nuevo apartamento agregado al sistema',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-17',
    hora: '16:20',
    detalles: {
      apartamento: 'Suite Premium 501',
      valorNuevo: 'Renta Diaria'
    }
  },
  {
    id: 'LOG-007',
    tipo: 'reserva_aprobada',
    descripcion: 'Reserva aprobada para Suite Playa 102',
    usuario: {
      nombre: 'María Rodríguez',
      email: 'maria.rodriguez@habitacondo.com',
      rol: 'Manager'
    },
    fecha: '2026-02-17',
    hora: '15:10',
    detalles: {
      apartamento: 'Suite Playa 102',
      reservaId: 'RES-086'
    }
  },
  {
    id: 'LOG-008',
    tipo: 'contrato_editado',
    descripcion: 'Contrato mensual editado - cambio de monto',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-17',
    hora: '14:30',
    detalles: {
      apartamento: 'Studio Premium 104',
      contratoId: 'CTR-044',
      valorAnterior: 'DOP $18,000/mes',
      valorNuevo: 'DOP $19,500/mes'
    }
  },
  {
    id: 'LOG-009',
    tipo: 'usuario_creado',
    descripcion: 'Nuevo usuario Staff agregado al sistema',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-17',
    hora: '09:15',
    detalles: {
      valorNuevo: 'Ana Martínez - Staff'
    }
  },
  {
    id: 'LOG-010',
    tipo: 'precio_modificado',
    descripcion: 'Precio de renta diaria actualizado',
    usuario: {
      nombre: 'Juan Pérez',
      email: 'juan.perez@habitacondo.com',
      rol: 'Admin'
    },
    fecha: '2026-02-16',
    hora: '17:45',
    detalles: {
      apartamento: 'Loft Moderno 305',
      valorAnterior: 'DOP $4,200/día',
      valorNuevo: 'DOP $4,500/día'
    }
  },
  {
    id: 'LOG-011',
    tipo: 'reserva_aprobada',
    descripcion: 'Reserva aprobada para Apartamento Coral 203',
    usuario: {
      nombre: 'María Rodríguez',
      email: 'maria.rodriguez@habitacondo.com',
      rol: 'Manager'
    },
    fecha: '2026-02-16',
    hora: '14:20',
    detalles: {
      apartamento: 'Apartamento Coral 203',
      reservaId: 'RES-085'
    }
  },
  {
    id: 'LOG-012',
    tipo: 'pago_registrado',
    descripcion: 'Pago por transferencia registrado',
    usuario: {
      nombre: 'Carlos López',
      email: 'carlos.lopez@habitacondo.com',
      rol: 'Staff'
    },
    fecha: '2026-02-16',
    hora: '11:30',
    detalles: {
      apartamento: 'Penthouse Vista Mar',
      reservaId: 'RES-084',
      valorNuevo: 'DOP $24,000'
    }
  }
];

const PERMISOS_POR_ROL = {
  Admin: {
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    permisos: [
      'Acceso completo al sistema',
      'Aprobar y rechazar reservas',
      'Modificar precios',
      'Editar contratos',
      'Crear y editar apartamentos',
      'Gestionar usuarios',
      'Ver logs de actividad',
      'Acceso a reportes financieros',
      'Configuración del sistema'
    ]
  },
  Manager: {
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    permisos: [
      'Aprobar reservas',
      'Editar contratos',
      'Registrar pagos',
      'Ver apartamentos',
      'Gestionar limpieza',
      'Ver reportes básicos',
      'Gestionar reseñas'
    ]
  },
  Staff: {
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    permisos: [
      'Ver reservas',
      'Registrar pagos',
      'Programar limpiezas',
      'Ver calendario',
      'Solo lectura de apartamentos'
    ]
  }
};

const getIconoActividad = (tipo: ActividadLog['tipo']) => {
  switch (tipo) {
    case 'reserva_aprobada':
      return <CheckCircle className="text-green-600" size={20} />;
    case 'precio_modificado':
      return <DollarSign className="text-blue-600" size={20} />;
    case 'contrato_editado':
      return <FileEdit className="text-purple-600" size={20} />;
    case 'pago_registrado':
      return <DollarSign className="text-green-600" size={20} />;
    case 'apartamento_creado':
      return <Home className="text-orange-600" size={20} />;
    case 'usuario_creado':
      return <Users className="text-blue-600" size={20} />;
    default:
      return <Activity className="text-gray-600" size={20} />;
  }
};

const getColorActividad = (tipo: ActividadLog['tipo']) => {
  switch (tipo) {
    case 'reserva_aprobada':
      return 'bg-green-50 border-green-200';
    case 'precio_modificado':
      return 'bg-blue-50 border-blue-200';
    case 'contrato_editado':
      return 'bg-purple-50 border-purple-200';
    case 'pago_registrado':
      return 'bg-emerald-50 border-emerald-200';
    case 'apartamento_creado':
      return 'bg-orange-50 border-orange-200';
    case 'usuario_creado':
      return 'bg-indigo-50 border-indigo-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export function SeguridadModule({ isDarkMode }: SeguridadModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [usuarios, setUsuarios] = React.useState<Usuario[]>(USUARIOS_EJEMPLO);
  const [actividades, setActividades] = React.useState<ActividadLog[]>(ACTIVIDADES_LOG);
  const [filtroTipo, setFiltroTipo] = React.useState<string>('Todas');
  const [filtroUsuario, setFiltroUsuario] = React.useState<string>('Todos');
  const [busqueda, setBusqueda] = React.useState('');
  const [mostrarPermisos, setMostrarPermisos] = React.useState(false);
  const [mostrarModalNuevoUsuario, setMostrarModalNuevoUsuario] = React.useState(false);
  const [nuevoUsuario, setNuevoUsuario] = React.useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    rol: 'Staff' as 'Admin' | 'Manager' | 'Staff'
  });

  const crearUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellido || !nuevoUsuario.telefono || !nuevoUsuario.email) {
      alert('Por favor complete todos los campos');
      return;
    }

    const usuario: Usuario = {
      id: `USR-${String(usuarios.length + 1).padStart(3, '0')}`,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      telefono: nuevoUsuario.telefono,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      estado: 'Activo',
      ultimoAcceso: new Date().toLocaleString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(',', '')
    };

    setUsuarios([...usuarios, usuario]);

    // Agregar log de actividad
    const nuevaActividad: ActividadLog = {
      id: `LOG-${String(actividades.length + 1).padStart(3, '0')}`,
      tipo: 'usuario_creado',
      descripcion: `Nuevo usuario ${nuevoUsuario.rol} agregado al sistema`,
      usuario: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@habitacondo.com',
        rol: 'Admin'
      },
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      detalles: {
        valorNuevo: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido} - ${nuevoUsuario.rol}`
      }
    };

    setActividades([nuevaActividad, ...actividades]);

    // Resetear formulario
    setNuevoUsuario({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rol: 'Staff'
    });

    setMostrarModalNuevoUsuario(false);
  };

  // Filtrar actividades
  const actividadesFiltradas = actividades.filter(act => {
    const matchTipo = filtroTipo === 'Todas' || 
      (filtroTipo === 'Reservas' && act.tipo === 'reserva_aprobada') ||
      (filtroTipo === 'Precios' && act.tipo === 'precio_modificado') ||
      (filtroTipo === 'Contratos' && act.tipo === 'contrato_editado') ||
      (filtroTipo === 'Pagos' && act.tipo === 'pago_registrado');
    
    const matchUsuario = filtroUsuario === 'Todos' || act.usuario.nombre === filtroUsuario;
    
    const matchBusqueda = busqueda === '' || 
      act.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      act.usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (act.detalles.apartamento && act.detalles.apartamento.toLowerCase().includes(busqueda.toLowerCase()));
    
    return matchTipo && matchUsuario && matchBusqueda;
  });

  const usuariosUnicos = Array.from(new Set(actividades.map(a => a.usuario.nombre)));

  // Estadísticas
  const totalActividades = actividades.length;
  const actividadesHoy = actividades.filter(a => a.fecha === '2026-02-18').length;
  const usuariosActivos = usuarios.filter(u => u.estado === 'Activo').length;
  const totalAdmins = usuarios.filter(u => u.rol === 'Admin').length;

  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className={dm.textHeading} size={32} />
          <h1 className={`text-3xl ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Seguridad y Actividad
          </h1>
        </div>
        <p className={dm.textSecondary}>Control de acceso, roles y registro de actividad del sistema</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {totalActividades}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Total de Actividades</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600 font-semibold">{actividadesHoy} hoy</span>
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
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {usuariosActivos}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Usuarios Activos</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{usuarios.length} total</span>
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
                <Shield className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {totalAdmins}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Administradores</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-600 font-semibold">Acceso completo</span>
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
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {actividadesHoy}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Actividades Hoy</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-600 font-semibold">Última hora: 14:25</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Usuarios y Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Usuarios del Sistema
              </h3>
              <p className="text-sm text-gray-600">Gestión de roles y permisos</p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" onClick={() => setMostrarModalNuevoUsuario(true)}>
                <UserPlus size={16} className="mr-2" />
                Nuevo Usuario
              </Button>
              <Button variant="outline" onClick={() => setMostrarPermisos(!mostrarPermisos)}>
                <Eye size={16} className="mr-2" />
                {mostrarPermisos ? 'Ocultar' : 'Ver'} Permisos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usuarios.map((usuario, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#328CC1] flex items-center justify-center text-white font-semibold">
                      {usuario.nombre.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{usuario.nombre}</h4>
                      <p className="text-xs text-gray-500">{usuario.email}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    usuario.estado === 'Activo' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {usuario.estado === 'Activo' ? '✓ Activo' : '⏸️ Inactivo'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                    PERMISOS_POR_ROL[usuario.rol].color
                  }`}>
                    {usuario.rol === 'Admin' && '👑 '}
                    {usuario.rol === 'Manager' && '⚙️ '}
                    {usuario.rol === 'Staff' && '👤 '}
                    {usuario.rol}
                  </div>
                  <div className="text-xs text-gray-500">
                    <Clock size={12} className="inline mr-1" />
                    {usuario.ultimoAcceso}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de Permisos */}
          {mostrarPermisos && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <h4 className="text-lg text-[#0B3C5D] mb-4 font-semibold">
                Matriz de Permisos por Rol
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(PERMISOS_POR_ROL).map(([rol, info]) => (
                  <div key={rol} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-3 ${info.color}`}>
                      {rol === 'Admin' && '👑 '}
                      {rol === 'Manager' && '⚙️ '}
                      {rol === 'Staff' && '👤 '}
                      {rol}
                    </div>
                    <ul className="space-y-2">
                      {info.permisos.map((permiso, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{permiso}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Filtros para Log de Actividad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar actividades..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent appearance-none"
              >
                <option>Todas</option>
                <option>Reservas</option>
                <option>Precios</option>
                <option>Contratos</option>
                <option>Pagos</option>
              </select>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent appearance-none"
              >
                <option>Todos</option>
                {usuariosUnicos.map((nombre, index) => (
                  <option key={index}>{nombre}</option>
                ))}
              </select>
            </div>

            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Exportar Log
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Log de Actividad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Registro de Actividad del Sistema
              </h3>
              <p className="text-sm text-gray-600">
                {actividadesFiltradas.length} {actividadesFiltradas.length === 1 ? 'actividad' : 'actividades'} encontradas
              </p>
            </div>
            <Activity className="text-[#0B3C5D]" size={24} />
          </div>

          <div className="space-y-3">
            {actividadesFiltradas.map((actividad, index) => (
              <motion.div
                key={actividad.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className={`p-4 rounded-lg border ${getColorActividad(actividad.tipo)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    {getIconoActividad(actividad.tipo)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">
                          {actividad.descripcion}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span className="font-medium">{actividad.usuario.nombre}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              actividad.usuario.rol === 'Admin' 
                                ? 'bg-purple-100 text-purple-700'
                                : actividad.usuario.rol === 'Manager'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {actividad.usuario.rol}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>
                              {new Date(actividad.fecha).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{actividad.hora}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detalles de la actividad */}
                    <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {actividad.detalles.apartamento && (
                          <div className="flex items-center gap-2">
                            <Home size={14} className="text-gray-400" />
                            <span className="text-gray-600">Apartamento:</span>
                            <span className="font-semibold text-gray-800">
                              {actividad.detalles.apartamento}
                            </span>
                          </div>
                        )}
                        {actividad.detalles.reservaId && (
                          <div className="flex items-center gap-2">
                            <FileEdit size={14} className="text-gray-400" />
                            <span className="text-gray-600">Reserva:</span>
                            <span className="font-semibold text-gray-800">
                              {actividad.detalles.reservaId}
                            </span>
                          </div>
                        )}
                        {actividad.detalles.contratoId && (
                          <div className="flex items-center gap-2">
                            <FileEdit size={14} className="text-gray-400" />
                            <span className="text-gray-600">Contrato:</span>
                            <span className="font-semibold text-gray-800">
                              {actividad.detalles.contratoId}
                            </span>
                          </div>
                        )}
                        {actividad.detalles.valorAnterior && (
                          <div className="flex items-center gap-2">
                            <AlertTriangle size={14} className="text-orange-400" />
                            <span className="text-gray-600">Anterior:</span>
                            <span className="font-mono text-xs text-orange-700">
                              {actividad.detalles.valorAnterior}
                            </span>
                          </div>
                        )}
                        {actividad.detalles.valorNuevo && (
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-400" />
                            <span className="text-gray-600">Nuevo:</span>
                            <span className="font-mono text-xs text-green-700">
                              {actividad.detalles.valorNuevo}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {actividadesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <Activity className="mx-auto mb-4 text-gray-300" size={48} />
              <h3 className="text-xl text-gray-600 mb-2">No se encontraron actividades</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Modal para Nuevo Usuario */}
      <AnimatePresence>
        {mostrarModalNuevoUsuario && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setMostrarModalNuevoUsuario(false)}
              className="w-full max-w-2xl"
            >
              <Card className="p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl text-[#0B3C5D]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Crear Nuevo Usuario
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Complete los datos del nuevo usuario</p>
                  </div>
                  <button
                    onClick={() => setMostrarModalNuevoUsuario(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={nuevoUsuario.nombre}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                        placeholder="Ej: Juan"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={nuevoUsuario.apellido}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
                        placeholder="Ej: Pérez"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={nuevoUsuario.telefono}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
                        placeholder="Ej: 809-123-4567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        value={nuevoUsuario.email}
                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                        placeholder="Ej: juan.perez@habitacondo.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Shield size={16} className="inline mr-1" />
                      Rol del Usuario *
                    </label>
                    <select
                      value={nuevoUsuario.rol}
                      onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value as 'Admin' | 'Manager' | 'Staff' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0B3C5D] focus:border-transparent appearance-none"
                    >
                      <option value="Staff">👤 Staff - Acceso limitado</option>
                      <option value="Manager">⚙️ Manager - Acceso intermedio</option>
                      <option value="Admin">👑 Admin - Acceso completo</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      {nuevoUsuario.rol === 'Admin' && '✓ Acceso completo al sistema'}
                      {nuevoUsuario.rol === 'Manager' && '✓ Gestión de reservas, contratos y pagos'}
                      {nuevoUsuario.rol === 'Staff' && '✓ Solo lectura y funciones básicas'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                  <Button variant="outline" onClick={() => setMostrarModalNuevoUsuario(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={crearUsuario} className="flex-1">
                    <UserPlus size={16} className="mr-2" />
                    Crear Usuario
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}