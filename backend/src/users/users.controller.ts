import { Controller,Get,Post,Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersservice: UsersService) {}
@Get()
getusers(){
    
    return this.usersservice.findAll();
}
@Post()
createuser(@Body() body:any)
{
    return this.usersservice.create(body);

}
}