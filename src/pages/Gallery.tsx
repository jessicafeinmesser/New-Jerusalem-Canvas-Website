import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '@/src/components/SectionHeader';
import ArtCard from '@/src/components/ArtCard';
import ArtModal from '@/src/components/ArtModal';
import { Collection, Artwork } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { getArtworks } from '@/src/services/galleryService';

const COLLECTIONS: Collection[] = ['All', 'Gedolim', 'Eretz Yisrael', 'The Jewish Mosaic', 'Tefillot'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Collection>('All');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  useEffect(() => {
    const loadArt = async () => {
      try {
        const data = await getArtworks();
        setArtworks(data || []);
      } finally {
        setLoading(false);
      }
    };
    loadArt();
  }, []);

  const filteredArt = activeFilter === 'All' 
    ? artworks 
    : artworks.filter(art => art.collection === activeFilter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          accent="The Collections"
          title="Artistic Spiritual Journey"
          subtitle="Filter by collection to find the piece that speaks to you"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {COLLECTIONS.map((collection) => (
            <button
              key={collection}
              onClick={() => setActiveFilter(collection)}
              className={cn(
                "px-6 py-2 text-xs uppercase tracking-widest font-bold border transition-all duration-300",
                activeFilter === collection 
                  ? "bg-brand-gold border-brand-gold text-white shadow-md" 
                  : "bg-transparent border-gray-200 text-gray-500 hover:border-brand-gold"
              )}
            >
              {collection}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm col-span-2" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 grid-flow-dense"
          >
            <AnimatePresence mode="popLayout">
              {filteredArt.map((art, idx) => (
                <ArtCard 
                  key={art.id} 
                  artwork={art} 
                  index={idx} 
                  onClick={setSelectedArt}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredArt.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 italic">No pieces currently in this collection. Stay tuned for updates!</p>
          </div>
        )}
      </div>

      <ArtModal 
        artwork={selectedArt} 
        onClose={() => setSelectedArt(null)} 
      />

      {/* Experience Section */}
      <section className="mt-32 px-6 py-24 bg-brand-pink/5 watercolor-bg border-y border-brand-pink/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif text-gray-900 mb-6 italic">Can't find exactly what you're looking for?</h3>
          <p className="text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
            I specialize in custom commissions, turning your favorite landscape, Tefillah, or someone special into a unique masterpiece.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-10 py-4 bg-brand-gold text-white uppercase tracking-widest text-xs font-bold hover:scale-105 transition-transform"
          >
            Request a Commission
          </a>
        </div>
      </section>
    </div>
  );
}
