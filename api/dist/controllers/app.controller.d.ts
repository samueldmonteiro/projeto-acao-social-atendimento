import { AppService } from "../services/app.service";
import { BaseController } from './base.controller';
export declare class AppController extends BaseController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): import("./base.controller").ApiResponse<string>;
}
