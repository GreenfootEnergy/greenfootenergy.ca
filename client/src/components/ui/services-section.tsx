import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

import heatPumpIcon from "@assets/Heat_Pump_icon_1768933618655.avif";
import solarIcon from "@assets/solar_icon_1768933618655.avif";
import maintenanceIcon from "@assets/maintenance_icon_1768933618654.avif";
import sprayFoamIcon from "@assets/Spray_Foam_Icon_(2)_1768933383861.png";
import waterHeaterIcon from "@assets/water-heater_icon_1768933618655.avif";
import insulationIcon from "@assets/main_insulation_icon_1768933670851.avif";
import ventilationIcon from "@assets/ventilation_icon_1768933618655.avif";

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = [
    { titleKey: "miniSplit" as const, icon: heatPumpIcon, href: "/services/mini-split-heat-pumps" },
    { titleKey: "ductedCentral" as const, icon: heatPumpIcon, href: "/services/ducted-central-heat-pumps" },
    { titleKey: "solar" as const, icon: solarIcon, href: "/services/solar-energy" },
    { titleKey: "maintenance" as const, icon: maintenanceIcon, href: "/services/maintenance-service-yeti" },
    { titleKey: "sprayFoam" as const, icon: sprayFoamIcon, href: "/services/sprayfoam-insulation" },
    { titleKey: "waterHeaters" as const, icon: waterHeaterIcon, href: "/services/water-heaters" },
    { titleKey: "blownIn" as const, icon: insulationIcon, href: "/services/blown-in-insulation" },
    { titleKey: "ventilation" as const, icon: ventilationIcon, href: "/services/indoor-air-quality-ventilation" },
  ];
  return (
    <section id="services" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#333333]">
            {t.home.servicesTitle.split("GREENFOOT")[0]}<span className="text-[#8dc63f]">GREENFOOT</span>{t.home.servicesTitle.split("GREENFOOT")[1] || ""}
          </h2>
        </div>

        <div className="bg-[#333333] rounded-3xl p-6 md:p-10 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              {t.home.oneStopShop}
            </h2>
            <h2 className="text-2xl md:text-4xl font-black text-[#8dc63f] uppercase tracking-tight">
              {t.home.energyEfficiency}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service, i) => {
              const title = t.services[service.titleKey];
              return (
                <motion.a
                  key={i}
                  href={service.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-[#e8e4dd] rounded-lg py-5 px-6 flex items-center gap-5 group cursor-pointer border-2 border-[#c5c2bc] hover:border-[#8dc63f] hover:scale-[1.02] transition-[border-color,transform] duration-200"
                  data-testid={`link-service-${i}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <img 
                      src={service.icon} 
                      alt={title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-[#333333] text-lg">
                    {title}
                  </h3>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
