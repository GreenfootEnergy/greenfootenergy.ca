import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet";

import heroBg from "@assets/Dual-background_1769279060609.avif";
import dualFuelSystem from "@assets/Dual-Fuel-Heating-System_1769279060609.png";
import americanStandardFurnace from "@assets/American-Standard_gas-furnace_1769279060609.png";
import tosotSystem from "@assets/tosot-apex-dual-fuel-system_1769279060610.avif";
import napoleonLogo from "@assets/Napoleon_Logo-white_1769279129599.avif";
import americanStandardLogo from "@assets/white-a-strandard_1769283062379.png";
import tosotLogo from "@assets/Tasot_Logo_greenfoot_1769283049806.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

interface Product {
  id: string;
  name: string;
  brand: string;
  logo?: string;
  image: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const products: Product[] = [
  {
    id: "napoleon",
    name: "Napoleon Dual Fuel System",
    brand: "Napoleon",
    logo: napoleonLogo,
    image: dualFuelSystem,
    description: "Greenfoot Energy Solutions proudly offers Napoleon Dual Fuel Heating Systems, combining the efficiency of an electric heat pump with the reliability of a high-performance gas furnace. Designed for exceptional year-round comfort, these advanced systems deliver outstanding energy efficiency.",
    features: [
      "Up to 97% AFUE gas furnace efficiency",
      "High SEER2 ratings for low cooling costs",
      "Seamless automatic fuel switching",
      "Precision-engineered for Canadian climates",
      "Comprehensive warranty coverage"
    ],
    specs: [
      { label: "AFUE", value: "Up to 97%" },
      { label: "SEER2", value: "High Efficiency" }
    ]
  },
  {
    id: "american-standard",
    name: "American Standard Gas Furnaces",
    brand: "American Standard",
    logo: americanStandardLogo,
    image: americanStandardFurnace,
    description: "With a steadfast commitment to excellence, our single-and two-stage gas furnaces provide precisely the right amount of warmth, boasting impressive AFUE ratings ranging from 92.1% to 97%. Experience consistent and steady flows of comforting heat, ensuring uniform indoor temperatures without fluctuations.",
    features: [
      "Single and two-stage heating options",
      "92.1% to 97% AFUE ratings",
      "Durable cabinets built to last",
      "Consistent temperature regulation",
      "Quiet, reliable operation"
    ],
    specs: [
      { label: "AFUE", value: "92.1% - 97%" },
      { label: "Stages", value: "1-2 Stage" }
    ]
  },
  {
    id: "tosot",
    name: "Tosot APEX Dual-Fuel System",
    brand: "Tosot",
    logo: tosotLogo,
    image: tosotSystem,
    description: "Tosot Dual-Fuel Heating Systems combine the efficiency of inverter-driven APEX heat pumps with the dependable power of high-efficiency gas furnaces to deliver seamless comfort in any season. These systems maintain full performance even at -22°F, using advanced defrost and dual heating belts.",
    features: [
      "Up to 17 SEER2 cooling efficiency",
      "10 HSPF2 heating performance",
      "Full operation at -22°F (-30°C)",
      "Advanced defrost technology",
      "Inverter-driven heat pump"
    ],
    specs: [
      { label: "SEER2", value: "Up to 17" },
      { label: "HSPF2", value: "10" }
    ]
  }
];

const installationBenefits = [
  "Year-round comfort ensures your home maintains a consistent and pleasant temperature in every season.",
  "Improved energy efficiency allows you to reduce waste by utilizing the most efficient fuel source at any given time.",
  "Lower heating costs help you achieve long-term savings on your utility bills.",
  "Automatic fuel switching intelligently toggles between gas and electricity to guarantee optimal performance."
];

const repairServices = [
  "System failure: We address critical issues where the furnace or heat pump is not running to restore your heat immediately.",
  "Switching malfunctions: We fix the failure to switch between systems, ensuring seamless transitions between gas and electric modes.",
  "Temperature regulation: We resolve inconsistent indoor temperatures to ensure every room in your home stays comfortable.",
  "Mechanical alerts: We investigate unusual noises or system alerts to prevent minor issues from becoming major breakdowns.",
  "Efficiency loss: We identify the root causes of rising energy bills to help you get your utility costs back under control."
];

const installationSteps = [
  {
    step: 1,
    title: "Free Home Heating Assessment",
    intro: "A certified Home Comfort Advisor visits your home to assess your current heating system, insulation levels, and energy usage:",
    details: [
      "Evaluate current heating system performance",
      "Assess insulation and energy usage patterns",
      "Determine optimal dual fuel configuration",
      "Review potential rebates and financing options",
      "Provide customized system recommendations"
    ],
    footer: { cost: "Free, no obligation", timeline: "Within 3-5 business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Permits & Paperwork Managed",
    intro: "We handle all permits and documentation required for your dual fuel installation:",
    details: [
      "Submit building permit applications",
      "Coordinate gas and electrical inspections",
      "Manage utility notifications",
      "Handle rebate paperwork",
      "Ensure full code compliance"
    ],
    footer: { timeline: "Completed before installation" }
  },
  {
    step: 3,
    title: "Professional Dual Fuel Installation",
    intro: "Our Red Seal certified technicians perform a complete dual fuel system installation:",
    details: [
      "Remove and dispose of old equipment",
      "Install high-efficiency heat pump",
      "Connect gas furnace integration",
      "Configure smart thermostat controls",
      "Test automatic fuel switching"
    ],
    footer: { timeline: "1-2 days for most installations" }
  },
  {
    step: 4,
    title: "System Testing & Walkthrough",
    intro: "Once installation is complete, we ensure everything works perfectly:",
    details: [
      "Test heating and cooling modes",
      "Verify fuel switching thresholds",
      "Demonstrate thermostat operation",
      "Review maintenance requirements",
      "Answer all your questions"
    ],
    footer: { timeline: "30-45 minutes included" }
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Expert Technicians",
    desc: "Our Red Seal certified technicians specialize in dual fuel system installation. We've installed thousands of systems across 5 Canadian provinces."
  },
  {
    image: experienceImage,
    title: "Premium Equipment",
    desc: "We partner with Napoleon, American Standard, and Tosot to provide the most reliable and efficient dual fuel systems available."
  },
  {
    image: satisfactionImage,
    title: "Complete Service Coverage",
    desc: "From installation to maintenance and repairs, we handle everything. Our team provides year-round support for all your heating needs."
  },
  {
    image: dedicatedImage,
    title: "Financing & Rebate Assistance",
    desc: "We help you access available rebates. Flexible financing options available—conditions apply.",
    links: [
      { text: "View Incentives", href: "/provincial-incentives" },
      { text: "See What You Qualify For", href: "/financing" }
    ]
  }
];

const faqs = [
  {
    question: "What is a dual fuel heating system?",
    answer: "A dual fuel heating system combines an electric heat pump with a gas furnace to provide efficient heating year-round. The system automatically switches between the heat pump and furnace based on outdoor temperature, using the most efficient fuel source at any given time to minimize energy costs while maximizing comfort."
  },
  {
    question: "How does a dual fuel system save money on heating bills?",
    answer: "Dual fuel systems save money by using the heat pump when outdoor temperatures are mild (typically above -5°C to 0°C), which is 2-3 times more efficient than gas heating. When temperatures drop below the heat pump's efficient operating range, the system switches to the gas furnace. This intelligent switching ensures you're always using the most cost-effective heating method."
  },
  {
    question: "What temperature does a dual fuel system switch from heat pump to furnace?",
    answer: "The switchover temperature, also called the balance point, is typically set between -5°C and 5°C (23°F to 41°F) depending on your heat pump model, local electricity and gas rates, and personal preference. Modern systems like the Tosot APEX can operate efficiently down to -22°F (-30°C), so your technician will optimize the setting for your specific situation."
  },
  {
    question: "Is a dual fuel system worth it in Canada?",
    answer: "Yes, dual fuel systems are particularly well-suited to Canadian climates. They provide reliable heat even in extreme cold while taking advantage of the heat pump's efficiency during milder weather. Many Canadian homeowners see 20-40% savings on annual heating costs compared to using a furnace alone."
  },
  {
    question: "How long does dual fuel system installation take?",
    answer: "Most dual fuel installations are completed in 1-2 days. This includes removing your old equipment, installing the new heat pump and furnace (if needed), connecting the systems, configuring the smart thermostat, and testing automatic fuel switching. Complex installations may take slightly longer."
  },
  {
    question: "What maintenance does a dual fuel system require?",
    answer: "Dual fuel systems require annual maintenance for both the heat pump and furnace components. This includes cleaning or replacing filters, checking refrigerant levels, inspecting electrical connections, cleaning the outdoor unit, and verifying the switchover controls work properly. We recommend our YETI maintenance plans for comprehensive coverage."
  },
  {
    question: "Can I add a heat pump to my existing furnace?",
    answer: "Yes, in many cases you can add a heat pump to your existing furnace to create a dual fuel system. Our Home Comfort Advisors will assess your current furnace's compatibility, age, and condition to determine if this is the best option or if a complete system replacement would provide better long-term value."
  },
  {
    question: "What brands of dual fuel systems does Greenfoot install?",
    answer: "Greenfoot Energy Solutions installs premium dual fuel systems from Napoleon, American Standard, and Tosot. Each brand offers unique advantages: Napoleon provides precision Canadian engineering, American Standard delivers proven reliability with up to 97% AFUE, and Tosot offers advanced inverter technology for extreme cold performance."
  }
];

export default function DualFuelHeatingSystemsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const nextProduct = () => {
    setActiveProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setActiveProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[activeProduct];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Dual Fuel Heating Systems | Heat Pump & Furnace | Greenfoot</title>
        <meta name="description" content="Dual fuel heating combines heat pump efficiency with gas furnace reliability. Save 20-40% on heating costs. Professional installation across NS, NB, PEI, NFLD & BC." />
        <meta name="keywords" content="dual fuel heating system, heat pump furnace combo, hybrid heating, gas furnace heat pump, dual fuel HVAC, energy efficient heating Canada, Napoleon dual fuel, Tosot APEX" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/dual-fuel-heating-systems" />
        
        <meta property="og:title" content="Dual Fuel Heating Systems | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Combine heat pump efficiency with gas furnace reliability. Save 20-40% on annual heating costs with intelligent fuel switching." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/dual-fuel-heating-systems" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dual Fuel Heating Systems | Greenfoot Energy" />
        <meta name="twitter:description" content="Heat pump + furnace for optimal efficiency. Save 20-40% on heating costs with dual fuel systems." />
      </Helmet>
      <HreflangTags canonicalPath="/services/dual-fuel-heating-systems" />

      <SiteHeader />

      <ServiceSchemaWithFAQs 
        serviceName="Dual Fuel Heating Systems"
        serviceDescription="Professional dual fuel heating system installation and repair services across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Combining heat pump efficiency with gas furnace reliability."
        serviceType="HVAC Services"
        serviceUrl="https://www.greenfootenergy.ca/services/dual-fuel-heating-systems"
        areaServed={["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador", "British Columbia"]}
        faqCategory="dual-fuel"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Dual Fuel Heating Systems", url: "https://www.greenfootenergy.ca/services/dual-fuel-heating-systems" }
        ]}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt="Dual fuel heating system service background" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="max-w-xl lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
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
                  <span className="text-[#8dc63f]">Dual Fuel</span> Heat Pump Systems<br />
                  <span className="text-[#8dc63f]">for Reliable Efficiency</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Professional dual fuel heating system installation and repair for energy-efficient, reliable home comfort in every season.
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
                    className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    data-testid="button-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    Get Free Quote
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Unmatched Expertise</span>
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
                  src={dualFuelSystem} 
                  alt="Dual Fuel Heating System" 
                  className="w-[300px] xl:w-[400px] h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What Is Dual Fuel Section */}
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
              What Is a <span className="text-[#8dc63f]">Dual Fuel Heating System?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A dual fuel heating system maximizes your home's efficiency by combining an electric heat pump with a traditional gas furnace. These intelligent systems automatically switch between energy sources to optimize performance in every season and significantly minimize your heating costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Installation Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">What Are the Benefits of Installing a Dual Fuel System?</h3>
              <ul className="space-y-3 mb-6">
                {installationBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-installation-quote"
              >
                Schedule a Consultation
              </Button>
            </motion.div>

            {/* Repair Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">What Common Dual Fuel Issues Do We Troubleshoot?</h3>
              <ul className="space-y-3 mb-6">
                {repairServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#333333] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline"
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-xl transition-all"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-repair-quote"
              >
                Schedule a Service Call
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - Dark Background with Carousel */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Warmth, Comfort & Efficiency <span className="text-[#8dc63f]">When You Need It Most</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Combining Comfort and Conservation with our premium dual fuel heating systems from industry-leading manufacturers.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Product Navigation Dots */}
            <div className="flex justify-center gap-3 mb-8">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    index === activeProduct
                      ? "bg-[#8dc63f] hover:bg-[#709c32] text-white"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                  }`}
                  data-testid={`product-tab-${product.id}`}
                >
                  {product.brand}
                </button>
              ))}
            </div>

            {/* Product Content */}
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left - Product Image */}
              <div className="relative">
                <div className="bg-[#2a2a2a] rounded-2xl p-8 relative overflow-hidden">
                  {currentProduct.logo && (
                    <img 
                      src={currentProduct.logo} 
                      alt={currentProduct.brand} 
                      className="h-12 object-contain mb-6"
                    />
                  )}
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    className="h-[350px] w-auto object-contain mx-auto"
                    data-testid={`img-product-${currentProduct.id}`}
                  />
                  <div className="flex justify-center gap-4 mt-6">
                    {currentProduct.specs.map((spec, idx) => (
                      <div key={idx} className="bg-[#333333] rounded-xl px-4 py-2 text-center">
                        <p className="text-[#8dc63f] font-bold text-xl">{spec.value}</p>
                        <p className="text-white/70 text-xs">{spec.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={prevProduct}
                    className="w-12 h-12 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-xl flex items-center justify-center transition-colors"
                    data-testid="button-prev-product"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextProduct}
                    className="w-12 h-12 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-xl flex items-center justify-center transition-colors"
                    data-testid="button-next-product"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Right - Product Details */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{currentProduct.name}</h3>
                <p className="text-white/80 mb-6">{currentProduct.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {currentProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 bg-[#2a2a2a] rounded-xl p-4">
                      <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-white/80 text-sm">Learn more about our financing options →</p>
                </a>

                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl w-full sm:w-auto"
                  data-testid="button-product-quote"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get a Free Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
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
              Why Choose <span className="text-[#8dc63f]">Greenfoot Energy</span> for Dual Fuel Installation?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We are dedicated to delivering superior heating solutions through a commitment to quality and service.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              What to Expect From Our <span className="text-[#8dc63f]">Dual Fuel Installation Process?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From initial assessment to final walkthrough, we handle every step of your dual fuel system installation with professionalism and care.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {installationSteps.map((step, index) => (
              <ScrollStepItem
                key={index}
                step={step}
                index={index}
                total={installationSteps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
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
              Frequently Asked Questions About <span className="text-[#8dc63f]">Dual Fuel Systems</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Get answers to common questions about dual fuel heating systems, installation, and maintenance.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-bold text-[#333333] hover:text-[#8dc63f] py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to <span className="text-[#8dc63f]">Upgrade</span> Your Home Comfort?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contact us today to schedule a free consultation and discover how a dual fuel heating system can save you money while keeping your home comfortable year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:18003809384"
                className="bg-white hover:bg-gray-100 text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                data-testid="button-cta-call"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-cta-quote"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Your Free Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>


      <OtherServicesGrid exclude="dualFuel" />

      <RelatedContent currentPath="/services/dual-fuel-heating-systems" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
