function logout() {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', async function () {
    try {
      const response = await fetch(API_URL + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const welcomeMessage = document.getElementById('welcome-message');

        if (welcomeMessage) {
          welcomeMessage.classList.add('d-none');
        }
        document.getElementById('account-content').classList.add('d-none');
        document.getElementById('auth-content').classList.remove('d-none');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  });
}
logout();
