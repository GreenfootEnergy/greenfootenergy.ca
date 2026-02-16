import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";

const faqs = [
  // Air Conditioning
  {
    category: "Air Conditioning",
    question: "How often should I have my air conditioning system serviced?",
    answer: "We recommend professional AC maintenance twice a year—once in spring before cooling season and once in fall. Regular servicing helps maintain efficiency, prevents breakdowns, and extends your system's lifespan. Our certified technicians serve customers across New Brunswick, Nova Scotia, Newfoundland & Labrador, Prince Edward Island, and British Columbia with 17 convenient locations."
  },
  {
    category: "Air Conditioning",
    question: "What size air conditioner do I need for my home?",
    answer: "Proper AC sizing depends on your home's square footage, ceiling height, insulation quality, and local climate conditions. Our HVAC professionals perform detailed load calculations to determine the right tonnage for optimal comfort and efficiency. Contact us for a free assessment and personalized quote."
  },
  {
    category: "Air Conditioning",
    question: "How long does a residential air conditioning system typically last?",
    answer: "With proper maintenance, most central air conditioners operate reliably for 10-15 years. Regular tune-ups, filter changes, and prompt repairs can help maximize your system's lifespan and performance."
  },
  {
    category: "Air Conditioning",
    question: "Why is my air conditioner blowing warm air?",
    answer: "Common causes include low refrigerant levels, a malfunctioning outdoor condenser, or thermostat issues. Our experienced technicians can quickly diagnose and resolve the problem to restore your home's comfort."
  },
  {
    category: "Air Conditioning",
    question: "How can I improve my air conditioner's energy efficiency?",
    answer: "Regular maintenance, clean filters, proper thermostat settings (74-76°F in summer), and ensuring good airflow around your outdoor unit all help improve efficiency. Our team can provide personalized energy-saving recommendations during your service visit."
  },
  {
    category: "Air Conditioning",
    question: "What does SEER rating mean and why is it important?",
    answer: "SEER (Seasonal Energy Efficiency Ratio) measures your AC's cooling output per unit of energy consumed. Higher SEER ratings (16-20+) mean lower operating costs and better environmental performance."
  },
  // Batt & Poly Insulation
  {
    category: "Batt & Poly Insulation",
    question: "What is batt and poly insulation and where is it used?",
    answer: "Batt insulation consists of pre-cut fiberglass or mineral wool sections that fit between wall studs, floor joists, and ceiling rafters. The poly vapor barrier controls moisture and air infiltration. This combination is ideal for new construction and renovation projects throughout our Atlantic Canada and British Columbia service areas."
  },
  {
    category: "Batt & Poly Insulation",
    question: "What R-value do I need for my climate zone?",
    answer: "R-value requirements vary by region and application. In our colder Maritime provinces, we typically recommend R-20+ for walls and R-40+ for attics. Our insulation specialists assess your specific needs and local building codes to recommend the optimal R-value."
  },
  {
    category: "Batt & Poly Insulation",
    question: "Can I install batt and poly insulation myself?",
    answer: "While DIY installation is possible, proper installation requires attention to detail to avoid gaps, compression, and vapor barrier continuity. Professional installation ensures maximum performance and building code compliance. Contact us for a quote on expert installation."
  },
  {
    category: "Batt & Poly Insulation",
    question: "How does batt insulation help with soundproofing?",
    answer: "Dense batt materials like mineral wool effectively reduce airborne noise transmission between rooms and from outside. Proper installation with continuous coverage provides both thermal and acoustic benefits for your home."
  },
  {
    category: "Batt & Poly Insulation",
    question: "What's the difference between fiberglass and mineral wool batts?",
    answer: "Fiberglass batts are cost-effective and widely available, while mineral wool offers superior fire resistance, soundproofing, and moisture resistance. Our team can help you choose the best material for your specific application and budget."
  },
  {
    category: "Batt & Poly Insulation",
    question: "How long does batt and poly insulation last?",
    answer: "Quality batt insulation typically lasts 20-30 years when properly installed and protected from moisture. The poly vapor barrier should remain intact throughout this period to maintain effectiveness."
  },
  // Blown-In Insulation
  {
    category: "Blown-In Insulation",
    question: "What is blown-in insulation and what are its advantages?",
    answer: "Blown-in insulation uses loose-fill materials like cellulose or fiberglass that are pneumatically installed into wall cavities, attics, and hard-to-reach spaces. It provides excellent coverage around obstacles and fills gaps that batt insulation might miss, making it ideal for retrofits and irregular spaces."
  },
  {
    category: "Blown-In Insulation",
    question: "Is blown-in insulation better than batt insulation?",
    answer: "Blown-in insulation offers superior coverage and air sealing compared to batts, especially in existing homes. It conforms to irregular spaces and provides more consistent thermal performance. Our insulation experts can evaluate your home to recommend the best solution."
  },
  {
    category: "Blown-In Insulation",
    question: "How much blown-in insulation do I need in my attic?",
    answer: "The amount depends on your climate zone and desired R-value. In our service areas across the Maritimes and BC, we typically recommend achieving R-40 to R-60 in attics. Our team calculates the exact coverage needed based on your attic area and current insulation levels."
  },
  {
    category: "Blown-In Insulation",
    question: "Can blown-in insulation settle over time?",
    answer: "Some settling is normal, particularly with cellulose insulation. Quality installation accounts for this by slightly over-filling to maintain the target R-value. We provide warranties on our installation work to ensure long-term performance."
  },
  {
    category: "Blown-In Insulation",
    question: "What's the difference between cellulose and fiberglass blown-in insulation?",
    answer: "Cellulose is made from recycled paper and offers excellent air sealing properties, while fiberglass provides consistent R-value and doesn't settle as much. Both are effective options, and our specialists help you choose based on your specific needs and budget."
  },
  {
    category: "Blown-In Insulation",
    question: "How long does blown-in insulation installation take?",
    answer: "Most residential attic installations are completed in 2-4 hours, depending on the area size and access. Wall cavity installations may take longer but are typically finished in one day."
  },
  // Commercial HVAC
  {
    category: "Commercial HVAC",
    question: "What commercial HVAC services does Greenfoot provide?",
    answer: "We offer comprehensive commercial HVAC solutions including system design, installation, maintenance, and emergency repairs for businesses across our 17 locations. For detailed information about our commercial services, pricing, and capabilities, please visit our dedicated commercial page or contact our commercial team directly."
  },
  {
    category: "Commercial HVAC",
    question: "Do you service large commercial buildings and industrial facilities?",
    answer: "Yes, our certified commercial technicians have experience with various commercial and industrial HVAC systems. We work with businesses of all sizes throughout New Brunswick, Nova Scotia, Newfoundland & Labrador, Prince Edward Island, and British Columbia. Please contact our commercial division for a consultation."
  },
  {
    category: "Commercial HVAC",
    question: "What types of commercial HVAC systems do you install?",
    answer: "We install and service rooftop units, chillers, boilers, VRF systems, and custom commercial solutions. Our commercial team designs systems tailored to your business needs and building requirements."
  },
  {
    category: "Commercial HVAC",
    question: "Do you offer commercial HVAC maintenance contracts?",
    answer: "Yes, we provide comprehensive maintenance agreements for commercial clients to ensure optimal system performance and minimize downtime. Contact our commercial team to discuss customized maintenance plans for your facility."
  },
  {
    category: "Commercial HVAC",
    question: "How quickly can you respond to commercial HVAC emergencies?",
    answer: "We understand that HVAC failures can impact business operations. Our commercial emergency service team provides rapid response to minimize disruption to your business. Contact our commercial division for details about emergency service availability in your area."
  },
  // Commercial Solar
  {
    category: "Commercial Solar",
    question: "Does Greenfoot install commercial solar systems?",
    answer: "Yes, we provide commercial solar solutions for businesses looking to reduce energy costs and environmental impact. Our commercial solar team designs and installs systems tailored to your facility's energy needs across our service regions in Atlantic Canada and British Columbia."
  },
  {
    category: "Commercial Solar",
    question: "What size commercial solar systems do you install?",
    answer: "We handle commercial solar projects of various scales, from small business rooftop installations to large ground-mount arrays. For specific information about commercial solar sizing, financing options, and project timelines, please visit our commercial page or contact our commercial solar specialists."
  },
  {
    category: "Commercial Solar",
    question: "Are there incentives available for commercial solar installations?",
    answer: "Commercial solar incentives vary by province and may include tax credits, rebates, and accelerated depreciation benefits. Our commercial team stays current on available programs and can help you maximize financial incentives for your solar investment."
  },
  {
    category: "Commercial Solar",
    question: "How long does a commercial solar installation take?",
    answer: "Project timelines vary based on system size, site complexity, and permitting requirements. Our commercial solar team provides detailed project schedules during the consultation process to help you plan accordingly."
  },
  {
    category: "Commercial Solar",
    question: "Do you provide commercial solar maintenance and monitoring?",
    answer: "Yes, we offer comprehensive maintenance and monitoring services to ensure optimal performance of your commercial solar investment. Our commercial team can design a maintenance plan that fits your operational needs and budget."
  },
  // Ducted-Central Heat Pumps
  {
    category: "Ducted-Central Heat Pumps",
    question: "What is a ducted central heat pump system?",
    answer: "A ducted central heat pump uses your home's existing ductwork to provide both heating and cooling throughout your entire house. It's an energy-efficient alternative to traditional furnace and air conditioning combinations, ideal for homes across our service areas in the Maritimes and British Columbia."
  },
  {
    category: "Ducted-Central Heat Pumps",
    question: "Can a central heat pump replace my furnace and air conditioner?",
    answer: "Yes, a properly sized central heat pump can completely replace both your furnace and AC unit, providing year-round comfort with a single, efficient system. Our HVAC specialists assess your home's heating and cooling needs to recommend the right solution."
  },
  {
    category: "Ducted-Central Heat Pumps",
    question: "Do central heat pumps work effectively in cold Maritime winters?",
    answer: "Modern cold-climate heat pumps maintain efficient operation even in sub-zero temperatures common in our Atlantic provinces. Advanced technology allows these systems to provide reliable heating while significantly reducing energy costs compared to traditional heating methods."
  },
  {
    category: "Ducted-Central Heat Pumps",
    question: "How much can I save with a central heat pump system?",
    answer: "Savings vary based on your current heating system, home size, and energy usage patterns. Many homeowners see 30-50% reductions in heating and cooling costs. We provide personalized energy savings estimates during our free consultation."
  },
  {
    category: "Ducted-Central Heat Pumps",
    question: "What maintenance does a central heat pump require?",
    answer: "Central heat pumps need regular filter changes, annual professional tune-ups, and keeping the outdoor unit clear of debris. Our maintenance plans ensure optimal performance and extend system life across all seasons."
  },
  {
    category: "Ducted-Central Heat Pumps",
    question: "How long do central heat pump systems last?",
    answer: "With proper maintenance, quality central heat pumps typically operate reliably for 15-20 years. Regular professional service helps maximize lifespan and maintain efficiency throughout the system's life."
  },
  // Generators
  {
    category: "Generators",
    question: "What types of generators does Greenfoot install?",
    answer: "We install standby generators that automatically provide backup power during outages, ensuring your home's essential systems continue operating. Our generator solutions are particularly valuable given the weather challenges common across our Maritime and BC service areas."
  },
  {
    category: "Generators",
    question: "How do I determine what size generator I need?",
    answer: "Generator sizing depends on which appliances and systems you want to power during an outage. Our specialists assess your electrical panel and priority loads to recommend the right capacity for your needs and budget."
  },
  {
    category: "Generators",
    question: "Do generators require regular maintenance?",
    answer: "Yes, standby generators need periodic maintenance including oil changes, filter replacements, and system testing to ensure reliable operation when needed. We offer comprehensive maintenance plans to keep your generator ready for any power outage."
  },
  {
    category: "Generators",
    question: "How long does generator installation typically take?",
    answer: "Most residential standby generator installations are completed in one day, though site preparation and electrical work may extend the timeline. Our installation team provides accurate scheduling during your consultation."
  },
  {
    category: "Generators",
    question: "What fuel options are available for standby generators?",
    answer: "We install natural gas and propane-powered generators, depending on your property's utility connections and preferences. Our team helps you choose the most practical and cost-effective fuel option for your location."
  },
  {
    category: "Generators",
    question: "Do I need permits for generator installation?",
    answer: "Yes, generator installations typically require electrical and building permits. Our certified installers handle all permitting requirements and ensure code-compliant installation throughout our service regions."
  }
];

