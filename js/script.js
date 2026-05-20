const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('form-status');
const themeToggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('site-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

initTheme();

if (contactForm && statusMessage) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    statusMessage.textContent = '';

    const name = contactForm.elements['name'];
    const email = contactForm.elements['email'];
    const subject = contactForm.elements['subject'];
    const message = contactForm.elements['message'];

    if (!name.value.trim()) {
      statusMessage.textContent = 'Please enter your name.';
      name.focus();
      return;
    }

    if (!email.value.trim() || !email.validity.valid) {
      statusMessage.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }

    if (!subject.value.trim()) {
      statusMessage.textContent = 'Please enter a subject.';
      subject.focus();
      return;
    }

    if (!message.value.trim()) {
      statusMessage.textContent = 'Please add a message so I can better understand your request.';
      message.focus();
      return;
    }

    statusMessage.textContent = 'Thanks! Your message is ready to be sent.';
    contactForm.reset();
  });
}
