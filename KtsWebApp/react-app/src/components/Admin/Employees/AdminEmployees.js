export async function AdminEmployees() {
    try {
        const response = await fetch('https://localhost:8080/api/employees')

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        var res = await response.json()

        if (!Array.isArray(res) || res.length === 0) {
            res = [{
                id: -1,
                name: 'empty',
                post: 'empty'
            }]
        }

        return res
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            console.error('Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)');
        } else {
            console.error('Failed to fetch data from the server:', error.message);
        }

        // Возвращаем дефолтное значение, чтобы не ломать логику
        return [{
            id: -1,
            name: 'empty',
            post: 'empty'
        }]
    }
}