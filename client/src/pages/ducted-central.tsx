import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Wrench, Settings, Calendar, Home, Building, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import heroBg from "@assets/Gridless_home_hero_background_1767989380726.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import heroProductImage from "@assets/ducted-central-hero_1769054765946.webp";

export default function DuctedPage() {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(-1);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const installationServices = t.ductedCentral.services.installationServices;
  const repairServices = t.ductedCentral.services.repairServices;
  const maintenanceServices = t.ductedCentral.services.maintenanceServices;

  const whyChooseDucted = [
    {
      image: prideImage,
      title: t.ductedCentral.whyChoose.cards[0].title,
      desc: t.ductedCentral.whyChoose.cards[0].desc
    },
    {
      image: experienceImage,
      title: t.ductedCentral.whyChoose.cards[1].title,
      desc: t.ductedCentral.whyChoose.cards[1].desc
    },
    {
      image: satisfactionImage,
      title: t.ductedCentral.whyChoose.cards[2].title,
      desc: t.ductedCentral.whyChoose.cards[2].desc
    },
    {
      image: dedicatedImage,
      title: t.ductedCentral.whyChoose.cards[3].title,
      desc: t.ductedCentral.whyChoose.cards[3].desc,
      links: [
        { text: t.miniSplit.whyChoose.viewIncentives, href: "/provincial-incentives" },
        { text: t.miniSplit.whyChoose.seeWhatYouQualifyFor, href: "/financing" }
      ]
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: t.ductedCentral.installation.step1Title,
      intro: t.ductedCentral.installation.step1Intro,
      details: t.ductedCentral.installation.step1Details,
      footer: { cost: t.ductedCentral.installation.step1Cost, timeline: t.ductedCentral.installation.step1Timeline },
      showCta: true
    },
    {
      step: 2,
      title: t.ductedCentral.installation.step2Title,
      intro: t.ductedCentral.installation.step2Intro,
      details: t.ductedCentral.installation.step2Details,
      footer: { timeline: t.ductedCentral.installation.step2Timeline }
    },
    {
      step: 3,
      title: t.ductedCentral.installation.step3Title,
      intro: t.ductedCentral.installation.step3Intro,
      details: t.ductedCentral.installation.step3Details,
      footer: { totalTurnaround: t.ductedCentral.installation.step3TotalTurnaround, installationDay: t.ductedCentral.installation.step3InstallationDay }
    },
    {
      step: 4,
      title: t.ductedCentral.installation.step4Title,
      intro: t.ductedCentral.installation.step4Intro,
      details: t.ductedCentral.installation.step4Details,
      footer: { duration: t.ductedCentral.installation.step4Duration, cost: t.ductedCentral.installation.step4Cost }
    },
    {
      step: 5,
      title: t.ductedCentral.installation.step5Title,
      intro: t.ductedCentral.installation.step5Intro,
      details: []
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestStep = -1;
      let closestDistance = Infinity;

      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          
          if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
            closestDistance = distance;
            closestStep = index;
          }
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{t.ductedCentral.meta.title}</title>
        <meta name="description" content={t.ductedCentral.meta.description} />
        <meta name="keywords" content={t.ductedCentral.meta.keywords} />
        
        <meta property="og:title" content={t.ductedCentral.meta.title} />
        <meta property="og:description" content={t.ductedCentral.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.ductedCentral.meta.title} />
        <meta name="twitter:description" content={t.ductedCentral.meta.description} />
      </Helmet>
      <HreflangTags canonicalPath="/services/ducted-central-heat-pumps" />
      <SiteHeader />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-[#333333] mb-6">How can we help?</h3>
            <div className="space-y-3">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                Book a Quote or Install
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                Book a Service Call
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                View Financing Options
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt="Ducted central heat pump service background" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Mobile Product Image */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:hidden flex justify-center items-center -mb-4"
            >
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-1 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Ducted Central Heat Pump System" 
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}
                />
              </div>
            </motion.div>

            {/* Left Content */}
            <div className="max-w-xl lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Rating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black text-[#333333]">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{t.ductedCentral.hero.rating}</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  {t.ductedCentral.hero.title1}<br />
                  <span className="text-[#8dc63f]">{t.ductedCentral.hero.title2}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {t.ductedCentral.hero.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a 
                    href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    1 (800) 380-9384
                  </a>
                  <Button 
                    size="lg" 
                    className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    {t.ductedCentral.hero.getFreeQuote}
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={expertiseIcon} alt={t.ductedCentral.hero.unmatchedExpertise} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.ductedCentral.hero.unmatchedExpertise}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={guaranteeIcon} alt={t.ductedCentral.hero.satisfactionGuaranteed} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.ductedCentral.hero.satisfactionGuaranteed}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={redSealIcon} alt={t.ductedCentral.hero.redSealCertified} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.ductedCentral.hero.redSealCertified}</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Ducted Central Heat Pump System" 
                  className="w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              {t.ductedCentral.services.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.ductedCentral.services.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t.ductedCentral.services.sectionDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Installation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.ductedCentral.services.installation}</h3>
              <ul className="space-y-3">
                {installationServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  {t.ductedCentral.services.getFreeQuote}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Repair */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.ductedCentral.services.repair}</h3>
              <ul className="space-y-3">
                {repairServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover"
              >
                {t.ductedCentral.services.bookRepair}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.ductedCentral.services.maintenance}</h3>
              <ul className="space-y-3">
                {maintenanceServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover"
              >
                {t.ductedCentral.services.scheduleMaintenance}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* CTA after Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white mb-4">{t.ductedCentral.services.readyToDiscuss}</p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => setShowBookingModal(true)}
              >
                {t.ductedCentral.services.scheduleFreeConsultation}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Greenfoot Different */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] uppercase tracking-tight">
              Why Choose Greenfoot for<br />
              <span className="text-[#8dc63f]">Ducted Central Heat Pumps?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Greenfoot Energy is Atlantic Canada and BC's leading ducted heat pump installer with specialized expertise in whole-home central heating and cooling systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseDucted.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  {card.links && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-semibold text-[#8dc63f] hover:text-[#709c32] underline"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button 
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-10 rounded-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Schedule Your Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Long Does a Ducted Central Heat Pump Installation Take?{" "}
              <span className="text-[#8dc63f]">What's the Process?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Greenfoot Energy's central ducted heat pump process typically takes 1 to 3 weeks from the initial consultation to completed installation. Once the equipment arrives on-site, the physical installation is efficient with same-day installation often possible.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Schedule Your Ducted-Central Heat Pump{" "}
              <span className="text-[#8dc63f]">Consultation Today</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Contact us to schedule an assessment and learn more about our Ducted-Central Heat Pump solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-10 rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Your Free Assessment
              </Button>
              <a 
                href="/financing" target="_blank" rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white/10 font-bold h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2"
              >
                View Financing Options
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceFAQSection 
        category="Ducted-Central" 
        title="Common Questions About Ducted Central Heat Pumps"
      />

      <ServiceSchemaWithFAQs
        serviceName="Ducted Central Heat Pump Installation, Repair & Maintenance"
        serviceDescription="Professional ducted central heat pump services including installation, repair, and maintenance across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Whole-home heating and cooling solutions."
        serviceType="HVAC Service"
        serviceUrl="https://www.greenfootenergy.ca/services/ducted-central-heat-pumps"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 1800 }}
        faqCategory="Ducted-Central"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Ducted Central Heat Pumps", url: "https://www.greenfootenergy.ca/services/ducted-central-heat-pumps" },
        ]}
      />


      <OtherServicesGrid exclude="ductedCentral" />

      <RelatedContent currentPath="/services/ducted-central-heat-pumps" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
