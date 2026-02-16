import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Phone, 
  ChevronRight, 
  Wifi, 
  Thermometer, 
  Calendar, 
  Bell, 
  Zap, 
  Shield, 
  Smartphone,
  Settings,
  CheckCircle2,
  Leaf,
  Home,
  Building,
  Wind,
  Sun,
  Snowflake,
  Activity,
  MapPin
} from "lucide-react";

import peakHeroImg from "@/assets/peak-thermostat-hero.webp";
import peakCompatibilityImg from "@/assets/peak-thermostat-compatibility.webp";
import peakVacationImg from "@/assets/peak-vacation-mode.webp";
import peakSensorsImg from "@/assets/peak-sensors.webp";
import peakCo2Img from "@/assets/peak-co2-monitor.webp";
import peakWallImg from "@/assets/peak-wall-features.avif";
import peakAlertsImg from "@/assets/peak-alerts.avif";
import peakEnergyImg from "@/assets/peak-energy-efficiency.avif";
import peakVersatilityImg from "@/assets/peak-versatility.avif";
import peakBacklightImg from "@/assets/peak-backlight.avif";
import peakBreakdownImg from "@/assets/peak-breakdown-prevention.avif";

import expertiseIcon from "@assets/trusted-expert.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import peakLogo from "@/assets/peak-logo.png";
import peakHeroBg from "@/assets/peak-hero-bg.avif";
import peakThermostatDisplay from "@/assets/peak-thermostat-display.avif";
import mobileWifiIcon from "@assets/Mobile_Wifi_1769271244056.png";
import smartClimateIcon from "@assets/smart-climate_1769271244056.png";
import monitoringIcon from "@assets/monitoring_1769271244056.png";
import directLineIcon from "@assets/direct-line_1769271244055.png";

const features = [
  {
    id: "smart-control",
    title: "Smart Control",
    icon: Smartphone,
    image: peakHeroImg,
    description: "Control your home's temperature from anywhere using the Greenfoot app. Set schedules, adjust temperatures, and monitor energy usage—all from your smartphone.",
    benefits: ["Remote access via smartphone app", "Voice control with Alexa & Google Home", "Real-time temperature monitoring", "Custom scheduling for every day"]
  },
  {
    id: "energy-savings",
    title: "Energy Savings",
    icon: Zap,
    image: peakEnergyImg,
    description: "The Peak Series Smart Thermostat learns your habits and optimizes heating and cooling to reduce energy consumption without sacrificing comfort.",
    benefits: ["Up to 23% savings on heating/cooling", "Smart eco mode for efficiency", "Usage reports and insights", "Automatic temperature setbacks"]
  },
  {
    id: "scheduling",
    title: "Vacation Mode",
    icon: Calendar,
    image: peakVacationImg,
    description: "Going away? Set vacation mode to maintain minimal energy use while you're gone, then have your home ready and comfortable when you return.",
    benefits: ["One-touch vacation activation", "Return date scheduling", "Freeze protection while away", "Automatic resume on return"]
  },
  {
    id: "sensors",
    title: "Wireless Sensors",
    icon: Activity,
    image: peakSensorsImg,
    description: "Add wireless room sensors to monitor temperature and occupancy in different areas of your home for truly balanced comfort everywhere.",
    benefits: ["Multi-room temperature sensing", "Occupancy detection", "Average or priority room control", "Easy wireless setup"]
  },
  {
    id: "air-quality",
    title: "CO2 Monitoring",
    icon: Wind,
    image: peakCo2Img,
    description: "Built-in air quality sensors monitor CO2 levels, humidity, and temperature to ensure your home's air is always fresh and healthy.",
    benefits: ["Real-time CO2 level display", "Humidity monitoring", "Air quality alerts", "Ventilation recommendations"]
  },
  {
    id: "alerts",
    title: "Smart Alerts",
    icon: Bell,
    image: peakAlertsImg,
    description: "Receive instant notifications about temperature extremes, filter changes, maintenance reminders, and potential system issues.",
    benefits: ["Temperature extreme warnings", "Filter change reminders", "Maintenance alerts", "System performance notifications"]
  }
];

