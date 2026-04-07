import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabase = createClient(
  // @ts-ignore
  import.meta.env.VITE_SUPABASE_URL,
  // @ts-ignore
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LeadCaptureOverlayProps {
  t: {
    ov_title: string;
    ov_subtitle: string;
    ov_name_placeholder: string;
    ov_phone_placeholder: string;
    ov_btn: string;
    error_msg: string;
  };
  onSuccess: () => void;
}

export function LeadCaptureOverlay({ t, onSuccess }: LeadCaptureOverlayProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isTouched, setIsTouched] = useState(false);

  // Validación básica del teléfono: 7 a 15 caracteres (dígitos, espacios, guiones, etc.)
  const isValidPhone = /^\+?[0-9\s\-()]{7,15}$/.test(formData.phone);
  const isFormValid = formData.name.trim().length > 0 && isValidPhone;

  useEffect(() => {
    if (formData.phone.length > 0) setIsTouched(true);
  }, [formData.phone]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    const { error } = await supabase.from('leads').insert([{
      name: formData.name,
      phone: formData.phone
    }]);

    if (!error) {
      onSuccess();
    } else {
      alert(t.error_msg);
    }
    setLoading(false);
  };

  return (
    <motion.div
      id="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        // Colores corporativos aplicados: #F8FAFC para fondo suave y verde corporativo para acentos
        className="bg-[#F8FAFC] max-w-md w-full p-8 md:p-10 shadow-2xl rounded-sm text-center border-t-4 border-[#417232]"
      >
        <h2 className="text-2xl mb-2 font-serif text-black">{t.ov_title}</h2>
        <p className="text-gray-500 mb-8 text-sm">{t.ov_subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder={t.ov_name_placeholder}
            className="w-full p-3 bg-white border border-gray-200 focus:outline-none focus:border-[#417232] rounded-sm transition-colors text-black"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="tel"
            required
            placeholder={t.ov_phone_placeholder}
            className={`w-full p-3 bg-white border ${
              isTouched && !isValidPhone 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-[#417232]'
            } focus:outline-none rounded-sm transition-colors text-black`}
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          {isTouched && !isValidPhone && (
            <p className="text-red-500 text-xs text-left mt-1">Formato de teléfono inválido</p>
          )}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-[#417232] text-white py-4 font-bold tracking-widest uppercase text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-opacity-90 active:scale-95 btn-animate"
          >
            {loading ? 'Cargando...' : t.ov_btn}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
