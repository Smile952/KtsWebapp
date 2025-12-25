export interface OrderEntity{
    id:number;

    userId:number;
    userName: string|null;
    
    orderId: number;
    
    employeeId: number;
    employeeName: string|null;
    
    orderTypeId: number;
    orderTypeName: string|null;
    orderStatusId: number;
    orderStatusName: string;
    orderContent: string;
}