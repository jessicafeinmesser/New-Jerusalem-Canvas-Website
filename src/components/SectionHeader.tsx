import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ title, subtitle, accent, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-16",
      centered ? "text-center mx-auto max-w-2xl" : "text-left",
      className
    )}>
      {accent && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-gold font-script text-3xl block mb-2"
        >
          {accent}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg uppercase tracking-widest text-sm font-medium"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={cn(
          "h-px bg-brand-gold/30 w-24 mt-6",
          centered ? "mx-auto" : "ml-0"
        )}
      />
    </div>
  );
}
