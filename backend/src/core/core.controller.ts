import { Controller,Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
    constructor(private readonly coreservice: CoreService) {}
    @Get('health')
    health(){
        return this.coreservice.health();
    }
    @Get('ready')
        ready(){
            return this.coreservice.ready();
              
            
        }
    
    

}
