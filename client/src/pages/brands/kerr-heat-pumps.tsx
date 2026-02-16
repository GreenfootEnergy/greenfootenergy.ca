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

import kerrLogo from "@assets/kerr-logo.avif";
import heroBg from "@assets/modern-house_1770047548595.avif";
import singleZoneImage from "@assets/kerr-single-zone-kcd.webp";
import centralImage from "@assets/kerr-central.avif";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "single-zone",
    name: "Single-Zone KCD Series",
    sizes: "24K / 30K / 36K / 48K",
    image: singleZoneImage,
    btuRange: "24000 - 48000 BTU/h",
    type: "Single Zone Ducted Heat Pump",
    features: [
      "Residential HVAC system",
      "High efficiency performance",
      "InfoHub (optional)",
      "7-year warranty on parts & labor"
    ],
    info: "The Kerr Single-Zone KCD Series is a complete ducted heat pump system that uses a central air handler connected to your home's ductwork. This system heats and cools your entire home or a large area through your existing duct system, providing consistent comfort throughout."
  },
  {
    id: "multi-zone",
    name: "Multi-Zone KCD Series",
    sizes: "24K / 30K / 36K / 48K",
    image: centralImage,
    btuRange: "24000 - 48000 BTU/h",
    type: "Multi-Zone Central Heat Pump",
    features: [
      "SEER up to 20, HSPF up to 12",
      "Hyper heat performance down to -22°F",
      "Fully modulating inverter-driven compressors",
      "Optional WiFi connectivity with 15kW heat kits"
    ],
    info: "The Kerr Multi-Zone KCD Series connects one outdoor unit to multiple ducted air handlers, allowing independent temperature control in different zones or floors. With hyper heat performance down to -22°F (-30°C), it's designed for the coldest Canadian winters while maintaining exceptional efficiency."
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

export default function KerrHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Kerr Heat Pumps | KCD Series Ducted Central Heat Pumps | Greenfoot Energy</title>
        <meta name="description" content="What Kerr KCD Series heat pump is right for your home? Discover single-zone and multi-zone ducted central systems with hyper heat performance to -22°F. Professional installation across Atlantic Canada and BC." />
        <meta name="keywords" content="Kerr heat pumps, KCD Series, ducted heat pump, central heat pump, hyper heat, heat pump installation Canada, whole house heat pump" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/kerr-heat-pumps" />
        
        <meta property="og:title" content="Kerr Heat Pumps | KCD Series Ducted Central Heat Pumps" />
        <meta property="og:description" content="What Kerr KCD Series heat pump is right for your home? Single-zone and multi-zone ducted central systems with hyper heat performance to -22°F." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/brands/kerr-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kerr Heat Pumps | Greenfoot Energy" />
        <meta name="twitter:description" content="KCD Series ducted central heat pumps with hyper heat performance to -22°F for Canadian homes." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Kerr KCD Series Heat Pumps",
            "brand": {
              "@type": "Brand",
              "name": "Kerr"
            },
            "description": "KCD Series ducted central heat pump systems with hyper heat performance down to -22°F for Canadian homes",
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
                "name": "What is the difference between ducted and ductless heat pumps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ducted (central head) systems use a central air handler connected to ductwork to distribute air throughout the home. Ductless (mini-split) systems use individual heads in each room with no ductwork required. Kerr KCD Series are all ducted systems designed for whole-home comfort."
                }
              },
              {
                "@type": "Question",
                "name": "What Kerr KCD Series heat pump is right for my home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kerr offers two main KCD Series options: Single-Zone Ducted (24K-48K BTU) for heating/cooling your whole house via ducts, and Multi-Zone Ducted (24K-48K BTU) for independent temperature control in different zones or floors using your existing ductwork."
                }
              },
              {
                "@type": "Question",
                "name": "Do Kerr heat pumps work in cold Canadian winters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Kerr KCD Series heat pumps feature hyper heat performance that operates down to -22°F (-30°C), making them ideal for the coldest Canadian winters while maintaining high efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "What warranty comes with Kerr heat pumps from Greenfoot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kerr heat pumps come with a 7-year warranty on parts and labor, and Greenfoot offers a 10-year extended warranty that goes above and beyond standard coverage for your peace of mind."
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
              { "@type": "ListItem", "position": 3, "name": "Kerr Heat Pumps", "item": "https://www.greenfootenergy.ca/brands/kerr-heat-pumps" }
            ]
          })}
        </script>
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Modern home with Kerr heat pump installation" 
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
              <img src={kerrLogo} alt="Kerr" className="h-16 md:h-20 mb-6" />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Year-Round <span className="text-[#8dc63f]">Efficiency & Reliability</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                KCD Series smart energy for every home. Hyper heat performance down to -22°F with whole-house comfort.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Heating Down to -22°F
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
                src={centralImage} 
                alt="Kerr KCD Series Heat Pump" 
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
              What Kerr KCD Series Heat Pump is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Smart energy solutions backed by Kerr's Central Whole House Hyper Heat System
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

      {/* Ducted vs Ductless Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              What's the Difference Between Ducted and Ductless Heat Pumps?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Understanding central head vs. mini-split systems for your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-4">Central Head (Ducted) Systems</h3>
              <p className="text-slate-600 mb-6">
                All KCD Series systems are ducted—they use a central air handler that connects to ductwork to distribute air throughout your home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Single Zone Ducted:</strong> One outdoor unit connected to one central air handler, heating/cooling the whole house via ducts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Multi-Zone Ducted:</strong> One outdoor unit connected to multiple ducted air handlers for independent temperature control in different zones.</span>
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
              <h3 className="text-2xl font-black text-slate-900 mb-4">Ductless (Mini-Split) Systems</h3>
              <p className="text-slate-600 mb-6">
                Uses individual "heads" (wall, floor, or ceiling units) in each room—no ductwork required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Can be single zone (one outdoor, one indoor) or multi-zone (one outdoor, multiple indoor heads)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Ideal for homes without existing ductwork or for room-by-room control</span>
                </li>
              </ul>
              <p className="text-sm text-slate-500 mt-6">
                Looking for ductless? Check out our <a href="/brands/gridless-heat-pumps" className="text-[#8dc63f] hover:underline">Gridless mini-split systems</a>.
              </p>
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
              Why Choose Greenfoot for Your Kerr Heat Pump Installation?
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
              Make your Kerr heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
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

      <OtherBrandsGrid exclude="kerr" />

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
              Ready for Year-Round Comfort with Kerr?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free in-home consultation and personalized quote for your Kerr KCD Series heat pump installation.
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

      <RelatedContent currentPath="/brands/kerr-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
