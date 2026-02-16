import { motion } from "framer-motion";
import { Zap, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import noOilYeti from "@assets/No-Oil-yeti_1770214447496.webp";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedServiceImage from "@assets/dedicated-service-card_1767998424295.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import expertiseIcon from "@assets/trusted-expert.webp";

const trustBadges = [
  {
    image: expertiseIcon,
    title: "Unmatched Expertise",
    description: "With our team of seasoned home comfort advisors."
  },
  {
    image: guaranteeIcon,
    title: "Satisfaction Guaranteed",
    description: "When you experience our customer-oriented service."
  },
  {
    image: redSealIcon,
    title: "Red Seal Certified",
    description: "Every install is performed by certified technicians."
  }
];

const steps = [
  {
    step: 1,
    title: "Get Assessed",
    description: "Book a free in-home assessment with one of our comfort advisors.",
    color: "from-[#8dc63f] to-[#6CBE45]"
  },
  {
    step: 2,
    title: "Apply For Rebate",
    description: "We'll help you navigate the OHPA incentive program.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    step: 3,
    title: "Enjoy Savings",
    description: "Start saving on energy costs with your new heat pump system.",
    color: "from-emerald-500 to-teal-600"
  }
];

const whyChooseUs = [
  {
    image: prideImage,
    title: "Pride in Our Work",
    description: "We take pride with every Greenfoot install. Our home comfort advisors recommend only the best solutions for your home, budget and needs."
  },
  {
    image: experienceImage,
    title: "Experience",
    description: "Greenfoot's team consists of seasoned home comfort advisors, experienced HVAC & electrician technicians and customer service representatives."
  },
  {
    image: satisfactionImage,
    title: "Complete Satisfaction",
    description: "Our goal is to make sure you are 100% fully satisfied with our quality of work and service. We strive to create lifetime relationships with our clients."
  },
  {
    image: dedicatedServiceImage,
    title: "Dedicated Service",
    description: "Our Service-Yeti technicians are dedicated to service. Enjoy peace of mind knowing Greenfoot can service, repair and maintain your system."
  }
];

export default function OilToHeatPump15kPage() {
  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Save Up to $15,000 With OHPA Program | Greenfoot Energy</title>
        <meta name="description" content="Save up to $15,000 with the Oil to Heat Pump Affordability (OHPA) Program. Invest in permanent savings and sustainability for your home." />
        <meta name="keywords" content="OHPA, oil to heat pump, $15000 rebate, heat pump incentive, SaveEnergyNB, EfficiencyNS, Greenfoot Energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/lp/oil-to-heat-pump-rebate-up-to-15k" />
        
        <meta property="og:title" content="Save Up to $15,000 With OHPA Program | Greenfoot Energy" />
        <meta property="og:description" content="Qualified homeowners can receive up to $15,000 through the Oil to Heat Pump Affordability Program." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/lp/oil-to-heat-pump-rebate-up-to-15k" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Save Up to $15,000 | OHPA Program" />
        <meta name="twitter:description" content="Switch from oil heating and save up to $15,000 with the Oil to Heat Pump Affordability Program." />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#333333] via-[#3a3a3a] to-[#2a2a2a]">
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
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
                <Zap className="w-4 h-4" />
                Oil to Heat Pump Affordability (OHPA) Program
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Save Up to <span className="text-[#8dc63f]">$15,000*</span> With the OHPA Program!
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-xl leading-relaxed uppercase tracking-wide font-semibold">
                Invest In
              </p>
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl leading-relaxed">
                Permanent savings and sustainability for your home.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get a Free Quote
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
                    Call Now
                  </a>
                </Button>
              </div>

              <p className="text-sm text-slate-400">*Rebate from SaveEnergyNB & EfficiencyNS. Conditions apply.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-75"></div>
              <img 
                src={noOilYeti} 
                alt="Switch from oil to heat pump - Greenfoot Yeti mascot" 
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl"
              >
                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <img src={badge.image} alt={badge.title} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333] mb-1">{badge.title}</h3>
                  <p className="text-sm text-slate-500">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              3 Simple Steps to <span className="text-[#8dc63f]">Unlock Your Savings</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We'll guide you through the quick steps to access every available deal!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-black mx-auto mb-6 shadow-lg`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{step.title}</h3>
                <p className="text-slate-500">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-12 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Start Step 1: Get Assessed
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
              <em>With the <strong className="text-[#8dc63f]">Oil to Heat Pump Affordability (OHPA) Program</strong>, qualified homeowners can receive up to $15,000* to help transition their homes from oil to electricity-based heat. Conditions apply.</em>
            </p>
            
            <a 
              href="/financing" target="_blank" rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-[#8dc63f]/15 border-l-4 border-[#8dc63f] rounded-r-lg px-6 py-4 hover:bg-[#8dc63f]/25 transition-colors"
            >
              <p className="text-[#8dc63f] font-bold text-lg">Financing Options Available</p>
              <ChevronRight className="w-5 h-5 text-[#8dc63f]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Greenfoot */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              Why Choose <span className="text-[#8dc63f]">Greenfoot</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#333333] flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#333333] via-[#3a3a3a] to-[#2a2a2a]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Ready to <span className="text-[#8dc63f]">Save Up to $15,000?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free assessment and see how much you can save by switching from oil to a heat pump.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Get My Free Quote
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
