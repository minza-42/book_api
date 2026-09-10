const booksList = document.getElementById('books-list');

async function getBooks() {
  try {
    const response = await fetch('/api/books');
    const books = await response.json();

    booksList.innerHTML = '';

    books.forEach(book => {
      const bookCard = document.createElement('div');

      bookCard.classList.add('col-md-4', 'mb-4');

      bookCard.innerHTML = `
        <div class="card h-100">

          <img
            src="${book.image}"
            class="card-img-top"
            alt="${book.title}"
          >

          <div class="card-body">

            <h2 class="card-title">${book.title}</h2>

            <p class="card-text">
              <strong>Author:</strong> ${book.author}
            </p>

            <p class="card-text">
              <strong>Year:</strong> ${book.published_year}
            </p>

            <p class="card-text">
              <strong>Genres:</strong> ${book.genres.join(', ')}
            </p>

            <button class="btn btn-primary view-book-btn">
              View book
            </button>

            <button class="btn btn-secondary edit-book-btn">
              Edit
            </button>

          </div>
        </div>
      `;

      // Visa bok
      const viewButton = bookCard.querySelector('.view-book-btn');

      viewButton.addEventListener('click', () => {
        window.location.href = `book.html?id=${book._id}`;
      });

      // Redigera bok
      const editButton = bookCard.querySelector('.edit-book-btn');

      editButton.addEventListener('click', () => {
        // Fyll i formuläret med bokens nuvarande information
        document.getElementById('edit-title').value = book.title;
        document.getElementById('edit-author').value = book.author;
        document.getElementById('edit-description').value = book.description;
        document.getElementById('edit-genres').value = book.genres.join(', ');
        document.getElementById('edit-year').value = book.published_year;

        // Spara bokens ID
        document.getElementById('edit-book-form').dataset.bookId = book._id;

        // Öppna redigeringsfönstret
        const modal = new bootstrap.Modal(document.getElementById('editBookModal'));

        modal.show();
      });

      booksList.appendChild(bookCard);
    });
  } catch (error) {
    console.error('Could not fetch books:', error);

    booksList.innerHTML = `
      <p>Could not fetch books.</p>
    `;
  }
}

// REDIGERINGSFORMULÄR
const editForm = document.getElementById('edit-book-form');

editForm.addEventListener('submit', async event => {
  event.preventDefault();

  const bookId = editForm.dataset.bookId;

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

    // Stäng redigeringsfönstret
    const modal = bootstrap.Modal.getInstance(document.getElementById('editBookModal'));

    modal.hide();

    // Ladda om böckerna
    getBooks();
  } catch (error) {
    console.error('Could not update book:', error);

    document.getElementById('edit-book-message').textContent = 'Could not update book.';
  }
});

// Ladda böcker när sidan öppnas
getBooks();
