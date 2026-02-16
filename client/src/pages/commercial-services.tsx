import { motion } from "framer-motion";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema, ServiceSchemaWithFAQs } from "@/components/seo/ServiceSchema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Phone, Building2, Sun, Download, ArrowRight, CheckCircle2, TrendingUp, Users, Shield, Leaf } from "lucide-react";

import heroBg from "@assets/commercial-hvac-hero.jpg";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import heatPumpIcon from "@assets/Heat_Pump_icon_1768933618655.avif";
import solarIcon from "@assets/solar_icon_1768933618655.avif";

import serviceHvacImg from "@/assets/images/service-hvac-installation.png";
import serviceSolarImg from "@/assets/images/service-solar-panels.png";
import serviceAutomationImg from "@/assets/images/service-building-automation.png";
import serviceMaintenanceImg from "@/assets/images/service-maintenance.png";
import serviceAssessmentImg from "@/assets/images/service-energy-assessment.png";

import unifiedRealtyImage from "@assets/unified-realty-case-study.webp";
import yousefConstructionImage from "@assets/yousef-construction-case-study.avif";
import bellaStateImage from "@assets/bella-state-case-study.png";

const commercialServices = [
  { 
    title: "Commercial HVAC", 
    icon: heatPumpIcon, 
    href: "/services/commercial-hvac",
    description: "VRF/VRV systems, rooftop units, and heat pumps for businesses"
  },
  { 
    title: "Commercial Solar", 
    icon: solarIcon, 
    href: "/services/commercial-solar",
    description: "Solar panel installations for commercial properties"
  },
];

const whatWeOffer = [
  {
    title: "Commercial HVAC System Design & Installation",
    desc: "Custom-engineered heating, ventilation, and air conditioning systems tailored to your facility's unique requirements, ensuring optimal comfort, energy efficiency, and regulatory compliance.",
    image: serviceHvacImg,
    features: ["VRF/VRV Systems", "Rooftop Units", "Split Systems", "Heat Pumps"]
  },
  {
    title: "Commercial Solar Panel Systems",
    desc: "Complete solar energy solutions including design, installation, and monitoring of high-performance photovoltaic systems that dramatically reduce electricity costs and carbon footprint.",
    image: serviceSolarImg,
    features: ["Rooftop Solar", "Ground Mount", "Carport Systems", "Battery Storage"]
  },
  {
    title: "Energy Management & Building Automation",
    desc: "Smart building technologies that optimize HVAC and energy usage through automated controls, real-time monitoring, and predictive maintenance scheduling.",
    image: serviceAutomationImg,
    features: ["Smart Controls", "Real-time Monitoring", "Automated Scheduling", "Energy Analytics"]
  },
  {
    title: "Preventive Maintenance & Service Contracts",
    desc: "Comprehensive maintenance programs that maximize equipment lifespan, prevent costly breakdowns, and ensure peak performance of your HVAC and solar investments.",
    image: serviceMaintenanceImg,
    features: ["Seasonal Inspections", "Filter Changes", "Priority Service", "24/7 Support"]
  },
  {
    title: "Energy Assessments & Efficiency Upgrades",
    desc: "Professional assessments and retrofits that identify energy waste, improve system performance, and qualify your business for available rebates and tax incentives.",
    image: serviceAssessmentImg,
    features: ["Energy Audits", "Rebate Applications", "Retrofit Planning", "ROI Analysis"]
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Slash Operating Costs by Up to 70%",
    desc: "Our integrated HVAC and solar solutions dramatically reduce energy expenses, delivering rapid ROI and long-term savings."
  },
  {
    icon: Users,
    title: "Enhance Employee Productivity & Comfort",
    desc: "Optimal climate control creates a healthier, more comfortable work environment that boosts morale and productivity."
  },
  {
    icon: Shield,
    title: "Future-Proof Your Business Operations",
    desc: "Stay ahead of rising energy costs and regulations with modern, efficient systems designed for tomorrow's standards."
  },
  {
    icon: Leaf,
    title: "Strengthen Your Brand & Market Position",
    desc: "Demonstrate environmental leadership and attract eco-conscious customers and partners with sustainable operations."
  }
];

