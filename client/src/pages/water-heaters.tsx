import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useRef } from "react";
import { Helmet } from "react-helmet";

import heroBg from "@/assets/images/hot-water-tap-hero.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import waterHeaterProduct from "@/assets/images/gridless-water-heater.avif";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productFeatures = [
  "Wifi Connected",
  "10 Year Compressor, 10 Year Tank, 10 Year Parts And 5 Year Labour For Supply And Install.",
  "InfoHub (Optional)",
  "Supply Only: 10 Compressor, 10 Year Tank, 5 Year Parts"
];

const installationBenefits = [
  "Enhanced comfort: Experience consistent temperatures and reliable hot water delivery.",
  "Energy efficiency: Modern systems reduce energy consumption, helping to lower utility costs.",
  "Increased water pressure: New installations can correct flow issues, providing stronger pressure throughout the home.",
  "Longer lifespan: Professional installation ensures the equipment operates correctly, extending the life of the unit."
];


const repairServices = [
  "No hot water: We troubleshoot failed heating elements, broken thermostats, or gas supply interruptions to restore heat.",
  "Low water pressure: We identify sediment buildup or valve obstructions that restrict water flow to your fixtures.",
  "Leaky tank: We quickly assess leaks to prevent structural water damage and determine if a repair or replacement is needed.",
  "Strange noises: We flush tanks to eliminate the popping, rumbling, or banging sounds caused by mineral deposits.",
  "Pilot light issues: We safely inspect, clean, and relight gas pilot assemblies that fail to stay lit."
];

