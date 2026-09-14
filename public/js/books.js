const booksList = document.getElementById('books-list');

async function getBooks() {
  try {
    const response = await fetch('/api/books');
    const books = await response.json();

    booksList.innerHTML = '';

    books.forEach(book => {
      const bookCard = document.createElement('div');

      bookCard.classList.add('col-lg-4', 'col-md-6', 'col-12', 'mb-4');

      bookCard.innerHTML = `
        <div class="card h-100">

          <img
          src="${book.image}"
          class="card-img-top w-100"
          alt="${book.title}"
          >

          <div class="card-body d-flex flex-column">

            <h2 class="card-title mb-3">${book.title}</h2>

            <p class="card-text author">
              <strong>Author:</strong> ${book.author}
            </p>

            <p class="card-text year">
              <strong>Year:</strong> ${book.published_year}
            </p>

            <p class="card-text genres">
              <strong>Genres:</strong> ${book.genres.join(', ')}
            </p>

            <button class="btn btn-dark view-book-btn px-3 mt-auto align-self-start">
              View book
            </button>

          </div>
        </div>
      `;

      // Visa bok
      const viewButton = bookCard.querySelector('.view-book-btn');

      viewButton.addEventListener('click', () => {
        window.location.href = `book.html?id=${book._id}`;
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

// Ladda böcker när sidan öppnas
getBooks();
