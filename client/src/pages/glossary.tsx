import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { HreflangTags } from "@/components/seo/HreflangTags";
import { Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Helmet } from "react-helmet";

interface GlossaryTerm {
  term: string;
  definition: string;
}

const glossaryData: Record<string, GlossaryTerm[]> = {
  "A": [
    { term: "Air Handler", definition: "The indoor component of a heating and cooling system that circulates air throughout a building." },
    { term: "Air Source", definition: "A type of heat pump that extracts heat from the air and transfers it elsewhere to raise or lower the temperature of a space." },
    { term: "Air to Air", definition: "A variety of air source heat pump that collects heat from external air and deposits it into the air in an indoor space that needs to be heated, or collects heat from indoor air and disposes of it outside to cool an indoor space." },
    { term: "Air to Water", definition: "A variety of air source heat pump in which a direct action outdoor unit is combined with an indirect indoor system such as radiators. It collects heat from external air and transfers to water to provide heat through a radiant heating system." }
  ],
  "B": [
    { term: "British Thermal Unit (BTU)", definition: "A unit of measurement that refers to the amount of heat necessary to raise the temperature of one pound of water by one degree Fahrenheit. One BTU equals roughly 1,055 joules of energy. BTU is used to measure the output of heat pumps and other HVAC systems." }
  ],
  "C": [
    { term: "Cubic Feet Per Minute (CFM)", definition: "A unit of measurement that determines airflow volume based on how many cubic feet of air pass by a non-moving point in one minute." },
    { term: "Carbon Footprint", definition: "The total amount of greenhouse gas emissions created by an individual, organization, event, service, or product—such as a heating system—expressed by carbon dioxide equivalent." },
    { term: "Closed Loop", definition: "A type of geothermal heat pump that cycles a mixture of water and antifreeze through a closed loop of pipe buried in the ground to collect heat." },
    { term: "Cold-Climate Heat Pump (CCHP)", definition: "Unlike conventional air-source heat pumps, a cold-climate heat pump uses an inverter, or variable speed drive, that makes it capable of efficiently heating homes in colder climates with temperatures that get down to approximately -25 degrees Celsius." },
    { term: "Compressor", definition: "Located in the outdoor unit of a heat pump, the compressor maintains the flow of refrigerant through the unit and compresses liquid refrigerant into a hot gas, which is then moved to the condenser coil for cooling or the evaporator coil for heating." },
    { term: "Condenser Coil", definition: "A component of a heat pump's outdoor compressor unit that works in tandem with the evaporator coil inside indoor units, such as the air handler or blower compartment, to cool an indoor space. It receives refrigerant in the form of hot gas from the compressor and cools it into a warm liquid, which is then moved to the evaporator coil where it expands and cools." },
    { term: "Coefficient of Performance (CoP)", definition: "A ratio that expresses the output of a heating unit in relation to the input of energy. It is the rated capacity of the machine divided by its rated power input, though it can be expressed as a single figure or percentage." }
  ],
  "D": [
    { term: "Damper", definition: "A device that opens and closes to regulate how much air flows through vents, or ducts in a ducted heat pump system." },
    { term: "Direct Expansion Heat Pump (DX)", definition: "A type of geothermal ground-source heat pump in which refrigerant circulates through a pipe buried in the ground to collect thermal energy, unlike other closed loop systems that circulate a mixture of water and antifreeze." },
    { term: "Drain Pan Heater", definition: "An add-on unit that consists mainly of a heating element. It can be added to the outdoor condenser unit of a heat pump in a cold climate to warm the drain pan, so ice does not form in the drain pan or at the base of the condenser unit." },
    { term: "Ducted Heat Pump", definition: "Also referred to as a central heat pump or a forced air system, it connects to ductwork inside walls and ceilings and uses the ducts to move warm or cool air throughout a building." },
    { term: "Ductless Heat Pump", definition: "Also referred to as a mini-split, it uses air handlers connected to an outdoor compressor unit to control the temperature of individual rooms." }
  ],
  "E": [
    { term: "Efficiency Rating", definition: "A ratio that measures the efficiency of a heat pump. Annual heating efficiency is measured by HSPF, while annual cooling efficiency is measured by SEER." },
    { term: "Energy Star", definition: "A program run jointly by the U.S. Department of Energy and the U.S. Environmental Protection Agency to promote energy efficiency. The Energy Star logo is a symbol of certification for buildings and consumer products, such as appliances and heating systems, that meet certain standards of energy efficiency." },
    { term: "Evaporator Coil", definition: "A component of the air handler that works together with the outdoor unit's condenser coil to complete the heat transfer cycle. When a heat pump is in cooling mode, warm air inside the room is transferred to the refrigerant in the evaporator coil to cool the air, and the refrigerant moves to the condenser coil outside to cool down. In heating mode, the heat from the refrigerant is expelled into the room to warm it up instead of moving outside." },
    { term: "Electronic Expansion Valve (EEV)", definition: "Unlike a conventional thermostatic expansion valve that is controlled by springs, bellows, and push rods, an EEV controls the flow of refrigerant into a direct expansion evaporator based on signals it receives from an electronic controller using a thermistor." },
    { term: "Enhanced Vapor Injection (EVI)", definition: "A technology that allows cold-climate heat pumps to improve performance in cold temperatures by allowing increased refrigerant flow into the evaporator coil." }
  ],
  "G": [
    { term: "Geothermal", definition: "Also referred to as ground source, water source, or earth-coupled, this is a type of heat pump system that collects thermal energy from the ground or a nearby water source and transfers it to air or water inside a building to heat an indoor space." }
  ],
  "H": [
    { term: "Heat Output", definition: "The amount of thermal energy a heat pump releases to warm a space, measured in BTUs." },
    { term: "Heat Pump", definition: "A temperature control system for buildings that transfers thermal energy from a cool space to a warm space via the refrigeration cycle. In cooling mode, it removes heat from an indoor space to make a building cooler, and in heating mode it transfers heat from outdoor sources such as air, ground, or water and moves it inside to make a building warmer." },
    { term: "Heating Seasonal Performance Factor (HSPF)", definition: "Also referred to as Seasonal Coefficient of Performance (SCoP), this is a measurement of heating efficiency for heat pumps that is expressed by a ratio of the total thermal energy provided by the heat pump compared to the amount of electricity it uses to operate over the course of a year. HSPF differs from CoP in that it measures annual performance specifically." },
    { term: "Heating, Ventilation and Air Conditioning (HVAC)", definition: "A broad term for the technology that provides environmental comfort inside buildings and vehicles. It can include heating, cooling, ventilation, air filtering, and humidity control." },
    { term: "Hybrid", definition: "Also called dual-source or multiple-source, they are varieties of heat pump systems that combine multiple geothermal sources, or both geothermal and air source." }
  ],
  "I": [
    { term: "Indoor Airflow", definition: "The movement of air inside in a building, calculated by cubic feet per minute (CFM)." },
    { term: "Inverter", definition: "A component in a heat pump that controls motor speed to increase the system's energy efficiency. A conventional furnace or air conditioning unit switches repeatedly between on or off, and the continual stopping and starting uses a significant amount of energy. Conversely, the inverter in a variable speed compressor allows for a full range of operation, similar to the accelerator in a car, and automatically adjusts output for optimal efficiency." }
  ],
  "K": [
    { term: "Kilowatt (kW)", definition: "A measure of power equal to 1,000 Watts." },
    { term: "Kilowatt Hour (kWh)", definition: "A unit that measures the amount of electricity used in an hour, equal to one kilowatt of power sustained for one hour, or 3,600 kilojoules." }
  ],
  "L": [
    { term: "Line-Set", definition: "A pair of copper tubes that connect a condenser to an evaporator so refrigerant can move between the two. The smaller tube is called a liquid or discharge line and carries the liquid refrigerant to the evaporator. The larger tube is called a suction line, and it moves refrigerant in its gaseous form back to the condenser." },
    { term: "Load Calculation", definition: "A calculation that determines the size of heat pump necessary to provide adequate temperature control in a given space. Load calculations involve analyzing factors such as air volume of a space and the level of insulation." },
    { term: "Low Ambient", definition: "Heat pumps that work well in colder climates. In the past, heat pumps were typically only effective in milder climates. However, advances in refrigeration technology have allowed manufacturers to create low ambient heat pumps that can be used in much colder climates, down to around -25 degrees Celsius. Ductless mini-split is the most common type of cold weather heat pump." }
  ],
  "M": [
    { term: "Mini-Split", definition: "A type of ductless heat pump system in which an outdoor compressor unit is combined with multiple air handlers inside, usually one in every high-use room." }
  ],
  "O": [
    { term: "Open Loop", definition: "A type of geothermal heat pump that collects thermal energy from groundwater or water from a source such as a pond, lake, or well. It pumps water from its source, circulates it through a loop of pipe, and deposits it back into the source." },
    { term: "Outdoor Unit", definition: "Also referred to as the compressor or condenser unit, it is the part of the heat pump system outside of the building that contains the compressor and the condenser coil." }
  ],
  "R": [
    { term: "Refrigerant", definition: "A fluid used in heat pumps and air conditioning systems that can change from a gas to a liquid state and back again repeatedly. There are many different types of refrigerant, which are classified in three broad categories according to how they absorb or extract heat. Refrigerants are highly regulated—and some types are banned in Canada—because of their high levels of toxicity and flammability, as well as the impact that some types of refrigerant have on the ozone layer." },
    { term: "Refrigeration Cycle", definition: "A reversed thermodynamic cycle in which thermal energy is transferred from a cooler space to a warmer space, the opposite of what happens naturally without intervention from a system such as a heat pump." }
  ],
  "S": [
    { term: "Seasonal Energy Efficiency Ratio (SEER)", definition: "A measurement of the cooling efficiency of heat pumps and air conditioners expressed by the ratio of total annual cooling output of the system compared to the amount of electricity it uses in a year." },
    { term: "Single-Zone", definition: "Instead of one outdoor unit connected to multiple indoor air handlers, a ductless single-zone heat pump is a single compressor connected to a single air handler." }
  ],
  "T": [
    { term: "Thermostat", definition: "A temperature regulating device that senses the temperature in an indoor space and turns a heat pump system on or off as needed to bring the room to the desired temperature that has been programmed. Conventional thermostats must be manually adjusted to change the temperature in a room, but a smart thermostat can be programmed with a schedule that adjusts the temperature based on the time of day and week." },
    { term: "Thermostatic Expansion Valve (TEV or TXV)", definition: "A type of metering device that is a component of heat pumps and air conditioner systems. They control how much refrigerant is released into the evaporator coil. Despite their name, thermostatic expansion valves do not regulate the temperature of the evaporator." }
  ],
  "V": [
    { term: "Variable Speed Drive (VSD)", definition: "A heat pump with a variable speed drive uses an inverter motor to increase energy efficiency by allowing for a full range of operation, similar to a vehicle accelerator, instead of a conventional unit that is either at 0% or 100% with no operation in between those values." }
  ]
};

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();

  const filteredGlossary = useMemo(() => {
    if (!searchQuery) return glossaryData;

    const query = searchQuery.toLowerCase();
    const result: Record<string, GlossaryTerm[]> = {};

    Object.entries(glossaryData).forEach(([letter, terms]) => {
      const filteredTerms = terms.filter(
        item => item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
      );
      if (filteredTerms.length > 0) {
        result[letter] = filteredTerms;
      }
    });

    return result;
  }, [searchQuery]);

  const hasResults = Object.keys(filteredGlossary).length > 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Helmet>
        <title>Heat Pump Glossary | HVAC Terms & Definitions | Greenfoot Energy Solutions</title>
        <meta name="description" content="Comprehensive heat pump and HVAC glossary. Learn about mini-splits, BTUs, SEER ratings, inverters, refrigerants, and more. Your guide to understanding heating and cooling terminology." />
        <meta name="keywords" content="heat pump glossary, HVAC terms, mini-split definitions, BTU meaning, SEER rating explained, heat pump terminology" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/heat-pump-glossary" />
        <meta property="og:title" content="Heat Pump Glossary | HVAC Terms & Definitions | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Comprehensive heat pump and HVAC glossary. Learn about mini-splits, BTUs, SEER ratings, inverters, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/heat-pump-glossary" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Heat Pump Glossary | Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Comprehensive heat pump and HVAC glossary. Learn about mini-splits, BTUs, SEER ratings, and more." />
      </Helmet>
      <HreflangTags canonicalPath="/heat-pump-glossary" />
      <SiteHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
              Greenfoot's Heat Pump & Air Conditioning Glossary
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Essential Terms and Definitions for better understanding
            </p>
          </div>

          <div className="relative mb-12 max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              className="pl-12 h-14 text-lg rounded-xl border-slate-200 focus:border-[#8dc63f] focus:ring-[#8dc63f] shadow-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-glossary-search"
            />
          </div>

          <div className="space-y-12">
            {hasResults ? (
              Object.entries(filteredGlossary).sort(([a], [b]) => a.localeCompare(b)).map(([letter, terms]) => (
                <section key={letter} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#8dc63f] flex items-center justify-center text-white text-2xl font-bold">
                      {letter}
                    </div>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="grid gap-4">
                    {terms.map((item, idx) => (
                      <Card key={`${letter}-${idx}`} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-[#333333] mb-2 flex items-center gap-2">
                            <Info className="h-5 w-5 text-[#8dc63f]" />
                            {item.term}
                          </h3>
                          <p className="text-slate-600 leading-relaxed italic">
                            {item.definition}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-slate-500">No terms found matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-[#8dc63f] font-semibold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
