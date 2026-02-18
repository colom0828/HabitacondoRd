import React from 'react';
import { Home, Search, Filter, Plus, MapPin, Bed, Bath, Maximize, DollarSign, Edit, Trash2, Upload, X, Star, AlertTriangle, Waves, Car, Eye, PawPrint } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { motion, AnimatePresence } from 'motion/react';
import { getDarkModeClasses } from '../utils/darkModeClasses';

interface ApartamentosModuleProps {
  isDarkMode?: boolean;
}

interface Apartment {
  id: number;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: string;
  imageUrl: string;
  condominio: string;
  floor: string;
  rentalType: 'daily' | 'monthly';
  hasPool?: boolean;
  hasParking?: boolean;
  hasOceanView?: boolean;
  petFriendly?: boolean;
}

const initialApartamentos: Apartment[] = [
  {
    id: 1,
    name: 'Penthouse Vista al Mar',
    location: 'Malecón',
    price: 8500,
    bedrooms: 3,
    bathrooms: 3,
    area: 250,
    status: 'Disponible',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop',
    condominio: 'Vista Mar Complex',
    floor: 'PH-01',
    rentalType: 'monthly',
    hasPool: true,
    hasParking: true,
    hasOceanView: true,
    petFriendly: false
  },
  {
    id: 2,
    name: 'Suite Ejecutiva Centro',
    location: 'Piantini',
    price: 6500,
    bedrooms: 2,
    bathrooms: 2,
    area: 180,
    status: 'Ocupado',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    condominio: 'Torre Premium',
    floor: 'A-1201',
    rentalType: 'monthly',
    hasPool: true,
    hasParking: true,
    hasOceanView: false,
    petFriendly: true
  },
  {
    id: 3,
    name: 'Loft de Lujo',
    location: 'Naco',
    price: 5200,
    bedrooms: 1,
    bathrooms: 1,
    area: 120,
    status: 'Disponible',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
    condominio: 'Residencial Elegance',
    floor: 'B-501',
    rentalType: 'monthly',
    hasPool: false,
    hasParking: true,
    hasOceanView: false,
    petFriendly: false
  },
  {
    id: 4,
    name: 'Apartamento Moderno',
    location: 'Bella Vista',
    price: 4800,
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    status: 'Mantenimiento',
    imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop',
    condominio: 'Torre Premium',
    floor: 'C-805',
    rentalType: 'monthly',
    hasPool: true,
    hasParking: false,
    hasOceanView: false,
    petFriendly: true
  },
  {
    id: 5,
    name: 'Duplex Premium',
    location: 'Gazcue',
    price: 150,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 210,
    status: 'Disponible',
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop',
    condominio: 'Vista Mar Complex',
    floor: 'D-1501/1502',
    rentalType: 'daily',
    hasPool: true,
    hasParking: true,
    hasOceanView: true,
    petFriendly: true
  },
  {
    id: 6,
    name: 'Estudio Ejecutivo',
    location: 'Serralles',
    price: 85,
    bedrooms: 1,
    bathrooms: 1,
    area: 85,
    status: 'Ocupado',
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop',
    condominio: 'Residencial Elegance',
    floor: 'E-302',
    rentalType: 'daily',
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false
  }
];

const condominios = [
  'Torre Premium',
  'Residencial Elegance',
  'Vista Mar Complex',
  'Plaza Central',
  'Edificio Corporativo'
];

interface ImageFile {
  id: string;
  file?: File;
  preview: string;
  isExisting?: boolean;
}

