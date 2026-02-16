import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Sun, Zap, DollarSign, Leaf, Shield, Building, Calendar, ArrowRight, Users, TrendingDown, Award, Calculator, MapPin, Factory, Store, Heart, Hotel, Warehouse, Tractor, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { RelatedContent } from "@/components/ui/related-content";
import { useState } from "react";
import { useRoute } from "wouter";
import { locations as staticLocations } from "@/data/locations";
import { Helmet } from "react-helmet";

import solarHeroBg from "@assets/solar-crew-installing-panels.webp";
import guaranteeIcon from "@assets/guarantee-icon_1769200985774.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import solarProfessionalsImage from "@assets/solar-professionals-team.webp";
import solarCrewVanImage from "@assets/solar-crew-van.webp";

import rooftopSolarImg from "@/assets/images/commercial-rooftop-solar.png";
import groundMountSolarImg from "@/assets/images/commercial-ground-mount-solar.png";
import carportSolarImg from "@/assets/images/commercial-carport-solar.png";
import agricultureSolarImg from "@/assets/images/industry-agriculture-solar.png";
import retailSolarImg from "@/assets/images/industry-retail-solar.png";
import industrialSolarImg from "@/assets/images/industry-industrial-solar.png";
import healthcareSolarImg from "@/assets/images/industry-healthcare-solar.png";
import hospitalitySolarImg from "@/assets/images/industry-hospitality-solar.png";
import warehousingSolarImg from "@/assets/images/industry-warehousing-solar.png";
import operationalReliabilityImg from "@/assets/images/operational-reliability-solar.png";

const provinceAbbreviations: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PEI",
  "British Columbia": "BC",
};

interface ProvinceCommercialData {
  utility: string;
  totalTimeline: string;
  engineeringTimeline: string;
  permittingTimeline: string;
  installTimeline: string;
  activationTimeline: string;
  avgRate: number;
  sunHours: number;
  systemMultiplier: number;
  heroTagline: string;
  heroDescription: string;
  didYouKnow: string;
  incentives: Array<{ name: string; value: string; description: string }>;
}

