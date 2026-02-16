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

import daikinLogo from "@assets/daikin-logo-small.png";
import heroBg from "@assets/daikin-hero-bg.webp";
import rxlSeriesImage from "@assets/daikin-rxl-series.avif";
import auroraDuctedImage from "@assets/daikin-aurora-ducted.avif";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "single-zone",
    name: "RXL Series Single-Zone",
    sizes: "9K / 12K / 15K / 18K / 24K",
    image: rxlSeriesImage,
    btuRange: "9000 - 24000 BTU/h",
    type: "Single-Zone Mini Split",
    features: [
      "SEER up to 21, heating down to -25°C",
      "Hermetically sealed swing compressors",
      "Sound levels as low as 38 dB",
      "Maximum line lengths up to 98.5 feet"
    ],
    info: "The Daikin RXL Series Single-Zone is designed for targeted comfort in individual rooms or open-concept areas. With SEER ratings up to 21 and cold-climate operation down to -25°C, these units deliver efficient year-round heating and cooling with whisper-quiet operation as low as 38 dB."
  },
  {
    id: "multi-zone",
    name: "MXL Series Multi-Zone",
    sizes: "18K / 24K / 26K",
    image: rxlSeriesImage,
    btuRange: "18000 - 26000 BTU/h",
    type: "Multi-Zone Air Conditioning & Heat Pump",
    features: [
      "SEER up to 21.7, HSPF up to 15.9",
      "Enhanced capacity performance",
      "Over 1,000 indoor unit combinations",
      "100% heating at 5°F operation"
    ],
    info: "The Daikin MXL Series Multi-Zone system connects one outdoor unit to multiple indoor units throughout your home, providing independent temperature control in different rooms. With over 1,000 indoor unit combinations and 100% heating capacity at 5°F, it's the ultimate flexible comfort solution for Canadian homes."
  },
  {
    id: "ducted-central",
    name: "MXL Series Ducted Central",
    sizes: "24K / 36K / 48K / 60K",
    image: auroraDuctedImage,
    btuRange: "24000 - 60000 BTU/h",
    type: "Central Air Conditioner & Heat Pump",
    features: [
      "Seamless integration with existing ductwork",
      "High capacity for larger homes (up to 60,000 BTU/h)",
      "Quiet operation with indoor air handler",
      "Whole-home heating and cooling from a single system"
    ],
    info: "The Daikin MXL Series Ducted Central heat pump replaces or supplements your existing furnace by connecting to your home's ductwork. With capacities up to 60,000 BTU/h, it provides whole-home comfort through your existing vents—no wall-mounted units needed. Ideal for homeowners who want central air conditioning and heat pump efficiency in one system."
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
    desc: "Greenfoot's team consists of seasoned home comfort advisors, experienced HVAC & electrician technicians and customer service representatives."
  },
  {
    image: satisfactionImage,
    title: "Complete Satisfaction",
    desc: "Our goal is to make sure you are 100% fully satisfied with our quality of work and service. We strive to create lifetime relationships with our clients."
  },
  {
    image: dedicatedImage,
    title: "Dedicated Service",
    desc: "Our Service-Yeti technicians are dedicated to service. Enjoy peace of mind knowing that Greenfoot's dedicated service division can service, repair and maintain your system."
  }
];

