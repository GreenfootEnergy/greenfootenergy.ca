import { motion } from "framer-motion";
import { Gift, Trophy, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import mountainBg from "@assets/background_(1)_1767979414545.jpg";
import yetiRob from "@assets/689105935a71330e5e324fd2_yeti-Rob-pointing_1767989578333.png";

export default function ChilliwackPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Win a $4,500 Heat Pump | Chilliwack Home Show</title>
        <meta name="description" content="Enter to win a $4,500 mini-split heat pump at the Chilliwack Home Show! Greenfoot Energy is the official sponsor. Complete installation included." />
        <meta name="keywords" content="Chilliwack Home Show, heat pump giveaway, free heat pump, mini-split contest, Chilliwack sweepstakes, Greenfoot Energy BC" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/chilliwack" />
        
        <meta property="og:title" content="Win a $4,500 Heat Pump | Chilliwack Home Show | Greenfoot" />
        <meta property="og:description" content="Enter to win a $4,500 mini-split heat pump with complete installation at the Chilliwack Home Show!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/chilliwack" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Win a Heat Pump | Chilliwack Home Show" />
        <meta name="twitter:description" content="Enter to win a $4,500 mini-split heat pump at the Chilliwack Home Show!" />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={mountainBg} 
            alt="Mountain background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/95 via-[#333333]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
                <Sparkles className="w-4 h-4" />
                Chilliwack Home Show 2026
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Win a <span className="text-[#8dc63f]">$4,500</span> Mini-Split Heat Pump!
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl leading-relaxed">
                Visit Greenfoot Energy at the Chilliwack Home Show and enter our draw for a complete single zone ductless mini-split heat pump installation!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => document.getElementById('enter')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Enter the Draw
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-sm sm:text-lg px-6 sm:px-10 h-12 sm:h-14 rounded-xl"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-90"></div>
              <img 
                src={gridlessUnit} 
                alt="Gridless by HiSense Heat Pump" 
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#8dc63f] px-8 py-4 rounded-full shadow-xl">
                <span className="text-lg font-black text-white">Value: $4,500 + Tax</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Official Sponsor Section */}
      <section className="py-20 bg-[#6BA3C7]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4" />
                Official Show Sponsor
              </div>
              <div className="mb-6">
                <p className="text-white/90 text-lg font-medium uppercase tracking-wider">Home, Leisure &</p>
                <p className="text-white/90 text-lg font-medium uppercase tracking-wider">Outdoor Living</p>
                <p className="text-white text-5xl md:text-6xl font-black uppercase tracking-tight">EXPO</p>
                <p className="text-white/80 text-sm font-medium mt-2">Heritage Park, Chilliwack</p>
              </div>
              <p className="text-white/90 text-lg max-w-lg leading-relaxed">
                Greenfoot Energy Solutions is proud to be the official sponsor of the Chilliwack Home, Leisure & Outdoor Living Expo. Visit our booth to learn about energy-efficient heating and cooling solutions!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                src={yetiRob} 
                alt="Yeti and Rob" 
                className="w-full max-w-md drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prize Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
                The <span className="text-[#8dc63f]">Grand Prize</span>
              </h2>
              <p className="text-lg text-slate-600">
                One lucky winner will receive a complete single zone ductless mini-split heat pump system, fully installed!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#333333] to-[#1a1a1a] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <img src={gridlessUnit} alt="Gridless mini-split unit" className="w-full h-full object-contain" />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#8dc63f] text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                    <Trophy className="w-4 h-4" />
                    Grand Prize
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4">Single Zone Ductless Mini-Split</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    A premium 12,000 BTU/h cold-climate heat pump designed for Canadian winters. This prize includes:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "12,000 BTU/h single zone mini-split system",
                      "SEER2 up to 25.5, HSPF2 up to 10.5",
                      "Cold climate operation down to -30°C",
                      "WiFi connectivity with energy monitoring",
                      "Whisper-quiet operation",
                      "Professional installation by certified technicians"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-[#8dc63f] shrink-0 mt-0.5" />
                        <span className="text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <img src={gridlessUnit} alt="Gridless Heat Pump" className="w-full max-w-xs mx-auto drop-shadow-2xl" />
                  <div className="mt-6 bg-[#8dc63f] inline-block px-8 py-4 rounded-2xl">
                    <span className="text-4xl font-black text-white">$4,500</span>
                    <p className="text-sm font-bold text-white/80">+ Tax | Total Value</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section className="py-24 bg-slate-100" id="enter">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              Enter the <span className="text-[#8dc63f]">Draw!</span>
            </h2>
            <p className="text-lg text-slate-600">
              Fill out your entry below for a chance to win a $4,500 mini-split heat pump.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#333333] rounded-3xl shadow-xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-[#8dc63f] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">You're Entered!</h3>
                <p className="text-slate-300 mb-6">
                  Thank you for entering the Chilliwack Home Show draw. Good luck!
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-[#333333] font-bold px-8"
                >
                  Enter Another Entry
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bg-[#333333] rounded-3xl shadow-2xl p-8 md:p-10"
              >
                <h3 className="text-2xl font-extrabold text-white text-center mb-8">Enter the Draw</h3>
                
                <div className="space-y-4">
                  <Input 
                    id="firstName"
                    placeholder="First Name*"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                    required
                  />
                  
                  <Input 
                    id="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                    required
                  />
                  
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                    required
                  />
                  
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                    required
                  />

                  <Input 
                    id="address"
                    placeholder="Street Address*"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      id="city"
                      placeholder="City*"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                      required
                    />
                    <Input 
                      id="postalCode"
                      placeholder="Postal Code*"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      className="h-14 rounded-lg bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-[#333333] font-extrabold text-lg h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all mt-8"
                >
                  Submit Entry &gt;&gt;
                </Button>

                <p className="text-xs text-slate-400 text-center mt-6">
                  By submitting, you agree to receive communications from Greenfoot Energy Solutions.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#8dc63f] to-[#6CBE45] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              Visit Us at the Chilliwack Home Show!
            </h2>
            <p className="text-xl text-[#333333]/80 mb-10 max-w-2xl mx-auto">
              Stop by the Greenfoot Energy booth to learn more about heat pumps and enter the draw in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#8dc63f] hover:bg-slate-100 font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl shadow-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Book a Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl"
              >
                Call 1 (800) 380-9384
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-16 bg-[#333333]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-6">Terms & Conditions</h3>
            <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
              <p>
                *Draw open to Chilliwack Home Show attendees who visit the Greenfoot Energy booth. One entry per person. Must be 19 years or older to enter.
              </p>
              <p>
                Prize includes standard single-zone 12,000 BTU/h ductless mini-split heat pump installation valued at $4,500 + tax. Additional costs may apply for complex installations. Winner will be contacted by phone or email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Ready for Year-Round <span className="text-[#8dc63f]">Comfort?</span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers in Atlantic Canada and BC. Get your free quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#8dc63f] hover:bg-[#709c32] cta-hover text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Book Free Consultation
            </Button>
            <a 
              href="tel:18003809384"
              className="border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call 1 (800) 380-9384
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}