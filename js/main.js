// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Mark active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Contact form submission (uses Formspree — update action URL with real endpoint)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.innerHTML = `<div style="text-align:center;padding:40px 0;">
          <p style="font-size:2rem;margin-bottom:12px;">✓</p>
          <h3 style="color:var(--gold);margin-bottom:8px;">Message Sent!</h3>
          <p style="color:var(--muted);">Thanks for getting in touch. Carl will be in contact shortly.</p>
        </div>`;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch {
      btn.textContent = original;
      btn.disabled = false;
      alert('Sorry, there was a problem sending your message. Please call or email directly.');
    }
  });
}
