export async function AdminRequests({type, status}) {
    var addr = 'https://localhost:8080/api/orders'
    try {
        if(type !== null || type !== '' || status !== null || status !== '' || type !== undefined || status !== undefined){
            
            addr += '?';
            if(type !== null && type !== ''){
                addr += `type=${type}`
            }
            if(status !== null && status !== ''){
                if(type !== null && type !== ''){
                    addr += `&`
                }
                addr += `status=${status}`
            }
        }
        console.log(addr)
        const response = await fetch(addr);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        var res = await response.json();

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
        if (error.message.includes('Failed to fetch')) {
            console.error('Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)');
        } else {
            console.error('Failed to fetch data from the server:', error.message);
        }

        return [{
            id: -1,
            userId: -1,
            employeeId: -1,
            orderTypeId: -1,
            orderContent: 'empty'
        }];
    }
}