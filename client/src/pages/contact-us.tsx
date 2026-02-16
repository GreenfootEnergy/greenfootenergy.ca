import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { BookingModal } from "@/components/ui/booking-modal";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import yetiCorner from "@assets/yeti-corner_1769051245383.png";

export default function ContactUs() {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', city: '', province: '', message: '' });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    // Add submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Greenfoot Energy Solutions | Get in Touch</title>
        <meta name="description" content="Contact Greenfoot Energy Solutions for heat pumps, solar, insulation & HVAC services. Call 1-800-380-9384 or email info@greenfootenergy.ca for a free quote." />
        <meta name="keywords" content="contact Greenfoot, HVAC contact, heat pump quote, energy solutions contact, book appointment, free assessment, customer service" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/contact-us" />
        
        <meta property="og:title" content="Contact Greenfoot Energy Solutions | Get in Touch" />
        <meta property="og:description" content="Get expert guidance on heat pumps, solar & insulation. Call 1-800-380-9384 or request a free quote online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/contact-us" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Get in touch for heat pumps, solar & insulation. Call 1-800-380-9384 for a free quote." />
      </Helmet>
      
      <SiteHeader />
      <BookingModal isOpen={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-[#333333] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight leading-tight"
            >
              {t.contact.title.split(" ")[0]} <span className="text-[#8dc63f]">{t.contact.title.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              {t.contact.subtitle}
            </motion.p>
          </div>
        </div>
        
        {/* Yeti Corner Image */}
        <div className="absolute bottom-0 right-0 w-64 md:w-80 lg:w-[450px] pointer-events-none opacity-50 lg:opacity-100 translate-y-4">
          <img src={yetiCorner} alt="Greenfoot Yeti" className="w-full h-auto object-contain object-bottom right-0" />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-lg bg-slate-50">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-[#8dc63f]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.contact.emailUs}</h3>
                <p className="text-slate-600 mb-6">{t.contact.haveProject}</p>
                <a href="mailto:info@greenfootenergy.ca" className="text-[#1E5AA8] font-bold hover:underline mb-4">info@greenfootenergy.ca</a>
                <Button className="bg-[#8dc63f] hover:bg-[#7ab135] text-white font-bold" onClick={() => window.location.href='mailto:info@greenfootenergy.ca?subject=Inquiry'}>
                  {t.contact.sendEmail}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-slate-50">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-[#8dc63f]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.contact.callUs}</h3>
                <p className="text-slate-600 mb-6">{t.contact.workTogether}</p>
                <a href="tel:+18003809384" className="text-[#1E5AA8] font-bold hover:underline mb-4">1 (800) 380-9384</a>
                <Button className="bg-[#8dc63f] hover:bg-[#7ab135] text-white font-bold" onClick={() => window.location.href='tel:+18003809384'}>
                  {t.contact.callNow}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-slate-50">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-[#8dc63f]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.contact.financing}</h3>
                <p className="text-slate-600 mb-6">{t.contact.seeIfQualify}</p>
                <Button className="bg-[#8dc63f] hover:bg-[#7ab135] text-white font-bold mt-4" onClick={() => window.open('/financing', '_blank')}>
                  {t.contact.seeIfQualifyBtn}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100"
            >
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">{t.contact.getInTouch.split(" ").slice(0, 2).join(" ")} <span className="text-[#8dc63f]">{t.contact.getInTouch.split(" ").slice(2).join(" ") || "Touch"}</span></h2>
              <form onSubmit={handleContactSubmit} className="space-y-6" aria-label="Contact form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-bold uppercase text-slate-500">{t.common.name}</label>
                    <Input 
                      id="contact-name"
                      placeholder={t.contact.yourName} 
                      className="h-12"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-bold uppercase text-slate-500">{t.common.email}</label>
                    <Input 
                      id="contact-email"
                      type="email" 
                      placeholder={t.contact.yourEmail} 
                      className="h-12"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-bold uppercase text-slate-500">Phone</label>
                    <Input 
                      id="contact-phone"
                      type="tel" 
                      placeholder="Phone Number" 
                      className="h-12"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-city" className="text-sm font-bold uppercase text-slate-500">City</label>
                    <Input 
                      id="contact-city"
                      placeholder="City" 
                      className="h-12"
                      value={contactForm.city}
                      onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-province" className="text-sm font-bold uppercase text-slate-500">Province</label>
                    <Input 
                      id="contact-province"
                      placeholder="Province" 
                      className="h-12"
                      value={contactForm.province}
                      onChange={(e) => setContactForm({...contactForm, province: e.target.value})}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-bold uppercase text-slate-500">Message</label>
                  <Textarea 
                    id="contact-message"
                    placeholder="How can we help?" 
                    className="min-h-[150px]"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    aria-required="true"
                  />
                </div>
                <Button type="submit" className="w-full h-14 bg-[#8dc63f] hover:bg-[#7ab135] text-white font-black text-lg uppercase tracking-wider">
                  Submit Request
                </Button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <div className="space-y-12 pt-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#8dc63f]" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Head Office</h3>
                </div>
                <p className="text-lg text-slate-600 ml-16">
                  25 Gridless Lane, E1A 9Z3<br />
                  <a href="#" className="text-[#1E5AA8] font-bold hover:underline">See All Locations</a>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#8dc63f]/10 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[#8dc63f]" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Careers</h3>
                </div>
                <div className="ml-16">
                  <p className="text-lg text-slate-600 mb-4">Would you like to join our growing team?</p>
                  <Button variant="outline" className="border-[#1E5AA8] text-[#1E5AA8] font-bold hover:bg-[#1E5AA8] hover:text-white" onClick={() => window.open('https://ca.indeed.com/cmp/Greenfoot-Energy-Solutions-3', '_blank')}>
                    VIEW CAREERS
                  </Button>
                </div>
              </div>

              <div className="p-8 bg-[#8dc63f] rounded-3xl text-white">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">How Can We Help You Today?</h3>
                <p className="mb-6 opacity-90">Our team is standing by and ready to help!</p>
                <Button 
                  className="bg-[#333333] hover:bg-black text-white font-bold"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  BOOK APPOINTMENT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
}
