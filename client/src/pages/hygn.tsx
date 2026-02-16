import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Wrench, Cpu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

import hygnLogo from "@assets/hygn-logo.avif";
import hygnUnit from "@assets/hygn-unit.webp";
import greenfootLogo from "@assets/greenfoot-green-on-black.png";
import canleaseLogo from "@assets/canlease-logo.png";

import hygnHighwayTruck from "@assets/hygn-highway-truck-new.webp";
import hygnGenerator from "@assets/hygn-generator.webp";
import hygnMining from "@assets/hygn-mining.webp";
import hygnConstruction from "@assets/hygn-construction.webp";
import hygnBuses from "@assets/hygn-buses.webp";
import hygnMarine from "@assets/hygn-marine.webp";
import hygnClass8 from "@assets/hygn-class8.webp";
import hygnUtility from "@assets/hygn-utility.webp";
import hygnPickup from "@assets/hygn-pickup.webp";
import hygnRail from "@assets/hygn-rail.webp";
import hygnSaltTruck from "@assets/hygn-utility-salt-truck.webp";
import hygnHeroFleet from "@assets/Fleet-specs-hero-4k_1770039565436.webp";
import lynxLogo from "@assets/LYNX_Green_Black_1770038014723.webp";
import enviroLeaves from "@assets/envrio-background_(Website)_1770038955046.webp";

const equipmentTabs = [
  {
    id: "highway",
    label: "Highway Trucks",
    image: hygnHighwayTruck,
    description: "Hydrogen can be integrated into existing highway truck fleets by supplementing traditional fuels. With the right fueling infrastructure, operators can cut emissions and improve efficiency without replacing their engines. HYGN supports this transition by providing reliable hydrogen supply for blended or auxiliary systems."
  },
  {
    id: "generators",
    label: "Industrial Generators",
    image: hygnGenerator,
    description: "Many industrial facilities rely on diesel generators for backup power. By incorporating hydrogen into these systems, operators can reduce carbon output and extend equipment life. HYGN provides the low-carbon hydrogen needed to help generators run cleaner and more sustainably."
  },
  {
    id: "mining",
    label: "Mining Equipment",
    image: hygnMining,
    description: "Mines often depend on massive haul trucks and heavy gear that can't easily be replaced. Hydrogen can support these operations by blending into existing systems or powering auxiliary equipment, reducing emissions without disrupting productivity. HYGN ensures a dependable supply of clean hydrogen to keep operations moving."
  },
  {
    id: "construction",
    label: "Construction Equipment",
    image: hygnConstruction,
    description: "Hydrogen offers a practical pathway for existing construction fleets to cut emissions. By fueling hybrid systems, retrofits, or on-site power units, hydrogen reduces diesel dependency while extending the usefulness of current equipment. HYGN makes this possible with accessible hydrogen infrastructure."
  },
  {
    id: "buses",
    label: "Long & Short Buses",
    image: hygnBuses,
    description: "Transit operators don't need to replace entire fleets to benefit from hydrogen. By supporting auxiliary power systems or retrofit technologies, hydrogen can help existing buses run cleaner and extend their service life. HYGN's hydrogen supply makes it easier for cities to phase in cleaner operations."
  },
  {
    id: "marine",
    label: "Marine Vessels",
    image: hygnMarine,
    description: "Ships and ferries often run on heavy fuels that are hard to replace outright. Hydrogen can supplement onboard systems, hybrid power, or shore-side fueling to reduce emissions while keeping vessels in service. HYGN provides the hydrogen supply chain to support cleaner maritime operations."
  },
  {
    id: "class8",
    label: "Class-8 Trucks",
    image: hygnClass8,
    description: "Heavy Class 8 trucks are critical to freight, and full replacement isn't always realistic. Hydrogen can be introduced through retrofit systems, auxiliary power, or fuel blending, giving fleets a way to cut emissions while using existing assets. HYGN delivers the hydrogen needed to support that transition."
  },
  {
    id: "utility",
    label: "Utility Vehicles",
    image: hygnUtility,
    description: "Service fleets depend on reliability more than anything. With hydrogen, existing utility vehicles can gain cleaner operation through hybrids, retrofits, or auxiliary units. HYGN ensures consistent hydrogen supply, allowing operators to modernize gradually without losing productivity."
  },
  {
    id: "pickup",
    label: "Pickup Trucks",
    image: hygnPickup,
    description: "Pick-up trucks remain the backbone of many industries. Rather than replacing them, hydrogen can support their operation through supplemental systems or conversion kits that reduce emissions. HYGN provides the clean fuel needed to extend the life and performance of these essential vehicles."
  },
  {
    id: "rail",
    label: "Rail Locomotives",
    image: hygnRail,
    description: "Most locomotives today run on diesel and won't be replaced overnight. Hydrogen offers a bridge by fueling hybrid retrofits or auxiliary power systems, cutting emissions without major infrastructure overhauls. HYGN ensures rail operators have access to hydrogen supply where it's needed."
  },
  {
    id: "salt-truck",
    label: "Utility Salt Trucks",
    image: hygnSaltTruck,
    description: "Municipal salt trucks and snow removal equipment run heavy during winter months. Hydrogen supplementation can reduce emissions during peak seasonal use while extending engine life. HYGN provides the clean fuel solution to help municipalities meet their sustainability goals."
  }
];


