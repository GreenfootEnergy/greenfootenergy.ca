import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Thermometer, Zap, Leaf, Shield, Clock, Wrench, Settings, Home, Building, Calendar, ArrowRight, DollarSign, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";

import heroBg from "@assets/68874c9990cff00613a86901_geothermal-header_1769197585311.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import certifiedTechnicianIcon from "@assets/certified-technician-icon.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const installationServices = [
  "Free in-home consultation and site assessment",
  "Ground loop design and installation",
  "Indoor heat pump unit installation",
  "Ductwork connection or radiant system integration",
  "System commissioning and testing",
  "Full training on system operation"
];

const repairServices = [
  "Compressor and pump diagnostics",
  "Refrigerant leak detection and repair",
  "Ground loop pressure testing",
  "Electronic control troubleshooting",
  "Heat exchanger maintenance"
];

const maintenanceServices = [
  "Annual system inspection",
  "Loop fluid testing and treatment",
  "Filter replacement",
  "Electrical connection checks",
  "Performance optimization",
  "Efficiency monitoring"
];

const geothermalBenefits = [
  {
    icon: Zap,
    title: "40-60% Energy Savings",
    desc: "Geothermal systems use the earth's constant temperature, dramatically reducing energy consumption compared to conventional HVAC systems."
  },
  {
    icon: Leaf,
    title: "Minimal Environmental Impact",
    desc: "Zero on-site emissions and the lowest carbon footprint of any heating and cooling technology available today."
  },
  {
    icon: Shield,
    title: "50+ Year Loop Lifespan",
    desc: "Underground loops last over 50 years, with indoor components lasting 20-25 years—far exceeding conventional systems."
  },
  {
    icon: DollarSign,
    title: "Lower Operating Costs",
    desc: "Stable ground temperatures mean consistent, predictable heating and cooling costs year after year."
  }
];

const whyChooseGeothermal = [
  {
    image: prideImage,
    title: "Geothermal System Specialists",
    desc: "Our certified technicians have extensive experience designing and installing geothermal systems across Atlantic Canada and BC. We understand Maritime ground conditions and climate requirements."
  },
  {
    image: experienceImage,
    title: "Complete System Design",
    desc: "From ground loop calculations to indoor unit sizing, we design custom geothermal solutions for your specific property. Horizontal or vertical loops—we assess your site and recommend the optimal configuration."
  },
  {
    image: satisfactionImage,
    title: "Long-Term Investment",
    desc: "Geothermal systems provide decades of reliable comfort. We help you understand the full lifecycle value, including energy savings, rebates, and increased property value."
  },
  {
    image: dedicatedImage,
    title: "Rebate & Financing Assistance",
    desc: "Geothermal systems qualify for significant federal and provincial incentives. We guide you through available rebates and financing options—conditions apply.",
    links: [
      { text: "View Incentives", href: "/provincial-incentives" },
      { text: "See What You Qualify For", href: "/financing" }
    ]
  }
];

const howItWorks = [
  {
    step: 1,
    title: "Ground Loop System",
    desc: "Pipes are buried underground (horizontally or vertically) where temperatures remain stable year-round, typically between 10-15°C in Canada."
  },
  {
    step: 2,
    title: "Heat Exchange",
    desc: "A fluid circulates through the ground loops, absorbing heat from the earth in winter or depositing heat in summer."
  },
  {
    step: 3,
    title: "Heat Pump Unit",
    desc: "The indoor heat pump concentrates or disperses the heat, then distributes it through your home's ductwork or radiant system."
  },
  {
    step: 4,
    title: "Year-Round Comfort",
    desc: "The same system provides heating in winter and cooling in summer, plus can supplement your hot water needs."
  }
];

