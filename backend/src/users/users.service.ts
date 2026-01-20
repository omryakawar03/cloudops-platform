import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users:any[]=[];
    findAll(){
    
        return this.users;
    }
    create(body:any){
        this.users.push(body);
        return body;
    }
    
}
