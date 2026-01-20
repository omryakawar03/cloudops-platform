import { Controller,Get } from '@nestjs/common';
import { OpsService } from './ops.service';
@Controller('ops')
export class OpsController {
    constructor(private ops: OpsService) {}
@Get('info')
info(){
return this.ops.info();

}


}
