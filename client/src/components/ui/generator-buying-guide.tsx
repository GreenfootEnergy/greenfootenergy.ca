import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Fuel, Wrench, Plug, Check, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Home & kW Assessment",
    icon: Home,
    description: "Greenfoot Home Comfort Advisor conducts an in-home assessment to determine the best generator option for your home.",
    details: [
      "Evaluate your home's electrical load requirements",
      "Assess fuel source options (natural gas or propane)",
      "Determine optimal generator placement",
      "Provide detailed written quote with specs and pricing"
    ]
  },
  {
    number: 2,
    title: "Home Owner Homework",
    icon: Fuel,
    description: "Prepare your home for installation by coordinating gas delivery.",
    details: [
      "Do you already have gas? YES: Homework is complete!",
      "NO: Contact your gas provider to set up an account",
      "Schedule equipment delivery BEFORE the disconnect/reconnect date",
      "Greenfoot applies for the necessary electrical permit"
    ],
    highlight: "The power company will provide a disconnect/reconnect date, which becomes your deadline to ensure gas is in place."
  },
  {
    number: 3,
    title: "Generator On Site",
    icon: Wrench,
    description: "Greenfoot completes the generator installation by pouring the concrete pad and installing the generator.",
    details: [
      "Pour concrete pad if required",
      "Position and install generator unit",
      "Prepare for electrical and gas connections"
    ],
    warning: "Confirmation that the gas tank is on-site and ready is required before proceeding. Failure to have gas in place will result in rescheduling fees and delays."
  },
  {
    number: 4,
    title: "Final Connections",
    icon: Plug,
    description: "Complete all connections and bring your system online.",
    details: [
      "Greenfoot Electrician completes the electrical connection",
      "Gas technician connects the gas tank to the generator",
      "System testing and demonstration",
      "Walk through maintenance and operation"
    ]
  }
];

const investmentReasons = [
  "Protect against storm damage & costs (water damage, food spoilage)",
  "Lower homeowners insurance premiums",
  "Comfort during power outages",
  "Increased property value"
];

export function GeneratorBuyingGuide() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
            How Do I <span className="text-[#8dc63f]">Buy a Generator</span> for My Home?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our streamlined 4-step process makes getting whole-home backup power simple and stress-free.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                  index === activeStep
                    ? 'bg-[#8dc63f] text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                data-testid={`buying-guide-step-${step.number}`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === activeStep ? 'bg-white/20' : 'bg-[#8dc63f]/20 text-[#8dc63f]'
                }`}>
                  {step.number}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Step Details */}
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#8dc63f] rounded-2xl flex items-center justify-center">
                  {(() => {
                    const IconComponent = steps[activeStep].icon;
                    return <IconComponent className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div>
                  <span className="text-[#8dc63f] font-bold text-sm uppercase tracking-wider">Step {steps[activeStep].number}</span>
                  <h3 className="text-2xl font-black text-[#333333]">{steps[activeStep].title}</h3>
                </div>
              </div>

              <p className="text-slate-600 mb-6">{steps[activeStep].description}</p>

              <ul className="space-y-3">
                {steps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{detail}</span>
                  </li>
                ))}
              </ul>

              {steps[activeStep].highlight && (
                <div className="mt-6 bg-[#8dc63f]/10 border border-[#8dc63f]/30 rounded-xl p-4">
                  <p className="text-[#333333] text-sm">{steps[activeStep].highlight}</p>
                </div>
              )}

              {steps[activeStep].warning && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm">{steps[activeStep].warning}</p>
                </div>
              )}
            </div>

            {/* Why Make the Investment */}
            <div className="bg-[#333333] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">Why Make the Investment?</h3>
              
              <ul className="space-y-4 mb-8">
                {investmentReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#8dc63f] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{reason}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-[#8dc63f] text-white font-black text-xl px-4 py-2 rounded-xl">
                    7 YEAR
                  </div>
                  <div>
                    <p className="font-bold text-white">Warranty</p>
                    <p className="text-white/70 text-sm">on parts, labour, and travel</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">Vanguard® Commercial-Grade Engine</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                data-testid="button-buying-guide-cta"
              >
                Get Started Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeStep ? 'bg-[#8dc63f] w-8' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
