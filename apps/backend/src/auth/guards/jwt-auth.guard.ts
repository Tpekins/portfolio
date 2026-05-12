import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication Guard
 * Use @UseGuards(JwtAuthGuard) on endpoints that require authentication
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
