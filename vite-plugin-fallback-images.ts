import { Plugin } from 'vite';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Vite plugin to handle missing image imports gracefully
 * Returns a data URL placeholder for missing images instead of failing the build
 */
export function fallbackImagesPlugin(): Plugin {
  const assetsDir = path.resolve(process.cwd(), './client/src/assets');

  return {
    name: 'vite-plugin-fallback-images',
    enforce: 'pre',

    load(id) {
      // Normalize path separators
      const normalizedId = id.replace(/\\/g, '/');

      // Only handle files from the assets directory
      if (!normalizedId.includes('/client/src/assets/')) {
        return null;
      }

      // Remove query parameters (like ?url)
      const cleanId = id.split('?')[0];

      // Check if file exists
      if (existsSync(cleanId)) {
        return null; // Let Vite handle it normally
      }

      // File doesn't exist - return a placeholder
      const filename = path.basename(cleanId);
      console.warn(`⚠️  Missing image: ${filename} - using placeholder`);

      const ext = path.extname(cleanId).toLowerCase();
      let placeholder: string;

      if (['.svg'].includes(ext)) {
        // SVG placeholder
        placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
      } else {
        // PNG/JPG/WEBP/AVIF placeholder - 1x1 transparent pixel
        placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      }

      return `export default "${placeholder}";`;
    }
  };
}
