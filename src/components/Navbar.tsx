import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, MessageCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'My Story', path: '/story' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/thejerusalemcanvas', label: 'Instagram' },
    { icon: <MessageCircle size={20} />, url: 'https://wa.me/message/335AU7PT2NYGJ1', label: 'WhatsApp' },
    { icon: <ShoppingBag size={20} />, url: 'https://thejerusalemcanvas.etsy.com', label: 'Etsy' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl font-script text-brand-gold -mb-2 group-hover:scale-105 transition-transform">The Jerusalem Canvas</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">Original Jewish Paintings</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm uppercase tracking-widest font-medium transition-colors hover:text-brand-gold",
                  location.pathname === link.path ? "text-brand-gold border-b-2 border-brand-gold pb-1" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden border-b border-gray-100"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg uppercase tracking-widest font-medium",
                    location.pathname === link.path ? "text-brand-gold" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-gold"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
