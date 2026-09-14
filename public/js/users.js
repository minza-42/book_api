async function getUsers() {
  try {
    const response = await fetch(API_URL + '/users', {
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('Could not fetch users');
      return;
    }

    const users = await response.json();

    const tableBody = document.getElementById('users-table-body');

    tableBody.innerHTML = users
      .map(user => {
        return `
          <tr class="fs-5">
            <td class="p-0">${user.username}</td>
            <td class="p-0 ">${user.is_admin ? 'Yes' : 'No'}</td>
            <td class="p-0 ">${new Date(user.created_at).toLocaleDateString()}</td>
            <td class="text-end">
              <button
                class="btn btn-danger delete-user-btn"
                data-id="${user.id}"
              >
                Delete
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
    // event for deletebutton
    document.querySelectorAll('.delete-user-btn').forEach(button => {
      button.addEventListener('click', () => {
        deleteUser(button.dataset.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

//Deleteuser
async function deleteUser(userId) {
  try {
    const response = await fetch(API_URL + `/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      getUsers();
    }
  } catch (error) {
    console.log(error);
  }
}

getUsers();
