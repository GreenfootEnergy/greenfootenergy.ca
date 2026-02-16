import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLocationSchema, 
  insertBrandSchema, 
  insertAuthorSchema, 
  insertBlogCategorySchema, 
  insertBlogSchema, 
  insertFaqSchema,
  insertPromotionSchema,
  insertCodeSnippetSchema,
  type InsertBlog
} from "@shared/schema";
import { z } from "zod";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { downloadAndStoreImage } from "./imageDownloader";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

function parseCSV(csvText: string): Record<string, string>[] {
  if (!csvText || typeof csvText !== 'string') {
    return [];
  }
  
  const normalizedText = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalizedText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }
  
  return rows;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

interface ValidationError {
  row: number;
  errors: z.ZodIssue[];
}

function validateRows<T>(
  rows: Record<string, string>[],
  transform: (row: Record<string, string>, index: number) => unknown,
  schema: z.ZodType<T>
): { valid: T[]; errors: ValidationError[] } {
  const valid: T[] = [];
  const errors: ValidationError[] = [];
  
  for (let i = 0; i < rows.length; i++) {
    const transformed = transform(rows[i], i);
    const result = schema.safeParse(transformed);
    if (result.success) {
      valid.push(result.data);
    } else {
      errors.push({ row: i + 2, errors: result.error.errors });
    }
  }
  
  return { valid, errors };
}

const csvLocationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  address: z.string().nullable().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal('')).transform(v => v === '' ? null : v),
  description: z.string().nullable().optional(),
  serviceArea: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

const csvBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  logo: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  website: z.string().url().nullable().optional().or(z.literal('')).transform(v => v === '' ? null : v),
  isActive: z.boolean().optional().default(true),
});

const csvAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  bio: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal('')).transform(v => v === '' ? null : v),
  isActive: z.boolean().optional().default(true),
  collectionId: z.string().nullable().optional(),
  localeId: z.string().nullable().optional(),
  itemId: z.string().nullable().optional(),
  archived: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  publishedAt: z.date().nullable().optional(),
  picture: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  bioSummary: z.string().nullable().optional(),
  facebookProfileLink: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const csvBlogCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
  collectionId: z.string().nullable().optional(),
  localeId: z.string().nullable().optional(),
  itemId: z.string().nullable().optional(),
  archived: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  publishedAt: z.date().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDesc: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const csvBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  featuredImage: z.string().nullable().optional(),
  authorId: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  isPublished: z.boolean().optional().default(false),
  publishedAt: z.date().nullable().optional(),
  collectionId: z.string().nullable().optional(),
  localeId: z.string().nullable().optional(),
  itemId: z.string().nullable().optional(),
  archived: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  metaTitle: z.string().nullable().optional(),
  metaDesc: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  readTime: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  postBody: z.string().nullable().optional(),
  postSummary: z.string().nullable().optional(),
  trendingBlogs: z.boolean().optional().default(false),
  featuredBlog: z.boolean().optional().default(false),
  popularBlogs: z.boolean().optional().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const csvFaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().nullable().optional(),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

const csvPromotionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  province: z.string().min(1, "Province is required"),
  link: z.string().nullable().optional(),
  linkText: z.string().nullable().optional().default("FREE QUOTE"),
  promoType: z.string().nullable().optional(),
  discountValue: z.string().nullable().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
});

