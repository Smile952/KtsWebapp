export async function synchronizeToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://localhost:8080/api/token', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    return response.ok; // Вернёт true только если статус 200–299
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
