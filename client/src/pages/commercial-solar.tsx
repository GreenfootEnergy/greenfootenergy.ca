import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Sun, Zap, Battery, DollarSign, Leaf, Shield, Wrench, Building, Calendar, ArrowRight, Users, TrendingDown, Award, Calculator, MapPin, Factory, Store, Heart, Hotel, Warehouse, Tractor, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Helmet } from "react-helmet";

import solarHeroBg from "@assets/solar-crew-installing-panels.webp";
import guaranteeIcon from "@assets/guarantee-icon_1769200985774.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
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

const solarTypes = [
  {
    title: "Rooftop Solar Panels",
    desc: "Photovoltaic systems installed on your building's roof to utilize available space for energy generation, helping reduce overhead costs and your carbon footprint.",
    icon: Building
  },
  {
    title: "Ground-Mounted Arrays",
    desc: "Placed on open land with ample space, allowing for adjustable positioning to capture optimal sun exposure for maximum energy production.",
    icon: Sun
  },
  {
    title: "Solar Carports & Canopies",
    desc: "Dual-purpose solution that generates power while providing valuable shade for vehicles in parking lots or outdoor areas.",
    icon: Zap
  }
];

const maintenanceServices = [
  "Thorough inspections and cleaning to remove debris and ensure panels operate at peak efficiency",
  "Performance monitoring and optimization to track output and identify improvements in real-time",
  "Prompt repair services to minimize downtime and quickly resolve any technical issues"
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

const provinceIncentives = [
  {
    id: 'ns',
    name: 'Nova Scotia',
    abbrev: 'NS',
    programs: [
      { name: 'Clean Energy Investment Tax Credit', value: 'Up to 30%', description: 'Federal tax credit on eligible solar equipment costs' },
      { name: 'Net Metering Program', value: 'Bill credits', description: 'Receive credits for excess electricity sent to the grid' },
      { name: 'Commercial Property Tax Exemption', value: 'Varies', description: 'Solar equipment may be exempt from property tax increases' }
    ]
  },
  {
    id: 'nb',
    name: 'New Brunswick',
    abbrev: 'NB',
    programs: [
      { name: 'Clean Energy Investment Tax Credit', value: 'Up to 30%', description: 'Federal tax credit on eligible solar equipment costs' },
      { name: 'NB Power Net Metering', value: 'Bill credits', description: 'Systems up to 100kW can receive credits for excess generation' },
      { name: 'Large Industrial Renewable Energy Purchase Program', value: 'PPA available', description: 'Long-term purchase agreements for large installations' }
    ]
  },
  {
    id: 'pei',
    name: 'Prince Edward Island',
    abbrev: 'PEI',
    programs: [
      { name: 'Clean Energy Investment Tax Credit', value: 'Up to 30%', description: 'Federal tax credit on eligible solar equipment costs' },
      { name: 'Net Metering Program', value: 'Bill credits', description: 'Receive credits for excess electricity production' },
      { name: 'efficiencyPEI Business Programs', value: 'Varies', description: 'Energy efficiency incentives for commercial properties' }
    ]
  },
  {
    id: 'nl',
    name: 'Newfoundland & Labrador',
    abbrev: 'NL',
    programs: [
      { name: 'Clean Energy Investment Tax Credit', value: 'Up to 30%', description: 'Federal tax credit on eligible solar equipment costs' },
      { name: 'Net Metering Program', value: 'Bill credits', description: 'Available through NL Hydro for grid-connected systems' },
      { name: 'takeCHARGE Commercial Program', value: 'Custom rebates', description: 'Energy efficiency incentives for businesses' }
    ]
  },
  {
    id: 'bc',
    name: 'British Columbia',
    abbrev: 'BC',
    programs: [
      { name: 'Clean Energy Investment Tax Credit', value: 'Up to 30%', description: 'Federal tax credit on eligible solar equipment costs' },
      { name: 'BC Hydro Net Metering', value: 'Bill credits', description: 'Receive credits at retail rate for excess generation' },
      { name: 'CleanBC Commercial Building Incentives', value: 'Up to $400,000', description: 'Major retrofit incentives for commercial buildings' },
      { name: 'PST Exemption on Solar Equipment', value: '7% savings', description: 'Solar equipment is exempt from provincial sales tax' }
    ]
  }
];

const provinceSolarData: Record<string, { avgRate: number; sunHours: number; systemMultiplier: number }> = {
  'ns': { avgRate: 0.17, sunHours: 1850, systemMultiplier: 1.0 },
  'nb': { avgRate: 0.14, sunHours: 1900, systemMultiplier: 0.95 },
  'pei': { avgRate: 0.16, sunHours: 1800, systemMultiplier: 0.98 },
  'nl': { avgRate: 0.13, sunHours: 1600, systemMultiplier: 0.85 },
  'bc': { avgRate: 0.12, sunHours: 1950, systemMultiplier: 1.05 }
};

const whyChooseGreenfoot = [
  {
    image: solarProfessionalsImage,
    title: "NABCEP Certified Technicians",
    desc: "Our team is certified by the North American Board of Certified Energy Practitioners, ensuring your project meets the highest industry standards."
  },
  {
    image: experienceImage,
    title: "Commercial Expertise",
    desc: "Our seasoned solar advisors possess specialized knowledge and experience required to handle complex commercial solar projects of any scale."
  },
  {
    image: prideImage,
    title: "Operational Reliability",
    desc: "We understand the critical role energy plays in your business and design reliable systems that keep your operations running smoothly."
  },
  {
    image: solarCrewVanImage,
    title: "Satisfaction Guaranteed",
    desc: "We are committed to delivering customer-oriented service that consistently exceeds your expectations with every project."
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free Commercial Solar Assessment",
    intro: "Our certified Commercial Energy Advisor visits your property to:",
    details: [
      "Analyze roof orientation, pitch, and shading conditions",
      "Assess electrical panel capacity and upgrade requirements",
      "Review energy consumption patterns and utility bills",
      "Design optimal solar system for your specific needs",
      "Provide detailed written quote with specs and pricing",
      "Identify available rebates and incentive programs"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-7 Days" },
    showCta: true
  },
  {
    step: 2,
    title: "Engineering & Utility Application",
    intro: "Our dedicated specialists handle all design and utility coordination:",
    details: [
      "Complete detailed engineering and system design",
      "Submit interconnection applications to provincial utility providers",
      "Manage net metering agreements and technical reviews",
      "Ensure all designs comply with regional electrical codes",
      "Track all applications to keep your project moving forward"
    ],
    footer: { timeline: "1-2 Weeks" }
  },
  {
    step: 3,
    title: "Permits & Municipal Approvals",
    intro: "We navigate all permitting requirements on your behalf:",
    details: [
      "Complete documentation for local building authorities",
      "Submit electrical permit applications",
      "Address any municipal requirements specific to your property",
      "Coordinate utility interconnection approval",
      "Keep you informed on approval status"
    ],
    footer: { timeline: "2-6 Weeks (varies by province)" }
  },
  {
    step: 4,
    title: "Professional Installation",
    intro: "Our certified technicians handle every aspect on-site:",
    details: [
      "Mount solar panels on roof or ground structure",
      "Install commercial-grade inverters and electrical components",
      "Complete all electrical connections to code",
      "Perform system testing and quality checks",
      "Full cleanup and debris removal"
    ],
    footer: { timeline: "1-5 Days (varies by project size)" }
  },
  {
    step: 5,
    title: "Inspection & Activation",
    intro: "Your system goes live after final utility coordination:",
    details: [
      "Schedule final inspection with local authorities",
      "Coordinate meter swap with utility provider for net metering",
      "Activate system and verify grid connection",
      "Demonstrate monitoring and controls",
      "Start generating clean, renewable energy"
    ],
    footer: { timeline: "1-4 Weeks" }
  }
];

export default function CommercialSolarPage() {
  const { t } = useLanguage();
  const [selectedSolarType, setSelectedSolarType] = useState('rooftop');
  const [selectedProvince, setSelectedProvince] = useState('ns');
  const [monthlyBill, setMonthlyBill] = useState(2000);
  const [calculatorProvince, setCalculatorProvince] = useState('ns');
  const [industryIndex, setIndustryIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  const translatedBenefits = [
    {
      icon: TrendingDown,
      title: t.commercialSolar.benefits.reducedCosts.title,
      desc: t.commercialSolar.benefits.reducedCosts.desc
    },
    {
      icon: Leaf,
      title: t.commercialSolar.benefits.sustainability.title,
      desc: t.commercialSolar.benefits.sustainability.desc
    },
    {
      icon: DollarSign,
      title: t.commercialSolar.benefits.roi.title,
      desc: t.commercialSolar.benefits.roi.desc
    },
    {
      icon: Shield,
      title: t.commercialSolar.benefits.independence.title,
      desc: t.commercialSolar.benefits.independence.desc
    }
  ];

  const translatedIndustries = [
    {
      id: 'agriculture',
      title: t.commercialSolar.industries.agriculture.title,
      image: agricultureSolarImg,
      icon: Tractor,
      description: t.commercialSolar.industries.agriculture.description,
      savings: t.commercialSolar.industries.agriculture.savings
    },
    {
      id: 'retail',
      title: t.commercialSolar.industries.retail.title,
      image: retailSolarImg,
      icon: Store,
      description: t.commercialSolar.industries.retail.description,
      savings: t.commercialSolar.industries.retail.savings
    },
    {
      id: 'industrial',
      title: t.commercialSolar.industries.industrial.title,
      image: industrialSolarImg,
      icon: Factory,
      description: t.commercialSolar.industries.industrial.description,
      savings: t.commercialSolar.industries.industrial.savings
    },
    {
      id: 'healthcare',
      title: t.commercialSolar.industries.healthcare.title,
      image: healthcareSolarImg,
      icon: Heart,
      description: t.commercialSolar.industries.healthcare.description,
      savings: t.commercialSolar.industries.healthcare.savings
    },
    {
      id: 'hospitality',
      title: t.commercialSolar.industries.hospitality.title,
      image: hospitalitySolarImg,
      icon: Hotel,
      description: t.commercialSolar.industries.hospitality.description,
      savings: t.commercialSolar.industries.hospitality.savings
    },
    {
      id: 'warehousing',
      title: t.commercialSolar.industries.warehousing.title,
      image: warehousingSolarImg,
      icon: Warehouse,
      description: t.commercialSolar.industries.warehousing.description,
      savings: t.commercialSolar.industries.warehousing.savings
    }
  ];

  const translatedSolarSystemTypes = [
    {
      id: 'rooftop',
      title: t.commercialSolar.systemTypes.rooftop.title,
      image: rooftopSolarImg,
      description: t.commercialSolar.systemTypes.rooftop.description,
      benefits: t.commercialSolar.systemTypes.rooftop.benefits,
      bestFor: t.commercialSolar.systemTypes.rooftop.bestFor
    },
    {
      id: 'ground',
      title: t.commercialSolar.systemTypes.ground.title,
      image: groundMountSolarImg,
      description: t.commercialSolar.systemTypes.ground.description,
      benefits: t.commercialSolar.systemTypes.ground.benefits,
      bestFor: t.commercialSolar.systemTypes.ground.bestFor
    },
    {
      id: 'carport',
      title: t.commercialSolar.systemTypes.carport.title,
      image: carportSolarImg,
      description: t.commercialSolar.systemTypes.carport.description,
      benefits: t.commercialSolar.systemTypes.carport.benefits,
      bestFor: t.commercialSolar.systemTypes.carport.bestFor
    }
  ];

  const translatedWhyChoose = [
    {
      image: solarProfessionalsImage,
      title: t.commercialSolar.whyChoose.nabcep.title,
      desc: t.commercialSolar.whyChoose.nabcep.desc
    },
    {
      image: experienceImage,
      title: t.commercialSolar.whyChoose.expertise.title,
      desc: t.commercialSolar.whyChoose.expertise.desc
    },
    {
      image: prideImage,
      title: t.commercialSolar.whyChoose.reliability.title,
      desc: t.commercialSolar.whyChoose.reliability.desc
    },
    {
      image: solarCrewVanImage,
      title: t.commercialSolar.whyChoose.satisfaction.title,
      desc: t.commercialSolar.whyChoose.satisfaction.desc
    }
  ];

  const translatedInstallationSteps = [
    {
      step: 1,
      title: t.commercialSolar.process.step1.title,
      intro: t.commercialSolar.process.step1.intro,
      details: t.commercialSolar.process.step1.details,
      footer: { cost: t.commercialSolar.process.step1.cost, timeline: t.commercialSolar.process.step1.timeline },
      showCta: true
    },
    {
      step: 2,
      title: t.commercialSolar.process.step2.title,
      intro: t.commercialSolar.process.step2.intro,
      details: t.commercialSolar.process.step2.details,
      footer: { timeline: t.commercialSolar.process.step2.timeline }
    },
    {
      step: 3,
      title: t.commercialSolar.process.step3.title,
      intro: t.commercialSolar.process.step3.intro,
      details: t.commercialSolar.process.step3.details,
      footer: { timeline: t.commercialSolar.process.step3.timeline }
    },
    {
      step: 4,
      title: t.commercialSolar.process.step4.title,
      intro: t.commercialSolar.process.step4.intro,
      details: t.commercialSolar.process.step4.details,
      footer: { timeline: t.commercialSolar.process.step4.timeline }
    },
    {
      step: 5,
      title: t.commercialSolar.process.step5.title,
      intro: t.commercialSolar.process.step5.intro,
      details: t.commercialSolar.process.step5.details,
      footer: { timeline: t.commercialSolar.process.step5.timeline }
    }
  ];
  
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const calculateSavings = () => {
    const data = provinceSolarData[calculatorProvince];
    const annualUsage = (monthlyBill * 12) / data.avgRate;
    const systemSizeKw = Math.round((annualUsage / data.sunHours) * data.systemMultiplier);
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
  const currentSolarType = translatedSolarSystemTypes.find(type => type.id === selectedSolarType) || translatedSolarSystemTypes[0];
  const currentIncentives = provinceIncentives.find(p => p.id === selectedProvince) || provinceIncentives[0];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Commercial Solar Installation | Business Solar Panels | Greenfoot Energy Solutions</title>
        <meta name="description" content="Professional commercial solar panel installation for businesses in Atlantic Canada and BC. Reduce operating costs by up to 70% with rooftop, ground-mount, or carport solar systems." />
        <meta name="keywords" content="commercial solar, business solar panels, commercial solar installation, rooftop solar, ground mount solar, solar carports, Atlantic Canada solar" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/commercial-solar" />
        <meta property="og:title" content="Commercial Solar Installation | Business Solar Panels | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional commercial solar panel installation for businesses. Reduce operating costs by up to 70% with rooftop, ground-mount, or carport solar systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/commercial-solar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Solar Installation | Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Professional commercial solar installation for businesses. Reduce operating costs by up to 70%." />
      </Helmet>
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Commercial Solar", url: "https://www.greenfootenergy.ca/services/commercial-solar" },
        ]}
      />
      <SiteHeader />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
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
              <span className="text-white font-medium text-sm">{t.commercialSolar.hero.rating} • {t.commercialSolar.hero.reviews}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] uppercase mb-6"
            >
              {t.commercialSolar.hero.title1}<br />
              <span className="text-[#8dc63f]">{t.commercialSolar.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl"
            >
              {t.commercialSolar.hero.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 cta-hover">
                  {t.commercialSolar.hero.getFreeAssessment}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:18003809384">
                <Button size="lg" className="bg-[#4a4a4a] hover:bg-[#3a3a3a] border border-white/50 text-white rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  1 (800) 380-9384
                </Button>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
              >
                <img src={expertiseIcon} alt="Unmatched Expertise" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">{t.commercialSolar.hero.trustBadges.projects}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
              >
                <img src={guaranteeIcon} alt="Satisfaction Guaranteed" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">{t.commercialSolar.hero.trustBadges.satisfaction}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
              >
                <img src={redSealIcon} alt="Red Seal Certified" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <span className="text-xs sm:text-sm font-semibold text-white text-center sm:text-left">{t.commercialSolar.hero.trustBadges.certified}</span>
              </motion.div>
            </div>

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
              {t.commercialSolar.benefits.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.benefits.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.commercialSolar.benefits.sectionSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {translatedBenefits.map((benefit, i) => (
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
                <h3 className="font-bold text-xl text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Carousel Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {t.commercialSolar.industries.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.industries.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.commercialSolar.industries.sectionSubtitle}
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${industryIndex * 100}%)` }}
              >
                {translatedIndustries.map((industry, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                        <img src={industry.image} alt={industry.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <div className="w-10 h-10 bg-[#8dc63f] rounded-xl flex items-center justify-center">
                            <industry.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-bold text-lg">{industry.title}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-[#333333] mb-4">{industry.title}</h3>
                        <p className="text-slate-600 text-lg mb-6">{industry.description}</p>
                        <div className="bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6">
                          <p className="text-[#8dc63f] font-bold">{industry.savings}</p>
                        </div>
                        <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-sm sm:text-lg px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all">
                            <span className="sm:hidden">{t.commercialSolar.industries.getFreeQuote}</span>
                            <span className="hidden sm:inline">{t.commercialSolar.industries.getFreeQuoteFor} {industry.title}</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => setIndustryIndex(i => Math.max(0, i - 1))}
                className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50"
                disabled={industryIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-[#333333]" />
              </button>
              <div className="flex gap-2">
                {industries.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndustryIndex(i)}
                    className={`w-3 h-3 rounded-xl transition-colors ${industryIndex === i ? 'bg-[#8dc63f]' : 'bg-slate-300'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setIndustryIndex(i => Math.min(industries.length - 1, i + 1))}
                className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50"
                disabled={industryIndex === industries.length - 1}
              >
                <ChevronRight className="w-6 h-6 text-[#333333]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Savings Calculator Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {t.commercialSolar.calculator.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.calculator.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.commercialSolar.calculator.sectionSubtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">{t.commercialSolar.calculator.selectProvince}</label>
                  <select 
                    value={calculatorProvince}
                    onChange={(e) => setCalculatorProvince(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]/20 outline-none"
                  >
                    <option value="ns">{t.commercialSolar.calculator.provinces.ns}</option>
                    <option value="nb">{t.commercialSolar.calculator.provinces.nb}</option>
                    <option value="pei">{t.commercialSolar.calculator.provinces.pei}</option>
                    <option value="nl">{t.commercialSolar.calculator.provinces.nl}</option>
                    <option value="bc">{t.commercialSolar.calculator.provinces.bc}</option>
                  </select>
                  
                  <label className="block text-sm font-medium text-[#333333] mb-2 mt-6">{t.commercialSolar.calculator.monthlyElectricityCost}</label>
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
                      {t.commercialSolar.calculator.getDetailedQuote}
                    </Button>
                  </a>
                  
                  <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-4 hover:bg-[#8dc63f]/20 transition-colors">
                    <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                    <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                  </a>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-[#333333] mb-4">{t.commercialSolar.calculator.estimatedResults}</h3>
                  
                  <div className="mb-6">
                    <p className="text-sm text-slate-500">{t.commercialSolar.calculator.estimatedSystemSize}</p>
                    <p className="text-2xl font-black text-[#8dc63f]">{savings.systemRange}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-600">{t.commercialSolar.calculator.savings5yr}</span>
                      <span className="font-bold text-[#333333]">${savings.savings5yr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-600">{t.commercialSolar.calculator.savings10yr}</span>
                      <span className="font-bold text-[#333333]">${savings.savings10yr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-[#8dc63f]/10 rounded-lg px-4">
                      <span className="font-medium text-[#333333]">{t.commercialSolar.calculator.savings25yr}</span>
                      <span className="font-black text-xl text-[#8dc63f]">${savings.savings25yr.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-4">{t.commercialSolar.calculator.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar System Types Section with Tabs */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {t.commercialSolar.systemTypes.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.systemTypes.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.commercialSolar.systemTypes.sectionSubtitle}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {translatedSolarSystemTypes.map((type) => (
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
                  <p className="text-sm text-slate-500">{t.commercialSolar.systemTypes.bestFor}</p>
                  <p className="font-medium text-[#333333]">{currentSolarType.bestFor}</p>
                </div>
                
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all">
                    {t.commercialSolar.systemTypes.getQuote} {currentSolarType.title} {t.commercialSolar.systemTypes.quote}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
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
              {t.commercialSolar.incentives.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.incentives.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.commercialSolar.incentives.sectionSubtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {provinceIncentives.map((province) => (
                <button
                  key={province.id}
                  onClick={() => setSelectedProvince(province.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                    selectedProvince === province.id 
                      ? 'bg-[#8dc63f] text-white' 
                      : 'bg-slate-100 text-[#333333] hover:bg-slate-200'
                  }`}
                >
                  {province.abbrev}
                </button>
              ))}
            </div>
            
            <motion.div 
              key={selectedProvince}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#8dc63f]" />
                  <h3 className="text-2xl font-black text-[#333333]">{currentIncentives.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {currentIncentives.programs.map((program, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-[#333333] mb-1">{program.name}</h4>
                          <p className="text-slate-600 text-sm">{program.description}</p>
                        </div>
                        <div className="bg-[#8dc63f]/10 px-4 py-2 rounded-lg flex-shrink-0">
                          <span className="font-bold text-[#8dc63f]">{program.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl">
                  <p className="text-sm text-slate-600">
                    <strong className="text-[#8dc63f]">{t.commercialSolar.incentives.note}</strong> {t.commercialSolar.incentives.noteText} {currentIncentives.name}.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Dark Theme */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              {t.commercialSolar.services.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.services.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t.commercialSolar.services.sectionSubtitle}
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
              <h3 className="text-xl font-semibold text-white mb-4">{t.commercialSolar.services.installation.title}</h3>
              <ul className="space-y-3">
                {t.commercialSolar.services.installation.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  {t.commercialSolar.services.installation.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.commercialSolar.services.maintenance.title}</h3>
              <ul className="space-y-3">
                {t.commercialSolar.services.maintenance.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => (window as any)._scheduler?.show({ schedulerId: 'sched_pfz8vs27yb6ro43jd3uttrvs' })}
                className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover"
              >
                {t.commercialSolar.services.maintenance.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Energy Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-4">
                <Battery className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.commercialSolar.services.optimization.title}</h3>
              <ul className="space-y-3">
                {t.commercialSolar.services.optimization.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                  {t.commercialSolar.services.optimization.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
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
            <p className="text-[#8dc63f] font-bold uppercase tracking-wide mb-2">{t.commercialSolar.process.howItWorks}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              {t.commercialSolar.process.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.process.sectionTitleHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From your first consultation to powering up, we handle everything.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="mb-12 bg-slate-50 border-l-4 border-[#8dc63f] p-6 rounded-r-xl">
              <h4 className="font-bold text-[#333333] mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#8dc63f]" />
                Did you know?
              </h4>
              <p className="text-slate-600 text-sm italic">
                90% of the commercial solar project timeline is spent on paperwork, permits, and utility approvals—not on putting panels up. While the on-site installation is fast (often 3-5 days), the sequential steps of applications and utility coordination ensure a safe and compliant grid connection.
              </p>
            </div>
            {translatedInstallationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={translatedInstallationSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333]">
              {t.commercialSolar.whyChoose.sectionTitle}{" "}
              <span className="text-[#8dc63f]">{t.commercialSolar.whyChoose.sectionTitleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {translatedWhyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-[#333333] mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-[#8dc63f]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6">
              {t.commercialSolar.cta.readyToStart}
            </h2>
            <p className="text-lg text-[#333333]/80 mb-8">
              {t.commercialSolar.cta.contactToday}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-[#8dc63f] hover:bg-gray-100 rounded-xl font-bold text-lg h-14 px-8">
                  {t.commercialSolar.cta.getFreeAssessment}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:18003809384">
                <Button size="lg" className="bg-[#709c32] hover:bg-[#5f8a2a] text-white rounded-xl font-bold text-lg h-14 px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  1 (800) 380-9384
                </Button>
              </a>
            </div>
            <p className="text-[#333333]/70 text-sm mt-6">
              {t.commercialSolar.financing.flexibleOptions}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQSection 
        category="Commercial Solar"
        title="Common Questions About Commercial Solar"
      />

      {/* Reviews Section */}
      <ReviewsSection />


      <OtherServicesGrid exclude="commercialSolar" />

      <RelatedContent currentPath="/services/commercial-solar" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />

      <ServiceSchemaWithFAQs
        serviceName="Commercial Solar Installation & Maintenance"
        serviceDescription="Professional commercial solar panel installation, maintenance, and energy optimization services. NABCEP certified technicians providing rooftop, ground-mount, and carport solar solutions for businesses."
        serviceType="Commercial Solar Service"
        serviceUrl="https://www.greenfootenergy.ca/services/commercial-solar"
        priceRange="$$$$"
        faqCategory="Commercial Solar"
      />
    </div>
  );
}
