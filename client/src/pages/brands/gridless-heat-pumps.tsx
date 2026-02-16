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

import gridlessLogo from "@assets/gridless-logo.svg";
import mountainBg from "@assets/background_(1)_1767979414545.jpg";
import singleZoneImage from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import multiZoneImage from "@assets/gridless-multizone.avif";
import centralImage from "@assets/gridless-central.webp";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "single-zone",
    name: "Single Zone Ductless",
    sizes: "9K / 12K / 15K / 18K / 24K",
    image: singleZoneImage,
    btuRange: "9000 - 24000 BTU/h",
    type: "Single Zone Mini-Split",
    features: [
      "SEER2 up to 25.5, HSPF2 up to 10.5",
      "Cold climate operation down to -30°C",
      "WiFi connectivity with energy monitoring",
      "Whisper-quiet operation"
    ],
    info: "The Gridless Single Zone Mini-Split delivers exceptional heating and cooling with industry-leading efficiency. Designed for Canadian winters, it operates reliably down to -30°C while maintaining whisper-quiet comfort. WiFi connectivity enables remote control and real-time energy monitoring from your smartphone."
  },
  {
    id: "multi-zone",
    name: "Multi-Zone Ductless",
    sizes: "18K / 24K / 36K",
    image: multiZoneImage,
    btuRange: "18000 - 36000 BTU/h",
    type: "Multi-Zone Mini-Split Heat Pump",
    features: [
      "2-4 zones with independent control",
      "100% heating capacity at -15°C",
      "Maximum line lengths up to 230 feet",
      "Energy savings up to 40% vs traditional systems"
    ],
    info: "The Gridless Multi-Zone system allows you to heat and cool multiple rooms with a single outdoor unit. Each indoor unit can be controlled independently, so everyone in your home enjoys their preferred temperature. With 100% heating capacity at -15°C and extended line lengths up to 230 feet, installation options are virtually limitless."
  },
  {
    id: "central",
    name: "Central Ducted",
    sizes: "12K / 24K / 36K / 48K / 60K",
    image: centralImage,
    btuRange: "12000 - 60000 BTU/h",
    type: "Central Air Conditioner & Heat Pump",
    features: [
      "SEER2 up to 17.5, HSPF2 up to 8.5",
      "Heating operation down to -25°C",
      "Variable-speed compressors with ECM motors",
      "Multi-position installation capability"
    ],
    info: "The Gridless Central Ducted system provides whole-home comfort using your existing ductwork. Variable-speed compressors and ECM motors ensure consistent temperatures and quiet operation. Operating down to -25°C, it's built for the coldest Canadian climates while offering significant energy savings over traditional furnaces."
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

export default function GridlessHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Gridless Heat Pumps | High-Efficiency Mini-Split & Central Heat Pumps | Greenfoot Energy</title>
        <meta name="description" content="What Gridless heat pump is right for your home? Discover single-zone, multi-zone, and central ducted systems with cold climate operation to -30°C. Professional installation across Atlantic Canada and BC." />
        <meta name="keywords" content="Gridless heat pumps, mini-split heat pump, cold climate heat pump, heat pump installation Canada, ductless heat pump, what heat pump do I need, how long does heat pump installation take" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/gridless-heat-pumps" />
        
        <meta property="og:title" content="Gridless Heat Pumps | Cold Climate Heating & Cooling Solutions" />
        <meta property="og:description" content="What Gridless heat pump is right for your home? Single-zone, multi-zone, and central ducted systems with cold climate operation to -30°C." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/brands/gridless-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gridless Heat Pumps | Greenfoot Energy" />
        <meta name="twitter:description" content="High-efficiency heating & cooling for Canadian homes. Cold climate operation to -30°C." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gridless Heat Pumps",
            "brand": {
              "@type": "Brand",
              "name": "Gridless"
            },
            "description": "High-efficiency heat pump systems for Canadian homes with cold climate operation down to -30°C",
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
                "name": "What Gridless heat pump system is right for my home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gridless offers three main systems: Single-Zone Ductless (9K-24K BTU) for individual rooms, Multi-Zone Ductless (18K-36K BTU) for 2-4 rooms with independent control, and Central Ducted (12K-60K BTU) for whole-home comfort using existing ductwork."
                }
              },
              {
                "@type": "Question",
                "name": "How long does Gridless heat pump installation take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Installation typically takes 1-3 weeks from initial consultation to completed installation. Single-zone systems take 4-8 hours, while multi-zone systems take 2-3 days once equipment arrives."
                }
              },
              {
                "@type": "Question",
                "name": "Do Gridless heat pumps work in cold Canadian winters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Gridless heat pumps are designed for Canadian climates with cold climate operation down to -30°C. Multi-zone systems maintain 100% heating capacity at -15°C."
                }
              },
              {
                "@type": "Question",
                "name": "Why choose Greenfoot for Gridless heat pump installation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Greenfoot offers Red Seal certified technicians, satisfaction guarantee, and dedicated service across Atlantic Canada and British Columbia. Professional installation includes free in-home consultation, permit handling, and comprehensive training."
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
              { "@type": "ListItem", "position": 3, "name": "Gridless Heat Pumps", "item": "https://www.greenfootenergy.ca/brands/gridless-heat-pumps" }
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
              <img src={gridlessLogo} alt="Gridless" className="h-12 md:h-16 mb-6 brightness-0 invert" />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Where Efficiency Meets <span className="text-[#8dc63f]">Freedom</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Year-round high-efficiency heating and cooling. Cold climate operation down to -30°C. Backed by a full suite of HVAC products.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Cold Climate to -30°C
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> WiFi Connected
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
                src={singleZoneImage} 
                alt="Gridless Heat Pump" 
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
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
              What Gridless Heat Pump System is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose from single-zone, multi-zone, or central ducted systems designed for Canadian climates
            </p>
          </div>

          {/* Product Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {productSeries.map((series, index) => (
              <button
                key={series.id}
                onClick={() => setActiveSeries(index)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
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
              Why Choose Greenfoot for Your Heat Pump Installation?
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
              Make your Gridless heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
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

      <OtherBrandsGrid exclude="gridless" />

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
              Ready for Year-Round Comfort?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free in-home consultation and personalized quote for your Gridless heat pump installation.
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

      <RelatedContent currentPath="/brands/gridless-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
