import { useState } from "react";
import { CalendarDays, Check, Phone, ChevronDown, ChevronRight, X, Menu, Globe } from "lucide-react";
import calendarIcon from "@assets/generated_images/black_calendar_checkmark_icon.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import headerLogoImg from "@assets/greenfoot_green_on_black_1767984970329.png";
import { useLanguage } from "@/lib/i18n";

import { BookingModal } from "./booking-modal";

export function SiteHeader() {
  const [, setLocation] = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedMegaMenu, setExpandedMegaMenu] = useState<string | null>(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { language, setLanguage, t, localizedPath } = useLanguage();

  const toggleSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const toggleMegaSubmenu = (menu: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedMegaMenu(expandedMegaMenu === menu ? null : menu);
  };

  return (
    <>
      <BookingModal isOpen={showBookingModal} onOpenChange={setShowBookingModal} />
      {/* Desktop Header */}
      <div className="bg-white border-b border-slate-100 hidden lg:block">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <a href={localizedPath("/")} className="flex items-center">
            <img src={headerLogoImg} alt="Greenfoot Energy Solutions" className="h-16 w-auto relative z-50" />
          </a>
          
          <div className="flex items-center gap-8">
            <div className="relative overflow-visible">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                onBlur={() => setTimeout(() => setShowLangDropdown(false), 150)}
                className="flex items-center gap-2 text-sm font-bold text-slate-800 cursor-pointer hover:text-[#8dc63f] transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                {language === "en" ? "EN" : "FR"} <ChevronDown className={`w-4 h-4 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[140px] z-[9999]">
                  <button 
                    onClick={() => { setLanguage("en"); setShowLangDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${language === "en" ? "text-[#8dc63f] font-bold" : "text-slate-700"}`}
                    data-testid="button-lang-en-desktop"
                  >
                    {language === "en" && <Check className="w-4 h-4" />}
                    English
                  </button>
                  <button 
                    onClick={() => { setLanguage("fr"); setShowLangDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${language === "fr" ? "text-[#8dc63f] font-bold" : "text-slate-700"}`}
                    data-testid="button-lang-fr-desktop"
                  >
                    {language === "fr" && <Check className="w-4 h-4" />}
                    Français
                  </button>
                </div>
              )}
            </div>
            
            <div className="w-[1px] h-12 bg-slate-200"></div>

            <div className="flex flex-col items-end">
              <Link 
                href={localizedPath("/contact-us")} 
                className="flex items-center gap-2 text-slate-500 text-sm mb-1 font-medium hover:text-[#8dc63f] transition-colors relative z-50 cursor-pointer"
                data-testid="link-contact-us-top"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t.nav.contactUs}
              </Link>
              <a href="tel:18003809384" className="text-2xl font-black text-slate-900 hover:text-[#8dc63f] transition-colors tracking-tight relative z-50">
                1 (800) 380-9384
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="bg-white border-b border-slate-200 lg:hidden">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href={localizedPath("/")} className="flex items-center">
            <img src={headerLogoImg} alt="Greenfoot Energy Solutions" className="h-12 w-auto" />
          </a>
          
          <div className="flex items-center gap-4">
            <a href="tel:18003809384" className="p-2" aria-label="Call Greenfoot Energy">
              <Phone className="w-7 h-7 text-slate-700" aria-hidden="true" />
            </a>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="p-2"
              aria-label="Book appointment"
            >
              <div className="relative">
                <CalendarDays className="w-7 h-7 text-slate-700" aria-hidden="true" />
                <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0 flex items-center justify-center w-3 h-3 border border-[#333333]">
                  <Check className="w-2 h-2 text-[#333333] stroke-[5]" aria-hidden="true" />
                </div>
              </div>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2"
              data-testid="button-mobile-menu"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-slate-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-[#333333] sticky top-0 z-50 hidden lg:block" aria-label="Main navigation">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8 h-full">
            <div className="relative h-full group/about">
              <button className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors flex items-center gap-1 h-full cursor-pointer" aria-haspopup="true">
                {t.nav.aboutUs} <ChevronDown className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover/about:opacity-100 group-hover/about:visible transition-all duration-200 z-[60]">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 min-w-[240px]">
                  <a href={localizedPath("/about-us")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.ourStory}
                  </a>
                  <a href={localizedPath("/why-choose-us")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.whyChooseUs}
                  </a>
                  <a href={localizedPath("/about-us#makeover")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.homeEnergyMakeovers}
                  </a>
                  <a href={localizedPath("/kids-club")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.kidsClub}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative h-full group/services">
              <button className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors flex items-center gap-1 h-full cursor-pointer" aria-haspopup="true">
                {t.nav.services} <ChevronDown className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
              </button>
              <div className="fixed left-0 right-0 top-[56px] pt-0 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-200 z-[60]">
                <div className="bg-white shadow-xl border-t border-slate-100">
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-4 gap-8">
                      {/* Column 1: Heating, Cooling & Energy */}
                      <div>
                        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wide">{t.nav.heatingCoolingEnergy}</h3>
                        
                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('heatpumps', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.heatPumps} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'heatpumps' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'heatpumps' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/mini-split-heat-pumps")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.miniSplitHeatPumps}</a>
                            <a href={localizedPath("/services/ducted-central-heat-pumps")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.ductedCentralHeatPumps}</a>
                            <a href={localizedPath("/services/dual-fuel-heating-systems")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.dualFuelHeatingSystems}</a>
                            <a href={localizedPath("/services/geothermal-heat-pumps")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.geothermalHeatPumps}</a>
                            <a href={localizedPath("/services/heat-pumps-and-air-conditioning")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.heatPumpsAC}</a>
                            <a href={localizedPath("/heat-pump-snow-covers-protect-your-investment")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.snowCovers}</a>
                            <a href={localizedPath("/services/water-heaters")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.waterHeaters}</a>
                            <a href={localizedPath("/services/generators")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.generators}</a>
                          </div>
                        </div>

                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('repair', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.repairMaintenance} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'repair' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'repair' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/maintenance-service-yeti#service-repair")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.repair}</a>
                            <a href={localizedPath("/services/maintenance-service-yeti#maintenance")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.maintenance}</a>
                            <a href={localizedPath("/membership-plans")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.membershipPlans}</a>
                          </div>
                        </div>

                        <a href={localizedPath("/services/air-conditioning")} className="block text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium">{t.nav.airConditioning}</a>

                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('solar', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.solarEnergy} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'solar' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'solar' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/solar-energy")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.solarEnergySystems}</a>
                            <a href={localizedPath("/services/residential-solar")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.residentialSolar}</a>
                          </div>
                        </div>

                        <a href={localizedPath("/services/generators")} className="block text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium">{t.nav.generators}</a>
                      </div>

                      {/* Column 2: Insulation & Soundproofing */}
                      <div>
                        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wide">{t.nav.insulationSoundproofing}</h3>
                        
                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('insulation', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.insulation} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'insulation' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'insulation' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/spray-foam-insulation")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.sprayFoamInsulation}</a>
                            <a href={localizedPath("/services/batt-poly-insulation")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.battPolyInsulation}</a>
                            <a href={localizedPath("/services/blown-in-insulation")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.blownInInsulation}</a>
                          </div>
                        </div>

                        <a href={localizedPath("/services/soundproofing")} className="block text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium">{t.nav.soundproofing}</a>
                      </div>

                      {/* Column 3: Ventilation & Indoor Air */}
                      <div>
                        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wide">{t.nav.ventilationIndoorAir}</h3>
                        
                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('iaq', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.indoorAirQuality} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'iaq' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'iaq' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/indoor-air-quality-ventilation#hrv-erv")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.hrv}</a>
                            <a href={localizedPath("/services/indoor-air-quality-ventilation#hrv-erv")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.erv}</a>
                          </div>
                        </div>
                      </div>

                      {/* Column 4: Commercial & Smart Solutions */}
                      <div>
                        <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wide">{t.nav.commercialSmartSolutions}</h3>
                        
                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('commercial', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.commercialServices} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'commercial' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'commercial' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/commercial-hvac")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.commercialHvac}</a>
                            <a href={localizedPath("/services/commercial-solar")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.commercialSolar}</a>
                            <a href={localizedPath("/services/multi-unit-appliances")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.multiUnitAppliances}</a>
                          </div>
                        </div>

                        <div className="mb-2">
                          <button 
                            onClick={(e) => toggleMegaSubmenu('smart', e)} 
                            className="flex items-center justify-between text-sm text-slate-600 hover:text-[#8dc63f] py-1.5 font-medium w-full text-left cursor-pointer"
                          >
                            {t.nav.smartControls} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedMegaMenu === 'smart' ? 'rotate-180' : ''}`} />
                          </button>
                          <div className={`pl-3 border-l-2 border-slate-100 ml-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedMegaMenu === 'smart' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <a href={localizedPath("/services/peak-thermostat")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.peakThermostat}</a>
                            <a href={localizedPath("/services/remote-monitoring")} className="block text-sm text-slate-500 hover:text-[#8dc63f] py-1">{t.nav.remoteMonitoring}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full group/resources">
              <button className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors flex items-center gap-1 h-full cursor-pointer" aria-haspopup="true">
                {t.nav.resources} <ChevronDown className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover/resources:opacity-100 group-hover/resources:visible transition-all duration-200 z-[60]">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 min-w-[240px]">
                  <a href={localizedPath("/blog")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.blog}
                  </a>
                  <a href={localizedPath("/faq")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors">
                    {t.nav.faq}
                  </a>
                  <a href={localizedPath("/specials-promotions")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors" data-testid="nav-specials-promotions">
                    {t.nav.specials}
                  </a>
                  <a href={localizedPath("/provincial-incentives")} className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] transition-colors" data-testid="nav-provincial-incentives">
                    {t.nav.incentives}
                  </a>
                </div>
              </div>
            </div>

            <a 
              href={localizedPath("/careers")} 
              className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors h-full flex items-center"
              data-testid="nav-careers"
            >
              {t.nav.careers}
            </a>
            
            <a 
              href={localizedPath("/financing")} 
              className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors h-full flex items-center"
              data-testid="nav-financing"
            >
              {t.nav.financing}
            </a>
            
            <a 
              href={localizedPath("/contact-us")} 
              className="text-white text-sm font-bold hover:text-[#8dc63f] transition-colors h-full flex items-center"
              data-testid="nav-contact"
              id="main-nav-contact-link"
            >
              {t.nav.contact}
            </a>
          </div>
          
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-[#97c94d] hover:bg-[#709c32] h-full px-8 flex items-center gap-2 text-[#2c4014] font-black text-sm transition-all group cursor-pointer"
          >
            {t.nav.goToBookingQuotes}
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="border-b border-slate-200">
              <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <a href={localizedPath("/")} className="flex items-center">
                  <img src={headerLogoImg} alt="Greenfoot Energy Solutions" className="h-12 w-auto" />
                </a>
                
                <div className="flex items-center gap-4">
                  <a href="tel:18003809384" className="p-2" aria-label="Call Greenfoot Energy">
                    <Phone className="w-7 h-7 text-slate-700" aria-hidden="true" />
                  </a>
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="p-2"
                    aria-label="Book appointment"
                  >
                    <div className="relative">
                      <CalendarDays className="w-7 h-7 text-slate-700" aria-hidden="true" />
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0 flex items-center justify-center w-3 h-3 border border-[#333333]">
                        <Check className="w-2 h-2 text-[#333333] stroke-[5]" aria-hidden="true" />
                      </div>
                    </div>
                  </button>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2"
                    data-testid="button-close-mobile-menu"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-slate-700" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="container mx-auto px-4 py-6">
              {/* About Us */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => toggleSubmenu('about')}
                  className="w-full py-5 flex items-center justify-between text-lg font-bold text-slate-800"
                  aria-expanded={expandedMenu === 'about'}
                >
                  {t.nav.aboutUs}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedMenu === 'about' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'about' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 space-y-3">
                        <a href={localizedPath("/about-us")} className="block text-slate-600 py-2">{t.nav.ourStory}</a>
                        <a href={localizedPath("/why-choose-us")} className="block text-slate-600 py-2">{t.nav.whyChooseUs}</a>
                        <a href={localizedPath("/about-us#makeover")} className="block text-slate-600 py-2">{t.nav.homeEnergyMakeovers}</a>
                        <a href={localizedPath("/kids-club")} className="block text-slate-600 py-2">{t.nav.kidsClub}</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => toggleSubmenu('services')}
                  className="w-full py-5 flex items-center justify-between text-lg font-bold text-slate-800"
                  aria-expanded={expandedMenu === 'services'}
                >
                  {t.nav.services}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedMenu === 'services' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'services' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 space-y-4">
                        {/* Heating, Cooling & Energy */}
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-2">{t.nav.heatingCoolingEnergy}</p>
                          <div className="space-y-1 pl-2">
                            <p className="text-sm font-semibold text-slate-700 pt-1">{t.nav.heatPumps}</p>
                            <a href={localizedPath("/services/mini-split-heat-pumps")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.miniSplitHeatPumps}</a>
                            <a href={localizedPath("/services/ducted-central-heat-pumps")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.ductedCentralHeatPumps}</a>
                            <a href={localizedPath("/services/dual-fuel-heating-systems")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.dualFuelHeatingSystems}</a>
                            <a href={localizedPath("/services/geothermal-heat-pumps")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.geothermalHeatPumps}</a>
                            <a href={localizedPath("/services/heat-pumps-and-air-conditioning")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.heatPumpsAC}</a>
                            <a href={localizedPath("/heat-pump-snow-covers-protect-your-investment")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.snowCovers}</a>
                            <a href={localizedPath("/services/water-heaters")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.waterHeaters}</a>
                            
                            <p className="text-sm font-semibold text-slate-700 pt-2">{t.nav.repairMaintenance}</p>
                            <a href={localizedPath("/services/maintenance-service-yeti#service-repair")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.repair}</a>
                            <a href={localizedPath("/services/maintenance-service-yeti#maintenance")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.maintenance}</a>
                            <a href={localizedPath("/membership-plans")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.membershipPlans}</a>
                            
                            <a href={localizedPath("/services/air-conditioning")} className="block text-slate-600 py-1.5 font-medium text-sm">{t.nav.airConditioning}</a>
                            
                            <p className="text-sm font-semibold text-slate-700 pt-2">{t.nav.solarEnergy}</p>
                            <a href={localizedPath("/services/solar-energy")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.solarEnergySystems}</a>
                            <a href={localizedPath("/services/residential-solar")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.residentialSolar}</a>
                            
                            <a href={localizedPath("/services/generators")} className="block text-slate-600 py-1.5 font-medium text-sm">{t.nav.generators}</a>
                          </div>
                        </div>
                        {/* Insulation & Soundproofing */}
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-2">{t.nav.insulationSoundproofing}</p>
                          <div className="space-y-1 pl-2">
                            <p className="text-sm font-semibold text-slate-700 pt-1">{t.nav.insulation}</p>
                            <a href={localizedPath("/services/spray-foam-insulation")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.sprayFoamInsulation}</a>
                            <a href={localizedPath("/services/batt-poly-insulation")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.battPolyInsulation}</a>
                            <a href={localizedPath("/services/blown-in-insulation")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.blownInInsulation}</a>
                            <a href={localizedPath("/services/soundproofing")} className="block text-slate-600 py-1.5 font-medium text-sm">{t.nav.soundproofing}</a>
                          </div>
                        </div>
                        {/* Ventilation & Indoor Air */}
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-2">{t.nav.ventilationIndoorAir}</p>
                          <div className="space-y-1 pl-2">
                            <p className="text-sm font-semibold text-slate-700 pt-1">{t.nav.indoorAirQuality}</p>
                            <a href={localizedPath("/services/indoor-air-quality-ventilation#hrv-erv")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.hrv}</a>
                            <a href={localizedPath("/services/indoor-air-quality-ventilation#hrv-erv")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.erv}</a>
                          </div>
                        </div>
                        {/* Commercial & Smart Solutions */}
                        <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-2">{t.nav.commercialSmartSolutions}</p>
                          <div className="space-y-1 pl-2">
                            <p className="text-sm font-semibold text-slate-700 pt-1">{t.nav.commercialServices}</p>
                            <a href={localizedPath("/services/commercial-hvac")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.commercialHvac}</a>
                            <a href={localizedPath("/services/commercial-solar")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.commercialSolar}</a>
                            <a href={localizedPath("/services/multi-unit-appliances")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.multiUnitAppliances}</a>
                            
                            <p className="text-sm font-semibold text-slate-700 pt-2">{t.nav.smartControls}</p>
                            <a href={localizedPath("/services/peak-thermostat")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.peakThermostat}</a>
                            <a href={localizedPath("/services/remote-monitoring")} className="block text-slate-500 py-1 pl-3 text-sm">{t.nav.remoteMonitoring}</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => toggleSubmenu('resources')}
                  className="w-full py-5 flex items-center justify-between text-lg font-bold text-slate-800"
                >
                  {t.nav.resources}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedMenu === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'resources' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 space-y-3">
                        <a href={localizedPath("/blog")} className="block text-slate-600 py-2">{t.nav.blog}</a>
                        <a href={localizedPath("/faq")} className="block text-slate-600 py-2">{t.nav.faq}</a>
                        <a href={localizedPath("/specials-promotions")} className="block text-slate-600 py-2" data-testid="mobile-nav-specials-promotions">{t.nav.specials}</a>
                        <a href={localizedPath("/provincial-incentives")} className="block text-slate-600 py-2" data-testid="mobile-nav-provincial-incentives">{t.nav.incentives}</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href={localizedPath("/careers")} 
                className="block py-5 text-lg font-bold text-slate-800 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.careers}
              </a>

              <a 
                href={localizedPath("/financing")} 
              target="_blank"
              rel="noopener noreferrer"
                className="block py-5 text-lg font-bold text-slate-800 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.financing}
              </a>
              
              <a 
                href={localizedPath("/contact-us")} 
                className="block py-5 text-lg font-bold text-slate-800 border-b border-slate-100"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                {t.nav.contact}
              </a>

              {/* Language */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => toggleSubmenu('language')}
                  className="w-full py-5 flex items-center justify-between text-lg font-bold text-slate-800"
                  aria-expanded={expandedMenu === 'language'}
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5" aria-hidden="true" />
                    {t.common.language} ({language === "en" ? "EN" : "FR"})
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedMenu === 'language' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'language' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 space-y-1">
                        <button 
                          onClick={() => { setLanguage("en"); toggleSubmenu('language'); }}
                          className={`w-full text-left py-3 px-2 rounded-lg flex items-center gap-2 ${language === "en" ? "text-[#8dc63f] font-bold bg-green-50" : "text-slate-600"}`}
                          data-testid="button-lang-en-mobile"
                        >
                          {language === "en" && <Check className="w-4 h-4" />}
                          English
                        </button>
                        <button 
                          onClick={() => { setLanguage("fr"); toggleSubmenu('language'); }}
                          className={`w-full text-left py-3 px-2 rounded-lg flex items-center gap-2 ${language === "fr" ? "text-[#8dc63f] font-bold bg-green-50" : "text-slate-600"}`}
                          data-testid="button-lang-fr-mobile"
                        >
                          {language === "fr" && <Check className="w-4 h-4" />}
                          Français
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open('https://scheduling.greenfootenergy.ca/', '_blank');
                  }}
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-lg py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Go to Booking & Quotes <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