const defaultPromotions = [
  { title: "Limited-time Scratch & Win!", description: "Get a quote, scratch your card, and you could win a free upgrade!", province: "British Columbia", link: "https://www.greenfootenergy.ca/lp/scratch", linkText: "FREE QUOTE", sortOrder: 0, isActive: true, isFeatured: true },
  { title: "Up To $400 Off Heat Pumps With Gridless", description: "Save $400 on Gridless heat pump brands when you buy 3+ Units", province: "British Columbia", link: "https://www.greenfootenergy.ca/lp/gridless-buy-more", linkText: "FREE QUOTE", sortOrder: 1, isActive: true, isFeatured: false },
  { title: "Finance Your Heat Pump for $2/Day", description: "Finance your new heat pump for less than $2/Day", province: "British Columbia", link: "https://www.greenfootenergy.ca/lp/cozy-subscription", linkText: "FREE QUOTE", sortOrder: 2, isActive: true, isFeatured: false },
  { title: "Up to $5500 back on insulation", description: "Claim up to $5500 in rebates on insulation", province: "British Columbia", link: "https://www.greenfootenergy.ca/lp/british-columbia-insulation-rebates", linkText: "FREE QUOTE", sortOrder: 3, isActive: true, isFeatured: false },
  { title: "Limited-time Scratch & Win!", description: "Get a quote, scratch your card, and you could win a free upgrade!", province: "New Brunswick", link: "https://www.greenfootenergy.ca/lp/scratch", linkText: "FREE QUOTE", sortOrder: 0, isActive: true, isFeatured: true },
  { title: "Up To $400 Off Heat Pumps With Gridless", description: "Save $400 on Gridless heat pump brands when you buy 3+ Units", province: "New Brunswick", link: "https://www.greenfootenergy.ca/lp/gridless-buy-more", linkText: "FREE QUOTE", sortOrder: 1, isActive: true, isFeatured: false },
  { title: "Finance Your Heat Pump for $2/Day", description: "Finance your new heat pump for less than $2/Day", province: "New Brunswick", link: "https://www.greenfootenergy.ca/lp/cozy-subscription", linkText: "FREE QUOTE", sortOrder: 2, isActive: true, isFeatured: false },
  { title: "Up to $1750 back on insulation", description: "Claim up to $1750 in rebates on insulation", province: "New Brunswick", link: "https://www.greenfootenergy.ca/lp/new-brunswick-insulation-rebates", linkText: "FREE QUOTE", sortOrder: 3, isActive: true, isFeatured: false },
  { title: "Limited-time Scratch & Win!", description: "Get a quote, scratch your card, and you could win a free upgrade!", province: "Prince Edward Island", link: "https://www.greenfootenergy.ca/lp/scratch", linkText: "FREE QUOTE", sortOrder: 0, isActive: true, isFeatured: true },
  { title: "Up To $400 Off Heat Pumps With Gridless", description: "Save $400 on Gridless heat pump brands when you buy 3+ Units", province: "Prince Edward Island", link: "https://www.greenfootenergy.ca/lp/gridless-buy-more", linkText: "FREE QUOTE", sortOrder: 1, isActive: true, isFeatured: false },
  { title: "Finance Your Heat Pump for $2/Day", description: "Finance your new heat pump for less than $2/Day", province: "Prince Edward Island", link: "https://www.greenfootenergy.ca/lp/cozy-subscription", linkText: "FREE QUOTE", sortOrder: 2, isActive: true, isFeatured: false },
  { title: "Save on insulation", description: "Contact us for potential rebates on insulation", province: "Prince Edward Island", link: "https://www.greenfootenergy.ca/lp/prince-edward-island-insulation-rebates", linkText: "FREE QUOTE", sortOrder: 3, isActive: true, isFeatured: false },
  { title: "Limited-time Scratch & Win!", description: "Get a quote, scratch your card, and you could win a free upgrade!", province: "Nova Scotia", link: "https://www.greenfootenergy.ca/lp/scratch", linkText: "FREE QUOTE", sortOrder: 0, isActive: true, isFeatured: true },
  { title: "Up To $400 Off Heat Pumps With Gridless", description: "Save $400 on Gridless heat pump brands when you buy 3+ Units", province: "Nova Scotia", link: "https://www.greenfootenergy.ca/lp/gridless-buy-more", linkText: "FREE QUOTE", sortOrder: 1, isActive: true, isFeatured: false },
  { title: "Finance Your Heat Pump for $2/Day", description: "Finance your new heat pump for less than $2/Day", province: "Nova Scotia", link: "https://www.greenfootenergy.ca/lp/cozy-subscription", linkText: "FREE QUOTE", sortOrder: 2, isActive: true, isFeatured: false },
  { title: "Up to $1500 back on insulation", description: "Claim up to $1500 in rebates on insulation", province: "Nova Scotia", link: "https://www.greenfootenergy.ca/lp/nova-scotia-insulation-rebates", linkText: "Book Now", sortOrder: 3, isActive: true, isFeatured: false },
  { title: "Limited-time Scratch & Win!", description: "Get a quote, scratch your card, and you could win a free upgrade!", province: "Newfoundland and Labrador", link: "https://www.greenfootenergy.ca/lp/scratch", linkText: "FREE QUOTE", sortOrder: 0, isActive: true, isFeatured: true },
  { title: "Up To $400 Off Heat Pumps With Gridless", description: "Save $400 on Gridless heat pump brands when you buy 3+ Units", province: "Newfoundland and Labrador", link: "https://www.greenfootenergy.ca/lp/gridless-buy-more", linkText: "Book Now", sortOrder: 1, isActive: true, isFeatured: false },
  { title: "Finance Your Heat Pump for $2/Day", description: "Finance your new heat pump for less than $2/Day", province: "Newfoundland and Labrador", link: "https://scheduling.greenfootenergy.ca/", linkText: "Book Now", sortOrder: 2, isActive: true, isFeatured: false },
  { title: "Up to $3000 back on insulation", description: "Claim up to $3000 in rebates on insulation", province: "Newfoundland and Labrador", link: "https://www.greenfootenergy.ca/lp/newfoundland-labrador-insulation-rebates", linkText: "Book Now", sortOrder: 3, isActive: true, isFeatured: false },
];

