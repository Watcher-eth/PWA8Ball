import { useCarousel } from "@/components/ui/carousel";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function PaginationDots() {
  const { api, orientation } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);
  const maxVisibleDots = 7;

  React.useEffect(() => {
    if (api) {
      setScrollSnaps(api.scrollSnapList());
      const updateSelectedIndex = () =>
        setSelectedIndex(api.selectedScrollSnap());
      api.on("select", updateSelectedIndex);
      updateSelectedIndex(); // Initial setup
    }
  }, [api]);

  const scrollTo = (index) => {
    api.scrollTo(index);
  };

  const getVisibleDots = () => {
    const totalDots = scrollSnaps.length;
    const halfMaxDots = Math.floor(maxVisibleDots / 2);

    let start = Math.max(selectedIndex - halfMaxDots, 0);
    let end = Math.min(start + maxVisibleDots - 1, totalDots - 1);

    if (end - start < maxVisibleDots - 1) {
      start = Math.max(end - maxVisibleDots + 1, 0);
    }

    return scrollSnaps.slice(start, end + 1).map((_, index) => start + index);
  };

  const visibleDots = getVisibleDots();

  return (
    <div
      className={`flex ${
        orientation === "horizontal"
          ? "flex-row space-x-2"
          : "flex-col space-y-2"
      } justify-center mt-4 relative`}
    >
      <AnimatePresence initial={false}>
        {visibleDots.map((index) => (
          <motion.button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              selectedIndex === index ? "bg-white" : "bg-[gray]"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PaginationDots;
