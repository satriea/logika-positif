import { motion } from "framer-motion";

const AnimateSection = ({ id, children }) => {
  return (
    <motion.section
      id={id} // penting: harus ada id
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default AnimateSection;
