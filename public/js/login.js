async function login() {
  const API_URL = 'http://localhost:3000/api';
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      const response = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      // login success-flow
      if (response.ok) {
        console.log(data.user);
        // Adjust to what will be visible when user is logged in and admin

        // clear loginform on login
        document.getElementById('login-form').reset();
        // hides authcontent and shows logged-in / account content i modal
        document.getElementById('auth-content').classList.add('d-none');
        document.getElementById('account-content').classList.remove('d-none');
        // The message that shows up in modal
        const loginMessage = document.getElementById('login-message');
        loginMessage.innerHTML = '';
        loginMessage.className = '';
        //this message shows up in header as "Welcome ${username}"
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.querySelector('p').innerText = `Welcome ${data.user.username}`;
        welcomeMessage.classList.remove('d-none');

        //hides the modal on login
        const modalElement = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // FOR LATER WHEN ADMIN PANEL IS MADE
        // document.getElementById('user-content').classList.remove('d-none')
        // if (data.user.is_admin) {
        // document.getElementById('admin-content').classList.remove('d-none')
      } else {
        // 5. Make the error message display in a red fashioned label. Use bootstraps classes
        document.getElementById('login-message').className = 'alert alert-danger';
        document.getElementById('login-message').innerHTML = 'Login failed. Please check your credentials';
      }
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  });
}
login();
