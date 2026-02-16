import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Thermometer, Zap, Volume2, Leaf, Shield, Clock, Wrench, Settings, Home, Building, MapPin, Calendar, Users, Award, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { BrandCardsGrid } from "@/components/ui/other-brands-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import heroBg from "@assets/Gridless_home_hero_background_1767989380726.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import heroProductImage from "@assets/mini-split-heat-pumps_1769031697866.avif";


const whyChooseMiniSplit = [
  {
    image: prideImage,
    title: "Cold-Climate Mini-Split Specialists",
    desc: "Our technicians specialize in cold-climate ductless systems rated to -30°C. We've installed 75,000+ mini-splits across 5 Canadian provinces, understanding the unique heating demands of Atlantic and BC winters."
  },
  {
    image: experienceImage,
    title: "Certified Multi-Brand Installers",
    desc: "Factory-certified for Gridless, Mitsubishi Electric, Daikin, Kerr, and LG mini-split systems. Our manufacturer certifications ensure your warranty stays valid and your system performs optimally."
  },
  {
    image: satisfactionImage,
    title: "Single & Multi-Zone Expertise",
    desc: "Whether you need one room heated or whole-home comfort with multi-zone systems, we design custom solutions. Our heat load calculations ensure proper BTU sizing for maximum efficiency."
  },
  {
    image: dedicatedImage,
    title: "Rebate & Financing Assistance",
    desc: "We help you access federal and provincial rebates. Flexible financing options available—conditions apply.",
    links: [
      { text: "View Incentives", href: "/provincial-incentives" },
      { text: "See What You Qualify For", href: "/financing" }
    ]
  }
];


