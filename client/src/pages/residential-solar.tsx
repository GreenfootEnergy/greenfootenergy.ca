import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Sun, Zap, Battery, DollarSign, Leaf, Shield, Wrench, Home, Calendar, ArrowRight, Users, TrendingDown, Award, Calculator, MapPin, Heart, Lightbulb, Thermometer } from "lucide-react";
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
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

import solarHeroBg from "@assets/solar-crew-installing-panels.webp";
import guaranteeIcon from "@assets/guarantee-icon_1769200985774.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import solarProfessionalsImage from "@assets/solar-professionals-team.webp";
import solarCrewVanImage from "@assets/solar-crew-van.webp";

import residentialRooftopImg from "@/assets/images/residential-rooftop-solar.png";
import residentialGroundMountImg from "@/assets/images/residential-ground-mount-solar.png";
import residentialBatteryImg from "@/assets/images/residential-battery-storage.png";

const residentialBenefits = [
  {
    icon: TrendingDown,
    title: "Lower Energy Bills",
    desc: "Reduce your monthly electricity bills by up to 70% and protect your family from rising utility rates."
  },
  {
    icon: Home,
    title: "Increase Home Value",
    desc: "Solar panels can increase your home's value by an average of 4.1%, making it a smart investment."
  },
  {
    icon: DollarSign,
    title: "Excellent ROI",
    desc: "Residential solar systems typically pay for themselves in 6-10 years with decades of free energy after."
  },
  {
    icon: Leaf,
    title: "Reduce Carbon Footprint",
    desc: "Power your home with clean, renewable energy and reduce your household's environmental impact."
  }
];

const solarSystemTypes = [
  {
    id: 'rooftop',
    title: 'Rooftop Solar',
    image: residentialRooftopImg,
    description: 'The most popular choice for homeowners. Panels installed on your roof capture sunlight and convert it to electricity for your home.',
    benefits: [
      'Utilizes unused roof space',
      'No additional land required',
      'Reduces cooling costs by shading roof',
      'Quick installation with minimal disruption',
      'Best for most residential homes'
    ],
    bestFor: 'Single-family homes, townhouses, and condos with suitable roof space'
  },
  {
    id: 'ground',
    title: 'Ground Mount Solar',
    image: residentialGroundMountImg,
    description: 'Perfect for homes with limited roof space or shading issues. Ground-mounted panels can be positioned for optimal sun exposure year-round.',
    benefits: [
      'Optimal panel positioning for maximum output',
      'Easy maintenance and cleaning access',
      'No roof structural requirements',
      'Can be installed on unusable land',
      'Ideal for properties with shaded roofs'
    ],
    bestFor: 'Rural properties, farms, and homes with large yards or unsuitable roofs'
  },
  {
    id: 'battery',
    title: 'Solar + Battery Storage',
    image: residentialBatteryImg,
    description: 'Add battery backup to store excess energy for use at night or during power outages, maximizing your energy independence.',
    benefits: [
      'Store excess solar energy for later use',
      'Backup power during outages',
      'Maximize self-consumption of solar',
      'Reduce reliance on the grid',
      'Future-proof your energy system'
    ],
    bestFor: 'Homeowners seeking energy independence and backup power protection'
  }
];

const maintenanceServices = [
  "Annual inspections and cleaning to keep your panels operating at peak efficiency",
  "Performance monitoring to track your system's output and identify any issues early",
  "Prompt repair services with our 24/7 emergency support line"
];

const provinceSolarData: Record<string, { avgRate: number; sunHours: number; systemMultiplier: number; rebateName: string; rebateAmount: string; utility: string }> = {
  bc: { avgRate: 0.12, sunHours: 1350, systemMultiplier: 1.15, rebateName: "CleanBC Better Homes", rebateAmount: "Contact for details", utility: "BC Hydro" },
  ns: { avgRate: 0.18, sunHours: 1380, systemMultiplier: 1.10, rebateName: "Solar Homes Program", rebateAmount: "Up to $3,000", utility: "Nova Scotia Power" },
  nb: { avgRate: 0.14, sunHours: 1320, systemMultiplier: 1.12, rebateName: "Total Home Energy Program", rebateAmount: "Varies", utility: "NB Power" },
  pei: { avgRate: 0.17, sunHours: 1350, systemMultiplier: 1.08, rebateName: "Solar Electric Rebate", rebateAmount: "Up to $10,000", utility: "Maritime Electric" }
};

