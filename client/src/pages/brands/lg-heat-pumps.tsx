import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Phone, Check, ChevronRight, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { TrustStrip } from "@/components/ui/trust-strip";
import { OtherBrandsGrid } from "@/components/ui/other-brands-grid";
import { RelatedContent } from "@/components/ui/related-content";
import { useState } from "react";

import lgLogo from "@assets/lg-logo.avif";
import lgPrestige from "@assets/lg-prestige.png";
import lgDualCool from "@assets/lg-dual-cool.png";
import lgArtCool from "@assets/lg-art-cool-mirror.png";
import lgMultiHyperHeat from "@assets/lg-multi-hyper-heat.png";
import lgPerks from "@assets/lg-perks.png";
import lgHeroBg from "@assets/lg-hero-bg.webp";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "prestige-series",
    name: "Prestige Series",
    sizes: "9K / 12K / 15K / 24K",
    image: lgPrestige,
    btuRange: "9000 - 24000 BTU/h",
    type: "Single-Zone Mini-Split Heat Pump",
    features: [
      "SEER up to 27.5, HSPF up to 13",
      "Hyper heating operation down to -30°C",
      "ThinQ smart connectivity",
      "Whisper-quiet operation as low as 17 dB"
    ],
    info: "The LG Prestige Series represents the pinnacle of mini-split technology with industry-leading efficiency ratings. With hyper heating operation down to -30°C, it's perfectly suited for Canada's coldest winters. ThinQ smart connectivity allows control from anywhere via your smartphone."
  },
  {
    id: "dual-cool-series",
    name: "Dual Cool Series",
    sizes: "9K / 12K / 18K / 24K",
    image: lgDualCool,
    btuRange: "9000 - 24000 BTU/h",
    type: "Central Air Conditioner & Heat Pump",
    features: [
      "40% faster cooling, 70% energy savings",
      "Dual Inverter Compressor technology",
      "ThinQ app with voice control compatibility",
      "R32 refrigerant with zero ozone depletion"
    ],
    info: "The Dual Cool Series features LG's advanced Dual Inverter Compressor for 40% faster cooling and up to 70% energy savings compared to conventional systems. Compatible with voice assistants and the ThinQ app for seamless smart home integration."
  },
  {
    id: "art-cool-series",
    name: "Art Cool Mirror",
    sizes: "9K / 12K / 15K / 24K",
    image: lgArtCool,
    btuRange: "9000 - 24000 BTU/h",
    type: "Central Air Conditioner & Heat Pump",
    features: [
      "-25°C cold climate rated",
      "Elegant mirror finish design",
      "WiFi connected with smart controls",
      "12 years parts and 10 year labour warranty"
    ],
    info: "The Art Cool Mirror Series combines stunning aesthetics with powerful performance. Its elegant mirror finish blends seamlessly into modern interiors while delivering reliable heating down to -25°C. Backed by LG's comprehensive 12-year parts warranty."
  },
  {
    id: "multi-hyper-heat",
    name: "Multi Hyper Heat",
    sizes: "18K / 24K / 30K / 36K",
    image: lgMultiHyperHeat,
    btuRange: "9000 - 48000 BTU/h",
    type: "Multi-Zone Heat Pump System",
    features: [
      "100% rated heating capacity at 5°F (-15°C)",
      "SEER up to 21, HSPF up to 11",
      "Maximum line lengths up to 475 feet",
      "LGRED Heat technology"
    ],
    info: "The Multi Hyper Heat Series delivers 100% heating capacity even at 5°F (-15°C) thanks to LGRED Heat technology. With line lengths up to 475 feet, it offers exceptional installation flexibility for multi-zone applications throughout your home."
  },
  {
    id: "hyper-heat-central",
    name: "Hyper Heat Central",
    sizes: "18K / 24K / 30K / 36K",
    image: lgMultiHyperHeat,
    btuRange: "9000 - 48000 BTU/h",
    type: "Central Ducted Heat Pump",
    features: [
      "SEER up to 27.5, HSPF up to 13.5",
      "Heating operation down to -25°C",
      "Energy savings up to 50% vs traditional",
      "LGRED Heat technology with smart controls"
    ],
    info: "The Hyper Heat Central Series is LG's flagship ducted solution for whole-home comfort. With heating operation down to -25°C and energy savings up to 50% compared to traditional HVAC systems, it's the smart choice for Canadian homes with existing ductwork."
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free In-Home Heat Pump Consultation",
    intro: "A certified advisor visits your home to:",
    details: [
      "Assess heating/cooling requirements (room-by-room load calculation)",
      "Evaluate electrical capacity (dedicated 240V circuit check)",
      "Identify optimal indoor and outdoor unit locations",
      "Discuss equipment options and brand preferences",
      "Provide detailed written quote with specs and pricing",
      "Explain available rebates and financing options"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Quote Review & Equipment Ordering",
    intro: "Once you approve the quote:",
    details: [
      "Equipment ordered from supplier (typically in stock)",
      "Installation date scheduled based on your availability",
      "Electrical permit obtained if required",
      "Pre-installation checklist provided"
    ],
    footer: { timeline: "3-7 business days" }
  },
  {
    step: 3,
    title: "Professional Heat Pump Installation",
    intro: "Certified technicians handle everything from mounting to commissioning:",
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
      "Remote control and ThinQ app setup",
      "Temperature settings and energy-saving features",
      "Filter cleaning demonstration",
      "Maintenance schedule review"
    ],
    footer: { timeline: "Included with installation" }
  },
  {
    step: 5,
    title: "Enjoy Lasting Comfort",
    intro: "Your home stays warm in winter, cool in summer, with lower energy costs and ongoing support from our team.",
    details: []
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Pride in Our Work",
    desc: "We take pride with every Greenfoot install. Our home comfort advisors recommend only the best solutions for your home, budget and needs."
  },
  {
    image: experienceImage,
    title: "Experience",
    desc: "Greenfoot's team consists of seasoned home comfort specialists with decades of combined experience in heat pump installation."
  },
  {
    image: satisfactionImage,
    title: "Satisfaction Guaranteed",
    desc: "Your comfort is our priority. We stand behind every installation with our satisfaction guarantee."
  },
  {
    image: dedicatedImage,
    title: "Dedicated Service Team",
    desc: "Our service team is ready to help with maintenance, repairs, and any questions you may have."
  }
];