export default function MiniSplitPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const installationSteps = t.miniSplit.installationProcess.steps.map((s: any, i: number) => ({
    step: i + 1,
    title: s.title,
    intro: s.intro,
    details: s.details,
    footer: {
      ...(s.cost ? { cost: s.cost } : {}),
      ...(s.timeline ? { timeline: s.timeline } : {}),
      ...(s.singleZone ? { singleZone: s.singleZone } : {}),
      ...(s.multiZone ? { multiZone: s.multiZone } : {}),
    },
    showCta: i === 0,
  }));

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
        <title>Mini-Split Heat Pump Installation | Ductless HVAC Experts</title>
        <meta name="description" content="Professional mini-split heat pump installation across NS, NB, PEI, NFLD & BC. 75,000+ installs. Ductless heating & cooling rated to -30°C. Free quotes available." />
        <meta name="keywords" content="mini-split heat pump, ductless heat pump, mini-split installation, ductless HVAC, cold climate heat pump, single zone heat pump, multi zone heat pump, heat pump Canada" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/mini-split-heat-pumps" />
        
        <meta property="og:title" content="Mini-Split Heat Pump Installation | Ductless HVAC Experts" />
        <meta property="og:description" content="Professional ductless mini-split heat pump installation. 75,000+ installs across 5 Canadian provinces. Year-round comfort down to -30°C." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/mini-split-heat-pumps" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mini-Split Heat Pump Installation | Ductless HVAC Experts" />
        <meta name="twitter:description" content="Professional ductless mini-split heat pump installation. 75,000+ installs. Year-round comfort down to -30°C." />
      </Helmet>
      <HreflangTags canonicalPath="/services/mini-split-heat-pumps" />

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
            <h3 className="text-2xl font-bold text-[#333333] mb-6">{t.miniSplit.bookingModal.title}</h3>
            <div className="space-y-3">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                {t.miniSplit.bookingModal.bookQuoteOrInstall}
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                {t.miniSplit.bookingModal.bookServiceCall}
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                {t.miniSplit.bookingModal.viewFinancingOptions}
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
            alt="Modern home with mini-split heat pump system" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Mobile Product Image - Shows above content on small screens */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:hidden flex justify-center items-center -mb-4"
            >
              <div className="relative">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-1 border border-[#8dc63f]/30 rounded-2xl"></div>
                {/* Corner accents */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Mini-Split Heat Pump System" 
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
                    <span className="text-2xl font-black text-[#333333]">{t.hero.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{t.miniSplit.hero.googleReviews}</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  {t.miniSplit.hero.title1}<br />
                  <span className="text-[#8dc63f]">{t.miniSplit.hero.title2}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {t.miniSplit.hero.subtitle}
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
                    data-testid="button-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    {t.miniSplit.hero.getFreeQuote}
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-lg">
                  <p className="text-[#8dc63f] font-bold mb-1">{t.miniSplit.financing.flexibleFinancingAvailable}</p>
                  <p className="text-slate-600 text-sm">{t.miniSplit.financing.learnMoreFinancing}</p>
                </a>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.miniSplit.hero.installs}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.miniSplit.hero.satisfactionGuaranteed}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.miniSplit.hero.redSealCertified}</span>
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
                {/* Decorative border frame */}
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                {/* Corner accents */}
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Mini-Split Heat Pump System" 
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

      {/* Single-Zone vs Multi-Zone Comparison */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {t.miniSplit.comparison.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.miniSplit.comparison.singleAndMultiZone}</span> {t.miniSplit.comparison.heatPumps}
            </h2>
          </motion.div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 rounded-xl p-1.5 shadow-lg inline-flex gap-2">
              <button
                onClick={() => setActiveTab('single')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === 'single' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-single-zone"
              >
                {t.miniSplit.comparison.singleZone}
              </button>
              <button
                onClick={() => setActiveTab('multi')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === 'multi' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-multi-zone"
              >
                {t.miniSplit.comparison.multiZone}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'single' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">{t.miniSplit.comparison.singleZoneTitle}</h3>
                    <p className="text-slate-600">{t.miniSplit.comparison.singleZoneSubtitle}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  {t.miniSplit.comparison.singleZoneDesc}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">{t.miniSplit.comparison.bestApplications}</h4>
                    <ul className="space-y-2">
                      {t.miniSplit.comparison.singleZoneApplications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">{t.miniSplit.comparison.specifications}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li><span className="font-semibold">{t.miniSplit.comparison.capacity}</span> 9,000-24,000 BTU</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.efficiency}</span> 20-33 SEER</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.coldPerformance}</span> -25°C to -30°C</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.installCost}</span> $3,500 - $6,500</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.installTime}</span> 4-8 hours (same-day)</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.noiseLevel}</span> 19-24 dB (whisper-quiet)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">{t.miniSplit.comparison.annualOperatingCost}</span> {t.miniSplit.comparison.singleZoneAnnualCost}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">{t.miniSplit.comparison.multiZoneTitle}</h3>
                    <p className="text-slate-600">{t.miniSplit.comparison.multiZoneSubtitle}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  {t.miniSplit.comparison.multiZoneDesc}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">{t.miniSplit.comparison.bestApplications}</h4>
                    <ul className="space-y-2">
                      {t.miniSplit.comparison.multiZoneApplications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">{t.miniSplit.comparison.specifications}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li><span className="font-semibold">{t.miniSplit.comparison.capacity}</span> 24,000-60,000 BTU</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.zones}</span> 2-5 per outdoor unit</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.efficiency}</span> 18-30 SEER</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.installCost}</span> $8,000 - $16,000</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.installTime}</span> 2-3 days</li>
                      <li><span className="font-semibold">{t.miniSplit.comparison.energySavings}</span> 30-50% vs oil/baseboard</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">{t.miniSplit.comparison.annualOperatingCost}</span> {t.miniSplit.comparison.multiZoneAnnualCost}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#333333] text-center mb-6">{t.miniSplit.comparison.quickComparisonTable}</h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-[#333333] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">{t.miniSplit.comparison.feature}</th>
                    <th className="px-6 py-4 text-center font-bold">{t.miniSplit.comparison.singleZone}</th>
                    <th className="px-6 py-4 text-center font-bold">{t.miniSplit.comparison.multiZone}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.indoorUnits}</td>
                    <td className="px-6 py-3 text-center font-semibold">1 unit</td>
                    <td className="px-6 py-3 text-center font-semibold">2-5 units</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.coverageArea}</td>
                    <td className="px-6 py-3 text-center font-semibold">400-1,500 sq ft</td>
                    <td className="px-6 py-3 text-center font-semibold">1,500-5,000+ sq ft</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.installationCost}</td>
                    <td className="px-6 py-3 text-center font-semibold">$3,500-$6,500</td>
                    <td className="px-6 py-3 text-center font-semibold">$8,000-$16,000</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.installationTime}</td>
                    <td className="px-6 py-3 text-center font-semibold">4-8 hours</td>
                    <td className="px-6 py-3 text-center font-semibold">2-3 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.annualCost}</td>
                    <td className="px-6 py-3 text-center font-semibold">$300-$600/year</td>
                    <td className="px-6 py-3 text-center font-semibold">$1,200-$2,400/year</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">{t.miniSplit.comparison.bestFor}</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">{t.miniSplit.comparison.singleRooms}</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">{t.miniSplit.comparison.wholeHome}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Which Should I Choose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#333333] text-center mb-6">{t.miniSplit.comparison.whichShouldIChoose}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100">
                <h4 className="font-bold text-lg text-[#333333] mb-4">{t.miniSplit.comparison.chooseSingleZoneIf}</h4>
                <ul className="space-y-2">
                  {t.miniSplit.comparison.singleZoneReasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#8dc63f]">
                <h4 className="font-bold text-lg text-[#333333] mb-4">{t.miniSplit.comparison.chooseMultiZoneIf}</h4>
                <ul className="space-y-2">
                  {t.miniSplit.comparison.multiZoneReasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA after comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#333333] rounded-2xl p-8 max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">{t.miniSplit.comparison.notSureTitle}</h3>
            <p className="text-white/70 mb-6">{t.miniSplit.comparison.notSureDesc}</p>
            <Button 
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-10 rounded-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              {t.miniSplit.comparison.bookFreeConsultation}
            </Button>
          </motion.div>
        </div>
      </section>

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
              {t.miniSplit.services.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.miniSplit.services.miniSplitHeatPumps}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t.miniSplit.services.sectionDesc}
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
              <h3 className="text-xl font-semibold text-white mb-4">{t.miniSplit.services.installation}</h3>
              <ul className="space-y-3">
                {t.miniSplit.services.installationServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  {t.miniSplit.services.getFreeQuote}
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
              <h3 className="text-xl font-semibold text-white mb-4">{t.miniSplit.services.repair}</h3>
              <ul className="space-y-3">
                {t.miniSplit.services.repairServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 border border-white/40"
              >
                {t.miniSplit.services.bookServiceCall}
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
              <h3 className="text-xl font-semibold text-white mb-4">{t.miniSplit.services.maintenance}</h3>
              <ul className="space-y-3">
                {t.miniSplit.services.maintenanceServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 border border-white/40"
              >
                {t.miniSplit.services.scheduleMaintenance}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA after Services */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-slate-600 mb-4">{t.miniSplit.services.readyToDiscuss}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 px-8 rounded-xl"
                onClick={() => setShowBookingModal(true)}
              >
                {t.miniSplit.services.scheduleFreeConsultation}
              </Button>
              <a 
                href="tel:18003809384"
                className="border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold h-12 px-8 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] uppercase tracking-tight">
              {t.miniSplit.whyChoose.sectionTitle}<br />
              <span className="text-[#8dc63f]">{t.miniSplit.whyChoose.miniSplitHeatPumps}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              {t.miniSplit.whyChoose.sectionDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseMiniSplit.map((card, i) => (
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
                    alt={t.miniSplit.whyChoose.cards[i]?.title || card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-3">{t.miniSplit.whyChoose.cards[i]?.title || card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.miniSplit.whyChoose.cards[i]?.desc || card.desc}</p>
                  {i === 3 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      <a
                        href="/provincial-incentives"
                        className="text-sm font-semibold text-[#8dc63f] hover:text-[#709c32] underline"
                      >
                        {t.miniSplit.whyChoose.viewIncentives}
                      </a>
                      <a
                        href="/financing" target="_blank" rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#8dc63f] hover:text-[#709c32] underline"
                      >
                        {t.miniSplit.whyChoose.seeWhatYouQualifyFor}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regional Climate Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-100 rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4 text-[#8dc63f]">{t.miniSplit.whyChoose.atlanticProvincesTitle}</h3>
              <ul className="space-y-2">
                {t.miniSplit.whyChoose.atlanticFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-100 rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4 text-[#8dc63f]">{t.miniSplit.whyChoose.bcTitle}</h3>
              <ul className="space-y-2">
                {t.miniSplit.whyChoose.bcFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-[#8dc63f] rounded-2xl p-8 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">{t.miniSplit.whyChoose.averageInstallationCosts}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <p className="text-white/80 text-sm mb-2">{t.miniSplit.whyChoose.singleZoneSystem}</p>
                <p className="text-3xl font-black text-white">$3,500 - $6,500</p>
                <p className="text-white/70 text-sm mt-1">{t.miniSplit.whyChoose.installed}</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                <p className="text-white/80 text-sm mb-2">{t.miniSplit.whyChoose.multiZoneSystem}</p>
                <p className="text-3xl font-black text-white">$8,000 - $16,000</p>
                <p className="text-white/70 text-sm mt-1">{t.miniSplit.whyChoose.installed}</p>
              </div>
            </div>
            <p className="text-white/90 mt-6 text-sm">
              {t.miniSplit.whyChoose.pricingNote} <br />
              <span className="font-bold">{t.miniSplit.whyChoose.financingNote}</span>
            </p>
            <Button 
              size="lg"
              className="mt-6 bg-white text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-8 rounded-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              {t.miniSplit.whyChoose.getYourFreeQuoteToday}
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
              {t.miniSplit.installationProcess.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.miniSplit.installationProcess.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.miniSplit.installationProcess.sectionDesc}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} />
            ))}
          </div>

          {/* Timeline Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto pl-24 pr-0"
          >
          <div className="bg-[#333333] text-white rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-6 text-center">{t.miniSplit.installationProcess.timelineTitle}</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-[#8dc63f] font-bold text-lg mb-1">{t.miniSplit.installationProcess.expressTitle}</p>
                <p className="text-2xl font-black">{t.miniSplit.installationProcess.expressTime}</p>
                <p className="text-white/60 text-sm">{t.miniSplit.installationProcess.expressDesc}</p>
              </div>
              <div>
                <p className="text-[#8dc63f] font-bold text-lg mb-1">{t.miniSplit.installationProcess.standardTitle}</p>
                <p className="text-2xl font-black">{t.miniSplit.installationProcess.standardTime}</p>
                <p className="text-white/60 text-sm">{t.miniSplit.installationProcess.standardDesc}</p>
              </div>
              <div>
                <p className="text-[#8dc63f] font-bold text-lg mb-1">{t.miniSplit.installationProcess.peakTitle}</p>
                <p className="text-2xl font-black">{t.miniSplit.installationProcess.peakTime}</p>
                <p className="text-white/60 text-sm">{t.miniSplit.installationProcess.peakDesc}</p>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Brands We Install Section */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
              {t.miniSplit.brands.sectionTitle}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t.miniSplit.brands.sectionDesc}
            </p>
          </motion.div>
          <BrandCardsGrid columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-6" />
          <div className="text-center mt-8 space-x-6">
            <a href="/financing" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:text-[#709c32] font-bold inline-flex items-center gap-2" data-testid="link-explore-financing">
              {t.miniSplit.brands.exploreFinancing} <ChevronRight className="w-4 h-4" />
            </a>
            <a href="/provincial-incentives" className="text-[#8dc63f] hover:text-[#709c32] font-bold inline-flex items-center gap-2" data-testid="link-view-rebates">
              {t.miniSplit.brands.viewGovernmentRebates} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Trust Signals */}
      <section className="py-12 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#8dc63f] text-[#8dc63f]" />
                ))}
              </div>
              <span className="font-bold">{t.miniSplit.trustSignals.reviews}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>{t.miniSplit.trustSignals.licensedInsured}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>{t.miniSplit.trustSignals.provinces}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>{t.miniSplit.trustSignals.installations}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            {t.miniSplit.finalCta.title} <span className="text-[#8dc63f]">{t.miniSplit.finalCta.titleHighlight}</span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t.miniSplit.finalCta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              {t.miniSplit.finalCta.bookFreeConsultation}
            </Button>
            <a 
              href="tel:18003809384"
              className="border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.miniSplit.finalCta.call} 1 (800) 380-9384
            </a>
          </div>
        </div>
      </section>

      <ServiceFAQSection 
        category="Mini-Split" 
        title={t.miniSplit.faq.title}
      />

      <ServiceSchemaWithFAQs
        serviceName="Mini-Split Heat Pump Installation, Repair & Maintenance"
        serviceDescription="Professional mini-split ductless heat pump services including installation, repair, and maintenance across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Cold-climate rated systems for Canadian winters."
        serviceType="HVAC Service"
        serviceUrl="https://www.greenfootenergy.ca/services/mini-split-heat-pumps"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 2500 }}
        faqCategory="Mini-Split"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Mini-Split Heat Pumps", url: "https://www.greenfootenergy.ca/services/mini-split-heat-pumps" },
        ]}
      />


      <OtherServicesGrid exclude="miniSplit" />

      <RelatedContent currentPath="/services/mini-split-heat-pumps" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
