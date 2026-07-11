import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SitemapService } from './sitemap.service';

@ApiTags('sitemap')
@Controller()
export class SitemapController {
  constructor(private sitemapService: SitemapService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  @ApiOperation({ summary: 'Generate dynamic sitemap.xml' })
  async getSitemap(): Promise<string> {
    return this.sitemapService.generateSitemap();
  }
}
