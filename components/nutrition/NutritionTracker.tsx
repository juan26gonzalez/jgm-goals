import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { getFechaActualColombia, sumarDiasFechaStr, formatearFechaBonita } from '@/lib/dateUtils';
import { 
  IconNutrition, 
  IconBolt, 
  IconDownload, 
  IconCloud, 
  IconDroplet, 
  IconEdit, 
  IconCheck, 
  IconX 
} from '@/components/ui/Icons';
import type { UserSession, MetaNutricionalDia, RegistroNutricionDiaria } from '@/types';

interface NutritionTrackerProps {
  sesion?: UserSession;
  strHoy?: string;
}

// 🎯 Objetivos Exactos extraídos de la configuración Custom de MyFitnessPal del usuario
export const METAS_MFP: Record<string, MetaNutricionalDia> = {
  'Lunes': {
    dias: ['Lunes'],
    calorias: 2400,
    pctCarbs: 35,
    pctProteina: 35,
    pctGrasa: 30,
    gramosCarbs: 210,
    gramosProteina: 210,
    gramosGrasa: 80,
    tipoDia: 'Gym Tren Inferior',
    badge: '2.400 kcal',
    enfoque: 'Fuerza & Rendimiento (C 35%, P 35%, F 30%)'
  },
  'Martes': {
    dias: ['Martes'],
    calorias: 2400,
    pctCarbs: 35,
    pctProteina: 35,
    pctGrasa: 30,
    gramosCarbs: 210,
    gramosProteina: 210,
    gramosGrasa: 80,
    tipoDia: 'Upper Body Peloton',
    badge: '2.400 kcal',
    enfoque: 'Potencia & Glucógeno (C 35%, P 35%, F 30%)'
  },
  'Miércoles': {
    dias: ['Miércoles'],
    calorias: 2400,
    pctCarbs: 35,
    pctProteina: 35,
    pctGrasa: 30,
    gramosCarbs: 210,
    gramosProteina: 210,
    gramosGrasa: 80,
    tipoDia: 'Pista Trote',
    badge: '2.400 kcal',
    enfoque: 'Velocidad & Recuperación (C 35%, P 35%, F 30%)'
  },
  'Jueves': {
    dias: ['Jueves'],
    calorias: 2400,
    pctCarbs: 35,
    pctProteina: 35,
    pctGrasa: 30,
    gramosCarbs: 210,
    gramosProteina: 210,
    gramosGrasa: 80,
    tipoDia: 'Gym Espalda',
    badge: '2.400 kcal',
    enfoque: 'Fuerza & Síntesis Proteica (C 35%, P 35%, F 30%)'
  },
  'Viernes': {
    dias: ['Viernes'],
    calorias: 2100,
    pctCarbs: 25,
    pctProteina: 40,
    pctGrasa: 35,
    gramosCarbs: 131,
    gramosProteina: 210,
    gramosGrasa: 82,
    tipoDia: 'Fartlek Calle',
    badge: '2.100 kcal',
    enfoque: 'Alta Proteína & Déficit (C 25%, P 40%, F 35%)'
  },
  'Sábado': {
    dias: ['Sábado'],
    calorias: 2500,
    pctCarbs: 45,
    pctProteina: 30,
    pctGrasa: 25,
    gramosCarbs: 281,
    gramosProteina: 188,
    gramosGrasa: 69,
    tipoDia: 'Tirada Larga 12km',
    badge: '2.500 kcal',
    enfoque: 'Carb Loading & Resistencia (C 45%, P 30%, F 25%)'
  },
  'Domingo': {
    dias: ['Domingo'],
    calorias: 2100,
    pctCarbs: 25,
    pctProteina: 40,
    pctGrasa: 35,
    gramosCarbs: 131,
    gramosProteina: 210,
    gramosGrasa: 82,
    tipoDia: 'Descanso Activo',
    badge: '2.100 kcal',
    enfoque: 'Recuperación Muscular Alta Proteína (C 25%, P 40%, F 35%)'
  }
};

const diasSemanaNombres = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const SQL_MIGRACION_MFP = `-- 1. Crear tabla de nutrición y macros sincronizados con MyFitnessPal
CREATE TABLE IF NOT EXISTS public.nutricion_diaria_mfp (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha DATE NOT NULL,
    calorias NUMERIC NOT NULL DEFAULT 0,
    proteina NUMERIC NOT NULL DEFAULT 0,
    carbs NUMERIC NOT NULL DEFAULT 0,
    grasa NUMERIC NOT NULL DEFAULT 0,
    agua NUMERIC NOT NULL DEFAULT 0,
    peso NUMERIC,
    notas TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_user_date UNIQUE(user_id, fecha)
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.nutricion_diaria_mfp ENABLE ROW LEVEL SECURITY;

-- 3. Políticas por usuario (idempotentes)
DROP POLICY IF EXISTS "nutricion_select" ON public.nutricion_diaria_mfp;
CREATE POLICY "nutricion_select" ON public.nutricion_diaria_mfp FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "nutricion_insert" ON public.nutricion_diaria_mfp;
CREATE POLICY "nutricion_insert" ON public.nutricion_diaria_mfp FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "nutricion_update" ON public.nutricion_diaria_mfp;
CREATE POLICY "nutricion_update" ON public.nutricion_diaria_mfp FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "nutricion_delete" ON public.nutricion_diaria_mfp;
CREATE POLICY "nutricion_delete" ON public.nutricion_diaria_mfp FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 4. Habilitar Realtime
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.nutricion_diaria_mfp;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;`;

