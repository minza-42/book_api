const params = new URLSearchParams(window.location.search);

const bookId = params.get('id');

console.log('Book ID: ', bookId);

const reviewForm = document.getElementById('review-form');

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
      book_id: bookId,
    }),
  });
  const data = await response.json();
  console.log(data);
}

reviewForm.addEventListener('submit', event => {
  event.preventDefault();

  postReview();
});