const provinceCommercialData: Record<string, ProvinceCommercialData> = {
  "British Columbia": {
    utility: "BC Hydro",
    totalTimeline: "4-7 Weeks",
    engineeringTimeline: "3-7 Days",
    permittingTimeline: "1-3 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "5-10 Business Days",
    avgRate: 0.12,
    sunHours: 1950,
    systemMultiplier: 1.05,
    heroTagline: "Power Your BC Business with Solar",
    heroDescription: "BC Hydro is one of the fastest utilities in Canada for solar approvals. From Vancouver to Kelowna, businesses are cutting energy costs with commercial solar.",
    didYouKnow: "BC Hydro is one of the fastest utilities in Canada for solar approvals. Most commercial projects go from application to power-on in just 4-7 weeks.",
    incentives: [
      { name: "Clean Energy Investment Tax Credit", value: "Up to 30%", description: "Federal tax credit on eligible commercial solar equipment costs" },
      { name: "BC Hydro Net Metering", value: "Annual credits", description: "Receive credits at retail rate for excess generation sent to the grid" },
      { name: "CleanBC Commercial Building Incentives", value: "Up to $400,000", description: "Major retrofit incentives for commercial buildings" },
      { name: "PST Exemption on Solar Equipment", value: "7% savings", description: "Solar equipment is exempt from provincial sales tax" }
    ]
  },
  "New Brunswick": {
    utility: "NB Power",
    totalTimeline: "6-10 Weeks",
    engineeringTimeline: "1-2 Weeks",
    permittingTimeline: "2-4 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "1-3 Weeks",
    avgRate: 0.14,
    sunHours: 1900,
    systemMultiplier: 0.95,
    heroTagline: "Commercial Solar for New Brunswick Businesses",
    heroDescription: "NB Power's thorough approval process ensures safe, compliant installations. Most commercial projects complete in 6-10 weeks from application to activation.",
    didYouKnow: "NB Power targets 10 business days for each approval step. Winter bookings often receive faster approvals as spring installs can wait longer for meter swaps.",
    incentives: [
      { name: "Clean Energy Investment Tax Credit", value: "Up to 30%", description: "Federal tax credit on eligible commercial solar equipment costs" },
      { name: "NB Power Net Metering", value: "Bill credits", description: "Systems up to 100kW can receive credits for excess generation" },
      { name: "Large Industrial Renewable Energy Purchase Program", value: "PPA available", description: "Long-term purchase agreements for large commercial installations" }
    ]
  },
  "Nova Scotia": {
    utility: "Nova Scotia Power",
    totalTimeline: "8-12 Weeks",
    engineeringTimeline: "1-2 Weeks",
    permittingTimeline: "3-6 Weeks",
    installTimeline: "1-2 Days",
    activationTimeline: "2-4 Weeks",
    avgRate: 0.17,
    sunHours: 1850,
    systemMultiplier: 1.0,
    heroTagline: "Commercial Solar Solutions for Nova Scotia",
    heroDescription: "Nova Scotia Power has some of the longest approval timelines in Canada. Early booking is critical to avoid seasonal backlogs and maximize summer production.",
    didYouKnow: "Nova Scotia Power has some of the longest approval timelines in Canada. High solar demand means early booking is critical—systems often sit installed but not energized briefly while waiting for final utility approval.",
    incentives: [
      { name: "Clean Energy Investment Tax Credit", value: "Up to 30%", description: "Federal tax credit on eligible commercial solar equipment costs" },
      { name: "Net Metering Program", value: "Bill credits", description: "Receive credits for excess electricity sent to the grid" },
      { name: "Commercial Property Tax Exemption", value: "Varies", description: "Solar equipment may be exempt from property tax increases" }
    ]
  },
  "Prince Edward Island": {
    utility: "Maritime Electric",
    totalTimeline: "8-12 Weeks",
    engineeringTimeline: "2-4 Weeks",
    permittingTimeline: "3-5 Weeks",
    installTimeline: "1 Day",
    activationTimeline: "2-3 Weeks",
    avgRate: 0.16,
    sunHours: 1800,
    systemMultiplier: 0.98,
    heroTagline: "Island-Powered Commercial Solar",
    heroDescription: "Maritime Electric's smaller team means seasonal backlogs are common. Plan ahead to ensure your business captures peak summer production.",
    didYouKnow: "Maritime Electric is a small utility with fewer inspectors, which can cause seasonal backlogs. Rebates can cap quickly, so timing your application strategically matters.",
    incentives: [
      { name: "Clean Energy Investment Tax Credit", value: "Up to 30%", description: "Federal tax credit on eligible commercial solar equipment costs" },
      { name: "Net Metering Program", value: "Bill credits", description: "Receive credits for excess electricity production" },
      { name: "efficiencyPEI Business Programs", value: "Varies", description: "Energy efficiency incentives for commercial properties" }
    ]
  },
};

const getProvinceData = (province: string): ProvinceCommercialData => {
  const data = provinceCommercialData[province];
  if (!data) {
    throw new Error(`Unsupported province for commercial solar: ${province}`);
  }
  return data;
};

const commercialBenefits = [
  {
    icon: TrendingDown,
    title: "Reduced Operating Costs",
    desc: "Cut electricity bills by up to 70% and protect against rising utility rates with predictable energy costs."
  },
  {
    icon: Leaf,
    title: "Sustainability Leadership",
    desc: "Demonstrate environmental responsibility and meet corporate sustainability goals while attracting eco-conscious customers."
  },
  {
    icon: DollarSign,
    title: "Strong ROI",
    desc: "Commercial solar systems typically pay for themselves in 5-7 years with decades of free energy after that."
  },
  {
    icon: Shield,
    title: "Energy Independence",
    desc: "Reduce reliance on the grid and protect your business from power outages with optional battery backup."
  }
];

const solarSystemTypes = [
  {
    id: 'rooftop',
    title: 'Rooftop Solar',
    image: rooftopSolarImg,
    description: 'Maximize your building\'s unused roof space with a commercial rooftop solar installation. Ideal for warehouses, offices, and retail buildings.',
    benefits: [
      'Utilizes otherwise unused roof space',
      'No additional land required',
      'Reduces cooling costs by shading the roof',
      'Quick installation with minimal disruption',
      'Best for flat or low-slope commercial roofs'
    ],
    bestFor: 'Warehouses, offices, retail stores, and manufacturing facilities'
  },
  {
    id: 'ground',
    title: 'Ground Mount Solar',
    image: groundMountSolarImg,
    description: 'Ground-mounted solar arrays are perfect for businesses with available land. Adjustable positioning allows for optimal sun exposure year-round.',
    benefits: [
      'Optimal panel positioning for maximum output',
      'Easy maintenance and cleaning access',
      'Scalable for large energy demands',
      'No roof structural requirements',
      'Can be installed on unusable land'
    ],
    bestFor: 'Farms, industrial sites, and businesses with open land'
  },
  {
    id: 'carport',
    title: 'Carport Solar',
    image: carportSolarImg,
    description: 'Solar carports provide dual value - generating clean energy while offering shaded parking for employees and customers.',
    benefits: [
      'Dual-purpose: energy + parking shade',
      'EV charging integration ready',
      'Enhances property aesthetics',
      'No roof modification required',
      'Visible sustainability statement'
    ],
    bestFor: 'Retail centers, hospitals, hotels, and corporate campuses'
  }
];