const compatibleSystems = [
  { name: "Mini-Split Heat Pumps", icon: Thermometer },
  { name: "Central Heat Pumps", icon: Home },
  { name: "Air Conditioners", icon: Snowflake },
  { name: "Furnaces", icon: Sun },
  { name: "Ducted Systems", icon: Wind },
  { name: "Multi-Zone Systems", icon: Building }
];

const provinces = [
  { name: "Nova Scotia", abbr: "NS" },
  { name: "New Brunswick", abbr: "NB" },
  { name: "Prince Edward Island", abbr: "PEI" },
  { name: "Newfoundland", abbr: "NFLD" },
  { name: "British Columbia", abbr: "BC" }
];

const faqs = [
  {
    question: "What is a Peak Thermostat and how does it benefit me?",
    answer: "Peak Thermostats are smart thermostats that automatically adjust your heating and cooling during peak energy demand periods, helping reduce strain on the electrical grid while lowering your energy costs. They're part of utility demand response programs available in our service areas."
  },
  {
    question: "What HVAC systems are compatible with the Peak Series Smart Thermostat?",
    answer: "The Peak Series Smart Thermostat is compatible with most heating and cooling systems including mini-split heat pumps, central heat pumps, air conditioners, furnaces, and multi-zone systems. Our technicians will verify compatibility during installation."
  },
  {
    question: "Will I notice when the Peak Thermostat adjusts my temperature?",
    answer: "Peak Thermostats make minimal adjustments (typically 2-4 degrees) during peak demand periods, and most homeowners don't notice the difference. You maintain full control and can override adjustments if needed for comfort."
  },
  {
    question: "Can I install the Peak Thermostat myself or do I need a professional?",
    answer: "While the Peak Thermostat is designed for straightforward installation, we recommend professional installation to ensure optimal performance and to maintain your warranty. Our Red Seal certified technicians handle the complete setup and system integration."
  },
  {
    question: "How much can I save on energy bills with a smart thermostat?",
    answer: "Homeowners typically see energy savings of 15-23% on heating and cooling costs after installing the Peak Series Smart Thermostat. Savings vary based on your usage patterns, home size, and local climate conditions."
  },
  {
    question: "Can I control my Peak Thermostat remotely?",
    answer: "Yes, Peak Thermostats include smartphone apps that allow remote temperature control, scheduling, and monitoring of your home's energy usage. This convenience helps you optimize comfort and efficiency even when away from home."
  },
  {
    question: "Does the Peak Thermostat work with voice assistants like Alexa or Google Home?",
    answer: "Yes, the Peak Series Smart Thermostat integrates seamlessly with Amazon Alexa, Google Assistant, and Apple HomeKit, allowing you to control your home's temperature with simple voice commands."
  },
  {
    question: "What happens to my thermostat settings if the Wi-Fi goes down?",
    answer: "The Peak Thermostat continues to operate using your programmed schedule even without internet connectivity. Your settings are stored locally, so your comfort isn't affected by temporary Wi-Fi outages."
  },
  {
    question: "How do the wireless room sensors work?",
    answer: "Wireless room sensors connect to your Peak Thermostat via radio frequency and report temperature and occupancy data. You can configure the thermostat to average readings across sensors or prioritize specific rooms based on occupancy or time of day."
  }
];

