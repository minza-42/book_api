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

function addReviewToList(review) {
  const reviewCard = document.createElement('article');

  reviewCard.classList.add('col-lg-4', 'col-md-6', 'col-12', 'mb-4');

  const createdDate = new Date(review.created_at).toLocaleDateString('sv-SE');

  reviewCard.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${review.name}</h5>

        <p class="card-text">${review.content}</p>

        <div class="d-flex justify-content-between align-items-center mt-auto">
          <div class="text-warning">
            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
          </div>

          <small class="text-muted">${createdDate}</small>
        </div>

        <div class="mt-3 review-actions">
          <button type="button" class="btn btn-outline-info edit-review-btn" data-id="${review._id}">
            Edit
          </button>
          <button type="button" class="btn btn-danger delete-review-btn" data-id="${review._id}">
            Delete
          </button>
        </div>
      </div>
    </div>  
  `;
  reviewsList.appendChild(reviewCard);
}

function handleDeleteReviewBtns() {
  document.querySelectorAll('.delete-review-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const reviewId = button.dataset.id;
      console.log('button clicked');
      const confirmDelete = confirm('Are you sure you want to delete this review?');

      if (!confirmDelete) {
        return;
      }
      try {
        const response = await fetch(API_URL + `/reviews/${reviewId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Unable to delete review');
        }
        await showReviews();
        try {
          const user = await getCurrentUser();

          if (!user?.is_admin) {
            console.log('Access denied');
            return;
          }
          console.log('Admin verified');
          handleDeleteReviewBtns();
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}

// --------------------------------------------------------
// ---------------------- SHOW REVIEWS --------------------
// --------------------------------------------------------

async function showReviews(user) {
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

  if (!user || (user && user.is_admin === false)) {
    const reviewActions = document.querySelectorAll('.review-actions');

    reviewActions.forEach(container => {
      container.classList.add('d-none');
    });
  }

  handleDeleteReviewBtns();
}

async function showReviewFormForUser() {
  const reviewForm = document.getElementById('review-form');
  const reviewMessage = document.getElementById('review-message');

  try {
    const user = await getCurrentUser();

    if (user && user.is_admin === false) {
      console.log('Show review-form to user');

      reviewForm.classList.remove('d-none');
      reviewMessage.classList.add('d-none');
    }

    await showReviews(user);
  } catch (error) {
    console.log(error);
  }
}

showReviewFormForUser();
