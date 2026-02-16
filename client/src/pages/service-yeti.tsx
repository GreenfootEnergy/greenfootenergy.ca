import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Wrench, Settings, Shield, Clock, Award, ArrowRight, Calendar, Building, Home, Zap, Thermometer, Wind, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { Helmet } from "react-helmet";
import serviceYetiHero from "@/assets/images/service-yeti-hero.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import icon24h from "@/assets/images/24h-icon.png";
import fastFixIcon from "@/assets/images/fast-fix-icon.png";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const whyChooseGreenfoot = [
  {
    image: prideImage,
    title: "Red Seal Certified Technicians",
    desc: "All our technicians are certified red seal professionals with years of experience in HVAC diagnostics, repair, and maintenance across all major brands."
  },
  {
    image: experienceImage,
    title: "Fast Response Times",
    desc: "24-48 hour emergency response times across all service areas. We understand when your HVAC system breaks down, you need help fast."
  },
  {
    image: satisfactionImage,
    title: "Satisfaction Guaranteed",
    desc: "All work is backed by our satisfaction guarantee. If you're not happy with our service, we'll make it right."
  },
  {
    image: dedicatedImage,
    title: "Local Experts Across Canada",
    desc: "Serving Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia with dedicated teams who understand your local climate needs."
  }
];

const serviceCategories = [
  { icon: Wrench, title: "Service & Repair", href: "#service-repair" },
  { icon: Thermometer, title: "Heat Pump Maintenance", href: "#maintenance" },
  { icon: Wind, title: "Ventilation Maintenance", href: "#maintenance" },
  { icon: Building, title: "Commercial Services", href: "#commercial" }
];

const diagnosticServices = [
  {
    id: "greenfoot",
    title: "Greenfoot Installed HVAC Diagnostic Call",
    price: "$99",
    priceSuffix: "+tax",
    note: "after the 1st year of installation",
    features: [
      "Comprehensive System Evaluation – Full inspection to identify issues affecting performance",
      "Detailed Problem Assessment – Locate root cause of breakdowns or unusual noises",
      "Electrical & Control Testing – Inspect wiring and thermostat operation",
      "Mechanical Component Testing – Examine compressors, motors, fans, and pumps",
      "Drainage & Condensate Inspection – Ensure clear drains to prevent water damage",
      "Refrigerant & Cycle Check (if required) – Evaluate system pressures and cycles",
      "Diagnostic Report & Recommendations – Clear summary of issues and repair options",
      "Upfront Pricing – Transparent cost estimates before any work begins"
    ]
  },
  {
    id: "residential",
    title: "Residential HVAC Diagnostic Call",
    price: "$149",
    priceSuffix: "+tax",
    note: null,
    features: [
      "Comprehensive System Evaluation – Full inspection of heating and cooling system",
      "Detailed Problem Assessment – Pinpoint unusual noises, poor performance, or failures",
      "Electrical & Control Testing – Check wiring, safety controls, and thermostat operation",
      "Mechanical Component Testing – Examine motors, fans, pumps, and moving parts",
      "Drainage & Condensate Inspection – Verify clear drain lines and pans",
      "Refrigerant & Cycle Check (if required) – Assess system pressures and cycles",
      "Diagnostic Report & Recommendations – Clear explanations and repair options",
      "Upfront Pricing – Transparent cost estimates for informed decisions"
    ]
  },
  {
    id: "commercial",
    title: "Commercial HVAC Diagnostic Call",
    price: "$199",
    priceSuffix: "+tax",
    note: null,
    features: [
      "Comprehensive System Evaluation – Full inspection of rooftop units and commercial equipment",
      "Detailed Problem Assessment – Locate breakdowns, poor comfort levels, or inconsistent temps",
      "Electrical & Control Testing – Inspect wiring, contactors, relays, and BAS controls",
      "Mechanical Component Testing – Examine compressors, motors, fans, pumps, and belts",
      "Drainage & Condensate Inspection – Ensure clear drains to prevent water damage",
      "Refrigerant & Cycle Check (if required) – Confirm efficient cooling and heating operation",
      "Diagnostic Report & Recommendations – Solutions to minimize downtime",
      "Upfront Pricing – Transparent estimates to manage operating budgets"
    ]
  }
];

