const API_URL = 'http://localhost:3000/api';

async function getCurrentUser() {
  const response = await fetch(API_URL + '/auth/me', {
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
}