const categories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category)))];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#8dc63f] transition-colors pr-8">
          {faq.question}
        </h3>
        <div className="flex-shrink-0 bg-slate-100 rounded-full p-2 group-hover:bg-[#8dc63f]/10 transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5 text-[#8dc63f]" /> : <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-[#8dc63f]" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-slate-600 leading-relaxed pr-12">
              {faq.answer}
              <div className="mt-4">
                <span className="inline-block bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {faq.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useLanguage();

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FAQs | Heat Pumps, HVAC & Insulation | Greenfoot</title>
        <meta name="description" content="Find answers to common questions about heat pumps, HVAC, insulation, solar & generators. Expert guidance from Greenfoot Energy Solutions." />
        <meta name="keywords" content="HVAC FAQ, heat pump questions, insulation FAQ, solar FAQ, energy efficiency questions, home comfort answers, Greenfoot FAQ" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/faq" />
        
        <meta property="og:title" content="FAQs | Heat Pumps, HVAC & Insulation | Greenfoot" />
        <meta property="og:description" content="Get answers to common questions about heat pumps, HVAC, insulation & solar from Greenfoot's experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/faq" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greenfoot Energy FAQs" />
        <meta name="twitter:description" content="Answers to common questions about heat pumps, HVAC, insulation & solar." />
      </Helmet>
      
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="bg-[#333333] pt-24 pb-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            {t.faq.title}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            {t.faq.subtitle}
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8dc63f] transition-colors w-6 h-6" />
            <Input 
              placeholder={t.faq.searchPlaceholder}
              className="bg-white text-slate-900 h-16 pl-16 pr-6 rounded-full border-0 shadow-2xl text-lg focus-visible:ring-2 focus-within:ring-[#8dc63f]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container mx-auto px-4 max-w-5xl">
          <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
            <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
              <TabsList className="bg-transparent h-auto gap-2 inline-flex whitespace-nowrap p-0">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-6 py-3 rounded-full font-bold data-[state=active]:bg-[#8dc63f] data-[state=active]:text-white text-slate-600 hover:text-[#8dc63f] transition-all bg-white shadow-sm border border-slate-100"
                  >
                    {category === "All" ? t.faq.categories.all : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 lg:p-12">
              {filteredFaqs.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredFaqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 uppercase">{t.faq.noResults}</h3>
                  <p className="text-slate-400">{t.faq.tryDifferentSearch}</p>
                  <button 
                    onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
                    className="mt-6 text-[#8dc63f] font-bold hover:underline"
                  >
                    {t.faq.clearFilters}
                  </button>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