export default function PeakThermostatPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Peak Series Smart Thermostat",
    "brand": {
      "@type": "Brand",
      "name": "Greenfoot Energy Solutions"
    },
    "description": "Smart thermostat with Wi-Fi connectivity, energy monitoring, wireless sensors, and CO2 air quality monitoring for heat pumps and HVAC systems.",
    "category": "Smart Home > Thermostats",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": ["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland", "British Columbia"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Greenfoot Energy Solutions",
    "description": "Peak Series Smart Thermostat installation and service across Atlantic Canada and British Columbia",
    "telephone": "1-800-380-9384",
    "areaServed": provinces.map(p => p.name),
    "serviceArea": {
      "@type": "GeoShape",
      "addressCountry": "CA"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.greenfootenergy.ca/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.greenfootenergy.ca/services" },
      { "@type": "ListItem", "position": 3, "name": "Peak Thermostat", "item": "https://www.greenfootenergy.ca/services/peak-thermostat" }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Peak Series Smart Thermostat | Wi-Fi Thermostat Installation | Greenfoot Energy</title>
        <meta name="description" content="Control your heat pump from anywhere with the Peak Series Smart Thermostat. Wi-Fi enabled, energy-saving scheduling, wireless sensors, and CO2 monitoring. Professional installation in NS, NB, PEI, NFLD & BC." />
        <meta name="keywords" content="smart thermostat, wifi thermostat, heat pump thermostat, Peak Series thermostat, energy saving thermostat, wireless thermostat, smart home thermostat" />
        <meta name="geo.region" content="CA-NS,CA-NB,CA-PE,CA-NL,CA-BC" />
        <meta name="geo.placename" content="Atlantic Canada, British Columbia" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/peak-thermostat" />
        <meta property="og:title" content="Peak Series Smart Thermostat | Wi-Fi Thermostat Installation | Greenfoot Energy" />
        <meta property="og:description" content="Control your heat pump from anywhere with the Peak Series Smart Thermostat. Wi-Fi enabled, energy-saving scheduling, wireless sensors, and CO2 monitoring." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/peak-thermostat" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peak Series Smart Thermostat | Greenfoot Energy" />
        <meta name="twitter:description" content="Control your heat pump from anywhere with the Peak Series Smart Thermostat. Wi-Fi enabled with energy-saving scheduling." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <SiteHeader />

      {/* Hero Section - Centered Design */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-[#333333] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${peakHeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/40 via-transparent to-[#333333]/90" />
        
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24 text-center">
          {/* Floating Thermostat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <img 
              src={peakThermostatDisplay} 
              alt="Peak Series Smart Thermostat" 
              className="w-64 sm:w-80 md:w-96 drop-shadow-2xl mx-auto"
            />
          </motion.div>

          {/* Peak Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <img src={peakLogo} alt="Peak" className="h-32 sm:h-40 md:h-48 lg:h-56 mx-auto" />
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-wide mb-8 max-w-3xl mx-auto"
          >
            Smart Wi-Fi Thermostats for Modern Energy Control
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-base sm:text-lg h-12 sm:h-14 px-8">
                FREE with New HVAC Installs
              </Button>
            </a>
            <a href="/membership-plans">
              <Button size="lg" className="bg-transparent hover:bg-white/10 border-2 border-white text-white rounded-xl font-bold text-base sm:text-lg h-12 sm:h-14 px-8">
                Peak Maintenance Plans
              </Button>
            </a>
          </motion.div>

          {/* Financing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex justify-center"
          >
            <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 hover:bg-[#8dc63f]/20 transition-colors max-w-md">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-white/70 text-sm">Learn more about our financing options →</p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Smart Wi-Fi Thermostat Features */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                src={peakWallImg} 
                alt="Peak Series Smart Thermostat on Wall" 
                className="max-w-sm w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
                Smart Wi-Fi Thermostat <span className="text-[#8dc63f]">Features</span>
              </h2>
              <p className="text-gray-300 mb-8">
                An exciting addition to the Greenfoot family
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#8dc63f]/30 flex items-center justify-center mb-3">
                    <img src={mobileWifiIcon} alt="Mobile App" className="w-10 h-10" />
                  </div>
                  <p className="font-semibold text-sm text-white">Mobile App</p>
                  <p className="text-gray-400 text-xs">Control</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#8dc63f]/30 flex items-center justify-center mb-3">
                    <img src={smartClimateIcon} alt="Smart Climate" className="w-10 h-10" />
                  </div>
                  <p className="font-semibold text-sm text-white">Smart Climate Control</p>
                  <p className="text-gray-400 text-xs">Scheduling</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#8dc63f]/30 flex items-center justify-center mb-3">
                    <img src={monitoringIcon} alt="Monitoring" className="w-10 h-10" />
                  </div>
                  <p className="font-semibold text-sm text-white">Remote System Health</p>
                  <p className="text-gray-400 text-xs">Monitoring</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#8dc63f]/30 flex items-center justify-center mb-3">
                    <img src={directLineIcon} alt="Direct Line" className="w-10 h-10" />
                  </div>
                  <p className="font-semibold text-sm text-white">Direct Line for Assistance</p>
                  <p className="text-gray-400 text-xs">Scheduling</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Can It Do - Features Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              What Can the Peak Series <span className="text-[#8dc63f]">Smart Thermostat Do?</span>
            </h2>
            <p className="text-lg text-slate-600">
              The Peak Series Smart Thermostat offers advanced features that put you in control of your home's comfort and energy efficiency—from anywhere in the world.
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((feature, i) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(i)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                  activeFeature === i 
                    ? 'bg-[#333333] text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid={`tab-feature-${feature.id}`}
              >
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{feature.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Feature Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-6">
                    {(() => {
                      const Icon = features[activeFeature].icon;
                      return <Icon className="w-7 h-7 text-[#8dc63f]" />;
                    })()}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#333333] mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    {features[activeFeature].description}
                  </p>
                  <div className="space-y-3">
                    {features[activeFeature].benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0" />
                        <span className="font-medium text-[#333333]">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#333333] p-8 md:p-12 flex items-center justify-center min-h-[300px]">
                  <motion.img
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    className="max-h-80 w-auto object-contain drop-shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                What Systems Are <span className="text-[#8dc63f]">Compatible?</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                The Peak Series Smart Thermostat works with almost all heating and cooling systems, making it the perfect upgrade for any home in Atlantic Canada or British Columbia.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {compatibleSystems.map((system, i) => (
                  <motion.div
                    key={system.name}
                    className="flex items-center gap-3 bg-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <system.icon className="w-6 h-6 text-[#8dc63f]" />
                    <span className="text-white font-medium text-sm">{system.name}</span>
                  </motion.div>
                ))}
              </div>

              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 px-8">
                  Check Compatibility
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                src={peakCompatibilityImg} 
                alt="Compatible HVAC systems including heat pumps, furnaces, and air conditioners" 
                className="max-w-md w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              Where Is the Peak Thermostat <span className="text-[#8dc63f]">Available?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Professional Peak Series Smart Thermostat installation is available across Atlantic Canada and British Columbia. Our certified technicians ensure seamless setup and integration with your existing HVAC system.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {provinces.map((province, i) => (
              <motion.div
                key={province.abbr}
                className="flex items-center gap-2 bg-slate-100 rounded-xl px-6 py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#8dc63f20" }}
              >
                <MapPin className="w-5 h-5 text-[#8dc63f]" />
                <span className="font-bold text-[#333333]">{province.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Peak */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              Why Choose the Peak Series <span className="text-[#8dc63f]">Smart Thermostat?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Energy Savings", desc: "Save up to 23% on heating and cooling costs with intelligent scheduling and eco modes." },
              { icon: Wifi, title: "Wi-Fi Connected", desc: "Control from anywhere using the Greenfoot app on iOS or Android devices." },
              { icon: Shield, title: "Professional Install", desc: "Red Seal certified technicians ensure proper setup and system integration." },
              { icon: Leaf, title: "Eco-Friendly", desc: "Reduce your carbon footprint with optimized energy consumption." }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              Frequently Asked <span className="text-[#8dc63f]">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem value={`faq-${i}`} className="bg-slate-50 rounded-xl border-0 px-6">
                    <AccordionTrigger className="text-left font-bold text-[#333333] hover:text-[#8dc63f] py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              Ready to Upgrade to <span className="text-[#8dc63f]">Smart Control?</span>
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Get a free quote for Peak Series Smart Thermostat installation. Our experts will help you choose the right setup for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-lg h-14 px-10">
                  Get Your Free Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:18003809384">
                <Button size="lg" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl font-bold text-lg h-14 px-10">
                  <Phone className="w-5 h-5 mr-2" />
                  1 (800) 380-9384
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="peakThermostat" />


      <SiteFooter />
    </div>
  );
}
