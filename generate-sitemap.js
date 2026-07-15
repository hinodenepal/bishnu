import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const domain = 'https://bishnuharitripathi.com.np';
const directoryPath = __dirname;
const sitemapPath = path.join(directoryPath, 'sitemap.xml');

// Read all files in the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        process.exit(1);
    }

    // Filter only .html files
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    const today = new Date().toISOString().split('T')[0];

    // Generate XML content
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    htmlFiles.forEach(file => {
        let urlPath = file === 'index.html' ? '/' : `/${file}`;
        
        sitemapContent += `\n  <url>\n    <loc>${domain}${urlPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>\n  </url>`;
    });

    sitemapContent += `\n</urlset>\n`;

    // Write to sitemap.xml
    fs.writeFile(sitemapPath, sitemapContent, (err) => {
        if (err) {
            console.error('Error writing sitemap.xml:', err);
            process.exit(1);
        } else {
            console.log('Sitemap successfully generated/updated.');
        }
    });
});
