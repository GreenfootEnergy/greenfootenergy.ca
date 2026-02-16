import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Phone, Star, Check, ChevronRight, Zap, Shield, Home, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RelatedContent } from "@/components/ui/related-content";
import { OtherServicesGrid } from "@/components/ui/other-services-grid";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ServiceSchemaWithFAQs, BreadcrumbSchema } from "@/components/seo/ServiceSchema";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import { GeneratorCalculator } from "@/components/ui/generator-calculator";
import { GeneratorBuyingGuide } from "@/components/ui/generator-buying-guide";
import { GeneratorFAQ, generatorFAQs } from "@/components/ui/generator-faq";
import { useState } from "react";

import heroBg from "@assets/generator-hero_1769360071227.avif";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import generator18 from "@assets/Generator-18_1769359696689.avif";
import generator22 from "@assets/Generator-22k_1769359696690.avif";
import generator26 from "@assets/Generator-26KW_1769359696691.avif";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";

const generatorModels = [
  {
    id: "essentials",
    name: "Essentials",
    power: "18KW",
    image: generator18,
    category: "Residential Generator",
    coverage: "Stay powered through the basics. Keep the lights on and your food fresh during an outage — no more fumbling in the dark or spoiled groceries.",
    features: [
      "NGMax™ Tech Delivers More Power On Natural Gas Than Competitors",
      "Vanguard® Commercial-Grade Engine With Strong Motor-Starting Capability",
      "7-Year Comprehensive Warranty (Parts, Labor & Travel)",
      "Lower Homeowners Insurance",
      "Increased Property Value"
    ]
  },
  {
    id: "essentials-plus",
    name: "Essentials Plus",
    power: "22KW",
    image: generator22,
    category: "Home Essential Systems + Valuable Electronics",
    coverage: "Upgrade your comfort. Power additional appliances like your stove, hot water heater, washer, and dryer — making life easier while you ride out the storm.",
    features: [
      "Full 22 kW Output On Both Natural Gas And Propane",
      "Durable Vanguard® Engine With Best-In-Class Reliability",
      "Corrosion-Resistant Enclosure + 7-Year Comprehensive Warranty",
      "Lower Homeowners Insurance",
      "Increased Property Value"
    ]
  },
  {
    id: "interruption-free",
    name: "Interruption Free",
    power: "26KW",
    image: generator26,
    category: "Entire Home+",
    coverage: "Experience seamless power. With full-home coverage, you won't even notice the power went out — everything runs just like normal.",
    features: [
      "Highest Output: 26 kW LP / 24 kW NG (7% More Than Competitors)",
      "Massive 65 kVA Motor-Starting Power For Heavy Loads",
      "7-Year Standard Or Optional 10-Year Dealer-Exclusive Warranty",
      "Lower Homeowners Insurance",
      "Increased Property Value"
    ]
  }
];

