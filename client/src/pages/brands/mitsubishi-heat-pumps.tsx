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

import mitsubishiLogo from "@assets/mitsubishi-logo.avif";
import mountainBg from "@assets/background_(1)_1767979414545.jpg";
import hmSeriesImage from "@assets/mitsubishi-hm-series.avif";
import fsSeriesImage from "@assets/mitsubishi-fs-series.avif";
import mxzSeriesImage from "@assets/mitsubishi-mxz-series.avif";
import zubaSeriesImage from "@assets/mitsubishi-zuba-series.avif";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "hm-series",
    name: "HM Series",
    sizes: "9K / 12K / 15K / 18K / 24K",
    image: hmSeriesImage,
    btuRange: "9000 - 24000 BTU/h",
    type: "Single-Zone Mini-Split Heat Pump",
    features: [
      "SEER up to 24.6, HSPF up to 13",
      "3D i-see sensor technology",
      "Whisper-quiet operation as low as 19 dB",
      "Anti-allergen washable filters"
    ],
    info: "The Mitsubishi HM Series features advanced 3D i-see sensor technology that detects occupancy and adjusts airflow for optimal comfort. With whisper-quiet operation as low as 19 dB, you'll barely notice it's running. Anti-allergen washable filters help maintain clean, healthy indoor air."
  },
  {
    id: "fs-series",
    name: "FS Series",
    sizes: "9K / 12K / 15K / 18K",
    image: fsSeriesImage,
    btuRange: "9000 - 18000 BTU/h",
    type: "Single-Zone Mini-Split Heat Pump",
    features: [
      "SEER2 up to 32.2, HSPF2 up to 11.9",
      "Heating operation down to -13°F",
      "Triple-action filtration system",
      "Hyper-Heating Inverter (H2i) technology"
    ],
    info: "The FS Series features Mitsubishi's renowned Hyper-Heating Inverter (H2i) technology, delivering reliable heating performance down to -13°F (-25°C). The triple-action filtration system captures allergens, odors, and contaminants for healthier indoor air quality."
  },
  {
    id: "mxz-series",
    name: "MXZ Series",
    sizes: "18K / 24K / 30K / 36K / 42K",
    image: mxzSeriesImage,
    btuRange: "18000 - 42000 BTU/h",
    type: "Multi-Zone Mini-Split Heat Pump",
    features: [
      "SEER up to 21, HSPF up to 13.5",
      "Supports 2-8 zones with mixed unit types",
      "Maximum line lengths up to 492 feet",
      "ENERGY STAR certified"
    ],
    info: "The MXZ Series is the ultimate multi-zone solution, supporting up to 8 indoor units from a single outdoor unit. Mix and match wall-mounted, floor-mounted, and ceiling cassette units for complete flexibility. With line lengths up to 492 feet, installation options are virtually unlimited."
  },
  {
    id: "fs-hyper-heat",
    name: "FS Hyper Heat Series",
    sizes: "18K / 24K / 30K / 36K / 42K",
    image: fsSeriesImage,
    btuRange: "18000 - 42000 BTU/h",
    type: "Multi-Zone Ductless Mini-Split",
    features: [
      "100% heating capacity at 5°F",
      "Supports 2-6 zones with premium features",
      "Maximum line lengths up to 230 feet",
      "Variable refrigerant flow technology"
    ],
    info: "The FS Hyper Heat Series delivers 100% heating capacity even at 5°F (-15°C), making it ideal for the coldest Canadian winters. Variable refrigerant flow technology ensures precise temperature control across all zones while maximizing energy efficiency."
  },
  {
    id: "zuba-series",
    name: "Zuba Hyper Heat Series",
    sizes: "2T / 2.5T / 3T / 3.5T",
    image: zubaSeriesImage,
    btuRange: "High-Efficiency Ducted System",
    type: "Central Ducted Heat Pump",
    features: [
      "Heating operation down to -30°C",
      "SEER up to 19, HSPF up to 11.2",
      "Energy savings up to 50% vs traditional",
      "100% heating capacity at -15°C"
    ],
    info: "The Zuba Hyper Heat Series is Mitsubishi's flagship ducted central heat pump, designed specifically for Canadian winters. With heating operation down to -30°C and 100% capacity at -15°C, it provides reliable whole-home comfort while reducing energy costs by up to 50%."
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
    footer: { timeline: "Single-Zone: 4-8 hours | Multi-Zone: 2-3 days" }
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

export default function MitsubishiHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Mitsubishi Electric Heat Pumps | Mini-Split & Zuba Central Systems | Greenfoot Energy</title>
        <meta name="description" content="What Mitsubishi Electric heat pump is right for your home? Discover HM, FS, MXZ, and Zuba Hyper Heat series. Cold climate operation to -30°C. Professional installation across Atlantic Canada and BC." />
        <meta name="keywords" content="Mitsubishi heat pumps, Mitsubishi Electric, Zuba heat pump, H2i technology, mini-split heat pump, hyper heat, cold climate heat pump Canada" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/mitsubishi-electric-heat-pumps" />
        
        <meta property="og:title" content="Mitsubishi Electric Heat Pumps | Reliable Comfort Every Season" />
        <meta property="og:description" content="What Mitsubishi Electric heat pump is right for your home? HM, FS, MXZ, and Zuba Hyper Heat series with cold climate operation to -30°C." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/brands/mitsubishi-electric-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mitsubishi Electric Heat Pumps | Greenfoot Energy" />
        <meta name="twitter:description" content="Premium heat pumps with Hyper-Heating Inverter technology for Canadian homes. Cold climate operation to -30°C." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Mitsubishi Electric Heat Pumps",
            "brand": {
              "@type": "Brand",
              "name": "Mitsubishi Electric"
            },
            "description": "Premium heat pump systems featuring Hyper-Heating Inverter technology for reliable comfort in Canadian climates down to -30°C",
            "category": "HVAC Equipment",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "CAD",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Greenfoot Energy Solutions",
                "url": "https://www.greenfootenergy.ca"
              }
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
                "name": "What Mitsubishi Electric heat pump is right for my home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mitsubishi offers several options: HM Series (9K-24K BTU) for single rooms with 3D i-see sensor technology, FS Series with Hyper-Heating for cold climates, MXZ Series (18K-42K BTU) for multi-zone homes up to 8 zones, and Zuba Hyper Heat for whole-home ducted systems operating to -30°C."
                }
              },
              {
                "@type": "Question",
                "name": "What is Mitsubishi's Hyper-Heating Inverter (H2i) technology?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "H2i technology enables Mitsubishi heat pumps to maintain 100% heating capacity at extremely low temperatures (down to -13°F to -30°C depending on model). This makes them ideal for Canadian winters where traditional heat pumps lose efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "Do Mitsubishi heat pumps work in cold Canadian winters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Mitsubishi's Hyper Heat models are specifically designed for cold climates. The Zuba series operates down to -30°C with 100% heating capacity at -15°C, making them among the best performing heat pumps for Canadian winters."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between ducted and ductless Mitsubishi systems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Zuba series are ducted central heat pump systems that use your home's ductwork. The HM, FS, and MXZ series are ductless mini-splits with wall-mounted indoor units. Both provide excellent efficiency, but ducted systems offer uniform whole-home comfort while ductless allows zone-by-zone control."
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
              { "@type": "ListItem", "position": 3, "name": "Mitsubishi Electric Heat Pumps", "item": "https://www.greenfootenergy.ca/brands/mitsubishi-electric-heat-pumps" }
            ]
          })}
        </script>
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={mountainBg} 
            alt="Mountain background" 
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
              <img src={mitsubishiLogo} alt="Mitsubishi Electric" className="h-16 md:h-20 mb-6" />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Heat Pumps for <span className="text-[#8dc63f]">Reliable Comfort</span> Every Season
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Smart, energy-efficient comfort solutions backed by Mitsubishi technology. Hyper-Heating Inverter technology for Canadian winters.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Hyper-Heating to -25°C
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> 10-Year Warranty
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-90"></div>
              <img 
                src={hmSeriesImage} 
                alt="Mitsubishi Electric Heat Pump" 
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
              What Mitsubishi Electric Heat Pump is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Smart, energy-efficient comfort solutions backed by Mitsubishi technology & efficiency
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
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/70 mt-4 leading-relaxed">
                          {currentSeries.info}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center relative">
                <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-75"></div>
                <motion.img
                  key={currentSeries.image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={currentSeries.image}
                  alt={currentSeries.name}
                  className="max-h-[400px] w-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Ducted vs Ductless Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              What's the Difference Between Ducted and Ductless Heat Pumps?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Understanding Zuba central systems vs. mini-split options
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-4">Central Head (Ducted) - Zuba Series</h3>
              <p className="text-slate-600 mb-6">
                The Zuba series are ducted central heat pump systems designed to replace or supplement traditional furnace and AC setups. They connect to your home's ductwork to distribute conditioned air uniformly throughout the house.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Operates down to -30°C with 100% capacity at -15°C</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Energy savings up to 50% vs traditional heating</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-4">Ductless (Mini-Split) - HM, FS, MXZ Series</h3>
              <p className="text-slate-600 mb-6">
                The HM, FS, and MXZ series are ductless systems. They use wall-mounted or floor-mounted indoor units that condition air directly in each zone—no ductwork required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Single zone or multi-zone (up to 8 indoor units)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Ideal for homes without existing ductwork or room-by-room control</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#8dc63f] uppercase tracking-widest text-sm font-bold mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              How Long Does Heat Pump Installation Take?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From consultation to comfort - typically 1-3 weeks from start to finish
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {installationSteps.map((step, index) => (
              <ScrollStepItem 
                key={step.step} 
                step={step} 
                index={index} 
                total={installationSteps.length} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Why Choose Greenfoot for Your Mitsubishi Heat Pump Installation?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Red Seal certified technicians, satisfaction guarantee, and dedicated service across Atlantic Canada & BC
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 bg-gradient-to-r from-[#8dc63f]/10 to-[#8dc63f]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Flexible Financing Options Available
            </h2>
            <p className="text-slate-600 text-lg mb-6">
              Make your Mitsubishi heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
            </p>
            <p className="text-slate-500 text-sm mb-8">
              Plus, check out available <a href="/provincial-incentives" className="text-[#8dc63f] hover:underline font-medium">government rebates</a> to save even more.
            </p>
            <a 
              href="/financing" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Learn About Financing <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <OtherBrandsGrid exclude="mitsubishi" />

      {/* Reviews */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready for Reliable Comfort with Mitsubishi Electric?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free in-home consultation and personalized quote for your Mitsubishi heat pump installation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 h-14 rounded-xl"
                asChild
              >
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer">
                  Schedule Free Consultation
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold text-lg px-8 h-14 rounded-xl"
                asChild
              >
                <a href="tel:18003809384">
                  <Phone className="mr-2 w-5 h-5" /> 1 (800) 380-9384
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedContent currentPath="/brands/mitsubishi-electric-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
