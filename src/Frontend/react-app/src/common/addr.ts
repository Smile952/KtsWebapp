export const addrToApis = 'https://localhost:8080/api'

export const apiControllers: Record<string, string> = {
    UsersController: `${addrToApis}/users`,
    UsersControllerSignUp: `${addrToApis}/users/sign_up`,
    TokenController: `${addrToApis}/token`,
    EmployeesController: `${addrToApis}/employees`,
    OrdersController: `${addrToApis}/orders`,
    MinioController: `${addrToApis}/minio`,
}