import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
          message: formData.message,
          company: 'Portfolio Inquiry',
          roleInterest: 'GTM Engineer Pipeline Inquiry',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send pipeline inquiry');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Error connecting to HubSpot pipeline. Please email directly.');
    }
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/60 text-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            <h4 className="text-base font-bold text-slate-900">Signal Received & Routed</h4>
          </div>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Your inquiry was validated and ingested into the live HubSpot GTM pipeline. I will review and respond promptly.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({ name: '', email: '', message: '', bot_field: '' });
            }}
            className="text-xs text-blue-600 hover:underline font-semibold"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="bot_field">Leave this empty</label>
            <input
              type="text"
              id="bot_field"
              name="bot_field"
              tabIndex={-1}
              value={formData.bot_field}
              onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-600" htmlFor="contact-name">
              Name
            </label>
            <input
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3.5 py-2 text-[13px] text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400"
              id="contact-name"
              placeholder="Alex Chen"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-600" htmlFor="contact-email">
              Work email
            </label>
            <input
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3.5 py-2 text-[13px] text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400"
              id="contact-email"
              placeholder="alex@company.com"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-600" htmlFor="contact-msg">
              Message
            </label>
            <textarea
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3.5 py-2 text-[13px] text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400 resize-none"
              id="contact-msg"
              placeholder="Describe current signal routing or enrichment bottlenecks..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          <button
            className="w-full py-2.5 bg-[#1d6ff2] hover:bg-blue-600 text-white font-medium text-[13px] rounded-lg shadow-sm transition-all mt-1 disabled:opacity-60 flex items-center justify-center gap-2"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Dispatching signal...</span>
              </>
            ) : (
              'Send message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};
