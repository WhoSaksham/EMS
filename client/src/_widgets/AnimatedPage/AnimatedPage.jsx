import React from "react";
import { motion } from "framer-motion";

const AnimatedPage = ({ children, variants }, props) => {
  const animations = {
    initial: { opacity: 0, scale: 0.9, x: 50 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.9, x: -50 },
    transition: { duration: 0.5, ease: "easeInOut" }, // Adjust duration and easing as needed
  };
  return (
    <motion.div
      variants={variants ? variants : animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={animations.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
