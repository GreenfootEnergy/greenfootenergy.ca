import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, ChevronDown, Star, Check, Shield, Zap, Volume2, Droplets, Home, Building, Calendar, Users, Award, DollarSign, CheckCircle2, ArrowRight, Thermometer, Wind, Banknote, TrendingUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import heroBg from "@assets/blown-in-hero.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const blownInBenefits = [
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
    desc: "Enjoy a more consistent and comfortable living environment year-round with proper attic and wall insulation."
  },
  {
    icon: Volume2,
    title: "Reduced Noise Pollution",
    desc: "Dampen noise from outside sources, creating a much quieter home environment for you and your family."
  }
];

const whyChooseBlownIn = [
  {
    image: prideImage,
    title: "Blown-In Insulation Specialists",
    desc: "Our technicians specialize in residential blown-in insulation applications. We've insulated thousands of attics, walls, and ceilings across Atlantic Canada and BC, understanding the unique thermal demands of Canadian climates."
  },
  {
    image: experienceImage,
    title: "Certified Installation Experts",
    desc: "Our team has years of dedicated experience in the blown-in insulation industry. We use professional-grade equipment and strictly adhere to industry best practices for every installation."
  },
  {
    image: satisfactionImage,
    title: "Customized Solutions",
    desc: "We tailor our blown-in insulation services to align perfectly with your specific structural needs and budget. Our energy audits help identify exactly where additional insulation is needed."
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
    title: "Free Blown-In Insulation Consultation",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive insulation evaluation at no cost:",
    details: [
      "Measure all areas requiring blown-in insulation (attics, walls, ceilings)",
      "Assess your home's current insulation performance",
      "Identify areas where additional insulation is needed for optimal results",
      "Determine the precise amount of insulation material required",
      "Provide a detailed written quote with complete specifications"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Efficient Project Coordination",
    intro: "Following your blown-in insulation assessment, our team coordinates your installation timeline:",
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
      "Professional blown-in application using specialized equipment",
      "Precise coverage ensuring uniform insulation depth",
      "Complete coverage of attics, walls, and designated areas",
      "Quality control checks throughout the process",
      "Highest safety standards maintained during installation"
    ],
    footer: { singleArea: "4-8 hours", multipleAreas: "1-2 days" }
  },
  {
    step: 4,
    title: "Final Inspection & Walkthrough",
    intro: "Once your blown-in insulation installation is complete, we conduct a thorough final review:",
    details: [
      "Confirm all areas have been properly insulated to specified R-value",
      "Verify even coverage and proper depth throughout",
      "Review the work performed with homeowner",
      "Provide maintenance tips and care instructions",
      "Answer any questions about your new insulation"
    ],
    footer: { timeline: "Same day completion" }
  }
];


