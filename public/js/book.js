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
  
  <div class="book-image-container d-flex justify-content-center">

      <img
        src="${book.image}"
        class="img-fluid rounded book-detail-image"
        alt="${book.title}"
      >

    </div>

    <div class="book-info">

      <h1 class="book-detail-title mb-4">${book.title}</h1>

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
  } catch (error) {
    console.error('Could not fetch book:', error);

    bookDetails.innerHTML = `
      <p>Could not load book.</p>
    `;
  }
}

getBook();
