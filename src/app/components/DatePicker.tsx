import React from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  label?: string;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  icon?: React.ReactNode;
  className?: string;
  usePortal?: boolean; // Nueva prop para usar Portal cuando sea necesario
}

export function DatePicker({ 
  label, 
  selected, 
  onSelect, 
  placeholder = 'Seleccionar fecha',
  minDate,
  icon,
  className = '',
  usePortal = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Calculate months to show until December
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthsUntilDecember = 12 - currentMonth;
  
  // Update position when using portal
  React.useEffect(() => {
    if (isOpen && usePortal && buttonRef.current) {
      const updatePosition = () => {
        if (!buttonRef.current) return;
        
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const dropdownWidth = 320;
        
        let left = rect.left;
        
        if (left + dropdownWidth > viewportWidth) {
          left = viewportWidth - dropdownWidth - 16;
        }
        
        if (left < 16) {
          left = 16;
        }
        
        setDropdownPosition({
          top: rect.bottom + 8,
          left: left,
          width: rect.width
        });
      };
      
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen, usePortal]);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    const handleScroll = (event: Event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return;
      }
      
      if (isOpen && !usePortal) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    if (!usePortal) {
      window.addEventListener('scroll', handleScroll, true);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (!usePortal) {
        window.removeEventListener('scroll', handleScroll, true);
      }
    };
  }, [isOpen, usePortal]);
  
  const handleSelect = (date: Date | undefined) => {
    onSelect(date);
    setIsOpen(false);
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(undefined);
  };
  
  const handleToggle = () => {
    if (!isOpen && usePortal && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 320;
      
      let left = rect.left;
      
      if (left + dropdownWidth > viewportWidth) {
        left = viewportWidth - dropdownWidth - 16;
      }
      
      if (left < 16) {
        left = 16;
      }
      
      setDropdownPosition({
        top: rect.bottom + 8,
        left: left,
        width: rect.width
      });
    }
    
    setIsOpen(!isOpen);
  };
  
  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={usePortal 
            ? "fixed bg-white rounded-xl shadow-2xl border-2 border-[#0B3C5D]/20 z-[9999] overflow-hidden"
            : "absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-[#0B3C5D]/20 z-50 min-w-full overflow-hidden"
          }
          style={usePortal ? {
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            minWidth: `${Math.max(dropdownPosition.width, 320)}px`
          } : undefined}
          ref={dropdownRef}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B3C5D]/5 border-b border-[#0B3C5D]/10">
            <span className="text-sm font-medium text-[#0B3C5D]">Seleccionar fecha</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-[#0B3C5D]/10 rounded-full transition-colors"
            >
              <X size={18} className="text-[#0B3C5D]" />
            </button>
          </div>
          
          <div className="datepicker-premium max-h-[400px] overflow-y-auto">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              locale={es}
              disabled={{ before: minDate || new Date() }}
              numberOfMonths={monthsUntilDecember}
              showOutsideDays={false}
              fixedWeeks
              modifiersClassNames={{
                selected: 'premium-selected',
                today: 'premium-today'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          ref={buttonRef}
          onClick={handleToggle}
          className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[#0B3C5D]/40
            hover:border-[#0B3C5D] focus:border-[#0B3C5D] focus:outline-none focus:ring-2 
            focus:ring-[#0B3C5D]/20 transition-all duration-300 bg-white/95 backdrop-blur-sm text-left"
        >
          <span className={selected ? 'text-[#0B3C5D]' : 'text-gray-500'}>
            {selected ? format(selected, 'PPP', { locale: es }) : placeholder}
          </span>
        </button>
        
        {/* Icon positioned absolutely */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B3C5D] pointer-events-none">
          {icon || <CalendarIcon size={20} />}
        </div>
        
        {/* Clear button */}
        {selected && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>
      
      {/* Dropdown - usa Portal si usePortal=true, sino renderiza normalmente */}
      {usePortal ? createPortal(dropdownContent, document.body) : dropdownContent}
      
      <style>{`
        .datepicker-premium {
          padding: 0.75rem;
        }
        
        .datepicker-premium::-webkit-scrollbar {
          width: 6px;
        }
        
        .datepicker-premium::-webkit-scrollbar-track {
          background: #F5F6F8;
          border-radius: 10px;
        }
        
        .datepicker-premium::-webkit-scrollbar-thumb {
          background: #B0B7C3;
          border-radius: 10px;
        }
        
        .datepicker-premium::-webkit-scrollbar-thumb:hover {
          background: #0B3C5D;
        }
        
        .datepicker-premium .rdp {
          --rdp-cell-size: 36px;
          --rdp-accent-color: #0B3C5D;
          --rdp-background-color: #F5F6F8;
          margin: 0;
        }
        
        .datepicker-premium .rdp-months {
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
        }
        
        .datepicker-premium .rdp-month {
          margin: 0;
        }
        
        .datepicker-premium .rdp-caption {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.25rem 0 0.75rem 0;
        }
        
        .datepicker-premium .rdp-caption_label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0B3C5D;
          font-family: var(--font-heading);
        }
        
        .datepicker-premium .rdp-nav {
          display: none;
        }
        
        .datepicker-premium .rdp-head_cell {
          font-weight: 600;
          color: #6B7280;
          font-size: 0.75rem;
          padding: 0.25rem 0;
        }
        
        .datepicker-premium .rdp-cell {
          padding: 1px;
        }
        
        .datepicker-premium .rdp-button {
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
          font-size: 0.85rem;
          color: #0B3C5D;
        }
        
        .datepicker-premium .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
          background-color: #F5F6F8;
          color: #0B3C5D;
        }
        
        .datepicker-premium .rdp-day_selected {
          background-color: #0B3C5D !important;
          color: white !important;
          font-weight: 600;
        }
        
        .datepicker-premium .rdp-day_today:not(.rdp-day_selected) {
          background-color: #B0B7C3;
          color: white;
          font-weight: 600;
        }
        
        .datepicker-premium .rdp-day_disabled {
          opacity: 0.3;
          cursor: not-allowed;
          color: #9CA3AF;
        }
        
        .datepicker-premium .rdp-day {
          color: #0B3C5D;
        }
      `}</style>
    </div>
  );
}
