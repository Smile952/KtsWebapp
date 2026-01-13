export interface UserEntity{
    id: number,
    name: string;
    email: string;
    permissionId: number;
    token: string;
    age: number|null;
    registrationDate: string|null;
    isBot: boolean;
}