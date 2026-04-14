const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.textContent = mobileMenu.classList.contains('hidden') ? 'Menu' : 'Close';
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formStatus.textContent = 'All fields are required.';
      formStatus.className = 'text-sm text-red-600';
      return;
    }

    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email.';
      formStatus.className = 'text-sm text-red-600';
      return;
    }

    formStatus.textContent = 'Your message has been sent! Thank you.';
    formStatus.className = 'text-sm text-green-600';
    contactForm.reset();
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  const setActiveButton = (activeButton) => {
    filterButtons.forEach((button) => {
      button.classList.toggle('bg-[#5b4cff] text-white', button === activeButton);
      button.classList.toggle('bg-slate-100 text-slate-700', button !== activeButton);
    });
  };

  setActiveButton(filterButtons[0]);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        card.hidden = filter !== 'all' && category !== filter;
      });
      setActiveButton(button);
    });
  });
}

const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

if (scrollAnimateElements.length > 0) {
  const observerOptions = {
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollAnimateElements.forEach((element) => scrollObserver.observe(element));
}