const installationSteps = [
  {
    step: 1,
    title: "Free Generator Assessment",
    intro: "Our certified Home Comfort Advisor visits your property to conduct a comprehensive evaluation at no cost:",
    details: [
      "Evaluate your home's electrical load requirements",
      "Assess fuel source options (natural gas or propane)",
      "Determine optimal generator placement",
      "Review local permit and code requirements",
      "Provide detailed written quote with specs and pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "Within 3-5 business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Electrical Site Verification",
    intro: "Our electrical specialists examine your existing setup to finalize the installation plan:",
    details: [
      "Examine existing electrical panel capacity",
      "Review transfer switch requirements",
      "Assess fuel line routing",
      "Finalize technical installation plan",
      "Obtain necessary permits"
    ],
    footer: { timeline: "Scheduled after initial assessment" }
  },
  {
    step: 3,
    title: "Professional Generator Installation",
    intro: "Our experienced installation team handles every aspect of the installation:",
    details: [
      "Pour concrete pad if required",
      "Install generator and transfer switch",
      "Connect fuel line and electrical",
      "Ensure work meets local electrical codes",
      "Test system under load conditions"
    ],
    footer: { timeline: "Most installations completed in 1-2 days" }
  },
  {
    step: 4,
    title: "System Demonstration & Maintenance Review",
    intro: "Once installation is complete, our technicians walk you through your new system:",
    details: [
      "Explain automatic transfer switch operation",
      "Demonstrate weekly self-test cycle",
      "Review maintenance schedule",
      "Provide personalized efficiency tips",
      "Answer any questions"
    ],
    footer: { timeline: "30-45 minutes included" }
  }
];

const generatorBenefits = [
  {
    title: "Whole Home Backup Power",
    desc: "Keep your lights and appliances running during grid failures with reliable whole-home generator solutions."
  },
  {
    title: "Energy Efficient Operation",
    desc: "Best energy efficient generators that manage fuel consumption intelligently while powering your essentials."
  },
  {
    title: "Quiet Operation",
    desc: "Quiet generators ensure your daily routine continues without noise disruption to you or your neighbors."
  },
  {
    title: "Long-Term Protection",
    desc: "Eco-friendly generators with comprehensive warranties offer long-term protection and reliable performance."
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Expert Installation",
    desc: "Your generator is connected safely and complies with all local electrical codes by certified technicians."
  },
  {
    image: experienceImage,
    title: "High Quality Products",
    desc: "Top-tier manufacturers provide reliable performance during critical power outages with industry-leading warranties."
  },
  {
    image: satisfactionImage,
    title: "Customized Solutions",
    desc: "We size the unit perfectly to your home's specific electrical load and budget requirements."
  },
  {
    image: dedicatedImage,
    title: "Preventive Maintenance",
    desc: "Maintenance plans keep your system tested, tuned, and ready for the next emergency."
  }
];

export default function GeneratorsPage() {
  const [activeGenerator, setActiveGenerator] = useState(0);
  const currentGenerator = generatorModels[activeGenerator];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>What Size Generator Do I Need? | Whole-Home Generator Installation Canada | Greenfoot Energy</title>
        <meta name="description" content="What size generator do I need for my home? Get professional answers with Greenfoot's free assessment. 18KW, 22KW, and 26KW standby generators with 7-year warranties across Atlantic Canada and BC." />
        <meta name="keywords" content="what size generator do i need, how much does a generator cost, whole home generator, standby generator installation, backup power Canada, generator installation cost, 18KW generator, 22KW generator, 26KW generator, power outage protection, Atlantic Canada generator, BC generator" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/services/generators" />
        <meta property="og:title" content="What Size Generator Do I Need? | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Find the right generator for your home. Free assessment, professional installation, 7-year warranty. 18KW to 26KW whole-home generators in Atlantic Canada and BC." />
        <meta property="og:url" content="https://www.greenfootenergy.ca/services/generators" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Greenfoot Energy Solutions" />
      </Helmet>

      <SiteHeader />

      <ServiceSchemaWithFAQs 
        serviceName="Whole-Home Generator Installation, Repair & Maintenance"
        serviceDescription="Professional whole-home generator installation, repair, and maintenance services across Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia. Offering 18KW, 22KW, and 26KW standby generators with 7-year comprehensive warranties for reliable backup power during outages."
        serviceType="Generator Installation Service"
        serviceUrl="https://www.greenfootenergy.ca/services/generators"
        priceRange="$$$"
        areaServed={["Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador", "British Columbia"]}
        faqCategory="generators"
      />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://www.greenfootenergy.ca" },
          { name: "Services", url: "https://www.greenfootenergy.ca/services" },
          { name: "Generators", url: "https://www.greenfootenergy.ca/services/generators" }
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center -mt-[1px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pt-32 md:pt-40 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8dc63f] text-[#8dc63f]" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5000+ Customer Reviews</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[0.95] mb-6 uppercase">
                Reliable Backup Power &{" "}
                <span className="text-[#8dc63f]">Whole-Home Generators</span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Experience reliable generator installation and expert repair services for a comfortable and efficient home during emergencies or black-outs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-hero-quote"
                >
                  Get Free Assessment
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <a 
                  href="tel:18003809384"
                  className="bg-[#4a4a4a] hover:bg-[#3a3a3a] text-white font-bold text-sm sm:text-lg px-6 sm:px-8 h-12 sm:h-14 border border-white/50 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2 whitespace-nowrap"
                  data-testid="button-hero-call"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="sm:hidden">Call Now</span>
                  <span className="hidden sm:inline">1 (800) 380-9384</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-center gap-4 md:gap-8 lg:gap-16 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={expertiseIcon} alt="Trusted" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Unmatched Expertise</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Seasoned home advisors</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={guaranteeIcon} alt="Guaranteed" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Satisfaction Guaranteed</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Customer-oriented service</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <img src={redSealIcon} alt="Certified" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs md:text-sm">Red Seal Certified</p>
                  <p className="text-white/70 text-[10px] md:text-xs">Certified technicians</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section - Dark Background */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Which <span className="italic text-[#8dc63f]">Generator Size</span> Is Right For Your Home?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              From essential circuits to whole-home coverage, find the perfect generator for your needs and budget.
            </p>
          </motion.div>

          {/* Generator Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {generatorModels.map((model, index) => (
              <button
                key={model.id}
                onClick={() => setActiveGenerator(index)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  index === activeGenerator
                    ? 'bg-[#8dc63f] text-white'
                    : 'bg-[#2a2a2a] text-white/70 hover:text-white'
                }`}
                data-testid={`generator-tab-${model.id}`}
              >
                {model.name} <span className="text-[#8dc63f]">{index === activeGenerator ? '' : model.power}</span>
                {index === activeGenerator && <span className="ml-1">{model.power}</span>}
              </button>
            ))}
          </div>

          {/* Generator Product Display */}
          <motion.div
            key={currentGenerator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left - Product Image */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-[#2a2a2a] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-4 left-4">
                  <p className="text-white font-black text-2xl sm:text-3xl uppercase">{currentGenerator.name}</p>
                  <p className="text-[#8dc63f] font-bold text-xl sm:text-2xl">{currentGenerator.power}</p>
                </div>
                <img 
                  src={currentGenerator.image} 
                  alt={`${currentGenerator.name} ${currentGenerator.power} Generator`} 
                  className="h-[250px] sm:h-[300px] w-auto object-contain mx-auto mt-16"
                  data-testid={`img-generator-${currentGenerator.id}`}
                />
              </div>
            </div>

            {/* Right - Features */}
            <div className="order-1 lg:order-2">
              <div className="mb-4">
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1">{currentGenerator.name}</p>
                <p className="text-[#8dc63f] font-bold text-lg">{currentGenerator.category}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {currentGenerator.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#8dc63f]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#8dc63f]" />
                    </div>
                    <span className="text-white/90 text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold text-sm sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all rounded-xl w-full sm:w-auto"
                data-testid="button-product-quote"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get a Free Quote
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <a href="/financing" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-4 hover:bg-[#8dc63f]/20 transition-colors" data-testid="link-financing-cta">
                <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                <p className="text-white/70 text-sm">Learn more about our financing options →</p>
              </a>

              <p className="text-white/70 text-sm mt-6">{currentGenerator.coverage}</p>
            </div>
          </motion.div>

          {/* Download Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/80 mb-4">What Should You Expect When Buying a Generator?</p>
            <a 
              href="https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a868a3_Homeowner%20-%20Step%20By%20Step%20Guide%20to%20Sell%20and%20Install%20Generators%20(SOP)%20APR%209%202025%20(2)%20(1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Step By Step Guide
            </a>
          </motion.div>
        </div>
      </section>

      {/* Interactive Generator Calculator */}
      <GeneratorCalculator />

      {/* Interactive Buying Guide */}
      <GeneratorBuyingGuide />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              What Generator Services Does <span className="text-[#8dc63f]">Greenfoot Energy</span> Provide?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Greenfoot Energy offers three comprehensive solutions to ensure your peace of mind: new generator installations, expert repairs, and preventive maintenance. Our team ensures your daily routine continues without interruption during an emergency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Installation Services */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Why Should You Install a Whole Home Generator?</h3>
              <ul className="space-y-4">
                {generatorBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#333333]">{benefit.title}</p>
                      <p className="text-slate-600 text-sm">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Investment Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Is a Whole Home Generator Worth the Investment?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#333333]">Protection Against Storm Damage</p>
                    <p className="text-slate-600 text-sm">Avoid expensive repairs from frozen pipes, water damage, and spoiled food during long outages.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#333333]">Lower Insurance Premiums</p>
                    <p className="text-slate-600 text-sm">Permanent backup power significantly reduces the risk of filing damage claims.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#333333]">Increased Property Value</p>
                    <p className="text-slate-600 text-sm">Future buyers view a generator as a premium, high-value asset.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#333333]">Comfort During Outages</p>
                    <p className="text-slate-600 text-sm">Your heating, cooling, and security systems remain operational to keep your family safe.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              Why Choose <span className="text-[#8dc63f]">Greenfoot</span> For Your Generator Needs?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              When you trust Greenfoot Energy with your home backup power, you benefit from four distinct service guarantees.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
              How Long Does <span className="text-[#8dc63f]">Generator Installation</span> Take?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Most installations complete in 1-2 days. From initial assessment to final demonstration, here's our proven 4-step process.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {installationSteps.map((step, i) => (
              <ScrollStepItem key={i} step={step} index={i} total={installationSteps.length} ctaText="Get Free Quote" />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <GeneratorFAQ />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to <span className="text-[#8dc63f]">Upgrade</span>?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today to schedule a free consultation and protect your home with reliable backup power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-final-cta"
              >
                Get Free Assessment
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <a href="tel:18003809384">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#333333] font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  1 (800) 380-9384
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      <OtherServicesGrid exclude="generators" />

      <RelatedContent currentPath="/services/generators" variant="compact" heading="Explore Related Topics" />

      <SiteFooter />
    </div>
  );
}
