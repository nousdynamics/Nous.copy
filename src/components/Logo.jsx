import { motion } from 'framer-motion';
import logoCompleta from '/assets/LOGO NOUS COPY COMPLETA.png';
import logoFavicon from '/assets/LOGO FAV ICON NOUS COPY.png';

export default function Logo({ className = "w-16 h-16", variant = "completa" }) {
  const logo = variant === "favicon" ? logoFavicon : logoCompleta;
  
  return (
    <motion.img
      src={logo}
      alt="Nous.Copy Logo"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ objectFit: 'contain' }}
    />
  );
}
