export async function AdminEmployees() {
    try {
        const response = await fetch('https://localhost:8080/api/employees')
        if (!response.ok) {
            throw new Error('error get data from server');
        }

        const res = response.json()

        return res
    } catch (error) {
        console.error('error. Big error', error);
        return '';
    }
}