import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Portfolio API (e2e)', () => {
  let app: INestApplication<App>;
  let prismaService: PrismaService;
  let jwtToken: string;
  let userId: string;
  let blogPostId: string;
  let projectId: string;
  let contactId: string;
  let commentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    // Clean up database
    await prismaService.comment.deleteMany({});
    await prismaService.blogPost.deleteMany({});
    await prismaService.project.deleteMany({});
    await prismaService.contactSubmission.deleteMany({});
    await prismaService.user.deleteMany({});

    await app.close();
  });

  describe('Auth Module', () => {
    describe('POST /auth/login', () => {
      beforeAll(async () => {
        // Create a test user first
        await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
          })
          .expect(201);
      });

      it('should login with valid credentials', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test@example.com',
            password: 'password123',
          })
          .expect(200);

        expect(response.body).toHaveProperty('access_token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe('test@example.com');

        jwtToken = response.body.access_token;
        userId = response.body.user.id;
      });

      it('should not login with invalid credentials', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword',
          })
          .expect(401);
      });

      it('should not login with non-existent user', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'nonexistent@example.com',
            password: 'password123',
          })
          .expect(401);
      });
    });

    describe('GET /auth/profile', () => {
      it('should get user profile with valid token', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/profile')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('name');
      });

      it('should reject request without token', async () => {
        await request(app.getHttpServer()).post('/auth/profile').expect(401);
      });
    });
  });

  describe('Blog Module', () => {
    describe('POST /blog', () => {
      it('should create blog post', async () => {
        const response = await request(app.getHttpServer())
          .post('/blog')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({
            title: 'My First Blog Post',
            slug: 'my-first-blog-post',
            content: 'This is my first blog post content...',
            category: 'Programming',
            excerpt: 'A brief excerpt',
            tags: ['typescript', 'nestjs'],
            published: true,
          })
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('My First Blog Post');
        expect(response.body.slug).toBe('my-first-blog-post');

        blogPostId = response.body.id;
      });

      it('should not create blog post without auth', async () => {
        await request(app.getHttpServer())
          .post('/blog')
          .send({
            title: 'Another Post',
            slug: 'another-post',
            content: 'Content here...',
          })
          .expect(401);
      });
    });

    describe('GET /blog', () => {
      it('should get all published blog posts', async () => {
        const response = await request(app.getHttpServer())
          .get('/blog')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
        expect(Array.isArray(response.body.data)).toBe(true);
      });

      it('should filter by category', async () => {
        const response = await request(app.getHttpServer())
          .get('/blog?category=Programming')
          .expect(200);

        expect(response.body).toHaveProperty('data');
      });
    });

    describe('GET /blog/:id', () => {
      it('should get single blog post by id', async () => {
        const response = await request(app.getHttpServer())
          .get(`/blog/${blogPostId}`)
          .expect(200);

        expect(response.body.id).toBe(blogPostId);
        expect(response.body.title).toBe('My First Blog Post');
      });

      it('should return 404 for non-existent post', async () => {
        await request(app.getHttpServer())
          .get('/blog/nonexistent-id')
          .expect(404);
      });
    });

    describe('PUT /blog/:id', () => {
      it('should update blog post', async () => {
        const response = await request(app.getHttpServer())
          .put(`/blog/${blogPostId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({
            title: 'Updated Title',
            excerpt: 'Updated excerpt',
          })
          .expect(200);

        expect(response.body.title).toBe('Updated Title');
      });
    });

    describe('DELETE /blog/:id', () => {
      it('should delete blog post', async () => {
        await request(app.getHttpServer())
          .delete(`/blog/${blogPostId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });
    });
  });

  describe('Projects Module', () => {
    describe('POST /projects', () => {
      it('should create project', async () => {
        const response = await request(app.getHttpServer())
          .post('/projects')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({
            title: 'My Awesome Project',
            slug: 'my-awesome-project',
            description: 'A great project description',
            technologies: ['TypeScript', 'React', 'Node.js'],
            featured: true,
          })
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('My Awesome Project');

        projectId = response.body.id;
      });
    });

    describe('GET /projects', () => {
      it('should get all projects', async () => {
        const response = await request(app.getHttpServer())
          .get('/projects')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('GET /projects/:id', () => {
      it('should get single project', async () => {
        const response = await request(app.getHttpServer())
          .get(`/projects/${projectId}`)
          .expect(200);

        expect(response.body.id).toBe(projectId);
      });
    });

    describe('PUT /projects/:id', () => {
      it('should update project', async () => {
        const response = await request(app.getHttpServer())
          .put(`/projects/${projectId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({
            title: 'Updated Project Title',
          })
          .expect(200);

        expect(response.body.title).toBe('Updated Project Title');
      });
    });

    describe('DELETE /projects/:id', () => {
      it('should delete project', async () => {
        await request(app.getHttpServer())
          .delete(`/projects/${projectId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });
    });
  });

  describe('Contact Module', () => {
    describe('POST /contact', () => {
      it('should submit contact form', async () => {
        const response = await request(app.getHttpServer())
          .post('/contact')
          .send({
            name: 'John',
            surname: 'Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            message: 'I want to work with you!',
          })
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message');

        contactId = response.body.id;
      });
    });

    describe('GET /contact', () => {
      it('should get contact submissions (admin only)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contact')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      });

      it('should reject without auth', async () => {
        await request(app.getHttpServer()).get('/contact').expect(401);
      });
    });

    describe('GET /contact/:id', () => {
      it('should get single contact submission (admin only)', async () => {
        const response = await request(app.getHttpServer())
          .get(`/contact/${contactId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        expect(response.body.id).toBe(contactId);
      });
    });

    describe('PATCH /contact/:id/status', () => {
      it('should update contact status', async () => {
        const response = await request(app.getHttpServer())
          .patch(`/contact/${contactId}/status`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({ status: 'read' })
          .expect(200);

        expect(response.body.status).toBe('read');
      });
    });
  });

  describe('Comments Module', () => {
    let newBlogPostId: string;

    beforeAll(async () => {
      // Create a blog post for testing comments
      const response = await request(app.getHttpServer())
        .post('/blog')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          title: 'Blog Post for Comments',
          slug: 'blog-post-for-comments',
          content: 'Content with comments...',
          published: true,
        })
        .expect(201);

      newBlogPostId = response.body.id;
    });

    describe('POST /blog/:blogPostId/comments', () => {
      it('should create comment', async () => {
        const response = await request(app.getHttpServer())
          .post(`/blog/${newBlogPostId}/comments`)
          .send({
            authorName: 'John Doe',
            content: 'Great post!',
          })
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message');

        commentId = response.body.id;
      });
    });

    describe('GET /blog/:blogPostId/comments', () => {
      it('should get approved comments', async () => {
        const response = await request(app.getHttpServer())
          .get(`/blog/${newBlogPostId}/comments`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('PATCH /blog/:blogPostId/comments/:commentId/status', () => {
      it('should approve comment (admin only)', async () => {
        const response = await request(app.getHttpServer())
          .patch(`/blog/${newBlogPostId}/comments/${commentId}/status`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({ approved: true })
          .expect(200);

        expect(response.body.approved).toBe(true);
      });
    });
  });

  describe('API Documentation', () => {
    it('should have Swagger docs available', async () => {
      await request(app.getHttpServer()).get('/api').expect(200);
    });
  });
});
