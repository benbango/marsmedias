




const navbar = document.querySelector('.mm-navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(10,10,10,0.98)';
      navbar.style.borderBottomColor = 'rgba(204,0,0,0.4)';
    } else {
      navbar.style.background = 'rgba(10,10,10,0.92)';
      navbar.style.borderBottomColor = 'rgba(204,0,0,0.25)';
    }
  });
}




const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));




function animateCounter(el, target, suffix = '', duration = 1600) {
  const isText = isNaN(parseInt(target));
  if (isText) return; // skip non-numeric like "BWA"
  const start = 0;
  const num = parseInt(target);
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * num) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.trim();
        // Extract number and possible suffix like "+"
        const match = raw.match(/^(\d+)(.*)$/);
        if (match) animateCounter(el, match[1], match[2]);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.mm-stat-number').forEach(el => counterObserver.observe(el));


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
