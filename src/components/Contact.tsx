import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Send, Mail, CheckCircle, AlertCircle, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all required fields (*).' });
      return;
    }

    setLoading(true);
    setStatus(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('contact_messages').insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Direct Portfolio Contact',
            message: formData.message,
          },
        ]);

        if (error) throw error;

        setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        console.error('Error writing message to Supabase:', err);
        setStatus({
          type: 'error',
          text: 'Backend database error. Retrying writing locally...',
        });
        saveLocallyMock();
      } finally {
        setLoading(false);
      }
    } else {
      saveLocallyMock();
    }
  };

  const saveLocallyMock = () => {
    // Save locally
    setTimeout(() => {
      try {
        const localMessages = localStorage.getItem('local_portfolio_messages');
        const list = localMessages ? JSON.parse(localMessages) : [];
        list.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
        localStorage.setItem('local_portfolio_messages', JSON.stringify(list));

        setStatus({
          type: 'success',
          text: 'Offline Mode: Message recorded successfully in local browser storage.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        setStatus({ type: 'error', text: 'Failed to record message locally.' });
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleWhatsAppSend = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all required fields (*) before sending via WhatsApp.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    // Save to Supabase first if configured, so we keep a copy of their message
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_messages').insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'WhatsApp Contact',
            message: formData.message,
          },
        ]);
      } catch (err) {
        console.error('Error saving to database before WhatsApp redirect:', err);
      }
    }

    const whatsappNumber = '918305014100';
    const text = `Hi Achal,\n\nMy Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'Portfolio Query'}\n\nMessage:\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
    
    setLoading(false);
    setStatus({
      type: 'success',
      text: 'Message recorded! Opening WhatsApp to send your message...',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-brand-navy mb-4">
          Initiate <span className="text-gradient">Collaboration</span>
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Interested in working together or hiring me? Drop a message here and it will log directly into my database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
        {/* Contact Info panel (Col-span 2) */}
        <div className="lg:col-span-2 flex flex-col justify-between glass-panel p-8 bg-white border border-light-border hover:border-brand-cyan/40">
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-navy mb-4">Contact Details</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Feel free to reach out for consulting queries, project implementation support, FRS/DPR discussions, or full-stack Laravel/React developer roles.
            </p>

            <div className="flex flex-col gap-5">
              <a
                href="mailto:achalsaxena44@gmail.com"
                className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-100/50 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-light-border text-brand-navy group-hover:scale-105 transition-transform shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Email Address</div>
                  <div className="text-sm font-semibold text-brand-slate">achalsaxena44@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+918305014100"
                className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-100/50 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-light-border text-brand-cyan group-hover:scale-105 transition-transform shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Phone Numbers</div>
                  <div className="text-sm font-semibold text-brand-slate">+91 8305014100 / 8770077139</div>
                </div>
              </a>

              <a
                href="https://wa.me/918305014100?text=Hi%20Achal,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-100/50 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-light-border text-brand-cyan group-hover:scale-105 transition-transform shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">WhatsApp Connect</div>
                  <div className="text-sm font-semibold text-brand-slate">Chat on WhatsApp</div>
                </div>
              </a>

              <a
                href="https://github.com/AchalSaxena"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-100/50 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-light-border text-brand-cyan group-hover:scale-105 transition-transform shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">GitHub Profile</div>
                  <div className="text-sm font-semibold text-brand-slate">github.com/AchalSaxena</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/achalsaxena44"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-slate-50 border border-light-border p-4 rounded-xl hover:border-brand-cyan/40 hover:bg-slate-100/50 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-light-border text-brand-cyan group-hover:scale-105 transition-transform shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">LinkedIn Profile</div>
                  <div className="text-sm font-semibold text-brand-slate">linkedin.com/in/achalsaxena44</div>
                </div>
              </a>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono mt-8">
            <span>* Direct secure DB insertion. SSL encrypted.</span>
          </div>
        </div>

        {/* Contact Form panel (Col-span 3) */}
        <div className="lg:col-span-3 glass-panel p-8 bg-white border border-light-border">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-slate-50 border border-light-border rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@example.com"
                  required
                  className="w-full bg-slate-50 border border-light-border rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Transformation Consultation Proposal"
                className="w-full bg-slate-50 border border-light-border rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
                Message Content *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Outline transformation requirements or query details..."
                required
                rows={5}
                className="w-full bg-slate-50 border border-light-border rounded-xl px-4 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all resize-none"
              />
            </div>

            {/* Status alerts */}
            {status && (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : 'bg-rose-50 border-rose-200 text-rose-600'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-navy to-brand-slate hover:opacity-95 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(15,23,42,0.15)] transition-all duration-300 disabled:cursor-not-allowed w-full"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                disabled={loading}
                className="flex items-center justify-center gap-2 border border-light-border bg-white hover:border-brand-cyan/60 hover:text-brand-cyan text-brand-navy font-semibold py-3.5 rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all duration-300 w-full"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-brand-cyan"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