const caseStudies = [
  {
    title: "Unified Realty - Geothermal VRV System",
    location: "171 Lutz St, Moncton, NB",
    description: "Rebuilt HVAC infrastructure following a fire with high-efficiency Daikin Water Source VRV T-Series Heat Recovery system.",
    stats: [
      { label: "VRV Units", value: "4 × 10-ton" },
      { label: "System Type", value: "Geothermal" },
      { label: "Building Type", value: "Commercial" }
    ],
    image: unifiedRealtyImage
  },
  {
    title: "Yousef Construction - 95 Unit Building",
    location: "264 Rookwood Ave",
    description: "Large-scale HVAC installation equipping all 95 units with high-efficiency LG heat pumps for reliable heating and cooling.",
    stats: [
      { label: "Units Installed", value: "95" },
      { label: "Brand", value: "LG" },
      { label: "Building Type", value: "Multi-Residential" }
    ],
    image: yousefConstructionImage
  },
  {
    title: "Bella State - 44 Unit Residential",
    location: "100 Clark Street",
    description: "Installation of Gridless single-unit systems at a 44-unit residential building, offering residents independent climate control.",
    stats: [
      { label: "Units Installed", value: "44" },
      { label: "Brand", value: "Gridless" },
      { label: "Building Type", value: "Multi-Residential" }
    ],
    image: bellaStateImage
  }
];

const faqs = [
  {
    question: "What commercial energy services does Greenfoot offer?",
    answer: "Greenfoot provides comprehensive commercial HVAC installation, repair, and maintenance, as well as commercial solar panel systems. We handle everything from system design to installation and ongoing maintenance for businesses of all sizes."
  },
  {
    question: "How much can my business save with commercial HVAC and solar?",
    answer: "Businesses typically see 30-70% reduction in energy costs depending on their current systems and energy usage. Solar systems can provide 20+ years of free electricity after the initial payback period of 3-7 years."
  },
  {
    question: "Do you offer financing for commercial projects?",
    answer: "Yes, we offer flexible financing options for commercial HVAC and solar projects. We can also help identify and apply for available rebates and incentives to reduce your upfront costs."
  },
  {
    question: "What size commercial buildings can you service?",
    answer: "We service commercial buildings of all sizes, from small retail spaces to large multi-unit residential buildings, warehouses, and industrial facilities with 100+ units."
  },
  {
    question: "Are there rebates available for commercial energy upgrades?",
    answer: "Yes, significant rebates and incentives are available for commercial HVAC and solar upgrades across all provinces we serve. We help identify and apply for all available incentives to maximize your savings."
  },
  {
    question: "How long does a commercial installation take?",
    answer: "Timelines vary based on system complexity and building size. Standard commercial HVAC installations take 1-3 weeks, while larger VRF or solar installations may take 4-12 weeks. We provide detailed timelines during consultation."
  }
];

