import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronRight, Star, Check, Sun, Zap, Battery, DollarSign, Leaf, Shield, Wrench, Settings, Home, Building, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { ServiceFAQSection } from "@/components/seo/ServiceFAQSection";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";

import solarHeroBg from "@assets/solar-crew-installing-panels.webp";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import solarProfessionalsImage from "@assets/solar-professionals-team.webp";
import satisfactionImage from "@assets/satisfaction.webp";
import solarCrewVanImage from "@assets/solar-crew-van.webp";
import solarCrewWorkingImage from "@assets/solar-crew-working.webp";
import solarIcon from "@assets/68874c9990cff00613a869bb_solar_1769183473100.avif";
import heroProductImage from "@assets/solar_crew_in_sun_1769033971601.avif";

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

const whyChooseSolar = [
  {
    image: solarProfessionalsImage,
    title: "Experienced Solar Professionals",
    desc: "Our team of certified solar installers has years of experience in the industry. We specialize in residential and commercial solar installations across Canada."
  },
  {
    image: experienceImage,
    title: "High-Quality Products",
    desc: "We utilize top-tier solar panels, inverters, and equipment from leading manufacturers. Our partnerships ensure you get reliable, efficient solar technology."
  },
  {
    image: solarCrewWorkingImage,
    title: "Seamless Installation Experience",
    desc: "We prioritize customer satisfaction and provide a stress-free installation experience. From permits to power-up, we handle everything."
  },
  {
    image: solarCrewVanImage,
    title: "Competitive Pricing & Financing",
    desc: "We offer competitive pricing with transparent upfront estimates. 0% financing available to make solar affordable for every homeowner."
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Professional Solar Assessment",
    intro: "Our certified Home Comfort Advisor visits your property to:",
    details: [
      "Analyze roof orientation, pitch, and shading conditions",
      "Assess electrical panel capacity and upgrade requirements",
      "Review energy consumption patterns and utility bills",
      "Design optimal solar system for your specific needs",
      "Provide detailed written quote with specs and pricing",
      "Identify available rebates and incentive programs"
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
      "Submit interconnection applications to provincial utility providers",
      "Manage net metering agreements and technical reviews",
      "Ensure all designs comply with regional electrical codes",
      "Track all approvals to keep your project moving forward"
    ],
    footer: { timeline: "4-8 Weeks" }
  },
  {
    step: 3,
    title: "Custom Installation Planning",
    intro: "Our lead electrician finalizes your solar design:",
    details: [
      "Confirm optimal panel placement locations",
      "Discuss and select optimal battery storage solutions based on energy needs",
      "Plan electrical integration points",
      "Determine inverter and equipment locations",
      "Address unique property characteristics",
      "Create tailored installation blueprint"
    ],
    footer: { timeline: "1-2 Business days" }
  },
  {
    step: 4,
    title: "Expert Solar Installation",
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
    footer: { timeline: "2-4 Weeks" }
  }
];

