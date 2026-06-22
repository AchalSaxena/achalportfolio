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

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-navy to-brand-slate hover:opacity-95 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_15px_rgba(15,23,42,0.15)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.2)] transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving to database...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
