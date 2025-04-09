export async function AdminUsers() {
    try {
        const response = await fetch('https://localhost:8080/api/users')
        if (!response.ok) {
            throw new Error('error get data from server');
        }

        const res = response.json()

        return res
    } catch (error) {
        console.log(error)

        return ''
    }
}