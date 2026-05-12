import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';

/**
 * Decorator to specify required roles for an endpoint
 * Usage: @Roles('admin')
 */
export const Roles = Reflector.createDecorator<string[]>();

/**
 * Roles Guard - Checks if user has required roles
 * For this portfolio, we only have admin users
 * All authenticated users are considered admin for their own content
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    // If no roles are specified, allow access
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    // For portfolio, we check if user is authenticated
    // In a real app, you'd check against an actual role field in the User model
    if (roles.includes('admin')) {
      return true;
    }

    throw new ForbiddenException(
      `User does not have required role. Required: ${roles.join(', ')}`,
    );
  }
}
