import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const KineticText = ({ text, start, end, currentTime }) => {
  const isVisible = currentTime >= start && currentTime <= end;

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.5,
      transition: {
        duration: 0.5
      }
    }
  };

  const colorVariants = {
    initial: { color: "white" },
    animate: {
      color: `hsl(${(currentTime - start) / (end - start) * 360}, 100%, 50%)`,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.h1
          className="text-3xl md:text-4xl lg :text-5xl font-bold text-center my-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <motion.span
            initial="initial"
            animate="animate"
            variants={colorVariants}
          >
            {text}
          </motion.span>
        </motion.h1>
      )}
    </AnimatePresence>
  );
};

export default KineticText;