const industries = [
  {
    id: 'agriculture',
    title: 'Agriculture',
    image: agricultureSolarImg,
    icon: Tractor,
    description: 'Power your farm operations with solar energy. Reduce operating costs for irrigation, climate control, and equipment while diversifying income streams.',
    savings: 'Farmers save 40-60% on energy costs'
  },
  {
    id: 'retail',
    title: 'Retail',
    image: retailSolarImg,
    icon: Store,
    description: 'Attract eco-conscious customers while cutting overhead costs. Solar-powered retail spaces demonstrate environmental leadership.',
    savings: 'Retail stores save $15,000-50,000/year'
  },
  {
    id: 'industrial',
    title: 'Industrial & Manufacturing',
    image: industrialSolarImg,
    icon: Factory,
    description: 'Offset high energy consumption in manufacturing facilities. Large roof areas and consistent energy demand make industrial solar highly profitable.',
    savings: 'Manufacturers see 5-7 year ROI'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    image: healthcareSolarImg,
    icon: Heart,
    description: 'Ensure reliable, sustainable power for healthcare facilities. Solar with battery backup provides energy security for critical operations.',
    savings: 'Hospitals reduce energy costs by 30-50%'
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: hospitalitySolarImg,
    icon: Hotel,
    description: 'Appeal to environmentally conscious travelers while reducing operational costs. Solar-powered hotels gain competitive advantage.',
    savings: 'Hotels save $20,000-100,000/year'
  },
  {
    id: 'warehousing',
    title: 'Warehousing & Distribution',
    image: warehousingSolarImg,
    icon: Warehouse,
    description: 'Large flat roofs make warehouses ideal for solar. Offset energy costs for lighting, climate control, and material handling equipment.',
    savings: 'Warehouses achieve 4-6 year payback'
  }
];

const supportedProvinces = ["British Columbia", "New Brunswick", "Nova Scotia", "Prince Edward Island"];

// Fallback city data for commercial solar locations not in the database
const commercialSolarCities: Record<string, { city: string; province: string; phone: string }> = {
  "abbotsford": { city: "Abbotsford", province: "British Columbia", phone: "1-778-907-1314" },
  "surrey": { city: "Surrey", province: "British Columbia", phone: "1-778-907-1314" },
  "langley": { city: "Langley", province: "British Columbia", phone: "1-778-907-1314" },
  "victoria": { city: "Victoria", province: "British Columbia", phone: "1-778-402-6779" },
  "kelowna": { city: "Kelowna", province: "British Columbia", phone: "1-778-721-5868" },
  "kamloops": { city: "Kamloops", province: "British Columbia", phone: "1-778-504-7059" },
  "moncton": { city: "Moncton", province: "New Brunswick", phone: "1-506-383-3446" },
  "saint-john": { city: "Saint John", province: "New Brunswick", phone: "1-506-645-1455" },
  "fredericton": { city: "Fredericton", province: "New Brunswick", phone: "1-506-260-0324" },
  "tracadie-sheila": { city: "Tracadie-Sheila", province: "New Brunswick", phone: "1-506-399-0754" },
  "kentville": { city: "Kentville", province: "Nova Scotia", phone: "1-902-608-5726" },
  "dartmouth": { city: "Dartmouth", province: "Nova Scotia", phone: "1-902-706-0917" },
  "new-glasgow": { city: "New Glasgow", province: "Nova Scotia", phone: "1-902-706-0917" },
  "bridgewater": { city: "Bridgewater", province: "Nova Scotia", phone: "1-902-706-0917" },
  "sydney": { city: "Sydney", province: "Nova Scotia", phone: "1-902-706-0917" },
  "charlottetown": { city: "Charlottetown", province: "Prince Edward Island", phone: "1-902-201-8469" },
};

