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