export default function BlownInInsulationPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const blownInFaqs = [
    {
      question: "What is blown-in insulation?",
      answer: "Blown-in insulation is a loose-fill insulation material that is installed using specialized equipment to blow the material into attics, walls, and other cavities. Common materials include cellulose (recycled paper), fiberglass, and mineral wool. It conforms to any space, filling gaps and voids that traditional batt insulation might miss."
    },
    {
      question: "How does blown-in insulation improve energy efficiency?",
      answer: "Blown-in insulation minimizes heat loss in winter and heat gain in summer by creating a comprehensive thermal barrier in your attic, walls, and ceilings. Its ability to fill every gap and void provides superior coverage compared to traditional batts, significantly reducing the energy needed for heating and cooling your home."
    },
    {
      question: "What R-value does blown-in insulation provide?",
      answer: "Blown-in insulation R-values depend on the material and depth. Cellulose provides approximately R-3.2 to R-3.8 per inch, while fiberglass offers R-2.2 to R-2.7 per inch. For attics, we typically recommend R-50 to R-60 (about 15-19 inches of cellulose) to meet Canadian energy efficiency standards."
    },
    {
      question: "Is blown-in insulation better than batt insulation?",
      answer: "Blown-in insulation excels in existing homes where walls are already enclosed, as it can be installed through small holes. It also provides better coverage around obstacles like wiring and pipes. Batt insulation is often more economical for new construction with open wall cavities. We recommend the best solution based on your specific situation."
    },
    {
      question: "How long does blown-in insulation installation take?",
      answer: "Most residential blown-in installations are completed in a single day. A typical attic insulation upgrade takes 4-8 hours depending on size and accessibility. Whole-home projects including walls may take 1-2 days. Our team will provide a specific timeline during your consultation."
    },
    {
      question: "Does blown-in insulation help with soundproofing?",
      answer: "Yes! Blown-in insulation is excellent at reducing noise transmission. Both cellulose and fiberglass effectively absorb sound waves, making them popular choices for reducing outside noise and sound transfer between rooms and floors."
    },
    {
      question: "Can blown-in insulation be added to existing walls?",
      answer: "Absolutely! This is one of the main advantages of blown-in insulation. Our technicians can install it in enclosed walls by drilling small holes, blowing in the insulation, and then patching the holes. This makes it ideal for retrofitting older homes without major renovation."
    },
    {
      question: "How long does blown-in insulation last?",
      answer: "When properly installed, blown-in insulation can last 20-30 years or more. Cellulose may settle slightly over time (we account for this during installation), while fiberglass maintains its loft. Regular inspections every few years help ensure continued performance."
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Blown-In Insulation Services",
    "description": "Professional blown-in insulation installation for attics, walls, and ceilings across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Expert cellulose and fiberglass insulation solutions.",
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
    "serviceType": "Blown-In Insulation",
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
    "mainEntity": blownInFaqs.map(faq => ({
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
        "name": "Blown-In Insulation",
        "item": "https://www.greenfootenergy.ca/services/blown-in-insulation"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get Blown-In Insulation Installed",
    "description": "Complete guide to getting professional blown-in insulation installed in your Canadian home for maximum energy efficiency.",
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
        <title>Blown-In Insulation for Attics, Walls & Ceilings | Greenfoot Energy</title>
        <meta name="description" content="Expert blown-in insulation for Canadian homes. Professional cellulose and fiberglass attic, wall, and ceiling insulation across Nova Scotia, New Brunswick, PEI, Newfoundland & BC. R-50 to R-60 coverage. Free assessment available." />
        <meta name="keywords" content="blown-in insulation, attic insulation, cellulose insulation, fiberglass insulation, wall insulation, ceiling insulation, home insulation Canada, energy efficient insulation, loose-fill insulation, R-value insulation" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/blown-in-insulation" />
        
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="CA" />
        <meta name="geo.placename" content="Atlantic Canada, British Columbia" />
        
        <meta property="og:title" content="Blown-In Insulation Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional blown-in insulation for attics, walls & ceilings. Expert cellulose and fiberglass installation for maximum energy efficiency. Free assessment available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/blown-in-insulation" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        <meta property="og:locale" content="en_CA" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blown-In Insulation Services | Greenfoot Energy" />
        <meta name="twitter:description" content="Expert blown-in insulation for Canadian homes. Superior thermal control & energy savings." />
        
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
            alt="Blown-in insulation service background" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/90 via-white/85 to-white/70 md:via-white/80 md:to-white/40"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Rating & Stats Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
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
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-[#8dc63f]/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  >
                    <Home className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">{t.insulation.common.insulatedHomes}</span>
                  </motion.div>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  {t.insulation.blownIn.heroTitle1}<br />
                  <span className="text-[#8dc63f]">{t.insulation.blownIn.heroTitle2}</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-2 max-w-lg font-medium">
                  {t.insulation.blownIn.forAtticsWallsCeilings}
                </p>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {t.insulation.blownIn.heroSubtitle}
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

            {/* Right side - empty for hero image to show through */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              {t.insulation.blownIn.benefitsTitle} <span className="text-[#8dc63f]">{t.insulation.blownIn.benefitsTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600">
              {t.insulation.benefits.sectionDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blownInBenefits.map((benefit, index) => (
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

      {/* What Does Our Service Include Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] tracking-tight mb-6">
                What Does Our Blown-In Insulation <span className="text-[#8dc63f]">Service Include?</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">Professional Installation</h3>
                    <p className="text-slate-600 text-sm">Our experienced technicians ensure the proper application of blown-in insulation to maximize your energy efficiency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">High-Quality Materials</h3>
                    <p className="text-slate-600 text-sm">We utilize top-quality insulation materials designed to provide optimal thermal performance and longevity.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">Customized Solutions</h3>
                    <p className="text-slate-600 text-sm">We tailor our services to align perfectly with your specific structural needs and your budget.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">Energy Audits</h3>
                    <p className="text-slate-600 text-sm">We conduct audits to identify exactly where additional insulation is needed for optimal results.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] tracking-tight">
              {t.insulation.blownIn.whyChooseTitle}<br />
              <span className="text-[#8dc63f]">{t.insulation.blownIn.whyChooseTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              {t.insulation.whyChoose.specialistsDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseBlownIn.map((card, i) => (
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 tracking-tight">
              What Should You Expect During a <span className="text-[#8dc63f]">Blown-In Insulation Estimate & Installation?</span>
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

      {/* FAQ Section - Inline with Accordion */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] tracking-tight">
              Common Questions About <span className="text-[#8dc63f]">Blown-In Insulation</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              Get answers to the most common questions about blown-in insulation services for your home.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {blownInFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="font-semibold text-[#333333]">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-[#8dc63f] font-semibold hover:gap-3 transition-all"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

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


      <OtherServicesGrid exclude="blownIn" />


      <SiteFooter />
    </div>
  );
}
