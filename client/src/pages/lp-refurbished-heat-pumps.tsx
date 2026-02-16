import { motion } from "framer-motion";
import { Zap, ChevronRight, Phone, Shield, Clock, DollarSign, Thermometer, Check, Wrench, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ScrollStepItem } from "@/components/ui/scroll-step-item";
import refurbishedHeatPump from "@assets/refurbished-heat-pump-unit.webp";
import houseScheme from "@assets/house-scheme-heat-pump.png";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedServiceImage from "@assets/dedicated-service-card_1767998424295.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";
import gridlessLogo from "@assets/gridless-logo-grey.webp";
import kerrLogo from "@assets/kerr-logo-grey.webp";
import lgLogo from "@assets/LG-logo-gray-small.webp";
import daikinLogo from "@assets/daikin-logo-blue.webp";

const trustBadges = [
  {
    image: expertiseIcon,
    title: "Unmatched Expertise",
    description: "Seasoned home comfort advisors guide every decision."
  },
  {
    image: guaranteeIcon,
    title: "Satisfaction Guaranteed",
    description: "Experience our customer-first service commitment."
  },
  {
    image: redSealIcon,
    title: "Red Seal Certified",
    description: "Every install performed by certified technicians."
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: "Starting at $2,500",
    description: "Premium heat pump comfort at a fraction of new system costs. Same performance, smarter price."
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Full parts and labor coverage. We stand behind every refurbished unit we install."
  },
  {
    icon: Thermometer,
    title: "Proven Performance",
    description: "Factory-tested and certified to perform like new. Cold-climate rated to -25°C and below."
  },
  {
    icon: Clock,
    title: "Quick Installation",
    description: "Most installations complete in just 1-2 days. Start saving immediately."
  }
];

const processSteps = [
  {
    step: 1,
    title: "Free Consultation",
    intro: "Fill out our quick form today. We'll review your specific needs, identify eligible energy rebates, and schedule a free professional home visit.",
    details: [
      "Assess your home's heating and cooling requirements",
      "Identify optimal unit placement locations",
      "Review available refurbished inventory",
      "Provide transparent, no-pressure pricing"
    ],
    footer: { cost: "Free, no obligation", timeline: "3-5 business days" },
    showCta: true
  },
  {
    step: 2,
    title: "Custom Assessment",
    intro: "Our certified advisors evaluate your home and recommend the perfect refurbished system for your space.",
    details: [
      "Room-by-room load calculation",
      "Electrical capacity evaluation",
      "Brand and model selection based on availability",
      "Financing options review"
    ],
    footer: { timeline: "Same-day recommendations" }
  },
  {
    step: 3,
    title: "Professional Install",
    intro: "Certified technicians complete most installations in 1-2 days, with minimal disruption to your daily life.",
    details: [
      "Mount indoor and outdoor units",
      "Complete electrical and refrigerant connections",
      "Full system testing and commissioning",
      "Thorough cleanup after installation"
    ],
    footer: { timeline: "1-2 days typical" }
  },
  {
    step: 4,
    title: "Enjoy Comfort",
    intro: "Start saving immediately. We provide full post-install training and ongoing support.",
    details: [
      "Remote control operation walkthrough",
      "Energy-saving feature demonstration",
      "Maintenance schedule review",
      "24/7 support access"
    ]
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
    description: "We take pride with every Greenfoot install. Our home comfort advisors recommend only the best solutions for your home, budget and needs. Our reputation is #1 to us."
  },
  {
    image: experienceImage,
    title: "Experience",
    description: "Greenfoot's team consists of seasoned home comfort advisors, experienced HVAC & electrician technicians and customer service representatives with decades of combined expertise."
  },
  {
    image: satisfactionImage,
    title: "Complete Satisfaction",
    description: "Our goal is to make sure you are 100% fully satisfied with our quality of work and service. We strive to create lifetime relationships with our clients."
  },
  {
    image: dedicatedServiceImage,
    title: "Dedicated Service",
    description: "Our Service-Yeti technicians are dedicated to service. Enjoy peace of mind knowing Greenfoot can service, repair and maintain your system for years to come."
  }
];

const brandLogos = [gridlessLogo, kerrLogo, lgLogo, daikinLogo];

