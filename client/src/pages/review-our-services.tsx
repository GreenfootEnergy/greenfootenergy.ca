import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Phone, ArrowRight, ThumbsUp, Users, Heart, Wrench, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

const ratings = [
  { id: 1, label: "Very Poor", stars: 1 },
  { id: 2, label: "Poor", stars: 2 },
  { id: 3, label: "Average", stars: 3 },
  { id: 4, label: "Good", stars: 4 },
  { id: 5, label: "Excellent", stars: 5 },
];

const testimonials = [
  {
    quote: "OUR OLD HOUSE FEELS LIKE A BRAND NEW CONSTRUCTION",
    content: "The Greenfoot Team did amazing work in our home. Our old house (built in 1959) feels like a brand new construction thanks to the ductless heat pumps, spray foam insulation and HVAC installed by the friendliest staff! Everyone we spoke to from Greenfoot was helpful and just seemed genuinely happy in their job. We got tips on how to use our new heat pumps most efficiently and can't wait to see the difference on our heating bill this winter. Thanks to the whole team :)",
    author: "Danielle BASS",
    rating: 5,
  },
  {
    quote: "FIXED A LONG STANDING ISSUE I HAD FROM POOR INSTALLATION BY ANOTHER COMPANY!",
    content: "The two technicians Tanner and Halim were excellent, did a great job, very tidy, and identified 2 problems with my heat pump head, and fixed a long standing issue I had from poor installation by another company! Thank you very much, looking forward to using Greenfoot again.",
    author: "Frederick TOFFLEMIRE",
    rating: 5,
  },
  {
    quote: "I ONLY WISH THEY INSTALLED OUR HEAT PUMP ORIGINALLY",
    content: "Great company to deal with. We hired them to move an existing heat pump after the original installer refused to help us. The estimator and the installer were both very polite, careful and thorough. I only wish they installed our heat pump originally. I would hire them again without hesitation.",
    author: "Ellen DOWNEY",
    rating: 5,
  },
  {
    quote: "When they left the house there was no mess to clean up!",
    content: "The young chaps, Marlon Marcuflo and Sylvia Richard, were wonderful to deal with. They were extremely polite, very tidy and efficient in their work, were right on schedule and did an excellent job. When they left the house there was no mess to clean up. I would recommend Greenfoot Energy Solutions to anyone thinking of upgrading their home. I would hire them again without hesitation.",
    author: "Alice GRACIE",
    rating: 5,
  },
  {
    quote: "THEIR ENTIRE TEAM IS EXTREMELY EXPERIENCED, KNOWLEDGEABLE, AND CONSIDERATE",
    content: "We hired Greenfoot to install 2 heat pumps. From the beginning to end - initial home visit to the final installation touches - they were wonderful to work with. Their entire team is extremely experienced, knowledgeable, and considerate; and were very accommodating. We consulted with many other companies before deciding to go with Greenfoot and feel that we made the best possible decision.",
    author: "Michael BOYD",
    rating: 5,
  },
];

const whyChooseCards = [
  {
    icon: ThumbsUp,
    title: "Pride in our work",
    description: "We take pride with every Greenfoot install. Our home comfort advisors recommend only the best solutions for your home, budget and needs. Our reputation is #1 to us.",
  },
  {
    icon: Users,
    title: "Experience",
    description: "Greenfoot's team consists of seasoned home comfort advisors, experienced HVAC & electrician technicians and customer service representatives.",
  },
  {
    icon: Heart,
    title: "Complete Satisfaction",
    description: "Our goal is to make sure you are 100% fully satisfied with our quality of work and service. We strive to create lifetime relationships with our clients.",
  },
  {
    icon: Wrench,
    title: "Dedicated Service",
    description: "Our Service-Yeti technicians are dedicated to service. Enjoy peace of mind knowing that Greenfoot's dedicated service division can service, repair and maintain your system.",
  },
];

