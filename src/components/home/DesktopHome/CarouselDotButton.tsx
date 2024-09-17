import { useCarousel } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PaginationDots() {
  const { api, orientation } = useCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const maxVisibleDots = 7

  useEffect(() => {
    if (api) {
      setScrollSnaps(api.scrollSnapList())
      const updateSelectedIndex = () =>
        setSelectedIndex(api.selectedScrollSnap())
      api.on("select", updateSelectedIndex)
      updateSelectedIndex() // Initial setup
    }
  }, [api])



  const getVisibleDots = () => {
    const totalDots = scrollSnaps.length
    const halfMaxDots = Math.floor(maxVisibleDots / 2)

    let start = Math.max(selectedIndex - halfMaxDots, 0)
    let end = Math.min(start + maxVisibleDots - 1, totalDots - 1)

    if (end - start < maxVisibleDots - 1) {
      start = Math.max(end - maxVisibleDots + 1, 0)
    }

    return scrollSnaps.slice(start, end + 1).map((_, index) => start + index)
  }

  const visibleDots = getVisibleDots()

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
            onClick={() => {
              api?.scrollTo(index)
            }}
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
  )
}