const maintenanceServices = [
  {
    id: "ductless",
    title: "Ductless Heat Pump Maintenance",
    price: "$169",
    priceSuffix: "+tax",
    memberNote: "or FREE with Membership*",
    features: [
      "Comprehensive System Inspection – Full check of indoor and outdoor units",
      "Indoor Unit Head Cleaning – Deep cleaning to improve airflow and performance",
      "Coil & Component Cleaning – Remove dust and debris for maximum efficiency",
      "Electrical & Control Testing – Inspect wiring and thermostat controls",
      "Drain Line & Pump Cleaning – Prevent leaks, clogs, and mold growth",
      "Performance Testing – Confirm efficient heating and cooling operation"
    ]
  },
  {
    id: "hrv",
    title: "HRV Maintenance",
    price: "$169",
    priceSuffix: "+tax",
    memberNote: "or FREE with Membership*",
    features: [
      "System Inspection & Airflow Testing – Full check of HRV unit, fans, and ducting",
      "Core Cleaning & Inspection – Remove dust from heat recovery core",
      "Filter Cleaning – Thorough cleaning to maintain air quality",
      "Vent & Grille Cleaning – Clear supply and exhaust vents",
      "Drain Pan & Line Cleaning – Prevent water buildup and bacteria",
      "Motor & Fan Maintenance – Inspect and clean to extend equipment life"
    ]
  },
  {
    id: "central",
    title: "Central Heat Pump Maintenance",
    price: "$199",
    priceSuffix: "+tax",
    memberNote: "or FREE with Membership*",
    features: [
      "Comprehensive System Inspection – Full check of air handler and condenser",
      "Blower & Fan Cleaning – Improve airflow and comfort",
      "Drain Line & Pan Cleaning – Prevent leaks, clogs, and mold",
      "Electrical & Control Testing – Check wiring and thermostat operation",
      "Reversing Valve & Defrost Cycle Check – Verify proper heating/cooling changeover",
      "Ductwork Inspection – Identify leaks and insulation issues"
    ]
  },
  {
    id: "geothermal",
    title: "Geothermal Heat Pump Maintenance",
    price: "$199",
    priceSuffix: "+tax",
    memberNote: "or FREE with Membership*",
    features: [
      "Comprehensive System Inspection – Check heat pump, ground loop, and distribution",
      "Loop Pressure & Flow Check – Verify proper fluid circulation",
      "Heat Exchanger Cleaning – Keep heat transfer surfaces efficient",
      "Blower & Fan Maintenance – Consistent airflow and comfort",
      "Electrical & Control Testing – Safe, reliable operation",
      "Pump & Motor Check – Test circulation pumps and motors"
    ]
  },
  {
    id: "commercial-rtu",
    title: "Commercial Rooftop Unit (RTU) Maintenance",
    price: "$249",
    priceSuffix: "+tax",
    memberNote: "or FREE with Membership*",
    features: [
      "Comprehensive System Inspection – Full check of rooftop units and ductwork",
      "Blower & Fan Maintenance – Improve airflow and efficiency",
      "Drain Line & Pan Cleaning – Prevent water damage",
      "Electrical & Control Testing – Safe, dependable operation",
      "Heat Exchanger & Burner Inspection – Safe, efficient heating",
      "Filter Cleaning – Maintain indoor air quality"
    ]
  }
];

