import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Wrench, Settings, Home, Building, MapPin, Calendar, Users, Award, DollarSign, CheckCircle2, ArrowRight, ChevronDown, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { BrandCardsGrid } from "@/components/ui/other-brands-grid";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { RelatedContent } from "@/components/ui/related-content";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useRoute } from "wouter";
import { locations as staticLocations } from "@/data/locations";
import { faqs as staticFaqs } from "@/data/faqs";
import { Helmet } from "react-helmet";

import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import heroBg from "@assets/Gridless_home_hero_background_1767989380726.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import heroProductImage from "@assets/mini-split-heat-pumps_1769031697866.avif";

const provinceAbbreviations: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PEI",
  "Newfoundland": "NL",
  "British Columbia": "BC",
};

interface ProvinceClimateData {
  description: string;
  winterTemp: string;
  summerTemp: string;
  challenges: string[];
  benefits: string[];
  heatingMonths: string;
  heroTagline: string;
  heroDescription: string;
  layoutType: 'atlantic' | 'bc-coastal' | 'bc-interior';
}

const provinceClimateData: Record<string, ProvinceClimateData> = {
  "Nova Scotia": {
    description: "Nova Scotia experiences a humid continental climate with maritime influences. Winters bring average temperatures of -5°C to -10°C with frequent nor'easters and ice storms. Summers are pleasantly warm with high humidity.",
    winterTemp: "-5°C to -10°C",
    summerTemp: "18°C to 25°C",
    challenges: [
      "Coastal humidity accelerates equipment wear without proper protection",
      "Frequent freeze-thaw cycles stress outdoor units",
      "Salt air corrosion in coastal communities",
      "Ice storms can impact outdoor unit operation"
    ],
    benefits: [
      "Year-round comfort with both heating and cooling modes",
      "Dehumidification reduces summer mugginess indoors",
      "Cold-climate rated units perform efficiently to -30°C",
      "Zone control eliminates heating drafty older homes"
    ],
    heatingMonths: "October through April",
    heroTagline: "Stay Comfortable Through Atlantic Winters",
    heroDescription: "From Halifax harbour breezes to Cape Breton snowstorms, our cold-climate mini-splits deliver reliable warmth when you need it most.",
    layoutType: 'atlantic'
  },
  "New Brunswick": {
    description: "New Brunswick has a humid continental climate with significant temperature extremes. Winters are cold and snowy with temperatures regularly dropping to -15°C or below. Summers bring warm, humid conditions ideal for cooling.",
    winterTemp: "-10°C to -20°C",
    summerTemp: "20°C to 28°C",
    challenges: [
      "Heavy snowfall can block outdoor unit airflow",
      "Extreme cold spells require cold-climate rated equipment",
      "High humidity summers demand effective dehumidification",
      "Older homes with poor insulation lose heat rapidly"
    ],
    benefits: [
      "Efficient heating even during deep cold snaps",
      "Reduces reliance on expensive oil or electric baseboard heat",
      "Summer cooling and dehumidification in one system",
      "Quiet operation perfect for peaceful rural settings"
    ],
    heatingMonths: "Late September through May",
    heroTagline: "Conquer New Brunswick's Four-Season Climate",
    heroDescription: "Whether it's a frigid Fredericton January or a humid Moncton August, mini-split heat pumps keep your home perfectly comfortable year-round.",
    layoutType: 'atlantic'
  },
  "Prince Edward Island": {
    description: "PEI enjoys a maritime climate moderated by the Gulf of St. Lawrence. Winters are milder than mainland provinces with temperatures averaging -3°C to -8°C. The island experiences shorter, cooler summers with refreshing ocean breezes.",
    winterTemp: "-3°C to -8°C",
    summerTemp: "17°C to 23°C",
    challenges: [
      "Persistent ocean winds increase heating demands",
      "Salt air exposure requires corrosion-resistant units",
      "Humid conditions year-round affect indoor comfort",
      "Older island homes often lack central ductwork"
    ],
    benefits: [
      "Maritime-moderate climate is ideal for heat pump efficiency",
      "Ductless design perfect for heritage and cottage homes",
      "Lower operating costs compared to oil heating",
      "Compact units preserve island home aesthetics"
    ],
    heatingMonths: "October through April",
    heroTagline: "Island-Optimized Comfort Solutions",
    heroDescription: "PEI's maritime climate is perfectly suited for heat pump technology. Our systems maximize efficiency while protecting against salt air and coastal conditions.",
    layoutType: 'atlantic'
  },
  "Newfoundland": {
    description: "Newfoundland experiences a harsh subarctic maritime climate. Winters are long and severe with heavy snowfall, strong winds, and temperatures frequently below -15°C. Summers are short and cool, rarely exceeding 20°C.",
    winterTemp: "-10°C to -20°C",
    summerTemp: "12°C to 20°C",
    challenges: [
      "Extended heating season from September to June",
      "Fierce winds and blowing snow affect outdoor units",
      "Remote locations require reliable, low-maintenance systems",
      "High electricity costs make efficiency crucial"
    ],
    benefits: [
      "Reduces dependence on expensive heating oil",
      "Cold-climate units rated to -30°C for extreme conditions",
      "Minimal maintenance needs perfect for outport communities",
      "Supplemental cooling for increasingly warm summers"
    ],
    heatingMonths: "September through June",
    heroTagline: "Built for Newfoundland's Toughest Winters",
    heroDescription: "From St. John's fog to Gander's blizzards, our cold-climate mini-splits are engineered to perform when the mercury drops and the wind howls.",
    layoutType: 'atlantic'
  },
  "British Columbia": {
    description: "British Columbia features diverse microclimates. Coastal regions enjoy mild, rainy winters and warm summers, while interior areas experience cold winters with significant snowfall and hot, dry summers.",
    winterTemp: "0°C to -15°C (varies by region)",
    summerTemp: "20°C to 35°C (varies by region)",
    challenges: [
      "Coastal: High humidity and mild temperatures year-round",
      "Interior: Extreme temperature swings between seasons",
      "Wildfire smoke seasons require air filtration",
      "Varied housing types from urban condos to rural acreages"
    ],
    benefits: [
      "Exceptional efficiency in BC's moderate climate zones",
      "Air filtration improves indoor air quality during smoke events",
      "Cooling essential for increasingly hot interior summers",
      "Works with BC Hydro rates for cost-effective heating"
    ],
    heatingMonths: "November through March (coastal) / October through April (interior)",
    heroTagline: "Climate Control for BC's Diverse Weather",
    heroDescription: "Whether you're in mild Vancouver or the Okanagan's temperature extremes, our mini-splits adapt to deliver year-round comfort and efficiency.",
    layoutType: 'bc-coastal'
  }
};

