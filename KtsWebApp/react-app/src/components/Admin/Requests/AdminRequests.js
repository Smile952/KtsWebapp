export async function AdminRequests() {
    try {
        const response = await fetch('https://localhost:8080/api/orders');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();

        if (!Array.isArray(res) || res.length === 0) {
            res = [{
                id: -1,
                userId: -1,
                employeeId: -1,
                orderTypeId: -1,
                orderContent: 'empty',
                OrderStatus: -1
            }];
        }
        return res;
    } catch (error) {
        // Логируем ошибку и обрабатываем net::ERR_CONNECTION_REFUSED
        if (error.message.includes('Failed to fetch')) {
            console.error('Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)');
        } else {
            console.error('Failed to fetch data from the server:', error.message);
        }

        // Возвращаем дефолтное значение, чтобы не ломать логику
        return [{
            id: -1,
            userId: -1,
            employeeId: -1,
            orderTypeId: -1,
            orderContent: 'empty'
        },
        {
            id: -2,
            userId: -2,
            employeeId: -2,
            orderTypeId: -2,
            orderContent: 'empty2'
        }];
    }
}