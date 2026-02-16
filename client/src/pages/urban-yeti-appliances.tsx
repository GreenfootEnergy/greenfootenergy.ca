import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, ChevronDown, Star, Check, Shield, Zap, Truck, Wrench, Award, Home, Building, Calendar, Users, CheckCircle2, ArrowRight, Sparkles, Settings, Leaf, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet";

import heroBg from "@assets/Urban_yeti_Hero_1769471699604.avif";
import urbanYetiLogo from "@assets/Urban_yeti_appliance_lgo_1769471658716.png";
import cafeLogo from "@assets/cafe_logo_1769471420357.avif";
import dacorLogo from "@assets/dacor-logo_1769471420356.avif";
import electroluxLogo from "@assets/electrolux_logo_1769471420357.avif";
import frigidaireLogo from "@assets/frigidaire_logo_1769471420357.avif";
import lgLogo from "@assets/Lg_logo_1769471420358.avif";
import geLogo from "@assets/GE_logo_1769471420357.avif";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const brands = [
  {
    name: "Café",
    logo: cafeLogo,
    tagline: "Customizable Luxury",
    description: "Fashion-forward appliances with customizable hardware finishes. Express your personal style with brushed copper, bronze, brass, and more.",
    features: ["Custom Hardware Finishes", "Smart Wi-Fi Connected", "GE Reliability"],
    color: "#D4AF37"
  },
  {
    name: "Dacor",
    logo: dacorLogo,
    tagline: "Life & Luxury Connected",
    description: "Award-winning premium appliances with Samsung SmartThings integration. SteelCool technology and 3D LED lighting create the ultimate kitchen experience.",
    features: ["SmartThings Integration", "SteelCool Technology", "Award-Winning Design"],
    color: "#1E5AA8"
  },
  {
    name: "Electrolux",
    logo: electroluxLogo,
    tagline: "Professional Performance",
    description: "Over 100 years of Swedish innovation. AI-assisted cooking, exceptional energy efficiency, and professional-grade performance for discerning homeowners.",
    features: ["AI-Assisted Cooking", "Energy Star Most Efficient", "European Engineering"],
    color: "#003865"
  },
  {
    name: "Frigidaire",
    logo: frigidaireLogo,
    tagline: "Reliable & Affordable",
    description: "Trusted for generations. Straightforward functionality with excellent value. Air Fry technology and OrbitClean dishwashers for everyday excellence.",
    features: ["Air Fry Technology", "OrbitClean Wash System", "Budget-Friendly"],
    color: "#ED1C24"
  },
  {
    name: "LG",
    logo: lgLogo,
    tagline: "Life's Good",
    description: "ThinQ smart platform connects your entire home. Voice control, remote monitoring, and AI-powered automation for the modern connected lifestyle.",
    features: ["ThinQ Smart Platform", "Voice Control Ready", "Energy Monitoring"],
    color: "#A50034"
  },
  {
    name: "GE",
    logo: geLogo,
    tagline: "American Heritage",
    description: "Over a century of trusted American innovation. Reliable performance, comprehensive warranty support, and a full range of appliances for every need.",
    features: ["Trusted Heritage", "Full Product Range", "Comprehensive Support"],
    color: "#3C4E8B"
  }
];

const services = [
  {
    icon: Truck,
    title: "White-Glove Delivery",
    description: "Careful handling and professional installation in every unit. We coordinate deliveries for multi-unit developments or renovations."
  },
  {
    icon: Settings,
    title: "Expert Installation",
    description: "On-site testing and verification ensuring every appliance is installed correctly and fully operational from day one."
  },
  {
    icon: Wrench,
    title: "In-House Repair",
    description: "Certified technicians trained to service all major kitchen, laundry, and specialty appliances with quick response times."
  },
  {
    icon: Calendar,
    title: "Preventative Maintenance",
    description: "Routine inspections that extend lifespan and reduce costly downtime. Priority scheduling for property managers."
  }
];

const propertyTypes = [
  { icon: Building, title: "Condominiums", desc: "Premium appliance solutions for condo developments" },
  { icon: Home, title: "Apartment Buildings", desc: "Efficient appliances for multi-family housing" },
  { icon: Users, title: "Townhouse Complexes", desc: "Coordinated installations for townhome projects" },
  { icon: Building, title: "Mixed-Use Developments", desc: "Commercial-grade options for property managers" }
];

