import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
@Injectable()
export class OpsService {
    constructor (private readonly config:ConfigService){    }
    info(){
        return{
            app: this.config.get('APP_NAME'),
            env: this.config.get('APP_ENV'),
            version: this.config.get('APP_VERSION'),
            port: this.config.get('PORT'),
            time: new Date().toISOString(),
        }
    }

}
