import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ isOpen, onOpenChange }: BookingModalProps) {
  const { t, localizedPath } = useLanguage();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => onOpenChange(false)}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#333333] rounded-3xl p-10 max-w-lg w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] p-2 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            
            <h2 id="booking-modal-title" className="text-3xl font-black text-[#8dc63f] italic text-center mb-10 uppercase tracking-tight">
              {t.bookingModal.title}
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  window.open('https://scheduling.greenfootenergy.ca/', '_blank');
                  onOpenChange(false);
                }}
                className="block w-full border-2 border-[#8dc63f] text-white font-bold text-lg py-5 px-6 rounded-xl text-center hover:bg-[#8dc63f] hover:text-[#333333] transition-all uppercase"
                data-testid="button-book-quote"
              >
                {t.bookingModal.bookQuote}
              </button>
              
              <button
                onClick={() => {
                  (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' });
                  onOpenChange(false);
                }}
                className="block w-full border-2 border-[#8dc63f] text-white font-bold text-lg py-5 px-6 rounded-xl text-center hover:bg-[#8dc63f] hover:text-[#333333] transition-all uppercase"
                data-testid="button-book-service"
              >
                {t.bookingModal.bookService}
              </button>
              
              <button
                onClick={() => {
                  onOpenChange(false);
                  window.location.href = localizedPath('/financing');
                }}
                className="block w-full border-2 border-[#8dc63f] text-white font-bold text-lg py-5 px-6 rounded-xl text-center hover:bg-[#8dc63f] hover:text-[#333333] transition-all uppercase"
                data-testid="button-view-financing"
              >
                {t.bookingModal.viewFinancing}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
