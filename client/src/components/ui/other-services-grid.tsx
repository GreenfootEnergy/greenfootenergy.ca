import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import heatPumpIcon from "@assets/Heat_Pump_icon_1768933618655.avif";
import solarIcon from "@assets/solar_icon_1768933618655.avif";
import maintenanceIcon from "@assets/maintenance_icon_1768933618654.avif";
import sprayFoamIcon from "@assets/Spray_Foam_Icon_(2)_1768933383861.png";
import waterHeaterIcon from "@assets/water-heater_icon_1768933618655.avif";
import insulationIcon from "@assets/main_insulation_icon_1768933670851.avif";
import ventilationIcon from "@assets/ventilation_icon_1768933618655.avif";

export type ServiceKey =
  | "miniSplit"
  | "ductedCentral"
  | "solar"
  | "residentialSolar"
  | "commercialSolar"
  | "maintenance"
  | "sprayFoam"
  | "waterHeaters"
  | "blownIn"
  | "ventilation"
  | "heatPumpsAC"
  | "dualFuel"
  | "generators"
  | "battPoly"
  | "soundproofing"
  | "airConditioning"
  | "commercialHVAC"
  | "commercialServices"
  | "urbanYeti"
  | "peakThermostat"
  | "geothermal";

interface ServiceInfo {
  key: ServiceKey;
  icon: string;
  href: string;
}

const allServices: ServiceInfo[] = [
  { key: "miniSplit", icon: heatPumpIcon, href: "/services/mini-split-heat-pumps" },
  { key: "ductedCentral", icon: heatPumpIcon, href: "/services/ducted-central-heat-pumps" },
  { key: "heatPumpsAC", icon: heatPumpIcon, href: "/services/heat-pumps-and-air-conditioning" },
  { key: "airConditioning", icon: heatPumpIcon, href: "/services/air-conditioning" },
  { key: "dualFuel", icon: heatPumpIcon, href: "/services/dual-fuel-heating-systems" },
  { key: "geothermal", icon: heatPumpIcon, href: "/services/geothermal-heat-pumps" },
  { key: "solar", icon: solarIcon, href: "/services/solar-energy" },
  { key: "residentialSolar", icon: solarIcon, href: "/services/residential-solar" },
  { key: "commercialSolar", icon: solarIcon, href: "/services/commercial-solar" },
  { key: "maintenance", icon: maintenanceIcon, href: "/services/maintenance-service-yeti" },
  { key: "sprayFoam", icon: sprayFoamIcon, href: "/services/sprayfoam-insulation" },
  { key: "blownIn", icon: insulationIcon, href: "/services/blown-in-insulation" },
  { key: "battPoly", icon: insulationIcon, href: "/services/batt-poly-insulation" },
  { key: "soundproofing", icon: insulationIcon, href: "/services/soundproofing" },
  { key: "waterHeaters", icon: waterHeaterIcon, href: "/services/water-heaters" },
  { key: "ventilation", icon: ventilationIcon, href: "/services/indoor-air-quality-ventilation" },
  { key: "generators", icon: maintenanceIcon, href: "/services/generators" },
  { key: "commercialHVAC", icon: heatPumpIcon, href: "/services/commercial-hvac" },
  { key: "commercialServices", icon: maintenanceIcon, href: "/services/commercial-services" },
  { key: "urbanYeti", icon: maintenanceIcon, href: "/services/urban-yeti-appliances" },
  { key: "peakThermostat", icon: maintenanceIcon, href: "/services/peak-thermostat" },
];

interface OtherServicesGridProps {
  exclude: ServiceKey | ServiceKey[];
}

export function OtherServicesGrid({ exclude }: OtherServicesGridProps) {
  const { t } = useLanguage();
  const excludeKeys = Array.isArray(exclude) ? exclude : [exclude];
  const services = allServices.filter((s) => !excludeKeys.includes(s.key));

  return (
    <section className="py-16 bg-white border-t" data-testid="section-other-services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3" data-testid="text-other-services-title">
            {t.services.exploreOtherServices}
          </h2>
          <p className="text-slate-600" data-testid="text-other-services-desc">
            {t.services.exploreOtherServicesDesc}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {services.map((service) => {
            const label = (t.services as Record<string, string>)[service.key] || service.key;
            return (
              <a
                key={service.key}
                href={service.href}
                className="bg-[#e8e4dd] rounded-lg py-3 px-4 flex items-center gap-3 group cursor-pointer border border-[#c5c2bc] hover:border-[#8dc63f] hover:scale-[1.02] transition-[border-color,transform] duration-200"
                data-testid={`card-other-service-${service.key}`}
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={label}
                    className="w-7 h-7 object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="font-bold text-[#333333] text-xs sm:text-sm leading-tight">
                  {label}
                </span>
              </a>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <a
            href="/#services"
            className="text-[#8dc63f] hover:text-[#709c32] font-bold inline-flex items-center gap-2"
            data-testid="link-view-all-services"
          >
            {t.services.viewAllServices} <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
