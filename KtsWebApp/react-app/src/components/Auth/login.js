export async function getToken(data) {
    return fetch('https://localhost:8080/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Authorization wasn't successful");
            }
            return response.json();
        });
}