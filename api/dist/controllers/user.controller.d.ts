import { UserService } from "../services/user.service";
import { UserSafe } from "../types/user.type";
import { BaseController, ApiResponse } from './base.controller';
export declare class UserController extends BaseController {
    private readonly userService;
    constructor(userService: UserService);
    index(): Promise<ApiResponse<UserSafe[]>>;
}
