import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Thermometer, Wind, MapPin, Snowflake, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

import heroBg from "@assets/Gridless_home_hero_background_1767989380726.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import gridlessProductsHero from "@/assets/images/gridless-products-hero.png";
import heatPumpIcon from "@assets/Heat_Pump_icon_1768933618655.avif";
import acIcon from "@/assets/images/air-conditioning-icon.avif";
import geothermalIcon from "@/assets/images/geothermal-icon.png";

const serviceCategories = [
  {
    title: "Mini-Split Heat Pumps",
    icon: "mini-split",
    href: "/services/mini-split-heat-pumps"
  },
  {
    title: "Ducted-Central Heat Pumps",
    icon: "ducted",
    href: "/services/ducted-central-heat-pumps"
  },
  {
    title: "Geothermal Heat Pumps",
    icon: "geothermal",
    href: "/services/geothermal-heat-pumps"
  },
  {
    title: "Air Conditioning",
    icon: "ac",
    href: "/services/air-conditioning"
  }
];

const heatPumpServices = [
  "Cold-climate ductless mini-splits",
  "Whole-home ducted heat pump systems",
  "Geothermal heating & cooling",
  "Hybrid heat pump/gas furnace combos"
];

const acServices = [
  "High-efficiency central AC units",
  "Inverter-driven systems (30%+ savings)",
  "Smart thermostat integration",
  "Ductwork evaluation & sealing"
];

const tuneUpServices = [
  "Clean condenser & evaporator coils",
  "Clear drain lines to prevent leaks",
  "Check refrigerant levels & pressures",
  "Inspect electrical connections",
  "Test thermostat calibration",
  "Lubricate moving parts",
  "Verify airflow efficiency",
  "Check ductwork for leaks (if applicable)",
  "Monitor system start-up cycle",
  "Test safety controls & switches",
  "Measure temperature differentials",
  "Assess compressor operation",
  "Tighten all electrical components",
  "Inspect filters & recommend upgrades",
  "Check for wear on belts/pulleys",
  "Review system history for recurring issues",
  "Provide efficiency assessment",
  "Recommend priority repairs",
  "Review maintenance schedule",
  "Explain findings in plain terms"
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Cold-Climate Specialists",
    desc: "Our technicians specialize in cold-climate systems rated to -30°C. We've installed 75,000+ units across 5 Canadian provinces, understanding the unique heating demands of Atlantic and BC winters."
  },
  {
    image: experienceImage,
    title: "Certified Multi-Brand Installers",
    desc: "Factory-certified for Gridless, Mitsubishi Electric, Daikin, Kerr, and LG systems. Our manufacturer certifications ensure your warranty stays valid and your system performs optimally."
  },
  {
    image: satisfactionImage,
    title: "Complete Service Coverage",
    desc: "From installation to maintenance and repairs, we handle everything. Our team provides year-round support to keep your home comfortable in every season."
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
    title: "Free In-Home Heat Pump & A/C Consultation",
    intro: "A certified advisor visits your home to:",
    details: [
      "Assess heating/cooling requirements (room-by-room load calculation)",
      "Evaluate electrical capacity (dedicated 240V circuit check)",
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
    title: "Professional Heat Pump & A/C Installation",
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
      "Remote control operation (heat, cool, auto, dry)",
      "Temperature settings and energy-saving features",
      "Filter cleaning demonstration",
      "Maintenance schedule review"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" }
  },
  {
    step: 5,
    title: "Enjoy Lasting Comfort",
    intro: "Your home stays warm in winter, cool in summer, with lower energy costs and ongoing support from our team.",
    details: []
  }
];

const GeothermalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="8" width="32" height="20" rx="3" stroke="#333333" strokeWidth="2" fill="none"/>
    <line x1="24" y1="28" x2="24" y2="56" stroke="#333333" strokeWidth="2"/>
    <line x1="40" y1="28" x2="40" y2="56" stroke="#333333" strokeWidth="2"/>
    <path d="M24 40 Q28 44 24 48" stroke="#333333" strokeWidth="1.5" fill="none"/>
    <path d="M40 36 Q44 40 40 44" stroke="#333333" strokeWidth="1.5" fill="none"/>
    <line x1="12" y1="56" x2="52" y2="56" stroke="#333333" strokeWidth="2"/>
    <rect x="20" y="12" width="24" height="4" rx="1" fill="#333333"/>
  </svg>
);

const ACIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 32 Q32 20 44 32" stroke="#333333" strokeWidth="2" fill="none"/>
    <path d="M24 36 Q32 28 40 36" stroke="#333333" strokeWidth="2" fill="none"/>
    <path d="M28 40 Q32 36 36 40" stroke="#333333" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="44" r="2" fill="#333333"/>
  </svg>
);

const getServiceIcon = (iconType: string) => {
  switch (iconType) {
    case 'mini-split':
    case 'ducted':
      return <img src={heatPumpIcon} alt="Heat Pump" className="w-10 h-10 object-contain" />;
    case 'geothermal':
      return <img src={geothermalIcon} alt="Geothermal" className="w-10 h-10 object-contain" />;
    case 'ac':
      return <img src={acIcon} alt="Air Conditioning" className="w-10 h-10 object-contain" />;
    default:
      return <img src={heatPumpIcon} alt="Heat Pump" className="w-10 h-10 object-contain" />;
  }
};

