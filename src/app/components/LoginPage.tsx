import React from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Phone } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { motion } from 'motion/react';
import logoSinFondo from "figma:asset/53cba963ea396b5515da13160fbe00e16138950a.png";

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFadingOut, setIsFadingOut] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      // Validar credenciales de admin
      if (formData.email.toLowerCase() === 'admin' && formData.password === 'admin123') {
        setUserName('Administrador');
        setIsLoading(true);
        // Después de 2.5s comienza fade-out
        setTimeout(() => {
          setIsFadingOut(true);
        }, 2500);
        // Después de 3.5s (1s de fade-out) navega al dashboard
        setTimeout(() => {
          onLogin();
        }, 3500);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      // Registro
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      setUserName(formData.name || 'Usuario');
      setIsLoading(true);
      // Después de 2.5s comienza fade-out
      setTimeout(() => {
        setIsFadingOut(true);
      }, 2500);
      // Después de 3.5s (1s de fade-out) navega al dashboard
      setTimeout(() => {
        onLogin();
      }, 3500);
    }
  };
  
  // Pantalla de carga
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0B3C5D] to-[#1a4d6f] relative overflow-hidden"
      >
        {/* Animated decorative elements */}
        <motion.div 
          animate={{ opacity: isFadingOut ? 0 : 0.2 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-20 w-72 h-72 bg-[#B0B7C3] rounded-full blur-3xl animate-pulse" 
        />
        <motion.div 
          animate={{ opacity: isFadingOut ? 0 : 0.3 }}
          transition={{ duration: 1 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#0B3C5D] rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }} 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -200 }}
          animate={{ 
            opacity: isFadingOut ? 0 : 1, 
            scale: isFadingOut ? 0.8 : 1, 
            y: isFadingOut ? -50 : 0 
          }}
          transition={{ duration: isFadingOut ? 1 : 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Logo animado con glow */}
          <motion.div
            animate={{
              scale: isFadingOut ? [1, 0.9] : [1, 1.05, 1],
              rotate: isFadingOut ? 0 : [0, 5, -5, 0],
              opacity: isFadingOut ? 0 : 1
            }}
            transition={{
              duration: isFadingOut ? 1 : 2,
              repeat: isFadingOut ? 0 : Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Glow rings pulsantes */}
            <motion.div 
              animate={{ opacity: isFadingOut ? 0 : 0.6 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-[#B0B7C3] to-[#164E7F] rounded-full blur-3xl animate-pulse" 
            />
            <motion.div 
              animate={{ opacity: isFadingOut ? 0 : 0.4 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-white rounded-full blur-2xl animate-pulse" 
              style={{ animationDelay: '0.5s' }} 
            />
            
            {/* Logo container con animación de rebote */}
            <motion.div
              animate={{ 
                y: isFadingOut ? 0 : [0, -10, 0],
                opacity: isFadingOut ? 0 : 1
              }}
              transition={{
                duration: 1.5,
                repeat: isFadingOut ? 0 : Infinity,
                ease: "easeInOut"
              }}
              className="relative inline-block bg-white/15 backdrop-blur-2xl rounded-full p-12 shadow-2xl border border-white/30"
            >
              <img src={logoSinFondo} alt="Habita-condo RD" className="h-32 w-auto relative z-10" />
            </motion.div>
          </motion.div>
          
          {/* Mensaje de bienvenida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isFadingOut ? 0 : 1, 
              y: isFadingOut ? 30 : 0 
            }}
            transition={{ duration: isFadingOut ? 1 : 0.8, delay: isFadingOut ? 0 : 0.5 }}
            className="mt-12 text-center"
          >
            <h2 
              className="text-4xl text-white mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Bienvenido de nuevo
            </h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isFadingOut ? 0 : 1, 
                scale: isFadingOut ? 0.9 : 1 
              }}
              transition={{ duration: isFadingOut ? 1 : 0.6, delay: isFadingOut ? 0 : 0.8 }}
              className="text-5xl text-[#B0B7C3] font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {userName}
            </motion.p>
          </motion.div>
          
          {/* Loading spinner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: isFadingOut ? 0.8 : 0.6, delay: isFadingOut ? 0 : 1.2 }}
            className="mt-12 flex items-center gap-2"
          >
            <div className="flex gap-2">
              <motion.div
                animate={{ 
                  scale: isFadingOut ? 1 : [1, 1.3, 1], 
                  opacity: isFadingOut ? 0 : [0.5, 1, 0.5] 
                }}
                transition={{ duration: 1, repeat: isFadingOut ? 0 : Infinity, delay: 0 }}
                className="w-3 h-3 bg-[#B0B7C3] rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: isFadingOut ? 1 : [1, 1.3, 1], 
                  opacity: isFadingOut ? 0 : [0.5, 1, 0.5] 
                }}
                transition={{ duration: 1, repeat: isFadingOut ? 0 : Infinity, delay: 0.2 }}
                className="w-3 h-3 bg-[#B0B7C3] rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: isFadingOut ? 1 : [1, 1.3, 1], 
                  opacity: isFadingOut ? 0 : [0.5, 1, 0.5] 
                }}
                transition={{ duration: 1, repeat: isFadingOut ? 0 : Infinity, delay: 0.4 }}
                className="w-3 h-3 bg-[#B0B7C3] rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: isFadingOut ? 0.8 : 0.6, delay: isFadingOut ? 0 : 1.5 }}
            className="text-white/60 text-sm mt-6"
          >
            Cargando tu panel de control...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0a1628] via-[#0B3C5D] to-[#1a4d6f] relative overflow-hidden">
      {/* Animated decorative elements with glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#B0B7C3] rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0B3C5D] rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#164E7F]/20 to-[#B0B7C3]/20 rounded-full blur-3xl" />
      
      {/* Back button - Fixed position */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onClick={onBack}
        className="fixed top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2.5 transition-all group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Volver al inicio</span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10 relative"
        >
          {/* Glow rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#B0B7C3] to-[#164E7F] rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Logo container */}
          <div className="relative inline-block bg-white/10 backdrop-blur-xl rounded-full p-8 shadow-2xl border border-white/20">
            <img src={logoSinFondo} alt="Habita-condo RD" className="h-24 w-auto relative z-10" />
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-3xl text-white tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            HABITA-CONDO RD
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#B0B7C3] text-sm mt-3 tracking-wide"
          >
            {isLogin ? 'Inicia sesión para continuar' : 'Crear cuenta nueva'}
          </motion.p>
        </motion.div>
        
        {/* Form - No card, direct inputs */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm mb-2 font-medium">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] z-10" size={20} />
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B0B7C3]/50 focus:bg-white/10 transition-all relative"
                  required
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-white/80 text-sm mb-2 font-medium">Usuario o Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] z-10" size={20} />
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B0B7C3]/50 focus:bg-white/10 transition-all relative"
                required
              />
            </div>
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm mb-2 font-medium">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] z-10" size={20} />
                <input
                  type="tel"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B0B7C3]/50 focus:bg-white/10 transition-all relative"
                  required
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-white/80 text-sm mb-2 font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] z-10" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B0B7C3]/50 focus:bg-white/10 transition-all relative"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] hover:text-white transition-colors z-10"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm mb-2 font-medium">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] z-10" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#B0B7C3]/50 focus:bg-white/10 transition-all relative"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0B7C3] hover:text-white transition-colors z-10"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}
          
          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/70 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5" />
                Recordarme
              </label>
              <button type="button" className="text-[#B0B7C3] hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-center backdrop-blur-xl"
            >
              {error}
            </motion.div>
          )}
          
          {/* Gradient button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0B3C5D] via-[#164E7F] to-[#B0B7C3] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-[#B0B7C3]/30 transition-all duration-300 hover:scale-[1.02] mt-8"
          >
            {isLogin ? 'Iniciar' : 'Registrarse'}
          </button>
        </motion.form>
        
        {/* Switch login/register */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <span className="text-[#B0B7C3] font-semibold">
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </span>
          </button>
        </motion.div>
        
        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-white/40 text-xs mt-10"
        >
          © 2026 HABITA-CONDO RD - Todos los derechos reservados
        </motion.p>
      </motion.div>
    </div>
  );
}