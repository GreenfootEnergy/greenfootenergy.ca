import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Tag, ChevronsRight } from "lucide-react";
import calendarIcon from "@assets/generated_images/black_calendar_checkmark_icon.png";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n";

import heroBg from "@assets/hero-bg-home.webp";

import { BookingModal } from "./booking-modal";

export function Hero() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <div ref={heroRef} className="relative overflow-hidden bg-white">
      {/* Booking Modal */}
      <BookingModal isOpen={showBookingModal} onOpenChange={setShowBookingModal} />

      {/* Hero Content Section */}
      <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ y: backgroundY }}
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover object-top scale-110" fetchPriority="high" loading="eager" decoding="async" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 pt-44 sm:pt-52 md:pt-60 lg:pt-72 pb-16">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-[#333333] italic">{t.hero.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.3, ease: "backOut" }}
                        className="relative"
                      >
                        <Star className="w-4 h-4 fill-[#333333] text-[#333333]" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                          initial={{ x: "-100%", opacity: 0 }}
                          animate={{ x: "100%", opacity: [0, 1, 0] }}
                          transition={{ 
                            delay: 1.2 + i * 0.1,
                            duration: 0.4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 4
                          }}
                          style={{ mixBlendMode: "overlay" }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <span className="text-sm sm:text-base text-slate-600 font-normal">{t.hero.reviews}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[58px] font-[900] text-[#333333] leading-[1.1] sm:leading-[1] mb-8 tracking-normal sm:tracking-tight uppercase" 
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                {t.hero.headline1}<br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-[#8dc63f] inline-block"
                >
                  {t.hero.headline2}
                </motion.span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.a 
                  href="tel:18003809384" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-base px-8 h-12 shadow-lg hover:shadow-xl transition-all rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                  {t.hero.phone}
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" className="bg-white hover:bg-slate-50 text-[#333333] font-bold text-base px-8 h-12 shadow-lg hover:shadow-xl transition-all rounded-lg border border-slate-200" onClick={() => setShowBookingModal(true)}>
                    <img src={calendarIcon} alt="" className="w-4 h-4 mr-2" />
                    {t.common.bookNow}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white">
        <div className="container mx-auto px-4 md:px-16">
          <a href="https://scheduling.greenfootenergy.ca/" target="_blank" rel="noopener noreferrer" className="block bg-[#333333] hover:bg-[#8dc63f] rounded-2xl p-6 md:p-8 -mt-10 relative z-10 shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6">
                <Tag className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#333333] rotate-[-45deg] transition-colors" />
                <div>
                  <p className="font-bold text-base md:text-lg lg:text-xl text-white group-hover:text-[#333333] transition-colors">{t.home.bundlePromo}</p>
                  <p className="text-sm text-white/80 group-hover:text-[#333333]/80 transition-colors">{t.home.bundlePromoSub}</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors hidden sm:block">
                <ChevronsRight className="w-6 h-6 text-white group-hover:text-[#333333] transition-colors" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
