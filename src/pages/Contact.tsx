import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, MessageCircle, ShoppingBag, MapPin, Mail, Phone } from 'lucide-react';
import SectionHeader from '@/src/components/SectionHeader';
import { submitInquiry } from '@/src/services/inquiryService';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      type: formData.get('type') as string,
      message: formData.get('message') as string,
    };

    try {
      await submitInquiry(data);
      setFormState('success');
    } catch (error) {
      alert('Failed to send message. Please try again later.');
      setFormState('idle');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          accent="Reach Out"
          title="Let's Start a Conversation"
          subtitle="Inquire about commissions, prints, or monograms."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-6 italic">Get in Touch</h3>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                I would love to hear from you. Whether you have a specific vision for a custom piece or questions about my current collections, feel free to reach out.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-pink/20 flex items-center justify-center text-brand-gold rounded-full">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Email</p>
                    <p className="text-gray-900 font-medium">thejerusalemcanvas@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-pink/20 flex items-center justify-center text-brand-gold rounded-full">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">WhatsApp</p>
                    <p className="text-gray-900 font-medium">+1 (732) 281-4838</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-pink/20 flex items-center justify-center text-brand-gold rounded-full">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Location</p>
                    <p className="text-gray-900 font-medium">Israel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-gray-900">Follow the Studio</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><MessageCircle size={20} /></a>
                <a href="#" className="w-12 h-12 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><ShoppingBag size={20} /></a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-white gold-border watercolor-bg shadow-xl"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-brand-sage/20 text-brand-sage rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-2 italic">Thank You!</h3>
                <p className="text-gray-500">Your message has been sent. I will get back to you shortly!</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-xs uppercase tracking-widest font-bold text-brand-gold underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required 
                      className="w-full bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-0 transition-colors py-3 px-4 outline-none"
                      placeholder="Abraham Cohen"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      required 
                      className="w-full bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-0 transition-colors py-3 px-4 outline-none"
                      placeholder="abraham@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Inquiry Type</label>
                  <select name="type" className="w-full bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-0 transition-colors py-3 px-4 outline-none appearance-none">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Commission Request">Commission Request</option>
                    <option value="Original artwork purchase">Original artwork purchase</option>
                    <option value="Prints inquiry">Prints inquiry</option>
                    <option value="Monogram design">Monogram design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Message</label>
                  <textarea 
                    name="message"
                    rows={6} 
                    required 
                    className="w-full bg-gray-50 border-gray-200 focus:border-brand-gold focus:ring-0 transition-colors py-3 px-4 outline-none resize-none"
                    placeholder="Tell me about your vision..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-gray-900 hover:bg-brand-gold text-white py-5 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : (
                    <>
                      Send Message <Send size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
