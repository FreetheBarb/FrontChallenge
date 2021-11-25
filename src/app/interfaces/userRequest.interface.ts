import User from "./user.interface";

export default interface UserRequest {
    message?: string;
    user: User;
}