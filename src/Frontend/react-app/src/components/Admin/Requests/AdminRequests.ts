import { apiControllers } from "common/addr";

interface Request {
  id: number;
  userId: number;
  userName?: string;
  employeeId: number;
  employeeName?: string;
  orderTypeId: number;
  orderContent: string;
  OrderStatus?: number;
}

export async function AdminRequests(type?: string | null, status?: string | null): Promise<Request[]> {
  let addr = apiControllers.OrdersController;

  if ((type && type !== '') || (status && status !== '')) {
    addr += '?';
    if (type && type !== '') {
      addr += `type=${encodeURIComponent(type)}`;
    }
    if (status && status !== '') {
      if (type && type !== '') {
        addr += '&';
      }
      addr += `status=${encodeURIComponent(status)}`;
    }
  }

  try {
    const token = localStorage.getItem('token') ?? '';
    const response = await fetch(addr, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let res: Request[] = await response.json();

    if (!Array.isArray(res) || res.length === 0) {
      res = [{
        id: -1,
        userId: -1,
        userName: 'empty',
        employeeId: -1,
        employeeName: 'empty',
        orderTypeId: -1,
        orderContent: 'empty',
        OrderStatus: -1,
      }];
    }

    return res;
  } catch (error: any) {
    if (error.message?.includes('Failed to fetch')) {
      console.error('Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)');
    } else {
      console.error('Failed to fetch data from the server:', error.message);
    }

    return [{
      id: -1,
      userId: -1,
      employeeId: -1,
      orderTypeId: -1,
      orderContent: 'empty',
    }];
  }
}
