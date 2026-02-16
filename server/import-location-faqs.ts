import { db } from "./db";
import { faqs } from "@shared/schema";
import { sql } from "drizzle-orm";
import * as fs from "fs";

interface FaqRow {
  question: string;
  answer: string;
  category: string;
}

function parseCSV(csvText: string): FaqRow[] {
  const lines = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
  if (lines.length < 2) return [];
  
  const results: FaqRow[] = [];
  
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
    
    if (values.length >= 13) {
      const question = values[10];
      const answer = values[11];
      const category = values[12];
      
      if (question && answer && category) {
        results.push({ question, answer, category });
      }
    }
  }
  
  return results;
}

export async function importLocationFaqs(): Promise<void> {
  const csvPath = "./attached_assets/GreenFoot_Energy_2.0_-_Heat_Pump_Questions_(2)_1769132428650.csv";
  
  if (!fs.existsSync(csvPath)) {
    console.log("Location FAQs CSV not found, skipping import");
    return;
  }
  
  // Check if location FAQs already exist to prevent duplicates
  const existingFaqs = await db.select().from(faqs).where(
    sql`${faqs.category} LIKE '%-%-%'`
  ).limit(1);
  
  if (existingFaqs.length > 0) {
    console.log("Location FAQs already exist, skipping import");
    return;
  }
  
  console.log("Importing location-specific FAQs...");
  
  try {
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const faqRows = parseCSV(csvContent);
    
    console.log(`Found ${faqRows.length} FAQs to import`);
    
    let imported = 0;
    for (const row of faqRows) {
      try {
        await db.insert(faqs).values({
          question: row.question,
          answer: row.answer,
          category: row.category,
          sortOrder: imported,
          isActive: true,
        }).onConflictDoNothing();
        imported++;
      } catch (err) {
        console.error(`Error importing FAQ: ${row.question.substring(0, 50)}...`, err);
      }
    }
    
    console.log(`Imported ${imported} location FAQs`);
  } catch (error) {
    console.error("Error importing location FAQs:", error);
  }
}
