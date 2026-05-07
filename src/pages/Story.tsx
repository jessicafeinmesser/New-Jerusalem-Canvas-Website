import { motion } from 'motion/react';
import SectionHeader from '@/src/components/SectionHeader';
import { Quote } from 'lucide-react';

export default function Story() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          accent="A Canvas of Faith"
          title="The Story Behind the Art"
          subtitle="A journey of passion, aliyah, and artistic expression"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-pink/20 rounded-3xl -z-10 rotate-3" />
              <div className="absolute -inset-4 border border-brand-gold/30 rounded-3xl -z-10 -rotate-2" />
              <img 
                src="https://i.imgur.com/mv71UhP.jpeg" 
                alt="Jessica Feinmesser" 
                className="w-full rounded-2xl shadow-xl border-4 border-white object-cover aspect-square high-quality-img"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif italic text-gray-900 mb-6">"Art is a way to portray ideas and feelings that often cannot be put into words."</h3>
            
            <p className="text-gray-600 leading-relaxed">
              My name is <span className="font-bold text-gray-900">Jessica (Zemble) Feinmesser</span>. After making Aliyah in September 2021, I am proud to call myself an Israeli artist. I lived four wonderful years in Jerusalem, where I started my art business, before moving to Bet Shemesh. My journey with art began as soon as I could first hold a crayon—scribbling on walls, drawing, and painting have been part of my life for as long as I can remember.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              What began as a childhood hobby gradually developed into a skill and ultimately transformed into a true passion. For me, art is more than just a creative outlet; it is a medium to speak where words fall short. Each stroke and splatter tells its own unique story.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Following years of formal art lessons and a commitment to my personal development as an independent artist, I began teaching my own lessons to budding young creatives. Today, my work is displayed in homes, institutions, and publications throughout both Israel and America.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <span className="italic">The Jerusalem Canvas</span> was born from a simple request—a friend asking to buy a print as a wedding gift. Despite initial insecurities, I said yes, and I haven't looked back since. With immense gratitude to Hashem, the response has been incredible, and it is an honor to have my artwork displayed across the globe.
            </p>

            <p className="text-gray-600 leading-relaxed">
              I have combined my background in computer science and fine art to develop this website, where you will find paintings from various stages and perspectives of my life. Each piece reflects a story intended to resonate with its viewer in a personal way. In addition to the gallery collections, I offer the special service of working directly with customers to create custom paintings, portraits, and logos.
            </p>

            <p className="text-gray-600 leading-relaxed italic">
              I am more than happy to be in touch regarding any questions or comments you might have. Feel free to reach out directly to <a href="mailto:thejerusalemcanvas@gmail.com" className="text-brand-gold font-bold hover:underline">thejerusalemcanvas@gmail.com</a>.
            </p>

            <div className="pt-6 border-t border-gray-100">
              <span className="font-script text-4xl text-brand-gold">Jessica Feinmesser</span>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-2">Artist & Founder</p>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Creative Storytelling',
              text: 'Each stroke and splatter tells a unique story, portraying ideas and feelings that often reach beyond what words can convey.'
            },
            {
              title: 'Dedication to Growth',
              text: 'From a childhood hobby to a professional skill, I am committed to continuous personal development and inspiring budding artists.'
            },
            {
              title: 'Bespoke Creations',
              text: 'I offer specialized services for custom paintings, portraits, and logos, working directly with customers to bring their visions to life.'
            }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white gold-border relative group"
            >
              <Quote className="absolute top-6 right-6 text-brand-pink/20 group-hover:text-brand-pink/40 transition-colors" size={40} />
              <h4 className="text-xl font-serif text-gray-900 mb-4">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="mt-32 h-[400px] overflow-hidden grayscale contrast-125 opacity-20 pointer-events-none border-y border-gray-200">
        <img 
          src="https://i.imgur.com/eF83rG2.jpeg" 
          alt="Art background" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
        />
      </section>
    </div>
  );
}
