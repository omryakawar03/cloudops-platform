import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
    health() {
        return {  status: 'ok',
            message: 'API is running successfully from the core service and /core/health endpoint',
            timestamp: new Date().toISOString(), };
      }
    
      ready() {
        return { status: 'ok',
            message: 'API is ready from the core service and /core/ready endpoint',
            timestamp: new Date().toISOString(), };
      }
}