export default function LGHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>LG Heat Pumps | Prestige, Art Cool & Hyper Heat Series | Greenfoot Energy</title>
        <meta name="description" content="What LG heat pump system is right for your home? Explore Prestige, Dual Cool, Art Cool, and Hyper Heat series. LGRED Heat technology for -30°C operation. Professional installation across Atlantic Canada and BC." />
        <meta name="keywords" content="LG heat pumps, LG mini-split, LGRED Heat, LG Prestige, LG Art Cool, LG Dual Inverter, cold climate heat pump Canada, ThinQ heat pump" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/lg-heat-pumps" />
        
        <meta property="og:title" content="LG Heat Pumps | Smart Comfort, Exceptional Efficiency" />
        <meta property="og:description" content="What LG heat pump is right for your home? Prestige, Dual Cool, Art Cool, and Hyper Heat series with LGRED Heat technology for -30°C operation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/brands/lg-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LG Heat Pumps | Smart Comfort for Canadian Homes" />
        <meta name="twitter:description" content="Discover LG heat pumps with ThinQ smart connectivity and LGRED Heat technology. Cold climate operation to -30°C." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "LG Heat Pumps",
            "brand": {
              "@type": "Brand",
              "name": "LG"
            },
            "description": "LG heat pump systems including Prestige, Dual Cool, Art Cool, and Hyper Heat series for Canadian homes. LGRED Heat technology for cold climate operation.",
            "category": "Heat Pump Systems",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "CAD",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Greenfoot Energy Solutions"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1850"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is LGRED Heat technology?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LGRED Heat is LG's cold climate heating technology that maintains 100% heating capacity at temperatures as low as 5°F (-15°C) and continues operating down to -30°C. This makes LG heat pumps ideal for Canadian winters."
                }
              },
              {
                "@type": "Question",
                "name": "Can I control my LG heat pump with my phone?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, LG heat pumps feature ThinQ smart connectivity, allowing you to control your system from anywhere using the LG ThinQ app on your smartphone. Many models also support voice control through Google Assistant and Amazon Alexa."
                }
              },
              {
                "@type": "Question",
                "name": "How quiet are LG heat pumps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LG heat pumps are among the quietest on the market. The Prestige Series operates as low as 17 dB—quieter than a whisper. Dual Inverter Compressor technology reduces noise and vibration for peaceful operation."
                }
              },
              {
                "@type": "Question",
                "name": "What warranty comes with LG heat pumps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LG heat pumps come with an industry-leading warranty. The Art Cool series includes 12 years parts and 10 years labour warranty. All systems are backed by Greenfoot Energy's installation guarantee."
                }
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.greenfootenergy.ca" },
              { "@type": "ListItem", "position": 2, "name": "Brands", "item": "https://www.greenfootenergy.ca/brands" },
              { "@type": "ListItem", "position": 3, "name": "LG Heat Pumps", "item": "https://www.greenfootenergy.ca/brands/lg-heat-pumps" }
            ]
          })}
        </script>
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={lgHeroBg} 
            alt="Modern home exterior at twilight showcasing LG heat pump comfort" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={lgLogo} alt="LG" className="h-16 md:h-20 mb-6" />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Year-Round <span className="text-[#8dc63f]">High Efficiency</span> Heating & Cooling
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Smart, energy-efficient comfort backed by LG's innovative technology. ThinQ connectivity and LGRED Heat for Canadian winters.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> LGRED° Heat to -30°C
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> ThinQ Smart Control
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Free In-Home Quotes
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  View Products
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-sm sm:text-lg px-6 sm:px-10 h-12 sm:h-14 rounded-xl"
                  asChild
                >
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                    Get Free Quote
                  </a>
                </Button>
              </div>
              
              <a 
                href="/financing" target="_blank" rel="noopener noreferrer" 
                className="block mt-6 bg-[#8dc63f]/15 border-l-4 border-[#8dc63f] rounded-r-lg px-5 py-4 hover:bg-[#8dc63f]/25 transition-colors max-w-md"
              >
                <p className="text-[#8dc63f] font-bold text-lg mb-1">Flexible Financing Available</p>
                <p className="text-white/80 text-sm flex items-center gap-1">
                  Learn more about our financing options <ChevronRight className="w-4 h-4" />
                </p>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-90"></div>
              <img 
                src={lgPrestige} 
                alt="LG Prestige Heat Pump" 
                className="relative w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Product Showcase */}
      <section id="products" className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              What LG Heat Pump is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Smart, energy-efficient comfort solutions backed by LG's innovative technology
            </p>
          </div>

          {/* Product Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {productSeries.map((series, index) => (
              <button
                key={series.id}
                onClick={() => setActiveSeries(index)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeSeries === index
                    ? "bg-[#8dc63f] text-[#333333]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {series.name}
              </button>
            ))}
          </div>

          {/* Active Product */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSeries.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <p className="text-[#8dc63f] uppercase tracking-wider text-sm font-bold mb-2">
                  {currentSeries.sizes}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
                  {currentSeries.name}
                </h3>
                <p className="text-white/60 mb-6">{currentSeries.type}</p>

                <div className="bg-white/5 rounded-2xl p-6 mb-6">
                  <p className="text-[#8dc63f] font-bold mb-4">{currentSeries.btuRange}</p>
                  <ul className="space-y-3">
                    {currentSeries.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold rounded-xl"
                  asChild
                >
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                    Get a Free Quote <ChevronRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>

                {/* Expandable Info */}
                <div className="mt-6">
                  <button
                    onClick={() => setExpandedInfo(expandedInfo === currentSeries.id ? null : currentSeries.id)}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold"
                  >
                    {expandedInfo === currentSeries.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> Learn More About {currentSeries.name}
                      </>
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedInfo === currentSeries.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-white/70 leading-relaxed">
                          {currentSeries.info}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-90"></div>
                  <img 
                    src={currentSeries.image} 
                    alt={currentSeries.name} 
                    className="relative w-full max-w-md drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* LG Perks Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src={lgPerks} 
              alt="LG Heat Pump Features - WiFi, Smart Home, ENERGY STAR, 10-Year Warranty" 
              className="max-w-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Ducted vs Ductless */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-4">
              Ducted vs. Ductless:{" "}
              <span className="text-[#8dc63f]">Which System Is Right for You?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-black text-[#333333] mb-4">Central Head (Ducted) Systems</h3>
              <p className="text-slate-600 mb-6">
                LG's Hyper Heat Central series uses a central air handler connected to ductwork to distribute air throughout the home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Single Zone Ducted:</strong> One outdoor unit connected to one central air handler</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Multi-Zone Ducted:</strong> One outdoor unit connected to multiple ducted air handlers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Ideal for homes with existing ductwork</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-black text-[#333333] mb-4">Ductless (Mini-Split) Systems</h3>
              <p className="text-slate-600 mb-6">
                LG's Prestige, Dual Cool, and Art Cool series use individual wall-mounted units—no ductwork required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">No ductwork required—easier installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Individual temperature control per room</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Single or multi-zone configurations available</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              How Long Does LG Heat Pump{" "}
              <span className="text-[#8dc63f]">Installation Take?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From initial consultation to completed installation, Greenfoot Energy's heat pump installation process typically takes 1-3 weeks. Same-day installation is possible for single-zone systems once equipment arrives.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {installationSteps.map((stepData, index) => (
              <ScrollStepItem
                key={stepData.step}
                step={stepData}
                index={index}
                total={installationSteps.length}
              />
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Why Choose{" "}
              <span className="text-[#8dc63f]">Greenfoot Energy?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Flexible Financing for Your{" "}
              <span className="text-[#8dc63f]">LG Heat Pump</span>
            </h2>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Make your LG heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
            </p>
            <p className="text-white/50 text-sm mb-8">
              Plus, check out available <a href="/provincial-incentives" className="text-[#8dc63f] hover:underline font-medium">government rebates</a> to save even more.
            </p>
            <a 
              href="/financing" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Explore Financing Options
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <OtherBrandsGrid exclude="lg" />

      <ReviewsSection />

      <RelatedContent currentPath="/brands/lg-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
