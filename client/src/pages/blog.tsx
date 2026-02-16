import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, TrendingUp, Star, Heart } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import type { Blog } from "@shared/schema";
import { useState } from "react";
import { useFavorites } from "@/lib/favorites-context";
import { Helmet } from "react-helmet";
import { blogs as staticBlogs } from "@/data/blogs";

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function stripHtml(html: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
}

function StackedBlogCards({ blogs }: { blogs: Blog[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayBlogs = blogs.slice(0, 3);

  if (displayBlogs.length === 0) return null;

  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + displayBlogs.length) % displayBlogs.length;
    
    if (position === 0) {
      return {
        zIndex: 30,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
      };
    } else if (position === 1) {
      return {
        zIndex: 20,
        x: 40,
        y: -20,
        rotate: 6,
        scale: 0.95,
        opacity: 0.9,
      };
    } else {
      return {
        zIndex: 10,
        x: 80,
        y: -40,
        rotate: 12,
        scale: 0.9,
        opacity: 0.8,
      };
    }
  };

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      <div className="relative w-[320px] h-[380px]">
        {displayBlogs.map((blog, index) => {
          const style = getCardStyle(index);
          const thumbnailUrl = blog.thumbnail || "/placeholder-blog.jpg";
          
          return (
            <motion.div
              key={blog.id}
              className="absolute top-0 left-0 w-full cursor-pointer"
              initial={false}
              animate={{
                x: style.x,
                y: style.y,
                rotate: style.rotate,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              onHoverStart={() => setActiveIndex(index)}
              whileHover={{ scale: style.zIndex === 30 ? 1.02 : style.scale }}
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 h-[380px] flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={thumbnailUrl}
                      alt={blog.thumbnailAlt || `${blog.title} - Greenfoot Energy Solutions blog thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    {blog.category && (
                      <div className="absolute top-3 left-3 bg-[#8dc63f] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {blog.category.replace(/-/g, " ")}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#333333] text-lg mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                      {blog.postSummary || stripHtml(blog.description)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(blog.publishedAt)}
                      </div>
                      {blog.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {blog.readTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function BlogCard({ blog, featured = false, delay = 0 }: { blog: Blog; featured?: boolean; delay?: number }) {
  const thumbnailUrl = blog.thumbnail || "/placeholder-blog.jpg";
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(blog.id);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`group ${featured ? "col-span-2 row-span-2" : ""}`}
    >
      <Link href={`/blog/${blog.slug}`}>
        <motion.div 
          className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${featured ? "md:flex-row" : ""}`}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className={`relative overflow-hidden ${featured ? "md:w-1/2 h-64 md:h-auto" : "h-48"}`}>
            <motion.img
              src={thumbnailUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              data-testid={`img-blog-${blog.id}`}
            />
            {blog.trendingBlogs && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
              >
                <TrendingUp className="w-3 h-3" />
                Trending
              </motion.div>
            )}
            {blog.featuredBlog && !favorited && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 right-3 bg-[#8dc63f] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Star className="w-3 h-3" />
                Featured
              </motion.div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(blog.id);
              }}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                favorited 
                  ? "bg-red-500 text-white" 
                  : "bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white"
              } ${blog.featuredBlog && !favorited ? "top-12" : ""}`}
              data-testid={`button-favorite-${blog.id}`}
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className={`p-6 flex flex-col flex-1 ${featured ? "md:w-1/2 md:p-8" : ""}`}>
            {blog.category && (
              <span className="text-[#8dc63f] text-sm font-semibold uppercase tracking-wide mb-2">
                {blog.category.replace(/-/g, " ")}
              </span>
            )}
            <h3 className={`font-bold text-[#333333] group-hover:text-[#8dc63f] transition-colors mb-3 ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
              {blog.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">
              {blog.postSummary || stripHtml(blog.description)}
            </p>
            <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {blog.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blog.author.replace(/-/g, " ")}
                  </span>
                )}
                {blog.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime} read
                  </span>
                )}
              </div>
              <motion.span 
                className="flex items-center gap-1 text-[#8dc63f] font-medium"
                whileHover={{ x: 5 }}
              >
                Read <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, isFavorite } = useFavorites();

  const blogs = [...staticBlogs] as any as Blog[];

  const publishedBlogs = blogs.filter((b) => !b.draft && !b.archived);
  
  const categories = Array.from(new Set(publishedBlogs.map((b) => b.category).filter(Boolean))) as string[];

  const filteredBlogs = showFavorites
    ? publishedBlogs.filter(b => isFavorite(b.id))
    : selectedCategory 
      ? publishedBlogs.filter(b => b.category === selectedCategory)
      : publishedBlogs;

  const recentBlogs = [...publishedBlogs].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 3);

  const trendingBlogs = filteredBlogs.filter((b) => b.trendingBlogs).slice(0, 3);
  const regularBlogs = filteredBlogs;
  const favoriteCount = publishedBlogs.filter(b => isFavorite(b.id)).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Energy Blog | Tips & News | Greenfoot Energy</title>
        <meta name="description" content="Stay informed with Greenfoot Energy's blog. Expert tips on heat pumps, insulation, solar energy, and home efficiency. Save energy and reduce your utility bills with our insights." />
        <meta name="keywords" content="energy blog, heat pump tips, insulation advice, solar energy news, home efficiency, energy savings, HVAC tips, Greenfoot Energy, Atlantic Canada energy" />
        <link rel="canonical" href="https://www.greenfootenergy.ca/blog" />
        <meta property="og:title" content="Energy Blog | Tips & News | Greenfoot Energy" />
        <meta property="og:description" content="Stay informed with Greenfoot Energy's blog. Expert tips on heat pumps, insulation, solar energy, and home efficiency. Save energy and reduce your utility bills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greenfootenergy.ca/blog" />
        <meta property="og:image" content="https://www.greenfootenergy.ca/opengraph.jpg" />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Energy Blog | Tips & News | Greenfoot Energy" />
        <meta name="twitter:description" content="Stay informed with Greenfoot Energy's blog. Expert tips on heat pumps, insulation, solar energy, and home efficiency." />
        <meta name="twitter:image" content="https://www.greenfootenergy.ca/opengraph.jpg" />
      </Helmet>
      <SiteHeader />

      <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
                data-testid="text-blog-title"
              >
                <span className="text-[#8dc63f]">
                  {selectedCategory 
                    ? selectedCategory.replace(/-/g, " ").split(" ").slice(0, 2).join(" ")
                    : "Energy Efficiency Tips"}
                </span>
                <span className="text-[#333333]"> & </span>
                <br />
                <span className="text-[#333333]">
                  {selectedCategory 
                    ? "Articles"
                    : "Home Upgrade Insights"}
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg text-slate-600 leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedCategory 
                  ? `Explore our latest articles and insights about ${selectedCategory.replace(/-/g, " ").toLowerCase()}.`
                  : "A place to read, learn, and connect with new ideas, each other & the community through updates and community initiatives"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="https://scheduling.greenfootenergy.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8dc63f] text-white px-6 h-12 sm:h-14 rounded-xl font-bold hover:bg-[#709c32] transition-colors shadow-lg shadow-[#8dc63f]/30"
                >
                  Go To Booking & Quotes
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <StackedBlogCards blogs={recentBlogs} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-[#333333]">Latest Energy Efficiency Blog Posts & Tips</h2>
          </motion.div>

          {categories.length > 0 && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-[#333333] mb-4">
                Blog Categories: <span className="font-normal text-slate-600">Heating, Cooling, Geothermal, Solar, and more</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                <motion.button 
                  onClick={() => { setSelectedCategory(null); setShowFavorites(false); }}
                  className={`${!selectedCategory && !showFavorites ? "bg-[#8dc63f] text-white border-[#8dc63f]" : "bg-white text-[#333333] border-slate-200 hover:border-[#8dc63f]"} px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border shadow-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-all-posts"
                >
                  All Posts
                </motion.button>
                {favoriteCount > 0 && (
                  <motion.button 
                    onClick={() => { setSelectedCategory(null); setShowFavorites(true); }}
                    className={`${showFavorites ? "bg-red-500 text-white border-red-500" : "bg-white text-[#333333] border-slate-200 hover:border-red-500"} px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border shadow-sm flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="button-favorites-filter"
                  >
                    <Heart className={`w-4 h-4 ${showFavorites ? "fill-current" : ""}`} />
                    My Favorites ({favoriteCount})
                  </motion.button>
                )}
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFavorites(false); }}
                    className={`${selectedCategory === cat && !showFavorites ? "bg-[#8dc63f] text-white border-[#8dc63f]" : "bg-white text-[#333333] border-slate-200 hover:border-[#8dc63f]"} px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border shadow-sm`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`button-category-${cat}`}
                  >
                    {cat?.replace(/-/g, " ")}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {regularBlogs.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {showFavorites ? (
                <>
                  <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#333333] mb-4">No saved favorites yet</h3>
                  <p className="text-slate-600">Click the heart icon on any blog post to save it here for quick access.</p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#333333] mb-4">No posts in this category</h3>
                  <p className="text-slate-600">Check back soon for more updates!</p>
                </>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {regularBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} delay={index * 0.1} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {trendingBlogs.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-[#333333]">Featured Blogs</h2>
              <a href="#" className="ml-auto text-[#8dc63f] font-semibold text-sm hover:underline">View All</a>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {trendingBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} delay={index * 0.15} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#8dc63f] py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#333333] mb-4">Ready to Save on Energy?</h2>
            <p className="text-[#333333]/80 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our energy experts and discover how heat pumps can reduce your energy bills.
            </p>
            <motion.a
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#8dc63f] px-8 h-12 sm:h-14 rounded-xl font-bold hover:bg-[#333333] hover:text-white transition-colors"
              data-testid="link-blog-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
