import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Shield, Zap, Volume2, Droplets, Home, Building, Calendar, Users, Award, DollarSign, CheckCircle2, ArrowRight, Thermometer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import heroBg from "@assets/sprayfoam-hero-new.webp";
import sprayfoamProduct from "@assets/Sprayfoam_Insulation_1769451120487.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const sprayfoamBenefits = [
  {
    icon: Thermometer,
    title: "Superior Insulation",
    desc: "Significantly reduces heat loss and energy consumption to keep your utility bills low."
  },
  {
    icon: Wind,
    title: "Effective Air Sealing",
    desc: "Completely fills gaps and cracks, preventing air leaks while improving indoor air quality."
  },
  {
    icon: Droplets,
    title: "Moisture Control",
    desc: "Acts as a powerful vapor barrier that protects your home from moisture damage and mold growth."
  },
  {
    icon: Volume2,
    title: "Enhanced Soundproofing",
    desc: "Reduces external noise pollution to create a quieter and more peaceful living environment."
  }
];

const whyChooseSprayfoam = [
  {
    image: prideImage,
    title: "Spray Foam Insulation Specialists",
    desc: "Our technicians specialize in residential and commercial spray foam applications. We've insulated 25,000+ homes across 5 Canadian provinces, understanding the unique thermal demands of Atlantic and BC climates."
  },
  {
    image: experienceImage,
    title: "Certified Installation Experts",
    desc: "Factory-certified for open-cell and closed-cell spray foam systems. Our manufacturer certifications ensure your insulation performs optimally and meets all building code requirements."
  },
  {
    image: satisfactionImage,
    title: "Complete Home Coverage",
    desc: "Whether you need attic insulation, wall cavities, or basement rim joists sealed, we design custom solutions. Our thermal assessments ensure proper R-value for maximum energy efficiency."
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
    title: "Free Insulation Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive spray foam insulation evaluation at no cost:",
    details: [
      "Measure all areas requiring spray foam application",
      "Assess your home's current insulation performance",
      "Identify air leakage points and evaluate thermal bridging issues",
      "Determine the precise amount of spray foam insulation needed for maximum energy efficiency",
      "Provide a detailed written quote with specs and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Efficient Project Coordination",
    intro: "Following your spray foam insulation assessment, our team coordinates your installation timeline:",
    details: [
      "Scheduling based on your home's specific insulation needs",
      "Clear communication about project duration",
      "Weather considerations for optimal spray foam application",
      "Any special preparation requirements explained in detail"
    ],
    footer: { timeline: "Scheduled within 1-2 weeks" }
  },
  {
    step: 3,
    title: "Expert Insulation Application",
    intro: "Our experienced Greenfoot spray foam installation team arrives with professional-grade equipment:",
    details: [
      "Surface preparation and protective masking",
      "Precise spray foam application by certified technicians",
      "Complete air sealing and thermal barrier creation",
      "Quality control testing throughout the process",
      "Highest safety standards maintained during installation"
    ],
    footer: { singleArea: "4-8 hours", multipleAreas: "1-2 days" }
  },
  {
    step: 4,
    title: "Project Completion Confirmation",
    intro: "Once your spray foam insulation installation is complete, our technician contacts you directly:",
    details: [
      "Confirm project completion and review work performed",
      "Provide post-installation safety guidelines",
      "Ensure all areas have been properly insulated and sealed",
      "Important timing information for safe re-entry to your newly insulated home"
    ],
    footer: { timeline: "Same day notification" }
  },
  {
    step: 5,
    title: "Essential Safety & Preparation Guidelines",
    intro: "For optimal indoor air quality and your safety, please follow these requirements:",
    details: [
      "Be present upon our team's arrival for a pre-installation walkthrough",
      "Ensure a minimum of 4 feet clearance from all exterior walls",
      "Remove any objects leaning against or placed along exterior walls",
      "Stay away from your home for a full 24 hours following spray foam application",
      "You can safely return the following morning between 8:00 AM and 10:00 AM"
    ]
  }
];


export default function SprayfoamInsulationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { t } = useLanguage();
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const sprayfoamFaqs = [
    {
      question: "What is spray foam insulation and how does it work?",
      answer: "Spray foam insulation is a high-performance insulating material that expands upon application, creating an airtight seal that prevents heat loss and air infiltration. It's applied as a liquid that quickly expands to fill gaps, cracks, and cavities in walls, attics, and other areas."
    },
    {
      question: "How long does spray foam insulation last?",
      answer: "Spray foam insulation is extremely durable and can last the lifetime of your home—typically 80+ years. Unlike traditional insulation that can settle, compress, or degrade over time, spray foam maintains its insulating properties and structural integrity for decades."
    },
    {
      question: "Is spray foam insulation worth the cost?",
      answer: "Yes, spray foam insulation typically pays for itself within 5-7 years through energy savings. Homeowners often see 30-50% reduction in heating and cooling costs. Additionally, it adds structural strength to your home and can increase property value."
    },
    {
      question: "What's the difference between open-cell and closed-cell spray foam?",
      answer: "Open-cell spray foam is lighter, more flexible, and excellent for soundproofing—ideal for interior walls. Closed-cell spray foam is denser, provides a higher R-value per inch, acts as a vapor barrier, and adds structural rigidity—perfect for exterior applications and basements."
    },
    {
      question: "How long do I need to stay out of my home after spray foam installation?",
      answer: "For safety and optimal curing, we recommend staying away from your home for 24 hours after spray foam application. You can safely return the following morning between 8:00 AM and 10:00 AM."
    },
    {
      question: "Does spray foam insulation help with soundproofing?",
      answer: "Yes! Spray foam is excellent at reducing noise transmission. Open-cell spray foam, in particular, is highly effective at absorbing sound waves, making it ideal for walls between rooms, home theaters, or reducing outside noise."
    },
    {
      question: "Can spray foam insulation help prevent mold?",
      answer: "Closed-cell spray foam acts as a vapor barrier and doesn't absorb water, making it resistant to mold growth. By sealing air leaks and preventing moisture infiltration, spray foam significantly reduces the conditions that allow mold to develop."
    },
    {
      question: "What areas of my home can be insulated with spray foam?",
      answer: "Spray foam can be applied to attics, walls (both interior and exterior), crawl spaces, basements, rim joists, around windows and doors, and in cathedral ceilings. It's versatile enough to insulate almost any area of your home."
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Spray Foam Insulation Services",
    "description": "Professional spray foam insulation installation for homes across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Expert air sealing and thermal barrier solutions.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Greenfoot Energy Solutions",
      "telephone": "+1-800-380-9384",
      "url": "https://www.greenfootenergy.ca",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "5000"
      }
    },
    "areaServed": [
      { "@type": "Province", "name": "Nova Scotia" },
      { "@type": "Province", "name": "New Brunswick" },
      { "@type": "Province", "name": "Prince Edward Island" },
      { "@type": "Province", "name": "Newfoundland and Labrador" },
      { "@type": "Province", "name": "British Columbia" }
    ],
    "serviceType": "Spray Foam Insulation",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "CAD"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sprayfoamFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.greenfootenergy.ca"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.greenfootenergy.ca/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Spray Foam Insulation",
        "item": "https://www.greenfootenergy.ca/services/sprayfoam-insulation"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get Spray Foam Insulation Installed",
    "description": "Complete guide to getting professional spray foam insulation installed in your Canadian home for maximum energy efficiency.",
    "step": installationSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.intro
    }))
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Spray Foam Insulation Services | Professional Installation | Greenfoot Energy</title>
        <meta name="description" content="Expert spray foam insulation for Canadian homes. 25,000+ homes insulated across NS, NB, PEI, NFLD & BC. Superior air sealing, moisture control & energy savings. Free assessment." />
        <meta name="keywords" content="spray foam insulation, closed cell spray foam, open cell spray foam, attic insulation, basement insulation, home insulation Canada, energy efficient insulation, air sealing, thermal barrier" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/sprayfoam-insulation" />
        
        <meta property="og:title" content="Spray Foam Insulation Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional spray foam insulation for maximum energy efficiency. 25,000+ homes insulated. Free assessment available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/sprayfoam-insulation" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Spray Foam Insulation Services | Greenfoot Energy" />
        <meta name="twitter:description" content="Expert spray foam insulation for Canadian homes. Superior air sealing & energy savings." />
        
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
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
            <h3 className="text-2xl font-bold text-[#333333] mb-6">{t.insulation.common.howCanWeHelp}</h3>
            <div className="space-y-3">
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                {t.insulation.common.bookFreeAssessment}
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold h-12 sm:h-14 px-6 rounded-xl text-center transition-colors flex items-center justify-center"
              >
                {t.insulation.common.viewFinancingOptions}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt="Professional spray foam insulation application" 
            className="w-full h-full object-cover object-center scale-110 -scale-x-100"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/70 via-white/70 to-white/55 md:via-white/65 md:to-white/20"></div>
        
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
                  src={sprayfoamProduct} 
                  alt="Spray Foam Insulation" 
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
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{t.insulation.common.googleReviews}</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  {t.insulation.sprayFoam.heroTitle1}<br />
                  <span className="text-[#8dc63f]">{t.insulation.sprayFoam.heroTitle2}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {t.insulation.sprayFoam.heroSubtitle}
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
                    className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    data-testid="button-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    {t.insulation.common.getFreeQuote}
                  </Button>
                </div>

                <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
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
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.insulation.common.insulatedHomes}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.insulation.common.satisfactionGuaranteed}</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.insulation.common.redSealCertified}</span>
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
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-5 -left-5 w-10 h-10 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-5 -right-5 w-10 h-10 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-10 h-10 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img 
                  src={sprayfoamProduct} 
                  alt="Spray Foam Insulation" 
                  className="w-[400px] h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              How Can Spray Foam Insulation <span className="text-[#8dc63f]">Improve Your Home?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Installing Greenfoot's spray foam insulation is a proven way to upgrade your home's thermal performance and air sealing capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprayfoamBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-[#8dc63f]/30 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] tracking-tight">
              Why Choose Greenfoot for<br />
              <span className="text-[#8dc63f]">Spray Foam Insulation?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Greenfoot Energy is Atlantic Canada and BC's leading insulation contractor with specialized expertise in spray foam solutions for maximum energy efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseSprayfoam.map((card, i) => (
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              What Should You Expect During a <span className="text-[#8dc63f]">Spray Foam Estimate & Installation?</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, index) => (
              <ScrollStepItem
                key={index}
                step={{
                  step: step.step,
                  title: step.title,
                  intro: step.intro,
                  details: step.details,
                  footer: step.footer,
                  showCta: step.showCta
                }}
                index={index}
                total={installationSteps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Dropdown Style */}
      <ServiceFAQSection
        category="insulation"
        limit={8}
        title="Common Questions About Spray Foam Insulation"
      />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Upgrade Your <span className="text-[#8dc63f]">Home Insulation?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Contact Greenfoot today to schedule a free consultation and learn more about how spray foam insulation can benefit your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Get Your Free Assessment
            </Button>
            <a 
              href="tel:18003809384"
              className="bg-white hover:bg-slate-100 text-[#333333] font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              1 (800) 380-9384
            </a>
          </div>
        </div>
      </section>


      <OtherServicesGrid exclude="sprayFoam" />

      <RelatedContent currentPath="/services/sprayfoam-insulation" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
