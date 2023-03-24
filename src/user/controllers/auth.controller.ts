import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body){
    return await this.authService.forgotPassword(body);
  }
  
  @Get('/reset-password/:id/:token')
  async resetPassword(
    @Param('id') id: string,
    @Param('token') token: string,
    @Res() res
  ){
    console.log(id, token);
    const oldUser = await this.userService.findById(id);

    if (!oldUser) {
      throw new HttpException('User Not Exists!!', HttpStatus.UNAUTHORIZED);
    }

    const secret = process.env.SECRETKEY + oldUser.password;

    try {
      const verify = await this.jwtService.verify(token, {
        secret: secret,
      });
      res.render('index', { email: verify.email, status: 'Not Verified' });
    } catch (error) {
      console.log(error);
      throw new HttpException('Not Verified', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refresh_token);
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user);
    return {
      statusMessage: "Logout successfully",
    };
  }
}