export default function SolarPage() {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

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

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Solar Panel Installation Canada | Greenfoot Energy</title>
        <meta name="description" content="Professional solar panel installation across Canada. Save up to 95% on electricity bills. Free assessment, 0% financing, certified installers. Get your quote today." />
        <meta name="keywords" content="solar panel installation, solar energy Canada, residential solar, commercial solar, solar panels, net metering, solar battery storage, renewable energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/solar" />
        
        <meta property="og:title" content="Solar Panel Installation | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Professional solar installation across Canada. Save up to 95% on electricity. Free assessment available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/solar" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Panel Installation | Greenfoot Energy" />
        <meta name="twitter:description" content="Professional solar installation across Canada. Save up to 95% on electricity bills." />
      </Helmet>

      <SiteHeader />

      {/* Booking Modal */}
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
                className="block w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold py-4 px-6 rounded-xl text-center transition-colors"
              >
                Book a Solar Quote
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold py-4 px-6 rounded-xl text-center transition-colors"
              >
                Book a Service Call
              </a>
              <a 
                href="https://scheduling.greenfootenergy.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f]/10 font-bold py-4 px-6 rounded-xl text-center transition-colors"
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
            alt="Solar panel installation crew working on rooftop" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/98 to-white/80 md:via-white/95 md:to-white/30"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Mobile Product Image - Shows above content on small screens */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:hidden flex justify-center items-center -mb-4"
            >
              <div className="relative">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-1 border border-[#8dc63f]/30 rounded-2xl"></div>
                {/* Corner accents */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-xl"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#8dc63f] rounded-br-xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Solar Installation Team" 
                  className="w-64 sm:w-80 h-auto object-contain rounded-2xl relative z-10"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2))' }}
                />
              </div>
            </motion.div>

            {/* Left Content */}
            <div className="max-w-xl lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Rating Badge */}
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
                  Solar Energy<br />
                  <span className="text-[#8dc63f]">System Installation</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 mb-6 max-w-lg">
                  Learn how you can SAVE up to 95% off your power bill!* Professional solar installation for homes and businesses across Canada.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a 
                    href="tel:18003809384"
                    className="bg-[#333333] hover:bg-[#222222] text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    1 (800) 380-9384
                  </a>
                  <Button 
                    size="lg" 
                    className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                    data-testid="button-get-quote"
                    onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  >
                    Get Free Quote
                  </Button>
                </div>

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
                    <span className="text-xs sm:text-sm font-semibold text-[#333333] text-center sm:text-left">Red Seal Certified</span>
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
                {/* Decorative border frame */}
                <div className="absolute -inset-4 border-2 border-[#8dc63f] rounded-3xl"></div>
                <div className="absolute -inset-2 border border-[#8dc63f]/30 rounded-2xl"></div>
                {/* Corner accents */}
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-4 border-l-4 border-[#8dc63f] rounded-tl-2xl"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-t-4 border-r-4 border-[#8dc63f] rounded-tr-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-4 border-l-4 border-[#8dc63f] rounded-bl-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-4 border-r-4 border-[#8dc63f] rounded-br-2xl"></div>
                <motion.img 
                  src={heroProductImage} 
                  alt="Solar Installation Team" 
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
              Is Solar Right for Your{" "}
              <span className="text-[#8dc63f]">Home or Business?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Yes! Solar energy lowers your electricity bills by up to 95% while reducing your carbon footprint. We specialize in designing and installing high-quality solar energy systems for homes and businesses across Canada.
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
                    <h3 className="text-2xl font-bold text-[#333333]">Residential Solar Systems</h3>
                    <p className="text-slate-600">Power your home with clean energy</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Experience the power of clean energy with Solar. We help you harness the power of the sun to reduce your reliance on traditional energy sources, lower your electricity bills, and contribute to a more sustainable future.
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
                    <span className="font-bold">*Residential applications.</span> Savings vary based on system size, location, and energy consumption patterns.
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
                    <h3 className="text-2xl font-bold text-[#333333]">Commercial Solar Systems</h3>
                    <p className="text-slate-600">Reduce operating costs for your business</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Commercial solar installations help businesses significantly reduce operating costs while demonstrating environmental responsibility. We design and install systems tailored to your business's unique energy needs and roof configuration.
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
                    <span className="font-bold">Custom solutions available.</span> Contact us for a free commercial energy assessment and ROI analysis.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* CTA after tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-4">Ready to explore how solar energy can benefit you?</p>
            <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors max-w-md mx-auto" data-testid="link-financing-cta">
              <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
              <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
            </a>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold h-12 sm:h-14 px-8 rounded-xl"
                onClick={() => setShowBookingModal(true)}
              >
                Schedule Free Consultation
              </Button>
              <a 
                href="tel:18003809384"
                className="border-2 border-[#333333] text-[#333333] hover:bg-slate-100 font-bold h-12 sm:h-14 px-8 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
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
              What Services Does Greenfoot Offer for{" "}
              <span className="text-[#8dc63f]">Solar Energy?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              From installation to maintenance, we provide complete solar energy services across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia.
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
              <span className="text-[#8dc63f]">Solar Energy?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
              We stand behind our work with a satisfaction guarantee. Our experienced team ensures your solar installation exceeds expectations.
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
                    loading="lazy"
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
              What is the Process for a{" "}
              <span className="text-[#8dc63f]">Solar Estimate & Installation?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From your first consultation to powering up, we handle everything.
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
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} />
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
              <h3 className="font-bold text-xl mb-6 text-center">Total Installation Timeline</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Residential Install</p>
                  <p className="text-2xl font-black">1-2 days</p>
                  <p className="text-white/60 text-sm">Most home installations</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Commercial Install</p>
                  <p className="text-2xl font-black">3-5 days</p>
                  <p className="text-white/60 text-sm">Larger systems</p>
                </div>
                <div>
                  <p className="text-[#8dc63f] font-bold text-lg mb-1">Total Wait Phase</p>
                  <p className="text-2xl font-black">6-12 Weeks</p>
                  <p className="text-white/60 text-sm">Permits & Utility PTO</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
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
              <Check className="w-5 h-5 text-[#8dc63f]" />
              <span>5 Provinces</span>
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
              Ready to Go <span className="text-[#8dc63f]">Solar?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Embrace the power of the sun with Greenfoot Solar. Contact us today for a free consultation and let's explore how solar energy can benefit you.
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
                href="tel:18003809384"
                className="border-2 border-white text-white hover:bg-white/10 font-bold h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceFAQSection 
        category="Solar" 
        title="Common Questions About Solar Energy"
      />

      <ServiceSchemaWithFAQs
        serviceName="Solar Energy System Installation & Maintenance"
        serviceDescription="Professional solar energy system installation, design, and maintenance services across Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and British Columbia. Reduce your electricity bills and carbon footprint."
        serviceType="Solar Energy Service"
        serviceUrl="https://www.greenfootenergy.ca/services/solar-energy"
        priceRange="$$$"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 950 }}
        faqCategory="Solar"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Solar Energy", url: "https://www.greenfootenergy.ca/services/solar-energy" },
        ]}
      />
      <HowToSchema
        name="How to Get Solar Panels Installed in Canada"
        description="Complete guide to getting solar panels installed on your home in Canada, from initial assessment through final activation and grid connection."
        totalTime="P8W"
        estimatedCost={{
          currency: "CAD",
          minValue: 15000,
          maxValue: 35000,
        }}
        steps={[
          {
            name: "Schedule a Free Solar Assessment",
            text: "Contact Greenfoot Energy to schedule a free in-home solar assessment. Our certified advisor will analyze your roof orientation, electrical panel, and energy usage to design an optimal system.",
          },
          {
            name: "Complete Permitting and Utility Approval",
            text: "We handle all paperwork including building permits, electrical permits, and utility interconnection applications. This process typically takes 4-8 weeks.",
          },
          {
            name: "Custom Installation Planning",
            text: "Our lead electrician finalizes your solar design, confirming panel placement, battery storage options, and electrical integration points.",
          },
          {
            name: "Professional Solar Installation",
            text: "Our certified technicians install your solar panels, inverter, and electrical components. Residential installations typically complete in 1-2 days.",
          },
          {
            name: "Final Inspection and Activation",
            text: "After passing final inspection, we coordinate with your utility for meter installation and grid connection. Your system goes live and starts generating clean energy.",
          },
        ]}
      />


      <OtherServicesGrid exclude="solar" />

      <RelatedContent currentPath="/services/solar-energy" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