export default function HeatPumpsACPage() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

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
        <title>Heat Pumps & AC Installation Canada | Greenfoot Energy</title>
        <meta name="description" content="Expert heat pump & air conditioning services across NS, NB, PEI, NFLD & BC. Cold-climate systems rated to -30°C. 75,000+ installs. Free consultation." />
        <meta name="keywords" content="heat pump installation, air conditioning, cold climate heat pump, mini-split heat pump, ducted heat pump, HVAC Canada, heating and cooling" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/heat-pumps-and-air-conditioning" />
        
        <meta property="og:title" content="Heat Pumps & AC Installation | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Expert heat pump & AC services across Atlantic Canada & BC. Cold-climate systems rated to -30°C. Free consultation available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/heat-pumps-and-air-conditioning" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Heat Pumps & AC Installation | Greenfoot Energy" />
        <meta name="twitter:description" content="Expert heat pump & AC services. Cold-climate systems rated to -30°C." />
      </Helmet>
      <SiteHeader />

      {/* SEO Schema */}
      <ServiceSchemaWithFAQs 
        serviceName="Heat Pumps & Air Conditioning"
        serviceDescription="Professional heat pump and air conditioning installation, repair, and maintenance services across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia."
        serviceType="HVAC Services"
        serviceUrl="https://www.greenfootenergy.ca/services/heat-pumps-and-air-conditioning"
        areaServed={["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador", "British Columbia"]}
        faqCategory="heat-pumps-ac"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Heat Pumps & Air Conditioning", url: "https://www.greenfootenergy.ca/services/heat-pumps-and-air-conditioning" }
        ]}
      />

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
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold py-4 px-6 rounded-xl text-center transition-colors"
              >
                Book a Quote or Install
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold py-4 px-6 rounded-xl text-center transition-colors"
              >
                Book a Service Call
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
            alt="Heat pump and air conditioning service background" 
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
                  src={gridlessProductsHero} 
                  alt="Heat Pump & Air Conditioning Systems" 
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
                  <span className="text-[#8dc63f]">High-Efficiency</span><br />
                  Heat Pumps & Air Conditioning <span className="text-[#8dc63f]">Solutions</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  We are your reliable source for all your heat pump & A/C repair, installation and maintenance needs. Our team of experts is dedicated to providing top-notch services that will keep your home or business cool and comfortable all year round.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a 
                    href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                    data-testid="button-call-phone"
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
                <div className="absolute -inset-6 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-3 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-8 -left-8 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-8 -right-8 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={gridlessProductsHero} 
                  alt="Heat Pump & Air Conditioning Systems" 
                  className="w-[400px] xl:w-[500px] h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Your One-Stop Shop Section */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-[#333333] rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 uppercase">
                Your One-Stop Shop For<br />
                <span className="text-[#8dc63f]">Heat Pumps & Air Conditioners</span>
              </h2>
              <p className="text-base md:text-lg text-white/80">We repair and install all brands and models!</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {serviceCategories.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={service.href}>
                    <div className="bg-[#f5f0eb] hover:bg-[#ebe5df] transition-all duration-300 rounded-2xl py-6 md:py-8 px-5 md:px-6 flex items-center gap-4 md:gap-5 cursor-pointer group" data-testid={`link-service-${service.icon}`}>
                      <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                        {getServiceIcon(service.icon)}
                      </div>
                      <span className="text-lg md:text-xl font-bold text-[#333333] group-hover:text-[#8dc63f] transition-colors">
                        {service.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Description Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              Professional Heat Pumps & Air Conditioning <span className="text-[#8dc63f]">Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We are your trusted partner for all your heat pump and air conditioning repair, installation, and maintenance needs. Our team of skilled technicians is committed to delivering exceptional services that ensure your home or business remains cool and comfortable throughout the year.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Heat Pump Services */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333]">Heat Pump Services</h3>
              </div>
              <ul className="space-y-3">
                {heatPumpServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Air Conditioning Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333]">Air Conditioning Services</h3>
              </div>
              <ul className="space-y-3">
                {acServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Tune-Up Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-5xl mx-auto"
          >
            <div className="bg-[#333333] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                What do we do during a Heat Pump or A/C performance tune-up?
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {tuneUpServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-white/90 text-sm">{service}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl inline-flex items-center justify-center gap-2"
                  data-testid="button-book-tuneup"
                >
                  Book Your Tune-Up Today
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              Why Should I Choose <span className="text-[#8dc63f]">Greenfoot Energy</span> for Heat Pumps & AC?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#333333] mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                  {item.links && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.links.map((link, idx) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto" data-testid="link-financing-cta">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
            </a>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-why-quote"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get a Free Quote
              </Button>
              <button
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-why-service"
              >
                Book Service or Repair
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Installation Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight">
              How Long Does a Heat Pump & AC<br />
              <span className="text-[#8dc63f]">Installation Take?</span>
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
              Greenfoot Energy's heat pump or A/C installation process typically takes 1-3 weeks from initial consultation to completed installation. Same-day installation is possible for single-zone systems once equipment arrives.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {installationSteps.map((step, index) => (
              <div
                key={step.step}
                ref={el => { stepRefs.current[index] = el; }}
              >
                <ScrollStepItem 
                  step={step} 
                  index={index}
                  total={installationSteps.length}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready to help you find the perfect heating and cooling solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a 
                href="tel:18003809384"
                className="bg-white hover:bg-slate-100 text-[#333333] font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                data-testid="button-cta-call"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-cta-quote"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Free Quote
              </Button>
              <button
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-cta-maintenance"
              >
                Book Maintenance
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="heatPumpsAC" />


      <SiteFooter />
    </div>
  );
}
