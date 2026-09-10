const bookDetails = document.getElementById('book-details');

// Get the book ID from the URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

async function getBook() {
  try {
    // Get the specific book
    const response = await fetch(`/api/books/${bookId}`);

    if (!response.ok) {
      throw new Error('Could not find book');
    }

    const book = await response.json();

    console.log('Book:', book);

    // Display the book
    bookDetails.innerHTML = `
      <div class="row">

        <div class="col-md-5">

          <img
            src="${book.image}"
            class="img-fluid rounded"
            alt="${book.title}"
          >

        </div>


        <div class="col-md-7">

          <h1>${book.title}</h1>

          <p>
            <strong>Author:</strong> ${book.author}
          </p>

          <p>
            <strong>Year:</strong> ${book.published_year}
          </p>

          <p>
            <strong>Genres:</strong> ${book.genres.join(', ')}
          </p>

          <hr>

          <h2>Description</h2>

          <p>
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