const provinceIncentives = [
  {
    id: 'ns',
    name: 'Nova Scotia',
    incentives: [
      { name: 'Solar Homes Program', value: 'Up to $3,000', desc: 'Rebate for residential solar installations' },
      { name: 'Federal Tax Credit', value: '15% Credit', desc: 'Canada Greener Homes Grant eligible' },
      { name: 'Net Metering', value: 'Full Retail', desc: 'Sell excess power back to Nova Scotia Power at retail rates' },
      { name: 'Property Tax Exemption', value: '100%', desc: 'Solar equipment excluded from property assessment' }
    ]
  },
  {
    id: 'nb',
    name: 'New Brunswick',
    incentives: [
      { name: 'Total Home Energy Program', value: 'Varies', desc: 'Energy efficiency rebates for homes' },
      { name: 'Federal Tax Credit', value: '15% Credit', desc: 'Canada Greener Homes Grant eligible' },
      { name: 'Net Metering', value: 'Standard', desc: 'Sell excess power back to NB Power' },
      { name: 'HST Exemption', value: '15%', desc: 'No HST on solar equipment purchases' }
    ]
  },
  {
    id: 'bc',
    name: 'British Columbia',
    incentives: [
      { name: 'CleanBC Better Homes', value: 'Contact for details', desc: 'Rebate for solar + heat pump combinations' },
      { name: 'Federal Tax Credit', value: '15% Credit', desc: 'Canada Greener Homes Grant eligible' },
      { name: 'Net Metering', value: 'Standard', desc: 'Sell excess power back to BC Hydro' },
      { name: 'PST Exemption', value: '7%', desc: 'No PST on qualifying solar equipment' }
    ]
  },
  {
    id: 'pei',
    name: 'Prince Edward Island',
    incentives: [
      { name: 'Solar Electric Rebate', value: 'Up to $10,000', desc: 'One of Canada\'s most generous solar rebates' },
      { name: 'Federal Tax Credit', value: '15% Credit', desc: 'Canada Greener Homes Grant eligible' },
      { name: 'Net Metering', value: 'Full Retail', desc: 'Sell excess power back to Maritime Electric' },
      { name: 'efficiencyPEI Loans', value: '0% Interest', desc: 'Interest-free financing for solar installations' }
    ]
  }
];

const installationProcess = [
  {
    step: 1,
    title: "Free Home Solar Assessment",
    intro: "Our certified Solar Energy Advisor visits your home to:",
    details: [
      "Assess roof orientation, pitch, and shading conditions",
      "Review your energy consumption and utility bills",
      "Design optimal solar system for your specific needs",
      "Provide detailed written quote with specs and pricing",
      "Identify available rebates and incentive programs"
    ],
    footer: { cost: "Free, no obligation", timeline: "1-3 Days" },
    showCta: true
  },
  {
    step: 2,
    title: "System Design & Permits",
    intro: "Our engineering team prepares your custom solar system:",
    details: [
      "Panel placement optimization for maximum output",
      "Inverter and equipment selection",
      "Building permit application",
      "Utility interconnection agreement",
      "Rebate and incentive applications"
    ],
    footer: { timeline: "1-3 Weeks" }
  },
  {
    step: 3,
    title: "Professional Installation",
    intro: "Our certified installers complete your solar installation:",
    details: [
      "Roof mounting and panel installation",
      "Electrical connections and inverter setup",
      "System testing and commissioning",
      "Site cleanup and inspection preparation"
    ],
    footer: { timeline: "1-2 Days" }
  },
  {
    step: 4,
    title: "Inspection & Activation",
    intro: "Final steps to get your system generating power:",
    details: [
      "Municipal electrical inspection",
      "Utility meter installation and approval",
      "System activation and monitoring setup",
      "Homeowner training and documentation"
    ],
    footer: { timeline: "1-2 Weeks" }
  },
  {
    step: 5,
    title: "Ongoing Support",
    intro: "We're here for you after installation:",
    details: [
      "24/7 system monitoring",
      "Annual maintenance and cleaning",
      "Performance guarantee support",
      "Warranty claim assistance"
    ],
    footer: { timeline: "25+ Years" }
  }
];

