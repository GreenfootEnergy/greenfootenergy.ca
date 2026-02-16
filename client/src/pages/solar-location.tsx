import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Check, Sun, Battery, Settings, Home, Building, MapPin, Calendar, DollarSign, Zap, Leaf, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { RelatedContent } from "@/components/ui/related-content";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useRoute } from "wouter";
import { locations as staticLocations } from "@/data/locations";
import { Helmet } from "react-helmet";

import solarHeroBg from "@assets/solar-crew-installing-panels.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import heroProductImage from "@assets/solar_crew_in_sun_1769033971601.avif";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import solarProfessionalsImage from "@assets/solar-professionals-team.webp";
import satisfactionImage from "@assets/satisfaction.webp";
import solarCrewVanImage from "@assets/solar-crew-van.webp";
import solarCrewWorkingImage from "@assets/solar-crew-working.webp";
import solarIcon from "@assets/68874c9990cff00613a869bb_solar_1769183473100.avif";

const provinceAbbreviations: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PEI",
  "British Columbia": "BC",
};

interface ProvinceSolarData {
  description: string;
  sunlightHours: string;
  peakSeason: string;
  challenges: string[];
  benefits: string[];
  heroTagline: string;
  heroDescription: string;
  averageSavings: string;
  permittingTimeline: string;
  activationTimeline: string;
  totalTimeline: string;
}

const provinceSolarData: Record<string, ProvinceSolarData> = {
  "Nova Scotia": {
    description: "Nova Scotia receives an average of 1,850 hours of sunshine annually, with peak solar production from May through September. The maritime climate provides excellent conditions for solar efficiency.",
    sunlightHours: "1,850 hours/year",
    peakSeason: "May - September",
    challenges: [
      "Maritime fog can reduce production on coastal areas",
      "Winter snow requires occasional panel clearing",
      "Salt air in coastal communities needs corrosion-resistant equipment"
    ],
    benefits: [
      "Nova Scotia Power net metering credits excess production",
      "Provincial solar rebates available for eligible installations",
      "Moderate temperatures improve panel efficiency year-round",
      "Reduced reliance on grid electricity during peak demand"
    ],
    heroTagline: "Harness Atlantic Sunshine for Your Home",
    heroDescription: "Nova Scotia's sunny summers and moderate climate make it ideal for solar. Start saving up to 95% on your electricity bills with professional solar installation.",
    averageSavings: "Up to 95%",
    permittingTimeline: "3-6 Weeks",
    activationTimeline: "2-4 Weeks",
    totalTimeline: "8-12 Weeks"
  },
  "New Brunswick": {
    description: "New Brunswick enjoys approximately 1,900 hours of sunshine annually with excellent solar potential, especially during the long summer days from May through August.",
    sunlightHours: "1,900 hours/year",
    peakSeason: "May - August",
    challenges: [
      "Heavy snowfall may require winter panel maintenance",
      "Shorter winter days reduce seasonal production",
      "Some rural areas have older grid infrastructure"
    ],
    benefits: [
      "NB Power offers net metering for residential customers",
      "Long summer days maximize solar harvest",
      "Provincial incentives available for energy efficiency upgrades",
      "Excellent roof angles for optimal panel placement"
    ],
    heroTagline: "Power Your Home with New Brunswick Sunshine",
    heroDescription: "New Brunswick's abundant summer sun provides excellent solar potential. Save up to 95% on your energy bills with our expert installers.",
    averageSavings: "Up to 95%",
    permittingTimeline: "4-7 Weeks",
    activationTimeline: "1-3 Weeks",
    totalTimeline: "6-10 Weeks"
  },
  "Prince Edward Island": {
    description: "PEI receives approximately 1,800 hours of sunshine annually with the island's open landscapes providing unobstructed access to sunlight throughout the day.",
    sunlightHours: "1,800 hours/year",
    peakSeason: "May - September",
    challenges: [
      "Ocean winds require secure mounting systems",
      "Salt air exposure needs marine-grade equipment",
      "Island grid capacity considerations for larger systems"
    ],
    benefits: [
      "Maritime Electric net metering program available",
      "Open island landscapes minimize shading issues",
      "Strong community support for renewable energy",
      "Provincial rebates for solar installations"
    ],
    heroTagline: "Island-Powered Clean Energy",
    heroDescription: "PEI's open skies and community commitment to sustainability make solar an excellent choice. Save up to 95% on your energy bills with solar.",
    averageSavings: "Up to 95%",
    permittingTimeline: "5-9 Weeks",
    activationTimeline: "2-3 Weeks",
    totalTimeline: "8-12 Weeks"
  },
  "British Columbia": {
    description: "British Columbia's diverse geography offers varied solar potential. The Okanagan and interior regions receive over 2,000 hours of sunshine annually, while coastal areas average 1,900 hours.",
    sunlightHours: "1,900-2,100 hours/year",
    peakSeason: "April - September",
    challenges: [
      "Coastal: Rain and cloud cover during winter months",
      "Interior: Snow management on panels",
      "Wildfire smoke can temporarily reduce production"
    ],
    benefits: [
      "BC Hydro net metering with annual credit system",
      "Excellent solar irradiance especially in interior regions",
      "Provincial CleanBC incentives available",
      "High electricity rates make solar ROI attractive"
    ],
    heroTagline: "BC's Clean Energy Future Starts Here",
    heroDescription: "From Vancouver to Kelowna, British Columbia homeowners are embracing solar energy. Save up to 95% on your energy bills with solar.",
    averageSavings: "Up to 95%",
    permittingTimeline: "4-6 Weeks",
    activationTimeline: "2-3 Weeks",
    totalTimeline: "6-10 Weeks"
  }
};