async function seedPromotionsIfEmpty() {
  try {
    const existing = await storage.getPromotions();
    if (existing.length === 0) {
      console.log("Seeding default promotions...");
      for (const promo of defaultPromotions) {
        await storage.createPromotion(promo);
      }
      console.log(`Seeded ${defaultPromotions.length} promotions`);
    }
  } catch (error) {
    console.error("Error seeding promotions:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  await seedPromotionsIfEmpty();

  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);

  app.get("/api/locations", async (_req: Request, res: Response) => {
    try {
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.get("/api/locations/slug/:slug", async (req: Request, res: Response) => {
    try {
      const location = await storage.getLocationBySlug(req.params.slug);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });

  app.get("/api/locations/:id", async (req: Request, res: Response) => {
    try {
      const location = await storage.getLocation(req.params.id);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });

  // Feedback form submission endpoint
  app.post("/api/feedback", async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, phone, feedback, rating } = req.body;

      if (!firstName || !lastName || !email || !feedback) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Try to send email via Resend if available
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (resendApiKey) {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: "Greenfoot Feedback <feedback@greenfootenergy.ca>",
          to: ["info@greenfootenergy.ca"],
          subject: `Customer Feedback - ${rating} Star Rating`,
          html: `
            <h2>Customer Feedback Submission</h2>
            <p><strong>Rating:</strong> ${rating} star(s)</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <hr />
            <h3>Feedback:</h3>
            <p>${feedback}</p>
          `,
        });
      } else {
        // Log feedback if Resend is not configured
        console.log("Feedback received (Resend not configured):", {
          firstName,
          lastName,
          email,
          phone,
          feedback,
          rating,
        });
      }

      res.json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });

  app.post("/api/locations", async (req: Request, res: Response) => {
    try {
      const data = insertLocationSchema.parse(req.body);
      const location = await storage.createLocation(data);
      res.status(201).json(location);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create location" });
    }
  });

  app.put("/api/locations/:id", async (req: Request, res: Response) => {
    try {
      const data = insertLocationSchema.partial().parse(req.body);
      const location = await storage.updateLocation(req.params.id, data);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update location" });
    }
  });

  app.delete("/api/locations/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteLocation(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete location" });
    }
  });

  app.post("/api/locations/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row) => ({
        name: row.name || '',
        slug: row.slug || slugify(row.name || ''),
        address: row.address || null,
        city: row.city || '',
        province: row.province || null,
        postalCode: row.postal_code || row.postalCode || null,
        phone: row.phone || null,
        email: row.email || null,
        description: row.description || null,
        serviceArea: row.service_area || row.serviceArea || null,
        isActive: row.is_active !== 'false',
      }), csvLocationSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreateLocations(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import locations" });
    }
  });

  app.get("/api/brands", async (_req: Request, res: Response) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.get("/api/brands/:id", async (req: Request, res: Response) => {
    try {
      const brand = await storage.getBrand(req.params.id);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brand" });
    }
  });

  app.post("/api/brands", async (req: Request, res: Response) => {
    try {
      const data = insertBrandSchema.parse(req.body);
      const brand = await storage.createBrand(data);
      res.status(201).json(brand);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create brand" });
    }
  });

  app.put("/api/brands/:id", async (req: Request, res: Response) => {
    try {
      const data = insertBrandSchema.partial().parse(req.body);
      const brand = await storage.updateBrand(req.params.id, data);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update brand" });
    }
  });

  app.delete("/api/brands/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteBrand(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete brand" });
    }
  });

  app.post("/api/brands/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row) => ({
        name: row.name || '',
        slug: row.slug || slugify(row.name || ''),
        logo: row.logo || null,
        description: row.description || null,
        website: row.website || null,
        isActive: row.is_active !== 'false',
      }), csvBrandSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreateBrands(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import brands" });
    }
  });

  app.get("/api/authors", async (_req: Request, res: Response) => {
    try {
      const authors = await storage.getAuthors();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch authors" });
    }
  });

  app.get("/api/authors/:id", async (req: Request, res: Response) => {
    try {
      const author = await storage.getAuthor(req.params.id);
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch author" });
    }
  });

  app.post("/api/authors", async (req: Request, res: Response) => {
    try {
      const data = insertAuthorSchema.parse(req.body);
      const author = await storage.createAuthor(data);
      res.status(201).json(author);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create author" });
    }
  });

  app.put("/api/authors/:id", async (req: Request, res: Response) => {
    try {
      const data = insertAuthorSchema.partial().parse(req.body);
      const author = await storage.updateAuthor(req.params.id, data);
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      res.json(author);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update author" });
    }
  });

  app.delete("/api/authors/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteAuthor(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete author" });
    }
  });

  app.post("/api/authors/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row) => ({
        name: row['Name'] || row.name || '',
        slug: row['Slug'] || row.slug || slugify(row['Name'] || row.name || ''),
        bio: row.bio || null,
        avatar: row.avatar || row['Picture'] || null,
        email: row['Email'] || row.email || null,
        isActive: row.is_active !== 'false',
        collectionId: row['Collection ID'] || null,
        localeId: row['Locale ID'] || null,
        itemId: row['Item ID'] || null,
        archived: row['Archived']?.toLowerCase() === 'true',
        draft: row['Draft']?.toLowerCase() === 'true',
        publishedAt: row['Published On'] ? new Date(row['Published On']) : null,
        picture: row['Picture'] || null,
        shortDescription: row['Short Description'] || null,
        bioSummary: row['Bio Summary'] || null,
        facebookProfileLink: row['Facebook Profile Link'] || null,
        createdAt: row['Created On'] ? new Date(row['Created On']) : undefined,
        updatedAt: row['Updated On'] ? new Date(row['Updated On']) : undefined,
      }), csvAuthorSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreateAuthors(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import authors" });
    }
  });

  app.post("/api/authors/migrate-images", async (_req: Request, res: Response) => {
    try {
      const authorList = await storage.getAuthors();
      let updated = 0;
      let failed = 0;
      const results: { id: string; name: string; pictureMigrated: boolean }[] = [];

      for (const author of authorList) {
        let pictureMigrated = false;
        const updates: { picture?: string; pictureAlt?: string } = {};

        // Set alt text if not already set (regardless of picture source)
        if (!author.pictureAlt && author.name) {
          updates.pictureAlt = `${author.name} - Greenfoot Energy Solutions team member`;
        }

        if (author.picture && author.picture.startsWith('http')) {
          try {
            const localPath = await downloadAndStoreImage(author.picture, 'author-pictures', author.name);
            if (localPath) {
              updates.picture = localPath;
              updates.pictureAlt = `${author.name} - Greenfoot Energy Solutions team member`;
              pictureMigrated = true;
            }
          } catch (e) {
            console.error(`Failed to download picture for author ${author.id}:`, e);
          }
        }

        if (Object.keys(updates).length > 0) {
          const result = await storage.updateAuthor(author.id, updates);
          if (result) {
            updated++;
          } else {
            failed++;
          }
        }

        if (pictureMigrated) {
          results.push({
            id: author.id,
            name: author.name,
            pictureMigrated,
          });
        }
      }

      res.json({
        message: "Author image migration complete",
        totalAuthors: authorList.length,
        authorsUpdated: updated,
        authorsFailed: failed,
        details: results,
      });
    } catch (error) {
      console.error('Author image migration error:', error);
      res.status(500).json({ error: "Failed to migrate author images" });
    }
  });

  app.get("/api/blog-categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getBlogCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog categories" });
    }
  });

  app.get("/api/blog-categories/:id", async (req: Request, res: Response) => {
    try {
      const category = await storage.getBlogCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Blog category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog category" });
    }
  });

  app.post("/api/blog-categories", async (req: Request, res: Response) => {
    try {
      const data = insertBlogCategorySchema.parse(req.body);
      const category = await storage.createBlogCategory(data);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create blog category" });
    }
  });

  app.put("/api/blog-categories/:id", async (req: Request, res: Response) => {
    try {
      const data = insertBlogCategorySchema.partial().parse(req.body);
      const category = await storage.updateBlogCategory(req.params.id, data);
      if (!category) {
        return res.status(404).json({ error: "Blog category not found" });
      }
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update blog category" });
    }
  });

  app.delete("/api/blog-categories/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteBlogCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog category" });
    }
  });

  app.post("/api/blog-categories/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row) => ({
        name: row.Name || row.name || '',
        slug: row.Slug || row.slug || slugify(row.Name || row.name || ''),
        description: row.description || null,
        isActive: row.is_active !== 'false',
        collectionId: row['Collection ID'] || row.collection_id || null,
        localeId: row['Locale ID'] || row.locale_id || null,
        itemId: row['Item ID'] || row.item_id || null,
        archived: row.Archived === 'true' || row.archived === 'true',
        draft: row.Draft === 'true' || row.draft === 'true',
        publishedAt: row['Published On'] || row.published_at ? new Date(row['Published On'] || row.published_at) : null,
        metaTitle: row['Meta Title'] || row.meta_title || null,
        metaDesc: row['Meta Desc'] || row.meta_desc || null,
        createdAt: row['Created On'] ? new Date(row['Created On']) : undefined,
        updatedAt: row['Updated On'] ? new Date(row['Updated On']) : undefined,
      }), csvBlogCategorySchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreateBlogCategories(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import blog categories" });
    }
  });

  app.get("/api/blogs", async (_req: Request, res: Response) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:id", async (req: Request, res: Response) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });

  app.post("/api/blogs", async (req: Request, res: Response) => {
    try {
      const data = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(data);
      res.status(201).json(blog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create blog" });
    }
  });

  app.put("/api/blogs/:id", async (req: Request, res: Response) => {
    try {
      const data = insertBlogSchema.partial().parse(req.body);
      const blog = await storage.updateBlog(req.params.id, data);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update blog" });
    }
  });

  app.delete("/api/blogs/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteBlog(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  });

  app.post("/api/blogs/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row) => ({
        title: row.Name || row.name || row.title || '',
        slug: row.Slug || row.slug || slugify(row.Name || row.name || row.title || ''),
        content: row['Post Body'] || row.post_body || row.content || null,
        excerpt: row.excerpt || null,
        featuredImage: row.featured_image || row.featuredImage || null,
        authorId: row.author_id || row.authorId || null,
        categoryId: row.category_id || row.categoryId || null,
        isPublished: row.Draft === 'false' || row.is_published === 'true',
        publishedAt: row['Published On'] || row.published_at ? new Date(row['Published On'] || row.published_at) : null,
        collectionId: row['Collection ID'] || row.collection_id || null,
        localeId: row['Locale ID'] || row.locale_id || null,
        itemId: row['Item ID'] || row.item_id || null,
        archived: row.Archived === 'true' || row.archived === 'true',
        draft: row.Draft === 'true' || row.draft === 'true',
        metaTitle: row['Meta title'] || row['Meta Title'] || row.meta_title || null,
        metaDesc: row['Meta desc'] || row['Meta Desc'] || row.meta_desc || null,
        thumbnail: row.Thumbnail || row.thumbnail || null,
        banner: row.Banner || row.banner || null,
        category: row.Category || row.category || null,
        readTime: row['Read Time'] || row.read_time || null,
        author: row.Author || row.author || null,
        description: row.Description || row.description || null,
        postBody: row['Post Body'] || row.post_body || null,
        postSummary: row['Post Summary'] || row.post_summary || null,
        trendingBlogs: row['Treding Blogs'] === 'true' || row['Trending Blogs'] === 'true' || row.trending_blogs === 'true',
        featuredBlog: row['Featured Blog'] === 'true' || row.featured_blog === 'true',
        popularBlogs: row['Popular Blogs'] === 'true' || row.popular_blogs === 'true',
        createdAt: row['Created On'] ? new Date(row['Created On']) : undefined,
        updatedAt: row['Updated On'] ? new Date(row['Updated On']) : undefined,
      }), csvBlogSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      // Download and re-host images from external URLs
      const blogsWithLocalImages = await Promise.all(
        valid.map(async (blog) => {
          const updatedBlog: Record<string, any> = { ...blog };
          
          // Download thumbnail image with SEO-friendly filename
          if (blog.thumbnail && blog.thumbnail.startsWith('http')) {
            try {
              const localPath = await downloadAndStoreImage(blog.thumbnail, 'blog-thumbnails', blog.slug || blog.title);
              if (localPath) {
                updatedBlog.thumbnail = localPath;
                updatedBlog.thumbnailAlt = `${blog.title} - Greenfoot Energy Solutions blog thumbnail`;
              }
            } catch (e) {
              console.error('Failed to download thumbnail:', e);
            }
          }
          
          // Download banner image with SEO-friendly filename
          if (blog.banner && blog.banner.startsWith('http')) {
            try {
              const localPath = await downloadAndStoreImage(blog.banner, 'blog-banners', blog.slug || blog.title);
              if (localPath) {
                updatedBlog.banner = localPath;
                updatedBlog.bannerAlt = `${blog.title} - Greenfoot Energy Solutions`;
              }
            } catch (e) {
              console.error('Failed to download banner:', e);
            }
          }
          
          return updatedBlog as InsertBlog;
        })
      );

      const created = await storage.bulkCreateBlogs(blogsWithLocalImages);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      console.error('Blog import error:', error);
      res.status(500).json({ error: "Failed to import blogs" });
    }
  });

  app.post("/api/blogs/migrate-images", async (_req: Request, res: Response) => {
    try {
      const blogs = await storage.getBlogs();
      let updated = 0;
      let failed = 0;
      const results: { id: string; title: string; thumbnailMigrated: boolean; bannerMigrated: boolean }[] = [];

      for (const blog of blogs) {
        let thumbnailMigrated = false;
        let bannerMigrated = false;
        const updates: { thumbnail?: string; thumbnailAlt?: string; banner?: string; bannerAlt?: string } = {};

        // Set alt text if not already set
        if (!blog.thumbnailAlt && blog.title) {
          updates.thumbnailAlt = `${blog.title} - Greenfoot Energy Solutions blog thumbnail`;
        }
        if (!blog.bannerAlt && blog.title) {
          updates.bannerAlt = `${blog.title} - Greenfoot Energy Solutions`;
        }

        if (blog.thumbnail && blog.thumbnail.startsWith('http')) {
          try {
            const localPath = await downloadAndStoreImage(blog.thumbnail, 'blog-thumbnails', blog.slug || blog.title);
            if (localPath) {
              updates.thumbnail = localPath;
              updates.thumbnailAlt = `${blog.title} - Greenfoot Energy Solutions blog thumbnail`;
              thumbnailMigrated = true;
            }
          } catch (e) {
            console.error(`Failed to download thumbnail for blog ${blog.id}:`, e);
          }
        }

        if (blog.banner && blog.banner.startsWith('http')) {
          try {
            const localPath = await downloadAndStoreImage(blog.banner, 'blog-banners', blog.slug || blog.title);
            if (localPath) {
              updates.banner = localPath;
              updates.bannerAlt = `${blog.title} - Greenfoot Energy Solutions`;
              bannerMigrated = true;
            }
          } catch (e) {
            console.error(`Failed to download banner for blog ${blog.id}:`, e);
          }
        }

        if (Object.keys(updates).length > 0) {
          const result = await storage.updateBlog(blog.id, updates);
          if (result) {
            updated++;
          } else {
            failed++;
          }
        }

        if (thumbnailMigrated || bannerMigrated) {
          results.push({
            id: blog.id,
            title: blog.title,
            thumbnailMigrated,
            bannerMigrated,
          });
        }
      }

      res.json({
        message: "Image migration complete",
        totalBlogs: blogs.length,
        blogsUpdated: updated,
        blogsFailed: failed,
        details: results,
      });
    } catch (error) {
      console.error('Blog image migration error:', error);
      res.status(500).json({ error: "Failed to migrate blog images" });
    }
  });

  app.get("/api/faqs", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      const faqs = await storage.getFaqs();
      if (category) {
        const filtered = faqs.filter(faq => faq.category === category);
        return res.json(filtered);
      }
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/faqs/:id", async (req: Request, res: Response) => {
    try {
      const faq = await storage.getFaq(req.params.id);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQ" });
    }
  });

  app.post("/api/faqs", async (req: Request, res: Response) => {
    try {
      const data = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(data);
      res.status(201).json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create FAQ" });
    }
  });

  app.put("/api/faqs/:id", async (req: Request, res: Response) => {
    try {
      const data = insertFaqSchema.partial().parse(req.body);
      const faq = await storage.updateFaq(req.params.id, data);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  });

  app.delete("/api/faqs/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteFaq(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  });

  app.post("/api/faqs/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row, index) => ({
        question: row.question || '',
        answer: row.answer || '',
        category: row.category || null,
        sortOrder: parseInt(row.sort_order || row.sortOrder || String(index), 10) || 0,
        isActive: row.is_active !== 'false',
      }), csvFaqSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreateFaqs(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import FAQs" });
    }
  });

  // Promotions API Routes
  app.get("/api/promotions", async (_req: Request, res: Response) => {
    try {
      const promotions = await storage.getPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotions" });
    }
  });

  app.get("/api/promotions/province/:province", async (req: Request, res: Response) => {
    try {
      const province = decodeURIComponent(req.params.province);
      const promotions = await storage.getPromotionsByProvince(province);
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotions" });
    }
  });

  app.get("/api/promotions/:id", async (req: Request, res: Response) => {
    try {
      const promotion = await storage.getPromotion(req.params.id);
      if (!promotion) {
        return res.status(404).json({ error: "Promotion not found" });
      }
      res.json(promotion);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotion" });
    }
  });

  app.post("/api/promotions", async (req: Request, res: Response) => {
    try {
      const data = insertPromotionSchema.parse(req.body);
      const promotion = await storage.createPromotion(data);
      res.status(201).json(promotion);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create promotion" });
    }
  });

  app.put("/api/promotions/:id", async (req: Request, res: Response) => {
    try {
      const data = insertPromotionSchema.partial().parse(req.body);
      const promotion = await storage.updatePromotion(req.params.id, data);
      if (!promotion) {
        return res.status(404).json({ error: "Promotion not found" });
      }
      res.json(promotion);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update promotion" });
    }
  });

  app.delete("/api/promotions/:id", async (req: Request, res: Response) => {
    try {
      await storage.deletePromotion(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete promotion" });
    }
  });

  app.post("/api/promotions/csv", async (req: Request, res: Response) => {
    try {
      const { csv } = req.body;
      if (!csv || typeof csv !== 'string' || csv.trim().length === 0) {
        return res.status(400).json({ error: "CSV content is required" });
      }
      
      const rows = parseCSV(csv);
      if (rows.length === 0) {
        return res.status(400).json({ error: "No valid rows found in CSV" });
      }

      const { valid, errors } = validateRows(rows, (row, index) => ({
        title: row.title || '',
        description: row.description || null,
        province: row.province || '',
        link: row.link || null,
        linkText: row.link_text || row.linkText || 'FREE QUOTE',
        promoType: row.promo_type || row.promoType || null,
        discountValue: row.discount_value || row.discountValue || null,
        startDate: row.start_date ? new Date(row.start_date) : null,
        endDate: row.end_date ? new Date(row.end_date) : null,
        sortOrder: parseInt(row.sort_order || row.sortOrder || String(index), 10) || 0,
        isActive: row.is_active !== 'false',
        isFeatured: row.is_featured === 'true',
      }), csvPromotionSchema);

      if (valid.length === 0) {
        return res.status(400).json({ 
          error: "No valid rows to import", 
          validationErrors: errors 
        });
      }

      const created = await storage.bulkCreatePromotions(valid);
      res.status(201).json({ 
        imported: created.length, 
        skipped: errors.length,
        validationErrors: errors.length > 0 ? errors : undefined,
        data: created 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to import promotions" });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const user = await storage.getAdminUserByEmail(email);
      
      if (!user || !user.isActive) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      req.session.adminUserId = user.id;
      req.session.adminEmail = user.email;
      req.session.adminRole = user.role || "viewer";
      
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          role: user.role || "viewer"
        } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/session", (req: Request, res: Response) => {
    // Auto-authenticate for Replit owner in development
    if (process.env.REPL_OWNER && !req.session.adminUserId) {
      req.session.adminUserId = "1";
      req.session.adminEmail = `${process.env.REPL_OWNER}@replit.dev`;
      req.session.adminRole = "admin";
    }
    
    if (req.session.adminUserId) {
      res.json({ 
        authenticated: true, 
        email: req.session.adminEmail,
        role: req.session.adminRole || "viewer"
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.get("/api/case-studies/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;
    const safeName = path.basename(filename);
    const filePath = path.join(process.cwd(), "server", "public", "case-studies", safeName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${safeName}"`);
    fs.createReadStream(filePath).pipe(res);
  });

  app.get("/api/case-studies/:filename/download", (req: Request, res: Response) => {
    const { filename } = req.params;
    const safeName = path.basename(filename);
    const filePath = path.join(process.cwd(), "server", "public", "case-studies", safeName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"`);
    fs.createReadStream(filePath).pipe(res);
  });

  // Code Snippets API
  app.get("/api/code-snippets", async (_req: Request, res: Response) => {
    try {
      const snippets = await storage.getCodeSnippets();
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch code snippets" });
    }
  });

  app.get("/api/code-snippets/location/:location", async (req: Request, res: Response) => {
    try {
      const { location } = req.params;
      const snippets = await storage.getCodeSnippetsByLocation(location);
      res.json(snippets.filter(s => s.isActive).sort((a, b) => (b.priority || 0) - (a.priority || 0)));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch code snippets" });
    }
  });

  app.post("/api/code-snippets", async (req: Request, res: Response) => {
    try {
      const parsed = insertCodeSnippetSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const snippet = await storage.createCodeSnippet(parsed.data);
      res.status(201).json(snippet);
    } catch (error) {
      res.status(500).json({ error: "Failed to create code snippet" });
    }
  });

  app.put("/api/code-snippets/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const snippet = await storage.updateCodeSnippet(id, req.body);
      if (!snippet) {
        return res.status(404).json({ error: "Code snippet not found" });
      }
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ error: "Failed to update code snippet" });
    }
  });

  app.delete("/api/code-snippets/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deleteCodeSnippet(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete code snippet" });
    }
  });

  // Dynamic XML Sitemap
  app.get("/sitemap.xml", async (req: Request, res: Response) => {
    try {
      const baseUrl = "https://www.greenfootenergy.ca";
      const today = new Date().toISOString().split('T')[0];

      const staticPages = [
        { url: "/", priority: "1.0", changefreq: "weekly" },
        { url: "/services/mini-split-heat-pumps", priority: "0.9", changefreq: "monthly" },
        { url: "/services/residential-solar", priority: "0.9", changefreq: "monthly" },
        { url: "/services/commercial-solar", priority: "0.9", changefreq: "monthly" },
        { url: "/services/sprayfoam-insulation", priority: "0.9", changefreq: "monthly" },
        { url: "/services/ducted-central-heat-pumps", priority: "0.8", changefreq: "monthly" },
        { url: "/services/geothermal-heat-pumps", priority: "0.8", changefreq: "monthly" },
        { url: "/services/indoor-air-quality-ventilation", priority: "0.8", changefreq: "monthly" },
        { url: "/services/solar-energy", priority: "0.8", changefreq: "monthly" },
        { url: "/services/heat-pumps-and-air-conditioning", priority: "0.8", changefreq: "monthly" },
        { url: "/services/air-conditioning", priority: "0.8", changefreq: "monthly" },
        { url: "/services/water-heaters", priority: "0.8", changefreq: "monthly" },
        { url: "/services/dual-fuel-heating-systems", priority: "0.8", changefreq: "monthly" },
        { url: "/services/commercial-hvac", priority: "0.8", changefreq: "monthly" },
        { url: "/services/commercial-services", priority: "0.8", changefreq: "monthly" },
        { url: "/services/generators", priority: "0.8", changefreq: "monthly" },
        { url: "/services/batt-poly-insulation", priority: "0.8", changefreq: "monthly" },
        { url: "/services/blown-in-insulation", priority: "0.8", changefreq: "monthly" },
        { url: "/services/soundproofing", priority: "0.8", changefreq: "monthly" },
        { url: "/services/urban-yeti-appliances", priority: "0.7", changefreq: "monthly" },
        { url: "/services/peak-thermostat", priority: "0.7", changefreq: "monthly" },
        { url: "/services/maintenance-service-yeti", priority: "0.7", changefreq: "monthly" },
        { url: "/about-us", priority: "0.7", changefreq: "monthly" },
        { url: "/why-choose-us", priority: "0.7", changefreq: "monthly" },
        { url: "/financing", priority: "0.7", changefreq: "monthly" },
        { url: "/contact-us", priority: "0.8", changefreq: "monthly" },
        { url: "/faq", priority: "0.7", changefreq: "monthly" },
        { url: "/careers", priority: "0.6", changefreq: "monthly" },
        { url: "/blog", priority: "0.7", changefreq: "weekly" },
        { url: "/specials-promotions", priority: "0.8", changefreq: "weekly" },
        { url: "/provincial-incentives", priority: "0.8", changefreq: "monthly" },
        { url: "/membership-plans", priority: "0.7", changefreq: "monthly" },
        { url: "/referral", priority: "0.6", changefreq: "monthly" },
        { url: "/kids-club", priority: "0.5", changefreq: "monthly" },
        { url: "/hygn", priority: "0.7", changefreq: "monthly" },
        { url: "/heat-pump-glossary", priority: "0.6", changefreq: "monthly" },
        { url: "/heat-pump-snow-covers-protect-your-investment", priority: "0.5", changefreq: "monthly" },
        { url: "/review-our-services", priority: "0.5", changefreq: "monthly" },
        { url: "/google-reviews-page", priority: "0.5", changefreq: "monthly" },
        { url: "/brands/general-electric-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/brands/gridless-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/brands/kerr-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/brands/mitsubishi-electric-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/brands/lg-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/brands/daikin-heat-pumps", priority: "0.7", changefreq: "monthly" },
        { url: "/sweepstakes", priority: "0.5", changefreq: "monthly" },
        { url: "/chilliwack", priority: "0.6", changefreq: "monthly" },
        { url: "/2-a-day", priority: "0.6", changefreq: "monthly" },
        { url: "/specials/nova-scotia", priority: "0.7", changefreq: "weekly" },
        { url: "/specials/new-brunswick", priority: "0.7", changefreq: "weekly" },
        { url: "/specials/prince-edward-island", priority: "0.7", changefreq: "weekly" },
        { url: "/specials/newfoundland", priority: "0.7", changefreq: "weekly" },
        { url: "/specials/british-columbia", priority: "0.7", changefreq: "weekly" },
      ];

      // Fetch dynamic locations
      const locations = await storage.getLocations();

      // Generate location URLs for each service type
      const locationUrls: { url: string; priority: string; changefreq: string }[] = [];
      
      for (const loc of locations) {
        // Add heat pump location pages
        locationUrls.push({ 
          url: `/heat-pump-experts/${loc.slug}`, 
          priority: "0.8", 
          changefreq: "monthly" 
        });
        // Add solar location pages
        locationUrls.push({ 
          url: `/solar-experts/${loc.slug}`, 
          priority: "0.8", 
          changefreq: "monthly" 
        });
        // Add commercial solar location pages
        locationUrls.push({ 
          url: `/services/commercial-solar/${loc.slug}`, 
          priority: "0.8", 
          changefreq: "monthly" 
        });
        // Add AC location pages
        locationUrls.push({ 
          url: `/air-conditioning-experts/${loc.slug}`, 
          priority: "0.8", 
          changefreq: "monthly" 
        });
        // Add sprayfoam insulation location pages
        locationUrls.push({ 
          url: `/services/sprayfoam-insulation/${loc.slug}`, 
          priority: "0.8", 
          changefreq: "monthly" 
        });
      }

      // Fetch blog posts
      const blogs = await storage.getBlogs();
      const blogUrls = blogs
        .filter((blog) => blog.draft === false)
        .map((blog) => ({
          url: `/blog/${blog.slug}`,
          priority: "0.6",
          changefreq: "monthly"
        }));

      // Combine all URLs
      const allUrls = [...staticPages, ...locationUrls, ...blogUrls];

      // Generate XML
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.post("/api/generate-seo-spreadsheet", async (req: Request, res: Response) => {
    try {
      const { getUncachableGoogleSheetClient } = await import("./googleSheets");
      const { existingPages, newPages, getHeaders, pageToRow } = await import("./seoData");

      const sheetsClient = await getUncachableGoogleSheetClient();

      const createResponse = await sheetsClient.spreadsheets.create({
        requestBody: {
          properties: {
            title: `Greenfoot Energy - SEO/GEO/AEO Audit - ${new Date().toISOString().split('T')[0]}`
          },
          sheets: [
            {
              properties: {
                title: "Existing Pages",
                sheetId: 0,
                gridProperties: { frozenRowCount: 1 }
              }
            },
            {
              properties: {
                title: "New Pages (Brands & Landing)",
                sheetId: 1,
                gridProperties: { frozenRowCount: 1 }
              }
            }
          ]
        }
      });

      const spreadsheetId = createResponse.data.spreadsheetId!;
      const headers = getHeaders();

      const existingRows = [headers, ...existingPages.map(pageToRow)];
      const newRows = [headers, ...newPages.map(pageToRow)];

      await sheetsClient.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: "RAW",
          data: [
            {
              range: "'Existing Pages'!A1",
              values: existingRows
            },
            {
              range: "'New Pages (Brands & Landing)'!A1",
              values: newRows
            }
          ]
        }
      });

      await sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.133, green: 0.353, blue: 0.659 },
                    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
                  }
                },
                fields: "userEnteredFormat(backgroundColor,textFormat)"
              }
            },
            {
              repeatCell: {
                range: { sheetId: 1, startRowIndex: 0, endRowIndex: 1 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.553, green: 0.776, blue: 0.247 },
                    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
                  }
                },
                fields: "userEnteredFormat(backgroundColor,textFormat)"
              }
            },
            {
              autoResizeDimensions: {
                dimensions: { sheetId: 0, dimension: "COLUMNS", startIndex: 0, endIndex: headers.length }
              }
            },
            {
              autoResizeDimensions: {
                dimensions: { sheetId: 1, dimension: "COLUMNS", startIndex: 0, endIndex: headers.length }
              }
            }
          ]
        }
      });

      const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
      
      res.json({ 
        success: true, 
        spreadsheetUrl,
        spreadsheetId,
        existingPageCount: existingPages.length,
        newPageCount: newPages.length
      });
    } catch (error: any) {
      console.error("Error generating SEO spreadsheet:", error);
      res.status(500).json({ error: error.message || "Failed to generate spreadsheet" });
    }
  });

  return httpServer;
}
