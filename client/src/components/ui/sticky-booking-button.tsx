import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarDays, Check } from "lucide-react";
import { BookingModal } from "./booking-modal";
import { useLanguage } from "@/lib/i18n";

export default function StickyBookingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-[#333333] font-bold rounded-full lg:rounded-2xl shadow-2xl p-4 lg:py-4 lg:px-8 transition-colors group"
          >
            <div className="relative">
              <CalendarDays className="w-8 h-8 lg:w-5 lg:h-5 text-[#333333]" />
              <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0 flex items-center justify-center w-3 h-3 border border-[#333333]">
                <Check className="w-2 h-2 text-[#333333] stroke-[5]" />
              </div>
            </div>
            <span className="hidden lg:inline text-lg">{t.common.goToBooking}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <BookingModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
