import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { ApartmentDetail } from './components/ApartmentDetail';
import { ApartmentsPage } from './components/ApartmentsPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { CondominioModule } from './components/CondominioModule';
import { ContratosModule } from './components/ContratosModule';
import { ApartamentosModule } from './components/ApartamentosModule';
import { ReservasModule } from './components/ReservasModule';
import { CalendarioModule } from './components/CalendarioModule';
import { LimpiezaModule } from './components/LimpiezaModule';
import { PagosModule } from './components/PagosModule';
import { ReportesModule } from './components/ReportesModule';
import { ReseñasModule } from './components/ReseñasModule';
import { SeguridadModule } from './components/SeguridadModule';
import { ConfiguracionModule } from './components/ConfiguracionModule';

type Section = 'home' | 'detail' | 'login' | 'dashboard' | 'apartments' | 'reservas' | 
  'contratos' | 'condominios' | 'calendario' | 'limpieza' | 'pagos' | 'reportes' | 'reseñas' | 'seguridad' | 'configuracion';

export default function App() {
  const [currentSection, setCurrentSection] = React.useState<Section>('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentSection('dashboard');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSection('home');
  };
  
  const handleNavigate = (section: string) => {
    setCurrentSection(section as Section);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigateToDetail={() => setCurrentSection('detail')} />;
      case 'detail':
        return <ApartmentDetail 
          onBack={() => setCurrentSection('home')} 
          isLoggedIn={isLoggedIn}
          onNavigateToLogin={() => setCurrentSection('login')}
        />;
      case 'apartments':
        // Si está logueado, mostrar módulo administrativo; si no, la página pública
        return isLoggedIn 
          ? <ApartamentosModule isDarkMode={isDarkMode} />
          : <ApartmentsPage onNavigateToDetail={() => setCurrentSection('detail')} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onBack={() => setCurrentSection('home')} />;
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'condominios':
        return <CondominioModule isDarkMode={isDarkMode} />;
      case 'contratos':
        return <ContratosModule isDarkMode={isDarkMode} />;
      case 'reservas':
        return <ReservasModule isDarkMode={isDarkMode} />;
      case 'calendario':
        return <CalendarioModule isDarkMode={isDarkMode} />;
      case 'limpieza':
        return <LimpiezaModule isDarkMode={isDarkMode} />;
      case 'pagos':
        return <PagosModule isDarkMode={isDarkMode} />;
      case 'reportes':
        return <ReportesModule isDarkMode={isDarkMode} />;
      case 'reseñas':
        return <ReseñasModule isDarkMode={isDarkMode} />;
      case 'seguridad':
        return <SeguridadModule isDarkMode={isDarkMode} />;
      case 'configuracion':
        return <ConfiguracionModule isDarkMode={isDarkMode} />;
      default:
        return <HomePage onNavigateToDetail={() => setCurrentSection('detail')} />;
    }
  };
  
  const isDashboardSection = isLoggedIn && currentSection !== 'home' && currentSection !== 'detail' && currentSection !== 'login';
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {currentSection !== 'login' && (
        <Navbar 
          onNavigate={handleNavigate}
          currentSection={currentSection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      
      {isDashboardSection && (
        <Sidebar 
          activeSection={currentSection}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
        />
      )}
      
      <div className={isDashboardSection ? 'ml-64' : ''}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}