interface CitySolarData {
  timeline: string;
  designTimeline: string;
  permitTimeline: string;
  installTimeline: string;
  activationTimeline: string;
  localNote: string;
  utility: string;
}

const citySolarData: Record<string, CitySolarData> = {
  // British Columbia (BC Hydro)
  "abbotsford": {
    timeline: "4-8 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "1-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Abbotsford permitting is generally straightforward, and BC Hydro's net-metering process is among the fastest in Canada.",
    utility: "BC Hydro"
  },
  "langley": {
    timeline: "4-8 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "1-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Langley benefits from efficient municipal permitting and BC Hydro's streamlined net-metering review.",
    utility: "BC Hydro"
  },
  "surrey": {
    timeline: "5-8 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "As one of BC's busiest municipalities, inspection scheduling can take slightly longer during peak season.",
    utility: "BC Hydro"
  },
  "kelowna": {
    timeline: "4-7 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "1-2 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-2 Weeks",
    localNote: "Kelowna often sees faster approvals due to lower congestion and efficient permitting processes.",
    utility: "BC Hydro"
  },
  "kamloops": {
    timeline: "4-7 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "1-2 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-2 Weeks",
    localNote: "Lower application volume compared to coastal cities often results in smoother scheduling.",
    utility: "BC Hydro"
  },
  "victoria": {
    timeline: "5-8 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Heritage considerations and higher inspection demand can extend timelines in some neighbourhoods.",
    utility: "BC Hydro"
  },
  // New Brunswick (NB Power)
  "moncton": {
    timeline: "6-10 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Spring demand can slow meter scheduling; winter bookings often move faster.",
    utility: "NB Power"
  },
  "fredericton": {
    timeline: "6-9 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-2 Weeks",
    localNote: "Permitting is typically efficient, helping keep timelines on the shorter end.",
    utility: "NB Power"
  },
  "saint-john": {
    timeline: "7-10 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Coastal weather and inspection availability can affect final activation timing.",
    utility: "NB Power"
  },
  "tracadie-sheila": {
    timeline: "7-10 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    localNote: "Rural scheduling and utility coordination may add modest delays.",
    utility: "NB Power"
  },
  // Nova Scotia (Nova Scotia Power)
  "dartmouth": {
    timeline: "8-12 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-4 Weeks",
    localNote: "Meter installation typically occurs within 2-4 weeks after final inspection.",
    utility: "Nova Scotia Power"
  },
  "bridgewater": {
    timeline: "8-11 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-3 Weeks",
    localNote: "Lower population density can sometimes mean easier inspection scheduling.",
    utility: "Nova Scotia Power"
  },
  "kentville": {
    timeline: "8-12 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-4 Weeks",
    localNote: "Agricultural and residential permitting processes are typically straightforward.",
    utility: "Nova Scotia Power"
  },
  "new-glasgow": {
    timeline: "9-12 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "3-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-4 Weeks",
    localNote: "Utility inspection scheduling is the most common timing factor.",
    utility: "Nova Scotia Power"
  },
  "sydney": {
    timeline: "9-12 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "3-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-4 Weeks",
    localNote: "Seasonal demand and regional inspection availability can influence timelines.",
    utility: "Nova Scotia Power"
  },
  // Prince Edward Island (Maritime Electric)
  "charlottetown": {
    timeline: "8-12 Weeks",
    designTimeline: "1-2 Weeks",
    permitTimeline: "3-4 Weeks",
    installTimeline: "~1 Day",
    activationTimeline: "2-4 Weeks",
    localNote: "Utility approval is required before installation begins, and meter availability can affect timing.",
    utility: "Maritime Electric"
  }
};

