let selectedBookId = null;

async function getBooks() {
  const response = await fetch(API_URL + '/books');

  if (!response.ok) {
    throw new Error('Could not fetch books');
  }

  const books = await response.json();

  return books;
}

async function checkAdmin() {
  try {
    const user = await getCurrentUser();

    if (!user?.is_admin) {
      console.log('Access denied');
      return;
    }
    console.log('Admin verified');
    const books = await getBooks();
    const tableBody = document.getElementById('library-table-body');

    // Render book table
    tableBody.innerHTML = books
      .map(book => {
        return `
        <tr class="d-flex flex-row justify-content-between">
            <td class="p-0 fs-5">${book.title}</td>
            <td class="d-flex gap-4">
                <button class="btn btn-secondary edit-book-btn" data-id="${book._id}">
                    Edit
                </button>
                <button class="btn btn-danger delete-book-btn" data-id="${book._id}">
                    Delete
                </button>
            </td>
        </tr>      
        `;
      })
      .join('');

    // EDIT BUTTON
    document.querySelectorAll('.edit-book-btn').forEach(button => {
      button.addEventListener('click', () => {
        const bookId = button.dataset.id;
        selectedBookId = bookId;
        //loops array and find the book that matches with the bookID
        const selectedBook = books.find(book => book._id === bookId);
        // gets all content from book-info into edit-modal
        document.getElementById('edit-title').value = selectedBook.title;
        document.getElementById('edit-author').value = selectedBook.author;
        document.getElementById('edit-description').value = selectedBook.description;
        document.getElementById('edit-genres').value = selectedBook.genres.join(', ');
        document.getElementById('edit-year').value = selectedBook.published_year;
        // Opens modal
        const modal = new bootstrap.Modal(document.getElementById('edit-book-modal'));
        modal.show();
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// PATCH edit by submtting edit-modal-form
const editForm = document.getElementById('edit-book-form');
editForm.addEventListener('submit', async event => {
  event.preventDefault();

  const patchBook = {
    title: document.getElementById('edit-title').value,
    author: document.getElementById('edit-author').value,
    description: document.getElementById('edit-description').value,
    genres: document
      .getElementById('edit-genres')
      .value.split(',')
      .map(genre => genre.trim()),
    published_year: Number(document.getElementById('edit-year').value),
  };

  try {
    const response = await fetch(API_URL + `/books/${selectedBookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(patchBook),
    });
    if (!response.ok) {
      throw new Error('Unable to patch book');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('edit-book-modal'));
    modal.hide();
    checkAdmin();
  } catch (error) {
    console.log(error);
  }
});
checkAdmin();
