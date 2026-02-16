import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const generatorFAQs: FAQItem[] = [
  {
    category: "General",
    question: "What size generator do I need for my home?",
    answer: "The generator size depends on your home's electrical load. For essential circuits (lights, refrigerator, internet), an 18KW generator is sufficient. For additional appliances like stoves, washers, and dryers, a 22KW is recommended. For whole-home coverage including heating and hot tubs, a 26KW generator provides full protection. Our free in-home assessment calculates your exact needs."
  },
  {
    category: "General",
    question: "How much does a whole-home generator cost in Canada?",
    answer: "Whole-home generator costs in Canada typically range from $8,000 to $20,000+ depending on size (18KW to 26KW), installation complexity, and fuel type. This includes the generator unit, transfer switch, concrete pad, and professional installation. Greenfoot offers financing options and free assessments to provide accurate quotes for your specific situation."
  },
  {
    category: "General",
    question: "What is the difference between a standby generator and a portable generator?",
    answer: "Standby generators are permanently installed outside your home and automatically turn on within seconds of a power outage. They connect to your home's electrical panel and run on natural gas or propane. Portable generators are smaller, require manual setup during an outage, run on gasoline, and power only a few circuits. Standby generators offer superior convenience, safety, and whole-home protection."
  },
  {
    category: "Installation",
    question: "How long does generator installation take?",
    answer: "Most residential generator installations are completed in 1-2 days. The process includes pouring a concrete pad (if needed), installing the generator unit and transfer switch, connecting fuel lines and electrical, and system testing. Before installation, you'll have an assessment visit and electrical site verification, with the entire process typically taking 2-4 weeks from initial consultation to completion."
  },
  {
    category: "Installation",
    question: "Do I need a permit for a generator installation?",
    answer: "Yes, generator installations require electrical permits in most Canadian provinces. Greenfoot handles all permit applications and inspections as part of our installation service. We ensure your installation meets all local electrical codes and safety requirements in Nova Scotia, New Brunswick, PEI, Newfoundland, and British Columbia."
  },
  {
    category: "Installation",
    question: "Where should a home generator be installed?",
    answer: "Home generators are typically installed outside on a concrete pad, positioned at least 5 feet from windows, doors, and vents to ensure exhaust disperses safely. The location should allow easy access for maintenance and fuel delivery. Our technicians evaluate your property during the free assessment to determine the optimal placement considering safety codes, noise considerations, and aesthetics."
  },
  {
    category: "Operation",
    question: "How does a standby generator automatically turn on?",
    answer: "Standby generators use an automatic transfer switch (ATS) that continuously monitors your home's electrical supply. When power is lost, the ATS signals the generator to start within 10-30 seconds. Once the generator reaches operating speed, the ATS transfers your home's circuits to generator power. When utility power returns, the ATS automatically switches back and shuts down the generator."
  },
  {
    category: "Operation",
    question: "How long can a generator run continuously?",
    answer: "Standby generators can run continuously for days or even weeks as long as fuel is available. Natural gas units connected to city lines have unlimited runtime. Propane units depend on tank size—a 500-gallon tank can power an average home for 5-7 days. Generators automatically perform weekly self-tests (typically 10-15 minutes) to ensure reliability during emergencies."
  },
  {
    category: "Fuel",
    question: "Is natural gas or propane better for a home generator?",
    answer: "Both fuels are excellent choices. Natural gas provides unlimited fuel supply through city connections, making it ideal for extended outages. Propane is stored in tanks on your property, ensuring fuel availability even if gas lines are affected. Propane also offers slightly higher energy output per unit. Our generators work with both fuels, and we recommend based on your location and existing utility connections."
  },
  {
    category: "Fuel",
    question: "How much fuel does a generator use per hour?",
    answer: "Fuel consumption varies by generator size and electrical load. An 18KW generator typically uses 2-3 gallons of propane per hour at 50% load. A 26KW unit may use 3-4 gallons per hour. Natural gas consumption is measured in cubic feet, with similar proportional usage. Modern generators adjust fuel consumption based on demand, running more efficiently at partial loads."
  },
  {
    category: "Maintenance",
    question: "How often does a generator need maintenance?",
    answer: "Home generators require annual professional maintenance including oil and filter changes, spark plug inspection, battery testing, and full system inspection. Generators run automatic weekly self-tests, but an annual service ensures optimal performance when you need it most. Greenfoot offers maintenance plans that keep your system tested, tuned, and warranty-compliant."
  },
  {
    category: "Maintenance",
    question: "What is the lifespan of a home generator?",
    answer: "With proper maintenance, quality standby generators last 20-30 years. The Briggs & Stratton generators we install feature commercial-grade Vanguard® engines designed for long-term reliability. Regular maintenance, quality fuel, and protected installation significantly extend generator life. Our 7-year comprehensive warranty covers parts, labor, and travel."
  },
  {
    category: "Benefits",
    question: "Will a generator increase my home's value?",
    answer: "Yes, a professionally installed whole-home generator can increase property value by $3,000 to $5,000 or more. In areas prone to power outages, generators are a significant selling point. Real estate studies show homes with backup power systems sell faster and at higher prices. The investment also protects against costly outage-related damage like frozen pipes and spoiled food."
  },
  {
    category: "Benefits",
    question: "Do generators lower homeowners insurance?",
    answer: "Many insurance companies offer discounts of 5-15% on homeowners premiums for homes with standby generators. Generators prevent costly claims from frozen pipes, sump pump failures, and food spoilage during outages. Contact your insurance provider to inquire about potential savings—the discount often helps offset annual maintenance costs."
  },
  {
    category: "Safety",
    question: "Are home generators safe?",
    answer: "Professional-installed standby generators are very safe. They're positioned outside where exhaust disperses naturally, eliminating carbon monoxide risks associated with portable generators. Automatic transfer switches prevent dangerous backfeed to utility lines. Our installations meet all electrical codes and include proper grounding, weather-resistant enclosures, and safety shutoffs."
  }
];

export function GeneratorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(generatorFAQs.map(faq => faq.category)))];
  
  const filteredFAQs = activeCategory === "All" 
    ? generatorFAQs 
    : generatorFAQs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-slate-50" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] font-bold px-4 py-2 rounded-full text-sm mb-4">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
            Your <span className="text-[#8dc63f]">Generator Questions</span> Answered
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Everything you need to know about whole-home generators, installation, costs, and maintenance.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeCategory === category
                  ? 'bg-[#8dc63f] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
              data-testid={`faq-filter-${category.toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                data-testid={`faq-question-${index}`}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#8dc63f] flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-[#333333] pr-4">{faq.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pl-12">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Schema.org FAQPage structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": generatorFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }} />
      </div>
    </section>
  );
}

export { generatorFAQs };
