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

  reviewCard.classList.add('col-lg-4', 'col-md-6', 'col-12', 'mb-4');

  const createdDate = new Date(review.created_at).toLocaleDateString('sv-SE');

  reviewCard.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${review.name}</h5>

        <p class="card-text">${review.content}</p>

        <div class="d-flex justify-content-between align-items-center">
          <div class="text-warning">
            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
          </div>

          <small class="text-muted">${createdDate}</small>
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
