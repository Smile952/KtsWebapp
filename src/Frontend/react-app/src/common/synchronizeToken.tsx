export async function synchronizeToken(): Promise<boolean> {
  const token = localStorage.getItem('token')
  if (!token) {
    return false;
  }

  try {
    const response = await fetch('http://localhost:8080/api/token', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
