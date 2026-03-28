const feedbackForm = document.getElementById('feedbackForm');
const starContainer = document.getElementById('starRating');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackList = document.getElementById('feedbackList');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let selectedRating = 0;
let feedbacks = []; 
let showAll = false;

function updateStars(rating) {
  starContainer.querySelectorAll('span').forEach(star => {
    const value = parseInt(star.dataset.value);
    if (value <= rating) {
      star.classList.add('text-yellow-400');
      star.classList.remove('text-gray-500');
    } else {
      star.classList.remove('text-yellow-400');
      star.classList.add('text-gray-500');
    }
  });
}


starContainer.querySelectorAll('span').forEach(star => {
  const value = parseInt(star.dataset.value);
  star.addEventListener('mouseover', () => updateStars(value));
  star.addEventListener('mouseout', () => updateStars(selectedRating));
  star.addEventListener('click', () => {
    selectedRating = value;
    updateStars(selectedRating);
  });
});


feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('message').value.trim();
  const username = document.getElementById('username').value.trim() || 'زائر';

  if (!selectedRating || !message) {
    feedbackMessage.textContent = "الرجاء كتابة رسالة واختيار تقييم!";
    feedbackMessage.style.color = "red";
    return;
  }

  try {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: selectedRating, message, username })
    });

    if (!res.ok) throw new Error('فشل الإرسال');
    const data = await res.json();

    feedbacks.unshift(data); 
    renderFeedbacks();

    feedbackMessage.textContent = "تم إرسال التقييم بنجاح!";
    feedbackMessage.style.color = "green";

    feedbackForm.reset();
    selectedRating = 0;
    updateStars(selectedRating);

  } catch (err) {
    feedbackMessage.textContent = "حدث خطأ أثناء الإرسال.";
    feedbackMessage.style.color = "red";
  }
});


function renderFeedbacks() {
  feedbackList.innerHTML = '';

  let display = showAll ? feedbacks : feedbacks.slice(0, 3);
  display.forEach(fb => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transition-all';
    card.innerHTML = `
      <div class="text-center text-yellow-400 text-2xl">${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</div>
      <p class="mt-2 text-blue-400 text-center">${fb.message}</p>
      <small class="block mt-1 text-gray-400 text-center">- ${fb.username || 'زائر'}</small>
    `;
    feedbackList.appendChild(card);
  });
}


loadMoreBtn.addEventListener('click', () => {
  showAll = !showAll;
  renderFeedbacks();
  loadMoreBtn.textContent = showAll ? 'عرض أقل' : 'عرض كل التقييمات';
});

async function loadFeedbacks() {
  try {
    const res = await fetch('/feedback?limit=50'); 
    const data = await res.json();
    feedbacks = data;
    renderFeedbacks();
  } catch (err) {
    console.error('فشل تحميل التقييمات', err);
  }
}

loadFeedbacks();