export default function CommercialSolarLocationPage() {
  const [, params] = useRoute("/services/commercial-solar/:slug");
  const locationSlug = params?.slug || "";

  const [selectedSolarType, setSelectedSolarType] = useState('rooftop');
  const [monthlyBill, setMonthlyBill] = useState(2000);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  // First try to find in database
  const dbLocation = staticLocations.find(loc => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    const provinceSlug = loc.province.toLowerCase().replace(/\s+/g, '-');
    const fullSlug = `${citySlug}-${provinceSlug}`;
    return locationSlug === fullSlug || locationSlug === loc.slug || locationSlug === citySlug;
  });
  
  // Use database location or fallback to commercial solar cities mapping
  const fallbackLocation = commercialSolarCities[locationSlug];
  const location = dbLocation || (fallbackLocation ? {
    id: locationSlug,
    name: fallbackLocation.city,
    slug: locationSlug,
    city: fallbackLocation.city,
    province: fallbackLocation.province,
    address: "",
    postalCode: "",
    phone: fallbackLocation.phone
  } : null);

  const isProvinceSupported = location ? supportedProvinces.includes(location.province) : false;

  if (!location || !isProvinceSupported) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">Location Not Found</h1>
          <p className="text-slate-600">We couldn't find the commercial solar location you're looking for.</p>
          <p className="text-slate-500 mt-4">Commercial solar services are currently available in British Columbia, New Brunswick, Nova Scotia, and Prince Edward Island.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const { city, province, phone } = location;
  const abbr = provinceAbbreviations[province] || province;
  const provinceData = getProvinceData(province);
  const currentSolarType = solarSystemTypes.find(t => t.id === selectedSolarType) || solarSystemTypes[0];

  const calculateSavings = () => {
    const annualUsage = (monthlyBill * 12) / provinceData.avgRate;
    const systemSizeKw = Math.round((annualUsage / provinceData.sunHours) * provinceData.systemMultiplier);
    const minSize = Math.round(systemSizeKw * 0.85);
    const maxSize = Math.round(systemSizeKw * 1.15);
    const annualSavings = monthlyBill * 12 * 0.7;
    return {
      systemRange: `${minSize}kW - ${maxSize}kW`,
      savings5yr: Math.round(annualSavings * 5 * 0.9),
      savings10yr: Math.round(annualSavings * 10 * 0.85),
      savings25yr: Math.round(annualSavings * 25 * 0.8)
    };
  };

  const savings = calculateSavings();

  const installationSteps = [
    {
      step: 1,
      title: `Free Commercial Solar Assessment in ${city}`,
      intro: `Our certified Commercial Energy Advisor visits your ${city} property to:`,
      details: [
        "Analyze roof orientation, pitch, and shading conditions",
        "Assess electrical panel capacity and upgrade requirements",
        "Review energy consumption patterns and utility bills",
        "Design optimal solar system for your specific needs",
        "Provide detailed written quote with specs and pricing",
        `Identify available ${abbr} rebates and incentive programs`
      ],
      footer: { cost: "Free, no obligation", timeline: provinceData.engineeringTimeline },
      showCta: true
    },
    {
      step: 2,
      title: `Seamless Permitting & ${provinceData.utility} Approval`,
      intro: `Our dedicated specialists handle all ${city} municipal and utility paperwork:`,
      details: [
        `Complete documentation for ${city} building and electrical authorities`,
        `Submit interconnection applications to ${provinceData.utility}`,
        "Manage net metering agreements and technical reviews",
        `Ensure all designs comply with ${abbr} electrical codes`,
        "Track all approvals to keep your project moving forward"
      ],
      footer: { timeline: provinceData.permittingTimeline }
    },
    {
      step: 3,
      title: `Custom Installation Planning for ${city}`,
      intro: "Our lead electrician finalizes your commercial solar design:",
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
      title: `Expert Commercial Installation in ${city}`,
      intro: "Our certified technicians handle every aspect:",
      details: [
        "Mount solar panels on roof or ground structure",
        "Install commercial-grade inverters and electrical components",
        "Complete all electrical connections to code",
        "Perform system testing and quality checks",
        "Full cleanup and debris removal"
      ],
      footer: { timeline: provinceData.installTimeline }
    },
    {
      step: 5,
      title: `Final Inspection & ${provinceData.utility} Activation`,
      intro: `Your ${city} system goes live after final utility coordination:`,
      details: [
        `Schedule final inspection with ${city} authorities`,
        `Coordinate meter swap with ${provinceData.utility} for net metering`,
        "Activate system and verify grid connection",
        "Demonstrate monitoring and controls",
        "Start generating clean, renewable energy"
      ],
      footer: { timeline: provinceData.activationTimeline }
    }
  ];

  const whyChooseGreenfoot = [
    {
      image: solarProfessionalsImage,
      title: `Commercial Solar Experts in ${city}`,
      desc: `Our ${city} team has years of experience installing commercial solar systems across ${province}. We understand local building codes and ${provinceData.utility} requirements.`
    },
    {
      image: experienceImage,
      title: "Commercial Project Expertise",
      desc: `Our seasoned solar advisors possess specialized knowledge and experience required to handle complex commercial solar projects of any scale in ${city}.`
    },
    {
      image: operationalReliabilityImg,
      title: "Operational Reliability",
      desc: "We understand the critical role energy plays in your business and design reliable systems that keep your operations running smoothly."
    },
    {
      image: solarCrewVanImage,
      title: "Satisfaction Guaranteed",
      desc: `We are committed to delivering customer-oriented service that consistently exceeds expectations for ${city} businesses.`
    }
  ];

  const pageTitle = `Commercial Solar Installation ${location.city}, ${provinceAbbreviations[location.province] || location.province} | Greenfoot Energy Solutions`;
  const pageDescription = `Professional commercial solar panel installation in ${location.city}, ${location.province}. ${provinceData.heroDescription} Free commercial solar assessment.`;
  const canonicalUrl = `https://www.greenfootenergy.ca/services/commercial-solar/${location.slug}`;

  return (
    <div className="min-h-screen bg-white">
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
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Commercial Solar", url: "https://www.greenfootenergy.ca/services/commercial-solar" },
          { name: `${city} Commercial Solar`, url: `https://www.greenfootenergy.ca/services/commercial-solar/${locationSlug}` },
        ]}
      />
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${solarHeroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-medium text-sm">4.9 Rating in {city}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] uppercase mb-6"
            >
              Commercial Solar<br />
              <span className="text-[#8dc63f]">in {city}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl"
            >
              {provinceData.heroDescription}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 cta-hover">
                  <span className="sm:hidden">Get Free Assessment</span>
                  <span className="hidden sm:inline">Get Free {city} Assessment</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </a>
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#333333] rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {phone}
                </Button>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Award className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">NABCEP Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">25-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">5000+ Installations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why Are {city} Businesses Switching to{" "}
              <span className="text-[#8dc63f]">Commercial Solar?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Commercial solar delivers significant cost savings and sustainability benefits for {city} businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {commercialBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Savings Calculator Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Much Can {city} Businesses Save with{" "}
              <span className="text-[#8dc63f]">Commercial Solar?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover your {city} business's potential savings with a commercial solar solution.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6 p-4 bg-[#8dc63f]/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-5 h-5 text-[#8dc63f]" />
                      <span className="font-bold text-[#333333]">{city}, {abbr}</span>
                    </div>
                    <p className="text-sm text-slate-600">Utility: {provinceData.utility}</p>
                  </div>
                  
                  <label className="block text-sm font-medium text-[#333333] mb-2">Monthly Electricity Cost ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input 
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]/20 outline-none"
                      placeholder="2000"
                    />
                  </div>
                  
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" className="block mt-6">
                    <Button className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all">
                      <Calculator className="w-5 h-5 mr-2" />
                      Get Detailed {city} Quote
                    </Button>
                  </a>
                  
                  <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-4 hover:bg-[#8dc63f]/20 transition-colors">
                    <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                    <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                  </a>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-[#333333] mb-4">Your {city} Estimated Results</h3>
                  
                  <div className="mb-6">
                    <p className="text-sm text-slate-500">Estimated System Size</p>
                    <p className="text-2xl font-black text-[#8dc63f]">{savings.systemRange}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">5-Year Savings</span>
                      <span className="font-bold text-[#333333]">${savings.savings5yr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">10-Year Savings</span>
                      <span className="font-bold text-[#333333]">${savings.savings10yr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-[#8dc63f]/10 rounded-xl px-4">
                      <span className="font-medium text-[#333333]">25-Year Savings</span>
                      <span className="font-black text-xl text-[#8dc63f]">${savings.savings25yr.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-4">*Estimates based on {abbr} utility rates and solar production. Actual savings may vary.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Province Incentives Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Commercial Solar Rebates Are Available in{" "}
              <span className="text-[#8dc63f]">{province}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {city} businesses can access these rebates and tax credits to help cover the cost of solar installation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#8dc63f]" />
                <h3 className="text-2xl font-black text-[#333333]">{province} Incentives</h3>
              </div>
              
              <div className="space-y-4">
                {provinceData.incentives.map((program, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-[#333333] mb-1">{program.name}</h4>
                        <p className="text-slate-600 text-sm">{program.description}</p>
                      </div>
                      <div className="bg-[#8dc63f]/10 px-4 py-2 rounded-xl flex-shrink-0">
                        <span className="font-bold text-[#8dc63f]">{program.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl">
                <p className="text-sm text-slate-600">
                  <strong className="text-[#8dc63f]">Note:</strong> Incentive programs and amounts are subject to change. Contact us for the latest information on available rebates in {city}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar System Types Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              What Types of Commercial Solar Systems{" "}
              <span className="text-[#8dc63f]">Work Best in {city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choose the installation type that best fits your {city} property and energy goals.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {solarSystemTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedSolarType(type.id)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedSolarType === type.id 
                      ? 'bg-[#8dc63f] text-white' 
                      : 'bg-white text-[#333333] hover:bg-slate-100'
                  }`}
                >
                  {type.title}
                </button>
              ))}
            </div>
            
            <motion.div 
              key={selectedSolarType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={currentSolarType.image} alt={currentSolarType.title} className="w-full aspect-video object-cover" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#333333] mb-4">{currentSolarType.title}</h3>
                <p className="text-slate-600 text-lg mb-6">{currentSolarType.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {currentSolarType.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-slate-100 rounded-xl p-4 mb-6">
                  <p className="text-sm text-slate-500">Best for:</p>
                  <p className="font-medium text-[#333333]">{currentSolarType.bestFor}</p>
                </div>
                
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all">
                    Get {currentSolarType.title} Quote in {city}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#8dc63f] font-bold uppercase tracking-wide mb-2">How It Works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Long Does Commercial Solar Installation{" "}
              <span className="text-[#8dc63f]">Take in {city}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Total timeline: <strong className="text-[#8dc63f]">{provinceData.totalTimeline}</strong> from consultation to power-on.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="mb-12 bg-slate-50 border-l-4 border-[#8dc63f] p-6 rounded-r-xl">
              <h4 className="font-bold text-[#333333] mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8dc63f]" />
                Did you know?
              </h4>
              <p className="text-slate-600 text-sm italic">
                {provinceData.didYouKnow}
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
              <h3 className="font-bold text-xl mb-6 text-center">Total {city} Commercial Installation Timeline</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Engineering & Permits</p>
                  <p className="text-2xl font-black">{provinceData.permittingTimeline}</p>
                  <p className="text-white/60 text-sm">{provinceData.utility} approval</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Installation</p>
                  <p className="text-2xl font-black">{provinceData.installTimeline}</p>
                  <p className="text-white/60 text-sm">On-site work</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Activation</p>
                  <p className="text-2xl font-black">{provinceData.activationTimeline}</p>
                  <p className="text-white/60 text-sm">Inspection & meter swap</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 text-center">
                <p className="text-[#8dc63f] font-bold text-lg mb-1">Total Timeline</p>
                <p className="text-3xl font-black">{provinceData.totalTimeline}</p>
                <p className="text-white/60 text-sm">From consultation to power-on</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Greenfoot */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why Do {city} Businesses Choose Greenfoot for{" "}
              <span className="text-[#8dc63f]">Commercial Solar?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseGreenfoot.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready to Power Your {city} Business{" "}
              <span className="text-[#8dc63f]">With Solar?</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule your free commercial solar assessment today and start saving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
                  <span className="sm:hidden">Get Free Assessment</span>
                  <span className="hidden sm:inline">Get Free {city} Assessment</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </a>
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#333333] rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceFAQSection 
        category="commercial-solar"
        title={`Commercial Solar FAQs for ${city}`}
      />

      <RelatedContent currentPath="/services/commercial-solar" variant="compact" heading="Explore More Solar Resources" />
      <SiteFooter />
    </div>
  );
}
