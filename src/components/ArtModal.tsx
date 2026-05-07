import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { Artwork } from '@/src/constants';
import { Link } from 'react-router-dom';

interface ArtModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ArtModal({ artwork, onClose }: ArtModalProps) {
  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-5xl rounded-sm overflow-hidden relative shadow-2xl my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-gray-900 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section */}
            <div className="md:w-3/5 bg-gray-50 flex items-center justify-center p-4 md:p-8">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-w-full max-h-[70vh] object-contain shadow-2xl gold-border high-quality-img"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Section */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold mb-4 block">
                  {artwork.collection} Collection
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 italic leading-tight">
                  {artwork.title}
                </h2>
                <div className="w-12 h-px bg-gray-200 mb-8" />
                <p className="text-gray-600 leading-relaxed mb-8 font-light">
                  {artwork.description || "A masterfully crafted piece reflecting the depth and beauty of Jewish tradition and the spirit of Jerusalem."}
                </p>
                <div className="space-y-4 mb-12">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-50 pb-2">
                    <span>Availability</span>
                    <span className="text-brand-sage">Ready to Ship</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-50 pb-2">
                    <span>Price</span>
                    <span className="text-gray-900">{artwork.price || 'Price upon Inquiry'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-8 md:mt-0">
                <Link
                  to="/contact"
                  className="bg-gray-900 text-white text-center py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gold transition-colors flex items-center justify-center group"
                >
                  <ShoppingBag size={14} className="mr-2" /> Inquire About This Piece
                </Link>
                <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest">
                  Custom sizes and framing available upon request
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
