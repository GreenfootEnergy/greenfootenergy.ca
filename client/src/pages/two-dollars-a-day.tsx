import { motion } from "framer-motion";
import { Zap, TrendingDown, Home, Leaf, ChevronRight, Phone, Coffee, Tv, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import cozyHomeBg from "@assets/cozy-home-interior-bg.jpg";
import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";

const benefits = [
  {
    icon: TrendingDown,
    title: "Up to 50% Energy Savings",
    description: "A mini-split heat pump can reduce energy use compared to older oil or electric systems.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Home,
    title: "Heating & Cooling in One",
    description: "Year-round comfort from a single efficient system. No separate AC needed.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Leaf,
    title: "Built for Canadian Winters",
    description: "Modern heat pumps work efficiently even when temperatures drop below -30°C.",
    color: "from-[#8dc63f] to-[#6CBE45]"
  },
  {
    icon: Zap,
    title: "Infrastructure That Pays Back",
    description: "Unlike most home expenses, a heat pump can lower your monthly costs over time.",
    color: "from-amber-500 to-orange-600"
  }
];

export default function TwoDollarsADayPage() {
  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Finance a Heat Pump for About $2 a Day | Greenfoot Energy</title>
        <meta name="description" content="Your $7 latte is gone in 10 minutes. Your heating bill shows up every month. Finance a mini-split heat pump for around $2/day and start saving up to 50% on energy." />
        <meta name="keywords" content="heat pump financing, $2 a day heat pump, affordable heat pump, mini-split financing, energy savings, Greenfoot Energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/2-a-day" />
        
        <meta property="og:title" content="ROI > Latte | Finance a Heat Pump for About $2 a Day" />
        <meta property="og:description" content="Your morning latte? $7. Gone forever. Your heating bill? Up to 50% savings with a heat pump." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/2-a-day" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ROI > Latte | Heat Pump Financing" />
        <meta name="twitter:description" content="Finance a heat pump for around $2/day. Comfort now. Pay over time." />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={cozyHomeBg} 
            alt="Cozy home interior" 
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
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
                <Zap className="w-4 h-4" />
                Flexible Financing Available
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                ROI <span className="text-[#8dc63f]">&gt;</span> Latte
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl leading-relaxed">
                A mini-split heat pump can deliver savings and better comfort — and many homeowners finance the upgrade instead of paying upfront.
              </p>

              {/* Comparison Cards */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="bg-[#333333]/80 border border-white/10 rounded-xl p-4 text-center">
                  <Coffee className="w-6 h-6 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60 text-xs mb-1">Your Morning Latte?</p>
                  <p className="text-white text-sm font-black">$7. Gone Forever.</p>
                </div>
                <div className="bg-[#333333]/80 border border-white/10 rounded-xl p-4 text-center">
                  <Tv className="w-6 h-6 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60 text-xs mb-1">Your Streaming Subs?</p>
                  <p className="text-white text-sm font-black">$25/mo. Zero Return.</p>
                </div>
                <div className="bg-[#8dc63f]/20 border border-[#8dc63f]/40 rounded-xl p-4 text-center">
                  <Flame className="w-6 h-6 text-[#8dc63f] mx-auto mb-2" />
                  <p className="text-[#8dc63f]/80 text-xs mb-1">Your Heating Bill?</p>
                  <p className="text-[#8dc63f] text-sm font-black">Up to 50% Savings.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get Free Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-10 h-12 sm:h-14 rounded-xl"
                  asChild
                >
                  <a href="/financing" target="_blank" rel="noopener noreferrer">
                    Learn About Financing
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
                src={gridlessUnit} 
                alt="Gridless by HiSense Heat Pump" 
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#8dc63f] px-6 py-3 rounded-full shadow-xl">
                <span className="text-sm font-black text-[#333333]">Finance for ~$2/day</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8dc63f]/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Don't Just Spend Your $2 a Day. <span className="text-[#8dc63f]">Invest It.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Turn your HVAC from a monthly expense into a long-term asset. A ductless mini-split heat pump is one of the only home upgrades that can pay you back over time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
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
                    Call 1-800-380-9384
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              Why a Heat Pump is a <span className="text-[#8dc63f]">Smart Investment</span>
            </h2>
            <p className="text-lg text-slate-600">
              Most home expenses never come back to you. A mini-split heat pump is different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-[#8dc63f]/30 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-[#333333] mb-3">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Financing Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
                Comfort Now. <span className="text-[#8dc63f]">Pay Over Time.</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Many homeowners choose to finance their heat pump upgrade, making it easier to improve comfort now and pay over time.
              </p>
            </motion.div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-[#8dc63f]">1</span>
                  </div>
                  <h3 className="font-bold text-[#333333] mb-2">Get a Free Quote</h3>
                  <p className="text-sm text-slate-500">We'll price your home, show rebates, and review financing options.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-[#8dc63f]">2</span>
                  </div>
                  <h3 className="font-bold text-[#333333] mb-2">Choose Your Plan</h3>
                  <p className="text-sm text-slate-500">Select a financing option that fits your budget.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-[#8dc63f]">3</span>
                  </div>
                  <h3 className="font-bold text-[#333333] mb-2">Start Saving</h3>
                  <p className="text-sm text-slate-500">Enjoy comfort immediately while your energy bills go down.</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-12 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                >
                  Get Your Free Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-slate-400 mt-4">No pressure. Just a quote to see what it looks like for your home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Ready to <span className="text-[#8dc63f]">Invest in Comfort?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Get a free quote and see rebates + financing options. If you own your home, this is worth looking at.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
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
