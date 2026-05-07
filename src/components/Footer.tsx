import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, ShoppingCart, Lock } from 'lucide-react';
import { useFirebase } from './FirebaseProvider';
import { signInWithGoogle } from '../lib/firebase';

export default function Footer() {
  const { user } = useFirebase();
  const isAdmin = user?.email === 'thejerusalemcanvas@gmail.com';

  const handleAdminLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-brand-ink">
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-6">
          <Link to="/" className="flex flex-col group">
            <span className="text-3xl font-script text-brand-gold -mb-2">The Jerusalem Canvas</span>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-gray-500">Original Jewish Paintings</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Bringing the soul of Jerusalem and Jewish tradition into your home through vibrant, hand-painted art.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-gray-900">Explore</h4>
          <ul className="space-y-4">
            <li><Link to="/gallery" className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Gallery</Link></li>
            <li><Link to="/services" className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Services</Link></li>
            <li><Link to="/story" className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">My Story</Link></li>
            <li><Link to="/contact" className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-gray-900">Collections</h4>
          <ul className="space-y-4">
            <li><button className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Gedolim</button></li>
            <li><button className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Eretz Yisrael</button></li>
            <li><button className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Jewish Mosaic</button></li>
            <li><button className="text-gray-500 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider">Tefillot</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-gray-900">Connect</h4>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.instagram.com/thejerusalemcanvas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><Instagram size={18} /></a>
            <a href="https://wa.me/message/335AU7PT2NYGJ1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><MessageCircle size={18} /></a>
            <a href="https://thejerusalemcanvas.etsy.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-100 flex items-center justify-center rounded-full text-gray-400 hover:bg-brand-pink/20 hover:text-brand-gold transition-all duration-300"><ShoppingCart size={18} /></a>
          </div>
          <p className="text-gray-400 text-xs italic mb-4">
            Based in Israel.
          </p>
          {isAdmin ? (
            <Link to="/admin" className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:underline">
              <Lock size={12} className="mr-1" /> Manage Studio
            </Link>
          ) : (
            <button onClick={handleAdminLogin} className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-gray-300 hover:text-gray-400">
              <Lock size={12} className="mr-1" /> Artist Login
            </button>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400">
        <p className="text-xs tracking-widest uppercase font-medium">
          &copy; {new Date().getFullYear()} The Jerusalem Canvas. All Rights Reserved.
        </p>
        <p className="text-xs tracking-widest uppercase font-medium flex items-center">
          Handcrafted with devotion in Israel
        </p>
      </div>
    </footer>
  );
}
