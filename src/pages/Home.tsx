import { motion } from 'motion/react';
import { ArrowRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SectionHeader from '@/src/components/SectionHeader';
import ArtCard from '@/src/components/ArtCard';
import ArtModal from '@/src/components/ArtModal';
import { SERVICES, Artwork } from '@/src/constants';
import { getArtworks } from '@/src/services/galleryService';

export default function Home() {
  const [featuredArt, setFeaturedArt] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  useEffect(() => {
    const loadArt = async () => {
      try {
        const data = await getArtworks();
        setFeaturedArt(data?.slice(0, 3) || []);
      } finally {
        setLoading(false);
      }
    };
    loadArt();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden watercolor-bg">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-brand-pink rounded-full blur-[150px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-sage/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif text-gray-900 mb-6 leading-tight">Capturing the <br/>Soul of Jerusalem.</h1>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-2xl mx-auto mb-12 leading-relaxed uppercase tracking-widest">
              Transforming heritage into contemporary masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/gallery" 
                className="bg-gray-900 text-white px-10 py-5 uppercase tracking-widest text-[11px] font-bold transition-all duration-300 hover:bg-brand-gold shadow-lg flex items-center group"
              >
                The Portfolio <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-900 border border-gray-200 px-10 py-5 uppercase tracking-widest text-[11px] font-bold transition-all duration-300 hover:bg-gray-50"
              >
                Inquire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            accent="The Portfolio"
            title="Current Collections"
            subtitle="Curated pieces from our latest signature series"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 grid-flow-dense">
            {featuredArt.map((art, idx) => (
              <ArtCard 
                key={art.id} 
                artwork={art} 
                index={idx} 
                onClick={setSelectedArt}
              />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-brand-gold border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-colors group"
            >
              View Entire Archive <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ArtModal 
        artwork={selectedArt} 
        onClose={() => setSelectedArt(null)} 
      />

      {/* Services Snapshot */}
      <section className="py-24 px-6 bg-brand-light/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                accent="Expertise"
                title="Sacred Artistry"
                centered={false}
              />
              <p className="text-gray-600 mb-10 leading-relaxed text-lg font-light">
                From hallowed streets of Eretz Yisrael to the wisdom of the Gedolim, our canvas preserves the timeless beauty of the Jewish narrative.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((service, idx) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 border border-gray-100 bg-white"
                  >
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-gold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-[11px] italic leading-tight">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay pointer-events-none" />
              <img 
                src="https://i.imgur.com/a6Ie8pZ.jpeg" 
                alt="Artist at work" 
                className="w-full h-full object-cover border-8 border-white shadow-xl high-quality-img"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Callout */}
      <section className="py-24 px-6 bg-brand-pink/20 text-gray-900 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-brand-gold font-script text-4xl block mb-6">Stay Connected</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Follow the journey on Instagram</h2>
          <p className="mb-12 text-gray-600 max-w-lg mx-auto">
            Get behind-the-scenes glimpses, first looks at new collections, and daily inspiration from the studio.
          </p>
          <a 
            href="https://www.instagram.com/thejerusalemcanvas" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-gray-900 text-white uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-colors"
          >
            <Instagram size={18} className="mr-2" /> @thejerusalemcanvas
          </a>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/40 blur-[100px] -z-0" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-sage/10 blur-[100px] -z-0" />
      </section>
    </div>
  );
}
