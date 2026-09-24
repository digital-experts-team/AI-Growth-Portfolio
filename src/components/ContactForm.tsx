import React, { useState } from 'react';

interface ContactFormProps {
  dark?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ dark = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    bot_field: '', // Honeypot
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.bot_field) {
      // Honeypot triggered
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Direct Inbound',
          message: formData.message,
          roleInterest: 'GTM Pipeline Inquiry',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send pipeline inquiry');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please reach out directly via email.');
    }
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className={`p-6 rounded-2xl border text-center flex flex-col items-center gap-3 ${
          dark ? 'bg-[#000000] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="w-12 h-12 rounded-full bg-[#b4f04d]/20 border border-[#b4f04d]/40 flex items-center justify-center text-[#b4f04d]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 className="text-lg font-bold">Signal Dispatched</h4>
          <p className="text-xs text-zinc-400 max-w-sm">
            Your message has been routed to HubSpot. I will review your stack notes and reply within 24 hours.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({ name: '', email: '', company: '', message: '', bot_field: '' });
            }}
            className="mt-2 text-xs font-mono text-[#b4f04d] hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              id="bot_field"
              name="bot_field"
              tabIndex={-1}
              value={formData.bot_field}
              onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
            />
          </div>

          {/* Name field */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${dark ? 'text-zinc-400' : 'text-slate-600'}`} htmlFor="contact-name">
              NAME
            </label>
            <input
              className={`w-full rounded-xl px-4 py-3 text-[14px] transition-colors focus:outline-none ${
                dark
                  ? 'bg-[#000000] border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#b4f04d]'
                  : 'bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              }`}
              id="contact-name"
              placeholder="Your name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Work Email field */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${dark ? 'text-zinc-400' : 'text-slate-600'}`} htmlFor="contact-email">
              WORK EMAIL
            </label>
            <input
              className={`w-full rounded-xl px-4 py-3 text-[14px] transition-colors focus:outline-none ${
                dark
                  ? 'bg-[#000000] border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#b4f04d]'
                  : 'bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              }`}
              id="contact-email"
              placeholder="name@company.com"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Company field */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${dark ? 'text-zinc-400' : 'text-slate-600'}`} htmlFor="contact-company">
              COMPANY
            </label>
            <input
              className={`w-full rounded-xl px-4 py-3 text-[14px] transition-colors focus:outline-none ${
                dark
                  ? 'bg-[#000000] border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#b4f04d]'
                  : 'bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              }`}
              id="contact-company"
              placeholder="Company name"
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          {/* Message field */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${dark ? 'text-zinc-400' : 'text-slate-600'}`} htmlFor="contact-msg">
              MESSAGE
            </label>
            <textarea
              className={`w-full rounded-xl px-4 py-3 text-[14px] transition-colors focus:outline-none resize-none ${
                dark
                  ? 'bg-[#000000] border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-[#b4f04d]'
                  : 'bg-[#f8fafc] border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              }`}
              id="contact-msg"
              placeholder="What parts of GTM automation, AI search or paid need fixing?"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-xs text-red-300 font-medium">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#d2f39c] hover:bg-[#c2e887] text-black font-bold text-[14px] rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer w-fit"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin"></span>
                  <span>Routing to HubSpot...</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </>
              )}
            </button>
            <p className="text-[12px] text-zinc-500 font-mono pt-1">
              This form routes straight into HubSpot.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
