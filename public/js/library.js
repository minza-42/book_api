let selectedBookId = null;

const editModal = document.getElementById('edit-book-modal');

editModal.addEventListener('hide.bs.modal', () => {
  document.activeElement.blur();
});

async function getBooks() {
  const response = await fetch(API_URL + '/books');

  if (!response.ok) {
    throw new Error('Could not fetch books');
  }

  const books = await response.json();

  return books;
}

function renderBooks(books) {
  const tableBody = document.getElementById('library-table-body');

  // Render book table
  tableBody.innerHTML = books
    .map(book => {
      return `
        <tr class="d-flex flex-row justify-content-between">
            <td class="p-0 fs-5">${book.title}</td>
            <td class="d-flex gap-4">
                <button class="btn btn-outline-info edit-book-btn" data-id="${book._id}">
                    Edit
                </button>
                <button class="btn btn-outline-warning delete-book-btn" data-id="${book._id}">
                    Delete
                </button>
            </td>
        </tr>      
        `;
    })
    .join('');
}

//PATCH
function handleEditBtns(books) {
  document.querySelectorAll('.edit-book-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.id;
      selectedBookId = bookId;
      console.log('bookId from button:', bookId);

      console.log('books:', books);
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
}
//DELETE
function handleDeleteBtns() {
  document.querySelectorAll('.delete-book-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const bookId = button.dataset.id;

      const confirmDelete = confirm('Are you sure you want to delete this book?');

      if (!confirmDelete) {
        return;
      }
      try {
        const response = await fetch(API_URL + `/books/${bookId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Unable to delete book');
        }
        checkAdmin();
      } catch (error) {
        console.log(error);
      }
    });
  });
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

    renderBooks(books);

    handleEditBtns(books);

    handleDeleteBtns();
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

// POST by creating a add new book- form-modal

checkAdmin();
