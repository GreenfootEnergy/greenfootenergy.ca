import { motion } from "framer-motion";
import { Phone, TrendingUp, Shield, Zap, Home, DollarSign, ThermometerSun, ChevronDown, ArrowRight, Clock, Wrench, BarChart3, Leaf, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

import tagImage from "@assets/$2_tag_element_1769550369903.png";
import prideImage from "@assets/pride-in-work_1767995824634.png";
import experienceImage from "@assets/experience-card_1767998244511.png";
import satisfactionImage from "@assets/satisfaction.webp";
import dedicatedImage from "@assets/dedicated-service-card_1767998424295.png";
import redSealIcon from "@assets/red-seal-icon-png_1767988320226.png";
import guaranteeIcon from "@assets/guaranteee.webp";
import expertiseIcon from "@assets/trusted-expert.webp";

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

const roiBenefits = [
  {
    icon: DollarSign,
    title: "Reduced Energy Costs",
    description: "Optimized systems use less energy. Most homeowners see 15-30% reduction in heating and cooling costs.",
    roi: "Direct Monthly Savings"
  },
  {
    icon: Shield,
    title: "Extended System Lifespan",
    description: "Regular optimization prevents wear and extends equipment life by 5-10 years on average.",
    roi: "Asset Protection"
  },
  {
    icon: ThermometerSun,
    title: "Consistent Comfort",
    description: "No more temperature swings, cold spots, or humidity issues. Enjoy stable comfort year-round.",
    roi: "Lifestyle Return"
  },
  {
    icon: Wrench,
    title: "Fewer Emergency Repairs",
    description: "Proactive monitoring catches issues before they become expensive emergencies.",
    roi: "Risk Reduction"
  },
  {
    icon: TrendingUp,
    title: "Improved Home Efficiency",
    description: "Energy-efficient homes command higher resale values and attract more buyers.",
    roi: "Property Value"
  },
  {
    icon: Leaf,
    title: "Lower Carbon Footprint",
    description: "Optimized systems waste less energy, reducing your home's environmental impact.",
    roi: "Environmental Return"
  }
];

const processSteps = [
  {
    step: 1,
    title: "Comfort & Efficiency Assessment",
    description: "Our experts evaluate your home's current performance, identifying energy waste and comfort gaps. You'll receive a detailed report with optimization opportunities."
  },
  {
    step: 2,
    title: "Personalized Optimization Plan",
    description: "Based on your assessment, we create a custom plan tailored to your home's specific needs, budget, and comfort goals."
  },
  {
    step: 3,
    title: "Ongoing Performance Improvements",
    description: "Regular system optimization, priority service, and continuous monitoring ensure your home performs at peak efficiency year after year."
  }
];

const comparisonData = [
  { category: "Monthly Energy Bills", doingNothing: "Higher, unpredictable costs", investing: "Lower, stable operating costs" },
  { category: "System Lifespan", doingNothing: "Accelerated wear and early failure", investing: "Protected equipment, extended life" },
  { category: "Repairs", doingNothing: "Reactive, expensive emergencies", investing: "Proactive optimization, fewer breakdowns" },
  { category: "Home Comfort", doingNothing: "Temperature swings, inconsistency", investing: "Stable, optimized performance" },
  { category: "Energy Efficiency", doingNothing: "Declining over time", investing: "Continuously improving" }
];

const faqs = [
  {
    question: "Is this a long-term contract?",
    answer: "No, our comfort investment program is flexible. You can adjust or cancel anytime with 30 days notice. We earn your business month after month through results, not contracts."
  },
  {
    question: "What if I don't need repairs this year?",
    answer: "That's actually the goal! This isn't about repairs—it's about optimization. When your system runs efficiently, you save on energy costs every month, whether or not any repairs are needed. The ROI comes from efficiency, not from using repair services."
  },
  {
    question: "How does this actually save me money?",
    answer: "Three ways: First, optimized systems use 15-30% less energy. Second, preventive care extends equipment life by 5-10 years, delaying expensive replacements. Third, catching issues early prevents costly emergency repairs. Most homeowners see their investment pay for itself within the first year."
  },
  {
    question: "What's included in the monthly investment?",
    answer: "Complete system optimization including annual performance tune-ups, priority scheduling, parts and labor coverage, 24/7 emergency support, and ongoing efficiency monitoring. Everything needed to keep your home performing at its best."
  },
  {
    question: "Do I need a Greenfoot system to participate?",
    answer: "While we specialize in systems we've installed, we offer optimization programs for most major brands. Contact us for an assessment to see how we can improve your home's performance."
  }
];

export default function CozySubscriptionLP() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Home Comfort Investment Plan | Greenfoot Energy</title>
        <meta name="description" content="Invest in year-round home comfort for less than $2/day. Lower energy bills, extended system life, and priority service with Greenfoot's comfort subscription." />
        <link rel="canonical" href="https://greenfootenergy.ca/cozy-subscription" />
        <meta name="keywords" content="HVAC subscription, home comfort plan, energy savings, maintenance plan, Greenfoot Energy, heating cooling subscription" />
        <meta property="og:title" content="Home Comfort Investment Plan | Greenfoot Energy" />
        <meta property="og:description" content="Invest in year-round home comfort for less than $2/day. Lower energy bills and extended system life with Greenfoot." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenfootenergy.ca/cozy-subscription" />
        <meta property="og:image" content="https://greenfootenergy.ca/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Comfort Investment Plan | Greenfoot Energy" />
        <meta name="twitter:description" content="Invest in year-round home comfort for less than $2/day. Lower energy bills and priority service." />
        <meta name="twitter:image" content="https://greenfootenergy.ca/opengraph.jpg" />
      </Helmet>

      <SiteHeader />

      {/* Hero Section - Investment Reframe */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4" />
                Home Comfort Investment
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#333333] leading-[1.1] mb-6 uppercase tracking-tight">
                Comfort is an Asset.<br />
                <span className="text-[#8dc63f]">Invest in It.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-6 max-w-lg">
                Join thousands of Canadian homeowners who've discovered that investing in home comfort delivers real returns—lower energy bills, protected equipment, and year-round comfort.
              </p>

              {/* Price Tag */}
              <div className="mb-8">
                <img src={tagImage} alt="Less Than $2 A Day" className="h-24 md:h-32 object-contain" />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <img src={expertiseIcon} alt="Expertise" className="w-10 h-10 object-contain" />
                  <span className="text-sm font-semibold text-[#333333]">75,000+ Installs</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={guaranteeIcon} alt="Guaranteed" className="w-10 h-10 object-contain" />
                  <span className="text-sm font-semibold text-[#333333]">Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={redSealIcon} alt="Red Seal" className="w-10 h-10 object-contain" />
                  <span className="text-sm font-semibold text-[#333333]">Red Seal Certified</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-[#333333] mb-2">Get Your Free Comfort Investment Assessment</h2>
              <p className="text-slate-600 mb-8">Discover how much you could save with optimized home comfort.</p>
              
              <div className="space-y-4">
                <a 
                  href="https://scheduling.greenfootenergy.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Book Free Assessment <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="tel:18003809384"
                  className="w-full bg-[#333333] hover:bg-[#222222] text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call 1 (800) 380-9384
                </a>
              </div>

              <a href="/financing" target="_blank" rel="noopener noreferrer" className="block bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4 mb-6 hover:bg-[#8dc63f]/20 transition-colors">
                <p className="text-[#8dc63f] font-bold mb-1">Flexible Financing Available</p>
                <p className="text-slate-600 text-sm">Learn more about our financing options →</p>
              </a>
              
              <p className="text-sm text-slate-500 text-center">
                Speak with a home comfort advisor today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - Where Homeowners Lose Money */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Where Homeowners <span className="text-[#8dc63f]">Lose Money</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Most homeowners don't realize how much money leaks out of their homes every month. Inefficient systems and deferred maintenance have a real cost.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Energy Waste</h3>
              <p className="text-gray-300">
                Inefficient systems waste 15-30% of your energy dollars every month. That's money going straight out the window.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Shortened Lifespan</h3>
              <p className="text-gray-300">
                Neglected systems fail years earlier than they should, forcing expensive replacements that could have been avoided.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Emergency Repairs</h3>
              <p className="text-gray-300">
                Small issues become expensive emergencies when ignored. Reactive repairs cost 3-5x more than proactive care.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-xl text-[#8dc63f] font-semibold">
              Doing nothing has a cost. The question is: will you invest it wisely?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offer Positioning - What This Really Is */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              This Isn't a Maintenance Plan.<br />
              <span className="text-[#8dc63f]">It's a Comfort Investment.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Think of it as ongoing home performance optimization—a strategic investment that delivers measurable returns every month.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: BarChart3, title: "Home Performance Optimization", desc: "Continuous improvements to how your home heats, cools, and manages energy." },
              { icon: Shield, title: "System Protection Strategy", desc: "Proactive care that extends equipment life and prevents costly failures." },
              { icon: Zap, title: "Energy Efficiency Improvement", desc: "Ongoing optimization that reduces waste and lowers monthly costs." },
              { icon: Home, title: "Comfort Asset Management", desc: "Expert oversight of your home's comfort systems for peak performance." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#8dc63f]" />
                </div>
                <h3 className="font-bold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Benefits Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Every Benefit Delivers <span className="text-[#8dc63f]">Real Returns</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              This isn't about spending money—it's about redirecting what you're already spending toward better outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roiBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#8dc63f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{benefit.description}</p>
                    <span className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] text-xs font-semibold px-3 py-1 rounded-full">
                      {benefit.roi}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              Your Guided <span className="text-[#8dc63f]">Investment Process</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              A structured, professional approach to optimizing your home's comfort and efficiency.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-20 bg-[#8dc63f] rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                    {step.step}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-[#8dc63f]/20 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-[#333333] mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Start My Free Assessment <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Authority Section - Why Choose Greenfoot */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] uppercase tracking-tight">
              Why Trust Us With<br />
              <span className="text-[#8dc63f]">Your Home Asset</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { image: prideImage, title: "Pride in Our Work", desc: "We take pride with every install. Our advisors recommend only the best solutions for your home, budget and needs." },
              { image: experienceImage, title: "Decades of Experience", desc: "Seasoned home comfort advisors, experienced HVAC technicians, and customer service representatives you can trust." },
              { image: satisfactionImage, title: "Complete Satisfaction", desc: "Our goal is 100% satisfaction with our quality of work. We strive to create lifetime relationships with every client." },
              { image: dedicatedImage, title: "Dedicated Service Team", desc: "Our Service-Yeti technicians are dedicated to service. Enjoy peace of mind with responsive, professional support." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
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

      {/* Value Stack - Cost vs Return Comparison */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] mb-4">
              The Choice is <span className="text-[#8dc63f]">Clear</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Compare what happens when you do nothing versus when you invest in your home's comfort.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="grid grid-cols-3 bg-[#333333] text-white font-bold">
                <div className="p-4 text-center"></div>
                <div className="p-4 text-center border-l border-white/20">
                  <span className="text-red-400">Doing Nothing</span>
                </div>
                <div className="p-4 text-center border-l border-white/20">
                  <span className="text-[#8dc63f]">Comfort Investment</span>
                </div>
              </div>
              
              {/* Rows */}
              {comparisonData.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <div className="p-4 font-semibold text-[#333333] flex items-center">
                    {row.category}
                  </div>
                  <div className="p-4 border-l border-slate-200 text-slate-500 text-sm flex items-center">
                    {row.doingNothing}
                  </div>
                  <div className="p-4 border-l border-slate-200 text-[#333333] text-sm flex items-center font-medium">
                    <Check className="w-5 h-5 text-[#8dc63f] mr-2 flex-shrink-0" />
                    {row.investing}
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#333333]">
              Common <span className="text-[#8dc63f]">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Smart Homeowners Don't Just Heat Their Homes.<br />
              <span className="text-[#8dc63f]">They Optimize Them.</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              For less than $2 a day, invest in continuous comfort, lower energy costs, and protected equipment. Start with a free assessment.
            </p>

            {/* Price Tag */}
            <div className="mb-8 flex justify-center">
              <img src={tagImage} alt="Less Than $2 A Day" className="h-24 md:h-32 object-contain" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:18003809384"
                className="bg-white hover:bg-gray-100 text-[#333333] font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
              <Button
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Get My Free Assessment <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
