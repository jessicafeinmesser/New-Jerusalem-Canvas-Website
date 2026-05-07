import { motion } from 'motion/react';
import { Artwork } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface ArtCardProps {
  artwork: Artwork;
  index: number;
  onClick: (art: Artwork) => void;
}

export default function ArtCard({ artwork, index, onClick }: ArtCardProps) {
  const isLandscape = artwork.orientation === 'landscape';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(artwork)}
      className={cn(
        "group cursor-pointer",
        isLandscape ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2"
      )}
    >
      <div className={cn(
        "relative overflow-hidden gold-border mb-4 transition-all duration-300 bg-gray-50",
        isLandscape ? "aspect-[3/2]" : "aspect-[3/4]"
      )}>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 high-quality-img"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(artwork);
            }}
            className="bg-white/90 px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-gold hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-1 block">
          {artwork.collection}
        </span>
        <h3 className="text-sm font-serif text-gray-800 leading-tight">
          {artwork.title}
        </h3>
      </div>
    </motion.div>
  );
}