const faqs = [
  {
    question: "What types of multi-unit buildings do you service?",
    answer: "Urban Yeti services various multi-unit properties including condominiums, apartment buildings, townhouse complexes, and mixed-use developments throughout our 17 locations in the Maritimes and British Columbia."
  },
  {
    question: "What is Urban Yeti and what services does it provide?",
    answer: "Urban Yeti is our specialized division serving multi-unit residential buildings, condominiums, and apartment complexes. We provide HVAC, appliance, and energy system services tailored to the unique needs of property managers and multi-unit building owners across our service regions."
  },
  {
    question: "What emergency services are available for multi-unit buildings?",
    answer: "We provide 24/7 emergency response for critical systems in multi-unit buildings, understanding that HVAC failures can affect many residents simultaneously. Our Urban Yeti division prioritizes rapid response to minimize tenant disruption."
  },
  {
    question: "How do you coordinate service in occupied buildings?",
    answer: "Our Urban Yeti team specializes in minimizing disruption to residents while providing necessary services. We coordinate with property management to schedule work during appropriate hours and provide advance notice to affected residents."
  },
  {
    question: "Do you service individual condo units or work through property management?",
    answer: "We work with both individual condo owners and property management companies, depending on building policies and service needs. Our Urban Yeti team understands the complexities of multi-unit building services and compliance requirements."
  },
  {
    question: "Do you offer bulk pricing for multi-unit projects?",
    answer: "Yes, we provide competitive pricing for multi-unit installations and maintenance contracts. Property managers and building owners can benefit from economies of scale when servicing multiple units simultaneously."
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Appliance Specialists",
    desc: "Our team specializes in premium appliance supply and installation. We've outfitted thousands of units across Atlantic Canada and BC with energy-efficient solutions."
  },
  {
    image: experienceImage,
    title: "Multi-Unit Expertise",
    desc: "Years of experience serving condominiums, apartments, and multi-family developments. We understand the unique needs of property managers and building owners."
  },
  {
    image: satisfactionImage,
    title: "Complete Satisfaction",
    desc: "From selection to installation to repair, we ensure you're 100% satisfied. Our dedicated service team is always ready to help when you need us."
  },
  {
    image: dedicatedImage,
    title: "Flexible Financing",
    desc: "Flexible financing options available—conditions apply. We help make premium appliances accessible for any budget or project size."
  }
];

