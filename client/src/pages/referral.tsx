import { motion } from "framer-motion";
import { Gift, Users, DollarSign, Sparkles, Heart, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import referralHeroBg from "@assets/referral-hero.webp";

const provinces = [
  "British Columbia",
  "New Brunswick",
  "Nova Scotia",
  "Prince Edward Island"
];

export default function ReferralPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    streetNumber: '',
    street: '',
    province: '',
    postalCode: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const programBenefits = [
    {
      icon: Gift,
      title: "Your Friend Saves $100",
      description: "Your referral receives $100 off any Greenfoot service or installation."
    },
    {
      icon: DollarSign,
      title: "You Earn $50",
      description: "Get $50 for every successful referral that becomes a Greenfoot customer."
    },
    {
      icon: Users,
      title: "Earn Up to $500",
      description: "Refer up to 10 friends and earn a maximum of $500 in referral rewards."
    }
  ];

  const restrictions = [
    "One coupon per household",
    "Applicable to new services and installations only",
    "Previous installs, maintenance, and repair services are not eligible",
    "Offer is non-transferable",
    "Offers cannot be combined"
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Referral Program | Earn $50 Per Referral | Greenfoot</title>
        <meta name="description" content="Refer friends to Greenfoot Energy and earn $50 per referral! Your friend saves $100 on any service. Earn up to $500 through our referral rewards program." />
        <meta name="keywords" content="referral program, referral rewards, earn money referrals, Greenfoot referral, heat pump referral, energy efficiency referral" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/referral" />
        
        <meta property="og:title" content="Referral Program | Earn $50 Per Referral | Greenfoot Energy" />
        <meta property="og:description" content="Refer friends and earn $50 per referral! Your friend saves $100. Earn up to $500 in rewards." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/referral" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greenfoot Referral Program | Earn Rewards" />
        <meta name="twitter:description" content="Refer friends and earn $50 per referral. Your friend saves $100 on any service!" />
      </Helmet>
      
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={referralHeroBg} 
            alt="Referral Program" 
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
                <Heart className="w-4 h-4" />
                Greenfoot Referral Rewards
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4 tracking-tight uppercase">
                <span className="text-[#8dc63f]">1%</span> REFERRAL KICKBACK
              </h1>
              
              <p className="text-lg md:text-xl text-[#8dc63f] font-bold uppercase tracking-wide mb-8">
                DUCTLESS & DUCTED HEAT PUMPS, INSULATION, SOLAR AND MORE!
              </p>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-xl leading-relaxed">
                Refer a friend and you both win! Your friend saves <span className="text-[#8dc63f] font-bold">$100</span> and you earn <span className="text-[#8dc63f] font-bold">$50</span> per referral.
              </p>
              
              <p className="text-lg text-slate-400 mb-12 max-w-xl">
                Residential ONLY. New Construction or Retrofit Residential.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => document.getElementById('refer')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Submit a Referral
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
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8dc63f] rounded-full mb-4">
                    <Percent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">Earn Up to $500</h3>
                  <p className="text-slate-300">Refer friends & family</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-full flex items-center justify-center">
                      <Gift className="w-6 h-6 text-[#8dc63f]" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Friend Saves $100</p>
                      <p className="text-slate-400 text-sm">On any Greenfoot service</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#8dc63f]/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#8dc63f]" />
                    </div>
                    <div>
                      <p className="text-white font-bold">You Earn $50</p>
                      <p className="text-slate-400 text-sm">Per successful referral</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              How the <span className="text-[#8dc63f]">Referral Program</span> Works
            </h2>
            <p className="text-lg text-slate-600">
              It's simple! Refer a friend to Greenfoot Energy and you both benefit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {programBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100 hover:border-[#8dc63f]/30 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-[#8dc63f] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Form Section */}
      <section className="py-24 bg-slate-100" id="refer">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              Submit a <span className="text-[#8dc63f]">Referral</span>
            </h2>
            <p className="text-lg text-slate-600">
              Residential ONLY. New Construction or Retrofit Residential.
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
                <h3 className="text-2xl font-bold text-white mb-4">Referral Submitted!</h3>
                <p className="text-slate-300 mb-6">
                  Thank you for your referral! We'll reach out to your friend and keep you updated on your reward.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold px-8 rounded-xl"
                >
                  Submit Another Referral
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
                <h3 className="text-2xl font-extrabold text-white text-center mb-2">Referral Form</h3>
                <p className="text-slate-400 text-center text-sm mb-8">1% Referral Kickback Program</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">First Name*</label>
                    <Input 
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="h-14 rounded-xl bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone #*</label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-14 rounded-xl bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <label className="block text-white text-sm font-medium mb-4">Address</label>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-400 text-xs mb-2">Street #*</label>
                        <Input 
                          id="streetNumber"
                          placeholder="#"
                          value={formData.streetNumber}
                          onChange={(e) => setFormData({...formData, streetNumber: e.target.value})}
                          className="h-14 rounded-xl bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-slate-400 text-xs mb-2">Street*</label>
                        <Input 
                          id="street"
                          placeholder="Street name"
                          value={formData.street}
                          onChange={(e) => setFormData({...formData, street: e.target.value})}
                          className="h-14 rounded-xl bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-xs mb-2">Province*</label>
                        <select 
                          id="province"
                          value={formData.province}
                          onChange={(e) => setFormData({...formData, province: e.target.value})}
                          className="w-full h-14 rounded-xl bg-white border-0 text-[#333333] font-medium px-5 appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select province</option>
                          {provinces.map((province) => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs mb-2">Postal Code*</label>
                        <Input 
                          id="postalCode"
                          placeholder="A1A 1A1"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          className="h-14 rounded-xl bg-white border-0 text-[#333333] placeholder:text-slate-500 font-medium px-5"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-extrabold text-lg h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all mt-8"
                >
                  Submit Referral &gt;&gt;
                </Button>

                <p className="text-xs text-slate-400 text-center mt-6">
                  By submitting, you agree to receive communications from Greenfoot Energy Solutions.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Terms & Restrictions */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-6">
                Coupon <span className="text-[#8dc63f]">Restrictions</span>
              </h2>
              <p className="text-lg text-slate-600">
                Please review the following terms and conditions for the referral program.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100"
            >
              <p className="text-slate-700 text-lg leading-relaxed">
                The coupon provides <strong className="text-[#333333]">$100 off</strong> all Greenfoot services. It is limited to one coupon per household and is applicable only to new services and installations. Previous installs, maintenance, and repair services are not eligible. The offer is non-transferable and offers cannot be combined.
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-slate-500 text-sm text-center">
                  Have questions? Call us at <a href="tel:18003809384" className="text-[#8dc63f] font-bold hover:underline">1 (800) 380-9384</a>
                </p>
              </div>
            </motion.div>
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
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-10 max-w-2xl mx-auto">
              Submit your first referral today and start earning rewards while helping your friends save on energy-efficient solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#8dc63f] hover:bg-slate-100 font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl shadow-xl"
                onClick={() => document.getElementById('refer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Submit a Referral
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 font-bold text-sm sm:text-lg h-12 sm:h-14 px-6 sm:px-10 rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