const getCitySolarData = (city: string): CitySolarData | null => {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  return citySolarData[citySlug] || null;
};

const getSolarData = (province: string): ProvinceSolarData => {
  return provinceSolarData[province] || provinceSolarData["Nova Scotia"];
};

const getLocalBenefits = (city: string, province: string): string[] => {
  const abbr = provinceAbbreviations[province] || province;
  return [
    `Local ${city} solar installers available for prompt service`,
    `Deep knowledge of ${province} building codes and electrical requirements`,
    `Expertise in ${city}-area roof types and optimal panel placement`,
    `Experience navigating ${abbr} utility net metering applications`,
  ];
};

const solarBenefits = [
  "Reduced Electricity Bills: SAVE up to 95% off your power bill!*",
  "Environmental Sustainability: Reduce your carbon footprint",
  "Increased Home Value: Solar adds significant property value",
  "Energy Independence: Reduce reliance on the grid",
  "Government Incentives: Available rebates and tax credits"
];

const solarServices = [
  "Solar panel installation on rooftops and ground mounts",
  "System design and planning for optimal performance",
  "Battery storage for backup power",
  "Net metering assistance to maximize energy credits",
  "Regular monitoring and maintenance"
];

const maintenanceServices = [
  "Solar panel cleaning and inspection",
  "Inverter performance testing",
  "Electrical connection verification",
  "Production monitoring analysis",
  "System optimization recommendations"
];

