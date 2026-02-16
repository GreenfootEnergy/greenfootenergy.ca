import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Shield, Zap, Volume2, Droplets, Home, Building, Calendar, Users, Award, DollarSign, CheckCircle2, ArrowRight, Thermometer, Wind, Banknote, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import heroBg from "@assets/batt-poly-hero-bg.webp";
import battPolyProduct from "@assets/batt-poly-product.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const battPolyBenefits = [
  {
    icon: Thermometer,
    title: "Improved Energy Efficiency",
    desc: "Minimizes heat loss in winter and heat gain in summer for superior thermal control and lower energy bills."
  },
  {
    icon: Banknote,
    title: "Lower Energy Costs",
    desc: "Save money on monthly bills by significantly reducing the need for heating and cooling your home."
  },
  {
    icon: Home,
    title: "Enhanced Comfort",
    desc: "Enjoy a more comfortable living environment year-round with proper insulation in walls, attics, and floors."
  },
  {
    icon: Volume2,
    title: "Reduced Noise Pollution",
    desc: "Dampen noise from outside sources and between rooms, creating a much quieter home environment."
  }
];

const whyChooseBattPoly = [
  {
    image: prideImage,
    title: "Batt & Poly Insulation Specialists",
    desc: "Our technicians specialize in residential batt and poly insulation applications. We've insulated thousands of homes across Atlantic Canada and BC, understanding the unique thermal demands of Canadian climates."
  },
  {
    image: experienceImage,
    title: "Certified Installation Experts",
    desc: "Our team has years of dedicated experience in the batt and poly insulation industry. We strictly adhere to industry best practices for every installation."
  },
  {
    image: satisfactionImage,
    title: "Customized Solutions",
    desc: "We tailor our batt and poly insulation services to align perfectly with your specific needs and budget. Our energy audits help identify areas where additional insulation is needed."
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
    title: "Free Batt & Poly Insulation Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive insulation evaluation at no cost:",
    details: [
      "Measure all areas requiring batt and poly insulation",
      "Assess your home's current insulation performance",
      "Identify areas where additional insulation is needed for optimal results",
      "Determine the precise amount of insulation material required",
      "Provide a detailed written quote with specs and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Efficient Project Coordination",
    intro: "Following your batt and poly insulation assessment, our team coordinates your installation timeline:",
    details: [
      "Scheduling based on your home's specific insulation needs",
      "Clear communication about project duration",
      "Material ordering and preparation",
      "Any special preparation requirements explained in detail"
    ],
    footer: { timeline: "Scheduled within 1-2 weeks" }
  },
  {
    step: 3,
    title: "Expert Insulation Installation",
    intro: "Our experienced Greenfoot installation team arrives with professional-grade equipment and materials:",
    details: [
      "Proper installation of high-quality batt insulation materials",
      "Professional polyethylene vapor barrier installation",
      "Complete coverage of walls, attics, and designated areas",
      "Quality control checks throughout the process",
      "Highest safety standards maintained during installation"
    ],
    footer: { singleArea: "4-8 hours", multipleAreas: "1-2 days" }
  },
  {
    step: 4,
    title: "Final Inspection & Walkthrough",
    intro: "Once your batt and poly insulation installation is complete, we conduct a thorough final review:",
    details: [
      "Confirm all areas have been properly insulated",
      "Verify vapor barrier integrity and sealing",
      "Review the work performed with homeowner",
      "Provide maintenance tips and care instructions",
      "Answer any questions about your new insulation"
    ],
    footer: { timeline: "Same day completion" }
  }
];


export default function BattPolyInsulationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { t } = useLanguage();
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const battPolyFaqs = [
    {
      question: "What is batt and poly insulation?",
      answer: "Batt and poly insulation combines fiberglass or mineral wool batts with polyethylene (poly) vapor barrier sheeting. The batts provide thermal insulation while the poly sheet prevents moisture from penetrating walls and causing damage. This combination is a cost-effective solution for maintaining a consistent, energy-efficient indoor climate."
    },
    {
      question: "How does batt and poly insulation improve energy efficiency?",
      answer: "Batt and poly insulation minimizes heat loss in winter and heat gain in summer by creating a thermal barrier in your walls, attic, and floors. The poly vapor barrier prevents moisture infiltration that can reduce insulation effectiveness. Together, they significantly reduce the energy needed for heating and cooling your home."
    },
    {
      question: "What R-value does batt insulation provide?",
      answer: "Batt insulation R-values vary by thickness: R-12 to R-14 for 3.5-inch batts (typical wall cavities), R-20 for 5.5-inch batts, and R-28 to R-40 for attic applications. Our team will recommend the appropriate R-value based on your home's needs and local building code requirements."
    },
    {
      question: "Is batt insulation better than spray foam?",
      answer: "Both have advantages. Batt insulation is more affordable upfront and easier to install in accessible areas. Spray foam provides superior air sealing and higher R-value per inch. We often recommend batt and poly for open wall cavities and standard attic spaces, while spray foam is ideal for hard-to-reach areas and situations requiring maximum air sealing."
    },
    {
      question: "How long does batt and poly insulation installation take?",
      answer: "Most residential batt and poly installations are completed in 1-2 days depending on the scope. A typical attic insulation upgrade takes 4-8 hours, while whole-home insulation projects may take 1-2 days. Our team will provide a specific timeline during your consultation."
    },
    {
      question: "Does batt insulation help with soundproofing?",
      answer: "Yes! Batt insulation is excellent at reducing noise transmission between rooms and from outside. Fiberglass and mineral wool batts absorb sound waves effectively, making them popular choices for bedrooms, home offices, and media rooms."
    },
    {
      question: "Why is a vapor barrier (poly) important?",
      answer: "The polyethylene vapor barrier prevents warm, moist indoor air from penetrating into wall cavities where it could condense and cause mold, rot, or reduced insulation performance. In Canadian climates, proper vapor barrier installation is essential for long-term home protection."
    },
    {
      question: "Can batt insulation be added to existing walls?",
      answer: "Adding batt insulation to existing enclosed walls is challenging and typically requires opening the wall. For existing walls, blown-in insulation is often a better choice. However, batt insulation is ideal for renovation projects where walls are already open, new construction, and accessible areas like attics and basements."
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Batt & Poly Insulation Services",
    "description": "Professional batt and poly insulation installation for homes across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Expert vapor barrier and thermal insulation solutions.",
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
    "serviceType": "Batt & Poly Insulation",
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
    "mainEntity": battPolyFaqs.map(faq => ({
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
        "name": "Batt & Poly Insulation",
        "item": "https://www.greenfootenergy.ca/services/batt-poly-insulation"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get Batt & Poly Insulation Installed",
    "description": "Complete guide to getting professional batt and poly insulation installed in your Canadian home for maximum energy efficiency.",
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
        <title>Batt & Poly Insulation Services | Professional Installation | Greenfoot Energy</title>
        <meta name="description" content="Expert batt and poly insulation for Canadian homes. Professional vapor barrier and fiberglass insulation installation across NS, NB, PEI, NFLD & BC. Free assessment available." />
        <meta name="keywords" content="batt insulation, poly insulation, vapor barrier, fiberglass insulation, attic insulation, wall insulation, home insulation Canada, energy efficient insulation, thermal barrier" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/batt-poly-insulation" />
        
        <meta property="og:title" content="Batt & Poly Insulation Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional batt and poly insulation for maximum energy efficiency. Expert vapor barrier installation. Free assessment available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/batt-poly-insulation" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Batt & Poly Insulation Services | Greenfoot Energy" />
        <meta name="twitter:description" content="Expert batt and poly insulation for Canadian homes. Superior thermal control & energy savings." />
        
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
            alt="Batt and poly insulation service background" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/80 via-white/75 to-white/60 md:via-white/70 md:to-white/30"></div>
        
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
                  src={battPolyProduct} 
                  alt="Batt & Poly Insulation" 
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
                    <span className="text-2xl font-black text-[#333333]">{t.hero.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">{t.insulation.common.googleReviews}</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  {t.insulation.battPoly.heroTitle1}<br />
                  <span className="text-[#8dc63f]">{t.insulation.battPoly.heroTitle2}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {t.insulation.battPoly.heroSubtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a 
                    href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {t.common.phone}
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

                <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors" data-testid="link-financing-cta">
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
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">{t.insulation.common.insulationExperts}</span>
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
                  src={battPolyProduct} 
                  alt="Batt & Poly Insulation" 
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
              {t.insulation.battPoly.benefitsTitle} <span className="text-[#8dc63f]">{t.insulation.battPoly.benefitsTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600">
              {t.insulation.benefits.sectionDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {battPolyBenefits.map((benefit, index) => (
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
              {t.insulation.battPoly.whyChooseTitle}<br />
              <span className="text-[#8dc63f]">{t.insulation.battPoly.whyChooseTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              {t.insulation.whyChoose.specialistsDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseBattPoly.map((card, i) => (
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
              What Should You Expect During a <span className="text-[#8dc63f]">Batt & Poly Estimate & Installation?</span>
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
        category="batt-poly-insulation"
        limit={8}
        title="Common Questions About Batt & Poly Insulation"
      />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            {t.insulation.cta.readyToStart}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {t.insulation.cta.contactToday}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              {t.insulation.cta.getFreeAssessment}
            </Button>
            <a 
              href="tel:18003809384"
              className="bg-white hover:bg-slate-100 text-[#333333] font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t.common.phone}
            </a>
          </div>
        </div>
      </section>


      <OtherServicesGrid exclude="battPoly" />


      <SiteFooter />
    </div>
  );
}
