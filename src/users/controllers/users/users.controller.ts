import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { isNumber } from 'class-validator'

import { CreateUserDto } from 'src/users/dtos/CreateUser.dto'
import { AuthGuard } from 'src/users/guards/auth/auth.guard'
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe'
import { UsersService } from 'src/users/services/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('sortBy') sortBy: string,
    @Query('sortDesc', ParseBoolPipe) sortDesc: boolean,
  ) {
    return this.userService?.fetcherUser()
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(isNumber(userData.age))
    return this.userService.createUser(userData)
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id)

    var user = this.userService.fetchUserById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return user
  }
}
