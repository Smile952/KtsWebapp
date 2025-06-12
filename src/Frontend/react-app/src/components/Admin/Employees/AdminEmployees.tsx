import { rout } from "common/addr";

interface Employee {
    id: number;
    name: string;
    post: string;
}

export async function AdminEmployees(): Promise<Employee[]> {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(rout + '/employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let res: unknown = await response.json();

        if (!Array.isArray(res)) {
            throw new Error('Response is not an array');
        }

        const employees: Employee[] = res.map((item) => ({
            id: typeof item.id === 'number' ? item.id : -1,
            name: typeof item.name === 'string' ? item.name : 'empty',
            post: typeof item.post === 'string' ? item.post : 'empty',
        }));

        return employees.length > 0 ? employees : [{
            id: -1,
            name: 'empty',
            post: 'empty',
        }];
    } catch (error: any) {
        if (typeof error.message === 'string' && error.message.includes('Failed to fetch')) {
            console.error('Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)');
        } else {
            console.error('Failed to fetch data from the server:', error?.message || error);
        }

        return [{
            id: -1,
            name: 'empty',
            post: 'empty',
        }];
    }
}
