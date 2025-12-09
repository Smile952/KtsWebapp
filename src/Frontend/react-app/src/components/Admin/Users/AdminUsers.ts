import { apiControllers } from "common/Constants/addr"

export interface User {
    id: number
    name: string
    email: string
    age: number
    registrationDate: string
}

export async function AdminUsers(): Promise<User[]> {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(apiControllers.UsersController + '/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        let res: User[] = await response.json()

        if (!Array.isArray(res) || res.length === 0) {
            res = [
                {
                    id: -1,
                    name: 'empty',
                    email: 'empty@example.com',
                    age: 0,
                    registrationDate: '1000-01-01T00:00:00Z',
                },
            ]
        }

        return res
    } catch (error: any) {
        if (error.message.includes('Failed to fetch')) {
            console.error(
                'Connection refused: Could not connect to the server (net::ERR_CONNECTION_REFUSED)'
            )
        } else {
            console.error('Failed to fetch data from the server:', error.message)
        }

        return [
            {
                id: -1,
                name: 'empty',
                email: 'empty@example.com',
                age: 0,
                registrationDate: '1000-01-01T00:00:00Z',
            },
        ]
    }
}
