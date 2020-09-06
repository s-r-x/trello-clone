import { Mutation } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import { UseGuards, Req } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";

export class AuthMutations {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => String)
  async auth() {
    return 1;
  }

}