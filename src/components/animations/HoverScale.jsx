import { motion } from 'framer-motion';

const hoverScaleVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HoverScale({ children, className = '', scale = 1.05 }) {
  return (
    <motion.div
      variants={hoverScaleVariants}
      initial="rest"
      whileHover="hover"
      className={className}
      style={{ '--hover-scale': scale }}
    >
      {children}
    </motion.div>
  );
}