export default function RefurbishedHeatPumpsPage() {
  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Refurbished Heat Pumps Starting at $2,500 | 5-Year Warranty | Greenfoot Energy</title>
        <meta name="description" content="Get premium heat pump comfort for less. Refurbished mini-split heat pumps starting at $2,500 with full 5-year parts and labor warranty. Professional installation included." />
        <meta name="keywords" content="refurbished heat pump, cheap heat pump, affordable heat pump, used heat pump, heat pump deal, discount heat pump, 5-year warranty heat pump" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/lp/refurbished-heat-pumps" />
        
        <meta property="og:title" content="Refurbished Heat Pumps Starting at $2,500 | Greenfoot Energy" />
        <meta property="og:description" content="Premium heat pump comfort at a fraction of the cost. 5-year parts and labor warranty included. While quantities last!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/lp/refurbished-heat-pumps" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Refurbished Heat Pumps from $2,500" />
        <meta name="twitter:description" content="Get heat pump comfort for less. 5-year warranty included. While quantities last!" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Refurbished Heat Pump Installation",
            "description": "Professional refurbished mini-split heat pump installation with 5-year parts and labor warranty",
            "brand": {
              "@type": "Brand",
              "name": "Greenfoot Energy Solutions"
            },
            "offers": {
              "@type": "Offer",
              "price": "2500",
              "priceCurrency": "CAD",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/LimitedAvailability",
              "seller": {
                "@type": "Organization",
                "name": "Greenfoot Energy Solutions"
              }
            }
          })}
        </script>
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#333333] via-[#3a3a3a] to-[#2a2a2a]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8dc63f]/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                <BadgePercent className="w-4 h-4" />
                Limited Time Offer — While Quantities Last
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
                REFURBISHED<br />
                <span className="text-[#8dc63f]">HEAT PUMPS</span><br />
                <span className="text-3xl md:text-4xl lg:text-5xl">AS LOW AS $2,500!</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-4 font-semibold">
                5-year parts and labor warranty included
              </p>
              
              <p className="text-lg text-slate-400 mb-8 max-w-xl">
                Get the same premium comfort and energy savings as a new heat pump — at a fraction of the cost. Professionally inspected, tested, and installed by Red Seal certified technicians.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get Free Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-10 h-14 rounded-xl"
                  asChild
                >
                  <a href="tel:18003809384">
                    <Phone className="w-5 h-5 mr-2" />
                    1-800-380-9384
                  </a>
                </Button>
              </div>

              {/* Brand Logos */}
              <div className="flex items-center gap-6 opacity-60">
                {brandLogos.map((logo, i) => (
                  <img 
                    key={i} 
                    src={logo} 
                    alt="Heat pump brand" 
                    className="h-6 md:h-8 w-auto grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-75"></div>
              <img 
                src={refurbishedHeatPump} 
                alt="Refurbished heat pump unit" 
                className="relative w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#8dc63f] px-6 py-3 rounded-full shadow-xl">
                <span className="text-sm font-black text-[#333333]">Starting at $2,500 Installed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <img src={badge.image} alt={badge.title} className="w-16 h-16 object-contain" />
                <div>
                  <h3 className="font-bold text-[#333333]">{badge.title}</h3>
                  <p className="text-sm text-slate-500">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#333333] mb-4">
              Why Choose a <span className="text-[#8dc63f]">Refurbished Heat Pump?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Smart savings without sacrificing quality. Every unit is professionally inspected, tested, and backed by our comprehensive warranty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="font-bold text-xl text-[#333333] mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Financing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-6 hover:bg-[#8dc63f]/20 transition-colors text-center">
              <p className="text-[#333333] font-semibold mb-1">Financing Options Available</p>
              <p className="text-sm text-slate-600">Discover your savings and get financing that costs less than half the price of your morning coffee!</p>
              <span className="inline-flex items-center gap-1 text-[#8dc63f] font-bold text-sm mt-2">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#8dc63f] font-bold uppercase tracking-wider mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#333333] mb-4">
              Simple <span className="text-[#8dc63f]">5-Step Process</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From first call to full comfort. The entire process made easy.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, index) => (
              <ScrollStepItem
                key={index}
                step={step}
                index={index}
                total={processSteps.length}
                ctaText="Get Free Quote"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Greenfoot */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#333333] mb-4">
              Why Choose <span className="text-[#8dc63f]">Greenfoot?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((card, i) => (
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
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#333333] mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest In Your Home */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img 
                src={houseScheme} 
                alt="Greenfoot whole-home energy solutions" 
                className="w-full max-w-lg"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
                Invest In Your Home
              </h2>
              <p className="text-white/80 mb-6">
                Our home is our oasis, our retreat. It is where we recharge and entertain our friends and family. It is where we raise our children and plan our future. Investing in your home is investing in these moments.
              </p>
              <p className="text-white/80 mb-8">
                Greenfoot has developed a <span className="text-white font-bold">holistic approach</span> to energy efficiency. Through offering a wide range of services and products, we provide <span className="text-white font-bold">unbiased advice</span> to home & business owners.
              </p>
              <div className="bg-[#8dc63f] text-white p-6 rounded-xl inline-block">
                <p className="text-lg font-black uppercase tracking-wide">THAT IS THE GREENFOOT APPROACH!</p>
                <p className="text-sm text-white/90 mt-1">Expertise you can trust, tailored to your home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-[#2a2a2a] to-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4" />
              Limited Availability
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Don't Miss This <span className="text-[#8dc63f]">Opportunity</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Refurbished units sell fast. Lock in your savings today with a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get Free Quote Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-10 h-14 rounded-xl"
                asChild
              >
                <a href="tel:18003809384">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-800-380-9384
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
