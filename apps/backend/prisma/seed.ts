import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('Admin user created:', admin);

  // Create blog posts
  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'why-i-built-localhands' },
    update: {},
    create: {
      title: 'Why I Built LocalHands: The Problem Behind the Platform',
      slug: 'why-i-built-localhands',
      content: 'LocalHands was born from a simple observation...',
      excerpt: 'The story behind LocalHands and the problem it solves for Africa\'s informal economy.',
      externalUrl: 'https://medium.com/@TianiPekinsEbika/why-i-built-localhands-the-problem-behind-the-platform-9f3c4ed0a00a',
      category: 'Software',
      tags: ['localhands', 'startup', 'africa'],
      featured: true,
      published: true,
      publishedAt: new Date('2026-03-10'),
      authorId: admin.id,
    },
  });

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'architecting-digital-trust-localhands-prisma-schema' },
    update: {},
    create: {
      title: 'Architecting Digital Trust: A Relational Deep Dive into the LocalHands Prisma Schema',
      slug: 'architecting-digital-trust-localhands-prisma-schema',
      content: 'A deep dive into the Prisma schema that powers LocalHands...',
      excerpt: 'A deep dive into the database architecture and relational design of the LocalHands platform.',
      externalUrl: 'https://dev.to/tianipekinsebika/architecting-digital-trust-a-relational-deep-dive-into-the-localhands-prisma-schema-12dk',
      category: 'Tech',
      tags: ['prisma', 'database', 'localhands', 'architecture'],
      featured: true,
      published: true,
      publishedAt: new Date('2025-05-01'),
      authorId: admin.id,
    },
  });

  const blogPost3 = await prisma.blogPost.upsert({
    where: { slug: 'engineering-trust-african-gig-economy' },
    update: {},
    create: {
      title: 'Engineering Trust in the African Gig Economy: A Data-Driven Approach to Service Exchange Platforms',
      slug: 'engineering-trust-african-gig-economy',
      content: 'Trust is the currency of the gig economy...',
      excerpt: 'A data-driven approach to building trust in Africa\'s growing gig economy and service exchange platforms.',
      externalUrl: 'https://medium.com/@TianiPekinsEbika/engineering-trust-in-the-african-gig-economy-a-data-driven-approach-to-service-exchange-platforms-0b27b40ad9a2',
      category: 'Software',
      tags: ['gig-economy', 'trust', 'africa', 'data'],
      featured: true,
      published: true,
      publishedAt: new Date('2025-01-15'),
      authorId: admin.id,
    },
  });

  console.log('Blog posts created:', { blogPost1, blogPost2, blogPost3 });

  // Create sample projects
  const project1 = await prisma.project.upsert({
    where: { slug: 'localhands-marketplace' },
    update: {},
    create: {
      title: 'LocalHands - Service Marketplace',
      slug: 'localhands-marketplace',
      description:
        'A service marketplace platform for Cameroon connecting service providers with customers.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      demoUrl: 'https://localhands.com',
      gitUrl: 'https://github.com/yourusername/localhands',
      featured: true,
      authorId: admin.id,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Personal Portfolio Website',
      slug: 'portfolio-website',
      description:
        'A modern portfolio website built with React, Vite, and Tailwind CSS.',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
      demoUrl: 'https://yourportfolio.com',
      gitUrl: 'https://github.com/yourusername/portfolio',
      featured: true,
      authorId: admin.id,
    },
  });

  console.log('Projects created:', { project1, project2 });

  // Create sample contact submissions
  const contact = await prisma.contactSubmission.create({
    data: {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      message: 'Great portfolio! Would love to work with you.',
      status: 'pending',
    },
  });

  console.log('Contact submission created:', contact);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
