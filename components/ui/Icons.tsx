import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 📅 Dashboard / Calendario (Estilo Apple Calendar)
export function IconCalendar({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="4" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2.5" />
    </svg>
  );
}

// 🎯 Targets / Metas (Estilo Apple Precision Target / Bullseye)
export function IconTarget({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

// 💰 Finances / Billetera Minimalista
export function IconWallet({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
      <path d="M16 12h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z" />
      <circle cx="18" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

// 🛒 Grocery / Bolsa Minimalista Estilo Apple Store
export function IconShoppingBag({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// 🏋️ Training / Mancuerna Fitness
export function IconDumbbell({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1" />
      <path d="m3 3 1 1" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
      <path d="m3 10 7-7" />
      <path d="m14 21 7-7" />
    </svg>
  );
}

// 🥗 Nutrición / Manzana Saludable
export function IconNutrition({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

// 🌅 Mañana / Amanecer
export function IconSunrise({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M12 2v6" />
      <path d="M4.93 10.93l1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="M17.66 12.34l1.41-1.41" />
      <path d="M16 18a4 4 0 0 0-8 0" />
      <path d="M1 22h22" />
    </svg>
  );
}

// ☀️ Tarde / Sol
export function IconSun({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

// 🌙 Noche / Luna
export function IconMoon({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

// 🔥 Racha / Fuego Minimalista
export function IconFlame({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M12 2c-.5 2-1 3.5-3 5-1.5 1.2-2.5 3-2.5 5.5 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-3-2-5.5-3.5-7-1.5 1.5-2 3-2 4 0 .5-.5 1-1 1s-.8-.5-.8-1c0-2 1.5-4.5 2.5-6.5-1.5.5-3.5 1.5-4.7 3.5z" />
    </svg>
  );
}

// ✨ Destellos / Sparkles
export function IconSparkles({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

// 💳 Tarjeta de Crédito
export function IconCreditCard({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

// 🧾 Recibo / Historial
export function IconReceipt({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
    </svg>
  );
}

// 📦 Catálogo / Paquete
export function IconPackage({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

// ⚡ Rayo / Rápido
export function IconBolt({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// 📥 Importar / Descarga
export function IconDownload({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

// ☁️ Nube Sync
export function IconCloud({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

// 💧 Gota de Agua
export function IconDroplet({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

// ➕ Agregar
export function IconPlus({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ✓ Checkmark
export function IconCheck({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ✕ Cerrar
export function IconX({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ✏️ Editar
export function IconEdit({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

// 🗑️ Eliminar
export function IconTrash({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

// 🔄 Refrescar
export function IconRefresh({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

// Componente para renderizar el icono principal según TabType
export function NavTabIcon({ tabId, className = "w-5 h-5" }: { tabId: string; className?: string }) {
  switch (tabId) {
    case 'calendario':
      return <IconCalendar className={className} />;
    case 'habitos':
      return <IconTarget className={className} />;
    case 'finanzas':
      return <IconWallet className={className} />;
    case 'supermercado':
      return <IconShoppingBag className={className} />;
    default:
      return <IconTarget className={className} />;
  }
}

// ⏰ Reloj / Horario
export function IconClock({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

// ◀ Chevron Izquierda
export function IconChevronLeft({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ▶ Chevron Derecha
export function IconChevronRight({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ➔ Flecha Derecha
export function IconArrowRight({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

// ⏪ / ↩️ Volver / Ayer / Reabrir
export function IconRotateCcw({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// 📁 Carpeta / Archivo
export function IconFolder({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

// 📋 Copiar / Portapapeles
export function IconCopy({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// 🚀 Lanzar / Enviar / Rocket
export function IconRocket({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

// ⚖️ Balanza / Peso / Macros
export function IconScale({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

// 📊 Analítica / Gráfico de barras
export function IconChartBar({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

// 📚 / 📖 Lectura / Catálogo / Libro
export function IconBook({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

// 💾 Guardar
export function IconSave({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

// ✅ Check circular
export function IconCheckCircle({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <polyline points="8.5 12.5 11 15 15.5 9.5" />
    </svg>
  );
}

// 🥩 Proteína (Corte limpio / hexágono molecular proteico estilizado)
export function IconProtein({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M12 2.5 19.5 7v10L12 21.5 4.5 17V7L12 2.5Z" />
      <path d="M10 15.5v-7h2.75a2.25 2.25 0 0 1 0 4.5H10" />
    </svg>
  );
}

// 🍞 Carbohidratos (Espiga de grano minimalista)
export function IconCarbs({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M12 22V8" />
      <path d="M12 8c0-3 2-5 2-5s2 2 2 5-2 3-4 3Z" />
      <path d="M12 11c0-3-2-5-2-5s-2 2-2 5 2 3 4 3Z" />
      <path d="M12 14c2.5 0 4.5-1.5 5-4-2.5 0-4.5 1.5-5 4Z" />
      <path d="M12 14c-2.5 0-4.5-1.5-5-4 2.5 0 4.5 1.5 5 4Z" />
      <path d="M12 18c2.5 0 4.5-1.5 5-4-2.5 0-4.5 1.5-5 4Z" />
      <path d="M12 18c-2.5 0-4.5-1.5-5-4 2.5 0 4.5 1.5 5 4Z" />
    </svg>
  );
}

// 🥑 Grasas Saludables (Aguacate / gota lipídica minimalista)
export function IconFats({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M12 2.5c3.5 0 6.5 5.5 6.5 11.5a6.5 6.5 0 0 1-13 0c0-6 3-11.5 6.5-11.5Z" />
      <circle cx="12" cy="14.5" r="2.75" />
    </svg>
  );
}

// 🏃‍♂️ Correr / Velocidad
export function IconRunning({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <circle cx="15.5" cy="4.5" r="2" />
      <path d="M10.5 9.5 14 8l2.5 3 3 .5" />
      <path d="m7 12.5 3.5-3 2 3.5-3 3.5-4.5 1" />
      <path d="m12.5 13 3.5 3.5-1 4.5" />
    </svg>
  );
}

// 🚴‍♂️ Ciclismo / Peloton
export function IconBike({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <circle cx="5.5" cy="16.5" r="3.5" />
      <circle cx="18.5" cy="16.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M12 16.5V12l-3-2 4-3 2 2.5h3" />
    </svg>
  );
}

// 💪 Fuerza / Kettlebell
export function IconStrength({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M6.5 10h11a3.5 3.5 0 0 1 3.3 4.6l-1.1 3.4A3.5 3.5 0 0 1 16.4 20.5H7.6a3.5 3.5 0 0 1-3.3-2.5L3.2 14.6A3.5 3.5 0 0 1 6.5 10Z" />
    </svg>
  );
}

// 🏔️ Fondo / Resistencia / Montaña
export function IconMountain({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <path d="M4.5 15h6l2-2.5 2 2.5h4.5" />
    </svg>
  );
}

// 🧘‍♂️ Meditación / Recuperación Activa (Loto minimalista)
export function IconYoga({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M12 4c-2.5 3-3.5 6-3.5 8.5 0 2.5 1.5 4.5 3.5 5.5 2-1 3.5-3 3.5-5.5C15.5 10 14.5 7 12 4Z" />
      <path d="M9 17.5C6.5 17 4 14.5 3.5 10.5c2.5.5 4.5 2 5.5 4.5" />
      <path d="M15 17.5c2.5-.5 5-3 5.5-7-2.5.5-4.5 2-5.5 4.5" />
      <path d="M6 20h12" />
    </svg>
  );
}

// 🍳 Cocina / Comidas
export function IconUtensils({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

// 🥤 Bebidas y Cafés
export function IconCoffee({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

// 💤 Descanso / Sueño
export function IconSleep({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M2 18v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7" />
      <path d="M2 14h20" />
      <path d="M6 9V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
      <path d="M13 9V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
    </svg>
  );
}

// 💻 Trabajo / Enfoque Digital
export function IconLaptop({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

// 🧹 Hogar / Orden
export function IconHome({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

// 🚗 Transporte / Movilidad
export function IconCar({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

// 🚿 Higiene / Ducha / Cuidado Personal
export function IconShower({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="m4 4 2.5 2.5" />
      <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
      <path d="M15 5 5 15" />
      <path d="M14 17v.01" />
      <path d="M10 16v.01" />
      <path d="M13 21v.01" />
      <path d="M17 19v.01" />
      <path d="M18 14v.01" />
    </svg>
  );
}

// 💊 Salud / Suplementos
export function IconPill({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

// 🐾 Mascotas
export function IconPaw({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <circle cx="11" cy="4" r="1.5" />
      <circle cx="18" cy="8" r="1.5" />
      <circle cx="5" cy="8" r="1.5" />
      <circle cx="20" cy="14" r="1.5" />
      <path d="M9 11a4 4 0 0 1 6 0l1.5 3.5a3 3 0 0 1-2.7 4.2c-.8 0-1.3-.3-1.8-.3s-1 .3-1.8.3a3 3 0 0 1-2.7-4.2L9 11Z" />
    </svg>
  );
}

// 🧊 Congelados
export function IconSnowflake({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} {...props}>
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}

// Catálogo limpio de iconos disponibles para Targets
export const HABIT_ICON_OPTIONS: Array<{ id: string; label: string }> = [
  { id: 'running', label: 'Cardio / Running' },
  { id: 'water', label: 'Hidratación' },
  { id: 'reading', label: 'Lectura' },
  { id: 'gym', label: 'Entreno' },
  { id: 'nutrition', label: 'Nutrición' },
  { id: 'cooking', label: 'Cocina' },
  { id: 'sleep', label: 'Descanso' },
  { id: 'work', label: 'Enfoque' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'home', label: 'Hogar' },
  { id: 'study', label: 'Estudio' },
  { id: 'cycling', label: 'Ciclismo' },
  { id: 'health', label: 'Salud' },
  { id: 'finance', label: 'Finanzas' },
  { id: 'hygiene', label: 'Higiene' },
  { id: 'transport', label: 'Movilidad' },
];

// Mapa unificado de IDs limpios y emojis heredados de Supabase -> componente SVG
const HABIT_ICON_MAP: Record<string, (props: IconProps) => React.ReactNode> = {
  running: IconRunning,
  water: IconDroplet,
  reading: IconBook,
  gym: IconDumbbell,
  nutrition: IconNutrition,
  cooking: IconUtensils,
  sleep: IconSleep,
  work: IconLaptop,
  mindfulness: IconYoga,
  home: IconHome,
  study: IconBook,
  cycling: IconBike,
  health: IconPill,
  finance: IconWallet,
  hygiene: IconShower,
  transport: IconCar,
  strength: IconStrength,
  mountain: IconMountain,
  bolt: IconBolt,
  target: IconTarget,
  flame: IconFlame,
  sparkles: IconSparkles,
  '🏃‍♂️': IconRunning,
  '🏃': IconRunning,
  '💧': IconDroplet,
  '📚': IconBook,
  '📖': IconBook,
  '🏋️‍♂️': IconDumbbell,
  '🏋️': IconDumbbell,
  '🍎': IconNutrition,
  '🥗': IconNutrition,
  '🍳': IconUtensils,
  '💤': IconSleep,
  '💻': IconLaptop,
  '🧘‍♂️': IconYoga,
  '🧘': IconYoga,
  '🧹': IconHome,
  '🚴‍♂️': IconBike,
  '🚴': IconBike,
  '💊': IconPill,
  '💰': IconWallet,
  '🚿': IconShower,
  '🚗': IconCar,
  '💪': IconStrength,
  '⚡': IconBolt,
  '🏔️': IconMountain,
  '🎯': IconTarget,
  '🔥': IconFlame,
  '✨': IconSparkles,
};

// Renderiza el icono vectorial del Target soportando IDs nuevos y emojis guardados en BD
export function HabitIcon({ value, className = "w-5 h-5" }: { value?: string; className?: string }) {
  const key = (value || '').trim();
  const IconComp = HABIT_ICON_MAP[key] || IconTarget;
  return <IconComp className={className} />;
}

// Icono vectorial para cada día de la semana en Training Tracker
export function TrainingIcon({ day, className = "w-5 h-5" }: { day?: string; className?: string }) {
  switch (day) {
    case 'Lunes':
      return <IconDumbbell className={className} />;
    case 'Martes':
      return <IconBike className={className} />;
    case 'Miércoles':
      return <IconRunning className={className} />;
    case 'Jueves':
      return <IconStrength className={className} />;
    case 'Viernes':
      return <IconBolt className={className} />;
    case 'Sábado':
      return <IconMountain className={className} />;
    case 'Domingo':
      return <IconYoga className={className} />;
    default:
      return <IconDumbbell className={className} />;
  }
}

// Remueve emojis iniciales de categorías guardadas en Supabase manteniendo texto limpio
export function limpiarCategoriaGrocery(categoria?: string | null): string {
  const raw = (categoria || '').trim();
  if (!raw) return 'General / Otros';
  const cleaned = raw
    .replace(/^(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2300-\u27BF]|[\u2B00-\u2BFF]|[\uFE00-\uFE0F]|\u200D|\s)+/, '')
    .trim();
  return cleaned || raw;
}

// Icono vectorial correspondiente a la categoría de Grocery
export function CategoryIcon({ category, className = "w-3.5 h-3.5" }: { category?: string | null; className?: string }) {
  const c = limpiarCategoriaGrocery(category).toLowerCase();
  if (c.includes('carne') || c.includes('pollo') || c.includes('pescado')) return <IconProtein className={className} />;
  if (c.includes('fruta') || c.includes('verdura')) return <IconNutrition className={className} />;
  if (c.includes('lácteo') || c.includes('lacteo') || c.includes('huevo')) return <IconDroplet className={className} />;
  if (c.includes('panadería') || c.includes('panaderia') || c.includes('arepa')) return <IconCarbs className={className} />;
  if (c.includes('aseo') || c.includes('limpieza')) return <IconSparkles className={className} />;
  if (c.includes('cuidado')) return <IconShower className={className} />;
  if (c.includes('bebida') || c.includes('café') || c.includes('cafe')) return <IconCoffee className={className} />;
  if (c.includes('embutido') || c.includes('charcuter')) return <IconUtensils className={className} />;
  if (c.includes('snack') || c.includes('pasaboca')) return <IconShoppingBag className={className} />;
  if (c.includes('congelado')) return <IconSnowflake className={className} />;
  if (c.includes('condimento') || c.includes('salsa')) return <IconFlame className={className} />;
  if (c.includes('mascota')) return <IconPaw className={className} />;
  if (c.includes('salud') || c.includes('botiqu')) return <IconPill className={className} />;
  if (c.includes('personalizada') || c.includes('otro')) return <IconEdit className={className} />;
  return <IconPackage className={className} />;
}