export default function ServiceYetiPage() {
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState(0);
  const [activeMaintenanceTab, setActiveMaintenanceTab] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  return (
    <>
      <Helmet>
        <title>HVAC Maintenance & Service | Greenfoot Energy</title>
        <meta name="description" content="Professional HVAC maintenance, repair & diagnostic services. Red Seal certified technicians, 24-48hr response. Serving NS, NB, PEI, NL & BC. Book today!" />
        <meta name="keywords" content="HVAC maintenance, heat pump service, HVAC repair, ductless maintenance, furnace repair, air conditioning service, Red Seal technicians" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/maintenance-service-yeti" />
        
        <meta property="og:title" content="HVAC Maintenance & Service Plans | Greenfoot Energy" />
        <meta property="og:description" content="Professional HVAC maintenance, repair & diagnostics. Red Seal certified technicians with fast response times." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/maintenance-service-yeti" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HVAC Maintenance & Service | Greenfoot Energy" />
        <meta name="twitter:description" content="Expert HVAC maintenance & repair. Red Seal certified technicians across Canada." />
      </Helmet>
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Maintenance & Service", url: "https://www.greenfootenergy.ca/services/maintenance-service-yeti" }
        ]}
      />
      <ServiceSchemaWithFAQs
        serviceName="HVAC Maintenance & Service"
        serviceDescription="Professional HVAC maintenance, repair, and diagnostic services for all heating and cooling systems. Expert technicians, guaranteed work, and fast response times."
        serviceType="HVAC Maintenance Service"
        serviceUrl="https://www.greenfootenergy.ca/services/maintenance-service-yeti"
        faqCategory="Service & Maintenance"
      />
      
      <SiteHeader />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
            <img 
              src={serviceYetiHero} 
              alt="Greenfoot technician working on HVAC equipment" 
              className="w-full h-full object-cover object-center scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
          
          <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
            <div className="max-w-xl lg:max-w-2xl">
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
                  HVAC Maintenance<br />
                  <span className="text-[#8dc63f]">& Service Plans</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Your one-stop shop for all HVAC services. We repair, service, maintain, clean and install all brands and models.
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
                    onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                  >
                    Book Service Call
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs font-semibold text-[#333333] text-center">Unmatched Expertise</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs font-semibold text-[#333333] text-center">Satisfaction Guaranteed</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs font-semibold text-[#333333] text-center">Red Seal Certified</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <img src={fastFixIcon} alt="Fast Fixes" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs font-semibold text-[#333333] text-center">Fast Fixes</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <img src={icon24h} alt="24 Hour Service" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs font-semibold text-[#333333] text-center">24/7 Service</span>
                  </motion.div>
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
                Your One-Stop Shop For All Your{" "}
                <span className="text-[#8dc63f]">HVAC Services</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                We repair, service, maintain, clean and install all brands and models across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Diagnostic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Service & Repair</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Comprehensive system evaluation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Detailed problem assessment</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Electrical & control testing</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Upfront pricing before work begins</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                  className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover"
                >
                  Book Diagnostic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              {/* Maintenance */}
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
                <h3 className="text-xl font-semibold text-white mb-4">Maintenance & Cleaning</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Comprehensive system inspection</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Indoor unit head cleaning</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Coil & component cleaning</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Performance testing</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                  className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover"
                >
                  Schedule Maintenance
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

              {/* Installation */}
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
                <h3 className="text-xl font-semibold text-white mb-4">New Installation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Free in-home consultation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Professional installation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">System testing & commissioning</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full training on operation</span>
                  </li>
                </ul>
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service & Repair Section */}
        <section id="service-repair" className="py-16 lg:py-20 bg-[#333333]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                Service & Repair{" "}
                <span className="text-[#8dc63f]">(Diagnostics)</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Expert diagnostic services to identify and resolve HVAC issues quickly and efficiently.
              </p>
            </motion.div>

            {/* Diagnostic Tabs */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {diagnosticServices.map((service, i) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveDiagnosticTab(i)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      activeDiagnosticTab === i
                        ? "bg-[#8dc63f] text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {service.title.split(" HVAC")[0]}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeDiagnosticTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#2a2a2a] rounded-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* Left Side - Price & CTA */}
                  <div className="bg-[#222222] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                    <p className="text-xl font-bold text-white mb-1">Starting at</p>
                    <div className="mb-2">
                      <span className="text-4xl font-black text-white">
                        {diagnosticServices[activeDiagnosticTab].price}
                      </span>
                      <span className="text-white text-xl font-bold">+ tax</span>
                    </div>
                    {diagnosticServices[activeDiagnosticTab].note && (
                      <p className="text-gray-400 text-xs mb-4">{diagnosticServices[activeDiagnosticTab].note}</p>
                    )}
                    <Button 
                      className="bg-white text-[#333333] hover:bg-gray-100 rounded-xl font-bold h-12 px-8"
                      onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                    >
                      Book Now
                    </Button>
                  </div>

                  {/* Right Side - Features */}
                  <div className="p-8">
                    <div className="space-y-5">
                      {diagnosticServices[activeDiagnosticTab].features.map((feature, i) => {
                        const [title, description] = feature.split(" – ");
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#8dc63f] text-sm">{title}</h4>
                              {description && <p className="text-gray-400 text-sm leading-relaxed">{description}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Maintenance & Cleaning Section */}
        <section id="maintenance" className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
                Maintenance &{" "}
                <span className="text-[#8dc63f]">Cleaning</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Keep your HVAC systems running at peak efficiency with our comprehensive maintenance services.
              </p>
            </motion.div>

            {/* Maintenance Tabs */}
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {maintenanceServices.map((service, i) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveMaintenanceTab(i)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      activeMaintenanceTab === i
                        ? "bg-[#8dc63f] text-white"
                        : "bg-slate-100 text-[#333333] hover:bg-slate-200"
                    }`}
                  >
                    {service.title.replace(" Maintenance", "").replace(" Heat Pump", "")}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeMaintenanceTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200"
              >
                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* Left Side - Price & CTA */}
                  <div className="bg-slate-100 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200">
                    <p className="text-xl font-bold text-[#333333] mb-1">Starting at</p>
                    <div className="mb-1">
                      <span className="text-4xl font-black text-[#333333]">
                        {maintenanceServices[activeMaintenanceTab].price}
                      </span>
                      <span className="text-[#333333] text-xl font-bold">+ tax</span>
                    </div>
                    <p className="text-[#8dc63f] font-bold text-sm mb-4">
                      {maintenanceServices[activeMaintenanceTab].memberNote}
                    </p>
                    <Button 
                      className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 px-8"
                      onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                    >
                      Book Now
                    </Button>
                  </div>

                  {/* Right Side - Features */}
                  <div className="p-8">
                    <div className="space-y-5">
                      {maintenanceServices[activeMaintenanceTab].features.map((feature, i) => {
                        const [title, description] = feature.split(" – ");
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#333333] text-sm">{title}</h4>
                              {description && <p className="text-slate-600 text-sm leading-relaxed">{description}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Greenfoot */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] tracking-tight">
                Why Choose Greenfoot for<br />
                <span className="text-[#8dc63f]">HVAC Maintenance & Service?</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
                Greenfoot Energy is Atlantic Canada and BC's leading HVAC service provider with specialized expertise in all heating and cooling systems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {whyChooseGreenfoot.map((card, i) => (
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ServiceFAQSection 
          category="Service & Maintenance"
          title="Common Questions About HVAC Maintenance"
        />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Final CTA Section */}
        <section className="py-16 lg:py-20 bg-[#8dc63f]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6">
                Ready to Schedule Your Service?
              </h2>
              <p className="text-xl text-[#333333]/80 mb-8 max-w-2xl mx-auto">
                Book your HVAC service call today and keep your home comfortable year-round.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-[#8dc63f] hover:bg-slate-100 font-bold h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg rounded-xl"
                  onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                >
                  Book Service Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <a 
                  href="tel:18886349384"
                  className="bg-transparent border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white font-bold h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  1 (888) 634-9384
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>


      <OtherServicesGrid exclude="maintenance" />


      <SiteFooter />
    </>
  );
}
