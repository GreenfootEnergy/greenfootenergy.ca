import { ObjectStorageService, objectStorageClient } from "./replit_integrations/object_storage";
import { randomUUID } from "crypto";
import path from "path";

/**
 * Converts a string to a URL-friendly slug for SEO-optimized filenames.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50); // Limit length for reasonable filenames
}

/**
 * Downloads an image from an external URL and uploads it to object storage.
 * Returns the local path to access the image.
 * @param externalUrl - The external URL to download from
 * @param subFolder - The subfolder in object storage (e.g., "blog-thumbnails")
 * @param seoSlug - Optional slug for SEO-friendly filename (e.g., blog title or author name)
 */
export async function downloadAndStoreImage(
  externalUrl: string,
  subFolder: string = "blog-images",
  seoSlug?: string
): Promise<string | null> {
  if (!externalUrl || !externalUrl.startsWith("http")) {
    return null;
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(externalUrl);
    if (!response.ok) {
      console.error(`Failed to fetch image: ${externalUrl}, status: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    // Generate SEO-friendly filename with unique suffix to avoid collisions
    const urlPath = new URL(externalUrl).pathname;
    const originalFilename = path.basename(urlPath);
    const extension = path.extname(originalFilename) || getExtensionFromContentType(contentType);
    const uniqueSuffix = randomUUID().substring(0, 8);
    const slugPart = seoSlug ? slugify(seoSlug) : '';
    const uniqueFilename = slugPart ? `${slugPart}-${uniqueSuffix}${extension}` : `${uniqueSuffix}${extension}`;

    // Get the private object directory and construct the path
    const objectStorageService = new ObjectStorageService();
    const privateDir = objectStorageService.getPrivateObjectDir();
    const objectPath = `${privateDir}/${subFolder}/${uniqueFilename}`;

    // Parse the object path to get bucket and object name
    const { bucketName, objectName } = parseObjectPath(objectPath);

    // Upload to object storage
    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(objectName);

    await file.save(Buffer.from(buffer), {
      contentType,
      metadata: {
        originalUrl: externalUrl,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Return the local object path
    return `/objects/${subFolder}/${uniqueFilename}`;
  } catch (error) {
    console.error(`Error downloading image from ${externalUrl}:`, error);
    return null;
  }
}

function parseObjectPath(fullPath: string): { bucketName: string; objectName: string } {
  if (!fullPath.startsWith("/")) {
    fullPath = `/${fullPath}`;
  }
  const pathParts = fullPath.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }

  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");

  return { bucketName, objectName };
}

function getExtensionFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
  };
  return map[contentType] || ".png";
}

/**
 * Process multiple image URLs and download them in parallel.
 * Returns a map of original URL to local path.
 */
export async function downloadMultipleImages(
  urls: string[],
  subFolder: string = "blog-images"
): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  const downloadPromises = urls.map(async (url) => {
    if (url && url.startsWith("http")) {
      const localPath = await downloadAndStoreImage(url, subFolder);
      if (localPath) {
        results.set(url, localPath);
      }
    }
  });

  await Promise.all(downloadPromises);
  return results;
}
