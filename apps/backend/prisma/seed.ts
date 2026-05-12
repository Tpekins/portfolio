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

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'getting-started-with-nestjs' },
    update: {},
    create: {
      title: 'Getting Started with NestJS',
      slug: 'getting-started-with-nestjs',
      content:
        'NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications...',
      excerpt: 'Learn the basics of NestJS',
      category: 'Software',
      tags: ['nestjs', 'nodejs', 'backend'],
      featured: true,
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'react-hooks-explained' },
    update: {},
    create: {
      title: 'React Hooks Explained',
      slug: 'react-hooks-explained',
      content:
        'Hooks let you use state and other React features without writing a class. Learn useState, useEffect, and more...',
      excerpt: 'Understand React Hooks',
      category: 'Programming',
      tags: ['react', 'javascript', 'frontend'],
      featured: true,
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  console.log('Blog posts created:', { blogPost1, blogPost2 });

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