export default function NutritionTracker({ sesion: sesionProp, strHoy: strHoyProp }: NutritionTrackerProps) {
  const [sesion, setSesion] = useState<UserSession>(sesionProp || null);
  const { diaSemana: diaSemanaNum, fechaStr: fechaHoyCalculada } = getFechaActualColombia();
  const fechaHoy = strHoyProp || fechaHoyCalculada;

  // Fecha actualmente seleccionada para visualizar / registrar
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(fechaHoy);

  // Registros de nutrición diarios
  const [registros, setRegistros] = useState<Record<string, RegistroNutricionDiaria>>({});
  const [sincronizadoNube, setSincronizadoNube] = useState(false);

  // Modales
  const [modalRegistro, setModalRegistro] = useState(false);
  const [modalImportarCsv, setModalImportarCsv] = useState(false);
  const [modalSql, setModalSql] = useState(false);
  const [sqlCopiado, setSqlCopiado] = useState(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);

  // Campos del modal de registro rápido
  const [inputCalorias, setInputCalorias] = useState('');
  const [inputProteina, setInputProteina] = useState('');
  const [inputCarbs, setInputCarbs] = useState('');
  const [inputGrasa, setInputGrasa] = useState('');
  const [inputAgua, setInputAgua] = useState('2.5');
  const [inputPeso, setInputPeso] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Campos para importación de CSV
  const [textoCsv, setTextoCsv] = useState('');
  const [procesandoCsv, setProcesandoCsv] = useState(false);

  const claveLocalStorage = sesion?.user?.id 
    ? `jgm_nutricion_mfp_${sesion.user.id}` 
    : 'jgm_nutricion_mfp_guest';

  // Obtener sesión activa si no llegó en props
  useEffect(() => {
    if (sesionProp) {
      setSesion(sesionProp);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setSesion(data.session);
    });
  }, [sesionProp]);

  // Cargar desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const guardado = localStorage.getItem(claveLocalStorage);
        if (guardado) {
          const parseado = JSON.parse(guardado);
          if (parseado && typeof parseado === 'object') {
            setRegistros(parseado);
          }
        }
      } catch {
        // ignore
      }
    }
  }, [claveLocalStorage]);

  // Sincronizar con Supabase
  const sincronizarConSupabase = useCallback(async () => {
    if (!sesion?.user?.id) return;
    try {
      const { data, error } = await supabase
        .from('nutricion_diaria_mfp')
        .select('*')
        .eq('user_id', sesion.user.id);

      if (error) {
        setSincronizadoNube(false);
        return;
      }

      setSincronizadoNube(true);
      if (data && data.length > 0) {
        const mapa: Record<string, RegistroNutricionDiaria> = {};
        data.forEach(item => {
          mapa[item.fecha] = {
            id: item.id,
            fecha: item.fecha,
            calorias: Number(item.calorias) || 0,
            proteina: Number(item.proteina) || 0,
            carbs: Number(item.carbs) || 0,
            grasa: Number(item.grasa) || 0,
            agua: Number(item.agua) || 0,
            peso: item.peso ? Number(item.peso) : undefined,
            notas: item.notas || undefined
          };
        });

        setRegistros(prev => {
          const combinado = { ...prev, ...mapa };
          localStorage.setItem(claveLocalStorage, JSON.stringify(combinado));
          return combinado;
        });
      }
    } catch {
      setSincronizadoNube(false);
    }
  }, [sesion?.user?.id, claveLocalStorage]);

  useEffect(() => {
    if (sesion?.user?.id) {
      sincronizarConSupabase();
    }
    const handleFocus = () => sincronizarConSupabase();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [sesion?.user?.id, sincronizarConSupabase]);

  // Nombre del día para una fecha dada (en Colombia)
  const getNombreDiaSemana = useCallback((fechaStr: string): string => {
    const [y, m, d] = fechaStr.split('-').map(Number);
    const date = new Date(y, m - 1, d, 12, 0, 0);
    const nombres = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return nombres[date.getDay()];
  }, []);

  const diaActualNombre = useMemo(() => getNombreDiaSemana(fechaSeleccionada), [fechaSeleccionada, getNombreDiaSemana]);
  const metaDiaActual = METAS_MFP[diaActualNombre] || METAS_MFP['Lunes'];
  const registroHoy = registros[fechaSeleccionada] || {
    id: `local-${fechaSeleccionada}`,
    fecha: fechaSeleccionada,
    calorias: 0,
    proteina: 0,
    carbs: 0,
    grasa: 0,
    agua: 0
  };

  // Cálculos de macros del día seleccionado
  const pctCalorias = metaDiaActual.calorias > 0 
    ? Math.min(100, Math.round((registroHoy.calorias / metaDiaActual.calorias) * 100)) 
    : 0;
  const pctProteina = metaDiaActual.gramosProteina > 0 
    ? Math.min(100, Math.round((registroHoy.proteina / metaDiaActual.gramosProteina) * 100)) 
    : 0;
  const pctCarbs = metaDiaActual.gramosCarbs > 0 
    ? Math.min(100, Math.round((registroHoy.carbs / metaDiaActual.gramosCarbs) * 100)) 
    : 0;
  const pctGrasa = metaDiaActual.gramosGrasa > 0 
    ? Math.min(100, Math.round((registroHoy.grasa / metaDiaActual.gramosGrasa) * 100)) 
    : 0;

  const caloriasRestantes = metaDiaActual.calorias - registroHoy.calorias;

  // Abrir modal de registro cargando valores actuales si existen
  const abrirModalRegistro = (fechaTarget?: string) => {
    const fecha = fechaTarget || fechaSeleccionada;
    setFechaSeleccionada(fecha);
    const reg = registros[fecha];
    if (reg) {
      setInputCalorias(reg.calorias ? String(reg.calorias) : '');
      setInputProteina(reg.proteina ? String(reg.proteina) : '');
      setInputCarbs(reg.carbs ? String(reg.carbs) : '');
      setInputGrasa(reg.grasa ? String(reg.grasa) : '');
      setInputAgua(reg.agua ? String(reg.agua) : '2.5');
      setInputPeso(reg.peso ? String(reg.peso) : '');
    } else {
      setInputCalorias('');
      setInputProteina('');
      setInputCarbs('');
      setInputGrasa('');
      setInputAgua('2.5');
      setInputPeso('');
    }
    setModalRegistro(true);
  };

  // Guardar registro diario
  const guardarRegistroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCalorias && !inputProteina) return;
    setGuardando(true);

    const calNum = Number(inputCalorias) || 0;
    const pNum = Number(inputProteina) || 0;
    const cNum = Number(inputCarbs) || 0;
    const gNum = Number(inputGrasa) || 0;
    const aNum = Number(inputAgua) || 0;
    const pesoNum = inputPeso ? Number(inputPeso) : undefined;

    const nuevoReg: RegistroNutricionDiaria = {
      id: registros[fechaSeleccionada]?.id || `reg-${Date.now()}`,
      fecha: fechaSeleccionada,
      calorias: calNum,
      proteina: pNum,
      carbs: cNum,
      grasa: gNum,
      agua: aNum,
      peso: pesoNum
    };

    // Actualización local inmediata
    const mapaActualizado = { ...registros, [fechaSeleccionada]: nuevoReg };
    setRegistros(mapaActualizado);
    localStorage.setItem(claveLocalStorage, JSON.stringify(mapaActualizado));

    // Persistencia en Supabase
    if (sesion?.user?.id && sincronizadoNube) {
      await supabase
        .from('nutricion_diaria_mfp')
        .upsert({
          fecha: fechaSeleccionada,
          calorias: calNum,
          proteina: pNum,
          carbs: cNum,
          grasa: gNum,
          agua: aNum,
          peso: pesoNum,
          user_id: sesion.user.id,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,fecha' });
    }

    setGuardando(false);
    setModalRegistro(false);
    setNotificacion(`✅ Macros del ${formatearFechaBonita(fechaSeleccionada)} guardados correctamente.`);
    setTimeout(() => setNotificacion(null), 4000);
  };

  // Sumar agua rápido (+250ml o +500ml)
  const sumarAguaRapido = async (litrosDelta: number) => {
    const aguaActual = registroHoy.agua || 0;
    const nuevaAgua = Math.round((aguaActual + litrosDelta) * 10) / 10;
    const regActualizado: RegistroNutricionDiaria = {
      ...registroHoy,
      agua: nuevaAgua
    };

    const mapaActualizado = { ...registros, [fechaSeleccionada]: regActualizado };
    setRegistros(mapaActualizado);
    localStorage.setItem(claveLocalStorage, JSON.stringify(mapaActualizado));

    if (sesion?.user?.id && sincronizadoNube) {
      await supabase
        .from('nutricion_diaria_mfp')
        .upsert({
          fecha: fechaSeleccionada,
          calorias: regActualizado.calorias,
          proteina: regActualizado.proteina,
          carbs: regActualizado.carbs,
          grasa: regActualizado.grasa,
          agua: nuevaAgua,
          user_id: sesion.user.id
        }, { onConflict: 'user_id,fecha' });
    }
  };

  // Procesar importación de CSV exportado desde MyFitnessPal Premium
  const procesarCsvMyFitnessPal = async () => {
    if (!textoCsv.trim()) return;
    setProcesandoCsv(true);

    try {
      const lineas = textoCsv.split('\n').map(l => l.trim()).filter(Boolean);
      if (lineas.length < 2) {
        alert("El contenido del CSV no contiene suficientes datos.");
        setProcesandoCsv(false);
        return;
      }

      // Encontrar cabeceras
      const cabecera = lineas[0].toLowerCase().split(',').map(c => c.replace(/"/g, '').trim());
      const idxFecha = cabecera.findIndex(c => c.includes('date') || c.includes('fecha'));
      const idxCalorias = cabecera.findIndex(c => c.includes('calories') || c.includes('calorías'));
      const idxProteina = cabecera.findIndex(c => c.includes('protein') || c.includes('proteína'));
      const idxCarbs = cabecera.findIndex(c => c.includes('carb'));
      const idxGrasa = cabecera.findIndex(c => c.includes('fat') || c.includes('grasa'));

      if (idxFecha === -1 || idxCalorias === -1) {
        alert("No se identificaron las columnas 'Date' y 'Calories' en el archivo exportado.");
        setProcesandoCsv(false);
        return;
      }

      const nuevosRegistrosMap: Record<string, RegistroNutricionDiaria> = { ...registros };
      let importadosCount = 0;

      for (let i = 1; i < lineas.length; i++) {
        const valores = lineas[i].split(',').map(v => v.replace(/"/g, '').trim());
        const rawFecha = valores[idxFecha];
        if (!rawFecha) continue;

        // Normalizar fecha a YYYY-MM-DD
        let fechaIso = rawFecha;
        if (rawFecha.includes('/')) {
          const partes = rawFecha.split('/');
          if (partes.length === 3) {
            // Asumir YYYY/MM/DD o MM/DD/YYYY
            if (partes[0].length === 4) {
              fechaIso = `${partes[0]}-${partes[1].padStart(2, '0')}-${partes[2].padStart(2, '0')}`;
            } else if (partes[2].length === 4) {
              fechaIso = `${partes[2]}-${partes[0].padStart(2, '0')}-${partes[1].padStart(2, '0')}`;
            }
          }
        }

        const calorias = Number(valores[idxCalorias]) || 0;
        const proteina = idxProteina !== -1 ? (Number(valores[idxProteina]) || 0) : 0;
        const carbs = idxCarbs !== -1 ? (Number(valores[idxCarbs]) || 0) : 0;
        const grasa = idxGrasa !== -1 ? (Number(valores[idxGrasa]) || 0) : 0;

        if (calorias > 0 || proteina > 0) {
          nuevosRegistrosMap[fechaIso] = {
            id: `mfp-csv-${fechaIso}`,
            fecha: fechaIso,
            calorias,
            proteina,
            carbs,
            grasa,
            agua: nuevosRegistrosMap[fechaIso]?.agua || 0
          };
          importadosCount++;
        }
      }

      setRegistros(nuevosRegistrosMap);
      localStorage.setItem(claveLocalStorage, JSON.stringify(nuevosRegistrosMap));

      // Guardar en Supabase si la nube está conectada
      if (sesion?.user?.id && sincronizadoNube) {
        const payloadSupabase = Object.values(nuevosRegistrosMap).map(r => ({
          fecha: r.fecha,
          calorias: r.calorias,
          proteina: r.proteina,
          carbs: r.carbs,
          grasa: r.grasa,
          agua: r.agua,
          user_id: sesion.user.id
        }));

        await supabase.from('nutricion_diaria_mfp').upsert(payloadSupabase, { onConflict: 'user_id,fecha' });
      }

      setProcesandoCsv(false);
      setModalImportarCsv(false);
      setTextoCsv('');
      setNotificacion(`📥 Se importaron exitosamente ${importadosCount} días desde MyFitnessPal.`);
      setTimeout(() => setNotificacion(null), 5000);
    } catch (err) {
      alert("Error procesando CSV: " + (err instanceof Error ? err.message : String(err)));
      setProcesandoCsv(false);
    }
  };

  // Días de la semana para la cuadrícula Bento semanal
  const diasSemanaArray = useMemo(() => {
    // Calculamos los 7 días de la semana actual
    return diasSemanaNombres.map((nombreDia, idx) => {
      const meta = METAS_MFP[nombreDia];
      // Buscamos si hay fecha coincidente en los últimos 7 días o en la semana
      return {
        nombreDia,
        meta,
        idx
      };
    });
  }, []);

  const copiarSql = () => {
    navigator.clipboard.writeText(SQL_MIGRACION_MFP);
    setSqlCopiado(true);
    setTimeout(() => setSqlCopiado(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">

      {/* Banner de Estado / Notificación */}
      {notificacion && (
        <div className="bg-[#2D1C14] text-white p-4 rounded-3xl border border-[#4A3225] shadow-[0_8px_24px_rgba(45,28,20,0.2)] flex items-center justify-between gap-3 animate-fade-in sticky top-4 z-40">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0">🥗</span>
            <p className="text-xs sm:text-sm font-bold tracking-tight text-[#FAF7F4] truncate">
              {notificacion}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNotificacion(null)}
            className="text-xs font-bold text-[#E5C8B4] hover:text-white px-2 py-1 shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Barra de Sincronización y Acciones Rápidas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-3xl border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#2D1C14] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <IconNutrition className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-[#2D1C14] tracking-tight">
                Nutrición & Macros
              </h3>
              <span className="text-[9px] font-black uppercase text-[#8D6B57] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADBCE]/80">
                MyFitnessPal Sync
              </span>
            </div>
            <p className="text-[11px] text-[#8D6B57]">
              Objetivos personalizados sincronizados con tu ciclo de entrenamiento
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => abrirModalRegistro(fechaHoy)}
            className="flex-1 sm:flex-none bg-[#2D1C14] hover:bg-[#3E271D] text-white font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <IconBolt className="w-3.5 h-3.5" />
            <span>Registrar Hoy</span>
          </button>

          <button
            type="button"
            onClick={() => setModalImportarCsv(true)}
            className="flex-1 sm:flex-none bg-[#FAF5F0] hover:bg-[#F3ECE4] text-[#2D1C14] font-bold px-3.5 py-2.5 rounded-xl active:scale-95 transition-all text-xs border border-[#EADBCE] flex items-center justify-center gap-1.5 shadow-2xs"
            title="Importar CSV exportado de MyFitnessPal Premium"
          >
            <IconDownload className="w-3.5 h-3.5" />
            <span>Importar CSV</span>
          </button>

          {!sincronizadoNube && (
            <button
              type="button"
              onClick={() => setModalSql(true)}
              className="text-[11px] font-bold text-[#8D6B57] hover:text-[#2D1C14] bg-white border border-[#EADBCE]/80 px-2.5 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
              title="Activar Nube en Supabase"
            >
              <IconCloud className="w-3.5 h-3.5" />
              <span>Nube</span>
            </button>
          )}
        </div>
      </div>

      {/* Selector de Fecha Rápido (Hoy / Ayer) */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#6F4A39]">
        <span>Visualizando:</span>
        <button
          type="button"
          onClick={() => setFechaSeleccionada(fechaHoy)}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            fechaSeleccionada === fechaHoy 
              ? 'bg-[#2D1C14] text-white shadow-xs' 
              : 'bg-[#FAF5F0] text-[#8D6B57] hover:text-[#2D1C14]'
          }`}
        >
          Hoy ({getNombreDiaSemana(fechaHoy)})
        </button>

        <button
          type="button"
          onClick={() => setFechaSeleccionada(sumarDiasFechaStr(fechaHoy, -1))}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            fechaSeleccionada === sumarDiasFechaStr(fechaHoy, -1)
              ? 'bg-[#2D1C14] text-white shadow-xs' 
              : 'bg-[#FAF5F0] text-[#8D6B57] hover:text-[#2D1C14]'
          }`}
        >
          Ayer
        </button>

        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => e.target.value && setFechaSeleccionada(e.target.value)}
          className="p-1 px-2.5 bg-[#FAF5F0] text-[#2D1C14] rounded-xl border border-[#EADBCE] text-xs font-semibold outline-none"
        />
      </div>

      {/* ========================================================================= */}
      {/* 🌟 BENTO GRID HÉROE: DÍA ACTUAL / SELECCIONADO */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Tarjeta Héroe Calórica (7 columnas en desktop) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57]">
                  Meta Calórica Oficial MFP · {diaActualNombre}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-[#2D1C14] tracking-tight mt-0.5">
                  {metaDiaActual.tipoDia}
                </h2>
              </div>

              <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#2D1C14] text-white shadow-xs">
                {metaDiaActual.badge}
              </span>
            </div>

            <p className="text-xs text-[#8D6B57] leading-relaxed">
              {metaDiaActual.enfoque}
            </p>
          </div>

          {/* Medidor Principal de Calorías */}
          <div className="p-5 bg-[#FAF5F0] rounded-2xl border border-[#EADBCE]/70 space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[11px] font-bold text-[#8D6B57] block">Consumidas</span>
                <span className="text-3xl md:text-4xl font-black text-[#2D1C14] tracking-tight">
                  {registroHoy.calorias.toLocaleString()}
                </span>
                <span className="text-xs text-[#8D6B57] ml-1">/ {metaDiaActual.calorias} kcal</span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-[#8D6B57] block">
                  {caloriasRestantes >= 0 ? 'Restantes' : 'Superávit'}
                </span>
                <span className={`text-xl md:text-2xl font-black tracking-tight ${
                  caloriasRestantes >= 0 ? 'text-[#2D1C14]' : 'text-amber-800'
                }`}>
                  {Math.abs(caloriasRestantes).toLocaleString()} kcal
                </span>
              </div>
            </div>

            {/* Barra de Progreso Calórico */}
            <div className="w-full bg-[#EADBCE]/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 rounded-full bg-[#2D1C14] transition-all duration-700 ease-out"
                style={{ width: `${pctCalorias}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[11px] font-bold text-[#8D6B57]">
              <span>Progreso: {pctCalorias}%</span>
              <span>{pctCalorias >= 100 ? 'Meta alcanzada ✓' : `${metaDiaActual.calorias - registroHoy.calorias} kcal para el objetivo`}</span>
            </div>
          </div>

          {/* Acciones directas de la tarjeta héroe */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EADBCE]/50">
            <button
              type="button"
              onClick={() => abrirModalRegistro(fechaSeleccionada)}
              className="flex-1 py-2.5 px-4 bg-[#2D1C14] hover:bg-[#3E271D] text-white text-xs font-bold rounded-xl active:scale-95 transition-all text-center shadow-xs flex items-center justify-center gap-1.5"
            >
              {registroHoy.calorias > 0 ? (
                <>
                  <IconEdit className="w-3.5 h-3.5" />
                  <span>Actualizar Macros de este día</span>
                </>
              ) : (
                <>
                  <IconBolt className="w-3.5 h-3.5" />
                  <span>Registrar Macros de este día</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Bento Cards para Macronutrientes (5 columnas en desktop) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">

          {/* 🥩 Proteína */}
          <div className="bg-white p-4 rounded-3xl border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)] flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">🥩</span>
              <span className="text-[9px] font-black uppercase text-[#8D6B57] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADBCE]/60">
                P {metaDiaActual.pctProteina}%
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57] block">Proteína</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2D1C14] tracking-tight">{registroHoy.proteina}g</span>
                <span className="text-[11px] text-[#8D6B57]">/ {metaDiaActual.gramosProteina}g</span>
              </div>
            </div>

            <div className="w-full bg-[#FAF5F0] rounded-full h-2 overflow-hidden border border-[#EADBCE]/60">
              <div 
                className="h-2 rounded-full bg-[#4A3225] transition-all duration-500" 
                style={{ width: `${pctProteina}%` }}
              ></div>
            </div>

            <span className="text-[10px] font-bold text-[#8D6B57] text-right">
              {pctProteina}% cumplido
            </span>
          </div>

          {/* 🍞 Carbohidratos */}
          <div className="bg-white p-4 rounded-3xl border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)] flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">🍞</span>
              <span className="text-[9px] font-black uppercase text-[#8D6B57] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADBCE]/60">
                C {metaDiaActual.pctCarbs}%
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57] block">Carbohidratos</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2D1C14] tracking-tight">{registroHoy.carbs}g</span>
                <span className="text-[11px] text-[#8D6B57]">/ {metaDiaActual.gramosCarbs}g</span>
              </div>
            </div>

            <div className="w-full bg-[#FAF5F0] rounded-full h-2 overflow-hidden border border-[#EADBCE]/60">
              <div 
                className="h-2 rounded-full bg-[#6F4A39] transition-all duration-500" 
                style={{ width: `${pctCarbs}%` }}
              ></div>
            </div>

            <span className="text-[10px] font-bold text-[#8D6B57] text-right">
              {pctCarbs}% cumplido
            </span>
          </div>

          {/* 🥑 Grasas */}
          <div className="bg-white p-4 rounded-3xl border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)] flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">🥑</span>
              <span className="text-[9px] font-black uppercase text-[#8D6B57] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADBCE]/60">
                F {metaDiaActual.pctGrasa}%
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57] block">Grasas</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2D1C14] tracking-tight">{registroHoy.grasa}g</span>
                <span className="text-[11px] text-[#8D6B57]">/ {metaDiaActual.gramosGrasa}g</span>
              </div>
            </div>

            <div className="w-full bg-[#FAF5F0] rounded-full h-2 overflow-hidden border border-[#EADBCE]/60">
              <div 
                className="h-2 rounded-full bg-[#8D624D] transition-all duration-500" 
                style={{ width: `${pctGrasa}%` }}
              ></div>
            </div>

            <span className="text-[10px] font-bold text-[#8D6B57] text-right">
              {pctGrasa}% cumplido
            </span>
          </div>

          {/* 💧 Hidratación */}
          <div className="bg-white p-4 rounded-3xl border border-[#EADBCE]/80 shadow-[0_2px_16px_rgba(45,28,20,0.03)] flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-center">
              <IconDroplet className="w-5 h-5 text-sky-600" />
              <span className="text-[9px] font-black uppercase text-[#8D6B57] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADBCE]/60">
                Meta 3.0 L
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57] block">Agua</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2D1C14] tracking-tight">{registroHoy.agua || 0} L</span>
                <span className="text-[11px] text-[#8D6B57]">/ 3.0 L</span>
              </div>
            </div>

            {/* Botones rápidos de agregar agua */}
            <div className="flex gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => sumarAguaRapido(0.25)}
                className="flex-1 py-1 text-[10px] font-bold bg-[#FAF5F0] hover:bg-[#F3ECE4] text-[#2D1C14] rounded-lg border border-[#EADBCE]/60 transition-all active:scale-95"
              >
                +250ml
              </button>
              <button
                type="button"
                onClick={() => sumarAguaRapido(0.5)}
                className="flex-1 py-1 text-[10px] font-bold bg-[#FAF5F0] hover:bg-[#F3ECE4] text-[#2D1C14] rounded-lg border border-[#EADBCE]/60 transition-all active:scale-95"
              >
                +500ml
              </button>
            </div>

            <span className="text-[10px] font-bold text-[#8D6B57] text-right">
              {Math.min(100, Math.round(((registroHoy.agua || 0) / 3.0) * 100))}% meta
            </span>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 📅 BENTO GRID SEMANAL: CALENDARIO DE 7 DÍAS CON METAS MFP */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-extrabold text-[#2D1C14] uppercase tracking-wider">
            Plan Semanal de Objetivos MyFitnessPal
          </h3>
          <span className="text-xs text-[#8D6B57] font-semibold">
            Ciclo de Nutrición Adaptativo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {diasSemanaArray.map(({ nombreDia, meta }) => {
            const esHoy = nombreDia === diaActualNombre;
            return (
              <div 
                key={nombreDia}
                className={`p-4 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                  esHoy 
                    ? 'bg-white border-[#2D1C14] shadow-md ring-1 ring-[#2D1C14]' 
                    : 'bg-white/80 border-[#EADBCE]/80 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-black block ${esHoy ? 'text-[#2D1C14]' : 'text-[#6F4A39]'}`}>
                      {nombreDia}
                    </span>
                    <span className="text-[9px] font-bold text-[#8D6B57] block truncate max-w-[100px]">
                      {meta.tipoDia}
                    </span>
                  </div>

                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#FAF5F0] text-[#2D1C14] border border-[#EADBCE]/60">
                    {meta.calorias}k
                  </span>
                </div>

                <div className="space-y-1 text-[10px] font-semibold text-[#6F4A39]">
                  <div className="flex justify-between">
                    <span>🥩 Proteína:</span>
                    <span className="font-bold text-[#2D1C14]">{meta.gramosProteina}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🍞 Carbs:</span>
                    <span className="font-bold text-[#2D1C14]">{meta.gramosCarbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥑 Grasas:</span>
                    <span className="font-bold text-[#2D1C14]">{meta.gramosGrasa}g</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EADBCE]/40">
                  <span className="text-[9px] font-bold text-[#8D6B57] block truncate">
                    C {meta.pctCarbs}% · P {meta.pctProteina}% · F {meta.pctGrasa}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📝 MODAL: REGISTRO RÁPIDO DE MACROS */}
      {/* ========================================================================= */}
      {modalRegistro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#EADBCE] shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#EADBCE]/60">
              <div>
                <h3 className="text-sm font-black text-[#2D1C14] flex items-center gap-2">
                  <span>⚡</span> Registrar Macros del Día
                </h3>
                <p className="text-[10px] text-[#8D6B57]">
                  {formatearFechaBonita(fechaSeleccionada)} ({diaActualNombre})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalRegistro(false)}
                className="text-[#8D6B57] hover:text-[#2D1C14] text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <form onSubmit={guardarRegistroSubmit} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8D6B57] block mb-1">
                  Calorías Totales (kcal) · Meta: {metaDiaActual.calorias}
                </label>
                <input
                  type="number"
                  placeholder={`Ej. ${metaDiaActual.calorias}`}
                  value={inputCalorias}
                  onChange={(e) => setInputCalorias(e.target.value)}
                  className="w-full p-3 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-black text-lg text-[#2D1C14] outline-none"
                  autoFocus
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                    🥩 Prot (g)
                  </label>
                  <input
                    type="number"
                    placeholder={`Meta ${metaDiaActual.gramosProteina}`}
                    value={inputProteina}
                    onChange={(e) => setInputProteina(e.target.value)}
                    className="w-full p-2.5 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-bold text-sm text-[#2D1C14] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                    🍞 Carbs (g)
                  </label>
                  <input
                    type="number"
                    placeholder={`Meta ${metaDiaActual.gramosCarbs}`}
                    value={inputCarbs}
                    onChange={(e) => setInputCarbs(e.target.value)}
                    className="w-full p-2.5 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-bold text-sm text-[#2D1C14] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                    🥑 Grasa (g)
                  </label>
                  <input
                    type="number"
                    placeholder={`Meta ${metaDiaActual.gramosGrasa}`}
                    value={inputGrasa}
                    onChange={(e) => setInputGrasa(e.target.value)}
                    className="w-full p-2.5 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-bold text-sm text-[#2D1C14] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                    💧 Agua (Litros)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={inputAgua}
                    onChange={(e) => setInputAgua(e.target.value)}
                    className="w-full p-2.5 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-bold text-sm text-[#2D1C14] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                    ⚖️ Peso (kg, opcional)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ej. 74.5"
                    value={inputPeso}
                    onChange={(e) => setInputPeso(e.target.value)}
                    className="w-full p-2.5 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 focus:bg-white focus:border-[#2D1C14] font-bold text-sm text-[#2D1C14] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalRegistro(false)}
                  className="w-1/3 py-2.5 text-xs font-semibold rounded-xl text-[#8D6B57] hover:bg-[#FAF5F0]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="w-2/3 py-2.5 bg-[#2D1C14] hover:bg-[#3E271D] text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-xs disabled:opacity-50"
                >
                  {guardando ? 'Guardando...' : 'Guardar Macros'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📥 MODAL: IMPORTADOR DE CSV DE MYFITNESSPAL PREMIUM */}
      {/* ========================================================================= */}
      {modalImportarCsv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-[#EADBCE] shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#EADBCE]/60">
              <div>
                <h3 className="text-sm font-black text-[#2D1C14] flex items-center gap-2">
                  <span>📥</span> Importar Datos de MyFitnessPal Premium
                </h3>
                <p className="text-[10px] text-[#8D6B57]">
                  Carga tus días históricos exportados desde la app
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalImportarCsv(false)}
                className="text-[#8D6B57] hover:text-[#2D1C14] text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#6F4A39]">
              <p className="font-semibold text-[#2D1C14]">
                ¿Cómo exportar desde MyFitnessPal Premium?
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#6F4A39]">
                <li>En la app de MFP, ve a <strong>Más / Perfil</strong> ➔ <strong>Nutrición</strong>.</li>
                <li>Toca el icono de <strong>Exportar</strong> (arriba a la derecha).</li>
                <li>Abre el CSV descargado, copia su contenido y pégalo abajo (o arrastra el archivo).</li>
              </ol>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-[#8D6B57] block mb-1">
                Pega aquí el contenido del CSV o arrastra el archivo:
              </label>
              <textarea
                rows={6}
                placeholder="Date,Calories,Protein,Carbohydrates,Fat..."
                value={textoCsv}
                onChange={(e) => setTextoCsv(e.target.value)}
                className="w-full p-3 border border-[#EADBCE] rounded-xl bg-[#FAF5F0]/60 font-mono text-[10px] text-[#2D1C14] outline-none focus:bg-white focus:border-[#2D1C14]"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setModalImportarCsv(false)}
                className="w-1/3 py-2.5 text-xs font-semibold rounded-xl text-[#8D6B57] hover:bg-[#FAF5F0]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={procesarCsvMyFitnessPal}
                disabled={procesandoCsv || !textoCsv.trim()}
                className="w-2/3 py-2.5 bg-[#2D1C14] hover:bg-[#3E271D] text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-xs disabled:opacity-50"
              >
                {procesandoCsv ? 'Procesando...' : '📥 Procesar e Importar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ☁️ MODAL: ACTIVAR NUBE SUPABASE (SCRIPT SQL) */}
      {/* ========================================================================= */}
      {modalSql && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-[#EADBCE] shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#EADBCE]/60">
              <h3 className="text-sm font-black text-[#2D1C14] flex items-center gap-2">
                <span>☁️</span> Activar Nube de Nutrición en Supabase
              </h3>
              <button
                type="button"
                onClick={() => setModalSql(false)}
                className="text-[#8D6B57] hover:text-[#2D1C14] text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>

            <p className="text-xs text-[#6F4A39]">
              Para sincronizar tus macros automáticamente en todos tus dispositivos, ejecuta este script en el <strong>SQL Editor</strong> de Supabase:
            </p>

            <pre className="p-3 bg-[#FAF5F0] rounded-xl text-[10px] font-mono text-[#2D1C14] overflow-x-auto max-h-40 border border-[#EADBCE]/70 select-all">
              {SQL_MIGRACION_MFP}
            </pre>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={copiarSql}
                className="flex-1 py-2.5 bg-[#2D1C14] hover:bg-[#3E271D] text-white text-xs font-bold rounded-xl active:scale-95 transition-all shadow-xs"
              >
                {sqlCopiado ? '✅ ¡Copiado!' : '📋 Copiar Script SQL'}
              </button>

              <a
                href="https://supabase.com/dashboard/project/ktxbonxgrnpzearsgvtc/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-[#FAF5F0] hover:bg-[#F3ECE4] text-[#2D1C14] border border-[#EADBCE] rounded-xl text-xs font-bold active:scale-95 transition-all shadow-2xs flex items-center justify-center gap-1.5 text-center"
              >
                <span>🚀</span>
                <span>Abrir SQL Editor</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
