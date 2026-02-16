import { 
  users, type User, type InsertUser,
  locations, type Location, type InsertLocation,
  brands, type Brand, type InsertBrand,
  authors, type Author, type InsertAuthor,
  blogCategories, type BlogCategory, type InsertBlogCategory,
  blogs, type Blog, type InsertBlog,
  faqs, type Faq, type InsertFaq,
  promotions, type Promotion, type InsertPromotion,
  adminUsers, type AdminUser, type InsertAdminUser,
  codeSnippets, type CodeSnippet, type InsertCodeSnippet
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getLocations(): Promise<Location[]>;
  getLocation(id: string): Promise<Location | undefined>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: string): Promise<boolean>;
  bulkCreateLocations(locations: InsertLocation[]): Promise<Location[]>;

  getBrands(): Promise<Brand[]>;
  getBrand(id: string): Promise<Brand | undefined>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  updateBrand(id: string, brand: Partial<InsertBrand>): Promise<Brand | undefined>;
  deleteBrand(id: string): Promise<boolean>;
  bulkCreateBrands(brands: InsertBrand[]): Promise<Brand[]>;

  getAuthors(): Promise<Author[]>;
  getAuthor(id: string): Promise<Author | undefined>;
  getAuthorBySlug(slug: string): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  updateAuthor(id: string, author: Partial<InsertAuthor>): Promise<Author | undefined>;
  deleteAuthor(id: string): Promise<boolean>;
  bulkCreateAuthors(authors: InsertAuthor[]): Promise<Author[]>;

  getBlogCategories(): Promise<BlogCategory[]>;
  getBlogCategory(id: string): Promise<BlogCategory | undefined>;
  getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined>;
  createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  updateBlogCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined>;
  deleteBlogCategory(id: string): Promise<boolean>;
  bulkCreateBlogCategories(categories: InsertBlogCategory[]): Promise<BlogCategory[]>;

  getBlogs(): Promise<Blog[]>;
  getBlog(id: string): Promise<Blog | undefined>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;
  bulkCreateBlogs(blogs: InsertBlog[]): Promise<Blog[]>;

  getFaqs(): Promise<Faq[]>;
  getFaq(id: string): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: string): Promise<boolean>;
  bulkCreateFaqs(faqs: InsertFaq[]): Promise<Faq[]>;

  getPromotions(): Promise<Promotion[]>;
  getPromotion(id: string): Promise<Promotion | undefined>;
  getPromotionsByProvince(province: string): Promise<Promotion[]>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  updatePromotion(id: string, promotion: Partial<InsertPromotion>): Promise<Promotion | undefined>;
  deletePromotion(id: string): Promise<boolean>;
  bulkCreatePromotions(promotions: InsertPromotion[]): Promise<Promotion[]>;


  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: string): Promise<boolean>;

  getCodeSnippets(): Promise<CodeSnippet[]>;
  getCodeSnippet(id: string): Promise<CodeSnippet | undefined>;
  getCodeSnippetsByLocation(location: string): Promise<CodeSnippet[]>;
  createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
  updateCodeSnippet(id: string, snippet: Partial<InsertCodeSnippet>): Promise<CodeSnippet | undefined>;
  deleteCodeSnippet(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getLocations(): Promise<Location[]> {
    return db.select().from(locations);
  }

  async getLocation(id: string): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location || undefined;
  }

  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.slug, slug));
    return location || undefined;
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const [created] = await db.insert(locations).values(location).returning();
    return created;
  }

  async updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location | undefined> {
    const [updated] = await db.update(locations).set({ ...location, updatedAt: new Date() }).where(eq(locations.id, id)).returning();
    return updated || undefined;
  }

  async deleteLocation(id: string): Promise<boolean> {
    const result = await db.delete(locations).where(eq(locations.id, id));
    return true;
  }

  async bulkCreateLocations(locationList: InsertLocation[]): Promise<Location[]> {
    if (locationList.length === 0) return [];
    return db.insert(locations).values(locationList).returning();
  }

  async getBrands(): Promise<Brand[]> {
    return db.select().from(brands);
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand || undefined;
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand || undefined;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const [created] = await db.insert(brands).values(brand).returning();
    return created;
  }

  async updateBrand(id: string, brand: Partial<InsertBrand>): Promise<Brand | undefined> {
    const [updated] = await db.update(brands).set({ ...brand, updatedAt: new Date() }).where(eq(brands.id, id)).returning();
    return updated || undefined;
  }

  async deleteBrand(id: string): Promise<boolean> {
    await db.delete(brands).where(eq(brands.id, id));
    return true;
  }

  async bulkCreateBrands(brandList: InsertBrand[]): Promise<Brand[]> {
    if (brandList.length === 0) return [];
    return db.insert(brands).values(brandList).returning();
  }

  async getAuthors(): Promise<Author[]> {
    return db.select().from(authors);
  }

  async getAuthor(id: string): Promise<Author | undefined> {
    const [author] = await db.select().from(authors).where(eq(authors.id, id));
    return author || undefined;
  }

  async getAuthorBySlug(slug: string): Promise<Author | undefined> {
    const [author] = await db.select().from(authors).where(eq(authors.slug, slug));
    return author || undefined;
  }

  async createAuthor(author: InsertAuthor): Promise<Author> {
    const [created] = await db.insert(authors).values(author).returning();
    return created;
  }

  async updateAuthor(id: string, author: Partial<InsertAuthor>): Promise<Author | undefined> {
    const [updated] = await db.update(authors).set({ ...author, updatedAt: new Date() }).where(eq(authors.id, id)).returning();
    return updated || undefined;
  }

  async deleteAuthor(id: string): Promise<boolean> {
    await db.delete(authors).where(eq(authors.id, id));
    return true;
  }

  async bulkCreateAuthors(authorList: InsertAuthor[]): Promise<Author[]> {
    if (authorList.length === 0) return [];
    return db.insert(authors).values(authorList).returning();
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    return db.select().from(blogCategories);
  }

  async getBlogCategory(id: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.id, id));
    return category || undefined;
  }

  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
    return category || undefined;
  }

  async createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const [created] = await db.insert(blogCategories).values(category).returning();
    return created;
  }

  async updateBlogCategory(id: string, category: Partial<InsertBlogCategory>): Promise<BlogCategory | undefined> {
    const [updated] = await db.update(blogCategories).set({ ...category, updatedAt: new Date() }).where(eq(blogCategories.id, id)).returning();
    return updated || undefined;
  }

  async deleteBlogCategory(id: string): Promise<boolean> {
    await db.delete(blogCategories).where(eq(blogCategories.id, id));
    return true;
  }

  async bulkCreateBlogCategories(categoryList: InsertBlogCategory[]): Promise<BlogCategory[]> {
    if (categoryList.length === 0) return [];
    return db.insert(blogCategories).values(categoryList).returning();
  }

  async getBlogs(): Promise<Blog[]> {
    return db.select().from(blogs);
  }

  async getBlog(id: string): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || undefined;
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.slug, slug));
    return blog || undefined;
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const [created] = await db.insert(blogs).values(blog).returning();
    return created;
  }

  async updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const [updated] = await db.update(blogs).set({ ...blog, updatedAt: new Date() }).where(eq(blogs.id, id)).returning();
    return updated || undefined;
  }

  async deleteBlog(id: string): Promise<boolean> {
    await db.delete(blogs).where(eq(blogs.id, id));
    return true;
  }

  async bulkCreateBlogs(blogList: InsertBlog[]): Promise<Blog[]> {
    if (blogList.length === 0) return [];
    return db.insert(blogs).values(blogList).returning();
  }

  async getFaqs(): Promise<Faq[]> {
    return db.select().from(faqs);
  }

  async getFaq(id: string): Promise<Faq | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq || undefined;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [created] = await db.insert(faqs).values(faq).returning();
    return created;
  }

  async updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq | undefined> {
    const [updated] = await db.update(faqs).set({ ...faq, updatedAt: new Date() }).where(eq(faqs.id, id)).returning();
    return updated || undefined;
  }

  async deleteFaq(id: string): Promise<boolean> {
    await db.delete(faqs).where(eq(faqs.id, id));
    return true;
  }

  async bulkCreateFaqs(faqList: InsertFaq[]): Promise<Faq[]> {
    if (faqList.length === 0) return [];
    return db.insert(faqs).values(faqList).returning();
  }

  async getPromotions(): Promise<Promotion[]> {
    return db.select().from(promotions);
  }

  async getPromotion(id: string): Promise<Promotion | undefined> {
    const [promotion] = await db.select().from(promotions).where(eq(promotions.id, id));
    return promotion || undefined;
  }

  async getPromotionsByProvince(province: string): Promise<Promotion[]> {
    return db.select().from(promotions).where(eq(promotions.province, province));
  }

  async createPromotion(promotion: InsertPromotion): Promise<Promotion> {
    const [created] = await db.insert(promotions).values(promotion).returning();
    return created;
  }

  async updatePromotion(id: string, promotion: Partial<InsertPromotion>): Promise<Promotion | undefined> {
    const [updated] = await db.update(promotions).set({ ...promotion, updatedAt: new Date() }).where(eq(promotions.id, id)).returning();
    return updated || undefined;
  }

  async deletePromotion(id: string): Promise<boolean> {
    await db.delete(promotions).where(eq(promotions.id, id));
    return true;
  }

  async bulkCreatePromotions(promotionList: InsertPromotion[]): Promise<Promotion[]> {
    if (promotionList.length === 0) return [];
    return db.insert(promotions).values(promotionList).returning();
  }


  async getAdminUsers(): Promise<AdminUser[]> {
    return db.select().from(adminUsers);
  }

  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase()));
    return user || undefined;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values({
      ...user,
      email: user.email.toLowerCase()
    }).returning();
    return created;
  }

  async updateAdminUser(id: string, user: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const updateData = { ...user };
    if (updateData.email) {
      updateData.email = updateData.email.toLowerCase();
    }
    const [updated] = await db.update(adminUsers).set(updateData).where(eq(adminUsers.id, id)).returning();
    return updated || undefined;
  }

  async deleteAdminUser(id: string): Promise<boolean> {
    await db.delete(adminUsers).where(eq(adminUsers.id, id));
    return true;
  }

  async getCodeSnippets(): Promise<CodeSnippet[]> {
    return db.select().from(codeSnippets);
  }

  async getCodeSnippet(id: string): Promise<CodeSnippet | undefined> {
    const [snippet] = await db.select().from(codeSnippets).where(eq(codeSnippets.id, id));
    return snippet || undefined;
  }

  async getCodeSnippetsByLocation(location: string): Promise<CodeSnippet[]> {
    return db.select().from(codeSnippets).where(eq(codeSnippets.location, location));
  }

  async createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const [created] = await db.insert(codeSnippets).values(snippet).returning();
    return created;
  }

  async updateCodeSnippet(id: string, snippet: Partial<InsertCodeSnippet>): Promise<CodeSnippet | undefined> {
    const [updated] = await db.update(codeSnippets).set(snippet).where(eq(codeSnippets.id, id)).returning();
    return updated || undefined;
  }

  async deleteCodeSnippet(id: string): Promise<boolean> {
    await db.delete(codeSnippets).where(eq(codeSnippets.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
