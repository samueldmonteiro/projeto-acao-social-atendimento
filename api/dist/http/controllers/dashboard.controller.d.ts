import { BaseController, ApiResponse } from './base.controller';
import { DashboardService } from "../../services/dashboard.service";
export declare class DashboardController extends BaseController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): Promise<ApiResponse>;
}