export default function UrbanYetiAppliancesPage() {
  const [activeBrand, setActiveBrand] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <Helmet>
        <title>Urban Yeti Appliances | Premium Appliance Supply & Installation for Multi-Unit Buildings | Greenfoot Energy</title>
        <meta name="description" content="Urban Yeti specializes in premium appliance supply, installation, and repair for condos, apartments, and multi-unit developments across Nova Scotia, New Brunswick, PEI, Newfoundland & BC. Featuring Café, Dacor, Electrolux, Frigidaire, LG, and GE brands with white-glove delivery and 24/7 emergency service." />
        <meta name="keywords" content="multi-unit appliances, condo appliances, apartment appliances, appliance installation Halifax, appliance repair Moncton, commercial appliances BC, Café appliances, Dacor appliances, Electrolux, Frigidaire, LG appliances, GE appliances, property management appliances, bulk appliance pricing" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/urban-yeti-appliances" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="CA-NS" />
        <meta name="geo.region" content="CA-NB" />
        <meta name="geo.region" content="CA-PE" />
        <meta name="geo.region" content="CA-NL" />
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Halifax, Moncton, Charlottetown, St. John's, Vancouver, Victoria" />
        <meta name="ICBM" content="44.6488, -63.5752" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Urban Yeti Appliances | Premium Multi-Unit Appliance Solutions" />
        <meta property="og:description" content="Premium appliance supply, installation & repair for condos, apartments & multi-unit buildings. 6 premium brands. White-glove delivery. 24/7 emergency service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/urban-yeti-appliances" />
        <meta property="og:locale" content="en_CA" />
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Urban Yeti Appliances - Greenfoot Energy Solutions",
            "description": "Premium appliance supply, installation, and repair services for homes and multi-unit developments across Atlantic Canada and British Columbia.",
            "url": "https://www.greenfootenergy.ca/services/urban-yeti-appliances",
            "telephone": "+1-506-850-8240",
            "email": "service@urbanyetiappliances.ca",
            "areaServed": [
              { "@type": "Province", "name": "Nova Scotia" },
              { "@type": "Province", "name": "New Brunswick" },
              { "@type": "Province", "name": "Prince Edward Island" },
              { "@type": "Province", "name": "Newfoundland and Labrador" },
              { "@type": "Province", "name": "British Columbia" }
            ],
            "serviceType": ["Appliance Supply", "Appliance Installation", "Appliance Repair", "Appliance Maintenance", "Multi-Unit Building Services"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Premium Appliance Brands",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Café Appliances" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Dacor Appliances" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Electrolux Appliances" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Frigidaire Appliances" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "LG Appliances" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "GE Appliances" } }
              ]
            }
          })}
        </script>
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
        
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.greenfootenergy.ca" },
              { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.greenfootenergy.ca/services" },
              { "@type": "ListItem", "position": 3, "name": "Urban Yeti Appliances", "item": "https://www.greenfootenergy.ca/services/urban-yeti-appliances" }
            ]
          })}
        </script>
      </Helmet>

      <SiteHeader />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <img 
              src={heroBg} 
              alt="Urban Yeti Appliances showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-[#8dc63f]/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6"
                >
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">6 Premium Brands</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  Energy-Efficient<br />
                  <span className="text-[#8dc63f]">Appliances</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-2 max-w-lg font-medium">
                  For Homes, Apartments & Multi-Unit Developments
                </p>

                <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-lg">
                  Premium appliance supply, installation, and repair across Atlantic Canada and British Columbia. Featuring the industry's most trusted brands.
                </p>

                <div className="flex gap-3 mb-6">
                  <a href="tel:+15068508240">
                    <Button 
                      size="lg" 
                      className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                      data-testid="button-call-quote"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call for Quote
                    </Button>
                  </a>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-[#333333] text-[#333333] font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 hover:bg-[#333333] hover:text-white transition-all rounded-xl bg-white"
                    data-testid="button-book-online"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    Book Online
                  </Button>
                </div>

                <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors" data-testid="link-financing-cta">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                {/* Trust Signals */}
                <div className="flex flex-wrap items-center gap-4 mb-16">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#8dc63f]" />
                    <span className="text-sm font-semibold text-[#333333]">Warranty Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#8dc63f]" />
                    <span className="text-sm font-semibold text-[#333333]">White-Glove Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#8dc63f]" />
                    <span className="text-sm font-semibold text-[#333333]">In-House Repair</span>
                  </div>
                </div>
              </motion.div>

              <div className="hidden lg:block"></div>
            </div>
          </div>

          {/* Urban Yeti Logo Banner at bottom of hero */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-[#333333] py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="container mx-auto px-4 flex justify-center">
              <img
                src={urbanYetiLogo}
                alt="Urban Yeti Appliances"
                className="h-12 sm:h-16 md:h-20"
              />
            </div>
          </motion.div>
        </div>

        {/* Brand Showcase Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
                What Appliance Brands Does <span className="text-[#8dc63f]">Urban Yeti Carry?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Urban Yeti partners with six premium appliance manufacturers—Café, Dacor, Electrolux, Frigidaire, LG, and GE—to bring you exceptional quality, reliability, and innovation for multi-unit buildings.
              </p>
            </motion.div>

            {/* Brand Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {brands.map((brand, i) => (
                <motion.button
                  key={brand.name}
                  onClick={() => setActiveBrand(i)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    activeBrand === i 
                      ? 'bg-[#333333] text-white shadow-lg' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 shadow'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`brand-tab-${brand.name.toLowerCase()}`}
                >
                  {brand.name}
                </motion.button>
              ))}
            </div>

            {/* Active Brand Display */}
            <motion.div
              key={activeBrand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div 
                  className="p-8 md:p-12 flex flex-col justify-center"
                  style={{ background: `linear-gradient(135deg, ${brands[activeBrand].color}15, white)` }}
                >
                  <motion.img
                    src={brands[activeBrand].logo}
                    alt={brands[activeBrand].name}
                    className="h-20 md:h-28 object-contain object-left mb-8"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  />
                  <span 
                    className="text-sm font-bold uppercase tracking-wider mb-2"
                    style={{ color: brands[activeBrand].color }}
                  >
                    {brands[activeBrand].tagline}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#333333] mb-4">
                    {brands[activeBrand].name} Appliances
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {brands[activeBrand].description}
                  </p>
                  <div className="space-y-3">
                    {brands[activeBrand].features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0" />
                        <span className="font-medium text-[#333333]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-100 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-[#8dc63f] mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-[#333333] mb-2">Explore {brands[activeBrand].name}</h4>
                    <p className="text-slate-600 mb-6">Discover the full range of {brands[activeBrand].name} appliances available through Urban Yeti.</p>
                    <Button 
                      className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold px-8 h-12 rounded-xl"
                      onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                      data-testid={`button-explore-${brands[activeBrand].name.toLowerCase()}`}
                    >
                      Request Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
                What Appliance Services Does <span className="text-[#8dc63f]">Urban Yeti Offer?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Urban Yeti provides white-glove delivery, professional installation, certified repair services, and preventative maintenance programs for residential and commercial properties across Atlantic Canada and BC.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-all group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8dc63f]/20 transition-colors">
                    <service.icon className="w-7 h-7 text-[#8dc63f]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-20 bg-[#333333]">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                What Types of Buildings Does <span className="text-[#8dc63f]">Urban Yeti Service?</span>
              </h2>
              <p className="text-lg text-slate-300">
                Urban Yeti services condominiums, apartment buildings, townhouse complexes, and mixed-use developments. Whether you're outfitting a single home or a multi-unit project, we have the expertise to meet your needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {propertyTypes.map((type, i) => (
                <motion.div
                  key={type.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <type.icon className="w-10 h-10 text-[#8dc63f] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-slate-300 text-sm">{type.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Urban Yeti */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
                Why Choose <span className="text-[#8dc63f]">Urban Yeti?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Backed by Greenfoot Energy Solutions, Urban Yeti delivers the same commitment to quality, service, and customer satisfaction you've come to trust.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-slate-50 rounded-2xl overflow-hidden group hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Energy Efficiency Focus */}
        <section className="py-20 bg-gradient-to-br from-[#8dc63f]/10 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Leaf className="w-4 h-4" />
                  Energy Efficiency Focus
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-6 tracking-tight">
                  Save Energy, <span className="text-[#8dc63f]">Save Money</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  All our partner brands prioritize energy efficiency. From Energy Star certified appliances to smart monitoring systems, we help you reduce your environmental footprint and lower your utility bills.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Energy Star certified appliance options",
                    "Smart monitoring for energy consumption tracking",
                    "AI-powered efficiency optimization",
                    "Lower utility costs for multi-unit properties"
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8dc63f] flex-shrink-0" />
                      <span className="text-[#333333] font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold px-8 h-14 rounded-xl text-lg"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-energy-assessment"
                >
                  Get Your Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {brands.slice(0, 4).map((brand, i) => (
                  <motion.div
                    key={brand.name}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  >
                    <img src={brand.logo} alt={brand.name} className="h-12 object-contain" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-[#333333]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to <span className="text-[#8dc63f]">Get Started?</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Contact our team today for a free assessment. Whether you need a single appliance or a full multi-unit installation, we're here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-cta-assessment"
                >
                  Get Free Assessment
                </Button>
                <a href="tel:+15068508240">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white font-bold text-lg px-8 h-14 hover:bg-white hover:text-[#333333] transition-all rounded-xl"
                    data-testid="button-cta-call"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    506-850-8240
                  </Button>
                </a>
                <a href="mailto:service@urbanyetiappliances.ca">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white font-bold text-lg px-8 h-14 hover:bg-white hover:text-[#333333] transition-all rounded-xl"
                    data-testid="button-cta-email"
                  >
                    Email Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
                Frequently Asked <span className="text-[#8dc63f]">Questions</span>
              </h2>
              <p className="text-lg text-slate-600">
                Get answers to common questions about Urban Yeti's multi-unit appliance services.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    data-testid={`faq-toggle-${i}`}
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="w-5 h-5 text-[#8dc63f] flex-shrink-0" />
                      <span className="font-bold text-[#333333] text-base md:text-lg">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5"
                    >
                      <p className="text-slate-600 pl-9">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />
      </main>


      <OtherServicesGrid exclude="urbanYeti" />


      <SiteFooter />
    </>
  );
}
