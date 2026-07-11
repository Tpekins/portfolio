import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SitemapService {
  constructor(private prisma: PrismaService) {}

  async generateSitemap(): Promise<string> {
    const baseUrl = 'https://tianipekins.com';

    const posts = await this.prisma.blogPost.findMany({
      where: { published: true },
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });

    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'monthly' },
      { path: '/about', priority: '0.9', changefreq: 'monthly' },
      { path: '/projects', priority: '0.8', changefreq: 'monthly' },
      { path: '/blog', priority: '0.8', changefreq: 'weekly' },
      { path: '/feed', priority: '0.7', changefreq: 'weekly' },
      { path: '/contact', priority: '0.7', changefreq: 'yearly' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const page of staticPages) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += '  </url>\n';
    }

    for (const post of posts) {
      const lastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString().split('T')[0]
        : post.publishedAt
          ? new Date(post.publishedAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += '    <priority>0.6</priority>\n';
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
  }
}
