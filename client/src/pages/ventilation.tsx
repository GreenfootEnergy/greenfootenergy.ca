import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Wind, Droplets, Shield, Calendar, ArrowRight, Sparkles, Home, Leaf, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import heroBg from "@assets/Gridless_home_hero_background_1767989380726.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import fantechUnit from "@assets/68eda139db1e37ad14d96ee2_fantech_1768931573769.webp";
import venmarUnit from "@assets/venmar_1768931573769.avif";
import heroProductImage from "@assets/Ventilation_hero_1769034262727.avif";

const hrvFeatures = [
  "Recovers heat from outgoing air to pre-warm incoming air",
  "Best suited for cold climates with long heating seasons",
  "Balances indoor humidity by exhausting excess moisture",
  "Continuous fresh air circulation without major energy loss"
];

const hrvBenefits = [
  "Lower heating costs in winter",
  "Improved indoor air quality",
  "Helps prevent condensation and mold growth",
  "Consistent comfort in tightly sealed homes"
];

const ervFeatures = [
  "Recovers both heat and moisture from outgoing air",
  "Ideal for humid or mixed climates",
  "Reduces incoming humidity in summer",
  "Retains indoor humidity in winter"
];

const ervBenefits = [
  "Year-round comfort in any climate",
  "Better humidity control than HRV",
  "Reduced HVAC load and energy costs",
  "Healthier indoor environment"
];

const airQualityServices = [
  "Air Filtration Systems - Remove pollutants, allergens, and contaminants",
  "Duct Cleaning - Remove dust, dirt, and debris from ductwork",
  "UV Air Purifiers - Kill bacteria, viruses, and mold spores",
  "Carbon Monoxide Detectors - Protect your family with reliable detection",
  "Whole-Home Humidifiers and Dehumidifiers - Maintain optimal humidity levels"
];