export default function GeothermalPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Geothermal Heat Pumps | Ground-Source HVAC | Greenfoot</title>
        <meta name="description" content="Expert geothermal heat pump installation across NS, NB, PEI, NFLD & BC. 40-60% energy savings with 50+ year loop lifespan. Free site assessment available." />
        <meta name="keywords" content="geothermal heat pump, ground source heat pump, geothermal heating, geothermal cooling, earth energy systems, geothermal installation Canada" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/geothermal-heat-pumps" />
        
        <meta property="og:title" content="Geothermal Heat Pumps | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Expert geothermal heat pump installation. 40-60% energy savings with earth's natural energy. Free site assessment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/geothermal-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Geothermal Heat Pumps | Greenfoot Energy" />
        <meta name="twitter:description" content="Geothermal heat pump installation. 40-60% energy savings with earth's natural energy." />
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
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold py-4 px-6 rounded-xl text-center transition-colors"
              >
                View Financing Options
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SEO Schema Markup */}
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Geothermal Heat Pumps", url: "https://www.greenfootenergy.ca/services/geothermal-heat-pumps" }
        ]}
      />
      <ServiceSchemaWithFAQs 
        serviceName="Geothermal Heat Pump Installation, Repair & Maintenance"
        serviceDescription="Expert geothermal heat pump services across Atlantic Canada and British Columbia. Installation, repair, and maintenance of ground-source heat pump systems for sustainable, energy-efficient home heating and cooling."
        serviceType="GeothermalHeatPumpService"
        serviceUrl="https://www.greenfootenergy.ca/services/geothermal-heat-pumps"
        faqCategory="Geothermal Heat Pumps"
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt="Geothermal heat pump service background" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
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
                  Geothermal<br />
                  <span className="text-[#8dc63f]">Heat Pump Systems</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Professional geothermal installation across NS, NB, PEI, NFLD & BC. Harness the earth's natural energy for the most efficient heating & cooling available.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
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

                {/* Financing CTA */}
                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-6 lg:gap-8 items-center">
                  <div className="flex items-center gap-2">
                    <img src={expertiseIcon} alt="Unmatched expertise icon" className="w-10 h-10 sm:w-12 sm:h-12" />
                    <span className="text-xs font-semibold text-slate-600">Unmatched<br/>Expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={guaranteeIcon} alt="Satisfaction guarantee badge" className="w-10 h-10 sm:w-12 sm:h-12" />
                    <span className="text-xs font-semibold text-slate-600">Satisfaction<br/>Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={certifiedTechnicianIcon} alt="Red Seal certified technician icon" className="w-10 h-10 sm:w-12 sm:h-12" />
                    <span className="text-xs font-semibold text-slate-600">Red Seal<br/>Certified</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* What is Geothermal Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6">
              What Is a <span className="text-[#8dc63f]">Geothermal Heat Pump</span> and How Does It Work?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Geothermal heat pumps use the earth's stable underground temperature to provide highly efficient heating and cooling. Unlike air-source systems that depend on outdoor air temperature, geothermal systems tap into ground temperatures that remain constant year-round—typically 10-15°C in Canada—making them incredibly efficient even during harsh Maritime winters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Are the <span className="text-[#8dc63f]">Benefits</span> of Geothermal Heat Pumps?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Geothermal systems offer exceptional efficiency, environmental benefits, and long-term savings that make them the gold standard for sustainable home comfort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {geothermalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              What <span className="text-[#8dc63f]">Geothermal Services</span> Does Greenfoot Offer?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From initial consultation to ongoing maintenance, we provide complete geothermal solutions tailored to your property and climate needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Installation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Installation</h3>
              <ul className="space-y-3">
                {installationServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold cta-hover h-12 sm:h-14">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Repair */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Repair</h3>
              <ul className="space-y-3">
                {repairServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold cta-hover h-12 sm:h-14"
              >
                Book Repair
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Maintenance</h3>
              <ul className="space-y-3">
                {maintenanceServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold cta-hover h-12 sm:h-14"
              >
                Schedule Maintenance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why Should You <span className="text-[#8dc63f]">Choose Greenfoot</span> for Geothermal?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team combines deep geothermal expertise with local knowledge of Maritime and BC ground conditions to deliver systems that perform reliably for decades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseGeothermal.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
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

      {/* Geothermal vs Air-Source Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 text-center">
              How Does <span className="text-[#8dc63f]">Geothermal Compare</span> to Air-Source Heat Pumps?
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              While both technologies provide efficient heating and cooling, geothermal systems offer superior performance in extreme temperatures because they use stable ground temperatures instead of variable outdoor air.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-[#8dc63f] mb-4">Geothermal Heat Pumps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>Uses constant ground temperature (10-15°C)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>400-500% efficiency (COP of 4-5)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>50+ year underground loop lifespan</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>Consistent performance in all weather</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span>Higher upfront cost, lower operating costs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-[#1E5AA8] mb-4">Air-Source Heat Pumps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Thermometer className="w-5 h-5 text-[#1E5AA8] flex-shrink-0 mt-0.5" />
                    <span>Uses outdoor air temperature (varies seasonally)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Thermometer className="w-5 h-5 text-[#1E5AA8] flex-shrink-0 mt-0.5" />
                    <span>200-400% efficiency depending on conditions</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Thermometer className="w-5 h-5 text-[#1E5AA8] flex-shrink-0 mt-0.5" />
                    <span>15-20 year typical system lifespan</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Thermometer className="w-5 h-5 text-[#1E5AA8] flex-shrink-0 mt-0.5" />
                    <span>Efficiency decreases in extreme cold</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Thermometer className="w-5 h-5 text-[#1E5AA8] flex-shrink-0 mt-0.5" />
                    <span>Lower upfront cost, higher operating costs</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQSection 
        title="Frequently Asked Questions About Geothermal Heat Pumps"
        category="Geothermal Heat Pumps"
        limit={10}
      />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
              Ready to Harness Earth's Energy?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free geothermal consultation. Our experts will assess your property and design a system that delivers decades of efficient, sustainable comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#8dc63f] hover:bg-gray-100 px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl font-bold shadow-lg hover:shadow-xl transition-all cta-hover-dark">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </a>
              <a href="tel:1-800-380-9384">
                <Button variant="outline" className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl font-bold transition-all">
                  <Phone className="w-5 h-5 mr-2" />
                  1-800-380-9384
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="geothermal" />

      <RelatedContent currentPath="/services/geothermal-heat-pumps" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