export function ApartamentosModule({ isDarkMode }: ApartamentosModuleProps) {
  const dm = getDarkModeClasses(isDarkMode || false);
  const [apartamentos, setApartamentos] = React.useState<Apartment[]>(initialApartamentos);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('Todos');
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);
  const [apartmentToDelete, setApartmentToDelete] = React.useState<Apartment | null>(null);
  const [editingApartment, setEditingApartment] = React.useState<Apartment | null>(null);
  const [images, setImages] = React.useState<ImageFile[]>([]);
  const [mainImageId, setMainImageId] = React.useState<string | null>(null);
  
  const [additionalFilters, setAdditionalFilters] = React.useState({
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false
  });
  
  const [tempFilters, setTempFilters] = React.useState({
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false
  });
  
  const [formData, setFormData] = React.useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'Disponible',
    condominio: '',
    floor: '',
    rentalType: 'monthly' as 'daily' | 'monthly',
    hasPool: false,
    hasParking: false,
    hasOceanView: false,
    petFriendly: false
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-700';
      case 'Ocupado':
        return 'bg-blue-100 text-blue-700';
      case 'Mantenimiento':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const filteredApartments = apartamentos.filter(apt => {
    const matchesSearch = 
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.condominio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.floor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'Todos' || apt.status === filterStatus;
    
    // Filtros adicionales
    const matchesPool = !additionalFilters.hasPool || apt.hasPool === true;
    const matchesParking = !additionalFilters.hasParking || apt.hasParking === true;
    const matchesOceanView = !additionalFilters.hasOceanView || apt.hasOceanView === true;
    const matchesPetFriendly = !additionalFilters.petFriendly || apt.petFriendly === true;
    
    return matchesSearch && matchesStatus && matchesPool && matchesParking && matchesOceanView && matchesPetFriendly;
  });
  
  const stats = {
    total: apartamentos.length,
    disponibles: apartamentos.filter(a => a.status === 'Disponible').length,
    ocupados: apartamentos.filter(a => a.status === 'Ocupado').length,
    mantenimiento: apartamentos.filter(a => a.status === 'Mantenimiento').length
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: ImageFile[] = [];
      
      Array.from(files).forEach((file) => {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        
        newImages.push({ id, file, preview });
      });
      
      setImages(prev => [...prev, ...newImages]);
      
      // Si es la primera imagen, establecerla como principal
      if (images.length === 0 && newImages.length > 0) {
        setMainImageId(newImages[0].id);
      }
    }
  };
  
  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (mainImageId === id) {
      const remaining = images.filter(img => img.id !== id);
      setMainImageId(remaining.length > 0 ? remaining[0].id : null);
    }
  };
  
  const handleSetMainImage = (id: string) => {
    setMainImageId(id);
  };
  
  const handleOpenCreateModal = () => {
    setEditingApartment(null);
    setFormData({
      name: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'Disponible',
      condominio: '',
      floor: '',
      rentalType: 'monthly',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    });
    setImages([]);
    setMainImageId(null);
    setShowModal(true);
  };
  
  const handleOpenEditModal = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setFormData({
      name: apartment.name,
      location: apartment.location,
      price: apartment.price.toString(),
      bedrooms: apartment.bedrooms.toString(),
      bathrooms: apartment.bathrooms.toString(),
      area: apartment.area.toString(),
      status: apartment.status,
      condominio: apartment.condominio,
      floor: apartment.floor,
      rentalType: apartment.rentalType,
      hasPool: apartment.hasPool || false,
      hasParking: apartment.hasParking || false,
      hasOceanView: apartment.hasOceanView || false,
      petFriendly: apartment.petFriendly || false
    });
    
    // Cargar la imagen existente
    const existingImageId = `existing-${apartment.id}`;
    setImages([{
      id: existingImageId,
      preview: apartment.imageUrl,
      isExisting: true
    }]);
    setMainImageId(existingImageId);
    setShowModal(true);
  };
  
  const handleOpenDeleteModal = (apartment: Apartment) => {
    setApartmentToDelete(apartment);
    setShowDeleteModal(true);
  };
  
  const handleOpenFiltersModal = () => {
    setTempFilters({ ...additionalFilters });
    setShowFiltersModal(true);
  };
  
  const handleApplyFilters = () => {
    setAdditionalFilters({ ...tempFilters });
    setShowFiltersModal(false);
  };
  
  const handleClearFilters = () => {
    const emptyFilters = {
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    };
    setAdditionalFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setShowFiltersModal(false);
  };
  
  const handleDeleteApartment = () => {
    if (apartmentToDelete) {
      setApartamentos(prev => prev.filter(apt => apt.id !== apartmentToDelete.id));
      console.log('✅ Apartamento eliminado exitosamente ID:', apartmentToDelete.id);
    }
    setShowDeleteModal(false);
    setApartmentToDelete(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Obtener la imagen principal
    const mainImage = images.find(img => img.id === mainImageId);
    const imageUrl = mainImage ? mainImage.preview : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop';
    
    if (editingApartment) {
      // Actualizar apartamento existente
      setApartamentos(prev => prev.map(apt => {
        if (apt.id === editingApartment.id) {
          return {
            ...apt,
            name: formData.name,
            location: formData.location,
            price: parseFloat(formData.price),
            bedrooms: parseFloat(formData.bedrooms),
            bathrooms: parseFloat(formData.bathrooms),
            area: parseFloat(formData.area),
            status: formData.status,
            condominio: formData.condominio,
            floor: formData.floor,
            rentalType: formData.rentalType,
            imageUrl: imageUrl,
            hasPool: formData.hasPool,
            hasParking: formData.hasParking,
            hasOceanView: formData.hasOceanView,
            petFriendly: formData.petFriendly
          };
        }
        return apt;
      }));
      
      console.log('✅ Apartamento actualizado exitosamente ID:', editingApartment.id);
    } else {
      // Crear nuevo apartamento
      const newApartment: Apartment = {
        id: Math.max(...apartamentos.map(a => a.id), 0) + 1,
        name: formData.name,
        location: formData.location,
        price: parseFloat(formData.price),
        bedrooms: parseFloat(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        area: parseFloat(formData.area),
        status: formData.status,
        condominio: formData.condominio,
        floor: formData.floor,
        rentalType: formData.rentalType,
        imageUrl: imageUrl,
        hasPool: formData.hasPool,
        hasParking: formData.hasParking,
        hasOceanView: formData.hasOceanView,
        petFriendly: formData.petFriendly
      };
      
      setApartamentos(prev => [...prev, newApartment]);
      console.log('✅ Nuevo apartamento creado exitosamente:', newApartment);
    }
    
    // Resetear formulario
    setFormData({
      name: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'Disponible',
      condominio: '',
      floor: '',
      rentalType: 'monthly',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    });
    setImages([]);
    setMainImageId(null);
    setEditingApartment(null);
    setShowModal(false);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'Disponible',
      condominio: '',
      floor: '',
      rentalType: 'monthly',
      hasPool: false,
      hasParking: false,
      hasOceanView: false,
      petFriendly: false
    });
    setImages([]);
    setMainImageId(null);
    setEditingApartment(null);
  };
  
  return (
    <div className={`p-8 pt-24 min-h-screen ${dm.bg}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl mb-2 ${dm.textHeading}`} style={{ fontFamily: 'var(--font-heading)' }}>
            Gestión de Apartamentos
          </h1>
          <p className={dm.textSecondary}>Administra el inventario completo de apartamentos</p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Plus className="mr-2" size={20} />
          Nuevo Apartamento
        </Button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Apartamentos</span>
              <div className="w-10 h-10 rounded-lg bg-[#0B3C5D] text-white flex items-center justify-center">
                <Home size={20} />
              </div>
            </div>
            <p className="text-3xl text-[#0B3C5D]">{stats.total}</p>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Disponibles</span>
              <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center">
                <Home size={20} />
              </div>
            </div>
            <p className="text-3xl text-green-600">{stats.disponibles}</p>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Ocupados</span>
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Home size={20} />
              </div>
            </div>
            <p className="text-3xl text-blue-600">{stats.ocupados}</p>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Mantenimiento</span>
              <div className="w-10 h-10 rounded-lg bg-yellow-600 text-white flex items-center justify-center">
                <Home size={20} />
              </div>
            </div>
            <p className="text-3xl text-yellow-600">{stats.mantenimiento}</p>
          </Card>
        </motion.div>
      </div>
      
      {/* Search and Filter */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre, ubicación, condominio o número..."
              icon={<Search size={20} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
          <Button variant="outline" onClick={handleOpenFiltersModal}>
            <Filter size={20} className="mr-2" />
            Más Filtros
          </Button>
        </div>
      </Card>
      
      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApartments.map((apt, index) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover className="overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={apt.imageUrl} 
                  alt={apt.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl text-[#0B3C5D] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {apt.name}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={16} />
                  <span className="text-sm">{apt.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Home size={16} />
                  <span className="text-sm">{apt.condominio} - {apt.floor}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bed size={16} />
                    <span className="text-sm">{apt.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bath size={16} />
                    <span className="text-sm">{apt.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Maximize size={16} />
                    <span className="text-sm">{apt.area}m²</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#0B3C5D]">
                    <DollarSign size={20} />
                    <span className="text-2xl">${apt.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">/mes</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenEditModal(apt)}
                  >
                    <Edit size={16} className="mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleOpenDeleteModal(apt)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredApartments.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl text-gray-600 mb-2">No se encontraron apartamentos</h3>
          <p className="text-gray-500">Intenta con otros criterios de búsqueda</p>
        </Card>
      )}
      
      {/* Modal for creating/editing apartment */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-4xl my-8"
            >
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {editingApartment ? 'Editar Apartamento' : 'Nuevo Apartamento'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {editingApartment 
                        ? 'Modifica los campos que desees actualizar' 
                        : 'Completa todos los campos para registrar el apartamento'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
                
                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Información Básica */}
                  <div className="mb-8">
                    <h3 className="text-lg text-[#0B3C5D] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      <Home size={20} />
                      Información Básica
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700 mb-2">
                          Nombre del Apartamento <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="Ej: Penthouse Vista al Mar"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Ubicación <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="Ej: Piantini, Santo Domingo"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Tipo de Renta <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="rentalType"
                              value="monthly"
                              checked={formData.rentalType === 'monthly'}
                              onChange={(e) => setFormData({ ...formData, rentalType: e.target.value as 'monthly' | 'daily' })}
                              className="w-4 h-4 text-[#0B3C5D] focus:ring-[#0B3C5D]"
                            />
                            <span className="text-gray-700">Mensual</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="rentalType"
                              value="daily"
                              checked={formData.rentalType === 'daily'}
                              onChange={(e) => setFormData({ ...formData, rentalType: e.target.value as 'monthly' | 'daily' })}
                              className="w-4 h-4 text-[#0B3C5D] focus:ring-[#0B3C5D]"
                            />
                            <span className="text-gray-700">Diaria (Airbnb)</span>
                          </label>
                        </div>
                        <label className="block text-sm text-gray-700 mb-2">
                          {formData.rentalType === 'monthly' ? 'Precio Mensual (DOP)' : 'Precio por Noche (DOP)'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder={formData.rentalType === 'monthly' ? '8500' : '150'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Condominio <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formData.condominio}
                          onChange={(e) => setFormData({ ...formData, condominio: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                        >
                          <option value="">Seleccionar condominio</option>
                          {condominios.map((condo) => (
                            <option key={condo} value={condo}>{condo}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Número de Piso/Apartamento <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.floor}
                          onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="Ej: A-1201"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Características */}
                  <div className="mb-8">
                    <h3 className="text-lg text-[#0B3C5D] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      <Maximize size={20} />
                      Características
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Habitaciones <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          step="1"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="3"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Baños <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          step="0.5"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="2.5"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Área (m²) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B3C5D] transition-colors"
                          placeholder="250"
                        />
                      </div>
                    </div>
                    
                    {/* Características Adicionales */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h4 className="text-md text-gray-700 mb-4 font-medium">Amenidades y Características Especiales</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Con Piscina */}
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.hasPool}
                            onChange={(e) => setFormData({ ...formData, hasPool: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Waves size={20} className="text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-800 font-medium">Con Piscina</span>
                              </div>
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                formData.hasPool 
                                  ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                                  : 'border-gray-400 bg-white'
                              }`}>
                                {formData.hasPool && (
                                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                        
                        {/* Con Estacionamiento */}
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.hasParking}
                            onChange={(e) => setFormData({ ...formData, hasParking: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <Car size={20} className="text-gray-700" />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-800 font-medium">Con Estacionamiento</span>
                              </div>
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                formData.hasParking 
                                  ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                                  : 'border-gray-400 bg-white'
                              }`}>
                                {formData.hasParking && (
                                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                        
                        {/* Vista al Mar */}
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.hasOceanView}
                            onChange={(e) => setFormData({ ...formData, hasOceanView: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                <Eye size={20} className="text-cyan-600" />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-800 font-medium">Vista al Mar</span>
                              </div>
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                formData.hasOceanView 
                                  ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                                  : 'border-gray-400 bg-white'
                              }`}>
                                {formData.hasOceanView && (
                                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                        
                        {/* Mascotas Permitidas */}
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.petFriendly}
                            onChange={(e) => setFormData({ ...formData, petFriendly: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <PawPrint size={20} className="text-amber-600" />
                              </div>
                              <div className="flex-1">
                                <span className="text-gray-800 font-medium">Mascotas Permitidas</span>
                              </div>
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                formData.petFriendly 
                                  ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                                  : 'border-gray-400 bg-white'
                              }`}>
                                {formData.petFriendly && (
                                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Estado */}
                  <div className="mb-8">
                    <h3 className="text-lg text-[#0B3C5D] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      Estado del Apartamento
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="relative">
                        <input
                          type="radio"
                          name="status"
                          value="Disponible"
                          checked={formData.status === 'Disponible'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer transition-all peer-checked:border-green-600 peer-checked:bg-green-50">
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-4 h-4 rounded-full border-2 border-green-600 peer-checked:bg-green-600"></div>
                            <span className="font-medium">Disponible</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className="relative">
                        <input
                          type="radio"
                          name="status"
                          value="Ocupado"
                          checked={formData.status === 'Ocupado'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50">
                          <div className="flex items-center gap-2 text-blue-600">
                            <div className="w-4 h-4 rounded-full border-2 border-blue-600"></div>
                            <span className="font-medium">Ocupado</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className="relative">
                        <input
                          type="radio"
                          name="status"
                          value="Mantenimiento"
                          checked={formData.status === 'Mantenimiento'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer transition-all peer-checked:border-yellow-600 peer-checked:bg-yellow-50">
                          <div className="flex items-center gap-2 text-yellow-600">
                            <div className="w-4 h-4 rounded-full border-2 border-yellow-600"></div>
                            <span className="font-medium">Mantenimiento</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Upload de Imágenes */}
                  <div className="mb-6">
                    <h3 className="text-lg text-[#0B3C5D] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      <Upload size={20} />
                      Galería de Imágenes
                    </h3>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0B3C5D] transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-700 mb-2">Haz clic para subir imágenes o arrastra aquí</p>
                        <p className="text-sm text-gray-500">Formatos soportados: JPG, PNG, WEBP (Máx. 5MB c/u)</p>
                      </label>
                    </div>
                    
                    {/* Preview de Imágenes */}
                    {images.length > 0 && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-gray-700">
                            {images.length} {images.length === 1 ? 'imagen subida' : 'imágenes subidas'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Haz clic en la estrella para establecer la imagen principal
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {images.map((image) => (
                            <div
                              key={image.id}
                              className={`relative group rounded-lg overflow-hidden border-4 transition-all ${
                                mainImageId === image.id 
                                  ? 'border-[#0B3C5D] shadow-lg' 
                                  : 'border-transparent hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="w-full h-32 object-cover"
                              />
                              
                              {/* Overlay con acciones */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSetMainImage(image.id)}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    mainImageId === image.id
                                      ? 'bg-[#0B3C5D] text-white'
                                      : 'bg-white text-gray-700 hover:bg-gray-100'
                                  }`}
                                  title="Establecer como principal"
                                >
                                  <Star size={16} fill={mainImageId === image.id ? 'white' : 'none'} />
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(image.id)}
                                  className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                  title="Eliminar imagen"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              
                              {/* Badge de imagen principal */}
                              {mainImageId === image.id && (
                                <div className="absolute top-2 left-2 bg-[#0B3C5D] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Star size={12} fill="white" />
                                  Principal
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingApartment ? (
                      <>
                        <Edit className="mr-2" size={20} />
                        Guardar Cambios
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2" size={20} />
                        Crear Apartamento
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Modal para eliminar apartamento */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-8"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Confirmar Eliminación
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Esta acción no se puede deshacer
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-6">
                {apartmentToDelete && (
                  <>
                    {/* Información del apartamento */}
                    <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={apartmentToDelete.imageUrl}
                          alt={apartmentToDelete.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                          {apartmentToDelete.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">
                          {apartmentToDelete.location} · {apartmentToDelete.condominio} - {apartmentToDelete.floor}
                        </p>
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                          <span>{apartmentToDelete.bedrooms} hab</span>
                          <span>·</span>
                          <span>{apartmentToDelete.bathrooms} baños</span>
                          <span>·</span>
                          <span>{apartmentToDelete.area}m²</span>
                        </div>
                        <p className="text-[#0B3C5D] font-medium mt-1">
                          ${apartmentToDelete.price.toLocaleString()} DOP/mes
                        </p>
                      </div>
                    </div>
                    
                    {/* Advertencia */}
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-red-800 font-semibold mb-1">Advertencia: Esta acción es irreversible</h4>
                          <p className="text-red-700 text-sm">
                            Una vez eliminado, no podrás recuperar la información de este apartamento. 
                            Todos los datos, incluyendo imágenes, características y precios serán borrados permanentemente del sistema.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pregunta de confirmación */}
                    <p className="text-gray-700 mt-6 text-center">
                      ¿Estás completamente seguro de que deseas eliminar <span className="font-semibold text-[#0B3C5D]">{apartmentToDelete.name}</span>?
                    </p>
                  </>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleDeleteApartment}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="mr-2" size={20} />
                  Sí, Eliminar Apartamento
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Modal para filtros adicionales */}
      <AnimatePresence>
        {showFiltersModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-8"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Filter size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-[#0B3C5D] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Filtros Adicionales
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Aplica filtros para refinar tu búsqueda
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFiltersModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Con Piscina */}
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempFilters.hasPool}
                      onChange={(e) => setTempFilters({ ...tempFilters, hasPool: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Waves size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">Con Piscina</span>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          tempFilters.hasPool 
                            ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                            : 'border-gray-400 bg-white'
                        }`}>
                          {tempFilters.hasPool && (
                            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  {/* Con Estacionamiento */}
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempFilters.hasParking}
                      onChange={(e) => setTempFilters({ ...tempFilters, hasParking: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <Car size={20} className="text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">Con Estacionamiento</span>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          tempFilters.hasParking 
                            ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                            : 'border-gray-400 bg-white'
                        }`}>
                          {tempFilters.hasParking && (
                            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  {/* Vista al Mar */}
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempFilters.hasOceanView}
                      onChange={(e) => setTempFilters({ ...tempFilters, hasOceanView: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Eye size={20} className="text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">Vista al Mar</span>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          tempFilters.hasOceanView 
                            ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                            : 'border-gray-400 bg-white'
                        }`}>
                          {tempFilters.hasOceanView && (
                            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                  
                  {/* Mascotas Permitidas */}
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempFilters.petFriendly}
                      onChange={(e) => setTempFilters({ ...tempFilters, petFriendly: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="p-4 border-2 border-gray-300 rounded-lg transition-all peer-checked:border-[#0B3C5D] hover:border-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <PawPrint size={20} className="text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">Mascotas Permitidas</span>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          tempFilters.petFriendly 
                            ? 'bg-[#0B3C5D] border-[#0B3C5D]' 
                            : 'border-gray-400 bg-white'
                        }`}>
                          {tempFilters.petFriendly && (
                            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-between items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearFilters}
                  className="text-red-600 hover:bg-red-50 border-red-300 hover:border-red-400"
                >
                  <X className="mr-2" size={20} />
                  Limpiar Filtros
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowFiltersModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleApplyFilters}
                    className="bg-[#0B3C5D] hover:bg-[#082F49] text-white"
                  >
                    <Filter className="mr-2" size={20} />
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}