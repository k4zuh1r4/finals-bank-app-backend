import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    let token: string | undefined;
    if (req.headers['cookie']) {
      const cookies = req.headers['cookie'].split(';').map(cookie => cookie.trim())
      for (const cookie of cookies) {
        if (cookie.startsWith('jwt=')) {
          token = cookie.split('=')[1].trim()
          break;
        }
      }
    }
    if (!token) {
      throw new UnauthorizedException('No token found')
    }
    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET') || 'secretdnd')
      req.user = decoded
      return true
    } catch (err) {
      console.error('JWT error:', err)
      throw new UnauthorizedException('Invalid token')
    }
  }
}