const installationSteps = [
  {
    step: 1,
    title: "Professional Water Heater Assessment",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive evaluation at no cost:",
    details: [
      "Assess your current water heating system",
      "Evaluate household hot water demands",
      "Check available space and energy usage patterns",
      "Recommend the ideal water heater solution",
      "Identify energy-efficient and cost-effective options"
    ],
    footer: { cost: "Free, no obligation", timeline: "Within 3-5 business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Plumbing Site Verification",
    intro: "Our plumbing specialists examine your existing setup to finalize the installation plan:",
    details: [
      "Examine existing water connections",
      "Review venting requirements",
      "Assess space constraints",
      "Finalize technical installation plan",
      "Prevent unexpected complications"
    ],
    footer: { timeline: "Scheduled after initial assessment" }
  },
  {
    step: 3,
    title: "Professional Water Heater Installation",
    intro: "Our experienced installation team handles every aspect of the installation:",
    details: [
      "Remove old unit safely",
      "Upgrade connections as needed",
      "Install and test new water heater",
      "Ensure work meets local building codes",
      "Protect your home during installation"
    ],
    footer: { timeline: "Most installations completed in 1 day" }
  },
  {
    step: 4,
    title: "System Demonstration & Maintenance Review",
    intro: "Once installation is complete, our technicians walk you through your new system:",
    details: [
      "Explain thermostat programming",
      "Demonstrate filter replacement",
      "Review seasonal maintenance requirements",
      "Provide personalized efficiency tips",
      "Answer any questions"
    ],
    footer: { timeline: "30-45 minutes included" }
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Expert Technicians",
    desc: "Our certified plumbers specialize in heat pump water heater installation. We've installed thousands of units across 5 Canadian provinces."
  },
  {
    image: experienceImage,
    title: "Premium Products",
    desc: "We partner with top manufacturers to provide durable and efficient water heaters with industry-leading warranties."
  },
  {
    image: satisfactionImage,
    title: "Complete Service Coverage",
    desc: "From installation to maintenance and repairs, we handle everything. Our team provides year-round support for all your hot water needs."
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

export default function WaterHeatersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Heat Pump Water Heaters | Energy-Efficient Hot Water | Greenfoot</title>
        <meta name="description" content="Professional heat pump water heater installation across NS, NB, PEI, NFLD & BC. Up to 4x more efficient than traditional heaters. Free assessment available." />
        <meta name="keywords" content="heat pump water heater, energy efficient water heater, hot water tank, water heater installation, water heater repair, domestic hot water, tankless water heater Canada" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/water-heaters" />
        
        <meta property="og:title" content="Heat Pump Water Heaters | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Energy-efficient heat pump water heaters. Up to 4x more efficient than traditional systems. Professional installation across 5 provinces." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/water-heaters" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Heat Pump Water Heaters | Greenfoot Energy" />
        <meta name="twitter:description" content="Energy-efficient heat pump water heaters with professional installation. Up to 4x more efficient." />
      </Helmet>

      <SiteHeader />

      <ServiceSchemaWithFAQs 
        serviceName="Heat Pump Water Heaters"
        serviceDescription="Professional heat pump water heater installation, repair, and maintenance services across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Energy-efficient hot water solutions."
        serviceType="Water Heater Services"
        serviceUrl="https://www.greenfootenergy.ca/services/water-heaters"
        areaServed={["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador", "British Columbia"]}
        faqCategory="water-heaters"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Heat Pump Water Heaters", url: "https://www.greenfootenergy.ca/services/water-heaters" }
        ]}
      />


      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt="Hot water tap with steam flowing" 
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
                  <span className="text-[#8dc63f]">Energy-Efficient</span><br />
                  Domestic Heat Pump <span className="text-[#8dc63f]">Water Heaters</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Experience reliable water heater installation and expert repair services for a comfortable and efficient home. Up to 4x more efficient than traditional water heaters.
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
                  src={waterHeaterProduct} 
                  alt="Heat Pump Water Heater" 
                  className="w-[300px] xl:w-[350px] h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Showcase Section - Dark Background */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          {/* SEO-Optimized Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Why Are Heat Pump Water Heaters <span className="text-[#8dc63f]">Up to 4x More Efficient?</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Heat pump water heaters use electricity to move heat from the surrounding air into the water tank, rather than generating heat directly. This innovative technology makes them 3-4 times more energy efficient than conventional electric water heaters, significantly reducing your utility bills and carbon footprint.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Product Image & Specs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-[#2a2a2a] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-[#8dc63f] text-[#333333] font-bold text-sm px-4 py-2 rounded-full">
                  ENERGY STAR Certified
                </div>
                <img 
                  src={waterHeaterProduct} 
                  alt="Hybrid Heat Pump Water Heater - 50 and 80 gallon capacity" 
                  className="h-[350px] w-auto object-contain mx-auto"
                  data-testid="img-water-heater-product"
                />
                <div className="flex justify-center gap-4 mt-6">
                  <div className="bg-[#333333] rounded-xl px-4 py-2 text-center">
                    <p className="text-[#8dc63f] font-bold text-xl">50 Gal</p>
                    <p className="text-white/70 text-xs">Family of 2-3</p>
                  </div>
                  <div className="bg-[#333333] rounded-xl px-4 py-2 text-center">
                    <p className="text-[#8dc63f] font-bold text-xl">80 Gal</p>
                    <p className="text-white/70 text-xs">Family of 4+</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Benefits & Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Key Benefits of Heat Pump Water Heaters</h3>
              
              <ul className="space-y-4 mb-8">
                {productFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 bg-[#2a2a2a] rounded-xl p-4">
                    <div className="w-8 h-8 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
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
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl w-full sm:w-auto"
                data-testid="button-product-quote"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get a Free Quote
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              What Water Heater Services Does <span className="text-[#8dc63f]">Greenfoot Energy</span> Offer?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Greenfoot Energy specializes in two core services: expert water heater installation and comprehensive system repair. Whether you need to upgrade your home's plumbing system for energy efficiency or require immediate diagnostics for a fault, our team ensures reliable, year-round comfort for your daily routine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Installation Services */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">What Are the Benefits of a New Water Heater Installation?</h3>
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
              <button
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-schedule-installation"
              >
                Book Installation
              </button>
            </motion.div>

            {/* Repair Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">What Common Water Heater Problems Do We Repair?</h3>
              <ul className="space-y-3 mb-6">
                {repairServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="bg-[#333333] hover:bg-[#222222] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                data-testid="button-book-repair"
              >
                Book Repair
              </button>
            </motion.div>
          </div>
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
              Why Should I Choose <span className="text-[#8dc63f]">Greenfoot Energy</span> for Water Heater Installation?
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-why-quote"
              >
                Get a Free Quote
              </Button>
              <button
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white font-bold text-lg px-8 h-14 rounded-xl transition-all"
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
              Water Heater Estimate & Installation:<br />
              <span className="text-[#8dc63f]">What to Expect</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {installationSteps.map((step, index) => (
              <div key={step.step}>
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
              Ready to Upgrade Your Water Heater?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready to help you find the perfect energy-efficient water heating solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a 
                href="tel:18003809384"
                className="bg-white hover:bg-slate-100 text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                data-testid="button-cta-call"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-cta-quote"
              >
                Get Free Quote
              </Button>
              <button
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold text-lg px-8 h-14 rounded-xl transition-all"
                data-testid="button-cta-maintenance"
              >
                Book Maintenance
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="waterHeaters" />

      <RelatedContent currentPath="/services/water-heaters" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
