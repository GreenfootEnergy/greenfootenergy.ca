import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, Heart } from "lucide-react";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import type { Blog } from "@shared/schema";
import { useFavorites } from "@/lib/favorites-context";
import { Helmet } from "react-helmet";
import { blogs as staticBlogs } from "@/data/blogs";
import { BlogRelatedContent } from "@/components/ui/related-content";

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function FavoriteButton({ blogId, variant = "dark" }: { blogId: string; variant?: "dark" | "light" }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(blogId);

  return (
    <button
      onClick={() => toggleFavorite(blogId)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
        favorited 
          ? "bg-red-500 text-white" 
          : variant === "dark"
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-slate-100 hover:bg-slate-200 text-slate-600"
      }`}
      data-testid={`button-favorite-post-${blogId}`}
    >
      <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
      <span className="text-sm font-medium">{favorited ? "Saved" : "Save"}</span>
    </button>
  );
}

function RelatedBlogCard({ blog }: { blog: Blog }) {
  const thumbnailUrl = blog.thumbnail || "/placeholder-blog.jpg";

  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative h-40 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={blog.thumbnailAlt || `${blog.title} - Greenfoot Energy Solutions blog thumbnail`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          {blog.category && (
            <span className="text-[#8dc63f] text-xs font-semibold uppercase tracking-wide">
              {blog.category.replace(/-/g, " ")}
            </span>
          )}
          <h4 className="font-bold text-[#333333] group-hover:text-[#8dc63f] transition-colors mt-1 line-clamp-2">
            {blog.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
            {blog.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.readTime} read
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;

  const blogs = [...staticBlogs] as any as Blog[];

  const blog = blogs.find((b) => b.slug === slug);
  const relatedBlogs = blogs
    .filter((b) => b.slug !== slug && !b.draft && !b.archived && b.category === blog?.category)
    .slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#333333] mb-4">Blog post not found</h1>
          <p className="text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-[#8dc63f] font-medium hover:gap-3 transition-all">
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </span>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const bannerUrl = blog.banner || null;
  const hasBanner = !!bannerUrl;
  const pageUrl = `https://www.greenfootenergy.ca/blog/${blog.slug}`;
  const metaDescription = blog.postSummary || blog.description?.replace(/<[^>]*>/g, "").substring(0, 160) || `Read about ${blog.title} on Greenfoot Energy's blog.`;
  const metaImage = blog.banner || blog.thumbnail || "https://www.greenfootenergy.ca/opengraph.jpg";

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{blog.title} | Greenfoot Energy Blog</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${blog.category?.replace(/-/g, " ") || "energy"}, ${blog.title}, Greenfoot Energy, energy efficiency, home improvement`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${blog.title} | Greenfoot Energy Blog`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="Greenfoot Energy Solutions" />
        {blog.author && <meta property="article:author" content={blog.author.replace(/-/g, " ")} />}
        {blog.publishedAt && <meta property="article:published_time" content={new Date(blog.publishedAt).toISOString()} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | Greenfoot Energy Blog`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <SiteHeader />

      {hasBanner ? (
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bannerUrl}
              alt={blog.bannerAlt || `${blog.title} - Greenfoot Energy Solutions`}
              className="w-full h-full object-cover"
              data-testid="img-blog-banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/blog">
                  <span className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </span>
                </Link>
                {blog.category && (
                  <span className="inline-block bg-[#8dc63f] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 ml-4">
                    {blog.category.replace(/-/g, " ")}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl" data-testid="text-blog-post-title">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  {blog.author && (
                    <span className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {blog.author.replace(/-/g, " ")}
                    </span>
                  )}
                  {blog.publishedAt && (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {formatDate(blog.publishedAt)}
                    </span>
                  )}
                  {blog.readTime && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {blog.readTime} read
                    </span>
                  )}
                  <FavoriteButton blogId={blog.id} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white pt-8 pb-4">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Link href="/blog">
                <span className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8dc63f] mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </span>
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {blog.category && (
                  <span className="inline-block bg-[#8dc63f] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {blog.category.replace(/-/g, " ")}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
                {blog.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blog.author.replace(/-/g, " ")}
                  </span>
                )}
                {blog.publishedAt && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(blog.publishedAt)}
                  </span>
                )}
                {blog.readTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blog.readTime} read
                  </span>
                )}
                <FavoriteButton blogId={blog.id} variant="light" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {blog.postSummary && (
              <div className="text-xl text-slate-700 font-medium leading-relaxed mb-8 pb-8 border-b border-slate-100">
                {blog.postSummary}
              </div>
            )}

            <article
              className="prose prose-lg max-w-none prose-headings:text-[#333333] prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#8dc63f] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#333333] prose-ul:text-slate-600 prose-ol:text-slate-600"
              dangerouslySetInnerHTML={{ __html: blog.postBody || blog.content || blog.description || "" }}
              data-testid="text-blog-content"
            />

            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 rounded-full hover:bg-[#1877f2] hover:text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 rounded-full hover:bg-[#1da1f2] hover:text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <Link href="/blog">
                  <span className="inline-flex items-center gap-2 text-[#8dc63f] font-medium hover:gap-3 transition-all">
                    <ArrowLeft className="w-5 h-5" />
                    Back to all posts
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#333333] mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <RelatedBlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BlogRelatedContent blogSlug={slug || ""} />

      <section className="bg-gradient-to-br from-[#333333] to-[#444444] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our energy experts are ready to help you find the perfect heating and cooling solution for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://scheduling.greenfootenergy.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#8dc63f] text-white px-8 h-12 sm:h-14 rounded-xl font-bold hover:bg-[#7ab535] transition-colors"
              data-testid="link-book-consultation"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/contact-us">
              <span className="inline-flex items-center justify-center gap-2 bg-white text-[#333333] px-8 h-12 sm:h-14 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
