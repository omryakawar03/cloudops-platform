import { Controller,Get,Post,Body,Put,Delete,Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersservice: UsersService) {}
    @Get()
    getUsers() {
      return this.usersservice.findAll();
    }
  
    @Post()
    addUser(@Body('name') name: string) {
      return this.usersservice.create(name);
    }
  
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
      return this.usersservice.remove(id);
    }
  }