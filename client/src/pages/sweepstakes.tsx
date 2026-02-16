import { motion } from "framer-motion";
import { Gift, ShoppingBag, Trophy, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import gridlessUnit from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1767978184527.webp";
import mountainBg from "@assets/background_(1)_1767979414545.jpg";
import hisenseTv from "@assets/HiSense_TV_1767980017168.png";
import tangoCard from "@assets/TC-Card-Big-revise_1768097070978.png";
import gridlessUnitCircle from "@assets/6928ec23fa0f88910888c58b_gridless_unit_1768097122092.webp";

export default function SweepstakesPage() {
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

  const prizes = [
    {
      image: hisenseTv,
      title: "HiSense TV",
      description: "Win a stunning HiSense Smart TV to upgrade your entertainment setup.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      image: tangoCard,
      title: "Gift Cards",
      description: "Score gift cards to treat yourself or someone special.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      title: "Greenfoot Swag",
      description: "Exclusive Greenfoot Energy merchandise and gear.",
      color: "from-amber-500 to-orange-600"
    },
    {
      image: gridlessUnitCircle,
      title: "Win Your Order!",
      description: "Have your entire Greenfoot order reimbursed in full!*",
      color: "from-[#8dc63f] to-[#6CBE45]",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfc] selection:bg-[#8dc63f]/30">
      <Helmet>
        <title>Home Show Sweepstakes | Win Prizes | Greenfoot Energy</title>
        <meta name="description" content="Enter the Greenfoot Home Show Sweepstakes! Win a HiSense TV, gift cards, Greenfoot swag, or have your entire order reimbursed. Visit us at local home shows." />
        <meta name="keywords" content="sweepstakes, home show contest, win prizes, Greenfoot giveaway, heat pump giveaway, HiSense TV, free order" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/sweepstakes" />
        
        <meta property="og:title" content="Home Show Sweepstakes | Win Amazing Prizes | Greenfoot Energy" />
        <meta property="og:description" content="Enter to win a HiSense TV, gift cards, or have your entire Greenfoot order reimbursed!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/sweepstakes" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greenfoot Home Show Sweepstakes" />
        <meta name="twitter:description" content="Enter to win prizes at local home shows! HiSense TV, gift cards & more." />
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
                Home Show Season 2026
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Home Show <span className="text-[#8dc63f]">Sweepstakes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl leading-relaxed">
                Visit Greenfoot Energy at your local home show for a chance to win amazing prizes!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                  onClick={() => document.getElementById('enter')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Enter to Win
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-10 h-12 sm:h-14 rounded-xl"
                >
                  View Prizes
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
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl">
                <span className="text-sm font-bold text-[#333333]">Win a Gridless Heat Pump!</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#333333] mb-6">
              What Can You <span className="text-[#8dc63f]">Win?</span>
            </h2>
            <p className="text-lg text-slate-600">
              Enter our sweepstakes at any participating home show for your chance to take home incredible prizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative group bg-white p-8 rounded-3xl border transition-all duration-500 ${
                  prize.featured 
                    ? 'border-[#8dc63f] shadow-[0_8px_40px_-12px_rgba(141,198,63,0.3)] scale-105' 
                    : 'border-slate-100 shadow-lg hover:shadow-xl hover:border-[#8dc63f]/30'
                }`}
              >
                {prize.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8dc63f] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Grand Prize
                  </div>
                )}
                
                {prize.image ? (
                  <div className="w-24 h-24 mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <img src={prize.image} alt={prize.title} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${prize.color} flex items-center justify-center text-white mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {prize.icon}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[#333333] mb-3 text-center">{prize.title}</h3>
                <p className="text-slate-500 text-sm text-center leading-relaxed">{prize.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Win Your Order Feature */}
      <section className="py-24 bg-[#333333] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8dc63f]/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                <Trophy className="w-4 h-4" />
                Grand Prize
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Win Your <span className="text-[#8dc63f]">Entire Order!</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Already have an approved work order with Greenfoot? Enter our sweepstakes for a chance to have your entire heat pump installation reimbursed in full!
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-white">How it works:</strong> If you've already signed off on a Greenfoot work order and your name is drawn, we'll reimburse the full cost of your installation. It's our way of saying thank you for choosing Greenfoot Energy!
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-black text-lg px-10 h-12 sm:h-14 shadow-xl hover:shadow-2xl transition-all rounded-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Book Your Installation
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#8dc63f]/20 rounded-full blur-3xl scale-75"></div>
              <img 
                src={gridlessUnit} 
                alt="Gridless by HiSense Heat Pump" 
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl">
                <span className="text-sm font-bold text-[#333333]">Gridless by HiSense</span>
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
              Enter to <span className="text-[#8dc63f]">Win!</span>
            </h2>
            <p className="text-lg text-slate-600">
              Fill out your ballot below for a chance to win amazing prizes.
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
                  Thank you for entering the Greenfoot Home Show Sweepstakes. Good luck!
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-bold px-8"
                >
                  Enter Another Ballot
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
                <h3 className="text-2xl font-extrabold text-white text-center mb-8">Enter the Sweepstakes</h3>
                
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
                  className="w-full bg-[#8dc63f] hover:bg-[#709c32] text-[#333333] font-extrabold text-lg h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all mt-8"
                >
                  Send &gt;&gt;
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
              Ready to Enter?
            </h2>
            <p className="text-xl text-[#333333]/80 mb-10 max-w-2xl mx-auto">
              Find Greenfoot Energy at a home show near you and enter for your chance to win!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#8dc63f] hover:bg-slate-100 font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
              >
                Book a Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#333333] text-[#333333] hover:bg-[#333333]/10 font-bold text-lg h-12 sm:h-14 px-10 rounded-xl"
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
                *Conditions Apply. Eligible to home show attendees who visited Greenfoot's booth at their local show.
              </p>
              <p>
                **Win Your Order prize is applicable to any entries who already have an approved work order. Your order will be reimbursed in full. (Not applicable for new assessments or unapproved work orders).
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
              className="bg-[#8dc63f] hover:bg-[#709c32] text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl shadow-xl"
              onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
            >
              Book Free Consultation
            </Button>
            <a 
              href="tel:18003809384"
              className="border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-lg h-12 sm:h-14 px-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call 1 (800) 380-9384
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}