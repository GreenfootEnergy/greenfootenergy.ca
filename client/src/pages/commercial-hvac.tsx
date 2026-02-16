import { motion } from "framer-motion";
import { Phone, Check, Wrench, Settings, Building, ArrowRight, MapPin, Thermometer, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet";
import { useState } from "react";

import heroBg from "@assets/commercial-hvac-hero.jpg";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import unifiedRealtyImage from "@assets/unified-realty-case-study.webp";
import yousefConstructionImage from "@assets/yousef-construction-case-study.avif";
import bellaStateImage from "@assets/bella-state-case-study.png";
import enqoreDevelopmentsImage from "@assets/enqore-developments-case-study.png";

const caseStudies = [
  {
    id: "enqore-developments",
    businessName: "ENQORE Developments",
    location: "411 Highway 214, Elmsdale",
    image: enqoreDevelopmentsImage,
    category: "Healthcare VRF System",
    buildingDetails: "NS Health - Out-Patient Care Facility (7,000 SQFT)",
    equipment: "2x 6-ton Daikin VRF systems w/ 11 Fan Coils + 2 ERVs",
    challenge: "Just 10 days to rough-in 11 fan coils, 2 branch boxes, control wiring, and 2x 1200 CFM ERVs for a healthcare facility.",
    solution: "Deployed a rapid installation team to complete full VRF system rough-in with precision and efficiency under extreme time pressure.",
    result: "Rough-in completed on schedule, enabling the healthcare facility to proceed with construction timeline for patient care services.",
    stats: [
      { value: "10", label: "Days" },
      { value: "11", label: "Fan Coils" },
      { value: "2", label: "ERV Systems" }
    ],
    pdfFile: "enqore-developments-case-study.pdf"
  },
  {
    id: "unified-realty",
    businessName: "Unified Realty",
    location: "171 Lutz St, Moncton NB",
    image: unifiedRealtyImage,
    category: "Geothermal VRV System",
    buildingDetails: "Multi-story commercial building",
    equipment: "Daikin Water Source VRV",
    challenge: "Complex retrofit after fire damage required on-site redesign when original plans couldn't be followed.",
    solution: "Installed 4x 10-ton VRV T-series water source heat pumps connected to existing boreholes, plus 25+ concealed ducted units and ceiling cassettes.",
    result: "New and improved geothermal system with full building climate control, completed successfully despite challenging conditions.",
    stats: [
      { value: "40", label: "Tons Capacity" },
      { value: "25+", label: "Indoor Units" },
      { value: "2", label: "HRV Systems" }
    ]
  },
  {
    id: "yousef-construction",
    businessName: "Yousef Construction",
    location: "264 Rookwood Ave",
    image: yousefConstructionImage,
    category: "Multi-Unit Residential",
    buildingDetails: "95-unit residential building",
    equipment: "LG Heat Pumps",
    challenge: "Large-scale residential development requiring efficient HVAC solutions for all 95 units.",
    solution: "Installed LG heat pump systems in every unit, providing individual climate control for all residents.",
    result: "Complete building-wide HVAC coverage with energy-efficient heat pumps for optimal comfort and reduced operating costs.",
    stats: [
      { value: "95", label: "Units Installed" },
      { value: "LG", label: "Brand" },
      { value: "100%", label: "Coverage" }
    ]
  },
  {
    id: "bella-state",
    businessName: "Bella State Construction",
    location: "100 Clark Street",
    image: bellaStateImage,
    category: "Multi-Unit Residential",
    buildingDetails: "44-unit residential building",
    equipment: "Gridless Single Units",
    challenge: "New construction requiring individual climate control systems for each unit.",
    solution: "Installed Gridless single-zone heat pumps in all 44 units for independent temperature control.",
    result: "Each resident enjoys individual climate control with energy-efficient Gridless systems designed for Canadian winters.",
    stats: [
      { value: "44", label: "Units Installed" },
      { value: "Gridless", label: "Brand" },
      { value: "-30°C", label: "Rated" }
    ]
  }
];

const services = [
  {
    icon: Building,
    title: "Installation",
    description: "Expert installation of rooftop units, split systems, VRF systems, and more for buildings of all sizes."
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Quick diagnosis and repair with comprehensive maintenance plans to prevent breakdowns."
  },
  {
    icon: Settings,
    title: "Energy Efficiency",
    description: "Identify energy-saving opportunities and implement solutions to reduce operating costs."
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Experienced Technicians",
    desc: "Our team has the expertise to handle complex commercial HVAC systems of any scale."
  },
  {
    image: experienceImage,
    title: "Quick Response Times",
    desc: "We prioritize prompt service to minimize disruptions to your business operations."
  },
  {
    image: satisfactionImage,
    title: "Customized Solutions",
    desc: "We tailor our services to meet your specific needs and budget requirements."
  },
  {
    image: dedicatedImage,
    title: "Proven Track Record",
    desc: "Hundreds of successful commercial projects across Atlantic Canada and BC."
  }
];

const faqs = [
  {
    question: "What types of commercial HVAC systems do you install?",
    answer: "We install a wide range of commercial HVAC systems including rooftop units (RTUs), split systems, VRF/VRV systems, geothermal heat pumps, and ductless mini-splits. We work with leading brands like Daikin, LG, Gridless, and American Standard to provide solutions tailored to your building's needs."
  },
  {
    question: "How long does a commercial HVAC installation typically take?",
    answer: "Installation timelines vary based on system complexity and building size. A standard commercial installation typically takes 1-3 weeks, while larger VRF systems or geothermal installations may take 4-8 weeks. We provide detailed timelines during the consultation phase."
  },
  {
    question: "Do you offer commercial HVAC maintenance contracts?",
    answer: "Yes, we offer comprehensive maintenance contracts for commercial HVAC systems. Regular maintenance helps prevent costly breakdowns, extends equipment life, and ensures optimal energy efficiency. Our plans include seasonal inspections, filter changes, and priority service calls."
  },
  {
    question: "What size commercial buildings can you service?",
    answer: "We service commercial buildings of all sizes, from small retail spaces and offices to large multi-unit residential buildings, warehouses, and industrial facilities. Our team has experience with projects ranging from single-zone systems to complex 100+ unit installations."
  },
  {
    question: "Are there rebates available for commercial HVAC upgrades?",
    answer: "Yes, there are often significant rebates and incentives available for commercial HVAC upgrades, especially for energy-efficient heat pump systems. Provincial programs and utility rebates vary by location. We help identify and apply for all available incentives to maximize your savings."
  },
  {
    question: "What is a VRF/VRV system and is it right for my building?",
    answer: "VRF (Variable Refrigerant Flow) or VRV (Variable Refrigerant Volume) systems are advanced heat pump systems that can simultaneously heat and cool different zones in a building. They're ideal for multi-story buildings, offices, and hotels where different areas have varying temperature needs and energy efficiency is a priority."
  },
  {
    question: "How quickly can you respond to commercial HVAC emergencies?",
    answer: "We prioritize commercial emergency calls because we understand that HVAC failures can significantly impact your business. We offer same-day and next-day service for most emergency situations, with 24/7 availability for maintenance contract customers."
  },
  {
    question: "Do you handle commercial HVAC projects in both Atlantic Canada and BC?",
    answer: "Yes, Greenfoot Energy Solutions provides commercial HVAC services across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Our experienced teams in each region understand local climate challenges and building codes."
  }
];

export default function CommercialHVACPage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const currentCaseStudy = caseStudies[activeCaseStudy];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Commercial HVAC Services | Installation, Repair & Maintenance | Greenfoot Energy</title>
        <meta name="description" content="Expert commercial HVAC services across Atlantic Canada and BC. Installation, repair, and maintenance of VRF/VRV systems, rooftop units, and heat pumps for businesses of all sizes." />
        <meta name="keywords" content="commercial HVAC, VRF systems, VRV systems, commercial heat pumps, HVAC installation, HVAC maintenance, commercial heating, commercial cooling, Atlantic Canada HVAC, BC HVAC" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/commercial-hvac" />
        <meta property="og:title" content="Commercial HVAC Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Keep your commercial space comfortable and energy-efficient with our expert HVAC services. Installation, repair, and maintenance for businesses of all sizes." />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/commercial-hvac" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Commercial HVAC", url: "https://www.greenfootenergy.ca/services/commercial-hvac" }
        ]}
      />
      
      <ServiceSchemaWithFAQs
        serviceName="Commercial HVAC Installation, Repair & Maintenance"
        serviceDescription="Professional commercial HVAC services including installation, repair, and maintenance of VRF/VRV systems, rooftop units, split systems, and heat pumps across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia."
        serviceType="Commercial HVAC Service"
        serviceUrl="https://www.greenfootenergy.ca/services/commercial-hvac"
        priceRange="$$$"
        faqCategory="commercial-hvac"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 847 }}
      />
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#8dc63f] font-bold uppercase tracking-wide mb-4">Commercial HVAC Services</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 uppercase">
                COMMERCIAL HVAC SYSTEMS FOR <span className="text-[#8dc63f]">EFFICIENT HEATING & COOLING</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Keep your commercial space comfortable and energy-efficient with our expert HVAC services. From installation and repair to maintenance and energy optimization, we've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                  data-testid="button-hero-quote"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get Your Free Assessment
                </Button>
                <a 
                  href="tel:18003809384"
                  className="bg-[#4a4a4a] hover:bg-[#3a3a3a] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 border border-white/50 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  data-testid="button-hero-call"
                >
                  <Phone className="w-5 h-5" />
                  1 (800) 380-9384
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-center gap-4 md:gap-8 lg:gap-16 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={expertiseIcon} alt="Trusted" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Unmatched Expertise</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Seasoned commercial advisors</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={guaranteeIcon} alt="Guaranteed" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Satisfaction Guaranteed</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Customer-oriented service</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={redSealIcon} alt="Certified" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Red Seal Certified</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Certified technicians</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              Keeping Your Business <span className="text-[#8dc63f]">Running Smoothly</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We understand the critical role that a reliable HVAC system plays in maintaining a comfortable and productive business environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#8dc63f] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
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
            className="text-center mb-12"
          >
            <p className="text-[#8dc63f] font-bold uppercase tracking-wide mb-2">Our Work</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Commercial HVAC <span className="text-[#8dc63f]">Case Studies</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              See how we've helped businesses across Atlantic Canada achieve efficient heating and cooling solutions.
            </p>
          </motion.div>

          {/* Case Study Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCaseStudy(index)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  index === activeCaseStudy
                    ? "bg-[#8dc63f] text-white"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                }`}
                data-testid={`case-study-tab-${study.id}`}
              >
                {study.businessName}
              </button>
            ))}
          </div>

          {/* Case Study Content */}
          <motion.div
            key={currentCaseStudy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              {/* Image Side */}
              <div className="relative">
                <div className="bg-[#2a2a2a] rounded-2xl overflow-hidden h-full min-h-[400px]">
                  {currentCaseStudy.image ? (
                    <img 
                      src={currentCaseStudy.image} 
                      alt={currentCaseStudy.businessName}
                      className="w-full h-full object-cover"
                      data-testid={`img-case-study-${currentCaseStudy.id}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8dc63f]/20 to-[#333333]">
                      <Building className="w-24 h-24 text-[#8dc63f]/50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8dc63f] text-white text-sm font-bold px-4 py-2 rounded-full">
                      {currentCaseStudy.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center">
                <div className="bg-[#2a2a2a] rounded-2xl p-8 h-full">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {currentCaseStudy.businessName}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>{currentCaseStudy.location}</span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-6 mb-8">
                    {currentCaseStudy.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-[#8dc63f] font-black text-2xl sm:text-3xl">{stat.value}</p>
                        <p className="text-white/60 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-[#333333] rounded-xl p-4">
                      <p className="text-[#8dc63f] font-bold text-sm mb-1">Challenge</p>
                      <p className="text-white/80 text-sm">{currentCaseStudy.challenge}</p>
                    </div>
                    <div className="bg-[#333333] rounded-xl p-4">
                      <p className="text-[#8dc63f] font-bold text-sm mb-1">Solution</p>
                      <p className="text-white/80 text-sm">{currentCaseStudy.solution}</p>
                    </div>
                    <div className="bg-[#333333] rounded-xl p-4">
                      <p className="text-[#8dc63f] font-bold text-sm mb-1">Result</p>
                      <p className="text-white/80 text-sm">{currentCaseStudy.result}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                    <Thermometer className="w-4 h-4" />
                    <span>Equipment: {currentCaseStudy.equipment}</span>
                  </div>

                  {currentCaseStudy.pdfFile && (
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`/api/case-studies/${currentCaseStudy.pdfFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold px-5 py-2.5 rounded-xl transition-all"
                        data-testid={`button-view-case-study-${currentCaseStudy.id}`}
                      >
                        <FileText className="w-4 h-4" />
                        View Case Study
                      </a>
                      <a
                        href={`/api/case-studies/${currentCaseStudy.pdfFile}/download`}
                        className="inline-flex items-center gap-2 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white font-bold px-5 py-2.5 rounded-xl border border-white/30 transition-all"
                        data-testid={`button-download-case-study-${currentCaseStudy.id}`}
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
              data-testid="button-case-study-cta"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Start Your Commercial Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              Why Choose <span className="text-[#8dc63f]">Greenfoot Energy</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're dedicated to delivering superior commercial HVAC solutions through expertise and exceptional service.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
              Frequently Asked Questions About <span className="text-[#8dc63f]">Commercial HVAC</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Get answers to common questions about commercial HVAC systems, installation, and maintenance.
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
              Ready to Upgrade Your <span className="text-[#8dc63f]">Commercial HVAC</span>?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Contact us today to schedule a consultation and learn how our commercial HVAC services can benefit your business.
            </p>
            <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto" data-testid="link-financing-cta">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-white/70 text-sm">Learn more about our financing options →</p>
            </a>
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


      <OtherServicesGrid exclude="commercialHVAC" />

      <RelatedContent currentPath="/services/commercial-hvac" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