export default function ReviewOurServices() {
  const { t } = useLanguage();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    feedback: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    if (rating <= 3) {
      setShowFeedbackModal(true);
    } else {
      window.location.href = "/google-reviews-page";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: selectedRating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setFormSubmitted(true);
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowFeedbackModal(false);
    setFormSubmitted(false);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", feedback: "" });
    setSubmitError(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Review Our Services | Greenfoot Energy Solutions</title>
        <meta name="description" content="Share your feedback with Greenfoot Energy Solutions. Your experience matters to us - help us continue to improve our services." />
        <link rel="canonical" href="https://www.greenfootenergy.ca/review-our-services" />
        <meta property="og:title" content="Review Our Services | Greenfoot Energy Solutions" />
        <meta property="og:description" content="Share your feedback with Greenfoot Energy Solutions. Your experience matters to us - help us continue to improve our services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/review-our-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Review Our Services | Greenfoot Energy Solutions" />
        <meta name="twitter:description" content="Share your feedback with Greenfoot Energy Solutions. Your experience matters to us." />
      </Helmet>

      <SiteHeader />

      {/* Hero Rating Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#8dc63f] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1E5AA8] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase mb-6">
              We Appreciate Your <span className="text-[#8dc63f]">Feedback</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12">
              Honesty and customer satisfaction are the foundation of our reputation. We're committed to making sure you're completely happy with our service, every step of the way.
            </p>

            {/* Star Rating Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {ratings.map((rating, index) => (
                <motion.button
                  key={rating.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleRatingClick(rating.id)}
                  aria-label={`Rate ${rating.stars} out of 5 stars - ${rating.label}`}
                  className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 min-w-[120px] ${
                    selectedRating === rating.id
                      ? "border-[#8dc63f] bg-[#8dc63f]/10 scale-105"
                      : "border-slate-200 hover:border-[#8dc63f] hover:bg-slate-50"
                  }`}
                  data-testid={`rating-button-${rating.id}`}
                >
                  <div className="flex gap-1">
                    {[...Array(rating.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          selectedRating === rating.id
                            ? "text-[#8dc63f] fill-[#8dc63f]"
                            : "text-amber-400 fill-amber-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`font-semibold text-sm ${
                    selectedRating === rating.id ? "text-[#8dc63f]" : "text-slate-700"
                  }`}>
                    {rating.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <p className="text-sm text-slate-500">
              {selectedRating && selectedRating >= 4 
                ? "Thank you! Redirecting to Google Reviews..." 
                : selectedRating && selectedRating <= 3 
                  ? "Please share your feedback below." 
                  : "Select a rating to continue."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="max-w-2xl bg-[#333333] border-0 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {!formSubmitted ? (
            <div className="p-8">
              <h2 className="text-3xl font-black text-white uppercase mb-2 text-center">
                Your <span className="text-[#8dc63f]">Feedback</span>
              </h2>
              <h2 className="text-3xl font-black text-white uppercase mb-6 text-center">
                Matters
              </h2>
              <p className="text-white/70 text-center mb-8">
                We're sorry to hear your experience didn't meet expectations. Please share your concerns with us so we can understand what went wrong and make it right.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">First name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-white border-0 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg"
                      placeholder=""
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Last name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-white border-0 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg"
                      placeholder=""
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white border-0 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg"
                      placeholder=""
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Phone number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white border-0 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg"
                      placeholder=""
                      data-testid="input-phone"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">
                    Please share the reasons we may have fallen short. As a business built on positive reviews and customer trust, your feedback helps us make things right and improve for the future.
                  </label>
                  <Textarea
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    className="bg-white border-0 text-slate-900 placeholder:text-slate-400 min-h-[150px] rounded-lg"
                    placeholder="Type your message..."
                    required
                    data-testid="input-feedback"
                  />
                </div>

                {submitError && (
                  <p className="text-red-400 text-center text-sm">{submitError}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold text-lg h-14 rounded-xl disabled:opacity-50"
                  data-testid="button-submit-feedback"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" aria-hidden="true" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="p-8 text-center py-16">
              <div className="w-20 h-20 bg-[#8dc63f] rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Thank you!</h3>
              <p className="text-white/70 mb-8">
                Your submission has been received. We'll be in touch soon to address your concerns.
              </p>
              <Button
                onClick={closeModal}
                className="bg-[#8dc63f] hover:bg-[#7ab535] text-white font-bold px-8 h-12 rounded-xl"
                data-testid="button-close-modal"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight">
              <span className="text-white">What People Are</span><br />
              <span className="text-white">Saying About</span><br />
              <span className="text-[#8dc63f]">Greenfoot!</span>
            </h2>
            <p className="text-white/60 text-lg mt-6">Our 5-star reviews speak for themselves!</p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800 rounded-3xl p-8 md:p-12 relative"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-[#8dc63f] opacity-50" />
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/20 rotate-180" />

                <div className="relative z-10">
                  <blockquote className="text-xl md:text-2xl font-bold text-[#8dc63f] mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    {testimonials[currentTestimonial].content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{testimonials[currentTestimonial].author}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-white/60 text-sm ml-2">5 Star Review</span>
                      </div>
                    </div>
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

      {/* Why Choose Greenfoot */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">
              Why Choose <span className="text-[#8dc63f]">Greenfoot</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="w-14 h-14 bg-[#8dc63f] rounded-xl flex items-center justify-center mb-6">
                  <card.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8dc63f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#333333] uppercase mb-6">
              Ready to Experience the Greenfoot Difference?
            </h2>
            <p className="text-[#333333]/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers across Atlantic Canada and British Columbia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-white hover:bg-slate-100 text-[#8dc63f] font-bold text-lg px-10 h-14 rounded-xl"
              >
                <a href="https://scheduling.greenfootenergy.ca">
                  Book a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <a
                href="tel:+18003809384"
                className="flex items-center gap-3 text-[#333333] font-bold text-lg border-2 border-[#333333]/50 hover:border-[#333333] rounded-xl px-6 py-3 transition-colors"
              >
                <Phone className="w-5 h-5" />
                1 (800) 380-9384
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
