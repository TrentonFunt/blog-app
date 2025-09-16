import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function TextReveal({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.6 
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      variants={textRevealVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </motion.div>
  );
}