const residentialFaqs = [
  {
    question: "How much does residential solar cost in Canada?",
    answer: "The average residential solar system in Canada costs between $15,000 and $30,000 before rebates and incentives. After provincial rebates and federal tax credits, your net cost can be significantly lower. We provide free, no-obligation quotes to give you an accurate estimate for your home."
  },
  {
    question: "How long do solar panels last?",
    answer: "Quality solar panels are designed to last 25-30 years or more. Most manufacturers offer 25-year performance warranties guaranteeing at least 80% of original output. Your solar investment will continue producing clean energy for decades."
  },
  {
    question: "Will solar panels work in Canadian winters?",
    answer: "Yes! Solar panels actually work more efficiently in cold temperatures. While winter days are shorter, panels still generate significant power. Snow typically slides off panels quickly, and the reflection from snow can actually boost production. Our systems are designed for Canadian climates."
  },
  {
    question: "What is net metering and how does it work?",
    answer: "Net metering allows you to sell excess solar electricity back to the grid. When your panels produce more power than you use, the surplus flows to the grid and you receive credits on your utility bill. At night or on cloudy days, you draw from the grid using those credits."
  },
  {
    question: "Do I need a new roof before installing solar?",
    answer: "If your roof is more than 15 years old, we recommend a roof inspection before solar installation. Solar panels last 25+ years, so it's best to ensure your roof can support them for the long term. We can coordinate with roofing contractors if needed."
  },
  {
    question: "How much can I save with solar panels?",
    answer: "Most homeowners save 50-70% on their electricity bills with solar. Your exact savings depend on your energy usage, system size, and local utility rates. We'll provide a detailed savings analysis during your free consultation."
  }
];

const whyChooseGreenfoot = [
  {
    image: guaranteeIcon,
    title: "Price Match Guarantee",
    desc: "We'll match any competitor's written quote for comparable equipment and installation."
  },
  {
    image: expertiseIcon,
    title: "Certified Installers",
    desc: "Our technicians are fully licensed and certified for solar installations across Canada."
  },
  {
    image: prideImage,
    title: "Quality Equipment",
    desc: "We use only tier-1 solar panels and inverters backed by industry-leading warranties."
  },
  {
    image: experienceImage,
    title: "Local Expertise",
    desc: "We understand Canadian weather and design systems optimized for your region."
  }
];

