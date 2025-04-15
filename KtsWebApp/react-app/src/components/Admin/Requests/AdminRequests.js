export async function AdminRequests() {
    try {
        const response = await fetch('https://localhost:8080/api/orders');
        if (!response.ok) {
            throw new Error('error get data from server');
        }
        const res = await response.json();

        return res;
    } catch (error) {
        console.error('error. Big error', error);
        return '';
    }
}