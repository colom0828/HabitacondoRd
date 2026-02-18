// Utilidades para clases de tema oscuro reutilizables

export const getDarkModeClasses = (isDarkMode: boolean) => ({
  // Backgrounds
  bg: isDarkMode ? 'bg-gray-900' : 'bg-[#F5F6F8]',
  bgCard: isDarkMode ? 'bg-gray-800' : 'bg-white',
  bgHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  bgSecondary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
  
  // Text colors
  text: isDarkMode ? 'text-white' : 'text-gray-900',
  textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
  textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
  textHeading: isDarkMode ? 'text-white' : 'text-[#0B3C5D]',
  textPrimary: isDarkMode ? 'text-blue-400' : 'text-[#0B3C5D]',
  
  // Borders
  border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
  borderLight: isDarkMode ? 'border-gray-600' : 'border-gray-100',
  
  // Inputs
  input: isDarkMode 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#0B3C5D]',
  
  // Badges/Tags
  badge: isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700',
  badgeSuccess: isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700',
  badgeWarning: isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700',
  badgeError: isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700',
  badgeInfo: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700',
  
  // Buttons
  buttonPrimary: isDarkMode 
    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
    : 'bg-[#0B3C5D] hover:bg-[#164E7F] text-white',
  buttonSecondary: isDarkMode 
    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  buttonOutline: isDarkMode 
    ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
    : 'border-gray-200 text-gray-700 hover:bg-gray-50',
  
  // Dividers
  divider: isDarkMode ? 'border-gray-700' : 'border-gray-200',
  
  // Shadows (disabled in dark mode)
  shadow: isDarkMode ? '' : 'shadow-lg',
  shadowSm: isDarkMode ? '' : 'shadow-sm',
  
  // Tables
  tableHeader: isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700',
  tableRow: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  tableRowAlt: isDarkMode ? 'bg-gray-800' : 'bg-white',
});
