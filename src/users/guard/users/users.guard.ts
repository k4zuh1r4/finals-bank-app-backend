import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
      private readonly configService: ConfigService,
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const req = context.switchToHttp().getRequest();
       let token: string | undefined;
       if (req.headers['cookie']) {
         const cookies = req.headers['cookie'].split(';').map(cookie => cookie.trim());
         for (const cookie of cookies) {
           if (cookie.startsWith('jwt=')) {
             token = cookie.split('=')[1].trim();
             break;
           }
         }
       }
       if (!token) {
         throw new UnauthorizedException('No token found');
       }
       try {
        const jwtSecret =  this.configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
        throw new UnauthorizedException('JWT secret is not defined');
      }
         const decoded = jwt.verify(token, jwtSecret);
         req.user = decoded
         console.log(req.user.role);
         if (!req.user || req.user.role !== 'admin') {
          throw new ForbiddenException('Admins only');
         }
         return true;
       } catch (err) {
         console.error('JWT error:', err);
         throw new UnauthorizedException('Invalid token');
       }
  }
}
