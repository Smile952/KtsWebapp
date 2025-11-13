export interface UserEntity{
    Name: string;
    Email: string;
    PermissionId: number;
    Token: string;
    Password: string | null;
}