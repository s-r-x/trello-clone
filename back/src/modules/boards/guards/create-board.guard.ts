import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CreateBoardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ) {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}