const getBCLayoutType = (city: string): 'bc-coastal' | 'bc-interior' => {
  const interiorCities = ['Kamloops', 'Kelowna'];
  return interiorCities.includes(city) ? 'bc-interior' : 'bc-coastal';
};

const getProvinceClimate = (province: string): string => {
  return provinceClimateData[province]?.description || "Canadian climate with seasonal variations";
};

const getLocalBenefits = (city: string, province: string): string[] => {
  const abbr = provinceAbbreviations[province] || province;
  return [
    `Local ${city} technicians available for prompt service`,
    `Deep knowledge of ${province} building codes and permit requirements`,
    `Extensive experience with ${city}-area home construction and layouts`,
    `Expertise in navigating ${abbr} utility rebate applications`,
  ];
};

const getClimateData = (province: string, city: string): ProvinceClimateData => {
  const data = provinceClimateData[province] || provinceClimateData["Nova Scotia"];
  if (province === "British Columbia") {
    return { ...data, layoutType: getBCLayoutType(city) };
  }
  return data;
};

const installationServices = [
  "Free in-home consultation and heat load assessment",
  "Professional electrical and refrigerant line installation",
  "System testing and commissioning",
  "1-year labor warranty (plus manufacturer equipment warranty)",
  "Full training on system operation"
];

const repairServices = [
  "Refrigerant leaks and recharging",
  "Compressor and fan motor replacement",
  "Electronic control board issues",
  "Defrost system malfunctions",
  "Drainage problems"
];

const maintenanceServices = [
  "Indoor and outdoor coil cleaning",
  "Filter replacement or cleaning",
  "Refrigerant level check",
  "Electrical connection inspection",
  "Condensate drain clearing",
  "Performance testing"
];

