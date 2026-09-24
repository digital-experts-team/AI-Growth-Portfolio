import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    roleInterest: 'GTM Engineer (Full-time / Fractional)',
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit pipeline request');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Error connecting to HubSpot pipeline. Please email directly.');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a]">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
          Trigger Pipeline Engagement
        </h3>
        <p className="text-sm text-gray-400">
          Submitting this form executes a live webhook into HubSpot. It is a live demonstration of signal capture and CRM routing.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 rounded-xl border border-[#D4AF37]/40 bg-[#14120a] text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-white mb-1">Signal Received & Routed</h4>
          <p className="text-sm text-gray-300 mb-4">
            Contact record created in HubSpot. I usually review and respond within 24 hours.
          </p>
          <a
            href="mailto:tibin.jacob.uiux@gmail.com"
            className="text-xs text-[#D4AF37] hover:underline"
          >
            Direct contact: tibin.jacob.uiux@gmail.com
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
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

          <div>
            <label htmlFor="name" className="block text-xs font-mono uppercase text-gray-400 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#121212] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              placeholder="e.g. Alex Morgan"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase text-gray-400 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#121212] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                placeholder="alex@company.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-xs font-mono uppercase text-gray-400 mb-1">
                Company / Team *
              </label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#121212] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div>
            <label htmlFor="roleInterest" className="block text-xs font-mono uppercase text-gray-400 mb-1">
              Engagement Type
            </label>
            <select
              id="roleInterest"
              value={formData.roleInterest}
              onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#121212] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="GTM Engineer (Full-time / Fractional)">GTM Engineer (Full-time / Fractional)</option>
              <option value="RevOps & HubSpot Architecture">RevOps & HubSpot Architecture</option>
              <option value="Waterfall Enrichment System">Waterfall Enrichment System</option>
              <option value="AI Outbound Agents">AI Outbound Agents</option>
              <option value="Other Consulting Inquiry">Other Consulting Inquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase text-gray-400 mb-1">
              Architecture / Objective Overview
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#121212] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              placeholder="Tell me about your outbound bottlenecks, data stack, or goals..."
            />
          </div>

          {status === 'error' && (
            <p className="text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded border border-rose-800/40">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 px-6 rounded-lg text-[#0a0800] font-semibold text-sm transition-all cta-button disabled:opacity-50"
          >
            {status === 'loading' ? 'Routing to HubSpot...' : 'Send Signal & Route to CRM'}
          </button>

          <p className="text-[11px] text-gray-500 text-center">
            Zero spam. Protected by rate limiting and direct HubSpot API encryption.
          </p>
        </form>
      )}
    </div>
  );
};