export default function HYGNPage() {
  const [activeTab, setActiveTab] = useState("highway");
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const activeEquipment = equipmentTabs.find(tab => tab.id === activeTab) || equipmentTabs[0];

  return (
    <div className="min-h-screen bg-[#333333] font-['Montserrat',sans-serif]">
      <SiteHeader />
      <Helmet>
        <title>HYGN HY-RANGER Hydrogen Kit | Reduce Fuel Costs & Emissions</title>
        <meta name="description" content="Cut fuel costs up to 32% and reduce CO2 emissions up to 30% with the HYGN HY-RANGER hydrogen kit. Easy install for trucks, generators, and heavy equipment." />
        <link rel="canonical" href="https://greenfootenergy.ca/hygn" />
        <meta name="keywords" content="hydrogen kit, HY-RANGER, fuel savings, emissions reduction, fleet hydrogen, HYGN, Greenfoot Energy" />
        <meta property="og:title" content="HYGN HY-RANGER Hydrogen Kit | Reduce Fuel Costs & Emissions" />
        <meta property="og:description" content="Cut fuel costs up to 32% and reduce CO2 emissions up to 30% with the HYGN HY-RANGER hydrogen kit for trucks and heavy equipment." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenfootenergy.ca/hygn" />
        <meta property="og:image" content="https://greenfootenergy.ca/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HYGN HY-RANGER Hydrogen Kit | Reduce Fuel Costs & Emissions" />
        <meta name="twitter:description" content="Cut fuel costs up to 32% and reduce CO2 emissions up to 30% with the HYGN HY-RANGER hydrogen kit." />
        <meta name="twitter:image" content="https://greenfootenergy.ca/opengraph.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${hygnHeroFleet})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/90 via-[#333333]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-flex">
                <img src={hygnLogo} alt="HYGN" className="h-12 md:h-16" />
                <div className="text-white/80 text-sm font-medium">Powered by</div>
                <img src={greenfootLogo} alt="Greenfoot Energy Solutions" className="h-8 md:h-10" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight mb-6">
                CUT FUEL COSTS + <span className="text-[#8dc63f]">REDUCE EMISSIONS</span> WITH HYGN HY-RANGER
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Introducing HYGN HY-RANGER — a state-of-the-art on demand hydrogen kit built specifically for the automotive and heavy equipment industry. It enables a more complete and cleaner combustion process resulting in reduced fuel costs and emissions.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  onClick={scrollToForm}
                  className="bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-hero-book-call"
                >
                  Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <a 
                  href="tel:+18558924946" 
                  className="flex items-center gap-3 text-white hover:text-[#8dc63f] transition-colors font-bold text-lg border-2 border-white/50 hover:border-[#8dc63f] rounded-xl px-6 py-3"
                  data-testid="link-phone-hero"
                >
                  <Phone className="w-5 h-5" />
                  +1 855-892-4946
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean Hydrogen Hero Banner */}
      <section className="relative overflow-hidden bg-[#f8faf7]">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/3 py-16 lg:py-24 px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-tight mb-2">
                Clean
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E5AA8] leading-tight mb-2">
                Hydrogen,
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-tight mb-2">
                Cleaner
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-tight">
                Air
              </h2>
            </motion.div>
          </div>
          <div className="lg:w-1/3 flex justify-center py-8 lg:py-0 relative z-10">
            <motion.img 
              src={hygnUnit} 
              alt="HYGN HY-RANGER Hydrogen Kit" 
              className="w-48 md:w-64 lg:w-72 drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="lg:w-1/3 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <img 
              src={enviroLeaves} 
              alt="Environmental sustainability" 
              className="w-full lg:w-[800px] xl:w-[1000px]"
            />
          </div>
        </div>
      </section>

      {/* Performance Stats Section */}
      <section className="py-16 lg:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
              <span className="text-[#1E5AA8]">HY</span> Performance • <span className="text-[#1E5AA8]">HY</span> Fuel Savings
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2a2a2a] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mb-16 border border-[#8dc63f]/20"
          >
            <h4 className="text-2xl md:text-3xl font-black text-[#8dc63f] uppercase mb-4">THE HY-RANGER</h4>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              A cutting-edge on-demand hydrogen kit designed exclusively for the automotive and heavy equipment industry. Vehicles still use gas or diesel, but with the benefit of extended range and less emissions.
            </p>
            <p className="text-xl font-bold text-white uppercase tracking-widest">
              Reliable • Efficient • Sustainable
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2a2a2a] rounded-2xl p-8 text-center border border-[#8dc63f]/30"
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">Up to 30%</div>
              <p className="text-xl font-bold text-white uppercase mb-2">CO2 Emissions Reduction</p>
              <p className="text-white/60 text-sm">3rd party verified</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#2a2a2a] rounded-2xl p-8 text-center border border-[#8dc63f]/30"
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">Up to 100%</div>
              <p className="text-xl font-bold text-white uppercase mb-2">CO, NOx & PM Reduction</p>
              <p className="text-white/60 text-sm">Tested Results</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#2a2a2a] rounded-2xl p-8 text-center border border-[#8dc63f]/30"
            >
              <div className="text-5xl md:text-6xl font-black text-[#8dc63f] mb-2">10-32%</div>
              <p className="text-xl font-bold text-white uppercase mb-2">In Fuel Savings</p>
              <p className="text-white/60 text-sm">Fleet Proven</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Button
              onClick={scrollToForm}
              className="bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold text-lg px-8 h-14 rounded-xl"
              data-testid="button-free-consultation"
            >
              Free Consultation
            </Button>
            <Button
              onClick={scrollToForm}
              variant="outline"
              className="border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-lg px-8 h-14 rounded-xl"
              data-testid="button-start-pilot"
            >
              Start Pilot Program
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Equipment Tabs Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase mb-4">
              <span className="text-[#8dc63f]">Easy</span> Non-Invasive Install
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Any heavy diesel or gas equipment including trucks, generators, forestry machines, locomotives, marine vessels, and more can benefit from our on-demand hydrogen kit technology.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {equipmentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-[#8dc63f] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#333333]"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto"
          >
            <div className="order-2 lg:order-1">
              <img
                src={activeEquipment.image}
                alt={activeEquipment.label}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-black text-[#8dc63f] uppercase mb-4">
                {activeEquipment.label}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {activeEquipment.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 lg:py-24 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">
              Why <span className="text-[#8dc63f]">Fleet Operators</span> Choose HY-RANGER
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/20"
            >
              <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#8dc63f]" />
              </div>
              <h3 className="text-xl font-bold text-[#8dc63f] uppercase mb-2">Engine Optimization</h3>
              <p className="text-white/70 text-sm">Improved engine performance and efficiency. Hydrogen cleans out carbon for a longer-lasting engine.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/20"
            >
              <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#8dc63f]" />
              </div>
              <h3 className="text-xl font-bold text-[#8dc63f] uppercase mb-2">Safe Technology</h3>
              <p className="text-white/70 text-sm">Hydrogen on demand — never stored or under pressure. Only created when the engine needs it, and used right away.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/20"
            >
              <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-[#8dc63f]" />
              </div>
              <h3 className="text-xl font-bold text-[#8dc63f] uppercase mb-2">Keep Fleets Longer</h3>
              <p className="text-white/70 text-sm">Lower emissions without impacting performance. Get full depreciation from your diesel fleet investment.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/20"
            >
              <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-[#8dc63f]" />
              </div>
              <h3 className="text-xl font-bold text-[#8dc63f] uppercase mb-2">Smart Technology</h3>
              <p className="text-white/70 text-sm">Our smart electrolyzer communicates with the engine to provide exactly the amount of hydrogen it needs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LYNX Emissions Partnership Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#2a2a2a] to-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 lg:p-8">
                <img src={lynxLogo} alt="LYNX Emissions" className="h-16 md:h-20 w-auto" />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">
                  3rd Party Verified by <span className="text-[#8dc63f]">LYNX Emissions</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Independent emissions testing across pick-up trucks, mining vehicles, construction equipment, buses, Class-8 trucks, utility trucks, and more.
                </p>
              </div>
            </div>

            {/* Test Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">2018 Dodge RAM 1500 • 5.7L Hemi</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">96%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">87%</div>
                    <p className="text-white/80 text-sm">NOx Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">2021 Ford Excursion • 3.5L V6 EcoBoost</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">83%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">98%</div>
                    <p className="text-white/80 text-sm">NOx Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">2025 Dodge RAM 1500 • 5.7L Hemi</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">97%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">2024 Ford F-350 • 6.7L Turbo Diesel</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">66%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">Caterpillar 826H • C15 Engine</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">18%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">31%</div>
                    <p className="text-white/80 text-sm">NOx Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#8dc63f]/30"
              >
                <p className="text-white/60 text-sm mb-2">2025 Ford F-150 • 3.5L EcoBoost V6</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-4xl font-black text-[#8dc63f]">93%</div>
                    <p className="text-white/80 text-sm">CO Reduction</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <div className="bg-[#2a2a2a] rounded-xl p-8 border border-[#8dc63f]/30 inline-block">
                <h4 className="text-xl font-bold text-[#8dc63f] uppercase mb-3">Full Emissions Test Report</h4>
                <p className="text-white/70 mb-4">
                  View our complete brochure with test results across all vehicle types including mining, buses, and Class-8 trucks.
                </p>
                <a
                  href="https://cdn.prod.website-files.com/68874c9990cff00613a8653e/697a5e80d266ce1bb96572f1_HY-RANGER%20Power%20Generation%20Brochure-compressed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold px-6 py-3 rounded-xl transition-all"
                  data-testid="link-pdf-brochure"
                >
                  Download PDF Report <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={formRef} id="lander-form" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase mb-4">
              Get Your <span className="text-[#8dc63f]">Free Assessment</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Ready to reduce fuel costs and emissions for your fleet? Book a free consultation with our hydrogen specialists today.
            </p>
            <a
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold text-lg px-10 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all gap-2"
              data-testid="button-book-assessment"
            >
              Book Your Free Assessment <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 lg:py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#8dc63f] to-[#6ba32d] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-6">
                Financing Options Available
              </h3>
              <div className="bg-white rounded-xl p-4 mb-6">
                <img src={canleaseLogo} alt="Canlease" className="h-12 md:h-14" />
              </div>
              <p className="text-white/90 text-lg mb-6 max-w-xl">
                Flexible financing options available for fleet operators—conditions apply. Get your hydrogen kit installed with payment plans that work for your business.
              </p>
              <a
                href="https://canlease.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#333333] font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-lg"
                data-testid="link-financing"
              >
                Learn More <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-6">
              Ready to <span className="text-[#8dc63f]">Cut Costs</span> & <span className="text-[#8dc63f]">Reduce Emissions</span>?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join the growing number of fleet operators who are saving money and reducing their environmental impact with HYGN HY-RANGER.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={scrollToForm}
                className="bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold text-lg px-10 h-14 rounded-xl"
                data-testid="button-footer-cta"
              >
                Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a 
                href="tel:+18558924946" 
                className="flex items-center gap-3 text-white hover:text-[#8dc63f] transition-colors font-bold text-lg border-2 border-white/50 hover:border-[#8dc63f] rounded-xl px-6 py-3"
                data-testid="link-phone-footer"
              >
                <Phone className="w-5 h-5" />
                +1 855-892-4946
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
