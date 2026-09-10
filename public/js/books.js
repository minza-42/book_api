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

          </div>
        </div>
      `;

      const viewButton = bookCard.querySelector('.view-book-btn');

      viewButton.addEventListener('click', () => {
        window.location.href = `book.html?id=${book._id}`;
      });

      booksList.appendChild(bookCard);
    });
  } catch (error) {
    console.error('Could not fetch books:', error);

    booksList.innerHTML = `
      <p>Could not load books.</p>
    `;
  }
}

getBooks();
