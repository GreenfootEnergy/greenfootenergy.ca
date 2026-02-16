import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight, Zap, Home, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  essentials: boolean;
  essentialsPlus: boolean;
  interruptionFree: boolean;
}

const appliances: Appliance[] = [
  { id: "lights", name: "Lights", wattage: 500, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "plugs", name: "Plugs", wattage: 300, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "internet", name: "Internet", wattage: 100, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "refrigerator", name: "Refrigerator", wattage: 700, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "deepFreeze", name: "Deep Freeze", wattage: 500, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "wellPump", name: "Well Pump", wattage: 1500, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "liftPumpSump", name: "Lift Pump - Sump", wattage: 800, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "liftStationBathrooms", name: "Lift Station - Bathrooms", wattage: 1000, essentials: true, essentialsPlus: true, interruptionFree: true },
  { id: "ranges", name: "Ranges", wattage: 3000, essentials: false, essentialsPlus: true, interruptionFree: true },
  { id: "washer", name: "Washer", wattage: 500, essentials: false, essentialsPlus: true, interruptionFree: true },
  { id: "dryer", name: "Dryer", wattage: 5000, essentials: false, essentialsPlus: true, interruptionFree: true },
  { id: "hotWater", name: "Hot Water", wattage: 4500, essentials: false, essentialsPlus: true, interruptionFree: true },
  { id: "homeHeating", name: "Home Heating", wattage: 3000, essentials: false, essentialsPlus: false, interruptionFree: true },
  { id: "hotTubs", name: "Hot Tubs", wattage: 6000, essentials: false, essentialsPlus: false, interruptionFree: true },
];

const generatorTiers = [
  {
    id: "essentials",
    name: "Essentials",
    power: "18KW",
    maxWattage: 18000,
    description: "Keep the lights on and your food fresh during an outage.",
    color: "#8dc63f"
  },
  {
    id: "essentialsPlus",
    name: "Essentials Plus",
    power: "22KW",
    maxWattage: 22000,
    description: "Power additional appliances like your stove, washer, and dryer.",
    color: "#8dc63f"
  },
  {
    id: "interruptionFree",
    name: "Interruption Free",
    power: "26KW",
    maxWattage: 26000,
    description: "Full-home coverage - you won't even notice the power went out.",
    color: "#8dc63f"
  }
];

export function GeneratorCalculator() {
  const [selectedAppliances, setSelectedAppliances] = useState<Set<string>>(new Set());
  const [customItems, setCustomItems] = useState<{ name: string; wattage: number }[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemWattage, setNewItemWattage] = useState("");

  const toggleAppliance = (id: string) => {
    const newSelected = new Set(selectedAppliances);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAppliances(newSelected);
  };

  const addCustomItem = () => {
    if (newItemName && newItemWattage) {
      setCustomItems([...customItems, { name: newItemName, wattage: parseInt(newItemWattage) || 0 }]);
      setNewItemName("");
      setNewItemWattage("");
    }
  };

  const removeCustomItem = (index: number) => {
    setCustomItems(customItems.filter((_, i) => i !== index));
  };

  const totalWattage = Array.from(selectedAppliances).reduce((sum, id) => {
    const appliance = appliances.find(a => a.id === id);
    return sum + (appliance?.wattage || 0);
  }, 0) + customItems.reduce((sum, item) => sum + item.wattage, 0);

  const getRecommendedTier = () => {
    const needsInterruptionFree = Array.from(selectedAppliances).some(id => {
      const appliance = appliances.find(a => a.id === id);
      return appliance && !appliance.essentialsPlus;
    });
    
    const needsEssentialsPlus = Array.from(selectedAppliances).some(id => {
      const appliance = appliances.find(a => a.id === id);
      return appliance && !appliance.essentials;
    });

    if (needsInterruptionFree || totalWattage > 22000) return "interruptionFree";
    if (needsEssentialsPlus || totalWattage > 18000) return "essentialsPlus";
    return "essentials";
  };

  const recommendedTier = getRecommendedTier();
  const recommendedTierInfo = generatorTiers.find(t => t.id === recommendedTier);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#333333] leading-tight mb-4">
            What Size <span className="text-[#8dc63f]">Generator</span> Do I Need?
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Select the appliances you want to power during an outage, and we'll recommend the right generator for your home.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Appliance Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#333333] px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#8dc63f]" />
                  Select Your Appliances
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {appliances.map((appliance) => (
                    <motion.button
                      key={appliance.id}
                      onClick={() => toggleAppliance(appliance.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        selectedAppliances.has(appliance.id)
                          ? 'border-[#8dc63f] bg-[#8dc63f]/10'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`appliance-${appliance.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          selectedAppliances.has(appliance.id)
                            ? 'bg-[#8dc63f]'
                            : 'bg-slate-200'
                        }`}>
                          {selectedAppliances.has(appliance.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium text-[#333333]">{appliance.name}</span>
                      </div>
                      <span className="text-sm text-slate-500">{appliance.wattage}W</span>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Items */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-bold text-[#333333] mb-3">Add Other Appliances</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Appliance name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8dc63f]"
                      data-testid="input-custom-appliance-name"
                    />
                    <input
                      type="number"
                      placeholder="Watts"
                      value={newItemWattage}
                      onChange={(e) => setNewItemWattage(e.target.value)}
                      className="w-full sm:w-24 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8dc63f]"
                      data-testid="input-custom-appliance-wattage"
                    />
                    <Button
                      onClick={addCustomItem}
                      className="bg-[#8dc63f] hover:bg-[#709c32] text-white rounded-xl"
                      data-testid="button-add-custom-appliance"
                    >
                      Add
                    </Button>
                  </div>

                  {customItems.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {customItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <span className="font-medium text-[#333333]">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-500">{item.wattage}W</span>
                            <button
                              onClick={() => removeCustomItem(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-[#8dc63f] px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Your Results
                </h3>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-500 mb-1">Total Power Needed</p>
                  <p className="text-4xl font-black text-[#333333]">
                    {(totalWattage / 1000).toFixed(1)} <span className="text-xl">kW</span>
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {selectedAppliances.size > 0 || customItems.length > 0 ? (
                    <motion.div
                      key="recommendation"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="bg-[#8dc63f]/10 border-2 border-[#8dc63f] rounded-xl p-4 mb-6">
                        <p className="text-sm font-medium text-[#8dc63f] mb-1">Recommended Generator</p>
                        <p className="text-2xl font-black text-[#333333]">{recommendedTierInfo?.name}</p>
                        <p className="text-lg font-bold text-[#8dc63f]">{recommendedTierInfo?.power}</p>
                        <p className="text-sm text-slate-600 mt-2">{recommendedTierInfo?.description}</p>
                      </div>

                      {/* Tier Comparison */}
                      <div className="space-y-3">
                        {generatorTiers.map((tier) => (
                          <div
                            key={tier.id}
                            className={`p-3 rounded-xl border-2 ${
                              tier.id === recommendedTier
                                ? 'border-[#8dc63f] bg-[#8dc63f]/5'
                                : 'border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-[#333333]">{tier.name}</p>
                                <p className="text-sm text-slate-500">{tier.power}</p>
                              </div>
                              {tier.id === recommendedTier && (
                                <span className="bg-[#8dc63f] text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Best Fit
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <Home className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">Select appliances to see your recommendation</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  size="lg"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all rounded-xl mt-6"
                  onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                  data-testid="button-calculator-quote"
                >
                  Get Free Assessment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
