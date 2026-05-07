import { motion } from 'motion/react';
import { Palette, Printer, PenTool, Type, ArrowRight, Check } from 'lucide-react';
import SectionHeader from '@/src/components/SectionHeader';
import { Link } from 'react-router-dom';

const SERVICES_DETAILED = [
  {
    id: 'originals',
    title: 'Original Paintings',
    icon: <Palette size={32} />,
    description: 'Unique, hand-painted masterpieces on gallery-quality canvas. Each brushstroke is filled with intention and soul.',
    features: ['High Quality Acrylics and Watercolors', 'Certificate of Authenticity', 'Premium Wood Framing Available'],
    price: 'Starting from $250',
    image: 'https://i.imgur.com/lReOdbe.jpeg' // Original Painting image
  },
  {
    id: 'prints',
    title: 'Fine Art Prints',
    icon: <Printer size={32} />,
    description: 'Giclée prints that capture the depth and texture of the original work at an accessible price.',
    features: ['Archival Ink & Paper', 'Available on Paper or Canvas', 'Multiple Sizes', 'International Shipping'],
    price: 'Starting from $50',
    image: 'https://i.imgur.com/0Utn8zJ.jpeg' // Prints image
  },
  {
    id: 'commissions',
    title: 'Custom Commissions',
    icon: <PenTool size={32} />,
    description: 'Collaborate with the artist to create a bespoke piece for your home, synagogue, or as a meaningful gift.',
    features: ['Personal Consultation', 'Sketches for Approval', 'Choice of Color Palette', 'Unique Family Heirloom'],
    price: 'Request a Quote',
    image: 'https://i.imgur.com/3wrWWbY.jpeg' // Commission image
  },
  {
    id: 'monograms',
    title: 'Artistic Monograms',
    icon: <Type size={32} />,
    description: 'Elegant Jewish monograms for weddings, new homes, or personal branding, blending typography with fine art.',
    features: ['Hand-Designed Calligraphy', 'Custom Symbols and Themes', 'Digital or Hand-Painted', 'Perfect for Stationery'],
    price: 'Starting from $75',
    image: 'https://i.imgur.com/e2Spm72.jpeg' // Monogram image
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          accent="Our Services"
          title="Bringing Art to Life"
          subtitle="Explore the different ways we can create something beautiful together"
        />

        <div className="space-y-24">
          {SERVICES_DETAILED.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="gold-border aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-brand-pink/20 rounded-full flex items-center justify-center text-brand-gold">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-serif text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg italic">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-500 font-medium">
                      <Check size={16} className="text-brand-sage mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between p-6 bg-brand-pink/10 border border-brand-pink/20 rounded-lg">
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Estimate</span>
                  <span className="text-xl font-serif text-brand-gold">{service.price}</span>
                </div>

                <div className="mt-10">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center bg-gray-900 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-brand-gold transition-all group"
                  >
                    Inquire Now <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