const whyChooseVentilation = [
  {
    image: prideImage,
    title: "Indoor Air Quality Specialists",
    desc: "Our technicians specialize in HRV/ERV systems and indoor air quality solutions. We've helped thousands of Canadian homeowners breathe easier with professional ventilation installations."
  },
  {
    image: experienceImage,
    title: "Certified Ventilation Installers",
    desc: "Factory-certified for Fantech, Venmar, and other leading ventilation brands. Our manufacturer certifications ensure your warranty stays valid and your system performs optimally."
  },
  {
    image: satisfactionImage,
    title: "Custom Ventilation Design",
    desc: "Whether you need a single HRV unit or whole-home ventilation with HEPA filtration, we design custom solutions. Our airflow calculations ensure proper CFM sizing for maximum efficiency."
  },
  {
    image: dedicatedImage,
    title: "Rebate & Financing Assistance",
    desc: "We help you access available rebates and incentives. Flexible financing options available—conditions apply.",
    links: [
      { text: "View Incentives", href: "/provincial-incentives" },
      { text: "See What You Qualify For", href: "/financing" }
    ]
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free HRV System Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive heat recovery ventilation evaluation at no cost:",
    details: [
      "Assess your home's air quality needs",
      "Evaluate existing ventilation systems",
      "Check insulation levels and air circulation patterns",
      "Design the perfect HRV/ERV solution",
      "Provide detailed written quote with specs and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "HRV Installation Scheduling",
    intro: "Following your home ventilation assessment, our dispatch team contacts you directly:",
    details: [
      "Schedule your preferred installation date",
      "Confirm equipment specifications",
      "Provide pre-installation checklist",
      "Secure permits if required"
    ],
    footer: { timeline: "Typically within 1-2 weeks" }
  },
  {
    step: 3,
    title: "Professional HRV System Installation",
    intro: "Our experienced installation team arrives fully equipped:",
    details: [
      "Mount HRV/ERV unit in optimal location",
      "Run ductwork for fresh air intake and exhaust",
      "Connect to existing HVAC system if applicable",
      "Test air exchange performance",
      "Complete cleanup and debris removal"
    ],
    footer: { timeline: "Typically completed in 1 day" }
  },
  {
    step: 4,
    title: "System Training & Demonstration",
    intro: "Once installation is complete, our technicians provide comprehensive training:",
    details: [
      "Control settings and operation modes",
      "Air exchange rate adjustments",
      "Filter cleaning and replacement schedule",
      "Seasonal maintenance requirements"
    ],
    footer: { timeline: "30-minute orientation included" }
  },
  {
    step: 5,
    title: "Breathe Easy",
    intro: "Enjoy fresher, healthier air in your home with lower energy costs and ongoing support from our team.",
    details: []
  }
];

const faqs = [
  {
    question: "What's the difference between air purifiers and UV lights?",
    answer: "Air purifiers filter particles like dust, pollen, and allergens from your air, while UV lights neutralize biological contaminants like bacteria, viruses, and mold. Many homeowners benefit from combining both technologies for comprehensive air quality improvement."
  },
  {
    question: "What indoor air quality solutions does Greenfoot offer?",
    answer: "We provide comprehensive indoor air quality solutions including air purifiers, UV lights, humidity control systems, and ventilation improvements. These systems work with your HVAC to create healthier indoor environments throughout our service areas in Atlantic Canada and British Columbia."
  },
  {
    question: "How often do air quality systems need maintenance?",
    answer: "Maintenance varies by system type—filters typically need replacement every 3-12 months, while UV lights need annual bulb replacement. Our maintenance plans ensure your air quality systems continue operating effectively."
  },
  {
    question: "How do I know if my home has indoor air quality issues?",
    answer: "Common signs include persistent odors, excessive dust, humidity problems, or respiratory irritation. Our indoor air quality specialists can assess your home's air quality and recommend targeted solutions for your specific concerns."
  },
  {
    question: "Do indoor air quality improvements increase home value?",
    answer: "Yes, indoor air quality improvements are increasingly valued by homebuyers, particularly those with health concerns or allergies. These systems also contribute to overall home comfort and HVAC system efficiency."
  },
  {
    question: "Can indoor air quality systems help with allergies?",
    answer: "Yes, properly selected air quality systems can significantly reduce airborne allergens like pollen, dust mites, and pet dander. Our specialists help choose solutions targeted to your specific allergy triggers and sensitivities."
  }
];

export default function VentilationPage() {
  const [activeTab, setActiveTab] = useState<'hrv' | 'erv'>('hrv');
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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
        <title>HRV & Ventilation Systems | Indoor Air Quality | Greenfoot</title>
        <meta name="description" content="Professional HRV & ERV ventilation installation across NS, NB, PEI, NFLD & BC. Improve indoor air quality & energy efficiency. Free assessment available." />
        <meta name="keywords" content="HRV installation, ERV system, heat recovery ventilator, energy recovery ventilator, indoor air quality, ventilation system, air exchange" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/ventilation" />
        
        <meta property="og:title" content="HRV & Ventilation Systems | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional HRV & ERV installation across Atlantic Canada & BC. Improve indoor air quality & energy efficiency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/ventilation" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HRV & Ventilation Systems | Greenfoot Energy" />
        <meta name="twitter:description" content="Professional HRV & ERV installation. Improve indoor air quality & energy efficiency." />
      </Helmet>
      <SiteHeader />

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-[#333333] mb-6">How can we help?</h3>
            <div className="space-y-3">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold py-4 px-6 rounded-xl text-center transition-colors"
                data-testid="link-book-quote"
              >
                Book a Quote or Install
              </a>
              <button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold py-4 px-6 rounded-xl text-center transition-colors"
                data-testid="link-book-service"
              >
                Book a Service Call
              </button>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold py-4 px-6 rounded-xl text-center transition-colors"
                data-testid="link-financing"
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
            alt="Modern home with ventilation system" 
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
                  alt="Indoor Air Quality & Ventilation" 
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))' }}
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
                  Indoor Air Quality<br />
                  <span className="text-[#8dc63f]">& Ventilation</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Heat and Energy Recovery Ventilators (HRVs/ERVs) bring in fresh air while keeping the warmth your home has already produced. Energy-efficient ventilation for healthier living.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a 
                    href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                    data-testid="link-phone"
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
                  alt="Indoor Air Quality & Ventilation" 
                  className="w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.25))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* HRV vs ERV Comparison Section */}
      <section id="hrv-erv" className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What's the Difference Between{" "}
              <span className="text-[#8dc63f]">HRV and ERV</span> Systems?
            </h2>
          </motion.div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 rounded-xl p-1.5 shadow-lg inline-flex gap-2">
              <button
                onClick={() => setActiveTab('hrv')}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'hrv' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-hrv"
              >
                HRV
              </button>
              <button
                onClick={() => setActiveTab('erv')}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'erv' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-erv"
              >
                ERV
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'hrv' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">HRV - Heat Recovery Ventilator</h3>
                    <p className="text-slate-600">Recovers heat from exhaust air</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  HRVs are designed to retain heat during colder months. They recover warmth from outgoing stale air and use it to preheat incoming fresh air—great for cold, dry climates where excess indoor humidity isn't an issue.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Best Applications:</h4>
                    <ul className="space-y-2">
                      {["Cold, dry climates (Atlantic Canada winters)", "Homes with excess indoor humidity", "New construction with tight building envelopes", "Basements and below-grade spaces", "Homes heated with wood or pellet stoves"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Specifications:</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li><span className="font-semibold">Airflow:</span> 50-200 CFM</li>
                      <li><span className="font-semibold">Heat Recovery:</span> 70-80% efficiency</li>
                      <li><span className="font-semibold">Best Climate:</span> Cold & dry</li>
                      <li><span className="font-semibold">Install Cost:</span> $2,000 - $4,500</li>
                      <li><span className="font-semibold">Install Time:</span> 4-8 hours</li>
                      <li><span className="font-semibold">Annual Maintenance:</span> Filter cleaning every 3 months</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">Energy Savings:</span> Reduces heating costs by 25-40% compared to exhaust-only ventilation systems
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
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">ERV - Energy Recovery Ventilator</h3>
                    <p className="text-slate-600">Recovers heat AND moisture</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  ERVs do everything HRVs do—but they also transfer moisture between air streams. In winter, they help retain indoor humidity; in summer, they reduce incoming humidity. Ideal for humid or mixed climates where moisture control is important.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Best Applications:</h4>
                    <ul className="space-y-2">
                      {["Humid or mixed climates (coastal BC)", "Homes with dry indoor air in winter", "Air-conditioned homes in summer", "Homes with allergy or asthma sufferers", "Year-round climate control needs"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Specifications:</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li><span className="font-semibold">Airflow:</span> 50-200 CFM</li>
                      <li><span className="font-semibold">Heat Recovery:</span> 70-80% efficiency</li>
                      <li><span className="font-semibold">Moisture Transfer:</span> 50-70% efficiency</li>
                      <li><span className="font-semibold">Install Cost:</span> $2,500 - $5,000</li>
                      <li><span className="font-semibold">Install Time:</span> 4-8 hours</li>
                      <li><span className="font-semibold">Annual Maintenance:</span> Filter cleaning every 3 months</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">Energy Savings:</span> Reduces heating AND cooling costs by 30-50% while maintaining optimal humidity levels
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
            <h3 className="text-2xl font-bold text-[#333333] text-center mb-6">Quick Comparison Table</h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-[#333333] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    <th className="px-6 py-4 text-center font-bold">HRV</th>
                    <th className="px-6 py-4 text-center font-bold">ERV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-3 text-slate-600">Heat Recovery</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">Yes</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">Yes</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">Moisture Transfer</td>
                    <td className="px-6 py-3 text-center font-semibold">No</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-slate-600">Best Climate</td>
                    <td className="px-6 py-3 text-center font-semibold">Cold & Dry</td>
                    <td className="px-6 py-3 text-center font-semibold">Humid & Mixed</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">Installation Cost</td>
                    <td className="px-6 py-3 text-center font-semibold">$2,000-$4,500</td>
                    <td className="px-6 py-3 text-center font-semibold">$2,500-$5,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-slate-600">Installation Time</td>
                    <td className="px-6 py-3 text-center font-semibold">4-8 hours</td>
                    <td className="px-6 py-3 text-center font-semibold">4-8 hours</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-3 text-slate-600">Best For</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">Atlantic Canada</td>
                    <td className="px-6 py-3 text-center font-semibold text-[#8dc63f]">Coastal BC</td>
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
            <h3 className="text-2xl font-bold text-[#333333] text-center mb-6">Which ventilation system should I choose?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100">
                <h4 className="font-bold text-lg text-[#333333] mb-4">Choose HRV if:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    You live in a cold, dry climate
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    Your home has excess humidity (condensation on windows)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    You want lower upfront cost
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#8dc63f]">
                <h4 className="font-bold text-lg text-[#333333] mb-4">Choose ERV if:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    You live in a humid or mixed climate
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    Your home gets too dry in winter
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <ArrowRight className="w-4 h-4 text-[#8dc63f] mt-1" />
                    You want year-round humidity control
                  </li>
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
            <h3 className="text-2xl font-bold text-white mb-3">Not sure which system is right for you?</h3>
            <p className="text-white/70 mb-6">Our certified ventilation advisors will assess your home and recommend the perfect solution.</p>
            <Button 
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 px-10 rounded-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Book Your Free In-Home Consultation
            </Button>
            <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto" data-testid="link-financing-cta">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-white/70 text-sm">Learn more about our financing options →</p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Ventilation for a <span className="text-[#8dc63f]">Healthier Home</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We offer a full suite of Heat Recovery Ventilators (HRVs), Energy Recovery Ventilators (ERVs), exhaust fans and even HEPA filtration systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Fantech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#333333] rounded-2xl overflow-hidden text-white"
            >
              <div className="aspect-[4/3] bg-black flex items-center justify-center p-8">
                <img 
                  src={fantechUnit} 
                  alt="Fantech FIT Series HRV Unit" 
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-2">FANTECH</h3>
                <p className="text-white/60 text-sm mb-6">Residential Ventilation System</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#8dc63f]" />
                    <span>Breathe Easy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-[#8dc63f]" />
                    <span>Eliminate Odors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-[#8dc63f]" />
                    <span>Reduce Allergens & Pollutants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#8dc63f]" />
                    <span>Radon Mitigation Solutions</span>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-6">
                  Fantech stands out in the HVAC sector as a leading innovator in residential ventilation. Renowned for its high-quality Heat Recovery Ventilators (HRVs) and Energy Recovery Ventilators (ERVs), the brand is dedicated to enhancing indoor air quality. That's why we've chosen to partner with Fantech, a global leader and Systemair company, renowned for their cutting-edge ventilation technology.
                </p>

                <Button 
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-fantech-quote"
                >
                  Get a Free Quote
                </Button>
              </div>
            </motion.div>

            {/* Venmar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#333333] rounded-2xl overflow-hidden text-white"
            >
              <div className="aspect-[4/3] bg-black flex items-center justify-center p-8">
                <img 
                  src={venmarUnit} 
                  alt="Venmar Virtuo Air HRV Unit" 
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black mb-2">VENMAR</h3>
                <p className="text-white/60 text-sm mb-6">Residential Ventilation System</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#8dc63f]" />
                    <span>Virtuo Air Technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-[#8dc63f]" />
                    <span>Automatic Airflow Balancing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-[#8dc63f]" />
                    <span>Quiet, Efficient ECM Motors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#8dc63f]" />
                    <span>Energy Star Certified</span>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-6">
                  Venmar stands out in the HVAC sector as a leading innovator in residential ventilation. Renowned for its high-quality Heat Recovery Ventilators (HRVs) and Energy Recovery Ventilators (ERVs), the brand is dedicated to enhancing indoor air quality. Venmar's commitment to cutting-edge technology and reliable performance has earned it a strong reputation and the trust of both homeowners and industry professionals.
                </p>

                <Button 
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold h-12 sm:h-14 rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-venmar-quote"
                >
                  Get a Free Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Air Quality Services Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Can You Improve <span className="text-[#8dc63f]">Indoor Air Quality?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Enhance your home's air quality with our comprehensive indoor air quality solutions. From air filtration systems to duct cleaning, we'll help you create a healthier living environment.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {airQualityServices.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#8dc63f] mt-1 flex-shrink-0" />
                    <p className="text-slate-700">{service}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8">
              Benefits of Improved Indoor Air Quality
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Heart, text: "Reduced Allergies and Asthma Symptoms" },
                { icon: Sparkles, text: "Enhanced Sleep Quality" },
                { icon: Home, text: "Increased Productivity" },
                { icon: Shield, text: "Reduced Health Risks" }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-[#8dc63f]" />
                  </div>
                  <p className="text-sm font-medium text-[#333333]">{benefit.text}</p>
                </motion.div>
              ))}
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
              Why Choose Greenfoot for<br />
              <span className="text-[#8dc63f]">Ventilation Solutions?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Greenfoot Energy is Atlantic Canada and BC's leading indoor air quality specialist with expertise in HRV/ERV systems and whole-home ventilation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseVentilation.map((card, i) => (
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
        </div>
      </section>

      {/* Installation Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Should You Expect{" "}
              <span className="text-[#8dc63f]">With Your HRV/ERV Install?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Greenfoot Energy's HRV/ERV installation process typically takes 1-2 weeks from initial consultation to completed installation. Most installations are completed in a single day.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} ctaText="Book Free Consultation" ctaIcon={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Invest in Your Health Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img 
                src={prideImage} 
                alt="Indoor air quality professional" 
                className="w-full max-w-lg"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                INVEST IN YOUR HEALTH
              </h2>
              <p className="text-white/80 mb-6">
                Over the years, air quality in homes & buildings has become a hot topic as we made buildings tighter and tighter. By sealing up our buildings, we made them too air tight which meant that the air inside our homes became stale and created negative side effects such as bad air quality and mold/mildew.
              </p>
              <p className="text-white/80 mb-8">
                As we spend most of our days indoors, air quality becomes very important. Greenfoot has <span className="text-white font-bold">all your energy efficient fresh air appliance solutions</span>. Our Home Comfort Advisors will recommend what your home requires for optimal indoor air quality.
              </p>
              <div className="bg-[#8dc63f] text-white p-6 rounded-xl inline-block">
                <p className="text-lg font-black uppercase tracking-wide">THAT IS THE GREENFOOT APPROACH!</p>
                <p className="text-sm text-white/90 mt-1">Expertise you can trust, tailored to your home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Frequently Asked Questions<br />
              <span className="text-[#8dc63f]">About Ventilation & Air Quality</span>
            </h2>
            <p className="text-slate-600">Can't find an answer? Reach out to us anytime</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-slate-200"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left hover:text-[#8dc63f] transition-colors"
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-semibold text-[#333333] pr-4">{faq.question}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                    expandedFaq === i ? 'rotate-45 bg-[#8dc63f]' : 'bg-slate-100'
                  }`}>
                    <span className={`text-lg font-bold ${expandedFaq === i ? 'text-white' : 'text-slate-400'}`}>+</span>
                  </div>
                </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pb-5"
                  >
                    <p className="text-slate-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQSection 
        category="Ventilation" 
        title="Common Questions About HRV/ERV Ventilation"
      />

      {/* CTA Section */}
      <section className="py-16 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-4">
              Ready to Breathe Easier?
            </h2>
            <p className="text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free indoor air quality assessment and learn how HRV/ERV systems can improve your home's comfort and health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-10 rounded-xl"
                onClick={() => setShowBookingModal(true)}
                data-testid="button-cta-quote"
              >
                Get Your Free Quote
              </Button>
              <a 
                href="tel:18003809384"
                className="bg-transparent border-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 font-bold h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2"
                data-testid="link-cta-phone"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName="HRV/ERV Ventilation System Installation & Maintenance"
        serviceDescription="Professional HRV (Heat Recovery Ventilator) and ERV (Energy Recovery Ventilator) installation, repair, and maintenance services. Improve indoor air quality while maintaining energy efficiency in your home."
        serviceType="Indoor Air Quality Service"
        serviceUrl="https://www.greenfootenergy.ca/services/ventilation"
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 1200 }}
        faqCategory="Ventilation"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Ventilation", url: "https://www.greenfootenergy.ca/services/ventilation" },
        ]}
      />


      <OtherServicesGrid exclude="ventilation" />

      <RelatedContent currentPath="/services/indoor-air-quality-ventilation" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
