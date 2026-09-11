const bookDetails = document.getElementById('book-details');

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

async function getBook() {
  try {
    const response = await fetch(`/api/books/${bookId}`);

    if (!response.ok) {
      throw new Error('Could not find book');
    }

    const book = await response.json();

    document.title = `Bookmark - ${book.title}`;

    console.log('Book:', book);

    bookDetails.innerHTML = `
  <div class="row book-details-card">
  
  <div class="book-image-container">

      <img
        src="${book.image}"
        class="img-fluid rounded book-detail-image"
        alt="${book.title}"
      >

    </div>

    <div class="book-info">

      <h1 class="book-detail-title">${book.title}</h1>

      <div class="book-meta">

        <p>
          <strong>Author:</strong> ${book.author}
        </p>

        <p>
          <strong>Year:</strong> ${book.published_year}
        </p>

        <p>
          <strong>Genres:</strong> ${book.genres.join(', ')}
        </p>

      </div>

      <hr>

      <h2>Description</h2>

      <p class="book-description">
        ${book.description}
      </p>

    </div>

  </div>
`;

    // Hitta Edit-knappen
    const editButton = document.getElementById('edit-book-btn');

    editButton.addEventListener('click', () => {
      // Fyll formuläret med bokens information
      document.getElementById('edit-title').value = book.title;
      document.getElementById('edit-author').value = book.author;
      document.getElementById('edit-description').value = book.description;
      document.getElementById('edit-genres').value = book.genres.join(', ');
      document.getElementById('edit-year').value = book.published_year;

      // Öppna Edit-fönstret
      const modal = new bootstrap.Modal(document.getElementById('editBookModal'));

      modal.show();
    });

    // Hitta Delete-knappen
    const deleteButton = document.getElementById('delete-book-btn');

    deleteButton.addEventListener('click', async () => {
      const confirmDelete = confirm('Are you sure you want to delete this book?');

      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(`/api/books/${bookId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Could not delete book');
        }

        // Skicka tillbaka användaren till index
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Could not delete book:', error);
      }
    });
  } catch (error) {
    console.error('Could not fetch book:', error);

    bookDetails.innerHTML = `
      <p>Could not load book.</p>
    `;
  }
}

// Edit-formuläret
const editForm = document.getElementById('edit-book-form');

editForm.addEventListener('submit', async event => {
  event.preventDefault();

  const updatedBook = {
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
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include',

      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Could not update book');
    }

    // Stäng Edit-fönstret
    const modal = bootstrap.Modal.getInstance(document.getElementById('editBookModal'));

    modal.hide();

    // Hämta boken igen så den uppdaterade informationen visas
    getBook();
  } catch (error) {
    console.error('Could not update book:', error);

    document.getElementById('edit-book-message').textContent = 'Could not update book.';
  }
});

getBook();
