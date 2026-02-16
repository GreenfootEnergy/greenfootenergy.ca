import { useState, useMemo } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import logoImg from "@assets/greenfoot_green_on_black_1767807795674.png";
import { locations } from "@/data/locations";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLanguage();
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);

  const translateProvinceName = (province: string): string => {
    const provinceMap: Record<string, string> = {
      "Nova Scotia": t.footer.provinces.novaScotia,
      "New Brunswick": t.footer.provinces.newBrunswick,
      "Prince Edward Island": t.footer.provinces.pei,
      "Newfoundland": t.footer.provinces.newfoundland,
      "British Columbia": t.footer.provinces.britishColumbia,
    };
    return provinceMap[province] || province;
  };

  const provinceLocations = useMemo(() => {
    const grouped: Record<string, { name: string; address: string; phone: string }[]> = {};
    locations
      .filter(loc => loc.isActive)
      .forEach(loc => {
        const province = loc.province || "Other";
        if (!grouped[province]) {
          grouped[province] = [];
        }
        grouped[province].push({
          name: loc.city || loc.name,
          address: loc.address || "",
          phone: loc.phone || "",
        });
      });
    return grouped;
  }, [locations]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', city: '', province: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <footer className="bg-[#2a2a2a] text-slate-400 py-16 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[#8dc63f] font-black text-base italic mb-5">{t.footer.services}</h4>
            <ul className="space-y-2.5">
              <li><a href="/services/mini-split-heat-pumps" className="hover:text-[#8dc63f] transition-colors">{t.footer.heatPumps}</a></li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.servicesMaintenance}</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.solarEnergySystems}</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.sprayfoamInsulation}</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.waterHeaters}</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.insulation}</li>
              <li className="hover:text-[#8dc63f] transition-colors cursor-pointer">{t.footer.ventilation}</li>
            </ul>
            
            <h4 className="text-[#8dc63f] font-black text-base italic mt-8 mb-5">{t.footer.resources}</h4>
            <ul className="space-y-2.5">
              <li><a href="/contact-us" className="hover:text-[#8dc63f] transition-colors">{t.footer.contactUs}</a></li>
              <li><a href="/privacy-policy" className="hover:text-[#8dc63f] transition-colors">{t.footer.privacyPolicy}</a></li>
              <li><a href="/terms-of-use" className="hover:text-[#8dc63f] transition-colors">{t.footer.termsOfUse}</a></li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-[#8dc63f] font-bold mb-3">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{t.common.serving}</span>
            </div>
            <p className="text-white mb-5">{t.common.atlanticCanadaBC}</p>
            
            <p className="text-white font-bold mb-3">{t.common.seeProvinces}</p>
            <ul className="space-y-1">
              {Object.keys(provinceLocations).map((province) => (
                <li key={province}>
                  <button
                    onClick={() => setExpandedProvince(expandedProvince === province ? null : province)}
                    className="flex items-center justify-between w-full py-1.5 text-left text-[#8dc63f] hover:text-white transition-colors cursor-pointer uppercase text-xs tracking-wide font-semibold"
                    aria-expanded={expandedProvince === province}
                    aria-controls={`province-${province.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <span>{translateProvinceName(province)}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedProvince === province ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      expandedProvince === province ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="py-2 space-y-3 bg-[#222] rounded-lg px-3 my-2">
                        {provinceLocations[province].map((location, idx) => (
                          <div key={idx} className="border-l-2 border-[#8dc63f] pl-3">
                            <p className="text-[#8dc63f] font-bold text-xs">{location.name}</p>
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ', ' + location.name + ', Canada')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-500 text-xs hover:text-[#8dc63f] transition-colors block"
                            >
                              {location.address}
                            </a>
                            <a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`} className="text-white text-xs hover:text-[#8dc63f] transition-colors">
                              {location.phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white font-black uppercase tracking-wide mb-3">{t.footer.contact}</h4>
              <p className="text-white font-semibold text-xs mb-1">{t.footer.phone}</p>
              <a href="tel:18003809384" className="text-slate-400 hover:text-[#8dc63f] transition-colors block mb-3">1 (800) 380-9384</a>
              <p className="text-white font-semibold text-xs mb-1">{t.footer.email}</p>
              <a href="mailto:info@greenfootenergy.ca" className="text-slate-400 hover:text-[#8dc63f] transition-colors block">info@greenfootenergy.ca</a>
              
              <div className="flex items-center gap-3 mt-5">
                <span className="text-slate-500 text-xs">{t.footer.followUs}</span>
                <a href="#" className="w-7 h-7 bg-[#8dc63f] rounded flex items-center justify-center hover:bg-[#709c32] transition-colors" aria-label="Follow us on Facebook">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-7 h-7 bg-[#8dc63f] rounded flex items-center justify-center hover:bg-[#709c32] transition-colors" aria-label="Follow us on Instagram">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-7 h-7 bg-[#8dc63f] rounded flex items-center justify-center hover:bg-[#709c32] transition-colors" aria-label="Follow us on YouTube">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-[#333333] font-black text-xl mb-5 text-center">{t.footer.getInTouch}</h3>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-[#8dc63f] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-[#333333] font-bold">{t.footer.thankYou}</p>
                  <p className="text-slate-500 text-sm">{t.footer.inTouchSoon}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3" aria-label="Contact form">
                  <input
                    type="text"
                    placeholder={t.footer.namePlaceholder}
                    required
                    aria-required="true"
                    aria-label={t.common.name}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm"
                  />
                  <input
                    type="email"
                    placeholder={t.footer.emailAddressPlaceholder}
                    required
                    aria-required="true"
                    aria-label={t.common.email}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm"
                  />
                  <input
                    type="tel"
                    placeholder={t.footer.phoneNumberPlaceholder}
                    required
                    aria-required="true"
                    aria-label={t.footer.phone}
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm"
                  />
                  <input
                    type="text"
                    placeholder={t.footer.cityPlaceholder}
                    required
                    aria-required="true"
                    aria-label={t.common.city}
                    value={contactForm.city}
                    onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm"
                  />
                  <select
                    required
                    aria-required="true"
                    aria-label={t.common.province}
                    value={contactForm.province}
                    onChange={(e) => setContactForm({...contactForm, province: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm bg-white"
                  >
                    <option value="">{t.footer.provincePlaceholder}</option>
                    <option value="NS">{t.footer.provinces.novaScotia}</option>
                    <option value="NB">{t.footer.provinces.newBrunswick}</option>
                    <option value="PE">{t.footer.provinces.pei}</option>
                    <option value="NL">{t.footer.provinces.newfoundland}</option>
                    <option value="BC">{t.footer.provinces.britishColumbia}</option>
                  </select>
                  <textarea
                    placeholder={t.footer.messagePlaceholder}
                    rows={3}
                    aria-label={t.common.message}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:border-[#8dc63f] focus:ring-1 focus:ring-[#8dc63f] text-[#333333] text-sm resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 text-sm border-2 border-[#8dc63f] hover:border-[#709c32]"
                  >
                    {t.footer.send} <span className="font-normal" aria-hidden="true">&gt;&gt;</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoImg} alt="Greenfoot Energy Solutions" className="h-8 w-auto" />
          <p className="text-slate-600 text-xs">© 2026 Greenfoot Energy Solutions Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