export default function SolarLocationPage() {
  const [, params] = useRoute("/solar-experts/:slug");
  const locationSlug = params?.slug || "";
  
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
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
    // Match on full slug (city-province), database slug, or just city slug
    return locationSlug === fullSlug || locationSlug === loc.slug || locationSlug === citySlug;
  });

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

  const { city, province, phone } = location;
  const abbr = provinceAbbreviations[province] || province;
  const solarData = getSolarData(province);
  const cityData = getCitySolarData(city);
  const localBenefits = getLocalBenefits(city, province);
  
  // Use city-specific timelines when available, otherwise fall back to province data
  const effectiveTimelines = {
    totalTimeline: cityData?.timeline || solarData.totalTimeline,
    permittingTimeline: cityData?.permitTimeline || solarData.permittingTimeline,
    activationTimeline: cityData?.activationTimeline || solarData.activationTimeline,
    designTimeline: cityData?.designTimeline || "1-2 Weeks",
    installTimeline: cityData?.installTimeline || "1-2 Days",
    utility: cityData?.utility || (province === "British Columbia" ? "BC Hydro" : province === "New Brunswick" ? "NB Power" : province === "Prince Edward Island" ? "Maritime Electric" : "Nova Scotia Power"),
    localNote: cityData?.localNote || ""
  };

  const whyChooseSolar = [
    {
      image: solarProfessionalsImage,
      title: `Experienced Solar Professionals in ${city}`,
      desc: `Our ${city} team of certified solar installers has years of experience in the industry. We specialize in residential and commercial solar installations across ${province}.`
    },
    {
      image: experienceImage,
      title: "High-Quality Products",
      desc: "We utilize top-tier solar panels, inverters, and equipment from leading manufacturers. Our partnerships ensure you get reliable, efficient solar technology."
    },
    {
      image: solarCrewWorkingImage,
      title: "Seamless Installation Experience",
      desc: `We prioritize customer satisfaction and provide a stress-free installation experience for ${city} homeowners. From permits to power-up, we handle everything.`
    },
    {
      image: solarCrewVanImage,
      title: `${abbr} Rebate & Financing Assistance`,
      desc: `We help ${city} homeowners access provincial rebates and federal incentives. Flexible financing options available—conditions apply.`,
      links: [
        { text: "View Incentives", href: "/provincial-incentives" },
        { text: "See What You Qualify For", href: "/financing" }
      ]
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: `Free Solar Assessment in ${city}`,
      intro: `Our certified solar advisor visits your ${city} property to:`,
      details: [
        "Analyze roof orientation, pitch, and shading conditions",
        "Assess electrical panel capacity and upgrade requirements",
        "Review energy consumption patterns and utility bills",
        "Design optimal solar system for your specific needs",
        "Provide detailed written quote with specs and pricing",
        `Identify available ${abbr} rebates and incentive programs`
      ],
      footer: { cost: "Free, no obligation", timeline: "3-5 Business days" },
      showCta: true
    },
    {
      step: 2,
      title: "Seamless Permitting & Utility Approval",
      intro: "Our dedicated specialists handle all municipal and utility paperwork:",
      details: [
        "Complete documentation for local building and electrical authorities",
        `Submit interconnection applications to ${province} utility providers`,
        "Manage net metering agreements and technical reviews",
        "Ensure all designs comply with regional electrical codes",
        "Track all approvals to keep your project moving forward"
      ],
      footer: { timeline: effectiveTimelines.permittingTimeline }
    },
    {
      step: 3,
      title: `Custom Installation Planning for ${city}`,
      intro: "Our lead electrician finalizes your solar design:",
      details: [
        "Confirm optimal panel placement locations",
        "Discuss and select optimal battery storage solutions based on energy needs",
        "Plan electrical integration points",
        "Determine inverter and equipment locations",
        `Address unique ${city} property characteristics`,
        "Create tailored installation blueprint"
      ],
      footer: { timeline: "1-2 Business days" }
    },
    {
      step: 4,
      title: `Expert Solar Installation in ${city}`,
      intro: "Our certified technicians handle every aspect:",
      details: [
        "Mount solar panels on roof or ground structure",
        "Install inverter and electrical components",
        "Complete all electrical connections to code",
        "Perform system testing and quality checks",
        "Full cleanup and debris removal"
      ],
      footer: { residential: "1-2 days", commercial: "3-5 days" }
    },
    {
      step: 5,
      title: "Final Inspection & Activation",
      intro: "Your system goes live after final utility coordination:",
      details: [
        "Schedule final inspection with local authorities",
        "Coordinate meter swap with utility provider for net metering",
        "Activate system and verify grid connection",
        "Demonstrate monitoring and controls",
        "Start generating clean, renewable energy"
      ],
      footer: { timeline: effectiveTimelines.activationTimeline }
    }
  ];

  const pageTitle = `Solar Panel Installation ${location.city}, ${provinceAbbreviations[location.province] || location.province} | Greenfoot Energy Solutions`;
  const pageDescription = `Professional residential solar panel installation in ${location.city}, ${location.province}. ${solarData.heroDescription} Free solar assessment available.`;
  const canonicalUrl = `https://www.greenfootenergy.ca/solar-experts/${location.slug}`;

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
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold py-4 px-6 rounded-xl h-12 sm:h-14 flex items-center justify-center transition-colors"
              >
                Book a Solar Quote
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
            src={solarHeroBg} 
            alt={`Solar installation in ${city}, ${abbr}`}
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
                  alt={`Solar Installation Team in ${city}, ${abbr}`}
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
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-4 tracking-tight uppercase">
                  Solar Energy in<br />
                  <span className="text-[#8dc63f]">{city}, {abbr}</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  {solarData.heroDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a 
                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
                  </a>
                  <Button 
                    size="lg" 
                    className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    data-testid="button-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    Get Free Solar Quote
                  </Button>
                </div>

                <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors">
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
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Certified Installers</span>
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
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt={`Solar Installation Team in ${city}, ${abbr}`}
                  className="w-full max-w-md xl:max-w-lg h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.25))' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Solar Potential Section */}
      <section className="py-16 lg:py-20 bg-[#333333] text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              What is the Solar Potential in{" "}
              <span className="text-[#8dc63f]">{province}?</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {solarData.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <Sun className="w-10 h-10 text-[#8dc63f] mx-auto mb-3" />
              <p className="text-2xl font-black text-[#8dc63f]">{solarData.sunlightHours}</p>
              <p className="text-sm text-white/70">Annual Sunshine</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <Calendar className="w-10 h-10 text-[#8dc63f] mx-auto mb-3" />
              <p className="text-2xl font-black text-[#8dc63f]">{solarData.peakSeason}</p>
              <p className="text-sm text-white/70">Peak Solar Season</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <DollarSign className="w-10 h-10 text-[#8dc63f] mx-auto mb-3" />
              <p className="text-2xl font-black text-[#8dc63f]">{solarData.averageSavings}</p>
              <p className="text-sm text-white/70">Energy Bill Savings</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <Leaf className="w-10 h-10 text-[#8dc63f] mx-auto mb-3" />
              <p className="text-2xl font-black text-[#8dc63f]">25+ Years</p>
              <p className="text-sm text-white/70">Panel Lifespan</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h3 className="font-bold text-xl mb-4 text-[#8dc63f]">{province} Solar Benefits</h3>
              <ul className="space-y-3">
                {solarData.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-6"
            >
              <h3 className="font-bold text-xl mb-4 text-[#8dc63f]">Why Choose Local {city} Installers</h3>
              <ul className="space-y-3">
                {localBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Residential & Commercial Solar Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Is Solar Right for Your Home or{" "}
              <span className="text-[#8dc63f]">Business in {city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Yes! Solar energy lowers your {city} electricity bills by up to 95%. We specialize in designing and installing high-quality solar energy systems for {city} homes and businesses.
            </p>
          </motion.div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 rounded-xl p-1.5 shadow-lg inline-flex gap-2">
              <button
                onClick={() => setActiveTab('residential')}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'residential' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-residential"
              >
                <Home className="w-5 h-5" />
                Residential Solar
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'commercial' 
                    ? 'bg-[#8dc63f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:text-[#8dc63f] hover:shadow-sm'
                }`}
                data-testid="tab-commercial"
              >
                <Building className="w-5 h-5" />
                Commercial Solar
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'residential' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">Residential Solar in {city}</h3>
                    <p className="text-slate-600">Power your {city} home with clean energy</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Experience the power of clean energy with Solar. {city} homeowners can harness {province}'s {solarData.sunlightHours} of annual sunshine to reduce electricity bills and contribute to a more sustainable future.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Benefits of Going Solar:</h4>
                    <ul className="space-y-2">
                      {solarBenefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Our Services Include:</h4>
                    <ul className="space-y-2">
                      {solarServices.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">*{city} residential applications.</span> Savings vary based on system size, location, and energy consumption patterns.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#8dc63f] rounded-full flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#333333]">Commercial Solar in {city}</h3>
                    <p className="text-slate-600">Reduce operating costs for your {city} business</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Commercial solar installations help {city} businesses significantly reduce operating costs while demonstrating environmental responsibility. We design and install systems tailored to your business's unique energy needs.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Commercial Benefits:</h4>
                    <ul className="space-y-2">
                      {[
                        "Significantly reduce operating costs",
                        "Tax incentives and accelerated depreciation",
                        "Enhanced corporate sustainability profile",
                        "Protection against rising energy costs",
                        "Potential revenue from excess energy"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#333333] mb-3">Ideal For:</h4>
                    <ul className="space-y-2">
                      {[
                        "Warehouses and industrial facilities",
                        "Office buildings and retail spaces",
                        "Agricultural operations",
                        "Schools and institutions",
                        "Multi-family residential buildings"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#8dc63f] mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8dc63f]/10 rounded-xl p-4">
                  <p className="text-sm text-[#333333]">
                    <span className="font-bold">Custom solutions available.</span> Contact us for a free commercial energy assessment and ROI analysis for your {city} business.
                  </p>
                </div>
              </motion.div>
            )}
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
              What Solar Services Are Available in{" "}
              <span className="text-[#8dc63f]">{city}, {abbr}?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From installation to maintenance, we provide complete solar energy services for {city} and surrounding {province} communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Installation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Solar Panel Installation</h3>
              <ul className="space-y-3">
                {["Free in-home solar assessment", "Custom system design", "All permits and inspections", "Professional installation", "System commissioning and testing"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
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

            {/* Battery Storage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Battery className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Battery Storage Systems</h3>
              <ul className="space-y-3">
                {["Backup power during outages", "Store excess solar energy", "Use stored power during peak hours", "Reduce grid dependency", "Seamless integration with solar"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  Learn About Batteries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Maintenance & Monitoring</h3>
              <ul className="space-y-3">
                {maintenanceServices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold cta-hover"
              >
                Schedule Maintenance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] uppercase tracking-tight">
              Why Choose Greenfoot for<br />
              <span className="text-[#8dc63f]">Solar in {city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              We stand behind our work with a satisfaction guarantee. Our experienced {city} team ensures your solar installation exceeds expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {whyChooseSolar.map((card, i) => (
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
                    className={`w-full h-full object-cover ${card.image === solarCrewVanImage ? 'object-left' : ''}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  {card.links && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.links.map((link: { text: string; href: string }, idx: number) => (
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

      {/* Installation Process */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Does Solar Installation Work in{" "}
              <span className="text-[#8dc63f]">{city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From your first consultation to powering up, we handle everything for {city} homeowners. Here's what to expect:
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="mb-12 bg-slate-50 border-l-4 border-[#8dc63f] p-6 rounded-r-xl">
              <h4 className="font-bold text-[#333333] mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8dc63f]" />
                Did you know?
              </h4>
              <p className="text-slate-600 text-sm italic">
                90% of the solar project timeline is spent on paperwork, permits, and utility approvals—not on putting panels up. While the on-site installation is fast (often 1-2 days), the sequential steps of applications and utility coordination ensure a safe and compliant grid connection.
              </p>
            </div>
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} ctaText={`Get Free Quote in ${city}`} />
            ))}
          </div>

          {/* Timeline Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto md:pl-24"
          >
            <div className="bg-[#333333] text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8dc63f]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h3 className="font-bold text-xl mb-6 text-center">Total {city} Installation Timeline</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Residential Install</p>
                  <p className="text-2xl font-black">1-2 days</p>
                  <p className="text-white/60 text-sm">Most {city} homes</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Commercial Install</p>
                  <p className="text-2xl font-black">3-5 days</p>
                  <p className="text-white/60 text-sm">Larger systems</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Total Wait Phase</p>
                  <p className="text-2xl font-black">{effectiveTimelines.totalTimeline}</p>
                  <p className="text-white/60 text-sm">Permits & {effectiveTimelines.utility} PTO</p>
                </div>
              </div>
            </div>
          </motion.div>
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
              <span>Certified Solar Installers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready to Go Solar in <span className="text-[#8dc63f]">{city}?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy {city} homeowners. Get your free solar quote today and start saving on your electricity bills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-10 rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Your Free Solar Assessment
              </Button>
              <a 
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="border-2 border-white text-white hover:bg-white/10 font-bold h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Do {city} Homeowners Ask{" "}
              <span className="text-[#8dc63f]">About Solar?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {city} homeowners most often ask about installation costs ($15,000-$30,000 before rebates), energy savings (up to 95%), net metering credits, and installation timelines ({effectiveTimelines.totalTimeline} total). Here are detailed answers:
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: `How much does solar installation cost in ${city}?`,
                answer: `Solar installation in ${city} typically ranges from $15,000 to $30,000 for a standard residential system, before rebates and incentives. Visit our incentives page or contact us for current rebate information. We provide free, no-obligation quotes.`
              },
              {
                question: `How much can I save on electricity with solar in ${province}?`,
                answer: `${city} homeowners can save up to 95% on their energy bills with a properly sized solar system. With ${solarData.sunlightHours} of annual sunshine, ${province} offers excellent solar potential.`
              },
              {
                question: `Does ${province} offer net metering for solar?`,
                answer: `Yes! ${province} utilities offer net metering programs that credit you for excess solar energy you send back to the grid. This maximizes your investment and ensures you get value for all the power your panels produce.`
              },
              {
                question: `How long does solar installation take in ${city}?`,
                answer: `Most residential solar installations in ${city} are completed in ${effectiveTimelines.installTimeline}. The entire process from initial assessment to power-up typically takes ${effectiveTimelines.totalTimeline}, including the permitting process which we handle completely.${effectiveTimelines.localNote ? ` ${effectiveTimelines.localNote}` : ''}`
              },
              {
                question: `What rebates are available for solar in ${abbr}?`,
                answer: `${city} homeowners can access federal and ${province} provincial incentives. Visit our incentives page or contact us for current rebate information.`
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
            ))}
          </div>
        </div>
      </section>

      <ServiceSchemaWithFAQs
        serviceName={`Solar Energy Installation & Maintenance in ${city}, ${abbr}`}
        serviceDescription={`Professional solar energy system installation, design, and maintenance services in ${city}, ${province}. Reduce your electricity bills by up to 95% with expert solar installation.`}
        serviceType="Solar Energy Service"
        serviceUrl={`https://www.greenfootenergy.ca/solar-experts/${locationSlug}`}
        priceRange="$$$"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 950 }}
        faqCategory="Solar"
        areaServed={[city, province]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Solar Energy", url: "https://www.greenfootenergy.ca/services/solar-energy" },
          { name: `${city}, ${abbr}`, url: `https://www.greenfootenergy.ca/solar-experts/${locationSlug}` },
        ]}
      />
      <HowToSchema
        name={`How to Get Solar Panels Installed in ${city}, ${province}`}
        description={`Complete guide to getting solar panels installed on your home in ${city}, ${province}. From initial assessment through final activation and grid connection.`}
        totalTime={`P${effectiveTimelines.totalTimeline.split('-')[1]?.replace(' Weeks', 'W').replace(' weeks', 'W') || '12W'}`}
        estimatedCost={{
          currency: "CAD",
          minValue: 15000,
          maxValue: 35000,
        }}
        steps={[
          {
            name: `Schedule a Free Solar Assessment in ${city}`,
            text: `Contact Greenfoot Energy to schedule a free in-home solar assessment in ${city}. Our certified advisor will analyze your roof orientation, electrical panel, and energy usage to design an optimal system for ${province}'s climate.`,
          },
          {
            name: `Complete ${province} Permitting and Utility Approval`,
            text: `We handle all paperwork including ${province} building permits, electrical permits, and ${effectiveTimelines.utility} interconnection applications. This process typically takes ${effectiveTimelines.permittingTimeline}.`,
          },
          {
            name: "Custom Installation Planning",
            text: `Our lead electrician finalizes your solar design for your ${city} property, confirming panel placement, battery storage options, and electrical integration points.`,
          },
          {
            name: `Professional Solar Installation in ${city}`,
            text: `Our certified technicians install your solar panels, inverter, and electrical components. Most ${city} residential installations complete in 1-2 days.`,
          },
          {
            name: "Final Inspection and Grid Activation",
            text: `After passing final inspection, we coordinate with ${effectiveTimelines.utility} for meter installation and grid connection. Your system goes live and starts generating clean energy. This phase takes ${effectiveTimelines.activationTimeline}.`,
          },
        ]}
      />

      <RelatedContent currentPath="/services/solar-energy" variant="compact" heading="Explore More Solar Resources" />
      <SiteFooter />
    </div>
  );
}
