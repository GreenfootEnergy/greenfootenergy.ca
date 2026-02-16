import { motion } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Zap, Volume2, Shield, Wrench, Settings, ArrowRight, Snowflake, Wind, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-[#333333]">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-6 pb-5"
        >
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

import acUnitsImage from "@assets/ac-units-gridless.webp";
import heroBg from "@assets/ac-family-gridless-hero.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const installationServices = [
  "Free in-home cooling assessment",
  "Professional electrical and refrigerant line installation",
  "System testing and commissioning",
  "1-year labor warranty (plus manufacturer equipment warranty)",
  "Full training on system operation"
];

const repairServices = [
  "Refrigerant leaks and recharging",
  "Compressor and fan motor replacement",
  "Electronic control board issues",
  "Thermostat malfunctions",
  "Drainage problems"
];

const maintenanceServices = [
  "Indoor and outdoor coil cleaning",
  "Filter replacement or cleaning",
  "Refrigerant level check",
  "Electrical connection inspection",
  "Condensate drain clearing",
  "Performance testing"
];

const whyChooseAC = [
  {
    image: prideImage,
    title: "Cooling Specialists for Canadian Summers",
    desc: "Our technicians specialize in high-efficiency cooling systems designed for Canadian humidity. We've installed 75,000+ systems across 5 provinces, understanding the unique cooling demands of Atlantic and BC summers."
  },
  {
    image: experienceImage,
    title: "Certified Multi-Brand Installers",
    desc: "Factory-certified for Gridless, Mitsubishi Electric, Daikin, Kerr, and LG air conditioning systems. Our manufacturer certifications ensure your warranty stays valid and your system performs optimally."
  },
  {
    image: satisfactionImage,
    title: "Energy-Efficient Cooling Solutions",
    desc: "Modern mini-split air conditioners use up to 40% less energy than traditional window units. Our high-SEER systems deliver whisper-quiet comfort while keeping your energy bills low."
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

const installationSteps = [
  {
    step: 1,
    title: "Free In-Home Cooling Consultation",
    intro: "A certified advisor visits your home to:",
    details: [
      "Assess cooling requirements (room-by-room load calculation)",
      "Evaluate electrical capacity (dedicated circuit check)",
      "Identify optimal indoor and outdoor unit locations",
      "Discuss equipment options and brand preferences",
      "Provide detailed written quote with specs and pricing",
      "Explain available rebates and financing options"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Quote Review & Equipment Ordering",
    intro: "Once you approve the quote:",
    details: [
      "Equipment ordered from supplier (typically in stock)",
      "Installation date scheduled based on your availability",
      "Electrical permit obtained if required",
      "Pre-installation checklist provided"
    ],
    footer: { timeline: "Arrival within 3-7 business days" }
  },
  {
    step: 3,
    title: "Professional Air Conditioner Installation",
    intro: "Certified technicians handle everything from mounting to commissioning:",
    details: [
      "Mount indoor and outdoor units",
      "Refrigerant line penetration and electrical connection",
      "Condensate drain line installation",
      "Vacuum test and refrigerant charging",
      "Full system startup and testing",
      "Complete cleanup and debris removal"
    ],
    footer: { singleZone: "4-8 hours", multiZone: "2-3 days" }
  },
  {
    step: 4,
    title: "System Training & Demonstration",
    intro: "Your technician provides hands-on training:",
    details: [
      "Remote control operation (cool, dry, fan, auto modes)",
      "Temperature settings and energy-saving features",
      "Filter cleaning demonstration",
      "Maintenance schedule review"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" }
  },
  {
    step: 5,
    title: "Enjoy Cool, Comfortable Summers",
    intro: "Your home stays perfectly cool during hot, humid summers, with lower energy costs and ongoing support from our team.",
    details: []
  }
];

const acFAQs = [
  {
    question: "Why is my air conditioner blowing warm air?",
    answer: "Common causes include low refrigerant levels, a malfunctioning outdoor condenser, or thermostat issues. Our experienced technicians can quickly diagnose and resolve the problem to restore your home's comfort."
  },
  {
    question: "What size air conditioner do I need for my home?",
    answer: "Proper AC sizing depends on your home's square footage, ceiling height, insulation quality, and local climate conditions. Our HVAC professionals perform detailed load calculations to determine the right tonnage for optimal comfort and efficiency. Contact us for a free assessment and personalized quote."
  },
  {
    question: "What does SEER rating mean and why is it important?",
    answer: "SEER (Seasonal Energy Efficiency Ratio) measures your AC's cooling output per unit of energy consumed. Higher SEER ratings (16-20+) mean lower operating costs and better environmental performance."
  },
  {
    question: "How often should I have my air conditioning system serviced?",
    answer: "We recommend professional AC maintenance twice a year—once in spring before cooling season and once in fall. Regular servicing helps maintain efficiency, prevents breakdowns, and extends your system's lifespan. Our certified technicians serve customers across New Brunswick, Nova Scotia, Newfoundland & Labrador, Prince Edward Island, and British Columbia with 17 convenient locations."
  },
  {
    question: "How long does a residential air conditioning system typically last?",
    answer: "With proper maintenance, most central air conditioners operate reliably for 10-15 years. Regular tune-ups, filter changes, and prompt repairs can help maximize your system's lifespan and performance."
  },
  {
    question: "How can I improve my air conditioner's energy efficiency?",
    answer: "Regular maintenance, clean filters, proper thermostat settings (74-76°F in summer), and ensuring good airflow around your outdoor unit all help improve efficiency. Our team can provide personalized energy-saving recommendations during your service visit."
  },
  {
    question: "What is the best type of air conditioner for Canadian homes?",
    answer: "Mini-split ductless air conditioners are the best choice for most Canadian homes. They provide efficient cooling without requiring ductwork, operate quietly, and many models also provide heating for year-round comfort. They're especially effective in homes without existing central air systems."
  },
  {
    question: "Do mini-split air conditioners work in humid Atlantic Canada summers?",
    answer: "Yes, mini-split air conditioners excel in humid conditions. They have built-in dehumidification that removes moisture from the air while cooling, making your home more comfortable during Nova Scotia, New Brunswick, and PEI's humid summers."
  },
  {
    question: "Can a mini-split provide both heating and cooling?",
    answer: "Absolutely. Most modern mini-split systems are heat pumps that provide efficient cooling in summer and heating in winter. Our cold-climate models work effectively down to -30°C, giving you year-round comfort from a single system."
  },
  {
    question: "How much does air conditioning installation cost in Canada?",
    answer: "Air conditioning installation costs vary based on system type and home size. Single-zone mini-split systems typically range from $3,500 to $6,500, while multi-zone systems for whole-home cooling range from $8,000 to $16,000. We provide free in-home consultations with detailed quotes."
  },
  {
    question: "How long does air conditioner installation take?",
    answer: "Single-zone air conditioner installation typically takes 4-8 hours and is completed the same day. Multi-zone systems serving multiple rooms take 2-3 days. We schedule installations at your convenience and clean up completely when finished."
  },
  {
    question: "Are there rebates available for air conditioning installation in Atlantic Canada?",
    answer: "Yes, various federal and provincial rebates may be available for high-efficiency heat pump air conditioning systems in Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Our team helps you identify and apply for all available incentives to maximize your savings."
  },
  {
    question: "How quiet are mini-split air conditioners compared to window units?",
    answer: "Mini-split air conditioners are remarkably quiet, operating at just 19-24 decibels indoors—quieter than a library. Window units typically run at 50-60 decibels. The outdoor units are also designed for minimal noise impact, making mini-splits ideal for bedrooms and quiet living spaces."
  },
  {
    question: "What areas in Canada does Greenfoot Energy service for air conditioning?",
    answer: "Greenfoot Energy Solutions provides air conditioning installation, repair, and maintenance across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland & Labrador, and British Columbia. We have 17 convenient locations throughout these provinces for fast, reliable local service."
  }
];

export default function AirConditioningPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Air Conditioning Installation & Service | Greenfoot Energy</title>
        <meta name="description" content="Professional AC installation, repair & maintenance across NS, NB, PEI, NFLD & BC. Energy-efficient mini-split systems. 75,000+ installs. Free assessment." />
        <meta name="keywords" content="air conditioning installation, AC repair, mini-split AC, ductless air conditioner, HVAC services Canada, cooling systems, air conditioning service" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/air-conditioning" />
        
        <meta property="og:title" content="Air Conditioning Installation & Service | Greenfoot Energy" />
        <meta property="og:description" content="Professional AC installation & service across Atlantic Canada & BC. Energy-efficient cooling solutions with free assessment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/air-conditioning" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Air Conditioning Installation & Service | Greenfoot Energy" />
        <meta name="twitter:description" content="Professional AC installation & service. Energy-efficient cooling solutions." />
      </Helmet>
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
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
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
      <div className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Air conditioning service hero background" 
            className="w-full h-full object-cover object-right scale-110"
          />
        </div>
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
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-1 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img 
                  src={acUnitsImage} 
                  alt="Air Conditioning System" 
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
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">5000+ Google Reviews</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  Air Conditioning<br />
                  <span className="text-[#8dc63f]">Installation & Service</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Professional cooling solutions across NS, NB, PEI, NFLD & BC. Stay comfortable all summer with energy-efficient mini-split air conditioners.
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
                    Get Free Quote
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-lg">
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
                    <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">75,000+ Installs</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Satisfaction Guaranteed</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Red Seal Certified</span>
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
                  src={acUnitsImage} 
                  alt="Air Conditioning System" 
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

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why Choose{" "}
              <span className="text-[#8dc63f]">Mini-Split Air Conditioning?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Modern ductless cooling for Canadian homes—efficient, quiet, and easy to install.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Snowflake className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Powerful Cooling</h3>
              <p className="text-sm text-slate-600">Keeps your home cool even during the hottest, most humid summer days.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Energy Efficient</h3>
              <p className="text-sm text-slate-600">Up to 40% more efficient than window units with inverter technology.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Whisper Quiet</h3>
              <p className="text-sm text-slate-600">Indoor units operate at just 19-24 dB—quieter than a library.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wind className="w-7 h-7 text-[#8dc63f]" />
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">Dehumidification</h3>
              <p className="text-sm text-slate-600">Removes excess humidity for comfort in Atlantic Canada's muggy summers.</p>
            </motion.div>
          </div>
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
              What Services Does Greenfoot Energy Offer for{" "}
              <span className="text-[#8dc63f]">Air Conditioning?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Greenfoot Energy Solutions provides complete air conditioning services across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia.
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
              <h3 className="text-xl font-semibold text-white mb-4">Installation</h3>
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
                  Get Free Quote
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
              <h3 className="text-xl font-semibold text-white mb-4">Repair</h3>
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
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all border border-white/40"
              >
                Book Service Call
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
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Maintenance</h3>
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
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all border border-white/40"
              >
                Schedule Maintenance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
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
              Why Choose Greenfoot for<br />
              <span className="text-[#8dc63f]">Air Conditioning?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Greenfoot Energy is Atlantic Canada and BC's leading cooling system installer with specialized expertise in high-efficiency mini-split air conditioners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseAC.map((card, i) => (
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
                    loading="lazy"
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
                          className="text-sm font-semibold text-[#8dc63f] hover:underline flex items-center gap-1"
                        >
                          {link.text}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Does <span className="text-[#8dc63f]">Air Conditioning Installation</span> Work?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From free consultation to cool comfort—here's what to expect.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {installationSteps.map((step, index) => (
              <ScrollStepItem key={index} step={step} index={index} total={installationSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333]">
              Common Questions About <span className="text-[#8dc63f]">Air Conditioning</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {acFAQs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready for <span className="text-[#8dc63f]">Cool, Comfortable Summers?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Get a free in-home consultation and quote. Our certified technicians will assess your home and recommend the perfect cooling solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:18003809384"
                className="bg-white hover:bg-gray-100 text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Book Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName="Air Conditioning Installation, Repair & Maintenance"
        serviceDescription="Professional air conditioning installation, repair, and maintenance across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Energy-efficient mini-split AC systems for Canadian homes."
        serviceType="Air Conditioning Service"
        serviceUrl="https://www.greenfootenergy.ca/services/air-conditioning"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 2500 }}
        faqCategory="Air-Conditioning"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Air Conditioning", url: "https://www.greenfootenergy.ca/services/air-conditioning" },
        ]}
      />


      <OtherServicesGrid exclude="airConditioning" />

      <RelatedContent currentPath="/services/air-conditioning" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
