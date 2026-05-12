/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashed-password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'test-password';
      const hash = await service.hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });
  });

  describe('validatePassword', () => {
    it('should validate correct password', async () => {
      const password = 'test-password';
      const hash = await service.hashPassword(password);
      const isValid = await service.validatePassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'test-password';
      const hash = await service.hashPassword(password);
      const isValid = await service.validatePassword('wrong-password', hash);
      expect(isValid).toBe(false);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 'user-123',
        email: 'newuser@example.com',
        name: 'New User',
        createdAt: new Date(),
      });

      const result = await service.register(
        'newuser@example.com',
        'password123',
        'New User',
      );

      expect(result.email).toBe('newuser@example.com');
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register('test@example.com', 'password123', 'Test User'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const password = 'test-password';
      const hash = await service.hashPassword(password);

      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: hash,
      });

      const result = await service.validateUser('test@example.com', password);

      expect(result.email).toBe('test@example.com');
      expect(result.password).toBeUndefined();
    });

    it('should throw error if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.validateUser('notfound@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error if password is invalid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.validateUser('test@example.com', 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return access token and user info on successful login', async () => {
      const password = 'test-password';
      const hash = await service.hashPassword(password);

      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: hash,
      });

      mockJwtService.sign.mockReturnValue('jwt-token-123');

      const result = await service.login({
        email: 'test@example.com',
        password: password,
      });

      expect(result.access_token).toBe('jwt-token-123');
      expect(result.user.email).toBe('test@example.com');
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should throw error on invalid credentials', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateJwtPayload', () => {
    it('should return user if payload is valid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      const result = await service.validateJwtPayload({ sub: 'user-123' });

      expect(result.id).toBe('user-123');
      expect(result.email).toBe('test@example.com');
    });

    it('should throw error if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.validateJwtPayload({ sub: 'nonexistent-user' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
