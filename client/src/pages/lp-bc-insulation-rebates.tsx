import { motion } from "framer-motion";
import { Phone, TrendingDown, Shield, Snowflake, Home, Thermometer, ChevronDown, ArrowRight, Zap, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import expertiseIcon from "@assets/trusted-expert.webp";
import quoteGreen from "@assets/Black-green-quote_1767996683816.png";
import quoteWhite from "@assets/Black-white-quote_1767996683817.png";

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-[#333333]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-5">
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

const insulationBenefits = [
  {
    icon: TrendingDown,
    title: "Lower Energy Bills",
    description: "Stop heat from escaping through walls, attics, and floors. Proper insulation can reduce heating costs significantly."
  },
  {
    icon: Thermometer,
    title: "Cozy Comfort All Season",
    description: "Eliminate cold spots and drafts. Enjoy consistent temperatures throughout your entire home."
  },
  {
    icon: Snowflake,
    title: "A Warmer Winter Ahead",
    description: "British Columbia winters can be harsh. Upgraded insulation keeps the cold out and warmth in where it belongs."
  },
  {
    icon: Home,
    title: "Increased Home Value",
    description: "Energy-efficient homes command higher resale values and attract more buyers in today's market."
  },
  {
    icon: Zap,
    title: "Reduced Environmental Impact",
    description: "Less energy waste means a smaller carbon footprint. Do your part for the environment."
  },
  {
    icon: Shield,
    title: "Moisture & Mold Prevention",
    description: "Quality insulation helps control moisture, preventing mold growth and protecting your home's structure."
  }
];

const processSteps = [
  {
    step: 1,
    title: "Get Assessed",
    description: "Book your free home assessment with our insulation experts. We'll evaluate your current insulation levels and identify areas for improvement."
  },
  {
    step: 2,
    title: "Apply For Rebate",
    description: "We help you navigate the CleanBC rebate program to maximize your savings. Rebates available through the Better Homes program."
  },
  {
    step: 3,
    title: "Enjoy Savings",
    description: "Once installed, start enjoying lower energy bills, improved comfort, and the satisfaction of a more efficient home."
  }
];

const insulationServices = [
  {
    title: "Batt & Poly Insulation",
    description: "Traditional fiberglass batt insulation with poly vapor barrier. Cost-effective solution for walls and attics.",
    image: "https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68874c9990cff00613a869be_main%20insulation.avif"
  },
  {
    title: "Spray Foam Insulation",
    description: "Superior air sealing and insulation in one application. Ideal for hard-to-reach areas and maximum efficiency.",
    image: "/assets/sprayfoam-icon_1769562877135.png"
  },
  {
    title: "Blown-In Insulation",
    description: "Perfect for attics and existing walls. Quick installation with minimal disruption to your home.",
    image: "/assets/Blown-in-insulation_1Blown_in_insulation_1769563177692.avif"
  }
];

const testimonials = [
  {
    quote: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION",
    content: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff!",
    author: "Danielle Bass",
    rating: 5
  },
  {
    quote: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!",
    content: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company!",
    author: "Frederick Tofflemire",
    rating: 5
  },
  {
    quote: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY",
    content: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough.",
    author: "Ellen Downey",
    rating: 5
  },
  {
    quote: "WHEN THEY LEFT THE HOUSE THERE WAS NO MESS TO CLEAN UP!",
    content: "The young chaps were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up.",
    author: "Alice Gracie",
    rating: 5
  }
];

const faqs = [
  {
    question: "What rebates are available for insulation in British Columbia?",
    answer: "The CleanBC Better Homes program offers rebates for qualifying insulation upgrades. Our team will help you understand what you qualify for and guide you through the application process."
  },
  {
    question: "How long does insulation installation take?",
    answer: "Most residential insulation projects are completed in 1-2 days, depending on the scope of work. Spray foam applications typically take longer to cure but offer superior performance."
  },
  {
    question: "What type of insulation is best for my home?",
    answer: "The best insulation depends on your home's construction, existing insulation, and budget. Our Home Comfort Advisors will assess your home and recommend the most effective solution for your specific situation."
  },
  {
    question: "Will new insulation really lower my energy bills?",
    answer: "Yes! Proper insulation significantly reduces heat loss in winter and heat gain in summer. Most homeowners see noticeable reductions in their heating and cooling costs after upgrading insulation."
  },
  {
    question: "Do I need to leave my home during installation?",
    answer: "For most insulation types, you can remain in your home during installation. For spray foam applications, we recommend vacating the work area until the foam has cured, typically a few hours."
  }
];

export default function BCInsulationRebatesLP() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>BC Insulation Rebates | CleanBC Up to $5,500</title>
        <meta name="description" content="Claim up to $5,500 with CleanBC Better Homes insulation rebates. Spray foam, blown-in, and batt insulation for British Columbia homes. Free assessment." />
        <link rel="canonical" href="https://greenfootenergy.ca/bc-insulation-rebates" />
        <meta name="keywords" content="CleanBC rebates, BC insulation, home insulation British Columbia, spray foam Vancouver, insulation rebates BC" />
        <meta property="og:title" content="BC Insulation Rebates | CleanBC Up to $5,500" />
        <meta property="og:description" content="Claim up to $5,500 with CleanBC Better Homes for spray foam, blown-in, and batt insulation in BC." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenfootenergy.ca/bc-insulation-rebates" />
        <meta property="og:image" content="https://greenfootenergy.ca/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BC Insulation Rebates | CleanBC Up to $5,500" />
        <meta name="twitter:description" content="Claim up to $5,500 with CleanBC insulation rebates in British Columbia. Free assessment." />
        <meta name="twitter:image" content="https://greenfootenergy.ca/opengraph.jpg" />
      </Helmet>

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#1a1a1a] to-[#333333] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/insulation-hero-greenfoot.jpg" 
            alt="All insulation types" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                CleanBC Rebate Program
              </div>
              
              <p className="text-xl md:text-2xl font-bold text-[#8dc63f] mb-4">
                CLAIM UP TO $5,500 IN REBATES WITH
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight">
                YEAR ROUND<br />
                <span className="text-[#8dc63f]">INSULATION</span> SOLUTIONS
              </h1>
              
              <p className="text-xl text-gray-300 mb-4 font-semibold">
                Don't Let Savings Slip Through The Cracks!
              </p>
              
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Take the first step in making your home more energy efficient. Claim available rebates through the CleanBC program.
              </p>

              </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-[#333333] mb-2">Get Your FREE Insulation Quote</h2>
              <p className="text-slate-600 mb-8">Find out how much you could save with upgraded insulation.</p>
              
              <div className="space-y-4">
                <a 
                  href="https://scheduling.greenfootenergy.ca/?utm_source=paid_social&utm_medium=meta&utm_campaign=bc_insulation&utm_content=get_assessed_button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get a Free Assessment <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.betterhomesbc.ca/rebates/insulation-rebates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1E5AA8] hover:bg-[#174a8a] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  View CleanBC Rebates <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="tel:18003809384"
                  className="w-full bg-[#333333] hover:bg-[#222222] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call 1 (800) 380-9384
                </a>
              </div>
              
              <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mt-6 hover:bg-[#8dc63f]/20 transition-colors">
                <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
              </a>
              
              <p className="text-sm text-slate-500 text-center mt-4">
                Speak with a home comfort advisor today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <img src={expertiseIcon} alt="Expertise" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Unmatched Expertise</h3>
                <p className="text-sm text-slate-600">With our team of seasoned home comfort advisors.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <img src={guaranteeIcon} alt="Guaranteed" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Satisfaction Guaranteed</h3>
                <p className="text-sm text-slate-600">When you experience our customer-oriented service.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <img src={redSealIcon} alt="Red Seal" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-bold text-[#333333]">Red Seal Certified</h3>
                <p className="text-sm text-slate-600">Every install is performed by certified technicians.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
              Your Path to <span className="text-[#8dc63f]">Savings</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Getting started is easy. Follow these simple steps to upgrade your insulation and claim available rebates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-20 bg-[#8dc63f] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 uppercase">
              Year Round Comfort <span className="text-[#8dc63f]">When You Need It Most!</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Don't let heat slip through the cracks. Upgrade your insulation and enjoy these benefits:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {insulationBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insulation Services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
              Effortless Insulation <span className="text-[#8dc63f]">Made Easy</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our team of experts offers a wide range of insulation services to meet your specific needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {insulationServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center p-6">
                  <img src={service.image} alt={service.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#333333] mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-[#8dc63f] to-[#6ba32d] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase">
              Flexible Financing Options Available
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Don't let budget hold you back from a more comfortable, energy-efficient home. We offer flexible payment plans to fit your needs—conditions apply.
            </p>
            <a 
              href="/financing" target="_blank" rel="noopener noreferrer" 
              className="inline-flex items-center justify-center bg-white text-[#333333] font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all gap-2"
            >
              Explore Financing Options <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">5,000+</div>
              <p className="text-lg text-white/80">Facebook & Google Reviews</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">25,000+</div>
              <p className="text-lg text-white/80">Insulated Homes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">75,000+</div>
              <p className="text-lg text-white/80">HVAC Systems Installed</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="pt-16 pb-0 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#333333] font-black uppercase tracking-widest text-sm mb-1">What People Are</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase tracking-tight">
              Saying About
            </h2>
            <h2 className="text-4xl md:text-6xl font-black text-[#8dc63f] uppercase -mt-1">
              GREENFOOT!
            </h2>
            <p className="text-slate-600 mt-4">Our 5-star reviews speak for themselves!</p>
          </div>
        </div>
        
        <div className="bg-[#333333] py-12 overflow-hidden">
          <div className="flex hover:[animation-play-state:paused] animate-scroll-horizontal" style={{ width: 'max-content' }}>
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex gap-6 px-3">
                {[
                  { headline: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!", text: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company! Thank you very much, looking forward to using Greenfoot again.", author: "Frederick TOFFLEMIRE" },
                  { headline: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY", text: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough. I only wish they installed our heat pump originally. I would hire them again without hesitation.", author: "Ellen DOWNEY" },
                  { headline: "WHEN THEY LEFT THE HOUSE THERE WAS NO MESS TO CLEAN UP!", text: "The young chaps, Marlon Marcuflo and Sylvia Richard, were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up. I would recommend Greenfoot Energy Solutions to anyone thinking of upgrading their home.", author: "Alice GRACIE" },
                  { headline: "THEIR ENTIRE TEAM IS EXTREMELY EXPERIENCED, KNOWLEDGEABLE, AND CONSIDERATE", text: "We hired Greenfoot to install 2 heat pumps. From the beginning to end - initial home visit to the final installation touches - they were wonderful to work with. Their entire team is extremely experienced, knowledgeable, and considerate; and were very accommodating.", author: "Michael BOYD" },
                  { headline: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION", text: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff! Everyone we spoke to from Greenfoot was helpful and just seemed genuinely happy in their job.", author: "Happy Homeowner" },
                ].map((review, idx) => (
                  <div key={idx} className="flex-shrink-0 w-80 bg-[#2a2a2a] rounded-xl p-6 pt-8 pb-8 relative">
                    <div className="absolute -top-5 left-3">
                      <img src={quoteGreen} alt="" className="w-12 h-12 rotate-180" />
                    </div>
                    <div className="absolute -bottom-5 right-3">
                      <img src={quoteWhite} alt="" className="w-12 h-12" />
                    </div>
                    <div className="mt-2">
                      <p className="text-[#8dc63f] font-black italic text-lg leading-tight mb-4">"{review.headline}"</p>
                      <p className="text-white/80 text-sm leading-relaxed mb-6">{review.text}</p>
                      <p className="text-white font-bold">{review.author} - <span className="text-[#8dc63f] italic">5 Star Review</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest in Your Home Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://cdn.prod.website-files.com/68874c9990cff00613a8653e/68a5cc0b677a4f7bf551def5_a0c87ca147034745070f14b06ca2cdc1_house%20scheme%20blue%20and%20green.png"
                alt="Home Energy Efficiency"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-6 uppercase">
                Invest in <span className="text-[#8dc63f]">Your Home</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Our home is our oasis, our retreat. It is where we recharge and entertain our friends and family. It is where we raise our children and plan our future. Investing in your home is investing in these moments.
              </p>
              <p className="text-slate-600 mb-6">
                Greenfoot has developed a holistic approach to energy efficiency. Through offering a wide range of services and products, we provide unbiased advice to home & business owners. Many contractors, due to their limited range of services, develop a one-size-fits-all approach. With Greenfoot, you can rest assured that our Home Comfort Advisors will recommend what your home requires.
              </p>
              <div className="bg-[#8dc63f]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#333333] mb-2">THAT IS THE GREENFOOT APPROACH!</h3>
                <p className="text-slate-600">Expertise you can trust, tailored to your home.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4 uppercase">
              Frequently Asked <span className="text-[#8dc63f]">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-6 uppercase">
              Ready to Stop the Heat Loss?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Get your free insulation assessment today and start saving on energy bills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://scheduling.greenfootenergy.ca/?utm_source=paid_social&utm_medium=meta&utm_campaign=nb_insulation&utm_content=cta_bottom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#333333] font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:18003809384"
                className="bg-[#333333] text-white font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
