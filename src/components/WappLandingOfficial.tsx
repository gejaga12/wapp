'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Code2,
  Smartphone,
  Database,
  Cloud,
  Bot,
  Layout,
  Send,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Github,
  Sparkles,
  Loader2,
  Cpu,
  Layers,
  BarChart3,
  Rocket,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


// --- UTILIDADES Y CONSTANTES DE MARCA ---

type ViewType = 'home' | 'service-details';


const BRAND = {
  colors: {
    navy: '#0B2C3C', // Azul Profundo WAPP
    teal: '#1B9FA3', // Turquesa WAPP
    white: '#FFFFFF',
    grayBg: '#F8FAFC', // Fondo gris muy suave
    whatsapp: '#25D366', // Verde WhatsApp
  },
  contact: {
    phone: '5493625201249', // Número del manual
    email: 'contacto@wapp.software',
  },
};

// --- DATOS DE SERVICIOS DETALLADOS ---

const SERVICE_DETAILS: Record<
  string,
  {
    title: string;
    icon: React.ReactNode;
    description: string;
    features: string[];
    stack: string[];
    example: string;
  }
> = {
  web: {
    title: 'Desarrollo Web & Plataformas',
    icon: <Layout className="w-12 h-12" />,
    description:
      'Creamos aplicaciones web progresivas (PWA) y plataformas corporativas que no solo se ven bien, sino que funcionan a la velocidad del rayo. Nos especializamos en paneles administrativos, SaaS y portales de cliente.',
    features: [
      'Next.js App Router para máximo rendimiento',
      'Diseño UI/UX centrado en conversión',
      'Integración con pasarelas de pago y ERPs',
      'SEO Técnico optimizado desde el código',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    example:
      'Caso real: Panel de gestión para empresa logística que redujo tiempos de carga administrativa en un 40%.',
  },
  mobile: {
    title: 'Desarrollo de Apps Móviles',
    icon: <Smartphone className="w-12 h-12" />,
    description:
      'Lleva tu negocio al bolsillo de tus clientes. Desarrollamos aplicaciones nativas y multiplataforma que aprovechan todo el potencial del hardware móvil (cámara, GPS, notificaciones).',
    features: [
      'iOS y Android con un solo código base (React Native)',
      'Notificaciones Push inteligentes',
      'Modo Offline (sin internet)',
      'Geolocalización en tiempo real',
    ],
    stack: ['React Native', 'Expo', 'Firebase', 'Google Maps API'],
    example:
      'Caso real: App de mantenimiento edilicio con escáner QR para control de rondas de técnicos.',
  },
  backend: {
    title: 'Backend & Arquitectura API',
    icon: <Database className="w-12 h-12" />,
    description:
      'El motor invisible de tu negocio. Construimos APIs robustas, seguras y escalables que conectan todos tus sistemas y manejan la lógica de negocio compleja.',
    features: [
      'Microservicios escalables',
      'Bases de datos SQL y NoSQL',
      'Autenticación segura (OAuth2, JWT)',
      'Websockets para datos en tiempo real',
    ],
    stack: ['NestJS', 'Node.js', 'PostgreSQL', 'Docker'],
    example:
      'Caso real: API de sincronización de stock en tiempo real para cadena de retail con 20 sucursales.',
  },
  cloud: {
    title: 'Cloud Computing & DevOps',
    icon: <Cloud className="w-12 h-12" />,
    description:
      'Olvídate de servidores físicos. Migramos y gestionamos tu infraestructura en la nube para garantizar disponibilidad del 99.9% y seguridad de grado bancario.',
    features: [
      'Infraestructura como Código (IaC)',
      'CI/CD Pipelines automatizados',
      'Serverless Functions',
      'Monitoreo y Alertas 24/7',
    ],
    stack: ['Google Cloud Platform', 'AWS', 'Firebase', 'Kubernetes'],
    example:
      'Caso real: Migración de servidor legacy a arquitectura Serverless reduciendo costos de hosting un 60%.',
  },
  ai: {
    title: 'Inteligencia Artificial Integrada',
    icon: <Bot className="w-12 h-12" />,
    description:
      'Potencia tu software con IA. Desde chatbots de atención al cliente hasta análisis predictivo de datos, integramos modelos de lenguaje para automatizar tareas.',
    features: [
      'Chatbots con contexto de negocio',
      'Análisis de sentimientos',
      'Procesamiento de documentos (OCR + IA)',
      'Recomendadores inteligentes',
    ],
    stack: ['OpenAI API', 'Gemini', 'Python', 'TensorFlow'],
    example:
      'Caso real: Asistente virtual para inmobiliaria que pre-califica leads automáticamente vía WhatsApp.',
  },
  consulting: {
    title: 'Consultoría Tecnológica',
    icon: <Code2 className="w-12 h-12" />,
    description:
      'No solo escribimos código, pensamos en tu negocio. Te ayudamos a tomar decisiones técnicas correctas, auditar sistemas existentes y planificar tu transformación digital.',
    features: [
      'Auditoría de Código y Seguridad',
      'Refactorización de Sistemas Legacy',
      'Planificación de Arquitectura',
      'Mentoria a equipos internos',
    ],
    stack: ['Agile', 'Scrum', 'Architecture Design', 'Tech Due Diligence'],
    example:
      'Caso real: Plan de transformación digital para empresa de seguros, modernizando procesos de 15 años de antigüedad.',
  },
};

// --- COMPONENTES BASE ---

const WappLogo = ({
  className = 'h-10',
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg
      viewBox="0 0 162 125"
      className="h-full w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.5 0L0 125H32L54.5 48L36.5 0Z"
        fill={dark ? BRAND.colors.white : BRAND.colors.navy}
      />
      <path
        d="M81 125L58.5 48H90.5L103.5 93L81 125Z"
        fill={BRAND.colors.teal}
      />
      <path
        d="M125.5 0L162 0L125.5 125H93.5L125.5 0Z"
        fill={dark ? BRAND.colors.white : BRAND.colors.navy}
      />
    </svg>
    <div className="flex flex-col justify-center h-full">
      <span
        className="text-2xl font-bold tracking-tight leading-none font-harabara"
        style={{ color: dark ? BRAND.colors.white : BRAND.colors.navy }}
      >
        WAPP
      </span>
      <span
        className="text-[9px] font-bold tracking-[0.2em] uppercase leading-none mt-1"
        style={{ color: dark ? '#CBD5E1' : BRAND.colors.navy }}
      >
        Software Factory
      </span>
    </div>
  </div>
);

// Icono de WhatsApp SVG
const WhatsAppIcon = ({
  className = 'w-6 h-6',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382C17.112 14.022 15.318 13.038 14.982 12.918C14.646 12.798 14.406 12.738 14.166 13.098C13.926 13.458 13.242 14.382 13.038 14.622C12.834 14.862 12.63 14.904 12.27 14.724C11.91 14.544 10.752 14.13 9.37799 12.906C8.28599 11.934 7.54799 10.728 7.33799 10.368C7.12799 10.008 7.31399 9.816 7.49399 9.636C7.65599 9.474 7.85399 9.216 8.03399 9.006C8.21399 8.796 8.27399 8.64 8.39399 8.394C8.51399 8.148 8.45399 7.938 8.36399 7.758C8.27399 7.578 7.55399 5.802 7.25399 5.082C6.95999 4.386 6.66599 4.482 6.44999 4.482C6.24599 4.476 6.01199 4.476 5.77799 4.476C5.54399 4.476 5.15999 4.566 4.84199 4.914C4.52399 5.262 3.61199 6.114 3.61199 7.848C3.61199 9.582 4.87799 11.256 5.05799 11.496C5.23799 11.736 7.56599 15.534 11.25 16.962C13.998 18.03 14.634 17.868 15.468 17.766C16.41 17.652 18.198 16.632 18.57 15.582C18.942 14.532 18.942 13.626 18.828 13.428C18.714 13.23 18.522 13.122 18.162 12.942H17.472V14.382ZM12.042 21.48C10.368 21.48 8.73599 21.024 7.28999 20.172L6.94799 19.968L3.28799 20.928L4.27199 17.43L4.04399 17.064C3.10199 15.558 2.60999 13.83 2.60999 12.042C2.60999 6.834 6.84599 2.598 12.048 2.598C14.568 2.598 16.938 3.582 18.714 5.364C20.496 7.146 21.48 9.522 21.48 12.042C21.48 17.25 17.244 21.48 12.042 21.48ZM12.042 0.6C5.73599 0.6 0.605988 5.73 0.605988 12.042C0.605988 14.064 1.13399 15.972 2.06999 17.646L0.629988 22.896L6.00599 21.486C7.59599 22.356 9.40199 22.818 11.238 22.818H12.042C18.348 22.818 23.478 17.688 23.478 11.376C23.478 11.028 23.46 10.686 23.418 10.35C23.166 4.632 18.258 0.6 12.042 0.6Z" />
  </svg>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ' +
    'disabled:pointer-events-none ring-offset-white font-candara';

  const variants: Record<string, string> = {
    primary: 'text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'text-white shadow-md hover:shadow-lg',
    outline: 'border-2 bg-transparent hover:bg-slate-50',
    ghost: 'hover:bg-slate-100',
  };

  const style =
    variant === 'primary'
      ? { backgroundColor: BRAND.colors.teal }
      : variant === 'secondary'
        ? { backgroundColor: BRAND.colors.navy }
        : variant === 'outline'
          ? { borderColor: BRAND.colors.navy, color: BRAND.colors.navy }
          : {};

  return (
    <button
      className={`${baseStyle} ${variants[variant]} h-12 px-6 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 ${className} ${onClick ? 'cursor-pointer hover:border-[#1B9FA3] hover:-translate-y-1' : ''
      }`}
  >
    {children}
  </div>
);

const Badge = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${className}`}
    style={{ backgroundColor: BRAND.colors.teal + '15', color: BRAND.colors.navy }}
  >
    {children}
  </span>
);

const SectionTitle = ({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <Badge className="mb-4">WAPP Software Factory</Badge>
    <h2
      className="text-3xl md:text-4xl font-bold mb-4 font-harabara"
      style={{ color: BRAND.colors.navy }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`text-lg text-slate-600 max-w-2xl ${centered ? 'mx-auto' : ''
          } font-candara`}
      >
        {subtitle}
      </p>
    )}
    <div
      className={`mt-6 h-1 w-20 rounded-full ${centered ? 'mx-auto' : ''}`}
      style={{ backgroundColor: BRAND.colors.teal }}
    />
  </div>
);

// --- COMPONENTES ESPECÍFICOS ---

const PromoBannerTop = () => (
  <div className="w-full py-3 bg-gradient-to-r from-[#0B2C3C] to-[#14425A] text-white text-center overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    <div className="container mx-auto px-4 flex justify-center items-center gap-2 relative z-10 animate-pulse">
      <Rocket size={18} className="text-[#1B9FA3]" />
      <span className="font-medium text-sm md:text-base tracking-wide font-candara">
        ¿Te imaginas la app de tu empresa?{' '}
        <span className="text-[#1B9FA3] font-bold">Nosotros la construimos.</span>
      </span>
    </div>
  </div>
);

const PromoBannerCTA = ({ onAction }: { onAction: () => void }) => (
  <div className="w-full bg-[#1B9FA3] py-12 relative overflow-hidden my-12">
    <div className="absolute inset-0 bg-[#0B2C3C] opacity-10 transform skew-x-12 scale-150" />
    <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-white text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold font-harabara mb-2">
          ¿Tienes dudas sobre tu proyecto?
        </h3>
        <p className="text-white/90 text-lg font-candara">
          Sácate la duda gratuita con un experto ahora mismo.
        </p>
      </div>
      <button
        onClick={onAction}
        className="bg-white text-[#0B2C3C] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-candara"
      >
        <MessageSquare size={20} />
        Consultar Experto
      </button>
    </div>
  </div>
);

// --- BOTONES FLOTANTES (ROBOT + WHATSAPP) ---

const FloatingButtons = ({
  isAiOpen,
  onAiOpen,
}: {
  isAiOpen: boolean;
  onAiOpen: () => void;
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${BRAND.contact.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white group relative"
        style={{ backgroundColor: BRAND.colors.whatsapp }}
      >
        <WhatsAppIcon className="w-8 h-8 text-white fill-current" color="white" />
        <span className="absolute right-full mr-4 bg-white px-3 py-1 rounded-lg text-sm font-bold shadow-md text-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-candara">
          Contáctanos
        </span>
      </motion.a>

      {/* Robot Button */}
      {!isAiOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={onAiOpen}
          className="w-16 h-16 bg-[#0B2C3C] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#1B9FA3] group relative"
        >
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <Bot size={32} className="text-white group-hover:animate-bounce" />
          <span className="absolute right-full mr-4 bg-white px-3 py-1 rounded-lg text-sm font-bold shadow-md text-[#0B2C3C] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-candara">
            ¡Valida tu idea! 🤖
          </span>
        </motion.button>
      )}
    </div>
  );
};

// --- AI MODAL ---

type AnalysisResult = {
  stack: string[];
  features: string[];
  complexity: string;
  verdict: string;
};

const AIModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (isOpen && !analysis) setIdea('');
  }, [isOpen, analysis]);

  const analyzeProject = async () => {
    if (!idea.trim()) return;

    setLoading(true);
    setAnalysis(null);

    const apiKey = ''; // poné tu API KEY de Gemini aquí

    const prompt = `Actúa como el CTO experto de WAPP Software Factory. Analiza: "${idea}". Devuelve JSON: {"stack":[],"features":[],"complexity":"Baja/Media/Alta","verdict":"comentario corto"}.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text) as AnalysisResult;
        setAnalysis(parsed);
      }
    } catch (e) {
      setAnalysis({
        stack: ['Intenta de nuevo'],
        features: ['Error de conexión'],
        complexity: '?',
        verdict: 'Hubo un error.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="bg-[#0B2C3C] p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B9FA3] flex items-center justify-center">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-harabara text-lg">
                    WAPP CTO Virtual
                  </h3>
                  <p className="text-xs text-slate-300 font-candara">
                    Impulsado por Gemini AI ✨
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar font-candara">
              {!analysis ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-bold text-[#0B2C3C]">
                      ¡Hola! Cuéntame tu idea
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Analizaré la viabilidad técnica, el stack recomendado y la
                      complejidad.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-[#1B9FA3] transition-all">
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="w-full bg-transparent outline-none resize-none text-slate-700 min-h-[120px]"
                      placeholder="Ej: Quiero una plataforma para gestionar turnos médicos..."
                    />
                  </div>

                  <Button
                    onClick={analyzeProject}
                    disabled={loading || !idea.trim()}
                    className="w-full h-14 text-lg rounded-xl shadow-lg"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    {loading ? 'Analizando...' : 'Analizar mi Proyecto'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                    <p className="text-sm text-slate-500 italic mb-1">
                      Tu idea:
                    </p>
                    <p className="text-slate-700 font-medium line-clamp-2">
                      "{idea}"
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#1B9FA3] uppercase tracking-wider mb-1 block">
                      Veredicto Profesional
                    </span>
                    <p className="text-[#0B2C3C] font-medium text-lg border-l-4 border-[#1B9FA3] pl-4 py-1">
                      "{analysis.verdict}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0B2C3C]/5 p-3 rounded-lg border border-[#0B2C3C]/10">
                      <div className="flex items-center gap-2 mb-2 text-[#0B2C3C]">
                        <Cpu size={16} />
                        <span className="font-bold text-xs uppercase">
                          Stack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {analysis.stack.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white border px-1.5 py-0.5 rounded text-slate-600 font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#0B2C3C]/5 p-3 rounded-lg border border-[#0B2C3C]/10">
                      <div className="flex items-center gap-2 mb-2 text-[#0B2C3C]">
                        <BarChart3 size={16} />
                        <span className="font-bold text-xs uppercase">
                          Complejidad
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#1B9FA3]">
                        {analysis.complexity}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0B2C3C] p-4 rounded-xl text-white">
                    <div className="flex items-center gap-2 mb-3 text-[#1B9FA3]">
                      <Layers size={18} />
                      <span className="font-bold text-sm">Features Clave</span>
                    </div>
                    <ul className="space-y-2">
                      {analysis.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-300"
                        >
                          <CheckCircle
                            size={14}
                            className="mt-1 text-[#1B9FA3] shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setAnalysis(null)}
                    className="w-full"
                  >
                    Analizar otra idea
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Vista detalle de servicio
const ServiceDetailView = ({
  serviceKey,
  onBack,
}: {
  serviceKey: string | null;
  onBack: () => void;
}) => {
  if (!serviceKey) return null;
  const service = SERVICE_DETAILS[serviceKey];
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50 font-candara"
    >
      <div className="container mx-auto px-4 md:px-6">
        <button
          onClick={onBack}
          className="group flex items-center text-slate-500 hover:text-[#1B9FA3] mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />{' '}
          Volver a Servicios
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-6 text-[#1B9FA3] border border-slate-100">
              {service.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B2C3C] font-harabara mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="bg-white p-8 rounded-2xl border-l-4 border-[#1B9FA3] shadow-sm mb-8">
              <h3 className="font-bold text-[#0B2C3C] mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-[#1B9FA3]" /> Impacto Real
              </h3>
              <p className="text-slate-700 italic">"{service.example}"</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    className="text-[#1B9FA3] mt-1 shrink-0"
                  />
                  <span className="text-slate-700 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B2C3C] rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B9FA3] rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-2xl font-bold font-harabara mb-8 relative z-10">
              Stack Tecnológico
            </h3>
            <div className="space-y-6 relative z-10">
              {service.stack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="font-medium text-lg">{tech}</span>
                  <Code2 size={20} className="text-[#1B9FA3]" />
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-slate-300 mb-6">¿Listo para empezar?</p>
              <Button
                variant="primary"
                className="w-full text-lg h-14"
                onClick={() =>
                  document.getElementById('contacto')?.scrollIntoView()
                }
              >
                Solicitar Presupuesto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Casos', href: '#casos' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proceso', href: '#proceso' },
];

const Navbar = ({
  onViewChange,
}: {
  onViewChange: React.Dispatch<React.SetStateAction<any>>; // Ajustá el tipo ViewType si lo tenés importado
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    onViewChange('home');
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm pb-2'
          : 'bg-transparent'
      }`}
    >
      <PromoBannerTop />

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between mt-2">
        <button
          onClick={() => handleNav('#inicio')}
          className="hover:opacity-80 transition-opacity"
        >
          {/* AQUÍ ESTÁ EL CAMBIO PARA USAR logo.png */}
          <Image
            src="/wapp/logo-ok.svg"
            alt="Logo"
            width={180} // Ancho base para mantener calidad (ajustalo según el ratio de tu imagen)
            height={60} // Alto base
            className="h-10 md:h-12 w-auto object-contain" // w-auto mantiene la proporción
            priority // Carga prioritaria al ser el logo del navbar
          />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-sm font-medium transition-colors hover:text-[#1B9FA3] font-candara"
              style={{ color: BRAND.colors.navy }}
            >
              {item.label}
            </button>
          ))}
          <Button variant="primary" onClick={() => handleNav('#contacto')}>
            Agendar reunión
          </Button>
        </nav>

        <button
          className="lg:hidden text-[#0B2C3C]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 top-[100px] bg-white z-40 overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-6 items-center text-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-xl font-medium font-harabara"
                  style={{ color: BRAND.colors.navy }}
                >
                  {item.label}
                </button>
              ))}
              <Button
                className="w-full max-w-xs mt-4"
                onClick={() => handleNav('#contacto')}
              >
                Agendar reunión
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- APP COMPONENT ---

export default function WappLandingOfficial() {
  const [view, setView] = useState<ViewType>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleServiceClick = (key: string) => {
    setSelectedService(key);
    setView('service-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedService(null);
  };

    const stack = [
    { name: 'Next.js', logo: '/stack/next.svg' },
    { name: 'React', logo: '/stack/react.svg' },
    { name: 'React Native', logo: '/stack/react-native.svg' },
    { name: 'NestJS', logo: '/stack/nestjs.svg' },
    { name: 'Node.js', logo: '/stack/nodejs.svg' },
    { name: 'Firebase', logo: '/stack/firebase.svg' },
    { name: 'Google Cloud', logo: '/stack/google-cloud.svg' },
    { name: 'Google Gemini', logo: '/stack/gemini.svg' },
    { name: 'TypeScript', logo: '/stack/typescript.svg' },
    { name: 'Vercel', logo: '/stack/vercel.svg' },
    { name: 'Apple iOS', logo: '/stack/apple.svg' },
    { name: 'Android', logo: '/stack/android.svg' },
  ];

  return (
    <div className="min-h-screen bg-white font-candara selection:bg-[#1B9FA3] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600&family=Saira:wght@700&display=swap');
        .font-harabara { font-family: 'Saira', sans-serif; font-weight: 700; }
        .font-candara { font-family: 'Cabin', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <Navbar onViewChange={setView} />

      <FloatingButtons
        isAiOpen={showAiModal}
        onAiOpen={() => setShowAiModal(true)}
      />
      <AIModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />

      <main>
        {view === 'home' ? (
          <>
            {/* HERO */}
            <section
              id="inicio"
              className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative"
              style={{ backgroundColor: BRAND.colors.grayBg }}
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full fill-[#0B2C3C]"
                >
                  <path
                    d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.6,-41.3C84.1,-27,88.8,-12,87.6,2.6C86.4,17.2,79.2,31.4,69.5,43.3C59.8,55.2,47.6,64.8,34.3,70.9C21,77,6.6,79.6,-6.9,77.7C-20.4,75.8,-33,69.4,-44.6,60.6C-56.2,51.8,-66.8,40.6,-73.4,27.3C-80,14,-82.6,-1.4,-78.9,-15.8C-75.1,-30.2,-65,-43.6,-52.8,-50.9C-40.6,-58.2,-26.3,-59.4,-12.9,-59.9C0.5,-60.4,13.9,-60.2,32.5,-83.3L45.7,-76.3Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>

              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-8"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: BRAND.colors.teal }}
                      />
                      <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                        Software Factory Certificada
                      </span>
                    </div>

                    <h1
                      className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-harabara"
                      style={{ color: BRAND.colors.navy }}
                    >
                      Transformamos ideas en{' '}
                      <span className="text-[#1B9FA3]">
                        soluciones digitales
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed font-candara">
                      Somos tu equipo tecnológico extendido. Desarrollamos apps,
                      plataformas web y sistemas a medida.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button
                        onClick={() =>
                          document
                            .getElementById('contacto')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                      >
                        Hablar con WAPP
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          document
                            .getElementById('casos')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                      >
                        Ver casos de éxito
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-slate-100 bg-white min-h-[400px] flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-[size:40px_40px] opacity-10 bg-[linear-gradient(#0B2C3C_1px,transparent_1px),linear-gradient(90deg,#0B2C3C_1px,transparent_1px)]" />
                      <Code2
                        size={64}
                        className="text-[#1B9FA3] animate-pulse"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SERVICIOS */}
            <section id="servicios" className="py-24 bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <SectionTitle
                  title="Nuestros Servicios"
                  subtitle="Haz click en cada servicio para ver más detalles y ejemplos."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      k: 'web',
                      i: <Layout />,
                      t: 'Desarrollo Web',
                      d: 'Plataformas escalables con Next.js.',
                    },
                    {
                      k: 'mobile',
                      i: <Smartphone />,
                      t: 'Desarrollo Mobile',
                      d: 'Apps nativas iOS y Android.',
                    },
                    {
                      k: 'backend',
                      i: <Database />,
                      t: 'Backend & APIs',
                      d: 'Arquitectura robusta en NestJS.',
                    },
                    {
                      k: 'cloud',
                      i: <Cloud />,
                      t: 'Cloud & DevOps',
                      d: 'Infraestructura GCP y Firebase.',
                    },
                    {
                      k: 'ai',
                      i: <Bot />,
                      t: 'Integración IA',
                      d: 'Soluciones inteligentes y automatización.',
                    },
                    {
                      k: 'consulting',
                      i: <Code2 />,
                      t: 'Consultoría',
                      d: 'Auditoría y modernización de sistemas.',
                    },
                  ].map((s, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        className="p-8 h-full group"
                        onClick={() => handleServiceClick(s.k)}
                      >
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-[#0B2C3C]/10 text-[#0B2C3C] group-hover:text-[#1B9FA3] transition-colors">
                          {React.cloneElement(s.i as React.ReactElement, {
                            size: 28,
                          })}
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-harabara text-[#0B2C3C] group-hover:text-[#1B9FA3] transition-colors flex items-center gap-2">
                          {s.t}{' '}
                          <ArrowRight
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </h3>
                        <p className="text-slate-600">{s.d}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <PromoBannerCTA onAction={() => setShowAiModal(true)} />

            {/* CLIENTES */}
            <section
              id="clientes"
              className="py-20"
              style={{ backgroundColor: BRAND.colors.navy }}
            >
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-2 font-harabara text-white">
                  Confían en WAPP
                </h3>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 mt-12">
                  {[
                    { name: 'Hogar', src: '/clientes/hogar.png' },
                    { name: 'Denver', src: '/clientes/denver.png' },
                    { name: 'Costos', src: '/clientes/costos.png' },
                  ].map((cliente, i) => (
                    <div
                      key={i}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={cliente.src}
                        alt={cliente.name}
                        width={180}
                        height={80}
                        className="object-contain max-h-16 w-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CASOS */}
            <section id="casos" className="py-24 bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <SectionTitle title="Casos de Éxito" />
                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    {
                      c: 'Hogar',
                      t: 'App Mobile + Panel',
                      d: 'Digitalización de mantenimiento con control QR.',
                    },
                    {
                      c: 'Denver',
                      t: 'Gestión Operativa',
                      d: 'App mobile y dashboard para logística.',
                    },
                    {
                      c: 'Costos',
                      t: 'Plataforma SaaS',
                      d: 'Control financiero de obras y presupuestos.',
                    },
                  ].map((p, i) => (
                    <Card
                      key={i}
                      className="h-full border-0 shadow-lg ring-1 ring-slate-100"
                    >
                      <div className="h-2 bg-gradient-to-r from-[#0B2C3C] to-[#1B9FA3]" />
                      <div className="p-8">
                        <div className="flex justify-between mb-4">
                          <span className="text-2xl font-bold font-harabara text-[#0B2C3C]">
                            {p.c}
                          </span>
                          <Badge>{p.t}</Badge>
                        </div>
                        <p className="text-slate-600 mb-6">{p.d}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* TECNOLOGÍAS */}
          <section
      id="tecnologias"
      className="py-20 bg-[#0B2C3C] overflow-hidden relative"
    >
      {/* Estilos para la animación inline para no tocar config de tailwind */}
      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        /* Pausar animación al pasar el mouse (opcional) */
        .group:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto text-center px-4 mb-12">
        <h2 className="text-3xl font-bold font-harabara text-white">
          Stack Tecnológico
        </h2>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
          Herramientas modernas para soluciones escalables.
        </p>
      </div>

      {/* Contenedor del Slider con Máscara de desvanecimiento */}
      <div 
        className="group relative flex w-full overflow-hidden"
        style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Track animado (Duplicamos la lista para efecto infinito) */}
        <div className="flex animate-scroll-right gap-12 w-max px-6">
          
          {/* Renderizamos la lista dos veces para el loop perfecto */}
          {[...stack, ...stack].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center gap-3 min-w-[100px] transition-opacity duration-300 hover:opacity-100 opacity-70"
            >
              <div className="relative w-16 h-16 transition-transform duration-300 hover:scale-110">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className="object-contain filter drop-shadow-lg"
                  // Si tus logos son negros (ej: next.js/vercel), descomenta la siguiente línea para invertirlos a blanco:
                  // className="object-contain filter invert brightness-0" 
                />
              </div>
              <span className="font-medium text-sm text-slate-200">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>


            {/* PROCESO */}
            <section id="proceso" className="py-24 bg-white">
              <div className="container mx-auto">
                <SectionTitle title="Metodología WAPP" centered />
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  {[
                    { n: '01', t: 'Descubrimiento' },
                    { n: '02', t: 'Diseño' },
                    { n: '03', t: 'Desarrollo' },
                    { n: '04', t: 'QA & Launch' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-6xl font-bold opacity-10 mb-4 font-harabara text-[#0B2C3C]">
                        {s.n}
                      </div>
                      <h3 className="text-xl font-bold font-harabara text-[#0B2C3C]">
                        {s.t}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="py-24 bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <div className="bg-[#0B2C3C] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                  <div className="p-10 lg:p-16 text-white lg:w-1/2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B9FA3] rounded-full blur-[100px] opacity-20" />
                    <Badge className="mb-6 bg-white/10 text-white border-0">
                      Contacto
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-harabara">
                      Hablemos de tu proyecto
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Mail className="text-[#1B9FA3]" />
                        <p className="text-lg">contacto@wapp.software</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <MapPin className="text-[#1B9FA3]" />
                        <p className="text-lg">Corrientes, Argentina</p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <Linkedin className="text-[#1B9FA3]" />
                        <Instagram className="text-[#1B9FA3]" />
                        <Github className="text-[#1B9FA3]" />
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 bg-white p-10 lg:p-16">
                    <form
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-[#0B2C3C]">
                            Nombre
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 outline-none"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-[#0B2C3C]">
                            Empresa
                          </label>
                          <input
                            className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 outline-none"
                            placeholder="Tu empresa"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#0B2C3C]">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 outline-none"
                          placeholder="juan@empresa.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#0B2C3C]">
                          Mensaje
                        </label>
                        <textarea
                          rows={4}
                          className="w-full p-4 rounded-lg bg-slate-50 border border-slate-200 outline-none resize-none"
                          placeholder="Cuéntanos..."
                        />
                      </div>

                      <Button type="submit" className="w-full h-14 text-lg">
                        Enviar mensaje
                        <Send className="ml-2 w-5 h-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <ServiceDetailView
            serviceKey={selectedService}
            onBack={handleBackToHome}
          />
        )}
      </main>

      <footer className="bg-[#0B2C3C] text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} WAPP Software Factory.</p>
        </div>
      </footer>
    </div>
  );
}
