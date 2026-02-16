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

import geLogo from "@assets/ge-logo.svg";
import geHeroBg from "@assets/ge-hero-bg.avif";
import altitudeImage from "@assets/ge-altitude-minisplit.avif";
import endureImage from "@assets/ge-endure-minisplit.avif";
import connectImage from "@assets/ge-connect-central.avif";

import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const productSeries = [
  {
    id: "altitude",
    name: "Altitude Series Single-Zone",
    sizes: "9K / 12K / 15K / 18K / 24K",
    image: altitudeImage,
    btuRange: "9000 - 24000 BTU/h",
    type: "Single Zone Ductless Mini-Split",
    features: [
      "SEER Up To 23.5, HSPF Up To 11.0",
      "A-PAM DC Inverter Technology",
      "SmartHQ Wi-Fi Control",
      "3D Airflow With 60-Foot Air Supply"
    ],
    info: "The Altitude Series delivers exceptional single-zone heating and cooling with industry-leading efficiency ratings. The A-PAM DC inverter technology ensures precise temperature control while minimizing energy consumption. With SmartHQ Wi-Fi integration, you can control your comfort from anywhere using your smartphone."
  },
  {
    id: "endure",
    name: "Endure Series Multi-Zone",
    sizes: "18K / 24K / 36K",
    image: endureImage,
    btuRange: "18000 - 36000 BTU/h",
    type: "Multi-Zone Air Conditioner & Heat Pump",
    features: [
      "Multi-Zone Capability",
      "Extended Cold Climate Operation",
      "Extended Piping Length",
      "100% Rated Heating Capacity at 5°F"
    ],
    info: "Built for Canadian winters, the Endure Series maintains 100% heating capacity even at 5°F (-15°C). Multi-zone capability allows you to connect multiple indoor units to a single outdoor unit, providing independent temperature control throughout your home. Extended piping lengths offer flexible installation options."
  },
  {
    id: "connect",
    name: "Connect Series Ducted Central",
    sizes: "2T / 3T / 4T / 5T",
    image: connectImage,
    btuRange: "2-5 TON",
    type: "Central Air Conditioner & Heat Pump",
    features: [
      "SEER Up To 20, HSPF Up To 10.5",
      "Heating Operation Down To -22°F",
      "Over 600 AHRI-Certified Combinations",
      "Mid-Vapor Compressor Technology"
    ],
    info: "The Connect Series is designed for whole-home comfort with ducted central systems. Operating down to -22°F (-30°C), it's built for the coldest Canadian climates. With over 600 AHRI-certified combinations, our home comfort advisors can design the perfect system for your home's specific needs."
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

export default function GEHeatPumpsPage() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const currentSeries = productSeries[activeSeries];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>General Electric Heat Pumps | GE Mini-Split & Central Heat Pumps | Greenfoot Energy</title>
        <meta name="description" content="Discover GE heat pumps - Altitude, Endure, and Connect series. Professional installation across Atlantic Canada and BC. 10-year warranty, free quotes, financing available." />
        <meta name="keywords" content="GE heat pumps, General Electric heat pump, GE mini-split, GE Altitude, GE Endure, GE Connect, heat pump installation Canada" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/brands/general-electric-heat-pumps" />
      </Helmet>

      <SiteHeader />

      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={geHeroBg}
            alt="Modern home with GE heat pump installation"
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
              <img src={geLogo} alt="GE Appliances - A Haier Company" className="h-12 md:h-16 mb-6" />

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4 tracking-tight">
                Heat Pumps.
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#8dc63f] leading-[1.1] mb-8 tracking-tight">
                Efficient Home Solutions
              </h2>

              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Backed by a full suite of HVAC products. Professional installation with 10-year warranty.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> SmartHQ Wi-Fi Control
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                  <Check className="w-4 h-4 text-[#8dc63f]" /> Heating Down to -22°F
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
                  data-testid="button-hero-products"
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
                src={altitudeImage}
                alt="GE Altitude Series Heat Pump"
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
              What GE Heat Pump System is Right for Your Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Backed by a full suite of HVAC products for year-round comfort and efficiency
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {productSeries.map((series, index) => (
              <button
                key={series.id}
                onClick={() => {
                  setActiveSeries(index);
                  setExpandedInfo(null);
                }}
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
                  alt={`GE ${currentSeries.name}`}
                  className="max-h-[400px] w-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
                  data-testid={`img-series-${currentSeries.id}`}
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
                All Connect Series systems are ducted—they use a central air handler (sometimes called a "central head") that connects to ductwork to distribute air throughout the home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Single Zone Ducted:</strong> One outdoor unit connected to one central air handler, heating/cooling the whole house via ducts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700"><strong>Multi-Zone Ducted:</strong> One outdoor unit connected to multiple ducted air handlers, allowing for independent temperature control in different zones.</span>
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
                  <span className="text-slate-700">Can be single zone (one outdoor, one indoor) or multi-zone (one outdoor, multiple indoor heads).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Ideal for homes without existing ductwork or for adding heating/cooling to specific rooms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Altitude and Endure series are ductless mini-split systems.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Long Does Heat Pump Installation Take?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Greenfoot Energy's heat pump installation process typically takes 1-3 weeks from initial consultation to completed installation. Same-day installation is possible for single-zone systems once equipment arrives.
            </p>
          </motion.div>

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

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Greenfoot
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
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
              Make your GE heat pump installation affordable with our financing options. Get the comfort you deserve now and pay over time.
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

      <OtherBrandsGrid exclude="ge" />

      <ReviewsSection />

      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Year-Round Comfort with GE?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get a free in-home assessment and discover how GE heat pumps can improve your home's comfort and energy efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                asChild
              >
                <a href="https://scheduling.greenfootenergy.ca" target="_blank" rel="noopener noreferrer" data-testid="link-cta-free-quote">
                  Get Free Quote <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <a
                href="tel:18003809384"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 h-14 border border-white/30 rounded-xl flex items-center gap-2"
                data-testid="link-cta-phone"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedContent currentPath="/brands/general-electric-heat-pumps" variant="compact" heading="Explore More Heat Pump Resources" />
      <SiteFooter />
    </div>
  );
}