export default function DaikinHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Daikin Heat Pumps | RXL & MXL Series | Greenfoot Energy Solutions</title>
        <meta name="description" content="What Daikin heat pump system is right for your home? Explore RXL single-zone, MXL multi-zone & ducted central heat pumps. SEER up to 21.7, cold-climate operation to -25°C. Professional installation across Atlantic Canada and BC." />
        <meta name="keywords" content="Daikin heat pumps, RXL Series, MXL Series, Daikin mini split, Daikin ducted, heat pump installation Canada, Daikin Aurora, cold climate heat pump" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/daikin-heat-pumps" />
        
        <meta property="og:title" content="Daikin Heat Pumps | RXL & MXL Series | Greenfoot Energy" />
        <meta property="og:description" content="What Daikin heat pump is right for your home? RXL single-zone, MXL multi-zone & ducted central systems with SEER up to 21.7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/brands/daikin-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Daikin Heat Pumps | Greenfoot Energy" />
        <meta name="twitter:description" content="Daikin RXL & MXL Series heat pumps with year-round high efficiency heating and cooling for Canadian homes." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Daikin Heat Pumps",
            "brand": {
              "@type": "Brand",
              "name": "Daikin"
            },
            "description": "Daikin RXL & MXL Series heat pump systems with SEER up to 21.7 and cold-climate operation for Canadian homes",
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
                "name": "What Daikin heat pump system is right for my home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Daikin offers three main options: RXL Series Single-Zone (9K-24K BTU) for individual rooms, MXL Series Multi-Zone (18K-26K BTU) for multiple rooms with independent temperature control, and MXL Series Ducted Central (24K-60K BTU) for whole-home comfort through existing ductwork."
                }
              },
              {
                "@type": "Question",
                "name": "Do Daikin heat pumps work in cold Canadian winters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Daikin RXL Series heat pumps operate efficiently down to -25°C, and the MXL Series provides 100% heating capacity at 5°F (-15°C), making them suitable for Canadian winter conditions across Atlantic Canada and British Columbia."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between ducted and ductless Daikin heat pumps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ducted (central) Daikin systems use an air handler connected to your home's existing ductwork to distribute air throughout the house. Ductless (mini-split) systems use individual wall-mounted units in each room with no ductwork required. Daikin offers both options to suit different home configurations."
                }
              },
              {
                "@type": "Question",
                "name": "What warranty comes with Daikin heat pumps from Greenfoot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Daikin heat pumps installed by Greenfoot Energy come with Greenfoot's own 10-year warranty standard that goes above and beyond manufacturer coverage, ensuring your peace of mind with professional support and service."
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
              { "@type": "ListItem", "position": 3, "name": "Daikin Heat Pumps", "item": "https://www.greenfootenergy.ca/brands/daikin-heat-pumps" }
            ]
          })}
        </script>
      </Helmet>

      <SiteHeader />

      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Modern home with Daikin heat pump installation" 
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
              <img src={daikinLogo} alt="Daikin" className="h-12 md:h-16 mb-6" />
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 tracking-tight">
                Heat Pumps.
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#8dc63f] leading-[1.1] mb-8 tracking-tight">
                Reliable Comfort
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Year-round high efficiency heating and cooling, backed by a full suite of HVAC products.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Heating Down to -25°C
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
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" data-testid="link-hero-free-quote">
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
                src={rxlSeriesImage} 
                alt="Daikin RXL Series Heat Pump" 
                className="relative w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="products" className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              What Daikin Heat Pump System is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Year-round high efficiency heating and cooling backed by a full suite of HVAC products
            </p>
          </div>

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
                data-testid={`tab-${series.id}`}
              >
                {series.name}
              </button>
            ))}
          </div>

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
                  <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" data-testid="link-product-free-quote">
                    Get a Free Quote <ChevronRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>

                <div className="mt-6">
                  <button
                    onClick={() => setExpandedInfo(expandedInfo === currentSeries.id ? null : currentSeries.id)}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold"
                    data-testid={`button-expand-${currentSeries.id}`}
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
                The RXL and MXL Series use a single, centrally located air handling unit to condition air. This unit utilizes the home's existing ductwork and vents to distribute heated or cooled air evenly throughout every room, ensuring consistent whole-home comfort.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Single Zone Ducted:</strong> One outdoor unit connected to one central air handler, heating/cooling the whole house or a large area via ducts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Multi-Zone Ducted:</strong> One outdoor unit connected to multiple ducted air handlers, allowing for independent temperature control in different zones or floors, all using ductwork.</span>
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
                Uses individual "heads" (wall, floor, or ceiling units) in each room—no ductwork required. Can be single zone (one outdoor, one indoor) or multi-zone (one outdoor, multiple indoor heads).
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Perfect for homes without existing ductwork or for room-by-room temperature control</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Daikin RXL single-zone and MXL multi-zone options available for ductless configurations</span>
                </li>
              </ul>
              <p className="text-sm text-slate-500 mt-6">
                Looking for other ductless brands? Check out our <a href="/brands/gridless-heat-pumps" className="text-[#8dc63f] hover:underline">Gridless mini-split systems</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Why Choose Greenfoot for Your Daikin Heat Pump Installation?
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

      <section className="py-16 bg-gradient-to-r from-[#8dc63f]/10 to-[#8dc63f]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Flexible Financing Options Available
            </h2>
            <p className="text-slate-600 text-lg mb-6">
              Make your Daikin heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
            </p>
            <p className="text-slate-500 text-sm mb-8">
              Plus, check out available <a href="/provincial-incentives" className="text-[#8dc63f] hover:underline font-medium">government rebates</a> to save even more.
            </p>
            <a 
              href="/financing" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
              data-testid="link-financing"
            >
              Learn About Financing <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <OtherBrandsGrid exclude="daikin" />

      <ReviewsSection />

      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready for Year-Round Comfort with Daikin?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free in-home consultation and personalized quote for your Daikin heat pump installation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 h-14 rounded-xl"
                asChild
              >
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" data-testid="link-cta-consultation">
                  Schedule Free Consultation
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold text-lg px-8 h-14 rounded-xl"
                asChild
              >
                <a href="tel:18003809384" data-testid="link-cta-phone">
                  <Phone className="mr-2 w-5 h-5" /> 1 (800) 380-9384
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedContent currentPath="/brands/daikin-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