export default function MiniSplitLocationPage() {
  const [, params] = useRoute("/heat-pump-experts/:slug");
  const locationSlug = params?.slug || "";
  
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const location = staticLocations.find(loc => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    const provinceSlug = loc.province.toLowerCase().replace(/\s+/g, '-');
    const fullSlug = `${citySlug}-${provinceSlug}`;
    return locationSlug === fullSlug || locationSlug === loc.slug || locationSlug === citySlug;
  });

  // Map location names to FAQ categories (handle mismatches between DB and CSV)
  const getFaqCategory = (city: string, province: string): string => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const provinceSlug = province.toLowerCase().replace(/\s+/g, '-');
    
    // Handle specific mappings where CSV categories differ from DB locations
    const categoryMappings: Record<string, string> = {
      'tracadie-sheila-new-brunswick': 'tracadie-new-brunswick',
      'paradise-newfoundland': 'st-johns-newfoundland-and-labrador',
      'langley-british-columbia': 'vancouver-british-columbia', // Use Vancouver FAQs
      'surrey-british-columbia': 'vancouver-british-columbia',  // Use Vancouver FAQs
    };
    
    const defaultCategory = `${citySlug}-${provinceSlug}`;
    return categoryMappings[defaultCategory] || defaultCategory;
  };

  const locationFaqCategory = location ? getFaqCategory(location.city, location.province) : "";

  const locationFaqs = locationFaqCategory
    ? staticFaqs.filter(faq => faq.isActive && faq.category?.toLowerCase() === locationFaqCategory.toLowerCase())
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestStep = -1;
      let closestDistance = Infinity;

      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          
          if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
            closestDistance = distance;
            closestStep = index;
          }
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!location) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">Location Not Found</h1>
          <p className="text-slate-600">We couldn't find the location you're looking for.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const { city, province, phone, address } = location;
  const abbr = provinceAbbreviations[province] || province;
  const climateData = getClimateData(province, city);
  const climateDescription = getProvinceClimate(province);
  const localBenefits = getLocalBenefits(city, province);
  const layoutType = climateData.layoutType;

  const whyChooseMiniSplit = [
    {
      icon: Home,
      title: `Cold-Climate Mini-Split Specialists in ${city}`,
      desc: `Our ${city} technicians specialize in cold-climate ductless systems rated to -30°C. We've installed thousands of mini-splits across ${province}, understanding the unique heating demands of ${abbr} winters.`
    },
    {
      icon: Award,
      title: "Certified Multi-Brand Installers",
      desc: "Factory-certified for Gridless, Mitsubishi Electric, Daikin, Kerr, and LG mini-split systems. Our manufacturer certifications ensure your warranty stays valid and your system performs optimally."
    },
    {
      icon: Settings,
      title: "Single & Multi-Zone Expertise",
      desc: `Whether you need one room heated or whole-home comfort with multi-zone systems, we design custom solutions for ${city} homes. Our heat load calculations ensure proper BTU sizing for maximum efficiency.`
    },
    {
      icon: DollarSign,
      title: `${abbr} Rebate & Financing Assistance`,
      desc: `We help ${city} homeowners access federal and ${province} provincial rebates. Flexible financing options available—conditions apply.`,
      links: [
        { text: "View Incentives", href: "/provincial-incentives" },
        { text: "See What You Qualify For", href: "/financing" }
      ]
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: `Free In-Home Heat Pump Consultation in ${city}`,
      intro: `A certified advisor visits your ${city} home to:`,
      details: [
        "Assess heating/cooling requirements (room-by-room load calculation)",
        "Evaluate electrical capacity (dedicated 240V circuit check)",
        "Identify optimal indoor and outdoor unit locations",
        "Discuss equipment options and brand preferences",
        "Provide detailed written quote with specs and pricing",
        `Explain available ${abbr} rebates and financing options`
      ],
      footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
      showCta: true
    },
    {
      step: 2,
      title: "Quote Review & Equipment Ordering",
      intro: "Once you approve the quote:",
      details: [
        "Equipment ordered from supplier (typically in stock)",
        "Installation date scheduled based on your availability",
        `${province} electrical permit obtained if required`,
        "Pre-installation checklist provided"
      ],
      footer: { timeline: "Arrival within 3-7 business days" }
    },
    {
      step: 3,
      title: `Professional Heat Pump Installation in ${city}`,
      intro: `Certified ${city} technicians handle everything from mounting to commissioning:`,
      details: [
        "Mount indoor and outdoor units",
        "Refrigerant line penetration and electrical connection",
        "Condensate drain line installation",
        "Vacuum test and refrigerant charging",
        "Full system startup and testing",
        "Complete cleanup and debris removal"
      ],
      footer: { singleZone: "4-8 hours", multiZone: "2-3 days" }
    },
    {
      step: 4,
      title: "System Training & Demonstration",
      intro: "Your technician provides hands-on training:",
      details: [
        "Remote control operation (heat, cool, auto, dry)",
        "Temperature settings and energy-saving features",
        "Filter cleaning demonstration",
        "Maintenance schedule review"
      ],
      footer: { cost: "Free, no obligation", timeline: "3-5 Business days" }
    },
    {
      step: 5,
      title: "Enjoy Lasting Comfort",
      intro: `Your ${city} home stays warm in winter, cool in summer, with lower energy costs and ongoing support from our local team.`,
      details: []
    }
  ];

  const pageTitle = `Mini-Split Heat Pump Installation ${location.city}, ${provinceAbbreviations[location.province] || location.province} | Greenfoot Energy Solutions`;
  const pageDescription = `Professional mini-split heat pump installation, repair, and maintenance in ${location.city}, ${location.province}. ${climateData.heroDescription} Free estimates available.`;
  const canonicalUrl = `https://www.greenfootenergy.ca/heat-pump-experts/${location.slug}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <SiteHeader />

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
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold py-4 px-6 rounded-xl h-12 sm:h-14 flex items-center justify-center transition-colors"
              >
                Book a Quote or Install
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold py-4 px-6 rounded-xl h-12 sm:h-14 flex items-center justify-center transition-colors"
              >
                Book a Service Call
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold py-4 px-6 rounded-xl h-12 sm:h-14 flex items-center justify-center transition-colors"
              >
                View Financing Options
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[700px] md:min-h-[750px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img 
            src={heroBg} 
            alt={`Mini-split heat pump installation in ${city}, ${abbr}`}
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
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
                  src={heroProductImage} 
                  alt={`Mini-Split Heat Pump System for ${city}, ${abbr} homes`}
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}
                />
              </div>
            </motion.div>

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
                
                <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] rounded-full px-4 py-2 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">Serving {city}, {abbr}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  Mini-Split Heat Pumps<br />
                  <span className="text-[#8dc63f]">in {city}, {abbr}</span>
                </h1>
                
                <p className="text-lg font-semibold text-[#333333] mb-2">
                  {climateData.heroTagline}
                </p>
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {climateData.heroDescription} Professional installation, repair & maintenance with systems rated to -30°C.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <a 
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
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

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md">
                  <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                  <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                </a>

                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                  >
                    <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">75,000+ Installs</span>
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
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt={`Mini-Split Heat Pump System for ${city}, ${abbr} homes`}
                  className="w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Local Benefits Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] text-center mb-8">
              Why Choose Greenfoot for Mini-Split Installation in <span className="text-[#8dc63f]">{city}</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {localBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#8dc63f] flex-shrink-0" />
                  <span className="text-[#333333] font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Climate Benefits Section - Province-Specific (Dark Theme) */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Mini-Splits for {province}'s{" "}
              <span className="text-[#8dc63f]">Unique Climate</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {climateData.description}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center border border-[#4a4a4a]">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{abbr} Climate Challenges</h3>
              </div>
              <ul className="space-y-4">
                {climateData.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#3a3a3a]">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Winter Temps:</span>
                    <span className="ml-2 font-semibold text-[#8dc63f]">{climateData.winterTemp}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Heating Season:</span>
                    <span className="ml-2 font-semibold text-white">{climateData.heatingMonths}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#8dc63f]/15 rounded-2xl p-8 border border-[#8dc63f]/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">How Mini-Splits Help</h3>
              </div>
              <ul className="space-y-4">
                {climateData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#8dc63f]/30">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-gray-300">Summer Temps:</span>
                    <span className="ml-2 font-semibold text-[#8dc63f]">{climateData.summerTemp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              Complete Heat Pump Services in{" "}
              <span className="text-[#8dc63f]">{city}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From expert installation to emergency repairs and preventive maintenance, Greenfoot Energy keeps {city} homes comfortable through every season.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
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
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-7 h-7 text-white" />
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
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold border border-white/40"
              >
                Book Service Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
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
                className="w-full mt-6 bg-[#4a4a4a] hover:bg-[#555555] text-white rounded-xl font-bold border border-white/40"
              >
                Schedule Maintenance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why {city} Homeowners Choose{" "}
              <span className="text-[#8dc63f]">Greenfoot Energy</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyChooseMiniSplit.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#333333] mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                  {item.links && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.links.map((link: { text: string; href: string }, idx: number) => (
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Installation Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Our {city} Installation Process
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From consultation to comfort—here's how we install your mini-split heat pump in {city}.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} ctaText={`Get Free Quote in ${city}`} />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* Trust Signals */}
      <section className="py-12 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#8dc63f] text-[#8dc63f]" />
                ))}
              </div>
              <span className="font-bold">5,000+ Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8dc63f]" />
              <span>Serving {city}, {abbr}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>75,000+ Installations</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Ready for Year-Round Comfort in <span className="text-[#8dc63f]">{city}?</span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of happy {city} homeowners. Get your free mini-split heat pump quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Book Free Consultation
            </Button>
            <a 
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Location-Specific FAQs - Single Consolidated Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {city} Heat Pump{" "}
              <span className="text-[#8dc63f]">Questions & Answers</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Expert answers to common heat pump questions from {city} homeowners
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {locationFaqs && locationFaqs.length > 0 ? (
              locationFaqs.slice(0, 8).map((faq, index) => (
                <motion.details
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-slate-50 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-100 transition-colors">
                    <span className="font-semibold text-[#333333] pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#8dc63f] flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.answer}
                  </div>
                </motion.details>
              ))
            ) : (
              [
                {
                  question: `How much does a mini-split heat pump cost in ${city}?`,
                  answer: `Mini-split heat pump installation in ${city} typically ranges from $3,500 to $8,000 for a single-zone system, and $8,000 to $18,000+ for multi-zone whole-home systems. Visit our incentives page or contact us for current rebate information.`
                },
                {
                  question: `Do mini-splits work in ${province}'s cold winters?`,
                  answer: `Absolutely! Modern cold-climate mini-splits are rated to operate efficiently down to -30°C. In ${province}, where winter temperatures average ${climateData.winterTemp}, these systems provide reliable heat throughout the heating season.`
                },
                {
                  question: `How long does mini-split installation take in ${city}?`,
                  answer: `Most single-zone mini-split installations in ${city} are completed in 4-8 hours. Multi-zone systems typically take 2-3 days.`
                },
                {
                  question: `What rebates are available for heat pumps in ${abbr}?`,
                  answer: `${city} homeowners can access federal and ${province} provincial rebates. Visit our incentives page or contact us for current rebate information.`
                }
              ].map((item, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-slate-50 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-100 transition-colors">
                    <span className="font-semibold text-[#333333] pr-4">{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#8dc63f] flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    {item.answer}
                  </div>
                </motion.details>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Brands We Install */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Premium Heat Pump Brands in {city}
            </h2>
            <p className="text-slate-600">Factory-certified installers for leading cold-climate brands</p>
          </div>
          <BrandCardsGrid columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-6" />
          <div className="text-center mt-6 flex flex-wrap justify-center gap-4">
            <a href="/services/mini-split-heat-pumps" className="text-[#8dc63f] hover:text-[#709c32] font-bold text-sm">
              Mini-Split Service Info →
            </a>
            <a href="/financing" target="_blank" rel="noopener noreferrer" className="text-[#8dc63f] hover:text-[#709c32] font-bold text-sm">
              Financing Options →
            </a>
            <a href="/provincial-incentives" className="text-[#8dc63f] hover:text-[#709c32] font-bold text-sm">
              Government Rebates →
            </a>
          </div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName={`Mini-Split Heat Pump Installation, Repair & Maintenance in ${city}, ${abbr}`}
        serviceDescription={`Professional mini-split ductless heat pump services in ${city}, ${province}. Installation, repair, and maintenance for cold-climate rated systems. Serving ${city} and surrounding areas with expert HVAC solutions.`}
        serviceType="HVAC Service"
        serviceUrl={`https://www.greenfootenergy.ca/heat-pump-experts/${locationSlug}`}
        priceRange="$$"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 2500 }}
        faqCategory="Mini-Split"
        areaServed={[city, province]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Mini-Split Heat Pumps", url: "https://www.greenfootenergy.ca/services/mini-split-heat-pumps" },
          { name: `${city}, ${abbr}`, url: `https://www.greenfootenergy.ca/heat-pump-experts/${locationSlug}` },
        ]}
      />

      <RelatedContent currentPath="/services/mini-split-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
