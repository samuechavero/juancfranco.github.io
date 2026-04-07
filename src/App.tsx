/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, TrendingUp, Heart, MessageCircle, Download, Globe } from 'lucide-react';
import { LeadCaptureOverlay } from './components/LeadCaptureOverlay';
import { supabase } from './supabaseClient';

const translations = {
  es: {
    ov_title: "Accede a material exclusivo",
    ov_subtitle: "Hay un video especial para ti",
    ov_name_placeholder: "Nombre completo",
    ov_phone_placeholder: "Teléfono",
    ov_btn: "Acceder",
    hero_pre: "Asesoría exclusiva.",
    hero_title: "Asesoria directa con Juan C. Franco totalmente gratuita por tiempo limitado.",
    video_placeholder: "Video de Juan Franco",
    hero_copy: "Aprende como vivir tranquilo, obtiene informacion exclusiva y proteje tu familia",
    btn_ebook_es: "📥 Descargar E-book (Español)",
    btn_ebook_en: "📥 Download E-book (English)",
    b1_title: "Protección libre de impuestos",
    b1_desc: "Estrategias fiscales eficientes.",
    b2_title: "Crecimiento seguro",
    b2_desc: "Protección contra volatilidad.",
    b3_title: "Beneficios en vida",
    b3_desc: "Acceso a capital cuando más importa.",
    cta_wa: "Hablar con Juan por WhatsApp",
    author_title: "Soy Juan C. Franco.",
    author_copy: "A mis 54 años, el huracán Harvey me arrebató un millón de dólares. Ese día aprendí que trabajar duro no sirve de nada si no blindas tu patrimonio. La 'garra' me hizo levantarme, pero fue la estrategia financiera la que me hizo invencible. Protege ambos pilares de tu familia.",
    confidential: "Tu información es 100% confidencial.",
    error_msg: "Error. Intenta de nuevo."
  },
  en: {
    ov_title: "Exclusive Attention",
    ov_subtitle: "Leave your details to protect your family.",
    ov_name_placeholder: "Full Name",
    ov_phone_placeholder: "Phone Number",
    ov_btn: "Watch Video Now",
    hero_pre: "Exclusive consulting.",
    hero_title: "Free 1-on-1 consulting with Juan C. Franco for a limited time.",
    video_placeholder: "Juan Franco's Video",
    hero_copy: "Learn how to live with peace of mind, gain exclusive insights, and protect your family.",
    btn_ebook_es: "📥 Descargar E-book (Español)",
    btn_ebook_en: "📥 Download E-book (English)",
    b1_title: "Tax-free protection",
    b1_desc: "Tax-efficient strategies.",
    b2_title: "Secure growth",
    b2_desc: "Protection against market volatility.",
    b3_title: "Living benefits",
    b3_desc: "Access to capital when it matters most.",
    cta_wa: "Chat with Juan on WhatsApp",
    author_title: "I am Juan C. Franco.",
    author_copy: "At 54, Hurricane Harvey took a million dollars from me. That day I learned that working hard is useless if you don't shield your wealth. 'Grit' got me up, but financial strategy made me invincible. Protect both pillars of your family.",
    confidential: "Your information is 100% confidential.",
    error_msg: "Error. Please try again."
  }
};

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [submitted, setSubmitted] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    if (!submitted) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [submitted]);



  const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'));

  return (
    <div className="min-h-screen bg-white selection:bg-brand/20">
      {/* Lead Magnet Overlay */}
      {!submitted && (
        <LeadCaptureOverlay t={t} onSuccess={() => setSubmitted(true)} />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl tracking-tighter font-light uppercase italic">
            Juan C. <span className="font-bold not-italic">Franco</span>
          </span>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 border border-gray-300 px-4 py-1 text-xs tracking-widest hover:bg-gray-50 transition-colors uppercase"
          >
            <Globe className="w-3 h-3" />
            {lang === 'es' ? 'ES | EN' : 'EN | ES'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4"
          >
            {t.hero_pre}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl leading-tight mb-8 font-serif"
          >
            {t.hero_title}
          </motion.h1>

          <div className="aspect-video bg-gray-100 w-full mb-10 border border-gray-200 relative overflow-hidden">
            <video
              src="videofrancocomp.mp4"
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto italic">
            {t.hero_copy}
          </p>
        </section>

        {/* E-books Section */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
          <a
            href="el-escudo-de-un-millon-de-dolares-Juan-C-Franco-Español.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center border border-brand p-8 text-brand text-center btn-animate group transition-all hover:shadow-xl hover:bg-gray-50"
          >
            <img
              src="ebookes.jpeg"
              alt="El Escudo de un Millón de Dólares - Portada"
              className="w-full max-w-[240px] h-auto object-contain mb-6 rounded-sm shadow-md transition-transform group-hover:scale-105"
            />
            <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
              <Download className="w-5 h-5" />
              {t.btn_ebook_es}
            </div>
          </a>
          <a
            href="the-million-dollar-shield.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center border border-brand p-8 text-brand text-center btn-animate group transition-all hover:shadow-xl hover:bg-gray-50"
          >
            <img
              src="ebooken.jpeg"
              alt="The Million Dollar Shield - Cover"
              className="w-full max-w-[240px] h-auto object-contain mb-6 rounded-sm shadow-md transition-transform group-hover:scale-105"
            />
            <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
              <Download className="w-5 h-5" />
              {t.btn_ebook_en}
            </div>
          </a>
        </section>

        {/* Benefits Section */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center p-6">
            <div className="text-brand mb-4 flex justify-center">
              <Shield className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif text-xl mb-2">{t.b1_title}</h3>
            <p className="text-gray-500 text-sm">{t.b1_desc}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-brand mb-4 flex justify-center">
              <TrendingUp className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif text-xl mb-2">{t.b2_title}</h3>
            <p className="text-gray-500 text-sm">{t.b2_desc}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-brand mb-4 flex justify-center">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-serif text-xl mb-2">{t.b3_title}</h3>
            <p className="text-gray-500 text-sm">{t.b3_desc}</p>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="text-center mb-32">
          <a
            href="https://wa.me/12818049874"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl btn-animate"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            {t.cta_wa}
          </a>
        </section>

        {/* Authority / Bio Section */}
        <section className="bg-gray-soft -mx-6 px-6 py-24">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 shadow-inner">
              <img
                src="juanfranco.jpg"
                alt="Juan C. Franco"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-brand text-3xl mb-4 font-serif">{t.author_title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t.author_copy}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20">
          <p className="text-gray-400 text-xs tracking-widest uppercase">
            {t.confidential}
          </p>
        </footer>
      </main>
    </div>
  );
}
