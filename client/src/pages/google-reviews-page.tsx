import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { Helmet } from "react-helmet";

const provinces = [
  {
    id: "new-brunswick",
    name: "NEW BRUNSWICK",
    tagline: "Scenic river valleys and warm maritime summers in Atlantic Canada.",
    locations: [
      { name: "Fredericton, NB", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z/data=!3m1!4b1!4m6!3m5!1s0x4ca4232ed35f2f25:0x7ff8fdfc837fe711!8m2!3d45.9178764!4d-66.7129799!16s%2Fg%2F11gl4n1564?entry=ttu" },
      { name: "Saint John, NB", url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x4ca7b3a2ca4b222d:0x977c7c065902672b!12e1?source=g.page.m.rc._&laa=merchant-web-dashboard-card" },
      { name: "Tracadie-Sheila, NB", url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x4c9f491560ce8489:0x6698b2380087f032!12e1?source=g.page.m.rc._&laa=merchant-web-dashboard-card" },
      { name: "Moncton, NB", url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x4ca0b8f2a9cf59a7:0x486f8e145dd3d4a2!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation" },
    ],
  },
  {
    id: "newfoundland",
    name: "NEWFOUNDLAND",
    tagline: "Ancient cliffs, spirited culture, and the Atlantic's rugged frontier.",
    locations: [
      { name: "St. John's, NFLD", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z/data=!3m1!4b1!4m6!3m5!1s0x4ca4232ed35f2f25:0x7ff8fdfc837fe711!8m2!3d45.9178764!4d-66.7129799!16s%2Fg%2F11gl4n1564?entry=ttu" },
    ],
  },
  {
    id: "nova-scotia",
    name: "NOVA SCOTIA",
    tagline: "Ocean-fringed beauty with vibrant coastal communities and rich history.",
    locations: [
      { name: "Kentville, NS", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Halifax, NS", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Bridgewater, NS", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Sydney, NS", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
    ],
  },
  {
    id: "prince-edward-island",
    name: "PRINCE EDWARD ISLAND",
    tagline: "Gentle red shores, green pastures, and Canada's smallest maritime jewel.",
    locations: [
      { name: "Summerside, PEI", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Charlottetown, PEI", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
    ],
  },
  {
    id: "british-columbia",
    name: "BRITISH COLUMBIA",
    tagline: "Where Pacific waves meet mountain peaks in Canada's western paradise.",
    locations: [
      { name: "Abbotsford, BC", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Kamloops, BC", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Surrey, BC", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
      { name: "Kelowna, BC", url: "https://www.google.com/maps/place/Greenfoot+Energy+Solutions/@45.9178764,-66.7129799,16z" },
    ],
  },
];

const testimonials = [
  {
    quote: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION",
    text: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff! Everyone we spoke to from Greenfoot was helpful and just seemed genuinely happy in their job. We got tips on how to use our new heat pumps most efficiently and can't wait to see the difference on our heating bill this winter. Thanks to the whole team :)",
    author: "Danielle BASS",
    rating: 5,
  },
  {
    quote: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!",
    text: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company! Thank you very much, looking forward to using Greenfoot again.",
    author: "Frederick TOFFLEMIRE",
    rating: 5,
  },
  {
    quote: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY",
    text: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough. I only wish they installed our heat pump originally. I would hire them again without hesitation.",
    author: "Ellen DOWNEY",
    rating: 5,
  },
  {
    quote: "When they left the house there was no mess to clean up!",
    text: "The young chaps, Marlon Marcuflo and Sylvia Richard, were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up. I would recommend Greenfoot Energy Solutions to anyone thinking of upgrading their home. I would hire them again without hesitation.",
    author: "Alice GRACIE",
    rating: 5,
  },
  {
    quote: "THEIR ENTIRE TEAM IS EXTREMELY EXPERIENCED, KNOWLEDGEABLE, AND CONSIDERATE",
    text: "We hired Greenfoot to install 2 heat pumps. From the beginning to end - initial home visit to the final installation touches - they were wonderful to work with. Their entire team is extremely experienced, knowledgeable, and considerate; and were very accommodating. We consulted with many other companies before deciding to go with Greenfoot and feel that we made the best possible decision.",
    author: "Michael BOYD",
    rating: 5,
  },
];

export default function GoogleReviewsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Helmet>
        <title>Customer Reviews | 5-Star Heat Pump Installations | Greenfoot Energy Solutions</title>
        <meta name="description" content="Read verified customer reviews from Atlantic Canada and BC. See why thousands of homeowners trust Greenfoot Energy Solutions for heat pump installation, solar, and HVAC services." />
        <meta name="keywords" content="Greenfoot reviews, heat pump reviews, HVAC reviews Atlantic Canada, solar installation reviews, customer testimonials" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/google-reviews" />
        <meta property="og:title" content="Customer Reviews | 5-Star Heat Pump Installations | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Read verified customer reviews from Atlantic Canada and BC. See why thousands of homeowners trust Greenfoot Energy Solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/google-reviews" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Reviews | Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Read verified customer reviews from Atlantic Canada and BC. See why thousands trust Greenfoot." />
      </Helmet>
      <SiteHeader />

      {/* Hero Section with Province Tabs */}
      <section className="relative py-20 overflow-hidden">
        {/* Background - matching landing page style */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[60%] bg-white"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-[#333333]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <img
              src="https://cdn.prod.website-files.com/67ed633408edca3d348ca066/6564e6b3bf6aec3d1819e205_greenfoot_logo_black2.svg"
              alt="Greenfoot Energy Solutions"
              className="h-16 mx-auto mb-8"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              We Appreciate Your Feedback
            </h1>
            <p className="text-lg text-slate-600">
              Select your region to leave your feedback on our Google page!
            </p>
          </motion.div>

          {/* Province Tabs */}
          <Tabs defaultValue="new-brunswick" className="max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8">
              {provinces.map((province) => (
                <TabsTrigger
                  key={province.id}
                  value={province.id}
                  className="px-4 py-2 text-sm font-semibold uppercase tracking-wide data-[state=active]:bg-[#8dc63f] data-[state=active]:text-white bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                  data-testid={`tab-${province.id}`}
                >
                  {province.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {provinces.map((province) => (
              <TabsContent key={province.id} value={province.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  {/* Province Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {province.name}
                    </h2>
                    <blockquote className="text-slate-600 italic">
                      "{province.tagline}"
                    </blockquote>
                  </div>

                  {/* Locations Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {province.locations.map((location, index) => (
                      <motion.div
                        key={location.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <h3 className="font-semibold text-slate-800">{location.name}</h3>
                        <a
                          href={location.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#8dc63f] hover:bg-[#7ab535] text-white font-semibold rounded-xl transition-colors text-sm"
                          data-testid={`review-link-${location.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          Leave Review
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#333333]">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#8dc63f] font-semibold uppercase tracking-wider mb-2">
              WHAT PEOPLE ARE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              SAYING ABOUT
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#8dc63f] mb-4">
              GREENFOOT!
            </h2>
            <p className="text-slate-400">
              Our 5-star reviews speak for themselves!
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous testimonial"
              data-testid="testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next testimonial"
              data-testid="testimonial-next"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-[#444444] rounded-2xl p-8 md:p-12"
              >
                {/* Quote Icons */}
                <div className="flex justify-between mb-6">
                  <Quote className="w-10 h-10 text-[#8dc63f]" aria-hidden="true" />
                  <Quote className="w-10 h-10 text-white/20 rotate-180" aria-hidden="true" />
                </div>

                {/* Quote Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 italic">
                  "{testimonials[currentTestimonial].quote}"
                </h3>

                {/* Testimonial Text */}
                <p className="text-slate-300 leading-relaxed mb-6">
                  {testimonials[currentTestimonial].text}
                </p>

                {/* Author & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">
                      {testimonials[currentTestimonial].author}
                    </span>
                    <span className="text-slate-400">-</span>
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#8dc63f] text-[#8dc63f]" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">5 Star Review</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1} of ${testimonials.length}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-[#8dc63f] w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
