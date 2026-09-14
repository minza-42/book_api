const reviewParams = new URLSearchParams(window.location.search);
const reviewBookId = reviewParams.get('id');
const reviewsList = document.getElementById('reviews-list');

console.log('Book ID: ', reviewBookId);

const reviewForm = document.getElementById('review-form');

// --------------------------------------------------------
// ----------------------- POST REVIEW --------------------
// --------------------------------------------------------

async function postReview() {
  const name = document.getElementById('review-name').value;
  const content = document.getElementById('review-content').value;
  const rating = Number(document.getElementById('review-rating').value);

  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      content,
      rating,
      book_id: reviewBookId,
    }),
  });
  const data = await response.json();
  console.log(data);

  addReviewToList(data.review);

  reviewForm.reset();
}

reviewForm.addEventListener('submit', event => {
  event.preventDefault();

  postReview();
});

// --------------------------------------------------------
// ----------------- ADD REVIEW TO LIST -------------------
// --------------------------------------------------------

async function addReviewToList(review) {
  const reviewCard = document.createElement('article');

  reviewCard.classList.add('col-md-4', 'mb-4');

  reviewCard.innerHTML = `
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">${review.name}</h5>

            <p class="card-text">${review.content}</p>

            <div class="text-warning mb-2">
            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
        </div>
    </div>
    `;
  reviewsList.appendChild(reviewCard);
}

// --------------------------------------------------------
// ---------------------- SHOW REVIEWS --------------------
// --------------------------------------------------------

async function showReviews() {
  const response = await fetch(`/api/books/${reviewBookId}`);

  if (!response.ok) {
    throw new Error('Could not find reviews');
  }

  const data = await response.json();

  const reviews = data.reviews || [];

  reviewsList.innerHTML = '';

  reviews.forEach(review => {
    addReviewToList(review);
  });
}

showReviews();