export default function ResidentialSolarPage() {
  const { t } = useLanguage();
  const [selectedProvince, setSelectedProvince] = useState('ns');
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [calculatorProvince, setCalculatorProvince] = useState('ns');
  const [selectedSolarType, setSelectedSolarType] = useState('rooftop');
  const heroRef = useRef<HTMLDivElement>(null);

  const translatedBenefits = [
    {
      icon: TrendingDown,
      title: t.residentialSolar.benefits.lowerBills,
      desc: t.residentialSolar.benefits.lowerBillsDesc
    },
    {
      icon: Home,
      title: t.residentialSolar.benefits.increaseValue,
      desc: t.residentialSolar.benefits.increaseValueDesc
    },
    {
      icon: DollarSign,
      title: t.residentialSolar.benefits.excellentRoi,
      desc: t.residentialSolar.benefits.excellentRoiDesc
    },
    {
      icon: Leaf,
      title: t.residentialSolar.benefits.reduceCarbonFootprint,
      desc: t.residentialSolar.benefits.reduceCarbonFootprintDesc
    }
  ];

  const translatedSolarSystemTypes = [
    {
      id: 'rooftop',
      title: t.residentialSolar.systemTypes.rooftopTitle,
      image: residentialRooftopImg,
      description: t.residentialSolar.systemTypes.rooftopDesc,
      benefits: t.residentialSolar.systemTypes.rooftopBenefits,
      bestFor: t.residentialSolar.systemTypes.rooftopBestFor
    },
    {
      id: 'ground',
      title: t.residentialSolar.systemTypes.groundTitle,
      image: residentialGroundMountImg,
      description: t.residentialSolar.systemTypes.groundDesc,
      benefits: t.residentialSolar.systemTypes.groundBenefits,
      bestFor: t.residentialSolar.systemTypes.groundBestFor
    },
    {
      id: 'battery',
      title: t.residentialSolar.systemTypes.batteryTitle,
      image: residentialBatteryImg,
      description: t.residentialSolar.systemTypes.batteryDesc,
      benefits: t.residentialSolar.systemTypes.batteryBenefits,
      bestFor: t.residentialSolar.systemTypes.batteryBestFor
    }
  ];

  const translatedMaintenanceServices = t.residentialSolar.services.maintenanceItems;

  const translatedInstallationProcess = [
    {
      step: 1,
      title: t.residentialSolar.installation.step1Title,
      intro: t.residentialSolar.installation.step1Intro,
      details: t.residentialSolar.installation.step1Details,
      footer: { cost: t.residentialSolar.installation.step1Cost, timeline: "1-3 Days" },
      showCta: true
    },
    {
      step: 2,
      title: t.residentialSolar.installation.step2Title,
      intro: t.residentialSolar.installation.step2Intro,
      details: t.residentialSolar.installation.step2Details,
      footer: { timeline: "1-3 Weeks" }
    },
    {
      step: 3,
      title: t.residentialSolar.installation.step3Title,
      intro: t.residentialSolar.installation.step3Intro,
      details: t.residentialSolar.installation.step3Details,
      footer: { timeline: "1-2 Days" }
    },
    {
      step: 4,
      title: t.residentialSolar.installation.step4Title,
      intro: t.residentialSolar.installation.step4Intro,
      details: t.residentialSolar.installation.step4Details,
      footer: { timeline: "1-2 Weeks" }
    },
    {
      step: 5,
      title: t.residentialSolar.installation.step5Title,
      intro: t.residentialSolar.installation.step5Intro,
      details: t.residentialSolar.installation.step5Details,
      footer: { timeline: "25+ Years" }
    }
  ];

  const translatedWhyChooseGreenfoot = [
    {
      image: guaranteeIcon,
      title: t.residentialSolar.whyChoose.priceMatchGuarantee,
      desc: t.residentialSolar.whyChoose.priceMatchDesc
    },
    {
      image: expertiseIcon,
      title: t.residentialSolar.whyChoose.certifiedInstallers,
      desc: t.residentialSolar.whyChoose.certifiedDesc
    },
    {
      image: prideImage,
      title: t.residentialSolar.whyChoose.qualityEquipment,
      desc: t.residentialSolar.whyChoose.qualityDesc
    },
    {
      image: experienceImage,
      title: t.residentialSolar.whyChoose.localExpertise,
      desc: t.residentialSolar.whyChoose.localDesc
    }
  ];
  
  const currentSolarType = translatedSolarSystemTypes.find(tst => tst.id === selectedSolarType) || translatedSolarSystemTypes[0];
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  const calculateSavings = () => {
    const data = provinceSolarData[calculatorProvince];
    const annualUsage = (monthlyBill * 12) / data.avgRate;
    const systemSizeKw = Math.round((annualUsage / data.sunHours) * data.systemMultiplier);
    const minSize = Math.round(systemSizeKw * 0.85);
    const maxSize = Math.round(systemSizeKw * 1.15);
    const savingsPercent = 0.82;
    const annualSavings = monthlyBill * 12 * savingsPercent;
    const systemCost = systemSizeKw * 2500;
    const paybackYears = Math.round(systemCost / annualSavings);
    const twentyFiveYearSavings = annualSavings * 25 - systemCost;
    
    return {
      systemSize: `${minSize}-${maxSize} kW`,
      annualSavings: Math.round(annualSavings),
      paybackPeriod: `${Math.max(5, paybackYears - 1)}-${Math.min(10, paybackYears + 1)} years`,
      lifetimeSavings: Math.round(twentyFiveYearSavings),
      rebate: data.rebateAmount,
      savingsRange: "70-95%"
    };
  };

  const savings = calculateSavings();

  return (
    <>
      <Helmet>
        <title>{t.residentialSolar.meta.title}</title>
        <meta name="description" content={t.residentialSolar.meta.description} />
        <meta name="keywords" content="residential solar, home solar panels, rooftop solar, ground mount solar, solar battery storage, home solar installation Canada, solar rebates, panneaux solaires, énergie solaire résidentielle" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/residential-solar" />
        
        <meta property="og:title" content={t.residentialSolar.meta.title} />
        <meta property="og:description" content={t.residentialSolar.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/residential-solar" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.residentialSolar.meta.title} />
        <meta name="twitter:description" content={t.residentialSolar.meta.description} />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Residential Solar", url: "https://www.greenfootenergy.ca/services/residential-solar" }
        ]}
      />
      <ServiceSchemaWithFAQs
        serviceName="Residential Solar Panel Installation"
        serviceDescription="Professional residential solar panel installation services for Canadian homeowners. Reduce your electricity bills by up to 70% with clean, renewable solar energy. Expert installation, premium equipment, and comprehensive warranties."
        serviceType="Residential Solar Service"
        serviceUrl="https://www.greenfootenergy.ca/services/residential-solar"
        priceRange="$$$"
        faqCategory="Residential Solar"
      />
      
      <div className="min-h-screen bg-white font-sans">
        <SiteHeader />

        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${solarHeroBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/80 to-transparent" />
          </motion.div>
          
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white font-medium text-sm">{t.residentialSolar.hero.rating}</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] uppercase mb-6"
              >
                {t.residentialSolar.hero.title1}<br />
                <span className="text-[#8dc63f]">{t.residentialSolar.hero.title2}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 mb-8 leading-relaxed"
              >
                {t.residentialSolar.hero.subtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 cta-hover">
                    {t.residentialSolar.hero.getFreeAssessment}
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </a>
                <a href="tel:18003809384">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#333333] rounded-xl font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    1 (800) 380-9384
                  </Button>
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">{t.residentialSolar.hero.nabcepCertified}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">{t.residentialSolar.hero.satisfactionGuaranteed}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">{t.residentialSolar.hero.expertTeam}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
                {t.residentialSolar.benefits.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.benefits.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t.residentialSolar.benefits.sectionDesc}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {translatedBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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

        {/* Solar Savings Calculator */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
                {t.residentialSolar.calculator.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.calculator.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t.residentialSolar.calculator.sectionDesc}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">{t.residentialSolar.calculator.selectProvince}</label>
                    <select 
                      value={calculatorProvince}
                      onChange={(e) => setCalculatorProvince(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]/20 outline-none"
                      data-testid="calculator-province"
                    >
                      <option value="ns">{t.residentialSolar.provinces.ns}</option>
                      <option value="nb">{t.residentialSolar.provinces.nb}</option>
                      <option value="bc">{t.residentialSolar.provinces.bc}</option>
                      <option value="pei">{t.residentialSolar.provinces.pei}</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-[#333333] mb-2 mt-6">{t.residentialSolar.calculator.monthlyElectricityCost}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input 
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]/20 outline-none"
                        placeholder="150"
                        data-testid="calculator-bill"
                      />
                    </div>
                    
                    <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" className="block mt-6">
                      <Button className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all">
                        <Calculator className="w-5 h-5 mr-2" />
                        {t.residentialSolar.calculator.getDetailedQuote}
                      </Button>
                    </a>
                    
                    <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-4 hover:bg-[#8dc63f]/20 transition-colors">
                      <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                      <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
                    </a>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-lg text-[#333333] mb-4">{t.residentialSolar.calculator.estimatedResults}</h3>
                    
                    <div className="mb-6">
                      <p className="text-sm text-slate-500">{t.residentialSolar.calculator.estimatedSystemSize}</p>
                      <p className="text-2xl font-black text-[#8dc63f]">{savings.systemSize}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">{t.residentialSolar.calculator.potentialSavings}</span>
                        <span className="font-bold text-[#8dc63f]">70-95%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">{t.residentialSolar.calculator.annualSavings}</span>
                        <span className="font-bold text-[#333333]">${savings.annualSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">{t.residentialSolar.calculator.paybackPeriod}</span>
                        <span className="font-bold text-[#333333]">{savings.paybackPeriod}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">{t.residentialSolar.calculator.availableRebate}</span>
                        <span className="font-bold text-[#8dc63f]">{savings.rebate}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-[#8dc63f]/10 rounded-lg px-4">
                        <span className="font-medium text-[#333333]">{t.residentialSolar.calculator.twentyFiveYearSavings}</span>
                        <span className="font-black text-xl text-[#8dc63f]">${savings.lifetimeSavings.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-400 mt-4">{t.residentialSolar.calculator.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Province Incentives */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
                {t.residentialSolar.incentives.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.incentives.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t.residentialSolar.incentives.sectionDesc}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {provinceIncentives.map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvince(prov.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                      selectedProvince === prov.id 
                        ? 'bg-[#8dc63f] text-white' 
                        : 'bg-white text-[#333333] hover:bg-slate-100'
                    }`}
                    data-testid={`province-tab-${prov.id}`}
                  >
                    {prov.id.toUpperCase()}
                  </button>
                ))}
              </div>
              
              <motion.div 
                key={selectedProvince}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-[#8dc63f]" />
                    <h3 className="text-2xl font-black text-[#333333]">
                      {provinceIncentives.find(p => p.id === selectedProvince)?.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {provinceIncentives.find(p => p.id === selectedProvince)?.incentives.map((incentive, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-[#333333] mb-1">{incentive.name}</h4>
                            <p className="text-slate-600 text-sm">{incentive.desc}</p>
                          </div>
                          <div className="bg-[#8dc63f]/10 px-4 py-2 rounded-lg flex-shrink-0">
                            <span className="font-bold text-[#8dc63f]">{incentive.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl">
                    <p className="text-sm text-slate-600">
                      <strong className="text-[#8dc63f]">{t.residentialSolar.incentives.note}</strong> {t.residentialSolar.incentives.noteText} {provinceIncentives.find(p => p.id === selectedProvince)?.name}.
                    </p>
                  </div>
                </div>
              </motion.div>
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
                {t.residentialSolar.installation.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.installation.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t.residentialSolar.installation.sectionDesc}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {translatedInstallationProcess.map((step, i) => (
                <ScrollStepItem key={i} step={step} index={i} total={translatedInstallationProcess.length} />
              ))}
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
                {t.residentialSolar.systemTypes.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.systemTypes.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {t.residentialSolar.systemTypes.sectionDesc}
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
                    <p className="text-sm text-slate-500">{t.residentialSolar.systemTypes.bestFor}</p>
                    <p className="font-medium text-[#333333]">{currentSolarType.bestFor}</p>
                  </div>
                  
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all">
                      {t.residentialSolar.systemTypes.getQuote} {currentSolarType.title} {t.residentialSolar.systemTypes.quote}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
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
                {t.residentialSolar.services.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.services.sectionTitleHighlight}</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t.residentialSolar.services.sectionDesc}
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
                  <Sun className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{t.residentialSolar.services.installationTitle}</h3>
                <ul className="space-y-3">
                  {t.residentialSolar.services.installationItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-6 bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl font-bold h-12 sm:h-14 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cta-hover">
                    {t.residentialSolar.services.getFreeQuote}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </motion.div>

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
                <h3 className="text-xl font-semibold text-white mb-4">{t.residentialSolar.services.maintenanceTitle}</h3>
                <ul className="space-y-3">
                  {translatedMaintenanceServices.map((service, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#333333] rounded-xl font-bold">
                  {t.residentialSolar.services.scheduleMaintenance}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>

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
                <h3 className="text-xl font-semibold text-white mb-4">{t.residentialSolar.services.batteryTitle}</h3>
                <ul className="space-y-3">
                  {t.residentialSolar.services.batteryItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#333333] rounded-xl font-bold">
                  {t.residentialSolar.services.learnAboutUpgrades}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
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
                {t.residentialSolar.whyChoose.sectionTitle}{" "}
                <span className="text-[#8dc63f]">{t.residentialSolar.whyChoose.sectionTitleHighlight}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {translatedWhyChooseGreenfoot.map((card, i) => (
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ServiceFAQSection 
          category="Residential Solar"
          title={t.residentialSolar.faq.title}
        />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-[#333333]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                {t.residentialSolar.cta.readyToStart}
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                {t.residentialSolar.cta.contactToday}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#7ab62f] text-white font-bold px-8 py-6 text-lg rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca', '_blank')}
                  data-testid="final-cta-quote"
                >
                  {t.residentialSolar.cta.getFreeAssessment}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold px-8 py-6 text-lg rounded-xl"
                  onClick={() => window.location.href = 'tel:1-888-447-3336'}
                  data-testid="final-cta-call"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  1-888-447-3336
                </Button>
              </div>
            </motion.div>
          </div>
        </section>


        <OtherServicesGrid exclude="residentialSolar" />

        <RelatedContent currentPath="/services/residential-solar" variant="compact" heading="Explore Related Topics" />

        <SiteFooter />
      </div>
    </>
  );
}