export default function CommercialServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Commercial Services | HVAC & Solar Solutions | Greenfoot Energy</title>
        <meta name="description" content="Comprehensive commercial energy solutions including HVAC installation, repair, maintenance, and solar panel systems for businesses across Atlantic Canada and BC." />
        <meta name="keywords" content="commercial HVAC, commercial solar, VRF systems, commercial heat pumps, business energy solutions, commercial heating, commercial cooling, solar panels" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/commercial-services" />
        <meta property="og:title" content="Commercial HVAC & Solar Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Maximize efficiency and minimize costs with our comprehensive commercial HVAC and solar solutions for businesses of all sizes." />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/commercial-services" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Commercial Services", url: "https://www.greenfootenergy.ca/services/commercial-services" }
        ]}
      />
      
      <ServiceSchemaWithFAQs
        serviceName="Commercial HVAC & Solar Services"
        serviceDescription="Comprehensive commercial energy solutions including HVAC installation, repair, maintenance, and solar panel systems for businesses across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia."
        serviceType="Commercial Energy Service"
        serviceUrl="https://www.greenfootenergy.ca/services/commercial-services"
        priceRange="$$$"
        faqCategory="commercial-services"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 847 }}
      />
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/85 to-[#333333]/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-20 pb-16 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase leading-tight mb-6">
              Comprehensive Energy Solutions for <span className="text-[#8dc63f]">Commercial Buildings</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
              Our experts and advanced estimation tools make your business build simple and stress-free. Maximize efficiency and minimize costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-hero-assessment"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Your Free Assessment
              </Button>
              <a 
                href="tel:18003809384"
                className="bg-[#4a4a4a] hover:bg-[#3a3a3a] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 border border-white/50 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                data-testid="button-hero-call"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>

            <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md" data-testid="link-financing-cta">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-white/70 text-sm">Learn more about our financing options →</p>
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
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">75,000+ Installs</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
              >
                <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">Satisfaction Guaranteed</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
              >
                <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">Red Seal Certified</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

              </section>

      {/* Service Selector - Matching Homepage Style */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-[#333333] rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                Commercial HVAC & Solar
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#8dc63f] uppercase tracking-tight">
                Made Easy
              </h2>
              <p className="text-white/80 mt-4 text-base md:text-lg">
                Maximize Efficiency, Minimize Costs: Commercial HVAC & Solar Services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {commercialServices.map((service, i) => (
                <Link key={i} href={service.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#f5f0eb] hover:bg-[#ebe5df] rounded-2xl py-6 md:py-8 px-5 md:px-6 flex items-center gap-4 md:gap-5 transition-all duration-300 group cursor-pointer"
                    data-testid={`link-commercial-service-${i}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#333333] text-lg md:text-xl group-hover:text-[#8dc63f] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">{service.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Benefits of Commercial <span className="text-[#8dc63f]">HVAC & Solar</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#8dc63f]" />
                </div>
                <h3 className="font-bold text-[#333333] text-xl mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
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
              Our Commercial <span className="text-[#8dc63f]">Case Studies</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              See how we've helped businesses across Atlantic Canada achieve their energy goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#333333] text-lg mb-1">{study.title}</h3>
                  <p className="text-sm text-[#8dc63f] mb-3">{study.location}</p>
                  <p className="text-slate-600 text-sm mb-4">{study.description}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {study.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center bg-slate-50 rounded-lg p-2">
                        <p className="font-bold text-[#333333] text-sm">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services/commercial-hvac">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-view-more-cases"
              >
                View More Case Studies
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
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
              What Are Our <span className="text-[#8dc63f]">Commercial Services</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Comprehensive HVAC and solar solutions designed to meet the unique needs of commercial properties.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeOffer.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer"
                data-testid={`service-card-${index}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg leading-tight">{item.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-[#8dc63f]/10 text-[#709c32] text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
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
              Frequently Asked Questions About <span className="text-[#8dc63f]">Commercial Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Get answers to common questions about our commercial HVAC and solar solutions.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-slate-50 rounded-xl border border-gray-200 px-6 overflow-hidden"
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
              Schedule Your <span className="text-[#8dc63f]">Commercial Assessment</span> Today
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let us help you build a smarter, more efficient & sustainable business. Contact us to schedule an assessment and learn more about our commercial HVAC & solar solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:18003809384"
                className="bg-white hover:bg-gray-100 text-[#333333] font-bold text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                data-testid="button-cta-call"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                data-testid="button-cta-assessment"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Your Free Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>


      <OtherServicesGrid exclude="commercialServices" />

      <RelatedContent currentPath="/services/commercial-services" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
