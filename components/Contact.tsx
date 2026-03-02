import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Phone, Mail, FileText } from 'lucide-react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate send
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
           <h2 className="text-5xl md:text-8xl font-display font-bold mb-8">
             Let's Work <br/> 
             <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine">Together</span>
           </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <p className="text-gray-400 text-xl leading-relaxed mb-8">
                Currently available for freelance projects and open to full-time opportunities. If you have an idea that needs some design magic, I'm all ears.
              </p>
              
              <div className="space-y-6">
                <div 
                  onClick={() => copyToClipboard('tibin.jacob.uiux@gmail.com', 'email')}
                  className="group cursor-pointer flex items-center gap-4 text-xl md:text-2xl font-bold text-white hover:text-gold-base transition-colors border-b border-white/20 pb-2 hover:border-gold-base w-fit"
                >
                  <Mail size={24} className="text-gold-base" />
                  tibin.jacob.uiux@gmail.com
                  {copiedEmail ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />}
                </div>

                <div 
                  onClick={() => copyToClipboard('8129917227', 'phone')}
                  className="group cursor-pointer flex items-center gap-4 text-xl md:text-2xl font-bold text-white hover:text-gold-base transition-colors border-b border-white/20 pb-2 hover:border-gold-base w-fit"
                >
                  <Phone size={24} className="text-gold-base" />
                  8129917227
                  {copiedPhone ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />}
                </div>

                <a 
                  href="#"
                  className="group cursor-pointer flex items-center gap-4 text-xl md:text-2xl font-bold text-white hover:text-gold-base transition-colors border-b border-white/20 pb-2 hover:border-gold-base w-fit"
                >
                  <FileText size={24} className="text-gold-base" />
                  Download Resume
                  <Send size={20} className="opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 text-gray-500" />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                 <a key={social} href="#" className="text-gray-500 hover:text-white uppercase tracking-wider text-sm font-mono border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
                   {social}
                 </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-gold-base outline-none transition-all placeholder-gray-600"
                  placeholder="Your Name"
                />
              </div>
              <div className="group">
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-gold-base outline-none transition-all placeholder-gray-600"
                  placeholder="Your Email"
                />
              </div>
              <div className="group">
                <textarea 
                  rows={3}
                  required
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-gold-base outline-none transition-all resize-none placeholder-gray-600"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`w-full py-4 rounded-xl font-bold text-lg text-black flex justify-center items-center gap-2 transition-all duration-300 mt-4 overflow-hidden relative shadow-lg ${
                  isSent ? 'bg-green-500 text-white' : ''
                }`}
                style={!isSent ? {
                    background: 'linear-gradient(to bottom, #F9F295, #E0AA3E, #B88A44)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                } : {}}
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-6 h-6 border-2 border-current border-t-transparent rounded-full" 
                  />
                ) : isSent ? (
                  "Message Sent!"
                ) : (
                  <>
                     <span className="relative z-10 flex items-center gap-2">Send Message <div className="bg-black text-white p-1 rounded-full"><Send size={14} /></div></span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1s_infinite]"></div>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};